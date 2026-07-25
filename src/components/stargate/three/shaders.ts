/**
 * 「星际之门」three.js 场景的 GLSL 着色器与程序化贴图。
 *
 * 混合光照路线：
 *  - 核心恒星/流浪恒星 —— 自发光等离子体着色器（fBm 噪声滚动，白热核心 + 阶段色边缘）；
 *  - 行星/卫星 —— GPU 烘焙的程序化地表贴图（albedo，熔岩含 emissive 裂纹掩膜），
 *    交给 MeshStandardMaterial + 系统质心点光源，呈现真实昼夜晨昏线；
 *  - 大气层 —— 菲涅尔辉光壳（BackSide），昼半球一侧更亮；
 *  - 背景 —— 双层闪烁星海 + GPU 烘焙 fBm 星云 + 银河带。
 *
 * 所有噪声为纯 GLSL 值噪声（无外部贴图依赖），种子确定，SSG/测试环境可复现。
 */
import * as THREE from 'three';

/** 检测 WebGL 支持（jsdom / 无 GPU 环境返回 false，供组件做优雅降级） */
export function supportsWebGL(): boolean {
  if (typeof document === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl2') || canvas.getContext('webgl'))
    );
  } catch {
    return false;
  }
}

/* ---------- GLSL 噪声库（值噪声 + fBm + 山脊噪声，供各着色器拼接复用） ---------- */
export const glslNoise = /* glsl */ `
  float hash13(vec3 p) {
    p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
    p *= 17.0;
    return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
  }
  float noise3(vec3 x) {
    vec3 i = floor(x);
    vec3 f = fract(x);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(mix(hash13(i), hash13(i + vec3(1.0, 0.0, 0.0)), f.x),
          mix(hash13(i + vec3(0.0, 1.0, 0.0)), hash13(i + vec3(1.0, 1.0, 0.0)), f.x),
          f.y),
      mix(mix(hash13(i + vec3(0.0, 0.0, 1.0)), hash13(i + vec3(1.0, 0.0, 1.0)), f.x),
          mix(hash13(i + vec3(0.0, 1.0, 1.0)), hash13(i + vec3(1.0, 1.0, 1.0)), f.x),
          f.y),
      f.z);
  }
  float fbm(vec3 p) {
    float s = 0.0;
    float a = 0.5;
    for (int i = 0; i < 5; i++) {
      s += a * noise3(p);
      p = p * 2.03 + vec3(11.7);
      a *= 0.5;
    }
    return s;
  }
  float ridged(vec3 p) {
    float s = 0.0;
    float a = 0.5;
    for (int i = 0; i < 4; i++) {
      s += a * (1.0 - abs(noise3(p) * 2.0 - 1.0));
      p = p * 2.11 + vec3(7.3);
      a *= 0.5;
    }
    return s;
  }
`;

/* ---------- 核心恒星：白热核心 + 等离子体翻涌 + 阶段色边缘 ---------- */
export const starVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vObjPos;
  void main() {
    vObjPos = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

export const starFrag =
  glslNoise +
  /* glsl */ `
  uniform vec3 uColor;
  uniform float uBoost;   // 悬停/选中时提亮
  uniform float uTime;
  uniform float uSeed;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vObjPos;
  void main() {
    float ndv = max(dot(vNormal, vViewDir), 0.0);
    // 等离子体：大尺度翻涌 + 细粒度米粒组织，随时间缓慢流动
    float plasma = fbm(vObjPos * 3.0 + vec3(0.0, uTime * 0.10, uTime * 0.06) + uSeed);
    float gran = fbm(vObjPos * 8.5 - vec3(uTime * 0.17) + uSeed * 2.0);
    float core = pow(ndv, 5.0);
    vec3 col = uColor * (0.30 + 0.55 * pow(ndv, 1.5)) * (0.78 + 0.48 * plasma);
    col += vec3(1.0, 0.98, 0.92) * core * (1.55 + 0.55 * gran);
    // 边缘只微微透出阶段色（呼吸），不再是浓霓虹描边
    float rim = pow(1.0 - ndv, 2.5);
    float breathe = 0.92 + 0.08 * sin(uTime * 1.6);
    col += uColor * rim * 0.5 * breathe;
    gl_FragColor = vec4(col * uBoost, 1.0);
  }
`;

/* ---------- 背景星海：逐点闪烁的软圆点 ---------- */
export const starfieldVert = /* glsl */ `
  attribute float aSize;
  attribute float aPhase;
  attribute vec3 aColor;
  uniform float uTime;
  varying vec3 vColor;
  varying float vTw;
  void main() {
    vColor = aColor;
    vTw = 0.62 + 0.38 * sin(uTime * (0.4 + aPhase * 1.4) + aPhase * 9.0);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (320.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

export const starfieldFrag = /* glsl */ `
  varying vec3 vColor;
  varying float vTw;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.05, d);
    gl_FragColor = vec4(vColor, a * vTw);
  }
