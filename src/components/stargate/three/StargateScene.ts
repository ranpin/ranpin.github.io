/**
 * 星际之门 three.js 场景管理器（纯 three，无 React 依赖）。
 *
 * 负责：WebGL 渲染 + CSS2D 标签层、恒星系（单星/双星/三星核心 + 行星 + 卫星，
 * 全部按开普勒轨道自行运动）、轨道线 / 运动尾迹 / 日冕脉冲、背景星海与星云、
 * 自定义轨道相机（拖拽旋转带惯性 / 滚轮推拉 / 空闲自转 / 选中追踪）、射线拾取。
 *
 * 星体结构由 systems.ts 的 buildSystems 从花园关联图确定性构建；本模块只负责
 * 把 SystemSpec 渲染成一个"动态宇宙"。React 侧（DigitalGarden）通过回调接收
 * hover/click，通过公开方法驱动相机与高亮。仅在客户端且确认支持 WebGL 后由
 * React 构造（见 DigitalGarden 的 supportsWebGL）。
 */
import * as THREE from 'three';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {
  starVert,
  starFrag,
  starfieldVert,
  starfieldFrag,
  makeGlowTexture,
  makeNebulaTexture,
} from './shaders';
import {
  orbitalPosition,
  orbitEllipsePoints,
  type SystemSpec,
  type BodySpec,
} from './systems';

/** 每个花园节点的展示元数据（由 React 侧传入） */
export interface SceneBodyMeta {
  id: string;
  title: string;
  designation: string;
  /** 成长阶段色（恒星边缘/辉光着色） */
  color: string;
  /** 原始关联（用于悬停/选中时的邻居高亮） */
  links?: string[];
}

export interface StargateSceneOptions {
  container: HTMLElement;
  systems: SystemSpec[];
  meta: SceneBodyMeta[];
  reduceMotion: boolean;
  onNodeClick: (id: string) => void;
  onNodeHover: (id: string | null) => void;
}

/* ---------- 相机常量 ---------- */
const FOV = 55;
const DIST_MIN = 2.2;
const DIST_MAX = 16;
const HOME = { rx: 0.32, ry: 0.52, dist: 7.6 };
const RX_LIMIT = 1.15;
const AUTO_SPEED = 0.00026; // 空闲自转 rad/帧
const CHASE_DIST = 2.6; // 选中追踪时的镜头距离

/* ---------- 尾迹 / 轨道线 ---------- */
const TRAIL_N = 40; // 尾迹顶点数
const TRAIL_ARC = 0.09; // 尾迹覆盖的轨道弧长比例

/* 详情面板布局（与 DigitalGarden 的 sm:w-[400px] / Tailwind sm 断点保持一致）：
   面板打开时渲染视口需左移半个面板宽，让选中恒星落在"可见区"中心 */
const DETAIL_PANEL_W = 400;
const PANEL_BREAKPOINT = 640;

interface BodyRT {
  spec: BodySpec;
  group: THREE.Group;
  sphereMat: THREE.ShaderMaterial;
  glowMat: THREE.SpriteMaterial;
  glow: THREE.Sprite;
  /** 核心恒星的日冕脉冲 sprite */
  corona: THREE.Sprite | null;
  coronaMat: THREE.SpriteMaterial | null;
  hit: THREE.Mesh;
  labelEl: HTMLButtonElement;
  /** CSS2D 锚点对象：y 偏移随镜头距离缩放，保持屏幕间距恒定 */
  label: CSS2DObject;
  labelBaseY: number;
  reticle: THREE.Group;
  reticleMats: THREE.MeshBasicMaterial[];
  /** 运动尾迹（核心/行星；卫星与流浪恒星无） */
  trail: THREE.Line | null;
  trailPos: Float32Array | null;
  boost: number;
  boostT: number;
  baseColor: THREE.Color;
  /** 脉冲相位偏移（散列自 id，避免齐步走） */
  phase: number;
}

interface SystemRT {
  spec: SystemSpec;
  group: THREE.Group;
  bodies: BodyRT[];
  byId: Map<string, BodyRT>;
  /** 多星核心的质心辉光 */
  baryMat: THREE.SpriteMaterial | null;
}

