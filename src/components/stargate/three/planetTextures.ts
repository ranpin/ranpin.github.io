/**
 * 行星地表贴图的 GPU 烘焙管线与每颗行星的"表面档案"。
 *
 * 用一次全屏 pass 把 GLSL fBm 噪声渲染成等距柱状贴图（render target），
 * 交给 MeshStandardMaterial 使用 —— 零外部资源、确定性可复现、加载即生成。
 * 熔岩行星额外烘焙一张裂纹发光掩膜作 emissiveMap（夜半球仍见熔岩流光）。
 */
import * as THREE from 'three';
import {
  planetBakeVert,
  planetBakeFrag,
  cloudBakeFrag,
  nebulaBakeFrag,
  bandBakeFrag,
} from './shaders';
import { hashId } from './systems';

export type SurfaceKind = 'gas' | 'terran' | 'rock' | 'ice' | 'lava' | 'moon';

export interface SurfaceStyle {
  kind: SurfaceKind;
  /** 三色调色板（sRGB hex）：含义随类型 —— 条带/海陆/岩性/冰层/地壳 */
  colA: string;
  colB: string;
  colC: string;
  /** 气态条带频率（其余类型忽略） */
  freq: number;
  roughness: number;
  /** 大气层辉光（null = 无大气，如卫星） */
  atmosphere: { color: string; intensity: number } | null;
  /** 是否附加独立云层球壳 */
  clouds: boolean;
  /** 自发光色（熔岩裂纹）；null = 无 */
  emissive: string | null;
}

/* ---------- 每颗行星的表面档案（curated，贴合笔记主题的"星球人设"） ---------- */
const CURATED: Record<string, SurfaceStyle> = {
  // 蓝紫条带气态巨行星（度数最高的行星，体积感最大）
  'cosmos-reason': {
    kind: 'gas',
    colA: '#3b6fe0',
    colB: '#1b2f7a',
    colC: '#c9b8ff',
    freq: 9,
    roughness: 0.7,
    atmosphere: { color: '#7aa8ff', intensity: 0.62 },
    clouds: false,
    emissive: null,
  },
  // 琥珀金气态巨行星（缓存 = 暖色蓄能）
  'kv-cache': {
    kind: 'gas',
    colA: '#e8b34a',
    colB: '#8a5a22',
    colC: '#ffe9c2',
    freq: 11,
    roughness: 0.7,
    atmosphere: { color: '#ffcf8a', intensity: 0.52 },
    clouds: false,
    emissive: null,
  },
  // 锈红岩星（显存 = 硬件 = 火星质感）
  'vram-budget': {
    kind: 'rock',
    colA: '#c1683f',
    colB: '#6e3a24',
    colC: '#e8a06b',
    freq: 0,
    roughness: 0.95,
    atmosphere: { color: '#ff9a66', intensity: 0.3 },
    clouds: false,
    emissive: null,
  },
  // 类地行星：蓝海绿地 + 云层（蒸馏 = 提炼出的精华世界）
  distillation: {
    kind: 'terran',
    colA: '#1a5fb4',
    colB: '#3f9b4f',
    colC: '#c9a86a',
    freq: 0,
    roughness: 0.8,
    atmosphere: { color: '#6fb7ff', intensity: 0.85 },
    clouds: true,
    emissive: null,
  },
  // 冰封行星（延迟 = 冷、快）
  'latency-budget': {
    kind: 'ice',
    colA: '#cfe6f7',
    colB: '#8fb8dd',
    colC: '#5a7fa8',
    freq: 0,
    roughness: 0.55,
    atmosphere: { color: '#cfeaff', intensity: 0.7 },
    clouds: false,
    emissive: null,
  },
  // 熔岩行星（算子融合 = 高温），夜半球裂纹发光
  'operator-fusion': {
    kind: 'lava',
    colA: '#241a16',
    colB: '#4a2c1e',
    colC: '#ff7a2e',
    freq: 0,
    roughness: 0.9,
    atmosphere: { color: '#ff8a50', intensity: 0.45 },
    clouds: false,
    emissive: '#ff6a2a',
  },
  // 沙褐岩星（Jetson Orin = 硅基硬件的荒漠感）
  'orin-fmha': {
    kind: 'rock',
    colA: '#b39b72',
    colB: '#6f5b41',
    colC: '#d9c49a',
    freq: 0,
    roughness: 0.95,
    atmosphere: { color: '#e8c9a0', intensity: 0.28 },
    clouds: false,
    emissive: null,
  },
  // 异海类地：青绿海洋 + 琥珀陆地 + 云层（视觉语言 = 斑斓）
  vlm: {
    kind: 'terran',
    colA: '#0f7f8b',
    colB: '#b0713d',
    colC: '#e0c368',
    freq: 0,
    roughness: 0.8,
    atmosphere: { color: '#7fe0d0', intensity: 0.8 },
    clouds: true,
    emissive: null,
  },
  // 灰色风化层卫星（edge-ai 的卫星）
  'learning-in-public': {
    kind: 'moon',
    colA: '#9a9aa2',
    colB: '#5f5f68',
    colC: '#3f414d',
    freq: 0,
    roughness: 0.98,
    atmosphere: null,
    clouds: false,
    emissive: null,
  },
};

