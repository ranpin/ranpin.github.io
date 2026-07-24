import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { makeGlowTexture, supportsWebGL } from './three/shaders';

interface WarpProps {
  /** 穿梭动画结束后回调（覆盖层已淡出） */
  onDone: () => void;
  /** 总时长（毫秒），默认 2200ms */
  duration?: number;
}

/**
 * 时空穿梭 —— three.js 实现的超光速星场（hyperspace warp）。
 *
 * 星点化作流光从远处冲向镜头，速度随时间指数式爬升，中心辉光渐强，
 * 临近尾声闪白，随后整层淡出、揭示星际之门内景。
 *
 * SSG / 测试安全：渲染在 useEffect（仅客户端）中创建；无 WebGL（如 jsdom）时
 * 按时序淡出并回调，保证内容始终可揭示。尊重 prefers-reduced-motion：直接短淡出。
 */
const Warp: React.FC<WarpProps> = ({ onDone, duration = 2200 }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    // 淡出并结束：在 onDone 前留出 CSS 过渡时间
    const finish = () => {
      setFading(true);
      window.setTimeout(onDone, 450);
    };

    if (reduce) {
      const t = window.setTimeout(finish, 350);
      return () => window.clearTimeout(t);
    }

    const mount = mountRef.current;
    if (!mount || !supportsWebGL()) {
      const t = window.setTimeout(finish, Math.min(duration, 800));
      return () => window.clearTimeout(t);
    }

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    } catch {
      const t = window.setTimeout(finish, Math.min(duration, 800));
      return () => window.clearTimeout(t);
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setClearColor(0x030614, 1);
    const canvas = renderer.domElement;
    canvas.className = 'block w-full h-full';
    mount.appendChild(canvas);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 200);
    camera.position.set(0, 0, 0);
    camera.lookAt(0, 0, -1);

    const resize = () => {
      const w = mount.clientWidth || 800;
      const h = mount.clientHeight || 600;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    };
    resize();
    window.addEventListener('resize', resize);

    // 流光星线：每颗星是一条线段（尾→头），朝镜头（+Z）冲刺
    const COUNT = 650;
    const SPREAD = 60;
    const palette: [number, number, number][] = [
      [0.35, 0.9, 1.0], // 青
      [1.0, 0.35, 0.75], // 品红
      [0.65, 0.45, 1.0], // 紫
      [0.45, 0.65, 1.0], // 蓝
    ];
    const positions = new Float32Array(COUNT * 6); // 2 顶点 × 3 分量
    const colors = new Float32Array(COUNT * 6);
    const stars: { x: number; y: number; z: number; pz: number }[] = [];
    for (let i = 0; i < COUNT; i++) {
      const x = (Math.random() - 0.5) * SPREAD * 1.6;
      const y = (Math.random() - 0.5) * SPREAD * 1.6;
      const z = -1 - Math.random() * SPREAD;
      stars.push({ x, y, z, pz: z });
      const c = palette[Math.floor(Math.random() * palette.length)];
      colors[i * 6] = c[0];
      colors[i * 6 + 1] = c[1];
      colors[i * 6 + 2] = c[2];
      colors[i * 6 + 3] = c[0];
      colors[i * 6 + 4] = c[1];
      colors[i * 6 + 5] = c[2];
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(geo, lineMat);
    lines.frustumCulled = false;
    scene.add(lines);

    // 中心辉光
    const glowTex = makeGlowTexture();
    const glowMat = new THREE.SpriteMaterial({
      map: glowTex,
      color: new THREE.Color('#aee8ff'),
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glow = new THREE.Sprite(glowMat);
    glow.position.set(0, 0, -30);
    glow.scale.set(34, 34, 1);
    scene.add(glow);

    let raf = 0;
    let start = 0;
    const easeIn = (t: number) => t * t * t;
    const posAttr = geo.getAttribute('position') as THREE.BufferAttribute;

    const draw = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / duration, 1);
      const warp = easeIn(p);

      const speed = (10 + warp * 150) * (duration / 2200);
      for (let i = 0; i < COUNT; i++) {
        const s = stars[i];
        s.pz = s.z;
        s.z += speed * 0.016; // 约每帧位移
        if (s.z > -0.5) {
          s.z = -SPREAD - Math.random() * 6;
          s.pz = s.z;
          s.x = (Math.random() - 0.5) * SPREAD * 1.6;
          s.y = (Math.random() - 0.5) * SPREAD * 1.6;
        }
        // 尾（远）→ 头（近）
        posAttr.setXYZ(i * 2, s.x, s.y, s.pz);
        posAttr.setXYZ(i * 2 + 1, s.x, s.y, s.z);
      }
      posAttr.needsUpdate = true;

      lineMat.opacity = 0.5 + warp * 0.5;
      glowMat.opacity = 0.08 + warp * 0.5;
      const gs = 30 + warp * 16;
      glow.scale.set(gs, gs, 1);

      // 尾声闪白
      if (flashRef.current) {
        flashRef.current.style.opacity =
          p > 0.82 ? String(((p - 0.82) / 0.18) * 0.95) : '0';
      }

      renderer.render(scene, camera);
      if (p < 1) {
        raf = window.requestAnimationFrame(draw);
      } else {
        finish();
      }
    };
    raf = window.requestAnimationFrame(draw);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      geo.dispose();
      lineMat.dispose();
      glowMat.dispose();
      glowTex.dispose();
      renderer.dispose();
      canvas.remove();
    };
    // 穿梭动画仅在挂载时播放一次
  }, []);

  return (
    <div
      className={`stargate-warp ${fading ? 'stargate-warp--out' : ''}`}
      aria-hidden
    >
      <div ref={mountRef} className="block w-full h-full" />
      <div ref={flashRef} className="stargate-warp__flash" />
      <div className="stargate-warp__label">
        <span className="stargate-warp__title">ENTERING&nbsp;STARGATE</span>
        <span className="stargate-warp__sub">正在建立时空跃迁…</span>
      </div>
    </div>
  );
};

export default Warp;