export class StargateScene {
  private renderer: THREE.WebGLRenderer;
  private labelRenderer: CSS2DRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private container: HTMLElement;
  private opts: StargateSceneOptions;

  private systemsRT: SystemRT[] = [];
  private bodyById = new Map<string, BodyRT>();
  private hitMeshes: THREE.Mesh[] = [];
  private hitIds: string[] = [];
  private adj = new Map<string, Set<string>>();

  private starfieldMat: THREE.ShaderMaterial | null = null;
  private glowTex: THREE.CanvasTexture;
  private nebulaTexs: THREE.CanvasTexture[] = [];

  private cam = {
    cur: { rx: HOME.rx + 0.5, ry: HOME.ry - 1.3, dist: 11.5 },
    tgt: { ...HOME },
    vel: { rx: 0, ry: 0 },
  };
  /** 相机注视点：选中时逐帧追踪星体，否则归于系统质心 */
  private camTarget = new THREE.Vector3();
  private camTargetTgt = new THREE.Vector3();

  private dragging = false;
  private lastPointer = { x: 0, y: 0 };
  private downAt = { x: 0, y: 0 };
  private lastInteract = 0;
  private hovered: string | null = null;
  private selected: string | null = null;

  /** 画布 CSS 尺寸（resize 时更新），供 setViewOffset 使用 */
  private view = { w: 800, h: 600 };
  /** 可见区修正偏移量（px）：面板打开时把渲染视口左移，cur 逐帧缓动到 tgt */
  private shift = { cur: 0, tgt: 0 };

  private raycaster = new THREE.Raycaster();
  private ndc = new THREE.Vector2();
  private tmpV = new THREE.Vector3();
  private timer = new THREE.Timer();
  private raf = 0;
  private ro: ResizeObserver | null = null;
  private disposed = false;

  constructor(opts: StargateSceneOptions) {
    this.opts = opts;
    this.container = opts.container;
    const reduce = opts.reduceMotion;
    if (reduce) Object.assign(this.cam.cur, this.cam.tgt);

    // 无向邻接表（邻居高亮用）
    for (const m of opts.meta) {
      for (const t of m.links || []) {
        if (!this.adj.has(m.id)) this.adj.set(m.id, new Set());
        if (!this.adj.has(t)) this.adj.set(t, new Set());
        this.adj.get(m.id)!.add(t);
        this.adj.get(t)!.add(m.id);
      }
    }

    /* ---------- 渲染器 ---------- */
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    this.renderer.setClearColor(0x000000, 0);
    const canvas = this.renderer.domElement;
    canvas.className = 'sg3-canvas';
    this.container.appendChild(canvas);

    this.labelRenderer = new CSS2DRenderer();
    const labelDom = this.labelRenderer.domElement;
    labelDom.className = 'sg3-labels';
    this.container.appendChild(labelDom);

    this.camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);

    this.glowTex = makeGlowTexture();
    this.buildStarfield();
    this.buildNebulae();
    this.buildSystems(reduce);

    this.resize();
    this.bindEvents();

