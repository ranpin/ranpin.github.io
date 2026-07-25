import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import type { Components } from 'react-markdown';
import Icon from '../Icon';
import Markdown from '../Markdown';
import Warp from './Warp';
import { gardenNotes } from '../../data/content';
import type { GardenNote } from '../../types';
import {
  stargateGalaxies,
  docBodyById,
  galaxyOfBody,
  THREADS,
  type DocBody,
  type GalaxyId,
} from '../../data/stargateDocs';
import { StargateScene, type SceneBodyMeta } from './three/StargateScene';
import { buildGalaxies } from './three/galaxies';
import { supportsWebGL } from './three/shaders';

/* ---------- 导航取景距离（世界单位） ---------- */
const OVERVIEW_DIST = 26; // 总览：三星系宽三角形尽收眼底
const GALAXY_DIST = 8.5; // 星系内：单星系星团取景
const NAV_WARP_MS = 1100; // 星系跃迁的 warp 时长（比入场穿梭更短促）

// 稳定的字符串散列，用于确定性星表编号
const hash = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

// 天文台观感的"星表编号"，如 HD 4821
const designation = (id: string): string => `HD ${1000 + (hash(id) % 8999)}`;

// 把花园正文里的 [[id]] 记法转成可点击的内部链接（href 为 #gnode-<id>）
const WIKI_HREF = '#gnode-';
const linkifyWikiLinks = (md: string, byId: Map<string, GardenNote>): string =>
  md.replace(/\[\[([^\]]+)\]\]/g, (_, id: string) => {
    const t = byId.get(id);
    return t ? `[${t.title}](${WIKI_HREF}${id})` : id;
  });

/* ---------- 模块级索引（策展数据是静态的，构建一次） ---------- */
const galaxyById = new Map(stargateGalaxies.map((g) => [g.id, g]));
const threadById = new Map(THREADS.map((t) => [t.id, t]));
/** 花园笔记 id → 概念原子星体（wikilink 点击据此跳回星图） */
const atomByGardenId = new Map<string, DocBody>(
  stargateGalaxies.flatMap((g) =>
    g.bodies
      .filter((b) => b.gardenId)
      .map((b) => [b.gardenId as string, b] as const),
  ),
);

/** 全部星体（数据序），用于同主线关联的全宇宙遍历 */
const allBodies: DocBody[] = stargateGalaxies.flatMap((g) => g.bodies);
/** 语义母体 → 子星体（详情面板「子体」分组；保留语义真值而非渲染母体） */
const childrenByParentId = new Map<string, DocBody[]>();
for (const b of allBodies) {
  if (!b.parentId) continue;
  const arr = childrenByParentId.get(b.parentId) ?? [];
  arr.push(b);
  childrenByParentId.set(b.parentId, arr);
}

/** 同主线关联的展示上限（避免面板被长列表淹没） */
const RELATED_THREAD_CAP = 6;

interface RelatedBodies {
  parent: DocBody | null;
  children: DocBody[];
  sameThread: DocBody[];
}

/** 关联星体：母体 / 子体 / 同主线（重叠主线多者优先、同星系优先，其余保持数据序） */
const relatedOf = (body: DocBody): RelatedBodies => {
  const parent = body.parentId
    ? docBodyById.get(body.parentId) ?? null
    : null;
  const children = childrenByParentId.get(body.id) ?? [];
  const excluded = new Set<string>([
    body.id,
    ...(parent ? [parent.id] : []),
    ...children.map((c) => c.id),
  ]);
  const galaxy = galaxyOfBody.get(body.id);
  const overlap = (b: DocBody): number =>
    b.threads.reduce((n, t) => n + (body.threads.includes(t) ? 1 : 0), 0);
  const sameThread = allBodies
    .filter((b) => !excluded.has(b.id) && overlap(b) > 0)
    .sort(
      (a, b) =>
        overlap(b) - overlap(a) ||
        Number(galaxyOfBody.get(b.id) === galaxy) -
          Number(galaxyOfBody.get(a.id) === galaxy),
    )
    .slice(0, RELATED_THREAD_CAP);
  return { parent, children, sameThread };
};

