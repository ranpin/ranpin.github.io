import React, { useEffect, useMemo, useRef, useState } from 'react';
import Icon from '../Icon';
import Markdown from '../Markdown';
import { gardenNotes } from '../../data/content';
import type { GardenNote } from '../../types';

// 逻辑坐标空间（星图的内部尺寸，与容器解耦，靠 SVG/百分比线性映射）
const W = 1000;
const H = 640;

type Stage = 'seedling' | 'budding' | 'evergreen';

const STAGE: Record<Stage, { label: string; color: string }> = {
  seedling: { label: '🌱 萌芽', color: '#34d399' },
  budding: { label: '🌿 生长', color: '#22d3ee' },
  evergreen: { label: '🌲 常青', color: '#a78bfa' },
};

const stageOf = (n: GardenNote): Stage => (n.stage as Stage) || 'seedling';

// 稳定的字符串散列，用于确定性的初始布局（避免每次渲染跳动）
const hash = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

interface Pt {
  x: number;
  y: number;
}

// 轻量力导向布局：斥力 + 边弹簧 + 向心引力，固定迭代次数，确定性输出
const computeLayout = (
  nodes: GardenNote[],
  edges: { a: number; b: number }[],
): Record<string, Pt> => {
  const n = nodes.length;
  const cx = W / 2;
  const cy = H / 2;
  const pos: Pt[] = nodes.map((nd, i) => {
    const ang = (i / Math.max(1, n)) * Math.PI * 2;
    const r = 180 + (hash(nd.id) % 90);
    return { x: cx + Math.cos(ang) * r, y: cy + Math.sin(ang) * r };
  });

  const K = 190; // 理想边长
  const REP = 42000; // 斥力强度
  const ITER = 420;

  for (let it = 0; it < ITER; it++) {
    const cool = 1 - it / ITER;
    const disp: Pt[] = pos.map(() => ({ x: 0, y: 0 }));

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = pos[i].x - pos[j].x;
        const dy = pos[i].y - pos[j].y;
        const d2 = dx * dx + dy * dy || 0.01;
        const d = Math.sqrt(d2);
        const f = REP / d2;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        disp[i].x += fx;
        disp[i].y += fy;
        disp[j].x -= fx;
        disp[j].y -= fy;
      }
    }
    for (const e of edges) {
      const dx = pos[e.a].x - pos[e.b].x;
      const dy = pos[e.a].y - pos[e.b].y;
      const d = Math.sqrt(dx * dx + dy * dy) || 0.01;
      const f = (d - K) * 0.06;
      const fx = (dx / d) * f;
      const fy = (dy / d) * f;
      disp[e.a].x -= fx;
      disp[e.a].y -= fy;
      disp[e.b].x += fx;
      disp[e.b].y += fy;
    }
    for (let i = 0; i < n; i++) {
      disp[i].x += (cx - pos[i].x) * 0.012;
      disp[i].y += (cy - pos[i].y) * 0.012;
    }
    const maxStep = 28 * cool + 2;
    for (let i = 0; i < n; i++) {
      const d = Math.sqrt(disp[i].x ** 2 + disp[i].y ** 2) || 0.01;
      const s = Math.min(d, maxStep);
      pos[i].x += (disp[i].x / d) * s;
      pos[i].y += (disp[i].y / d) * s;
    }
  }

  // 归一化到留边的画布内
  const pad = 70;
  const xs = pos.map((p) => p.x);
  const ys = pos.map((p) => p.y);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const sx = (W - pad * 2) / Math.max(1, maxX - minX);
  const sy = (H - pad * 2) / Math.max(1, maxY - minY);
  const s = Math.min(sx, sy);
  const out: Record<string, Pt> = {};
  nodes.forEach((nd, i) => {
    out[nd.id] = {
      x: pad + (pos[i].x - minX) * s,
      y: pad + (pos[i].y - minY) * s,
    };
  });
  return out;
};

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

// 把正文里的 [[id]] 记法替换为目标节点标题，避免 Markdown 里出现生硬的方括号
const prettify = (md: string, byId: Map<string, GardenNote>): string =>
  md.replace(/\[\[([^\]]+)\]\]/g, (_, id: string) => byId.get(id)?.title ?? id);