`;

/* ---------- 行星地表烘焙：球面方向 → 无缝等距柱状贴图 ---------- */
export const planetBakeVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

/**
 * uType：0 气态巨行星 / 1 类地 / 2 岩石 / 3 冰封 / 4 熔岩 / 5 卫星
 * 输出：rgb = albedo；uEmissive=1 时输出熔岩裂纹发光掩膜（灰度）。
 */
export const planetBakeFrag =
  glslNoise +
  /* glsl */ `
  uniform int uType;
  uniform float uSeed;
  uniform float uFreq;
  uniform float uEmissive;
  uniform vec3 uColA;
  uniform vec3 uColB;
  uniform vec3 uColC;
  varying vec2 vUv;

  vec3 uvToDir(vec2 uv) {
    float theta = uv.x * 6.2831853;
    float phi = uv.y * 3.1415927;
    return vec3(sin(phi) * cos(theta), cos(phi), sin(phi) * sin(theta));
  }

  /* 环形山：种子化散布的碗状凹陷 + 提亮坑缘 */
  vec3 applyCraters(vec3 dir, vec3 col, float seed, float strength) {
    for (int i = 0; i < 7; i++) {
      float fi = float(i);
      vec3 sc = normalize(vec3(
        hash13(vec3(seed, fi * 1.3 + 2.0, 7.7)) * 2.0 - 1.0,
        hash13(vec3(seed, fi * 2.1 + 5.0, 3.3)) * 1.4 - 0.7,
        hash13(vec3(seed, fi * 1.7 + 8.0, 1.1)) * 2.0 - 1.0));
      float dd = length(dir - sc);
      float bowl = smoothstep(0.34, 0.06, dd);
      float rim = smoothstep(0.05, 0.16, dd) * smoothstep(0.34, 0.20, dd);
      col *= 1.0 - bowl * strength + rim * strength * 0.6;
    }
    return col;
  }

  void main() {
    vec3 dir = uvToDir(vUv);
    vec3 col = vec3(0.5);
    float mask = 0.0;

    if (uType == 0) {
      /* 气态巨行星：纬度条带 + 湍流扰动 + 巨型风暴眼 */
      float swirl = fbm(dir * 2.6 + uSeed);
      float bands = sin(dir.y * uFreq + swirl * 2.4);
      vec3 base = mix(uColA, uColB, smoothstep(-0.75, 0.75, bands));
      base = mix(base, uColC, smoothstep(0.55, 0.95, abs(dir.y)) * 0.5);
      vec3 spot = normalize(vec3(
        hash13(vec3(uSeed, 1.7, 9.2)) * 1.6 - 0.8,
        hash13(vec3(uSeed, 4.3, 2.8)) * 0.9 - 0.45,
        hash13(vec3(uSeed, 8.1, 5.5)) * 1.6 - 0.8));
      float storm = smoothstep(0.5, 0.08, length(dir - spot));
      base = mix(base, uColC * 1.2, storm * 0.7);
      col = base * (0.88 + 0.24 * fbm(dir * 7.0 + uSeed * 1.7));
    } else if (uType == 1) {
      /* 类地行星：海洋/大陆（fBm 阈值）+ 赤道荒漠 + 极地冰盖 + 浅滩 */
      float c = fbm(dir * 2.1 + uSeed) + 0.45 * fbm(dir * 5.3 + uSeed * 2.3);
      float land = smoothstep(0.58, 0.66, c);
      vec3 ocean = mix(uColA * 0.5, uColA, smoothstep(0.28, 0.58, c));
      float veg = fbm(dir * 3.3 + 4.7 + uSeed);
      float dry = smoothstep(0.5, 0.15, abs(dir.y));
      vec3 landCol = mix(uColB, uColC, clamp(veg * 0.7 + dry * 0.55, 0.0, 1.0));
      col = mix(ocean, landCol, land);
      col = mix(col, uColA * 1.25, smoothstep(0.555, 0.58, c) * (1.0 - land));
      float cap = smoothstep(0.78, 0.9, abs(dir.y) + (fbm(dir * 6.0 + uSeed) - 0.5) * 0.16);
      col = mix(col, vec3(0.92, 0.96, 1.0), cap);
    } else if (uType == 2) {
      /* 岩石行星：双色基底 + 细粒度砂砾 + 环形山 */
      float n = fbm(dir * 3.0 + uSeed);
      col = mix(uColA, uColB, smoothstep(0.3, 0.7, n));
      col *= 0.82 + 0.36 * fbm(dir * 8.5 + uSeed * 3.1);
      col = applyCraters(dir, col, uSeed * 1.9 + 3.0, 0.4);
      col = mix(col, uColC, smoothstep(0.66, 0.85, fbm(dir * 1.7 + uSeed * 5.7)) * 0.4);
    } else if (uType == 3) {
      /* 冰封行星：苍白基底 + 山脊状冰裂纹 + 极区压暗 */
      float n = fbm(dir * 2.4 + uSeed);
      col = mix(uColA, uColB, smoothstep(0.35, 0.75, n));
      float line = smoothstep(0.74, 0.94, ridged(dir * 3.6 + uSeed * 1.9));
      col = mix(col, uColC, line * 0.55);
      col += vec3(0.06) * fbm(dir * 9.0 + uSeed);
      col *= 1.0 - 0.14 * smoothstep(0.5, 0.95, abs(dir.y));
    } else if (uType == 4) {
      /* 熔岩行星：暗色玄武岩地壳 + 山脊噪声裂纹（掩膜供夜晚发光） */
      float crust = fbm(dir * 3.2 + uSeed);
      col = mix(uColA, uColB, smoothstep(0.35, 0.7, crust));
      float cracks = ridged(dir * 4.4 + uSeed * 2.7);
      float glow = smoothstep(0.62, 0.94, cracks);
      float ember = smoothstep(0.78, 0.96, fbm(dir * 7.5 + uSeed * 4.3));
      mask = max(glow, ember * 0.55);
      col = mix(col, uColC * 0.5, mask * 0.55);
    } else {
      /* 卫星：灰色风化层 + 暗色月海 + 密集环形山 */
      float n = fbm(dir * 3.4 + uSeed);
      col = mix(uColA, uColB, smoothstep(0.3, 0.72, n));
      col *= 0.86 + 0.28 * fbm(dir * 9.5 + uSeed * 2.9);
      col = mix(col, uColC, smoothstep(0.6, 0.8, fbm(dir * 1.8 + uSeed * 5.1)) * 0.45);
      col = applyCraters(dir, col, uSeed * 2.3 + 9.0, 0.34);
    }

    if (uEmissive > 0.5) {
      gl_FragColor = vec4(vec3(mask), 1.0);
    } else {
      gl_FragColor = vec4(col, 1.0);
    }
  }