/** 星体 → 星系主题色（关联星体 chips 着色） */
const bodyColor = (b: DocBody): string => {
  const gid = galaxyOfBody.get(b.id);
  return (gid ? galaxyById.get(gid)?.color : undefined) ?? '#67e8f9';
};

/** 关联星体分组：组名 + 可点 chips（跨星系由 selectBody 自动跃迁） */
const RelatedGroup: React.FC<{
  label: string;
  bodies: DocBody[];
  onPick: (b: DocBody) => void;
}> = ({ label, bodies, onPick }) => {
  if (bodies.length === 0) return null;
  return (
    <div className="mb-2.5 last:mb-0">
      <p className="text-[10px] font-mono text-slate-400/50 mb-1.5">{label}</p>
      <div className="flex flex-wrap gap-1.5">
        {bodies.map((b) => (
          <button
            key={b.id}
            type="button"
            onClick={() => onPick(b)}
            title={b.title}
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-slate-300/85 transition-colors hover:border-cyan-400/50 hover:text-white"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{
                background: bodyColor(b),
                boxShadow: `0 0 5px ${bodyColor(b)}66`,
              }}
            />
            <span className="truncate max-w-[11rem]">{b.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * 文档宇宙导航 —— 把 edge-ai-docs 的三大领域渲染为三个星系，
 * 以「总览 ↔ 星系」两级视图 + warp 跃迁在星际之门内穿行。
 *
 * 导航是纯相机运动（不重建场景）：三个星系始终在场，warp 覆盖层
 * （不透明星场）遮蔽相机瞬移，淡出后即已置身目标星系。
 */
const DigitalGarden: React.FC = () => {
  // 策展数据 → 可渲染星系（确定性，SSG 可复现）
  const galaxies = useMemo(() => buildGalaxies(stargateGalaxies), []);
  // 花园笔记索引：概念原子的详情正文仍来自数字花园
  const gardenById = useMemo(
    () => new Map(gardenNotes.map((n) => [n.id, n])),
    [],
  );

  // 每个星体的展示元数据：星系主题色着色辉光/恒星，galaxy 驱动标签显隐
  const bodyMeta = useMemo<SceneBodyMeta[]>(
    () =>
      stargateGalaxies.flatMap((g) =>
        g.bodies.map((b) => ({
          id: b.id,
          title: b.title,
          designation: designation(b.id),
          color: g.color,
          galaxy: g.id,
        })),
      ),
    [],
  );

  /* ---------- 导航状态机 ----------
     activeGalaxy = null → 总览；= GalaxyId → 置身该星系。
     ref 镜像供场景回调读取（回调闭包在场景构建时固化，须读活值）。 */
  const [activeGalaxy, setActiveGalaxy] = useState<GalaxyId | null>(null);
  const [selected, setSelected] = useState<DocBody | null>(null);
  const [hovered, setHovered] = useState<string | null>(null);
  const [noWebgl, setNoWebgl] = useState(false);
  const [warping, setWarping] = useState(false);
  const [warpKey, setWarpKey] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<StargateScene | null>(null);
  const activeGalaxyRef = useRef<GalaxyId | null>(null);
  /** 跃迁途中预定的选中星体（抵达后揭示详情） */
  const pendingSelectRef = useRef<string | null>(null);

  /** 跃迁到星系 / 返回总览。相机状态在 warp 遮蔽下瞬间切换。 */
  const navigateTo = useCallback(
    (galaxy: GalaxyId | null) => {
      if (galaxy === activeGalaxyRef.current) return;
      activeGalaxyRef.current = galaxy;
      setActiveGalaxy(galaxy);
      setSelected(null);
      setWarpKey((k) => k + 1);
      setWarping(true);
      const scene = sceneRef.current;
      if (scene) {
        scene.setSelected(null);
        scene.setActiveGalaxy(galaxy);
        if (galaxy) {
          const spec = galaxies.find((g) => g.id === galaxy);
          if (spec) scene.setNavView(spec.center, GALAXY_DIST, true);
        } else {
          scene.setNavView(null, OVERVIEW_DIST, true);
        }
      }
    },
    [galaxies],
  );

  /** 点击星体：不在当前星系 → 跃迁过去并选中；已在 → 开合详情。 */
  const handleBodyClick = useCallback(
    (id: string) => {
      const body = docBodyById.get(id);
      if (!body) return;
      const g = galaxyOfBody.get(id) ?? null;
      if (g && g !== activeGalaxyRef.current) {
        navigateTo(g);
        pendingSelectRef.current = id;
      } else {
        setSelected((prev) => (prev?.id === id ? null : body));
      }
    },
    [navigateTo],
  );

  /** 选中星体（wikilink 用）：跨星系时先跃迁。 */
  const selectBody = useCallback(
    (body: DocBody) => {
      const g = galaxyOfBody.get(body.id) ?? null;
      if (g && g !== activeGalaxyRef.current) {
        navigateTo(g);
        pendingSelectRef.current = body.id;
      } else {
        setSelected(body);
      }
    },
    [navigateTo],
  );

  const onWarpDone = useCallback(() => {
    setWarping(false);
    const pid = pendingSelectRef.current;
    pendingSelectRef.current = null;
    if (pid) {
      const body = docBodyById.get(pid);
      if (body) setSelected(body);
    }
  }, []);

  // 详情正文里的 [[双链]]：命中概念原子 → 跳回星图选中；其余链接照常外开
  const mdComponents = useMemo<Components>(
    () => ({
      a({ href, children, ...props }) {
        if (href && href.startsWith(WIKI_HREF)) {
          const atom = atomByGardenId.get(href.slice(WIKI_HREF.length));
          if (atom) {
            return (
              <button
                type="button"
                onClick={() => selectBody(atom)}
                className="text-cyan-300 underline decoration-dotted underline-offset-2 hover:text-cyan-100 transition-colors"
              >
                {children}
              </button>
            );
          }
          return <span className="text-slate-400/70">{children}</span>;
        }
        return (
          <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
            {children}
          </a>
        );
      },
    }),
    [selectBody],
  );

  // ---------- 构建 / 销毁 three.js 场景（仅客户端且支持 WebGL） ----------
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
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
        systems: galaxies,
        meta: bodyMeta,
        reduceMotion: reduce,
        onNodeClick: handleBodyClick,
        onNodeHover: setHovered,
      });
    } catch {
      setNoWebgl(true);
      return;
    }
    // 初始视图：总览（入场 warp 淡出后揭示三星系全景）
    scene.setActiveGalaxy(null);
    scene.setNavView(null, OVERVIEW_DIST, true);
    sceneRef.current = scene;
    return () => {
      scene?.dispose();
      sceneRef.current = null;
    };
    // galaxies/bodyMeta 为稳定 memo，handleBodyClick 经 useCallback 稳定，场景只构建一次
  }, [galaxies, bodyMeta, handleBodyClick]);

  // React 状态 → 场景（高亮 / 选中追踪）
  useEffect(() => {
    sceneRef.current?.setHovered(hovered);
  }, [hovered]);
  useEffect(() => {
    sceneRef.current?.setSelected(selected?.id ?? null);
  }, [selected]);

  const dolly = (factor: number) => sceneRef.current?.dolly(factor);
  const reset = () => sceneRef.current?.reset();

  const activeGalaxyData = activeGalaxy
    ? galaxyById.get(activeGalaxy)
    : undefined;
  const selectedGalaxy = selected
    ? galaxyById.get(galaxyOfBody.get(selected.id)!)
    : undefined;
  const selectedGardenNote = selected?.gardenId
    ? gardenById.get(selected.gardenId)
    : undefined;
  const related = useMemo(
    () => (selected ? relatedOf(selected) : null),
    [selected],
  );
  const relatedCount = related
    ? (related.parent ? 1 : 0) +
      related.children.length +
      related.sameThread.length
    : 0;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* 星系跃迁覆盖层：不透明星场遮蔽相机瞬移，key 保证每次跃迁重新播放 */}
      {warping && (
        <Warp
          key={warpKey}
          duration={NAV_WARP_MS}
          title="WARP\u00A0JUMP"
          sub={
            activeGalaxy
              ? `跃迁至 · ${galaxyById.get(activeGalaxy)?.name ?? ''}`
              : '返回 · 星图总览'
          }
          onDone={onWarpDone}
        />
      )}

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
            文档仍可经详情面板的外链访问。
          </p>
        </div>
      )}

      {/* 星系切换轨（左中 HUD）：总览 ↔ 三星系 */}
      <div className="stargate-hud absolute left-4 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1.5">
        <div className="stargate-catalog pl-1 mb-0.5">GALAXIES · 星系</div>
        <button
          onClick={() => navigateTo(null)}
          className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-[12px] transition-all border ${
            activeGalaxy === null
              ? 'text-white'
              : 'border-cyan-400/15 text-slate-300/70 bg-[#060c1e]/40 hover:text-white hover:border-cyan-400/45'
          }`}
          style={
            activeGalaxy === null
              ? {
                  borderColor: 'rgba(103,232,249,0.7)',
                  background: 'rgba(103,232,249,0.12)',
                  boxShadow: '0 0 14px rgba(103,232,249,0.35)',
                }
              : undefined
          }
        >
          <span className="w-2 h-2 rounded-full border border-cyan-300/80 shrink-0" />
          星图总览
        </button>
        {stargateGalaxies.map((g) => {
          const active = activeGalaxy === g.id;
          return (
            <button
              key={g.id}
              onClick={() => navigateTo(g.id)}
              className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-[12px] transition-all border ${
                active
                  ? 'text-white'
                  : 'border-cyan-400/15 text-slate-300/70 bg-[#060c1e]/40 hover:text-white hover:border-cyan-400/45'
              }`}
              style={
                active
                  ? {
                      borderColor: `${g.color}b3`,
                      background: `${g.color}1f`,
                      boxShadow: `0 0 14px ${g.color}55`,
                    }
                  : undefined
              }
            >
              <span
                className="w-2 h-2 rounded-full shrink-0"
                style={{
                  background: g.color,
                  boxShadow: active
                    ? `0 0 8px ${g.color}`
                    : `0 0 5px ${g.color}66`,
                }}
              />
              {g.name}
            </button>
          );
        })}
      </div>

      {/* 当前视图信息（左下 HUD） */}
      <div className="stargate-panel stargate-hud absolute bottom-3 left-3 rounded-md px-3 py-2 z-10 pointer-events-none max-w-[17rem]">
        {activeGalaxyData ? (
          <>
            <div className="stargate-catalog mb-1">
              GALAXY · {activeGalaxyData.id.toUpperCase()}
            </div>
            <div className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full"
                style={{
                  background: activeGalaxyData.color,
                  boxShadow: `0 0 8px ${activeGalaxyData.color}`,
                }}
              />
              <span className="text-[13px] font-bold text-cyan-50">
                {activeGalaxyData.name}
              </span>
            </div>
            <p className="text-[11px] text-slate-300/70 mt-1 leading-relaxed">
              {activeGalaxyData.note}
            </p>
            <p className="text-[10px] font-mono text-slate-400/50 mt-1.5">
              {activeGalaxyData.bodies.length} 星体 · 点击星体展开详情
            </p>
          </>
        ) : (
          <>
            <div className="stargate-catalog mb-1">UNIVERSE · 文档宇宙</div>
            <p className="text-[11px] text-slate-300/70 leading-relaxed">
              三大领域星系 · 三条能力主线
            </p>
            <p className="text-[10px] font-mono text-slate-400/50 mt-1.5">
              选择星系跃迁 · 或直接点击星体
            </p>
          </>
        )}
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

      {/* 详情面板（右侧滑入） */}
      {selected && (
        <div
          data-ui
          className="stargate-hud absolute inset-y-0 right-0 w-full sm:w-[400px] bg-[#050a1c]/95 backdrop-blur-md border-l border-cyan-400/25 shadow-[0_0_50px_-12px_rgba(80,200,255,0.55)] flex flex-col animate-fade-in z-20"
        >
          <div className="flex items-start justify-between gap-3 p-5 border-b border-white/10">
            <div className="min-w-0">
              <span className="stargate-catalog block mb-1.5">
                {designation(selected.id)}
              </span>
              <div className="flex items-center gap-1.5 flex-wrap mb-2">
                {selected.badge && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-cyan-400/30 text-cyan-200/80 bg-cyan-400/5">
                    {selected.badge}
                  </span>
                )}
                {selectedGalaxy && (
                  <span
                    className="text-[10px] font-mono px-2 py-0.5 rounded border inline-flex items-center gap-1"
                    style={{
                      borderColor: `${selectedGalaxy.color}66`,
                      color: selectedGalaxy.color,
                    }}
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full"
                      style={{ background: selectedGalaxy.color }}
                    />
                    {selectedGalaxy.name}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-cyan-50 leading-snug">
                {selected.title}
              </h3>
              {selected.threads.length > 0 && (
                <div className="flex gap-1.5 mt-2 flex-wrap">
                  {selected.threads.map((tid) => {
                    const th = threadById.get(tid);
                    if (!th) return null;
                    return (
                      <span
                        key={tid}
                        className="text-[10px] font-mono px-2 py-0.5 rounded-full border"
                        style={{ borderColor: `${th.color}55`, color: th.color }}
                      >
                        {th.name}
                      </span>
                    );
                  })}
                </div>
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
            {selected.desc && (
              <p className="text-[13px] leading-relaxed text-slate-300/85">
                {selected.desc}
              </p>
            )}
            {selected.tags && selected.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2.5">
                {selected.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] font-mono rounded bg-white/5 text-slate-300/60 px-1.5 py-0.5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
            {selected.url && (
              <a
                href={selected.url}
                target="_blank"
                rel="noopener noreferrer"
                className="stargate-neon mt-4 inline-flex items-center gap-2 rounded-full px-4 py-2 text-[13px]"
              >
                <Icon name="external-link-alt" />
                打开完整文档
              </a>
            )}
            {related && relatedCount > 0 && (
              <div className="mt-5 pt-4 border-t border-white/10">
                <p className="stargate-catalog mb-2">ORBIT · 关联星体</p>
                <RelatedGroup
                  label="母体"
                  bodies={related.parent ? [related.parent] : []}
                  onPick={selectBody}
                />
                <RelatedGroup
                  label="子体"
                  bodies={related.children}
                  onPick={selectBody}
                />
                <RelatedGroup
                  label="同主线"
                  bodies={related.sameThread}
                  onPick={selectBody}
                />
              </div>
            )}
            {selectedGardenNote && (
              <div
                className={
                  !!(
                    selected.desc ||
                    (selected.tags && selected.tags.length > 0) ||
                    selected.url ||
                    relatedCount
                  )
                    ? 'mt-5 pt-4 border-t border-white/10'
                    : ''
                }
              >
                <p className="stargate-catalog mb-2">GARDEN · 概念原子</p>
                <Markdown
                  className="prose-invert prose-sm prose-headings:text-cyan-100 prose-a:text-cyan-300"
                  components={mdComponents}
                >
                  {linkifyWikiLinks(
                    selectedGardenNote.content || '',
                    gardenById,
                  )}
                </Markdown>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DigitalGarden;
