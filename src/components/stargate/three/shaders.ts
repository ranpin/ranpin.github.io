/**
 * 「星际之门」three.js 场景的 GLSL 着色器与程序化贴图。
 *
 * 全部材质走自发光/加色路线（无光照计算），贴合赛博朋克的"自发光深空"观感，
 * 也避免在 jsdom / 无 WebGL 环境下引入光照管线的额外脆弱性。
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

/* ---------- 想法恒星：白热核心 → 阶段色边缘 + 菲涅尔辉光 ---------- */
export const starVert = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

export const starFrag = /* glsl */ `
  uniform vec3 uColor;
  uniform float uBoost;   // 悬停/选中时提亮
  uniform float uTime;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    float ndv = max(dot(vNormal, vViewDir), 0.0);
    // 恒星观感：白热核心集中在中心，球体本身只是发光体，
    // 弱化"实心球"感 —— 外围光晕交给加色 glow sprite
    float core = pow(ndv, 5.0);
    vec3 col = uColor * (0.30 + 0.55 * pow(ndv, 1.5));
    col += vec3(1.0, 0.98, 0.92) * core * 1.7;
    // 边缘只微微透出阶段色（呼吸），不再是浓霓虹描边
    float rim = pow(1.0 - ndv, 2.5);
    float breathe = 0.92 + 0.08 * sin(uTime * 1.6);
    col += uColor * rim * 0.5 * breathe;
    gl_FragColor = vec4(col * uBoost, 1.0);
  }
`;

/* ---------- 事件视界：旋转涟漪的蓝色"水洼" ---------- */
export const horizonVert = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const horizonFrag = /* glsl */ `
  uniform float uTime;
  varying vec2 vUv;

  float swirl(vec2 p, float t) {
    float a = atan(p.y, p.x);
    float r = length(p);
    return sin(a * 5.0 + t * 1.4 - r * 8.0) * 0.5 + 0.5;
  }

  void main() {
    vec2 p = vUv * 2.0 - 1.0;
    float r = length(p);
    if (r > 1.0) discard;

    float s1 = swirl(p, uTime);
    float s2 = swirl(p * 1.8 + 0.35, uTime * 0.65 + 2.0);
    float v = s1 * 0.6 + s2 * 0.4;
    // 向外扩散的同心涟漪
    float rings = sin(r * 13.0 - uTime * 2.4) * 0.5 + 0.5;

    vec3 deep = vec3(0.012, 0.06, 0.18);
    vec3 bright = vec3(0.18, 0.62, 0.95);
    vec3 col = mix(deep, bright, v * 0.4 + rings * 0.28);
    // 内缘一抹微光
    float body = smoothstep(1.0, 0.45, r);
    float edgeGlow = smoothstep(0.72, 0.98, r);
    col += bright * edgeGlow * 0.5;

    // 整体压成"淡背景漩涡"，把主角让给前景星图
    float alpha = body * (0.18 + 0.26 * v) + edgeGlow * 0.18;
    gl_FragColor = vec4(col, alpha * 0.32);
  }
`;

/* ---------- 星门圆环：沿环体的流动辉光 ---------- */
export const ringVert = /* glsl */ `
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    vPos = position;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormal = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

export const ringFrag = /* glsl */ `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec3 vPos;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  void main() {
    // 环体角度 → 流动的能量脉冲
    float ang = atan(vPos.y, vPos.x);
    float flow = sin(ang * 3.0 - uTime * 1.8) * 0.5 + 0.5;
    float ndv = max(dot(vNormal, vViewDir), 0.0);
    float rim = pow(1.0 - ndv, 1.6);
    vec3 col = uColor * (0.55 + 0.45 * flow) + vec3(0.9, 0.98, 1.0) * rim * 0.5;
    gl_FragColor = vec4(col, 1.0);
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

/* ---------- 程序化贴图 ---------- */

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

/** 星云贴图：带噪点感的柔和彩色团块，用于远景星云 Sprite */
export function makeNebulaTexture(
  rgb: [number, number, number],
  size = 256,
): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const [r, g, b] = rgb;
  // 多层偏心径向渐变叠加，避免完美同心圆
  const blobs = [
    { x: 0.5, y: 0.5, rad: 0.5, a: 0.5 },
    { x: 0.38, y: 0.42, rad: 0.34, a: 0.35 },
    { x: 0.62, y: 0.58, rad: 0.3, a: 0.3 },
    { x: 0.55, y: 0.38, rad: 0.22, a: 0.28 },
  ];
  for (const bl of blobs) {
    const cx = bl.x * size;
    const cy = bl.y * size;
    const rad = bl.rad * size;
    const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
    grad.addColorStop(0, `rgba(${r},${g},${b},${bl.a})`);
    grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
