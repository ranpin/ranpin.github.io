/**
 * 星系构建：把策展数据 stargateDocs 映射为可渲染的「星系」结构。
 *
 * 与 systems.ts（数字花园关联图 → 恒星系）并列的纯数学模块；区别在于：
 *  - 星体角色由 (kind, parentId) 推导，而非图度数：
 *      interview → 核心恒星；有 parentId → 卫星；其余 module/project → 行星；
 *  - 半径由 kind 直接给定（质量感来自文档类型，而非连接度）；
 *  - 同一渲染母体下的多颗卫星按序错开轨道半径与倾角，避免重叠；
 *  - 渲染母体做「压平」：语义母体若本身是卫星（如概念原子挂在文档卫星下），
 *    上溯到最近的行星/核心祖先，保证层级深度 ≤ 2 —— 当前尺度下三层嵌套会让
 *    子卫星轨道吞噬母体自身轨道。DocBody.parentId 仍保留语义真值供详情面板。
 *
 * 全部确定性（仅依赖 id 散列与数据序），SSG/测试环境可复现。
 */

import type { BodyRole, BodySpec, OrbitElements } from './systems';
import { hashId } from './systems';
import type { DocBody, Galaxy, GalaxyId } from '../../../data/stargateDocs';

/** 可渲染星系：形状镜像 SystemSpec，额外携带 HUD 所需的名称/副题/主题色 */
export interface GalaxySpec {
  id: GalaxyId;
  name: string;
  note: string;
  /** 星系主题色（星云 tint + 核心恒星着色） */
  color: string;
  /** 星系质心的世界坐标（总览布局） */
  center: [number, number, number];
  /** 成员：拓扑序（母体必先于卫星），核心在前 */
  bodies: BodySpec[];
}

/* ---------- 调参常量（世界单位 / 秒） ---------- */
const GALAXY_RADIUS = 9; // 三星系质心分布半径（总览，宽三角形）
/**
 * 与 StargateScene 的 HOME.ry 保持一致：总览首帧相机正对 gi=0 星系，
 * 三星系呈「前一后二」的对称三角构图。若调整 HOME.ry 需同步此值。
 */
const HERO_AZIMUTH = 0.52;
const PLANET_INNER_A = 1.35; // 最内行星半长轴
const PLANET_STEP_A = 0.42; // 相邻行星间距
const CORE_PERIOD = 18; // 核心摆动周期（a=0 时退化为定锚）
const PLANET_PERIOD_INNER = 26; // 最内行星周期（开普勒定律外推）
const MOON_PERIOD = 9; // 卫星基准周期（a=0.5 处）

/** 文档类型 → 星体半径（质量感） */
const KIND_RADIUS: Record<DocBody['kind'], number> = {
  interview: 0.26,
  module: 0.17,
  project: 0.16,
  atom: 0.075,
};

/** 文档类型 → 名义连接度（仅用于 BodySpec.degree 信息字段，不参与渲染尺寸） */
const KIND_DEGREE: Record<DocBody['kind'], number> = {
  interview: 12,
  module: 6,
  project: 8,
  atom: 2,
};

/* ---------- 确定性散列 ---------- */
const rand01 = (id: string, salt: string): number => {
  const h = hashId(`${salt}::${id}`);
  return (h % 100000) / 100000;
};

/** 角色推导：interview → 核心；有 parentId → 卫星；其余 → 行星 */
const roleOf = (b: DocBody): BodyRole =>
  b.kind === 'interview' ? 'core' : b.parentId ? 'moon' : 'planet';

/** 行星轨道要素（开普勒第三定律：T ∝ a^1.5） */
const planetOrbit = (id: string, a: number): OrbitElements => ({
  a,
  e: 0.02 + rand01(id, 'ecc') * 0.14,
  inc: (rand01(id, 'inc') - 0.5) * 0.5,
  node: rand01(id, 'node') * Math.PI * 2,
  peri: rand01(id, 'peri') * Math.PI * 2,
  M0: rand01(id, 'M0') * Math.PI * 2,
  period: PLANET_PERIOD_INNER * Math.pow(a / PLANET_INNER_A, 1.5),
});

/**
 * 卫星轨道要素：半径随母体大小与「同母体序号 k」递增（错开成多道环），
 * 倾角随 k 交替起伏，避免共面重叠。
 */
