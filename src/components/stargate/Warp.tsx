import React, { useEffect, useRef, useState } from 'react';

interface WarpProps {
  /** 穿梭动画结束后回调（覆盖层已淡出） */
  onDone: () => void;
  /** 总时长（毫秒），默认 2200ms */
  duration?: number;
}

interface Star {
  x: number;
  y: number;
  z: number;
  pz: number;
  hue: number;
}

/**
 * 时空穿梭 —— 纯 Canvas 实现的超光速星场（hyperspace warp），零依赖。
 *
 * 星点从中心向外加速飞散并拉出拖尾，速度随时间指数式爬升，
 * 临近尾声时中心爆发一道光晕闪白，随后整层淡出、揭示星际之门内景。
 *
 * SSG 安全：所有绘制都在 useEffect 内（仅客户端）；getContext 失败（如测试环境）
 * 时静默跳过绘制，仅按时序淡出并回调，保证内容始终可揭示。
 * 尊重 prefers-reduced-motion：直接短暂淡出，不做剧烈运动。
 */
const Warp: React.FC<WarpProps> = ({ onDone, duration = 2200 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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

    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    // 无 canvas 支持（如 jsdom）：按时序淡出即可，保证内容可揭示
    if (!canvas || !ctx) {
      const t = window.setTimeout(finish, Math.min(duration, 800));
      return () => window.clearTimeout(t);
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let cx = 0;
    let cy = 0;

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      cx = w / 2;
      cy = h / 2;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // 生成星点：z 为深度，越小越近
    const COUNT = Math.round(Math.min(900, Math.max(360, (w * h) / 1600)));
    const spread = Math.max(w, h);
    const stars: Star[] = Array.from({ length: COUNT }, () => {
      const z = Math.random() * spread;
      return {
        x: (Math.random() - 0.5) * spread * 2,
        y: (Math.random() - 0.5) * spread * 2,
        z,
        pz: z,
        // 赛博朋克配色：青(190) / 品红(300) / 紫(265)
        hue: [190, 300, 265, 210][Math.floor(Math.random() * 4)],
      };
    });

    let raf = 0;
    let start = 0;
    const easeIn = (t: number) => t * t * t; // 加速爬升

    const draw = (ts: number) => {
      if (!start) start = ts;
      const elapsed = ts - start;
      const p = Math.min(elapsed / duration, 1);
      const warp = easeIn(p); // 0→1 速度系数

      // 拖影：不完全清屏，形成流光轨迹
      ctx.fillStyle = `rgba(3, 6, 20, ${0.28 - warp * 0.12})`;
      ctx.fillRect(0, 0, w, h);

      const speed = 6 + warp * 90;
      ctx.lineCap = 'round';

      for (const s of stars) {
        s.pz = s.z;
        s.z -= speed;
        if (s.z < 1) {
          // 回收到远处，从中心重新飞出
          s.z = spread;
          s.pz = spread;
          s.x = (Math.random() - 0.5) * spread * 2;
          s.y = (Math.random() - 0.5) * spread * 2;
        }
        const sx = cx + (s.x / s.z) * spread;
        const sy = cy + (s.y / s.z) * spread;
        const px = cx + (s.x / s.pz) * spread;
        const py = cy + (s.y / s.pz) * spread;

        if (sx < -50 || sx > w + 50 || sy < -50 || sy > h + 50) continue;

        const size = Math.max(0.4, (1 - s.z / spread) * 2.6);
        const light = 55 + warp * 25;
        ctx.strokeStyle = `hsla(${s.hue}, 100%, ${light}%, ${0.5 + warp * 0.5})`;
        ctx.lineWidth = size;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }

      // 中心辉光，随进度增强
      const glow = ctx.createRadialGradient(cx, cy, 0, cx, cy, spread * 0.5);
      const a = 0.05 + warp * 0.35;
      glow.addColorStop(0, `rgba(180, 240, 255, ${a})`);
      glow.addColorStop(0.5, `rgba(150, 90, 255, ${a * 0.4})`);
      glow.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // 尾声闪白
      if (p > 0.82) {
        const flash = (p - 0.82) / 0.18;
        ctx.fillStyle = `rgba(255, 255, 255, ${flash * 0.9})`;
        ctx.fillRect(0, 0, w, h);
      }

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
    };
    // 穿梭动画仅在挂载时播放一次
  }, []);

  return (
    <div
      className={`stargate-warp ${fading ? 'stargate-warp--out' : ''}`}
      aria-hidden
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
      <div className="stargate-warp__label">
        <span className="stargate-warp__title">ENTERING&nbsp;STARGATE</span>
        <span className="stargate-warp__sub">正在建立时空跃迁…</span>
      </div>
    </div>
  );
};

export default Warp;
