import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import Warp from './stargate/Warp';
import '../styles/stargate.css';

// 数字花园（星海 + 星座 + Markdown 详情）按需加载，进一步瘦身首屏
const DigitalGarden = lazy(() => import('./stargate/DigitalGarden'));

// 抵达后角落控制台逐行打印的启动日志
const BOOT_LOG = [
  '> 初始化时空坐标……[OK]',
  '> 校准粒子对撞矩阵……[OK]',
  '> 建立跃迁通道 0x5A7F……[OK]',
  '> 载入数字花园 ⟶ 生长中的想法星图。',
];

const StargateSection: React.FC = () => {
  const [warping, setWarping] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const [consoleGone, setConsoleGone] = useState(false);
  const timers = useRef<number[]>([]);

  // 抵达后逐行打印启动日志，打完稍候自动淡隐，把舞台让给星海
  useEffect(() => {
    if (warping) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLines([]);
    setConsoleGone(false);
    BOOT_LOG.forEach((line, i) => {
      const t = window.setTimeout(
        () => setLines((prev) => [...prev, line]),
        300 * (i + 1),
      );
      timers.current.push(t);
    });
    const gone = window.setTimeout(
      () => setConsoleGone(true),
      300 * (BOOT_LOG.length + 1) + 2800,
    );
    timers.current.push(gone);
    return () => timers.current.forEach(clearTimeout);
  }, [warping]);

  return (
    <div className="stargate-stage relative h-[calc(100dvh-4.5rem)] min-h-[520px] w-full">
      {warping && <Warp onDone={() => setWarping(false)} />}

      {/* 星海 + 星座填满整个舞台 */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center text-cyan-300/60 font-mono text-sm">
            <Icon name="spinner" spin className="text-2xl" />
            <p className="mt-3">星图加载中…</p>
          </div>
        }
      >
        <DigitalGarden />
      </Suspense>

      {/* 氛围叠层 */}
      <div className="stargate-scanlines" />
      <div className="stargate-vignette" />

      {/* 左上 HUD：标题 / 状态 / 重新穿越 / 简介 */}
      <div className="stargate-hud pointer-events-none absolute top-4 left-4 z-10 max-w-[min(20rem,70vw)]">
        <div className="flex items-center gap-2 text-[10px] tracking-[0.28em] text-cyan-300/70 mb-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          LINK&nbsp;ESTABLISHED
        </div>
        <h2
          className="stargate-glitch text-3xl sm:text-5xl leading-none"
          data-text="STARGATE"
        >
          STARGATE
        </h2>
        <p className="text-cyan-100/70 tracking-[0.42em] text-xs sm:text-sm mt-1.5">
          星&nbsp;际&nbsp;之&nbsp;门
        </p>
        <p className="text-[12px] leading-relaxed text-slate-300/60 mt-3">
          简历之外的实验空间 —— 一个持续建造中的赛博前端沙盒。
        </p>
        <button
          onClick={() => setWarping(true)}
          className="stargate-neon pointer-events-auto mt-3 rounded-full px-3 py-1 inline-flex items-center gap-1.5 font-mono text-[11px]"
        >
          <Icon name="redo" />
          重新穿越
        </button>
      </div>

      {/* 右上 HUD：启动控制台（打完淡隐） */}
      <div
        className={`stargate-panel stargate-hud stargate-bracket pointer-events-none absolute top-4 right-4 z-10 hidden sm:block w-[19rem] rounded-md p-3 text-[12px] leading-6 text-cyan-200/90 transition-opacity duration-700 ${
          consoleGone ? 'opacity-0' : 'opacity-100'
        }`}
      >
        <div className="flex items-center gap-1.5 mb-1.5">
          <span className="w-2 h-2 rounded-full bg-red-400/80" />
          <span className="w-2 h-2 rounded-full bg-yellow-400/80" />
          <span className="w-2 h-2 rounded-full bg-emerald-400/80" />
          <span className="stargate-catalog ml-1">BOOT · 0x5A7F</span>
        </div>
        {lines.map((l, i) => (
          <div
            key={i}
            className={i === lines.length - 1 ? 'stargate-caret' : ''}
          >
            {l}
          </div>
        ))}
        {lines.length === 0 && <div className="stargate-caret">&nbsp;</div>}
      </div>
    </div>
  );
};

export default StargateSection;