const DigitalGarden: React.FC = () => {
  const notes = gardenNotes;
  const byId = useMemo(() => new Map(notes.map((n) => [n.id, n])), [notes]);

  // 无向边（去重，且两端都存在）
  const edges = useMemo(() => {
    const idx = new Map(notes.map((n, i) => [n.id, i]));
    const seen = new Set<string>();
    const list: { a: number; b: number }[] = [];
    notes.forEach((n) => {
      (n.links || []).forEach((t) => {
        if (!idx.has(n.id) || !idx.has(t)) return;
        const key = [n.id, t].sort().join('|');
        if (seen.has(key)) return;
        seen.add(key);
        list.push({ a: idx.get(n.id)!, b: idx.get(t)! });
      });
    });
    return list;
  }, [notes]);

  const layout = useMemo(() => computeLayout(notes, edges), [notes, edges]);

  // 每个节点的度（连线数），用于决定星点大小
  const degree = useMemo(() => {
    const d: Record<string, number> = {};
    notes.forEach((n) => (d[n.id] = 0));
    edges.forEach((e) => {
      d[notes[e.a].id]++;
      d[notes[e.b].id]++;
    });
    return d;
  }, [notes, edges]);

  const neighbors = useMemo(() => {
    const m: Record<string, Set<string>> = {};
    notes.forEach((n) => (m[n.id] = new Set()));
    edges.forEach((e) => {
      m[notes[e.a].id].add(notes[e.b].id);
      m[notes[e.b].id].add(notes[e.a].id);
    });
    return m;
  }, [notes, edges]);

  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<GardenNote | null>(null);
  const active = hovered; // 悬停时高亮

  // 视图变换（平移/缩放）
  const [view, setView] = useState({ tx: 0, ty: 0, scale: 1 });
  const viewportRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(
    null,
  );

  // 滚轮缩放（以光标为锚点）——用非被动监听以便 preventDefault
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = el.getBoundingClientRect();
      const mx = e.clientX - rect.left;
      const my = e.clientY - rect.top;
      setView((v) => {
        const factor = e.deltaY < 0 ? 1.12 : 1 / 1.12;
        const ns = clamp(v.scale * factor, 0.55, 3);
        const wx = (mx - v.tx) / v.scale;
        const wy = (my - v.ty) / v.scale;
        return { scale: ns, tx: mx - wx * ns, ty: my - wy * ns };
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('[data-node]')) return; // 点星点不平移
    drag.current = { x: e.clientX, y: e.clientY, tx: view.tx, ty: view.ty };
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!drag.current) return;
    setView((v) => ({
      ...v,
      tx: drag.current!.tx + (e.clientX - drag.current!.x),
      ty: drag.current!.ty + (e.clientY - drag.current!.y),
    }));
  };
  const endDrag = () => {
    drag.current = null;
  };
  const zoom = (factor: number) =>
    setView((v) => ({ ...v, scale: clamp(v.scale * factor, 0.55, 3) }));
  const reset = () => setView({ tx: 0, ty: 0, scale: 1 });

  const dim = (id: string) =>
    active && active !== id && !neighbors[active]?.has(id);

  if (notes.length === 0) {
    return (
      <div className="relative text-center py-20 text-slate-400/70 font-mono text-sm">
        花园尚未播种 —— 在 content/garden/ 添加节点即可生长。
      </div>
    );
  }

  return (
    <div className="relative">
      {/* 图例 + 提示 */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-[11px] font-mono">
        <div className="flex items-center gap-3">
          {(Object.keys(STAGE) as Stage[]).map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{
                  background: STAGE[s].color,
                  boxShadow: `0 0 8px ${STAGE[s].color}`,
                }}
              />
              <span className="text-slate-300/70">{STAGE[s].label}</span>
            </span>
          ))}
        </div>
        <span className="text-slate-400/50">
          点击星点展开 · 拖拽平移 · 滚轮缩放
        </span>
      </div>

      {/* 星图视口 */}
      <div
        ref={viewportRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        className="relative w-full h-[520px] sm:h-[600px] rounded-xl border border-cyan-400/20 overflow-hidden cursor-grab active:cursor-grabbing bg-[radial-gradient(ellipse_at_center,rgba(30,50,110,0.35),rgba(5,8,28,0.9))]"
      >
        {/* 世界层：平移/缩放整体作用于此 */}
        <div
          className="absolute inset-0 origin-top-left"
          style={{
            transform: `translate(${view.tx}px, ${view.ty}px) scale(${view.scale})`,
          }}
        >
          {/* 连线 */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox={`0 0 ${W} ${H}`}
            preserveAspectRatio="none"
          >
            {edges.map((e, i) => {
              const A = notes[e.a];
              const B = notes[e.b];
              const pa = layout[A.id];
              const pb = layout[B.id];
              const lit = active && (active === A.id || active === B.id);
              return (
                <line
                  key={i}
                  x1={pa.x}
                  y1={pa.y}
                  x2={pb.x}
                  y2={pb.y}
                  stroke={lit ? '#7dd3fc' : '#3b6ea5'}
                  strokeWidth={lit ? 1.6 : 0.8}
                  strokeOpacity={active ? (lit ? 0.9 : 0.12) : 0.35}
                />
              );
            })}
          </svg>

          {/* 星点 */}
          {notes.map((n) => {
            const p = layout[n.id];
            const st = STAGE[stageOf(n)];
            const size = 12 + Math.min(degree[n.id] || 0, 5) * 4;
            const faded = dim(n.id);
            const isActive = active === n.id;
            return (
              <button
                key={n.id}
                data-node
                onMouseEnter={() => setHovered(n.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(n.id)}
                onBlur={() => setHovered(null)}
                onClick={() => setSelected(n)}
                aria-label={`${n.title}（${st.label}）`}
                className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 focus:outline-none transition-opacity"
                style={{
                  left: `${(p.x / W) * 100}%`,
                  top: `${(p.y / H) * 100}%`,
                  opacity: faded ? 0.25 : 1,
                }}
              >
                <span
                  className="rounded-full transition-transform"
                  style={{
                    width: size,
                    height: size,
                    background: st.color,
                    boxShadow: `0 0 ${isActive ? 22 : 12}px ${st.color}, 0 0 4px #fff inset`,
                    transform: isActive ? 'scale(1.35)' : 'scale(1)',
                  }}
                />
                <span
                  className="text-[11px] leading-none whitespace-nowrap px-1.5 py-0.5 rounded font-medium"
                  style={{
                    color: isActive ? '#fff' : 'rgba(207,230,255,0.8)',
                    textShadow: '0 1px 3px rgba(0,0,0,0.8)',
                  }}
                >
                  {n.title}
                </span>
              </button>
            );
          })}
        </div>

        {/* 缩放控件 */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
          {[
            { t: '放大', ic: 'plus', fn: () => zoom(1.2) },
            { t: '缩小', ic: 'arrow-down', fn: () => zoom(1 / 1.2) },
            { t: '重置视图', ic: 'redo', fn: reset },
          ].map((b) => (
            <button
              key={b.ic}
              onClick={b.fn}
              title={b.t}
              aria-label={b.t}
              className="stargate-neon w-8 h-8 rounded-md flex items-center justify-center text-sm"
            >
              <Icon name={b.ic} />
            </button>
          ))}
        </div>

        {/* 详情面板 */}
        {selected && (
          <div className="absolute inset-y-0 right-0 w-full sm:w-[380px] bg-[#070c22]/95 backdrop-blur-md border-l border-cyan-400/25 shadow-[0_0_40px_-10px_rgba(80,200,255,0.5)] flex flex-col animate-fade-in">
            <div className="flex items-start justify-between gap-3 p-5 border-b border-white/10">
              <div>
                <span
                  className="inline-block text-[11px] font-mono px-2 py-0.5 rounded mb-2"
                  style={{
                    color: STAGE[stageOf(selected)].color,
                    border: `1px solid ${STAGE[stageOf(selected)].color}66`,
                  }}
                >
                  {STAGE[stageOf(selected)].label}
                </span>
                <h3 className="text-lg font-bold text-cyan-50 leading-snug">
                  {selected.title}
                </h3>
                {selected.updated && (
                  <p className="text-[11px] font-mono text-slate-400/60 mt-1">
                    更新于 {selected.updated}
                  </p>
                )}
              </div>
              <button
                onClick={() => setSelected(null)}
                aria-label="关闭"
                className="stargate-neon w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0"
              >
                <Icon name="times" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex-1">
              <Markdown className="prose-invert prose-sm prose-headings:text-cyan-100 prose-a:text-cyan-300">
                {prettify(selected.content || '', byId)}
              </Markdown>

              {(selected.links || []).filter((id) => byId.has(id)).length >
                0 && (
                <div className="mt-6">
                  <p className="text-[11px] font-mono tracking-widest text-cyan-400/60 mb-2">
                    关联节点
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {(selected.links || [])
                      .filter((id) => byId.has(id))
                      .map((id) => {
                        const t = byId.get(id)!;
                        return (
                          <button
                            key={id}
                            onClick={() => setSelected(t)}
                            className="stargate-neon rounded-full px-3 py-1 text-xs inline-flex items-center gap-1.5"
                          >
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: STAGE[stageOf(t)].color }}
                            />
                            {t.title}
                          </button>
                        );
                      })}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DigitalGarden;
