/**
 * 恒星系构建：把数字花园的关联图映射为"恒星系"结构。
 *
 * 规则（全部确定性，仅依赖 id 散列，SSG/测试环境可复现）：
 *  - 每个连通分量 = 一个恒星系，系内度数最高的节点成为核心恒星；
 *  - 次高节点若与核心直连且度数接近 → 双星核心（共同绕质心摆动）；
 *    第三节点若与两核心均直连且度数足够高 → 三星核心；
 *  - 其余节点按度数由内向外排布为行星，绕质心做开普勒椭圆运动；
 *  - 度数=1 且唯一连边指向核心/行星的节点 → 卫星（绕母体运动）；
 *  - 孤立节点 → 流浪恒星（缓慢漂移）。
 *
 * 纯数学模块：不依赖 three / DOM，便于单测与 jsdom 环境。
 */

export type BodyRole = 'core' | 'planet' | 'moon' | 'lone';

/** 开普勒轨道六要素 + 周期（秒）。焦点在质心/母体上。 */
export interface OrbitElements {
  /** 半长轴（世界单位） */
  a: number;
  /** 离心率 0..1 */
  e: number;
  /** 轨道倾角（rad，相对参考平面） */
  inc: number;
  /** 升交点经度（rad） */
  node: number;
  /** 近心点幅角（rad） */
  peri: number;
  /** 历元平近点角（rad） */
  M0: number;
  /** 公转周期（秒），满足 T ∝ a^1.5（开普勒第三定律） */
  period: number;
}

export interface BodySpec {
  id: string;
  role: BodyRole;
  /** 连接度 */
  degree: number;
  /** 星体半径（世界单位），由度数决定 —— 质量感 */
  radius: number;
  /** 轨道要素；lone 为 null。core 的轨道 e=0（匀圆，绕质心摆动） */
  orbit: OrbitElements | null;
  /** 卫星所绕的母体 id */
  parentId: string | null;
}

export interface SystemSpec {
  /** 主星 id 作为系统标识 */
  id: string;
  /** 系统质心的世界坐标 */
  center: [number, number, number];
  /** 成员：核心在前，其次行星，最后卫星 */
  bodies: BodySpec[];
}

export interface GardenGraphNote {
  id: string;
  links?: string[];
}

/* ---------- 调参常量（世界单位 / 秒） ---------- */
const PLANET_INNER_A = 1.18; // 最内行星半长轴
const PLANET_STEP_A = 0.27; // 相邻行星间距
const CORE_PERIOD = 16; // 双星互绕周期
const PLANET_PERIOD_INNER = 22; // 最内行星周期（开普勒定律外推）
const MOON_PERIOD = 9;

/* ---------- 确定性散列 ---------- */
export const hashId = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0;
  return Math.abs(h);
};

/** id → [0,1) 确定性伪随机；salt 区分不同用途 */
const rand01 = (id: string, salt: string): number => {
  const h = hashId(`${salt}::${id}`);
  return (h % 100000) / 100000;
};

/** 星体半径：度数 → 质量感 */
export const bodyRadius = (degree: number): number =>
  0.06 + Math.min(degree, 12) * 0.016;

/* ---------- 开普勒方程 ---------- */

/** 解开普勒方程 E - e·sinE = M（牛顿迭代，e≤0.3 时 6 次达机器精度） */
export function solveKepler(M: number, e: number): number {
  const twoPi = Math.PI * 2;
  let m = M % twoPi;
  if (m > Math.PI) m -= twoPi;
  else if (m < -Math.PI) m += twoPi;
  let E = e < 0.8 ? m : Math.PI;
  for (let i = 0; i < 6; i++) {
    E -= (E - e * Math.sin(E) - m) / (1 - e * Math.cos(E));
  }
  return E;
}

/**
 * t 时刻的轨道位置（相对焦点/质心）。
 * 约定：参考平面为 XZ（y 向上），inc 绕 X 轴倾转，node 绕 Y 轴旋转。
 */
export function orbitalPosition(
  el: OrbitElements,
  t: number,
  out: { x: number; y: number; z: number },
): void {
  const M = el.M0 + (Math.PI * 2 * t) / el.period;
  const E = solveKepler(M, el.e);
  // 轨道平面内（焦点在原点）
  const xo = el.a * (Math.cos(E) - el.e);
  const yo = el.a * Math.sqrt(1 - el.e * el.e) * Math.sin(E);
  // 近心点幅角
  const cw = Math.cos(el.peri);
  const sw = Math.sin(el.peri);
  const x1 = xo * cw - yo * sw;
  const z1 = xo * sw + yo * cw;
  // 倾角（绕 X）
  const ci = Math.cos(el.inc);
  const si = Math.sin(el.inc);
  const y2 = -z1 * si;
  const z2 = z1 * ci;
  // 升交点（绕 Y）
  const cn = Math.cos(el.node);
  const sn = Math.sin(el.node);
  out.x = x1 * cn + z2 * sn;
  out.y = y2;
  out.z = -x1 * sn + z2 * cn;
}

