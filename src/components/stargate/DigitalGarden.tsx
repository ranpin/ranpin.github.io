import React, { useEffect, useMemo, useRef, useState } from 'react';
import type { Components } from 'react-markdown';
import Icon from '../Icon';
import Markdown from '../Markdown';
import Starfield from './Starfield';
import { gardenNotes } from '../../data/content';
import type { GardenNote } from '../../types';

type Stage = 'seedling' | 'budding' | 'evergreen';

// 成长阶段 → 恒星分类观感（暖金 / 青白 / 蓝紫）
const STAGE: Record<Stage, { label: string; color: string }> = {
  seedling: { label: '🌱 萌芽', color: '#fbbf24' },
  budding: { label: '🌿 生长', color: '#67e8f9' },
  evergreen: { label: '🌲 常青', color: '#a78bfa' },
};

const stageOf = (n: GardenNote): Stage => (n.stage as Stage) || 'seedling';

// 稳定的字符串散列，用于确定性的初始布局与星表编号（避免每次渲染跳动）
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

// 3D 力导向布局：斥力 + 边弹簧 + 向心引力，固定迭代次数，确定性输出。
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

  const K = 190; // 理想边长
  const REP = 42000; // 斥力强度
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

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));
const clamp01 = (v: number) => clamp(v, 0, 1);

// 颜色混合：用于球体的高光提亮与背光压暗
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

// ---------- 3D 相机 ----------
const FOV = 3.2; // 透视焦距（相对单位）
const DIST_MIN = 2.35;
const DIST_MAX = 8.5;
// 默认机位：略微俯视的四分之三视角
const HOME = { rx: -0.26, ry: 0.46, dist: 3.4 };
const AUTO_SPEED = 0.00038; // 空闲自转速度（rad/帧，约 1.3°/s）
const RX_LIMIT = 1.15;

interface CamVec {
  rx: number;
  ry: number;
  dist: number;
}

