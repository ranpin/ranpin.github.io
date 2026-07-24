import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Components } from 'react-markdown';
import Icon from '../Icon';
import Markdown from '../Markdown';
import { gardenNotes } from '../../data/content';
import type { GardenNote } from '../../types';
import { StargateScene, type SceneNode } from './three/StargateScene';
import { supportsWebGL } from './three/shaders';

type Stage = 'seedling' | 'budding' | 'evergreen';

// 成长阶段 → 恒星分类观感（暖金 / 青白 / 蓝紫）
const STAGE: Record<Stage, { label: string; color: string }> = {
  seedling: { label: '🌱 萌芽', color: '#fbbf24' },
  budding: { label: '🌿 生长', color: '#67e8f9' },
  evergreen: { label: '🌲 常青', color: '#a78bfa' },
};

const stageOf = (n: GardenNote): Stage => (n.stage as Stage) || 'seedling';

// 稳定的字符串散列，用于确定性布局与星表编号
const hash = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

// 天文台观感的"星表编号"，如 HD 4821
const designation = (id: string): string => `HD ${1000 + (hash(id) % 8999)}`;

interface Pt3 {
  x: number;
  y: number;
  z: number;
}

// 3D 力导向布局：斥力 + 边弹簧 + 向心引力，固定迭代，确定性输出。
// 初始位置取斐波那契球面 + 哈希半径抖动，避免节点共面塌缩。
const computeLayout3D = (
  nodes: GardenNote[],
  edges: { a: number; b: number }[],
): Record<string, Pt3> => {
  const n = nodes.length;
  const GOLDEN = 2.399963229728653;
  const pos: Pt3[] = nodes.map((nd, i) => {
    const ga = i * GOLDEN;
    const yy = 1 - (2 * (i + 0.5)) / Math.max(1, n);
    const rr = Math.sqrt(Math.max(0, 1 - yy * yy));
    const rad = 190 + (hash(nd.id) % 70);
    return {
      x: Math.cos(ga) * rr * rad,
      y: yy * rad,
      z: Math.sin(ga) * rr * rad,
    };
  });

  const K = 190;
  const REP = 42000;
  const ITER = 420;

  for (let it = 0; it < ITER; it++) {
    const cool = 1 - it / ITER;
    const disp: Pt3[] = pos.map(() => ({ x: 0, y: 0, z: 0 }));
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const dx = pos[i].x - pos[j].x;
        const dy = pos[i].y - pos[j].y;
        const dz = pos[i].z - pos[j].z;
        const d2 = dx * dx + dy * dy + dz * dz || 0.01;
        const d = Math.sqrt(d2);
        const f = REP / d2;
        const fx = (dx / d) * f;
        const fy = (dy / d) * f;
        const fz = (dz / d) * f;
        disp[i].x += fx;
        disp[i].y += fy;
        disp[i].z += fz;
        disp[j].x -= fx;
        disp[j].y -= fy;
        disp[j].z -= fz;
      }
    }
    for (const e of edges) {
      const dx = pos[e.a].x - pos[e.b].x;
      const dy = pos[e.a].y - pos[e.b].y;
      const dz = pos[e.a].z - pos[e.b].z;
      const d = Math.sqrt(dx * dx + dy * dy + dz * dz) || 0.01;
      const f = (d - K) * 0.06;
      const fx = (dx / d) * f;
      const fy = (dy / d) * f;
      const fz = (dz / d) * f;
      disp[e.a].x -= fx;
      disp[e.a].y -= fy;
      disp[e.a].z -= fz;
      disp[e.b].x += fx;
      disp[e.b].y += fy;
      disp[e.b].z += fz;
    }
    for (let i = 0; i < n; i++) {
      disp[i].x += -pos[i].x * 0.012;
      disp[i].y += -pos[i].y * 0.012;
      disp[i].z += -pos[i].z * 0.012;
    }
    const maxStep = 28 * cool + 2;
    for (let i = 0; i < n; i++) {
      const d =
        Math.sqrt(disp[i].x ** 2 + disp[i].y ** 2 + disp[i].z ** 2) || 0.01;
      const s = Math.min(d, maxStep) / d;
      pos[i].x += disp[i].x * s;
      pos[i].y += disp[i].y * s;
      pos[i].z += disp[i].z * s;
    }
  }

  // 归一化到单位球；y 略压扁以适配宽幅舞台
  let maxR = 0;
  pos.forEach((p) => {
    maxR = Math.max(maxR, Math.hypot(p.x, p.y, p.z));
  });
  const s = 1 / (maxR || 1);
  const out: Record<string, Pt3> = {};
  nodes.forEach((nd, i) => {
    out[nd.id] = {
      x: pos[i].x * s,
      y: pos[i].y * s * 0.82,
      z: pos[i].z * s,
    };
  });
  return out;
};