const moonOrbit = (
  id: string,
  parentRadius: number,
  k: number,
): OrbitElements => {
  const a = parentRadius * 2.1 + 0.15 + k * 0.16;
  return {
    a,
    e: 0.05,
    inc: 0.3 + (k % 2 === 0 ? 1 : -1) * (0.1 + k * 0.05),
    node: rand01(id, 'node') * Math.PI * 2,
    peri: rand01(id, 'peri') * Math.PI * 2,
    M0: rand01(id, 'M0') * Math.PI * 2,
    period: MOON_PERIOD * Math.pow(a / 0.5, 1.5),
  };
};

/** 星系质心：单星系居中；多星系在 XZ 平面均布成宽三角形，y 轻微错落景深 */
const galaxyCenter = (
  g: Galaxy,
  gi: number,
  total: number,
): [number, number, number] => {
  if (total <= 1) return [0, 0, 0];
  const ang = (gi / total) * Math.PI * 2 + (Math.PI / 2 - HERO_AZIMUTH);
  const y = (rand01(g.id, 'gy') - 0.5) * 2.5;
  return [Math.cos(ang) * GALAXY_RADIUS, y, Math.sin(ang) * GALAXY_RADIUS];
};

const buildOneGalaxy = (g: Galaxy, gi: number, total: number): GalaxySpec => {
  const byId = new Map(g.bodies.map((b) => [b.id, b]));

  // 渲染母体：语义母体若为卫星，上溯到最近的行星/核心祖先（深度 ≤ 2）
  const renderParent = (b: DocBody): string | null => {
    let p = b.parentId ?? null;
    while (p) {
      const pb = byId.get(p);
      if (!pb) return null;
      if (roleOf(pb) !== 'moon') return p;
      p = pb.parentId ?? null;
    }
    return null;
  };

  // 渲染母体 → 子体（保持数据序），用于 DFS 拓扑排序
  const childrenOf = new Map<string | null, DocBody[]>();
  for (const b of g.bodies) {
    const rp = renderParent(b);
    const arr = childrenOf.get(rp) ?? [];
    arr.push(b);
    childrenOf.set(rp, arr);
  }

  let planetIdx = 0;
  const moonIdxByParent = new Map<string, number>();

  const specFor = (b: DocBody): BodySpec => {
    const role = roleOf(b);
    let orbit: OrbitElements | null = null;
    let parentId: string | null = null;
    if (role === 'core') {
      // 单核心定锚于星系质心（a=0），作为导航与点光源中心
      orbit = { a: 0, e: 0, inc: 0, node: 0, peri: 0, M0: 0, period: CORE_PERIOD };
    } else if (role === 'planet') {
      const a =
        PLANET_INNER_A +
        planetIdx * PLANET_STEP_A +
        (rand01(b.id, 'aJit') - 0.5) * 0.1;
      planetIdx++;
      orbit = planetOrbit(b.id, a);
    } else {
      const rp = renderParent(b)!;
      const parent = byId.get(rp)!;
      const k = moonIdxByParent.get(rp) ?? 0;
      moonIdxByParent.set(rp, k + 1);
      orbit = moonOrbit(b.id, KIND_RADIUS[parent.kind], k);
      parentId = rp;
    }
    return {
      id: b.id,
      role,
      degree: KIND_DEGREE[b.kind],
      radius: KIND_RADIUS[b.kind],
      orbit,
      parentId,
    };
  };

  // DFS 前序：母体先于子体，子树连续（核心 → 行星 → 各自卫星）
  const bodies: BodySpec[] = [];
  const dfs = (parentId: string | null): void => {
    for (const b of childrenOf.get(parentId) ?? []) {
      bodies.push(specFor(b));
      dfs(b.id);
    }
  };
  dfs(null);

  return {
    id: g.id,
    name: g.name,
    note: g.note,
    color: g.color,
    center: galaxyCenter(g, gi, total),
    bodies,
  };
};

/** 把策展星系数据构建为可渲染星系表（确定性） */
export function buildGalaxies(galaxies: Galaxy[]): GalaxySpec[] {
  return galaxies.map((g, gi) => buildOneGalaxy(g, gi, galaxies.length));
}
