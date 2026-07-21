import React, { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import Warp from './stargate/Warp';
import '../styles/stargate.css';

// 数字花园（星图 + Markdown 详情，含 react-markdown）按需加载，进一步瘦身首屏
const DigitalGarden = lazy(() => import('./stargate/DigitalGarden'));

// 启动终端逐行打印的日志
const BOOT_LOG = [
  '> 初始化时空坐标……[OK]',
  '> 校准粒子对撞矩阵……[OK]',
  '> 建立跃迁通道 0x5A7F……[OK]',
  '> 载入数字花园 ⟶ 生长中的想法星图。',
];

const StargateSection: React.FC = () => {
  const [warping, setWarping] = useState(true);
  const [lines, setLines] = useState<string[]>([]);
  const timers = useRef<number[]>([]);

  // 抵达后逐行打印启动日志
  useEffect(() => {
    if (warping) return;
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setLines([]);
    BOOT_LOG.forEach((line, i) => {
      const t = window.setTimeout(
        () => setLines((prev) => [...prev, line]),
        300 * (i + 1),
      );
      timers.current.push(t);
    });
    return () => timers.current.forEach(clearTimeout);
  }, [warping]);

  return (
    <div className="max-w-5xl mx-auto">
      {warping && <Warp onDone={() => setWarping(false)} />}

      <div className="stargate-stage px-4 py-10 sm:px-8 sm:py-14 animate-fade-in">
        <div className="stargate-grid" />
        <div className="stargate-scanlines" />

        {/* 顶部状态条 */}
        <div className="relative flex items-center justify-between text-[11px] font-mono tracking-widest text-cyan-300/70 mb-8">
          <span className="inline-flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            LINK&nbsp;ESTABLISHED
          </span>
          <button
            onClick={() => setWarping(true)}
            className="stargate-neon rounded-full px-3 py-1 inline-flex items-center gap-1.5 font-mono"
          >
            <Icon name="redo" />
            重新穿越
          </button>
        </div>

        {/* 主标题 */}
        <div className="relative text-center">
          <h2
            className="stargate-glitch text-4xl sm:text-6xl mb-3"
            data-text="STARGATE"
          >
            STARGATE
          </h2>
          <p className="text-cyan-100/80 tracking-[0.4em] text-sm sm:text-base mb-4">
            星&nbsp;际&nbsp;之&nbsp;门
          </p>
          <p className="max-w-xl mx-auto text-sm text-slate-300/70 leading-relaxed">
            简历之外的实验空间 —— 一个持续建造中的赛博前端沙盒。
            穿过这道门，看看代码还能玩出什么花样。
          </p>
        </div>

        {/* 启动终端 */}
        <div className="relative mx-auto mt-8 max-w-lg rounded-lg border border-cyan-400/25 bg-black/40 backdrop-blur-sm p-4 font-mono text-[13px] leading-6 text-cyan-200/90 shadow-[0_0_30px_-8px_rgba(80,200,255,0.4)]">
          <div className="flex gap-1.5 mb-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/80" />
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/80" />
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

        {/* 数字花园 */}
        <div className="relative mt-12">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="sparkles" className="text-cyan-300" />
            <h3 className="text-lg font-semibold text-cyan-50">
              数字花园
              <span className="ml-2 text-[10px] font-mono tracking-widest text-cyan-400/50">
                DIGITAL GARDEN
              </span>
            </h3>
          </div>
          <Suspense
            fallback={
              <div className="py-20 text-center text-cyan-300/60 font-mono text-sm">
                <Icon name="spinner" spin className="text-2xl" />
                <p className="mt-3">星图加载中…</p>
              </div>
            }
          >
            <DigitalGarden />
          </Suspense>
        </div>

        <p className="relative text-center text-[11px] font-mono tracking-widest text-slate-400/50 mt-10">
          // MORE MODULES INCOMING —— 交互实验场 / 作品墙 / 信号留言 建设中
        </p>
      </div>
    </div>
  );
};

export default StargateSection;