// 把正文里的 [[id]] 记法转成可点击的内部链接（href 为 #gnode-<id>）；
// 目标不存在时退化为纯文本，避免出现生硬的方括号。
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
  const active = hovered; // 悬停时高亮/锁定

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

  // ---------- 相机状态（全部走 ref，逐帧直写 DOM，不经过 React 渲染） ----------
  // cur = 当前值（每帧向 tgt 收敛）；tgt = 目标值（交互直接改写）
  const cam = useRef<{
    cur: CamVec;
    tgt: CamVec;
    vel: { rx: number; ry: number };
  }>({
    // 初始机位刻意拉远并偏转，入场时镜头推近 + 回正，形成"抵达"感
    cur: { rx: HOME.rx + 0.55, ry: HOME.ry - 1.35, dist: 8.8 },
    tgt: { ...HOME },
    vel: { rx: 0, ry: 0 },
  });
  const dragRef = useRef<{ lastX: number; lastY: number } | null>(null);
  const interactRef = useRef(0); // 最近一次交互时间戳，用于空闲自转的让位
  const activeRef = useRef<string | null>(null);
  useEffect(() => {
    activeRef.current = hovered;
  }, [hovered]);

  // 镜像给星海 canvas 做视差（旋转/推拉时背景随之微移，增强纵深）
  const viewRef = useRef({ tx: 0, ty: 0, scale: 1 });

  const viewportRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const lineRefs = useRef<(SVGLineElement | null)[]>([]);

  // ---------- 渲染循环：旋转/惯性/推拉 + 透视投影 + 深度线索 ----------
  useEffect(() => {
    const el = viewportRef.current;
    if (!el || typeof window.requestAnimationFrame !== 'function') return;
    const reduce =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    if (reduce) {
      // 减少动态：不做入场推拉与自转，直接就位
      Object.assign(cam.current.cur, cam.current.tgt);
    }

    const size = { w: 800, h: 600, cx: 400, cy: 300, R: 260 };
    const measure = () => {
      const r = el.getBoundingClientRect();
      size.w = r.width || 800;
      size.h = r.height || 600;
      size.cx = size.w / 2;
      size.cy = size.h / 2;
      size.R = Math.min(size.w * 0.34, size.h * 0.44);
    };
    measure();
    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(el);
    }

    // 滚轮推拉镜头（非被动监听以便 preventDefault）
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      const c = cam.current;
      c.tgt.dist = clamp(
        c.tgt.dist * (e.deltaY < 0 ? 1 / 1.12 : 1.12),
        DIST_MIN,
        DIST_MAX,
      );
      interactRef.current = performance.now();
    };
    el.addEventListener('wheel', onWheel, { passive: false });

    const worlds = notes.map((nd) => layout[nd.id]);
    const scr: { sx: number; sy: number; z: number; d01: number }[] =
      worlds.map(() => ({ sx: 0, sy: 0, z: 0, d01: 1 }));
    const entryDelay = (i: number) => 300 + i * 55;

    let auto = 0;
    let raf = 0;
    const t0 = performance.now();

    const frame = (ts: number) => {
      const t = ts - t0;
      const c = cam.current;

      // 空闲自转：拖拽/悬停/近期交互时平滑让位
      const idle =
        ts - interactRef.current > 2600 &&
        !dragRef.current &&
        !activeRef.current;
      auto += ((reduce || !idle ? 0 : AUTO_SPEED) - auto) * 0.02;
      c.tgt.ry += auto;

      // 惯性（松手后衰减）
      if (!dragRef.current) {
        c.tgt.ry += c.vel.ry;
        c.tgt.rx += c.vel.rx;
        c.vel.ry *= 0.94;
        c.vel.rx *= 0.94;
        if (Math.abs(c.vel.ry) < 4e-4) c.vel.ry = 0;
        if (Math.abs(c.vel.rx) < 4e-4) c.vel.rx = 0;
      }
      c.tgt.rx = clamp(c.tgt.rx, -RX_LIMIT, RX_LIMIT);

      // 相机向目标收敛（拖拽中更快，接近 1:1 手感）
      const k = dragRef.current ? 0.4 : 0.085;
      c.cur.rx += (c.tgt.rx - c.cur.rx) * k;
      c.cur.ry += (c.tgt.ry - c.cur.ry) * k;
      c.cur.dist += (c.tgt.dist - c.cur.dist) * 0.075;

      const sinY = Math.sin(c.cur.ry);
      const cosY = Math.cos(c.cur.ry);
      const sinX = Math.sin(c.cur.rx);
      const cosX = Math.cos(c.cur.rx);
      const act = activeRef.current;

      // 逐节点：绕 Y 再绕 X 旋转 → 透视除法 → 屏幕坐标
      for (let i = 0; i < worlds.length; i++) {
        const p = worlds[i];
        const x1 = p.x * cosY + p.z * sinY;
        const z1 = -p.x * sinY + p.z * cosY;
        const y1 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;
        const persp = FOV / (c.cur.dist + z2);
        scr[i].sx = size.cx + x1 * persp * size.R;
        scr[i].sy = size.cy + y1 * persp * size.R;
        scr[i].z = z2;
        scr[i].d01 = clamp01(1 - (z2 + 1) / 2); // 1 = 近，0 = 远
      }

      // 星座连线（端点取投影后的屏幕坐标，粗细/明暗随深度）
      for (let i = 0; i < edges.length; i++) {
        const line = lineRefs.current[i];
        if (!line) continue;
        const e = edges[i];
        const A = scr[e.a];
        const B = scr[e.b];
        const avg = (A.d01 + B.d01) / 2;
        const lit = act && (act === notes[e.a].id || act === notes[e.b].id);
        line.setAttribute('x1', A.sx.toFixed(1));
        line.setAttribute('y1', A.sy.toFixed(1));
        line.setAttribute('x2', B.sx.toFixed(1));
        line.setAttribute('y2', B.sy.toFixed(1));
        line.setAttribute(
          'stroke-opacity',
          ((act ? (lit ? 0.95 : 0.08) : 0.34) * (0.3 + 0.7 * avg)).toFixed(3),
        );
        line.setAttribute(
          'stroke-width',
          ((lit ? 1.5 : 0.75) * (0.55 + 0.7 * avg)).toFixed(2),
        );
      }

      // 恒星节点：位置/缩放/透明度/层级全部逐帧直写 DOM
      for (let i = 0; i < notes.length; i++) {
        const btn = nodeRefs.current[i];
        if (!btn) continue;
        const nd = notes[i];
        const s = scr[i];
        const entry = reduce ? 1 : clamp01((t - entryDelay(i)) / 650);
        const isAct = act === nd.id;
        const isNb = act ? neighbors[act]?.has(nd.id) : false;
        const dimF = act ? (isAct || isNb ? 1 : 0.24) : 1;
        const scale = Math.max(0.42, s.persp);
        btn.style.transform = `translate3d(${s.sx.toFixed(1)}px, ${s.sy.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale.toFixed(3)})`;
        btn.style.opacity = (entry * (0.36 + 0.64 * s.d01) * dimF).toFixed(3);
        btn.style.zIndex = String(Math.round(600 - s.z * 240));
      }

      // 星海视差：随旋转/推拉微移（有界，避免长时间漂移出画面）
      viewRef.current = {
        tx: -Math.sin(c.cur.ry) * 240,
        ty: -Math.sin(c.cur.rx) * 240,
        scale: FOV / c.cur.dist,
      };

      raf = window.requestAnimationFrame(frame);
    };
    raf = window.requestAnimationFrame(frame);

    return () => {
      window.cancelAnimationFrame(raf);
      el.removeEventListener('wheel', onWheel);
      ro?.disconnect();
    };
    // notes/edges/layout/neighbors 均为稳定 memo，循环只挂载一次
  }, [notes, edges, layout, neighbors]);

  // ---------- 交互：拖拽旋转（带惯性）/ 按钮推拉 / 复位 ----------
  const onPointerDown = (e: React.PointerEvent) => {
    // 点在星点或任何 HUD/面板控件上都不触发旋转（否则指针捕获会吞掉点击）
    if ((e.target as HTMLElement).closest('[data-node], [data-ui]')) return;
    dragRef.current = { lastX: e.clientX, lastY: e.clientY };
    interactRef.current = performance.now();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = dragRef.current;
    if (!d) return;
    const c = cam.current;
    const dRy = (e.clientX - d.lastX) * 0.0052;
    const dRx = (e.clientY - d.lastY) * 0.0052;
    d.lastX = e.clientX;
    d.lastY = e.clientY;
    c.tgt.ry += dRy;
    c.tgt.rx = clamp(c.tgt.rx + dRx, -RX_LIMIT, RX_LIMIT);
    c.vel.ry = dRy;
    c.vel.rx = dRx;
    interactRef.current = performance.now();
  };
  const endDrag = () => {
    if (dragRef.current) interactRef.current = performance.now();
    dragRef.current = null;
  };
  const dolly = (factor: number) => {
    const c = cam.current;
    c.tgt.dist = clamp(c.tgt.dist / factor, DIST_MIN, DIST_MAX);
    interactRef.current = performance.now();
  };
  const reset = () => {
    const c = cam.current;
    const twoPi = Math.PI * 2;
    const mod2pi = (a: number) => ((a % twoPi) + twoPi) % twoPi;
    // 取与当前朝向最近的 HOME.ry 等价角，避免复位时倒转多圈
    let delta = mod2pi(HOME.ry - mod2pi(c.cur.ry));
    if (delta > Math.PI) delta -= twoPi;
    c.tgt.ry = c.cur.ry + delta;
    c.tgt.rx = HOME.rx;
    c.tgt.dist = HOME.dist;
    c.vel.rx = 0;
    c.vel.ry = 0;
    interactRef.current = performance.now();
  };

  if (notes.length === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center text-slate-400/70 font-mono text-sm">
        花园尚未播种 —— 在 content/garden/ 添加节点即可生长。
      </div>
    );
  }

  return (
    <div
      ref={viewportRef}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerLeave={endDrag}
      className="absolute inset-0 overflow-hidden cursor-grab active:cursor-grabbing"
    >
      {/* 环境星海（铺底、视差） */}
      <Starfield viewRef={viewRef} />

      {/* 星座连线（屏幕像素坐标，由渲染循环逐帧投影） */}
      <svg className="absolute inset-0 w-full h-full" aria-hidden>
        {edges.map((e, i) => {
          const A = notes[e.a];
          const B = notes[e.b];
          const lit = active && (active === A.id || active === B.id);
          return (
            <line
              key={i}
              ref={(el) => {
                lineRefs.current[i] = el;
              }}
              className="stargate-edge"
              pathLength={1}
              stroke={lit ? '#8fe5ff' : '#3f6aa0'}
              style={{ animationDelay: `${0.15 + i * 0.05}s` }}
            />
          );
        })}
      </svg>

      {/* 想法恒星（命名节点）：外层定位/缩放/透明度由渲染循环直写 */}
      {notes.map((n, i) => {
        const st = STAGE[stageOf(n)];
        const size = 11 + Math.min(degree[n.id] || 0, 5) * 3.5;
        const isActive = active === n.id;
        const tint = mixColor(st.color, '#ffffff', 0.6);
        const dark = mixColor(st.color, '#04060f', 0.62);
        return (
          <button
            key={n.id}
            ref={(el) => {
              nodeRefs.current[i] = el;
            }}
            data-node
            onMouseEnter={() => setHovered(n.id)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered(n.id)}
            onBlur={() => setHovered(null)}
            onClick={() => setSelected((prev) => (prev?.id === n.id ? null : n))}
            aria-label={`${n.title}（${st.label}）`}
            className="group absolute left-0 top-0 flex flex-col items-center gap-1 focus:outline-none will-change-transform"
            style={{ opacity: 0 }}
          >
            {/* 恒星本体 + 光晕 + 3D 轨道瞄准环 */}
            <span
              className="relative flex items-center justify-center"
              style={{ width: size * 2.6, height: size * 2.6 }}
            >
              {/* 大气辉光 */}
              <span
                className="absolute rounded-full"
                style={{
                  width: size * 2.6,
                  height: size * 2.6,
                  background: `radial-gradient(circle, ${st.color}55 0%, transparent 70%)`,
                  opacity: isActive ? 1 : 0.7,
                }}
              />
              {/* 3D 轨道瞄准环（仅悬停/聚焦时，双环陀螺仪式环绕） */}
              {isActive && (
                <span
                  className="stargate-orbit"
                  style={{ width: size * 2.5, height: size * 2.5 }}
                >
                  <span
                    className="stargate-ring"
                    style={{
                      borderColor: st.color,
                      borderTopColor: 'transparent',
                      borderBottomColor: 'transparent',
                      boxShadow: `0 0 10px ${st.color}88`,
                    }}
                  />
                  <span
                    className="stargate-ring stargate-ring--b"
                    style={{
                      borderColor: `${st.color}66`,
                      borderLeftColor: 'transparent',
                      borderRightColor: 'transparent',
                    }}
                  />
                </span>
              )}
              {/* 星核：高光 → 向日面 → 背光面 → 晨昏线，球体观感 */}
              <span
                className="stargate-starcore relative rounded-full"
                style={{
                  width: size,
                  height: size,
                  background: `radial-gradient(circle at 32% 28%, #ffffff 0%, ${tint} 14%, ${st.color} 42%, ${dark} 74%, rgba(6,9,20,0.96) 100%)`,
                  boxShadow: `0 0 ${isActive ? 22 : 12}px ${st.color}${isActive ? '' : '99'}, inset ${(-size * 0.16).toFixed(1)}px ${(-size * 0.18).toFixed(1)}px ${(size * 0.45).toFixed(1)}px rgba(3,5,14,0.8)`,
                  transform: isActive ? 'scale(1.3)' : 'scale(1)',
                  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                  animationDelay: `${(hash(n.id) % 40) / 10}s`,
                }}
              />
            </span>
            {/* 标签：标题 + 星表编号 */}
            <span className="flex flex-col items-center leading-none">
              <span
                className="text-[11px] whitespace-nowrap px-1 font-medium"
                style={{
                  color: isActive ? '#fff' : 'rgba(207,230,255,0.82)',
                  textShadow: '0 1px 4px rgba(0,0,0,0.9)',
                }}
              >
                {n.title}
              </span>
              <span
                className="stargate-catalog mt-0.5 transition-opacity duration-200"
                style={{ opacity: isActive ? 0.9 : 0.4 }}
              >
                {designation(n.id)}
              </span>
            </span>
          </button>
        );
      })}

      {/* 图例（左下 HUD） */}
      <div className="stargate-panel stargate-hud absolute bottom-3 left-3 rounded-md px-3 py-2 text-[11px] pointer-events-none">
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
      <div data-ui className="absolute bottom-3 right-3 flex flex-col gap-1.5">
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
      <div className="stargate-catalog absolute top-3 left-1/2 -translate-x-1/2 pointer-events-none whitespace-nowrap">
        点击恒星展开 · 拖拽旋转星图 · 滚轮推拉镜头
      </div>

      {/* 详情面板（右侧滑入） */}
      {selected && (
        <div
          data-ui
          className="stargate-hud absolute inset-y-0 right-0 w-full sm:w-[400px] bg-[#050a1c]/95 backdrop-blur-md border-l border-cyan-400/25 shadow-[0_0_50px_-12px_rgba(80,200,255,0.55)] flex flex-col animate-fade-in"
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