`;

/** 云层烘焙：白色 + fBm 云量 alpha（map 的 alpha 通道即透明度） */
export const cloudBakeFrag =
  glslNoise +
  /* glsl */ `
  uniform float uSeed;
  varying vec2 vUv;
  void main() {
    float theta = vUv.x * 6.2831853;
    float phi = vUv.y * 3.1415927;
    vec3 dir = vec3(sin(phi) * cos(theta), cos(phi), sin(phi) * sin(theta));
    float c = fbm(dir * 3.0 + uSeed) + 0.5 * fbm(dir * 7.3 + uSeed * 2.1);
    float a = smoothstep(0.66, 1.0, c) * 0.9;
    gl_FragColor = vec4(1.0, 1.0, 1.0, a);
  }
`;

/** 星云烘焙：fBm 团块结构 + 双色混合，边缘柔和衰减 */
export const nebulaBakeFrag =
  glslNoise +
  /* glsl */ `
  uniform float uSeed;
  uniform vec3 uColA;
  uniform vec3 uColB;
  varying vec2 vUv;
  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    float fall = smoothstep(1.0, 0.1, length(p));
    // 噪声与水平镜像平均 → 贴图关于中线对称，保证背景左右平衡（不随种子偏斜）
    vec2 muv = vec2(1.0 - vUv.x, vUv.y);
    float n = 0.5 * (fbm(vec3(vUv * 3.2, 0.35) + uSeed) + fbm(vec3(muv * 3.2, 0.35) + uSeed));
    float fil =
      0.5 * (ridged(vec3(vUv * 4.6, 0.8) + uSeed * 1.7) + ridged(vec3(muv * 4.6, 0.8) + uSeed * 1.7));
    // 降阈值 + 缓指数 + 整体增密：让彩雾浓度足以在深空背景上显色，仍保留丝缕结构
    float a = fall * pow(max(n * 0.8 + fil * 0.5 - 0.16, 0.0), 1.2) * 1.25;
    a = min(a, 0.8);
    float cm =
      0.5 *
      (fbm(vec3(vUv * 2.1 + 3.3, 0.6) + uSeed * 0.7) +
        fbm(vec3(muv * 2.1 + 3.3, 0.6) + uSeed * 0.7));
    vec3 col = mix(uColA, uColB, cm);
    gl_FragColor = vec4(col, a);
  }
