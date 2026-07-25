import { describe, it, expect } from 'vitest';
import { buildGalaxies, type GalaxySpec } from './galaxies';
import { orbitalPosition } from './systems';
import { stargateGalaxies } from '../../../data/stargateDocs';

const byId = <T extends { id: string }>(arr: T[], id: string): T =>
  arr.find((x) => x.id === id)!;

const countRole = (s: GalaxySpec, role: string): number =>
  s.bodies.filter((b) => b.role === role).length;

describe('buildGalaxies · 三星系结构', () => {
  const specs = buildGalaxies(stargateGalaxies);

  it('三个星系，id/名称与策展数据一致', () => {
    expect(specs.map((s) => s.id)).toEqual(['cockpit', 'robot', 'ad']);
    expect(specs.map((s) => s.name)).toEqual(['智能座舱', '通用机器人', '自动驾驶']);
  });

  it('每个星系恰有一个核心恒星（面试指南），无一流星体丢失', () => {
    specs.forEach((s, i) => {
      expect(countRole(s, 'core')).toBe(1);
      expect(s.bodies.find((b) => b.role === 'core')!.id).toBe(
        `interview-${s.id}`,
      );
      // 构建前后星体总数一致
      expect(s.bodies).toHaveLength(stargateGalaxies[i].bodies.length);
    });
  });

  it('角色推导：cockpit 1 核 + 4 行星 + 10 卫星；robot 1+3+0；ad 1+2+3', () => {
    expect(countRole(specs[0], 'planet')).toBe(4);
    expect(countRole(specs[0], 'moon')).toBe(10);
    expect(countRole(specs[1], 'planet')).toBe(3);
    expect(countRole(specs[1], 'moon')).toBe(0);
    expect(countRole(specs[2], 'planet')).toBe(2);
    expect(countRole(specs[2], 'moon')).toBe(3);
  });
});

describe('buildGalaxies · 拓扑序与层级压平', () => {
  const specs = buildGalaxies(stargateGalaxies);

  it('母体必先于卫星出现（场景按 id 挂 group 的前提）', () => {
    for (const s of specs) {
      const seen = new Set<string>();
      for (const b of s.bodies) {
        if (b.parentId) expect(seen.has(b.parentId)).toBe(true);
        seen.add(b.id);
      }
    }
  });

  it('渲染层级深度 ≤ 2：每颗卫星的母体都是核心或行星，绝无卫星绕卫星', () => {
    for (const s of specs) {
      const roleById = new Map(s.bodies.map((b) => [b.id, b.role]));
      for (const b of s.bodies) {
        if (b.role !== 'moon') continue;
        const pr = roleById.get(b.parentId!);
        expect(pr === 'core' || pr === 'planet').toBe(true);
      }
    }
  });

  it('三层语义被压平：atom-vram-budget 数据层母体 af-deploy → 渲染挂到 agent-framework', () => {
    const cockpit = specs[0];
    expect(byId(cockpit.bodies, 'atom-vram-budget').parentId).toBe(
      'agent-framework',
    );
    expect(byId(cockpit.bodies, 'atom-operator-fusion').parentId).toBe(
      'agent-framework',
    );
    // 数据层语义 parentId 保持真值（详情面板用）
    const data = stargateGalaxies[0].bodies;
    expect(byId(data, 'atom-vram-budget').parentId).toBe('af-deploy');
    expect(byId(data, 'atom-operator-fusion').parentId).toBe('af-deploy');
  });
});

describe('buildGalaxies · 轨道几何', () => {
  const specs = buildGalaxies(stargateGalaxies);

  it('同一渲染母体下的多颗卫星轨道半径全部错开（不共环）', () => {
    for (const s of specs) {
      const byParent = new Map<string, number[]>();
      for (const b of s.bodies) {
        if (b.role !== 'moon') continue;
        const arr = byParent.get(b.parentId!) ?? [];
        arr.push(b.orbit!.a);
        byParent.set(b.parentId!, arr);
      }
      for (const arr of byParent.values()) {
        expect(new Set(arr).size).toBe(arr.length);
      }
    }
  });

  it('agent-framework 的 6 颗卫星按数据序得到递增的轨道半径', () => {
    const cockpit = specs[0];
    const moons = cockpit.bodies.filter(
      (b) => b.role === 'moon' && b.parentId === 'agent-framework',
    );
    expect(moons).toHaveLength(6);
    for (let i = 1; i < moons.length; i++) {
      expect(moons[i].orbit!.a).toBeGreaterThan(moons[i - 1].orbit!.a);
    }
  });

  it('核心定锚于星系质心：a=0，任意时刻位置恒为原点', () => {
    const p = { x: 0, y: 0, z: 0 };
    for (const s of specs) {
      const core = s.bodies.find((b) => b.role === 'core')!;
      expect(core.orbit!.a).toBe(0);
      orbitalPosition(core.orbit!, 12.34, p);
      expect(Math.hypot(p.x, p.y, p.z)).toBe(0);
    }
  });

  it('行星周期满足开普勒第三定律（period / a^1.5 为常量）', () => {
    for (const s of specs) {
      const planets = s.bodies.filter((b) => b.role === 'planet');
      if (planets.length < 2) continue;
      const k = planets[0].orbit!.period / Math.pow(planets[0].orbit!.a, 1.5);
      for (const p of planets) {
        expect(p.orbit!.period / Math.pow(p.orbit!.a, 1.5)).toBeCloseTo(k, 9);
      }
    }
  });
});

describe('buildGalaxies · 布局与确定性', () => {
  it('三星系质心分离成宽三角形；单星系居中', () => {
    const specs = buildGalaxies(stargateGalaxies);
    const c = specs.map((s) => s.center);
    for (let i = 0; i < c.length; i++) {
      for (let j = i + 1; j < c.length; j++) {
        const d = Math.hypot(
          c[i][0] - c[j][0],
          c[i][1] - c[j][1],
          c[i][2] - c[j][2],
        );
        expect(d).toBeGreaterThan(5);
      }
    }
    const single = buildGalaxies([stargateGalaxies[0]]);
    expect(single[0].center).toEqual([0, 0, 0]);
  });

  it('两次构建完全一致（确定性，SSG 可复现）', () => {
    expect(JSON.stringify(buildGalaxies(stargateGalaxies))).toBe(
      JSON.stringify(buildGalaxies(stargateGalaxies)),
    );
  });
});