/** 未知节点的确定性回退（散列取一种） */
const FALLBACK: SurfaceStyle[] = [
  {
    kind: 'rock',
    colA: '#8f9aa8',
    colB: '#565f6b',
    colC: '#c2ccd8',
    freq: 0,
    roughness: 0.95,
    atmosphere: { color: '#a8c4e0', intensity: 0.25 },
    clouds: false,
    emissive: null,
  },
  {
    kind: 'gas',
    colA: '#3fb8c9',
    colB: '#1e5f74',
    colC: '#d8fff4',
    freq: 10,
    roughness: 0.7,
    atmosphere: { color: '#7fe0e8', intensity: 0.55 },
    clouds: false,
    emissive: null,
  },
  {
    kind: 'terran',
    colA: '#2a6f9e',
    colB: '#5e9e54',
    colC: '#b8a06a',
    freq: 0,
    roughness: 0.8,
    atmosphere: { color: '#6fb7ff', intensity: 0.8 },
    clouds: true,
    emissive: null,
  },
  {
    kind: 'ice',
    colA: '#dceaf5',
    colB: '#9db8d4',
    colC: '#6a86ab',
    freq: 0,
    roughness: 0.55,
    atmosphere: { color: '#d8ecff', intensity: 0.65 },
    clouds: false,
    emissive: null,
  },
];

export function surfaceStyleFor(id: string): SurfaceStyle {
  return CURATED[id] ?? FALLBACK[hashId(id) % FALLBACK.length];
}

const KIND_INT: Record<SurfaceKind, number> = {
  gas: 0,
  terran: 1,
  rock: 2,
  ice: 3,
  lava: 4,
  moon: 5,
};

/** hex → 原始 sRGB 0..1 三分量（绕过 ColorManagement，着色器直接消费） */
const srgbVec = (hex: string): THREE.Vector3 => {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(
    ((n >> 16) & 255) / 255,
    ((n >> 8) & 255) / 255,
    (n & 255) / 255,
  );
};

/** id → 确定性噪声种子（5..95，避免整数格点对齐） */
const seedFor = (id: string): number => ((hashId(id) % 997) / 997) * 90 + 5;

export interface BakedMaps {
  map: THREE.Texture;
  emissiveMap: THREE.Texture | null;
}

/**
 * GPU 烘焙器：复用同一个全屏四边形场景，把噪声着色器渲染进 render target。
 * 所有 target 由烘焙器持有，随场景 dispose 一并释放。
 */