`;

/** 银河带烘焙：横向高斯剖面 + 噪声尘埃明暗 */
export const bandBakeFrag =
  glslNoise +
  /* glsl */ `
  uniform float uSeed;
  uniform vec3 uColA;
  uniform vec3 uColB;
  varying vec2 vUv;
  void main() {
    float band = exp(-pow((vUv.y - 0.5) * 3.4, 2.0));
    // 噪声与水平镜像平均 → 银河带左右对称，避免背景重心偏斜
    float mx = 1.0 - vUv.x;
    float n =
      0.5 *
      (fbm(vec3(vUv.x * 7.0, vUv.y * 2.2, 0.5) + uSeed) +
        fbm(vec3(mx * 7.0, vUv.y * 2.2, 0.5) + uSeed));
    float dust =
      0.5 *
      (ridged(vec3(vUv.x * 11.0, vUv.y * 4.0, 0.9) + uSeed * 2.3) +
        ridged(vec3(mx * 11.0, vUv.y * 4.0, 0.9) + uSeed * 2.3));
    float a = band * (0.3 + 0.7 * n) * (0.75 + 0.25 * dust) * 0.55;
    float t = clamp(abs(vUv.y - 0.5) * 2.2 + (n - 0.5) * 0.5, 0.0, 1.0);
    gl_FragColor = vec4(mix(uColA, uColB, t), a);
  }
`;

/* ---------- 大气层辉光壳：BackSide 菲涅尔环 + 昼半球增强 ---------- */
export const atmosphereVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

export const atmosphereFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uBoost;
  uniform vec3 uLightDir; // 星体 → 光源（系统质心）的单位方向
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vWorldNormal;
  void main() {
    // BackSide 壳层只有行星剪影外的一圈可见，形成贴边辉光
    float rim = pow(clamp(0.72 - dot(vNormal, vViewDir), 0.0, 1.0), 2.6);
    float day = 0.30 + 0.70 * max(dot(vWorldNormal, uLightDir), 0.0);
    gl_FragColor = vec4(uColor * rim * uIntensity * day * uBoost, 1.0);
  }
`;

/* ---------- 程序化贴图 ---------- */

/**
 * 原始 sRGB 数值颜色（绕过 ColorManagement 的 hex→linear 转换）。
 * 自定义 ShaderMaterial 不含输出编码 chunk，直接写帧缓冲，
 * 传入"所见即所得"的 sRGB 分量才能命中设计色。
 */
export function rawSrgbColor(hex: string): THREE.Color {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Color(
    ((n >> 16) & 255) / 255,
    ((n >> 8) & 255) / 255,
    (n & 255) / 255,
  );
}

/** 径向辉光贴图（白心 → 透明），供 Sprite 加色发光使用，颜色由材质 tint */
export function makeGlowTexture(size = 128): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.12)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
