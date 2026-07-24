import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Components } from 'react-markdown';
import Icon from '../Icon';
import Markdown from '../Markdown';
import { gardenNotes } from '../../data/content';
import type { GardenNote } from '../../types';
import { StargateScene, type SceneBodyMeta } from './three/StargateScene';
import { buildSystems } from './three/systems';
import { supportsWebGL } from './three/shaders';

type Stage = 'seedling' | 'budding' | 'evergreen';

// 成长阶段 → 恒星分类观感（暖金 / 青白 / 蓝紫）
const STAGE: Record<Stage, { label: string; color: string }> = {
  seedling: { label: '🌱 萌芽', color: '#fbbf24' },
  budding: { label: '🌿 生长', color: '#67e8f9' },
  evergreen: { label: '🌲 常青', color: '#a78bfa' },
};

const stageOf = (n: GardenNote): Stage => (n.stage as Stage) || 'seedling';

// 稳定的字符串散列，用于确定性星表编号
const hash = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

// 天文台观感的"星表编号"，如 HD 4821
const designation = (id: string): string => `HD ${1000 + (hash(id) % 8999)}`;

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

  // 关联图 → 恒星系（连通分量 = 恒星系，度数最高者为双星/三星核心，
  // 其余为行星/卫星，按开普勒轨道自行运动；纯确定性，SSG 可复现）
  const systems = useMemo(() => buildSystems(notes), [notes]);

  // 每个节点的展示元数据（标题 / 星表编号 / 阶段色 / 关联）
  const bodyMeta = useMemo<SceneBodyMeta[]>(
    () =>
      notes.map((n) => ({
        id: n.id,
        title: n.title,
        designation: designation(n.id),
        color: STAGE[stageOf(n)].color,
        links: n.links,
      })),
    [notes],
  );

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

    let scene: StargateScene | null = null;
    try {
      scene = new StargateScene({
        container: el,
        systems,
        meta: bodyMeta,
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
    // notes/systems/bodyMeta/byId 均为稳定 memo，场景只构建一次
  }, [notes, systems, bodyMeta, byId]);

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
        点击星体展开 · 拖拽旋转星系 · 滚轮推拉镜头
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
