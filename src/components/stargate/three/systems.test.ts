import { describe, it, expect } from 'vitest';
import {
  buildSystems,
  solveKepler,
  orbitalPosition,
  orbitEllipsePoints,
  bodyRadius,
  type GardenGraphNote,
  type OrbitElements,
} from './systems';

/** 与 content/garden/*.md 完全一致的真实关联图（11 个已发布节点） */
const REAL_GARDEN: GardenGraphNote[] = [
  { id: 'edge-ai', links: ['quantization', 'cosmos-reason', 'orin-fmha', 'vram-budget', 'learning-in-public'] },
  { id: 'quantization', links: ['edge-ai', 'cosmos-reason', 'vram-budget'] },
  { id: 'cosmos-reason', links: ['edge-ai', 'quantization', 'vlm'] },
  { id: 'vram-budget', links: ['edge-ai', 'quantization'] },
  { id: 'kv-cache', links: ['vram-budget', 'quantization', 'edge-ai'] },
  { id: 'orin-fmha', links: ['edge-ai', 'quantization'] },
  { id: 'distillation', links: ['edge-ai', 'quantization', 'cosmos-reason'] },
  { id: 'latency-budget', links: ['edge-ai', 'kv-cache', 'vram-budget'] },
  { id: 'operator-fusion', links: ['orin-fmha', 'edge-ai', 'quantization'] },
  { id: 'vlm', links: ['cosmos-reason', 'edge-ai'] },
  { id: 'learning-in-public', links: ['edge-ai'] },
];

const byId = <T extends { id: string }>(arr: T[], id: string): T =>
  arr.find((x) => x.id === id)!;

describe('buildSystems · 真实花园图', () => {
  const systems = buildSystems(REAL_GARDEN);

  it('全图连通 → 单一恒星系，11 个节点全部入系', () => {
    expect(systems).toHaveLength(1);
    expect(systems[0].bodies).toHaveLength(11);
  });

  it('双星核心 = 度数最高的直连对 edge-ai + quantization', () => {
    const cores = systems[0].bodies.filter((b) => b.role === 'core');
    expect(cores.map((c) => c.id).sort()).toEqual(['edge-ai', 'quantization']);
    expect(byId(cores, 'edge-ai').degree).toBe(10);
    expect(byId(cores, 'quantization').degree).toBe(7);
  });

  it('其余 8 颗行星按度数降序排布（同度按 id）', () => {
    const planets = systems[0].bodies.filter((b) => b.role === 'planet');
    expect(planets).toHaveLength(8);
    expect(planets.map((p) => p.id)).toEqual([
      'cosmos-reason',
      'kv-cache',
      'vram-budget',
      'distillation',
      'latency-budget',
      'operator-fusion',
      'orin-fmha',
      'vlm',
    ]);
    // 度数高者居内：半长轴单调不减
    for (let i = 1; i < planets.length; i++) {
      expect(planets[i].orbit!.a).toBeGreaterThanOrEqual(planets[i - 1].orbit!.a - 0.12);
    }
  });

  it('度数=1 的 learning-in-public → 卫星，绕主星 edge-ai', () => {
    const moon = byId(systems[0].bodies, 'learning-in-public');
    expect(moon.role).toBe('moon');
    expect(moon.parentId).toBe('edge-ai');
  });

  it('成员顺序：核心在前，其次行星，最后卫星', () => {
    const roles = systems[0].bodies.map((b) => b.role);
    const firstPlanet = roles.indexOf('planet');
    const firstMoon = roles.indexOf('moon');
    expect(roles.slice(0, firstPlanet).every((r) => r === 'core')).toBe(true);
    expect(roles.slice(firstMoon).every((r) => r === 'moon')).toBe(true);
  });
});