/** 采样整条椭圆轨道（闭合），用于绘制轨道线 */
export function orbitEllipsePoints(
  el: OrbitElements,
  segments = 128,
): [number, number, number][] {
  const pts: [number, number, number][] = [];
  const cw = Math.cos(el.peri);
  const sw = Math.sin(el.peri);
  const ci = Math.cos(el.inc);
  const si = Math.sin(el.inc);
  const cn = Math.cos(el.node);
  const sn = Math.sin(el.node);
  const b = el.a * Math.sqrt(1 - el.e * el.e);
  for (let i = 0; i < segments; i++) {
    // 均匀采样偏近点角 E → 椭圆闭合（焦点在原点）
    const E = (i / segments) * Math.PI * 2;
    const xo = el.a * (Math.cos(E) - el.e);
    const yo = b * Math.sin(E);
    const x1 = xo * cw - yo * sw;
    const z1 = xo * sw + yo * cw;
    const y2 = -z1 * si;
    const z2 = z1 * ci;
    pts.push([x1 * cn + z2 * sn, y2, -x1 * sn + z2 * cn]);
  }
  return pts;
}

/* ---------- 图 → 恒星系 ---------- */

interface Adj {
  ids: string[];
  idx: Map<string, number>;
  deg: number[];
  nbr: number[][];
}

const buildGraph = (notes: GardenGraphNote[]): Adj => {
  const ids = notes.map((n) => n.id);
  const idx = new Map(ids.map((id, i) => [id, i]));
  const n = ids.length;
  const nbr: number[][] = Array.from({ length: n }, () => []);
  const seen = new Set<string>();
  for (const note of notes) {
    const a = idx.get(note.id);
    if (a === undefined) continue;
    for (const t of note.links || []) {
      const b = idx.get(t);
      if (b === undefined || a === b) continue;
      const key = a < b ? `${a}|${b}` : `${b}|${a}`;
      if (seen.has(key)) continue;
      seen.add(key);
      nbr[a].push(b);
      nbr[b].push(a);
    }
  }
  return { ids, idx, deg: nbr.map((l) => l.length), nbr };
};

/** 连通分量（BFS） */
const components = (g: Adj): number[][] => {
  const n = g.ids.length;
  const visited = new Array<boolean>(n).fill(false);
  const comps: number[][] = [];
  for (let s = 0; s < n; s++) {
    if (visited[s]) continue;
    const comp: number[] = [];
    const queue = [s];
    visited[s] = true;
    while (queue.length) {
      const u = queue.shift()!;
      comp.push(u);
      for (const v of g.nbr[u]) {
        if (!visited[v]) {
          visited[v] = true;
          queue.push(v);
        }
      }
    }
    comps.push(comp);
  }
  return comps;
};

/** 为成员生成行星轨道要素（开普勒第三定律：T ∝ a^1.5） */
const planetOrbit = (id: string, a: number): OrbitElements => ({
  a,
  e: 0.02 + rand01(id, 'ecc') * 0.14,
  inc: (rand01(id, 'inc') - 0.5) * 0.62,
  node: rand01(id, 'node') * Math.PI * 2,
  peri: rand01(id, 'peri') * Math.PI * 2,
  M0: rand01(id, 'M0') * Math.PI * 2,
  period: PLANET_PERIOD_INNER * Math.pow(a / PLANET_INNER_A, 1.5),
});