    /* ---------- 动画循环 ---------- */
    const frame = (ts: number) => {
      if (this.disposed) return;
      this.raf = requestAnimationFrame(frame);
      this.timer.update(ts);
      const dt = Math.min(this.timer.getDelta(), 0.05);
      const t = this.timer.getElapsed();
      const tSim = reduce ? 0 : t;
      this.updateBodies(tSim, dt, reduce);
      this.updateCamera(dt);
      if (this.starfieldMat) this.starfieldMat.uniforms.uTime.value = tSim;
      this.renderer.render(this.scene, this.camera);
      this.labelRenderer.render(this.scene, this.camera);
    };
    this.raf = requestAnimationFrame(frame);
  }

  /* ================= 构建 ================= */

  private buildStarfield() {
    const COUNT = 1500;
    const pos = new Float32Array(COUNT * 3);
    const col = new Float32Array(COUNT * 3);
    const size = new Float32Array(COUNT);
    const phase = new Float32Array(COUNT);
    const palette: [number, number, number][] = [
      [0.83, 0.9, 1.0], // 冷白
      [0.59, 0.78, 1.0], // 淡蓝
      [1.0, 0.89, 0.7], // 暖金
      [0.78, 0.67, 1.0], // 淡紫
    ];
    let seed = 0x5a7f21;
    const rnd = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
    for (let i = 0; i < COUNT; i++) {
      // 均匀球壳 25..60
      const r = 25 + rnd() * 35;
      const th = rnd() * Math.PI * 2;
      const ph = Math.acos(2 * rnd() - 1);
      pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
      pos[i * 3 + 1] = r * Math.cos(ph);
      pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
      const c = palette[rnd() < 0.62 ? 0 : rnd() < 0.55 ? 1 : rnd() < 0.7 ? 2 : 3];
      col[i * 3] = c[0];
      col[i * 3 + 1] = c[1];
      col[i * 3 + 2] = c[2];
      size[i] = 0.3 + rnd() * 0.85;
      phase[i] = rnd();
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
    geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
    geo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
    this.starfieldMat = new THREE.ShaderMaterial({
      vertexShader: starfieldVert,
      fragmentShader: starfieldFrag,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const points = new THREE.Points(geo, this.starfieldMat);
    points.frustumCulled = false;
    this.scene.add(points);
  }

  private buildNebulae() {
    const defs: { rgb: [number, number, number]; p: [number, number, number]; s: number; o: number }[] =
      [
        { rgb: [124, 58, 237], p: [-30, 12, -38], s: 42, o: 0.14 }, // 紫
        { rgb: [192, 38, 211], p: [34, -8, -30], s: 36, o: 0.11 }, // 品红
        { rgb: [34, 211, 238], p: [10, 20, -44], s: 46, o: 0.1 }, // 青
        { rgb: [56, 90, 200], p: [-24, -18, -26], s: 30, o: 0.09 }, // 蓝
      ];
    for (const d of defs) {
      const tex = makeNebulaTexture(d.rgb);
      this.nebulaTexs.push(tex);
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: d.o,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const spr = new THREE.Sprite(mat);
      spr.position.set(...d.p);
      spr.scale.set(d.s, d.s, 1);
      this.scene.add(spr);
    }
  }

  private buildSystems(reduce: boolean) {
    const metaById = new Map(this.opts.meta.map((m) => [m.id, m]));
    for (const spec of this.opts.systems) {
      const sysGroup = new THREE.Group();
      sysGroup.position.set(...spec.center);
      this.scene.add(sysGroup);

      const sysRT: SystemRT = {
        spec,
        group: sysGroup,
        bodies: [],
        byId: new Map(),
        baryMat: null,
      };

      // 成员顺序由 buildSystems 保证：核心 → 行星 → 卫星（母体必先于卫星）
      for (const body of spec.bodies) {
        const parentRT = body.parentId ? sysRT.byId.get(body.parentId) : undefined;
        const host = parentRT ? parentRT.group : sysGroup;
        const b = this.buildBody(body, metaById.get(body.id), host, reduce);
        sysRT.bodies.push(b);
        sysRT.byId.set(body.id, b);
        this.bodyById.set(body.id, b);

        // 轨道线：核心/行星画在系统空间，卫星画在母体空间（随母体运动）
        if (body.orbit && body.role !== 'lone') {
          host.add(
            this.buildOrbitLine(
              body,
              body.role === 'moon' ? 0.09 : body.role === 'core' ? 0.1 : 0.13,
            ),
          );
        }
        // 运动尾迹：核心与行星（reduceMotion 时跳过）
        if (!reduce && body.orbit && (body.role === 'core' || body.role === 'planet')) {
          this.buildTrail(b, sysGroup);
        }
      }

      // 多星核心：质心辉光
      const cores = spec.bodies.filter((b) => b.role === 'core');
      if (cores.length >= 2) {
        const rSum = cores.reduce((s, c) => s + c.radius, 0);
        const mat = new THREE.SpriteMaterial({
          map: this.glowTex,
          color: new THREE.Color('#bcd6ff'),
          transparent: true,
          opacity: 0.16,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const spr = new THREE.Sprite(mat);
        const s = rSum * 7;
        spr.scale.set(s, s, 1);
        spr.renderOrder = 2;
        sysGroup.add(spr);
        sysRT.baryMat = mat;
      }

      this.systemsRT.push(sysRT);
    }
  }

  private buildBody(
    body: BodySpec,
    meta: SceneBodyMeta | undefined,
    host: THREE.Object3D,
    reduce: boolean,
  ): BodyRT {
    const group = new THREE.Group();
    const baseColor = new THREE.Color(meta?.color ?? '#9fd8ff');
    const phase = (body.id.length * 2.399963) % (Math.PI * 2);

    // 发光球体（白热核心 + 阶段色边缘）
    const sphereMat = new THREE.ShaderMaterial({
      vertexShader: starVert,
      fragmentShader: starFrag,
      uniforms: {
        uColor: { value: baseColor.clone() },
        uBoost: { value: 1 },
        uTime: { value: 0 },
      },
    });
    group.add(new THREE.Mesh(new THREE.SphereGeometry(body.radius, 24, 24), sphereMat));

    // 大气辉光 sprite
    const glowMat = new THREE.SpriteMaterial({
      map: this.glowTex,
      color: baseColor.clone(),
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Sprite(glowMat);
    const gs = body.radius * 5.5;
    glow.scale.set(gs, gs, 1);
    glow.renderOrder = 3;
    group.add(glow);

    // 核心恒星：日冕脉冲（更大更淡的第二层辉光，缓慢呼吸）
    let corona: THREE.Sprite | null = null;
    let coronaMat: THREE.SpriteMaterial | null = null;
    if (body.role === 'core' || body.role === 'lone') {
      coronaMat = new THREE.SpriteMaterial({
        map: this.glowTex,
        color: baseColor.clone().lerp(new THREE.Color('#ffffff'), 0.35),
        transparent: true,
        opacity: 0.22,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      corona = new THREE.Sprite(coronaMat);
      const cs = body.radius * 9;
      corona.scale.set(cs, cs, 1);
      corona.renderOrder = 2;
      group.add(corona);
    }

    // 瞄准环（双环陀螺仪，仅激活时可见）
    const reticle = new THREE.Group();
    const reticleMats: THREE.MeshBasicMaterial[] = [];
    const or = body.radius * 2.4;
    for (let k = 0; k < 2; k++) {
      const om = new THREE.MeshBasicMaterial({
        color: baseColor.clone(),
        transparent: true,
        opacity: 0,
        depthWrite: false,
        side: THREE.DoubleSide,
      });
      reticleMats.push(om);
      const ring = new THREE.Mesh(new THREE.TorusGeometry(or, 0.008, 8, 48), om);
      if (k === 0) ring.rotation.x = Math.PI / 2.4;
      else {
        ring.rotation.x = Math.PI / 2.4;
        ring.rotation.y = Math.PI / 2.8;
      }
      reticle.add(ring);
    }
    reticle.visible = false;
    group.add(reticle);

    // 射线拾取用的隐形命中球（更大，易点）
    const hit = new THREE.Mesh(
      new THREE.SphereGeometry(Math.max(body.radius * 2.4, 0.17), 10, 10),
      new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
    );
    hit.userData.bodyId = body.id;
    group.add(hit);
    this.hitMeshes.push(hit);
    this.hitIds.push(body.id);

    // CSS2D 标签（真实 DOM button，可键盘访问）
    const { onNodeClick, onNodeHover } = this.opts;
    const labelEl = document.createElement('button');
    labelEl.type = 'button';
    labelEl.className = 'sg3-label';
    labelEl.dataset.id = body.id;
    labelEl.setAttribute(
      'aria-label',
      `${meta?.title ?? body.id}（${meta?.designation ?? ''}）`,
    );
    labelEl.innerHTML = `<span class="sg3-label__title"></span><span class="sg3-label__cat"></span>`;
    (labelEl.querySelector('.sg3-label__title') as HTMLElement).textContent =
      meta?.title ?? body.id;
    (labelEl.querySelector('.sg3-label__cat') as HTMLElement).textContent =
      meta?.designation ?? '';
    labelEl.addEventListener('click', (e) => {
      e.stopPropagation();
      onNodeClick(body.id);
    });
    labelEl.addEventListener('mouseenter', () => onNodeHover(body.id));
    labelEl.addEventListener('mouseleave', () => onNodeHover(null));
    labelEl.addEventListener('focus', () => onNodeHover(body.id));
    labelEl.addEventListener('blur', () => onNodeHover(null));
    const label = new CSS2DObject(labelEl);
    const labelBaseY = body.radius * 2.6 + 0.07;
    label.position.set(0, labelBaseY, 0);
    group.add(label);

    // 初始位置：t=0 的轨道位置（避免首帧闪在原点）
    if (body.orbit) {
      const p = new THREE.Vector3();
      orbitalPosition(body.orbit, 0, p);
      group.position.copy(p);
    }

    host.add(group);

    return {
      spec: body,
      group,
      sphereMat,
      glowMat,
      glow,
      corona,
      coronaMat,
      hit,
      labelEl,
      label,
      labelBaseY,
      reticle,
      reticleMats,
      trail: null,
      trailPos: null,
      boost: 1,
      boostT: 1,
      baseColor,
      phase: reduce ? 0 : phase,
    };
  }

  /** 闭合轨道椭圆线（焦点在母体/质心） */
  private buildOrbitLine(body: BodySpec, opacity: number): THREE.LineLoop {
    const pts = orbitEllipsePoints(body.orbit!, body.role === 'moon' ? 64 : 128);
    const geo = new THREE.BufferGeometry().setFromPoints(
      pts.map(([x, y, z]) => new THREE.Vector3(x, y, z)),
    );
    const mat = new THREE.LineBasicMaterial({
      color: new THREE.Color('#6fb3d9'),
      transparent: true,
      opacity,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const line = new THREE.LineLoop(geo, mat);
    line.renderOrder = 1;
    return line;
  }

  /** 运动尾迹：顶点色从头（亮）到尾（黑）渐隐，加色混合下黑即透明 */
  private buildTrail(b: BodyRT, sysGroup: THREE.Group) {
    const trailPos = new Float32Array(TRAIL_N * 3);
    const colors = new Float32Array(TRAIL_N * 3);
    for (let k = 0; k < TRAIL_N; k++) {
      const f = Math.pow(1 - k / (TRAIL_N - 1), 1.6) * 0.85;
      colors[k * 3] = b.baseColor.r * f;
      colors[k * 3 + 1] = b.baseColor.g * f;
      colors[k * 3 + 2] = b.baseColor.b * f;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute(
      'position',
      new THREE.BufferAttribute(trailPos, 3).setUsage(THREE.DynamicDrawUsage),
    );
    geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    const mat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const trail = new THREE.Line(geo, mat);
    trail.frustumCulled = false;
    trail.renderOrder = 1;
    sysGroup.add(trail);
    b.trail = trail;
    b.trailPos = trailPos;
  }

  /* ================= 事件 ================= */

  private onPointerDown = (e: PointerEvent) => {
    // 标签 button 自己处理点击，不进入拖拽
    if ((e.target as HTMLElement).closest('.sg3-label')) return;
    this.dragging = true;
    this.lastPointer = { x: e.clientX, y: e.clientY };
    this.downAt = { x: e.clientX, y: e.clientY };
    this.lastInteract = performance.now();
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  private onPointerMove = (e: PointerEvent) => {
    if (this.dragging) {
      const dx = e.clientX - this.lastPointer.x;
      const dy = e.clientY - this.lastPointer.y;
      this.lastPointer = { x: e.clientX, y: e.clientY };
      this.cam.tgt.ry -= dx * 0.005;
      this.cam.tgt.rx = clamp(this.cam.tgt.rx + dy * 0.005, -RX_LIMIT, RX_LIMIT);
      this.cam.vel.ry = -dx * 0.005;
      this.cam.vel.rx = dy * 0.005;
      this.lastInteract = performance.now();
    } else {
      this.raycastHover(e);
    }
  };

  private onPointerUp = (e: PointerEvent) => {
    const wasDrag =
      Math.hypot(e.clientX - this.downAt.x, e.clientY - this.downAt.y) > 6;
    this.dragging = false;
    this.lastInteract = performance.now();
    if (!wasDrag && !(e.target as HTMLElement).closest('.sg3-label')) {
      const id = this.raycast(e);
      if (id !== null) this.opts.onNodeClick(id);
    }
  };

  private onWheel = (e: WheelEvent) => {
    e.preventDefault();
    this.dolly(e.deltaY < 0 ? 1.12 : 1 / 1.12);
  };

  private bindEvents() {
    const el = this.renderer.domElement;
    el.addEventListener('pointerdown', this.onPointerDown);
    el.addEventListener('pointermove', this.onPointerMove);
    el.addEventListener('pointerup', this.onPointerUp);
    el.addEventListener('wheel', this.onWheel, { passive: false });
    this.ro = new ResizeObserver(() => this.resize());
    this.ro.observe(this.container);
  }

  private setNdc(e: PointerEvent) {
    const r = this.renderer.domElement.getBoundingClientRect();
    this.ndc.set(
      ((e.clientX - r.left) / r.width) * 2 - 1,
      -((e.clientY - r.top) / r.height) * 2 + 1,
    );
  }

  private raycast(e: PointerEvent): string | null {
    this.setNdc(e);
    this.raycaster.setFromCamera(this.ndc, this.camera);
    const hits = this.raycaster.intersectObjects(this.hitMeshes, false);
    if (hits.length === 0) return null;
    return hits[0].object.userData.bodyId as string;
  }

  private raycastHover(e: PointerEvent) {
    const id = this.raycast(e);
    if (id !== this.hovered) {
      this.hovered = id;
      this.opts.onNodeHover(id);
    }
    this.renderer.domElement.style.cursor = id ? 'pointer' : 'grab';
  }

  /* ================= 每帧更新 ================= */

  /** 开普勒运动 + 尾迹 + 日冕脉冲 + 高亮 + 追踪目标 */
  private updateBodies(t: number, dt: number, reduce: boolean) {
    const act = this.hovered ?? this.selected;
    const activeNeighbors = this.neighborSet(act);
    const k = 1 - Math.pow(0.002, dt);

    for (const sys of this.systemsRT) {
      for (const b of sys.bodies) {
        const el = b.spec.orbit;
        // 位置：卫星的 group 挂在母体下，轨道位置天然是母体相对坐标
        if (el) orbitalPosition(el, t, b.group.position);
        else if (b.spec.role === 'lone') {
          // 流浪恒星：缓慢的利萨如漂移
          const p = b.phase;
          b.group.position.set(
            0.35 * Math.sin(t * 0.11 + p),
            0.28 * Math.sin(t * 0.07 + p * 1.7),
            0.35 * Math.cos(t * 0.09 + p * 2.3),
          );
        }

        // 尾迹：沿轨道回溯 TRAIL_ARC 段弧长
        if (b.trail && b.trailPos && el) {
          const step = (el.period * TRAIL_ARC) / (TRAIL_N - 1);
          for (let j = 0; j < TRAIL_N; j++) {
            orbitalPosition(el, t - j * step, this.tmpV);
            b.trailPos[j * 3] = this.tmpV.x;
            b.trailPos[j * 3 + 1] = this.tmpV.y;
            b.trailPos[j * 3 + 2] = this.tmpV.z;
          }
          (b.trail.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
        }

        // 标签悬浮高度按镜头距离缩放：屏幕空间偏移恒定，
        // 追踪推近时标签不会脱离星体，拉远时也不会糊到球面上
        b.label.position.y = b.labelBaseY * (this.cam.cur.dist / HOME.dist);

        // 高亮：激活 1.45 / 邻居 1.1 / 有激活时的其余 0.42 / 无激活 1
        const isActive = act === b.spec.id;
        const isNeighbor = act ? activeNeighbors.has(b.spec.id) : false;
        b.boostT = isActive ? 1.45 : act ? (isNeighbor ? 1.1 : 0.42) : 1;
        b.boost += (b.boostT - b.boost) * k;

        b.sphereMat.uniforms.uBoost.value = b.boost;
        b.sphereMat.uniforms.uTime.value = t;
        b.glowMat.opacity = 0.55 * b.boost * (isActive ? 1.25 : 1);
        const gs = b.spec.radius * 5.5 * (isActive ? 1.35 : 1);
        b.glow.scale.set(gs, gs, 1);

        // 日冕脉冲
        if (b.corona && b.coronaMat) {
          const pulse = reduce ? 0.5 : Math.sin(t * 2.1 + b.phase) * 0.5 + 0.5;
          const cs = b.spec.radius * 9 * (1 + 0.07 * pulse);
          b.corona.scale.set(cs, cs, 1);
          b.coronaMat.opacity = (0.18 + 0.12 * pulse) * b.boost;
        }

        // 瞄准环：激活时显现并旋转
        b.reticle.visible = isActive || b.reticleMats[0].opacity > 0.01;
        const reticleT = isActive ? 0.85 : 0;
        b.reticleMats.forEach((om) => {
          om.opacity += (reticleT - om.opacity) * k;
        });
        if (b.reticle.visible && !reduce) {
          b.reticle.children[0].rotation.z = t * 1.4;
          b.reticle.children[1].rotation.z = -t * 1.1;
        }

        // 标签状态类（CSS 控制明暗/描边）
        b.labelEl.classList.toggle('is-active', isActive);
        b.labelEl.classList.toggle('is-dim', !!act && !isActive && !isNeighbor);
      }

      // 质心辉光呼吸
      if (sys.baryMat) {
        sys.baryMat.opacity = reduce ? 0.16 : 0.14 + 0.05 * Math.sin(t * 1.3);
      }
    }

    // 相机追踪目标：选中星体的实时世界位置 / 系统质心
    const sel = this.selected ? this.bodyById.get(this.selected) : undefined;
    if (sel) sel.group.getWorldPosition(this.camTargetTgt);
    else this.camTargetTgt.set(0, 0, 0);
  }

  private updateCamera(dt: number) {
    const c = this.cam;
    const reduce = this.opts.reduceMotion;
    const now = performance.now();
    // 空闲自转（拖拽/悬停/近期交互时让位）
    const idle =
      now - this.lastInteract > 2600 && !this.dragging && !this.hovered && !this.selected;
    const autoTarget = reduce || !idle ? 0 : AUTO_SPEED;
    c.tgt.ry += autoTarget;

    // 惯性衰减
    if (!this.dragging) {
      c.tgt.ry += c.vel.ry;
      c.tgt.rx += c.vel.rx;
      c.vel.ry *= 0.94;
      c.vel.rx *= 0.94;
      if (Math.abs(c.vel.ry) < 4e-4) c.vel.ry = 0;
      if (Math.abs(c.vel.rx) < 4e-4) c.vel.rx = 0;
    }
    c.tgt.rx = clamp(c.tgt.rx, -RX_LIMIT, RX_LIMIT);

    const k = this.dragging ? 0.4 : 1 - Math.pow(0.0018, dt);
    c.cur.rx += (c.tgt.rx - c.cur.rx) * k;
    c.cur.ry += (c.tgt.ry - c.cur.ry) * k;
    c.cur.dist += (c.tgt.dist - c.cur.dist) * (1 - Math.pow(0.004, dt));

    // 注视点逐帧缓动追踪（选中运动星体时相机随之平移）
    this.camTarget.lerp(
      this.camTargetTgt,
      this.dragging ? 0.2 : 1 - Math.pow(0.002, dt),
    );

    // 球坐标 → 相机位置（rx 仰角 / ry 方位），围绕当前注视点
    const cd = Math.cos(c.cur.rx);
    this.camera.position.set(
      this.camTarget.x + c.cur.dist * cd * Math.sin(c.cur.ry),
      this.camTarget.y + c.cur.dist * Math.sin(c.cur.rx),
      this.camTarget.z + c.cur.dist * cd * Math.cos(c.cur.ry),
    );
    this.camera.lookAt(this.camTarget);

    // 详情面板占据右侧时，把渲染视口左移半个面板宽，使选中恒星落在
    // 可见区中心而非全屏中心。投影矩阵被 WebGL / CSS2D / 射线拾取共用，
    // 三层保持同步。
    this.shift.cur += (this.shift.tgt - this.shift.cur) * (1 - Math.pow(0.004, dt));
    if (Math.abs(this.shift.tgt - this.shift.cur) < 0.3) this.shift.cur = this.shift.tgt;
    if (this.shift.cur > 0.5) {
      const { w, h } = this.view;
      this.camera.setViewOffset(w, h, this.shift.cur, 0, w, h);
    } else {
      this.camera.clearViewOffset();
    }
  }

  private neighborCache: { for: string | null; set: Set<string> } = {
    for: null,
    set: new Set(),
  };
  private neighborSet(id: string | null): Set<string> {
    if (this.neighborCache.for === id) return this.neighborCache.set;
    const set = id ? (this.adj.get(id) ?? new Set<string>()) : new Set<string>();
    this.neighborCache = { for: id, set };
    return set;
  }

  /* ================= 公开 API ================= */

  setHovered(id: string | null) {
    this.hovered = id;
  }

  /** 选中并追踪：镜头推近到 CHASE_DIST，注视点逐帧锁定该星体 */
  setSelected(id: string | null) {
    this.selected = id;
    this.shift.tgt = this.panelShift();
    if (!id) return;
    if (!this.bodyById.has(id)) return;
    this.cam.tgt.dist = CHASE_DIST;
    this.cam.vel.rx = 0;
    this.cam.vel.ry = 0;
    this.lastInteract = performance.now();
  }

  dolly(factor: number) {
    this.cam.tgt.dist = clamp(this.cam.tgt.dist / factor, DIST_MIN, DIST_MAX);
    this.lastInteract = performance.now();
  }

  reset() {
    const twoPi = Math.PI * 2;
    const mod = (a: number) => ((a % twoPi) + twoPi) % twoPi;
    let delta = mod(HOME.ry - mod(this.cam.cur.ry));
    if (delta > Math.PI) delta -= twoPi;
    this.cam.tgt.ry = this.cam.cur.ry + delta;
    this.cam.tgt.rx = HOME.rx;
    this.cam.tgt.dist = HOME.dist;
    this.cam.vel.rx = 0;
    this.cam.vel.ry = 0;
    this.lastInteract = performance.now();
  }

  private resize() {
    const w = this.container.clientWidth || 800;
    const h = this.container.clientHeight || 600;
    this.view = { w, h };
    this.shift.tgt = this.panelShift();
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(w, h, false);
    this.labelRenderer.setSize(w, h);
  }

  /** 有选中且面板实际占据右侧（≥sm 断点、固定 400px）时，返回半个面板宽 */
  private panelShift(): number {
    return this.selected && this.view.w >= PANEL_BREAKPOINT
      ? DETAIL_PANEL_W / 2
      : 0;
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    const el = this.renderer.domElement;
    el.removeEventListener('pointerdown', this.onPointerDown);
    el.removeEventListener('pointermove', this.onPointerMove);
    el.removeEventListener('pointerup', this.onPointerUp);
    el.removeEventListener('wheel', this.onWheel);
    this.ro?.disconnect();

    this.scene.traverse((obj) => {
      const mesh = obj as THREE.Mesh;
      if (mesh.geometry) mesh.geometry.dispose();
      const mat = (mesh as THREE.Mesh).material as THREE.Material | THREE.Material[];
      if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
      else if (mat) mat.dispose();
    });
    this.glowTex.dispose();
    this.nebulaTexs.forEach((t) => t.dispose());
    this.renderer.dispose();
    el.remove();
    this.labelRenderer.domElement.remove();
  }
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));