describe('buildSystems · 双星质心稳定', () => {
  it('双星共面、严格对跖（M0 相差 π），质心全程不漂移', () => {
    const systems = buildSystems(REAL_GARDEN);
    const cores = systems[0].bodies.filter((b) => b.role === 'core');
    const [c1, c2] = cores;
    expect(c1.orbit!.e).toBe(0);
    expect(c2.orbit!.e).toBe(0);
    expect(c1.orbit!.inc).toBe(c2.orbit!.inc);
    expect(c1.orbit!.node).toBe(c2.orbit!.node);
    expect(Math.abs(Math.abs(c2.orbit!.M0 - c1.orbit!.M0) - Math.PI)).toBeLessThan(1e-9);

    // 质量 ∝ 半径³；质心 = Σ mᵢpᵢ / Σ mᵢ 应恒为原点
    const m1 = c1.radius ** 3;
    const m2 = c2.radius ** 3;
    const p1 = { x: 0, y: 0, z: 0 };
    const p2 = { x: 0, y: 0, z: 0 };
    for (const t of [0, 2.5, 7, 13.3, 31]) {
      orbitalPosition(c1.orbit!, t, p1);
      orbitalPosition(c2.orbit!, t, p2);
      const cx = (m1 * p1.x + m2 * p2.x) / (m1 + m2);
      const cy = (m1 * p1.y + m2 * p2.y) / (m1 + m2);
      const cz = (m1 * p1.z + m2 * p2.z) / (m1 + m2);
      expect(Math.hypot(cx, cy, cz)).toBeLessThan(1e-9);
    }
  });
});

describe('buildSystems · 其它拓扑', () => {
  it('二节点对 → 一核心 + 一卫星；孤立节点 → 流浪恒星（orbit=null）', () => {
    const systems = buildSystems([
      { id: 'a', links: ['b'] },
      { id: 'b', links: ['a'] },
      { id: 'solo' },
    ]);
    expect(systems).toHaveLength(2);

    const pair = systems.find((s) => s.bodies.length === 2)!;
    expect(pair.bodies.filter((b) => b.role === 'core')).toHaveLength(1);
    const moon = pair.bodies.find((b) => b.role === 'moon')!;
    expect(moon.parentId).toBe(pair.bodies.find((b) => b.role === 'core')!.id);

    const lone = systems.find((s) => s.bodies.length === 1)!;
    expect(lone.bodies[0].role).toBe('lone');
    expect(lone.bodies[0].orbit).toBeNull();
    expect(lone.bodies[0].degree).toBe(0);
  });

  it('三个互相直连的高密度枢纽 → 三星核心', () => {
    const systems = buildSystems([
      { id: 'A', links: ['B', 'C', 'p1', 'p2', 'p3', 'p4'] },
      { id: 'B', links: ['A', 'C', 'p1', 'p2', 'p3'] },
      { id: 'C', links: ['A', 'B', 'p1', 'p2'] },
      { id: 'p1', links: ['A', 'B', 'C'] },
      { id: 'p2', links: ['A', 'B', 'C'] },
      { id: 'p3', links: ['A', 'B'] },
      { id: 'p4', links: ['A'] },
    ]);
    expect(systems).toHaveLength(1);
    const cores = systems[0].bodies.filter((b) => b.role === 'core');
    expect(cores.map((c) => c.id).sort()).toEqual(['A', 'B', 'C']);
    // 三星等相位间隔 2π/3
    const m0 = cores.map((c) => c.orbit!.M0).sort((x, y) => x - y);
    expect(m0[1] - m0[0]).toBeCloseTo((2 * Math.PI) / 3, 9);
    expect(m0[2] - m0[1]).toBeCloseTo((2 * Math.PI) / 3, 9);
  });

  it('两个断开的连通分量 → 两个恒星系，质心分离；一旦有边相连即合并', () => {
    const twoClusters = [
      { id: 'a', links: ['b', 'c'] },
      { id: 'b', links: ['a', 'c'] },
      { id: 'c', links: ['a', 'b'] },
      { id: 'x', links: ['y', 'z'] },
      { id: 'y', links: ['x', 'z'] },
      { id: 'z', links: ['x', 'y'] },
    ];
    const systems = buildSystems(twoClusters);
    expect(systems).toHaveLength(2);
    const [s1, s2] = systems;
    const d = Math.hypot(
      s1.center[0] - s2.center[0],
      s1.center[1] - s2.center[1],
      s1.center[2] - s2.center[2],
    );
    expect(d).toBeGreaterThan(1);

    // 不变式：连通分量即恒星系 —— 任何跨系连边都会把两系合并为一
    const bridged = buildSystems([
      ...twoClusters,
      { id: 'bridge', links: ['a', 'x'] },
    ]);
    expect(bridged).toHaveLength(1);
    expect(bridged[0].bodies).toHaveLength(7);
  });

  it('确定性：两次构建完全一致', () => {
    const r1 = JSON.stringify(buildSystems(REAL_GARDEN));
    const r2 = JSON.stringify(buildSystems(REAL_GARDEN));
    expect(r1).toBe(r2);
  });
});

