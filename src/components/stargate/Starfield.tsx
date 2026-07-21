import React, { useEffect, useRef } from 'react';

/**
 * 环境星海 —— 纯 Canvas 铺底的深空群星，零依赖。
 *
 * 数百颗微光星分多层视差 + 几团柔和星云，轻微 twinkle 与漂移；随平移做视差
 * 产生纵深。星点位置用一次性 seeded PRNG 生成（挂载即定，稳定不跳）。
 *
 * SSG / 测试安全：绘制都在 useEffect（仅客户端）；getContext 为 null（如 jsdom）
 * 时静默跳过。尊重 prefers-reduced-motion：只静态绘制一帧，不做动画。
 *
 * 通过 viewRef 读取当前平移量做视差，避免每次平移都重启动画循环。
 */
interface StarfieldProps {
  /** 当前视图平移量（px），用于视差；由父组件的 view 状态镜像而来 */
  viewRef: React.MutableRefObject<{ tx: number; ty: number; scale: number }>;
}

// mulberry32：小巧确定性 PRNG，让星海每次挂载形状一致
const mulberry32 = (seed: number) => {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const mod = (n: number, m: number) => ((n % m) + m) % m;

interface Star {
  nx: number; // 归一化位置 [0,1)
  ny: number;
  size: number;
  base: number; // 基础亮度
  tw: number; // twinkle 速度
  phase: number; // twinkle 相位
  color: [number, number, number];
  layer: number; // 0..2，越大越"近"（视差更强、更亮）
}

// 星色：以冷白/淡蓝为主，偶见暖金与紫，模拟真实星等分布
const pickColor = (r: number): [number, number, number] => {
  if (r < 0.62) return [212, 230, 255]; // 冷白
  if (r < 0.82) return [150, 200, 255]; // 淡蓝
  if (r < 0.93) return [255, 226, 178]; // 暖金
  return [200, 170, 255]; // 淡紫
};

const LAYERS = [
  {
    frac: 0.58,
    speed: 0.0016,
    parallax: 0.05,
    sMin: 0.4,
    sMax: 1.0,
    bMin: 0.2,
    bMax: 0.45,
  },
  {
    frac: 0.32,
    speed: 0.0052,
    parallax: 0.14,
    sMin: 0.7,
    sMax: 1.5,
    bMin: 0.35,
    bMax: 0.7,
  },
  {
    frac: 0.1,
    speed: 0.011,
    parallax: 0.3,
    sMin: 1.1,
    sMax: 2.3,
    bMin: 0.6,
    bMax: 1.0,
  },
];

const NEBULAE = [
  { nx: 0.24, ny: 0.32, r: 0.42, c: [124, 58, 237], a: 0.1, par: 0.04 }, // 紫
  { nx: 0.74, ny: 0.28, r: 0.38, c: [192, 38, 211], a: 0.08, par: 0.06 }, // 品红
  { nx: 0.6, ny: 0.72, r: 0.46, c: [34, 211, 238], a: 0.07, par: 0.05 }, // 青
  { nx: 0.12, ny: 0.8, r: 0.3, c: [56, 90, 200], a: 0.06, par: 0.03 }, // 蓝
];

const Starfield: React.FC<StarfieldProps> = ({ viewRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return; // jsdom / 不支持 canvas：静默降级

    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let stars: Star[] = [];

    const build = () => {
      w = canvas.clientWidth || 800;
      h = canvas.clientHeight || 600;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // 星点总数随面积，封顶以护性能；移动端自然更少
      const total = Math.round(Math.min(1100, Math.max(320, (w * h) / 1500)));
      const rng = mulberry32(0x5a7f21);
      stars = [];
      LAYERS.forEach((L, li) => {
        const n = Math.round(total * L.frac);
        for (let i = 0; i < n; i++) {
          stars.push({
            nx: rng(),
            ny: rng(),
            size: L.sMin + rng() * (L.sMax - L.sMin),
            base: L.bMin + rng() * (L.bMax - L.bMin),
            tw: 0.6 + rng() * 1.8,
            phase: rng() * Math.PI * 2,
            color: pickColor(rng()),
            layer: li,
          });
        }
      });
    };

    const drawNebulae = (t: number) => {
      const { tx, ty } = viewRef.current;
      ctx.globalCompositeOperation = 'lighter';
      for (const nb of NEBULAE) {
        const drift = Math.sin(t * 0.06 + nb.nx * 6) * 0.02;
        const cx = mod(nb.nx + drift, 1) * w + tx * nb.par;
        const cy = nb.ny * h + ty * nb.par;
        const rad = nb.r * Math.max(w, h);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        const [r, gr, b] = nb.c;
        g.addColorStop(0, `rgba(${r},${gr},${b},${nb.a})`);
        g.addColorStop(1, `rgba(${r},${gr},${b},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.globalCompositeOperation = 'source-over';
    };

    const drawStars = (t: number) => {
      const { tx, ty } = viewRef.current;
      for (const s of stars) {
        const L = LAYERS[s.layer];
        const off = t * L.speed;
        const x = mod(s.nx + off, 1) * w + tx * L.parallax;
        const y = mod(s.ny + off * 0.4, 1) * h + ty * L.parallax;
        const px = mod(x, w);
        const py = mod(y, h);
        const tw = reduce ? 1 : 0.6 + 0.4 * Math.sin(t * s.tw + s.phase);
        const a = Math.max(0, Math.min(1, s.base * tw));
        const [r, g, b] = s.color;
        ctx.fillStyle = `rgba(${r},${g},${b},${a})`;
        ctx.beginPath();
        ctx.arc(px, py, s.size, 0, Math.PI * 2);
        ctx.fill();
        // 最亮层加一圈极淡光晕，制造"亮星"层次
        if (s.layer === 2 && a > 0.5) {
          ctx.fillStyle = `rgba(${r},${g},${b},${a * 0.12})`;
          ctx.beginPath();
          ctx.arc(px, py, s.size * 3.2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const frame = (t: number) => {
      ctx.clearRect(0, 0, w, h);
      drawNebulae(t);
      drawStars(t);
    };

    build();
    let raf = 0;
    let start = 0;
    const loop = (ts: number) => {
      if (!start) start = ts;
      frame((ts - start) / 1000);
      raf = window.requestAnimationFrame(loop);
    };

    if (reduce) {
      frame(0); // 只静态绘制一帧
    } else {
      raf = window.requestAnimationFrame(loop);
    }

    const onResize = () => build();
    window.addEventListener('resize', onResize);
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(() => build());
      ro.observe(canvas);
    }

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      ro?.disconnect();
    };
    // 星海只在挂载时构建一次；视差通过 viewRef 实时读取
  }, [viewRef]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
};

export default Starfield;