// 颜色混合：用于图例小圆点的球体观感渐变
const mixColor = (hex: string, hex2: string, t: number): string => {
  const a = parseInt(hex.slice(1), 16);
  const b = parseInt(hex2.slice(1), 16);
  const ch = (sh: number) => {
    const c1 = (a >> sh) & 255;
    const c2 = (b >> sh) & 255;
    return Math.round(c1 * (1 - t) + c2 * t);
  };
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
};

// 把正文里的 [[id]] 记法转成可点击的内部链接（href 为 #gnode-<id>）
const WIKI_HREF = '#gnode-';
const linkifyWikiLinks = (md: string, byId: Map<string, GardenNote>): string =>
  md.replace(/\[\[([^\]]+)\]\]/g, (_, id: string) => {
    const t = byId.get(id);
    return t ? `[${t.title}](${WIKI_HREF}${id})` : id;
  });

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

  const layout = useMemo(() => computeLayout3D(notes, edges), [notes, edges]);

  // 每个节点的度（连线数），用于决定恒星半径
  const degree = useMemo(() => {
    const d: Record<string, number> = {};
    notes.forEach((n) => (d[n.id] = 0));
    edges.forEach((e) => {
      d[notes[e.a].id]++;
      d[notes[e.b].id]++;
    });
    return d;
  }, [notes, edges]);

  const [hovered, setHovered] = useState<string | null>(null);
  const [selected, setSelected] = useState<GardenNote | null>(null);
  const [noWebgl, setNoWebgl] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<StargateScene | null>(null);

  // 详情正文里的 [[双链]]：内部链接点击直接切换到目标节点；其余链接照常外开
  const mdComponents = useMemo<Components>(
    () => ({
      a({ href, children, ...props }) {
        if (href && href.startsWith(WIKI_HREF)) {
          const target = byId.get(href.slice(WIKI_HREF.length));
          if (target) {
            return (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault();
                  setSelected(target);
                }}
                className="text-cyan-300 underline decoration-dotted underline-offset-2 hover:text-cyan-100 transition-colors"
              >
                {children}
              </button>
            );
          }
        }
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      },
    }),
    [byId],
  );

  // ---------- 构建 / 销毁 three.js 场景（仅客户端且支持 WebGL） ----------
  useEffect(() => {
    const el = containerRef.current;
    if (!el || notes.length === 0) return;
    if (!supportsWebGL()) {
      setNoWebgl(true);
      return;
    }
    const reduce =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    const sceneNodes: SceneNode[] = notes.map((n) => ({
      id: n.id,
      title: n.title,
      designation: designation(n.id),
      color: STAGE[stageOf(n)].color,
      radius: 0.068 + Math.min(degree[n.id] || 0, 5) * 0.02,
      position: [layout[n.id].x, layout[n.id].y, layout[n.id].z],
    }));

    let scene: StargateScene | null = null;
    try {
      scene = new StargateScene({
        container: el,
        nodes: sceneNodes,
        edges,
        reduceMotion: reduce,
        onNodeClick: (id) => {
          const nd = byId.get(id);
          if (nd) setSelected((prev) => (prev?.id === id ? null : nd));
        },
        onNodeHover: (id) => setHovered(id),
      });
    } catch {
      setNoWebgl(true);
      return;
    }
    sceneRef.current = scene;
    return () => {
      scene?.dispose();
      sceneRef.current = null;
    };
    // notes/edges/layout/degree/byId 均为稳定 memo，场景只构建一次
  }, [notes, edges, layout, degree, byId]);

  // React 状态 → 场景（高亮 / fly-to）
  useEffect(() => {
    sceneRef.current?.setHovered(hovered);
  }, [hovered]);
  useEffect(() => {
    sceneRef.current?.setSelected(selected?.id ?? null);
  }, [selected]);

  const dolly = (factor: number) => sceneRef.current?.dolly(factor);
  const reset = () => sceneRef.current?.reset();

  if (notes.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-slate-400/70 font-mono text-sm">
        花园尚未播种 —— 在 content/garden/ 添加节点即可生长。
      </div>
    );
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* three.js 画布 + CSS2D 标签层由场景管理器注入到此容器 */}
      <div
        ref={containerRef}
        className="sg3-viewport absolute inset-0 cursor-grab active:cursor-grabbing"
      />

      {/* 无 WebGL 时的降级提示（挂载后才渲染，避免 SSG 水合不一致） */}
      {noWebgl && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 text-slate-400/70 font-mono text-sm pointer-events-none">
          <p>当前环境不支持 WebGL，星图暂不可渲染。</p>
          <p className="text-[11px] text-slate-500/60">
            想法笔记仍可在下方 HUD 中浏览。
          </p>
        </div>
      )}

      {/* 图例（左下 HUD） */}
      <div className="stargate-panel stargate-hud absolute bottom-3 left-3 rounded-md px-3 py-2 text-[11px] pointer-events-none z-10">
        <div className="stargate-catalog mb-1.5">GROWTH · 成长阶段</div>
        <div className="flex flex-col gap-1">
          {(Object.keys(STAGE) as Stage[]).map((s) => (
            <span key={s} className="inline-flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: `radial-gradient(circle at 32% 28%, #fff, ${STAGE[s].color} 55%, ${mixColor(STAGE[s].color, '#04060f', 0.55)})`,
                  boxShadow: `0 0 8px ${STAGE[s].color}`,
                }}
              />
              <span className="text-slate-300/80">{STAGE[s].label}</span>
            </span>
          ))}
        </div>
      </div>

      {/* 镜头控件（右下 HUD） */}
      <div data-ui className="absolute bottom-3 right-3 flex flex-col gap-1.5 z-10">
        {[
          { t: '推近镜头', ic: 'plus', fn: () => dolly(1.25) },
          { t: '拉远镜头', ic: 'arrow-down', fn: () => dolly(1 / 1.25) },
          { t: '复位视角', ic: 'redo', fn: reset },
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

      {/* 操作提示（顶部居中，细小） */}
      <div className="stargate-catalog absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap z-10">
        点击恒星展开 · 拖拽旋转星图 · 滚轮推拉镜头
      </div>

      {/* 详情面板（右侧滑入） */}
      {selected && (
        <div
          data-ui
          className="stargate-hud absolute inset-y-0 right-0 w-full sm:w-[400px] bg-[#050a1c]/95 backdrop-blur-md border-l border-cyan-400/25 shadow-[0_0_50px_-12px_rgba(80,200,255,0.55)] flex flex-col animate-fade-in z-20"
        >
          <div className="flex items-start justify-between gap-3 p-5 border-b border-white/10">
            <div>
              <span className="stargate-catalog block mb-1">
                {designation(selected.id)}
              </span>
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
            <Markdown
              className="prose-invert prose-sm prose-headings:text-cyan-100 prose-a:text-cyan-300"
              components={mdComponents}
            >
              {linkifyWikiLinks(selected.content || '', byId)}
            </Markdown>

            {(selected.links || []).filter((id) => byId.has(id)).length > 0 && (
              <div className="mt-6">
                <p className="stargate-catalog mb-2">LINKED · 关联节点</p>
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
  );
};

export default DigitalGarden;