describe('solveKepler', () => {
  it('残差 |E − e·sinE − M| < 1e-6（e∈{0,0.1,0.25}，M 全周扫描）', () => {
    for (const e of [0, 0.1, 0.25]) {
      for (let M = 0; M <= Math.PI * 2 + 1e-9; M += Math.PI / 12) {
        const E = solveKepler(M, e);
        // 与内部一致的 M 归一化到 [-π, π]
        let m = M % (Math.PI * 2);
        if (m > Math.PI) m -= Math.PI * 2;
        expect(Math.abs(E - e * Math.sin(E) - m)).toBeLessThan(1e-6);
      }
    }
  });

  it('e=0 时 E ≡ M（归一化后）', () => {
    for (const M of [-5, -1, 0, 0.7, 2.9, 4.2]) {
      let m = M % (Math.PI * 2);
      if (m > Math.PI) m -= Math.PI * 2;
      else if (m < -Math.PI) m += Math.PI * 2;
      expect(solveKepler(M, 0)).toBeCloseTo(m, 12);
    }
  });
});

describe('orbitalPosition', () => {
  const el: OrbitElements = {
    a: 1.5,
    e: 0.14,
    inc: 0.4,
    node: 1.1,
    peri: 2.2,
    M0: 0.5,
    period: 30,
  };

  it('到焦点距离恒在 [a(1−e), a(1+e)] 内', () => {
    const p = { x: 0, y: 0, z: 0 };
    const rMin = el.a * (1 - el.e);
    const rMax = el.a * (1 + el.e);
    for (let t = 0; t < el.period; t += el.period / 200) {
      orbitalPosition(el, t, p);
      const r = Math.hypot(p.x, p.y, p.z);
      expect(r).toBeGreaterThanOrEqual(rMin - 1e-9);
      expect(r).toBeLessThanOrEqual(rMax + 1e-9);
    }
  });

  it('周期整数倍后回到原位', () => {
    const p0 = { x: 0, y: 0, z: 0 };
    const p1 = { x: 0, y: 0, z: 0 };
    orbitalPosition(el, 3.7, p0);
    orbitalPosition(el, 3.7 + el.period * 4, p1);
    expect(Math.hypot(p1.x - p0.x, p1.y - p0.y, p1.z - p0.z)).toBeLessThan(1e-9);
  });
});

describe('orbitEllipsePoints', () => {
  it('采样点闭合且全部落在径向范围内', () => {
    const el: OrbitElements = { a: 2, e: 0.1, inc: 0.3, node: 0.8, peri: 1.4, M0: 0, period: 40 };
    const pts = orbitEllipsePoints(el, 128);
    expect(pts).toHaveLength(128);
    const rMin = el.a * (1 - el.e);
    const rMax = el.a * (1 + el.e);
    for (const [x, y, z] of pts) {
      const r = Math.hypot(x, y, z);
      expect(r).toBeGreaterThanOrEqual(rMin - 1e-9);
      expect(r).toBeLessThanOrEqual(rMax + 1e-9);
    }
  });
});

describe('行星周期满足开普勒第三定律', () => {
  it('所有行星 period / a^1.5 为同一常量', () => {
    const systems = buildSystems(REAL_GARDEN);
    const planets = systems[0].bodies.filter((b) => b.role === 'planet');
    const k = planets[0].orbit!.period / Math.pow(planets[0].orbit!.a, 1.5);
    for (const p of planets) {
      expect(p.orbit!.period / Math.pow(p.orbit!.a, 1.5)).toBeCloseTo(k, 9);
    }
  });
});

describe('bodyRadius', () => {
  it('随度数单调递增并在 12 处封顶', () => {
    expect(bodyRadius(0)).toBeLessThan(bodyRadius(3));
    expect(bodyRadius(3)).toBeLessThan(bodyRadius(10));
    expect(bodyRadius(12)).toBe(bodyRadius(20));
  });
});