export function buildSystems(notes: GardenGraphNote[]): SystemSpec[] {
  const g = buildGraph(notes);
  const systems: SystemSpec[] = [];

  for (const comp of components(g)) {
    // 孤立节点 → 流浪恒星
    if (comp.length === 1) {
      const u = comp[0];
      const id = g.ids[u];
      systems.push({
        id,
        center: [0, 0, 0], // 占位，稍后统一布局
        bodies: [
          {
            id,
            role: 'lone',
            degree: 0,
            radius: bodyRadius(0),
            orbit: null,
            parentId: null,
          },
        ],
      });
      continue;
    }

    // 按度数降序（同度按 id 稳定排序）
    const sorted = [...comp].sort(
      (a, b) => g.deg[b] - g.deg[a] || g.ids[a].localeCompare(g.ids[b]),
    );
    const c1 = sorted[0];
    const linked = (a: number, b: number) => g.nbr[a].includes(b);

    // 双星判定：次席与主星直连且度数接近
    const cores: number[] = [c1];
    if (sorted.length > 1) {
      const c2 = sorted[1];
      if (g.deg[c2] >= Math.max(3, g.deg[c1] - 3) && linked(c1, c2)) {
        cores.push(c2);
        // 三星判定：第三席与两核心均直连且度数足够高
        if (sorted.length > 2) {
          const c3 = sorted[2];
          if (
            g.deg[c3] >= Math.max(4, g.deg[c1] - 2) &&
            linked(c1, c3) &&
            linked(c2, c3)
          ) {
            cores.push(c3);
          }
        }
      }
    }
    const coreSet = new Set(cores);

    // 卫星判定：度数=1 且唯一连边指向核心成员 → 绕主星；指向行星 → 绕该行星
    const rest = sorted.filter((u) => !coreSet.has(u));
    const moons = new Map<number, number>(); // 卫星 → 母体
    const planets: number[] = [];
    for (const u of rest) {
      const only = g.nbr[u];
      if (only.length === 1 && !coreSet.has(only[0])) {
        moons.set(u, only[0]);
      } else if (only.length === 1 && cores[0] !== undefined) {
        moons.set(u, cores[0]);
      } else {
        planets.push(u);
      }
    }

    // 核心绕质心：质量加权半径（e=0 匀圆），共面、严格等相位间隔
    // （双星 = 对跖 π，三星 = 三角 2π/3），保证质心稳定不抖动
    const coreMass = cores.map((u) => Math.pow(bodyRadius(g.deg[u]), 3));
    const totalMass = coreMass.reduce((s, m) => s + m, 0);
    const r1 = bodyRadius(g.deg[cores[0]]);
    const r2 = cores.length > 1 ? bodyRadius(g.deg[cores[1]]) : 0;
    const sep = Math.max(0.7, (r1 + r2) * 2.4);
    const coreInc = (rand01(g.ids[cores[0]], 'sysInc') - 0.5) * 0.16;
    const coreNode = rand01(g.ids[cores[0]], 'sysNode') * Math.PI * 2;

    const bodies: BodySpec[] = [];
    cores.forEach((u, k) => {
      const id = g.ids[u];
      bodies.push({
        id,
        role: 'core',
        degree: g.deg[u],
        radius: bodyRadius(g.deg[u]),
        orbit: {
          a: sep * (1 - coreMass[k] / totalMass),
          e: 0,
          inc: coreInc,
          node: coreNode,
          peri: 0,
          M0: (k * Math.PI * 2) / cores.length,
          period: CORE_PERIOD,
        },
        parentId: null,
      });
    });

    // 行星：度数高者居内（更靠近恒星），半长轴含确定性抖动
    planets.forEach((u, i) => {
      const id = g.ids[u];
      const a =
        PLANET_INNER_A + i * PLANET_STEP_A + (rand01(id, 'aJit') - 0.5) * 0.12;
      bodies.push({
        id,
        role: 'planet',
        degree: g.deg[u],
        radius: bodyRadius(g.deg[u]),
        orbit: planetOrbit(id, a),
        parentId: null,
      });
    });

    // 卫星：绕母体的小轨道
    for (const [u, parent] of moons) {
      const id = g.ids[u];
      const parentRadius = bodyRadius(g.deg[parent]);
      bodies.push({
        id,
        role: 'moon',
        degree: g.deg[u],
        radius: bodyRadius(g.deg[u]),
        orbit: {
          a: parentRadius * 2.2 + 0.12,
          e: 0.06,
          inc: 0.35,
          node: rand01(id, 'node') * Math.PI * 2,
          peri: rand01(id, 'peri') * Math.PI * 2,
          M0: rand01(id, 'M0') * Math.PI * 2,
          period: MOON_PERIOD,
        },
        parentId: g.ids[parent],
      });
    }

    systems.push({ id: g.ids[cores[0]], center: [0, 0, 0], bodies });
  }

  // 多系统布局：斐波那契球面散布（单系统在原点）；单系统占位后归零
  layoutSystemCenters(systems);

  return systems;
}

/** 系统质心布局：单系统居中，多系统球面散布 */
function layoutSystemCenters(systems: SystemSpec[]): void {
  if (systems.length <= 1) {
    systems.forEach((s) => (s.center = [0, 0, 0]));
    return;
  }
  const GOLDEN = 2.399963229728653;
  const R = 6 + systems.length * 0.8;
  systems.forEach((s, i) => {
    const ga = i * GOLDEN;
    const yy = 1 - (2 * (i + 0.5)) / systems.length;
    const rr = Math.sqrt(Math.max(0, 1 - yy * yy));
    s.center = [Math.cos(ga) * rr * R, yy * R * 0.6, Math.sin(ga) * rr * R];
  });
}