export class TextureBaker {
  private scene = new THREE.Scene();
  private camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
  private quad: THREE.Mesh;
  private targets: THREE.WebGLRenderTarget[] = [];
  private anisotropy: number;

  constructor(renderer: THREE.WebGLRenderer) {
    this.quad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2));
    this.scene.add(this.quad);
    this.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
  }

  private bake(
    renderer: THREE.WebGLRenderer,
    fragmentShader: string,
    uniforms: Record<string, THREE.IUniform>,
    w: number,
    h: number,
    srgb: boolean,
  ): THREE.Texture {
    const mat = new THREE.ShaderMaterial({
      vertexShader: planetBakeVert,
      fragmentShader,
      uniforms,
      // 关闭混合：把着色器输出原样写进 RT（含 alpha）。
      // 若走默认 NormalBlending，texel 会被预乘成 (col·a, a²)，
      // 消费端再乘一次 alpha → 星云/云层暗一个数量级。
      blending: THREE.NoBlending,
    });
    this.quad.material = mat;
    const rt = new THREE.WebGLRenderTarget(w, h);
    const tex = rt.texture;
    tex.wrapS = THREE.RepeatWrapping;
    if (srgb) tex.colorSpace = THREE.SRGBColorSpace;
    tex.generateMipmaps = true;
    tex.minFilter = THREE.LinearMipmapLinearFilter;
    tex.anisotropy = this.anisotropy;
    renderer.setRenderTarget(rt);
    renderer.render(this.scene, this.camera);
    renderer.setRenderTarget(null);
    mat.dispose();
    this.targets.push(rt);
    return tex;
  }

  /** 行星地表 albedo（熔岩附加裂纹发光掩膜） */
  bakePlanetMaps(renderer: THREE.WebGLRenderer, id: string, style: SurfaceStyle): BakedMaps {
    const uniforms: Record<string, THREE.IUniform> = {
      uType: { value: KIND_INT[style.kind] },
      uSeed: { value: seedFor(id) },
      uFreq: { value: style.freq },
      uEmissive: { value: 0 },
      uColA: { value: srgbVec(style.colA) },
      uColB: { value: srgbVec(style.colB) },
      uColC: { value: srgbVec(style.colC) },
    };
    const map = this.bake(renderer, planetBakeFrag, uniforms, 512, 256, true);
    let emissiveMap: THREE.Texture | null = null;
    if (style.kind === 'lava') {
      uniforms.uEmissive.value = 1;
      emissiveMap = this.bake(renderer, planetBakeFrag, uniforms, 512, 256, false);
    }
    return { map, emissiveMap };
  }

  /** 云层（白色 + alpha 云量） */
  bakeClouds(renderer: THREE.WebGLRenderer, id: string): THREE.Texture {
    return this.bake(
      renderer,
      cloudBakeFrag,
      { uSeed: { value: seedFor(`cloud::${id}`) } },
      512,
      256,
      true,
    );
  }

  /** 星云团块（双色 fBm） */
  bakeNebula(
    renderer: THREE.WebGLRenderer,
    colA: string,
    colB: string,
    seed: number,
  ): THREE.Texture {
    return this.bake(
      renderer,
      nebulaBakeFrag,
      { uSeed: { value: seed }, uColA: { value: srgbVec(colA) }, uColB: { value: srgbVec(colB) } },
      512,
      512,
      true,
    );
  }

  /** 银河带（宽幅横向剖面） */
  bakeBand(renderer: THREE.WebGLRenderer, colA: string, colB: string): THREE.Texture {
    return this.bake(
      renderer,
      bandBakeFrag,
      { uSeed: { value: 42.5 }, uColA: { value: srgbVec(colA) }, uColB: { value: srgbVec(colB) } },
      1024,
      256,
      true,
    );
  }

  dispose() {
    this.quad.geometry.dispose();
    this.targets.forEach((t) => t.dispose());
    this.targets = [];
  }
}
