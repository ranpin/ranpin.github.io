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
  atmosphereVert,
  atmosphereFrag,
  makeGlowTexture,
  rawSrgbColor,
} from './shaders';
import { TextureBaker, surfaceStyleFor } from './planetTextures';
import {
  orbitalPosition,
  orbitEllipsePoints,
  hashId,
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
  /** 恒星：自发光等离子体着色器（行星为 null） */
  sphereMat: THREE.ShaderMaterial | null;
  /** 行星：物理光照材质 + 烘焙地表贴图（恒星为 null） */
  stdMat: THREE.MeshStandardMaterial | null;
  /** 自转网格（行星；挂在倾斜容器内） */
  spinMesh: THREE.Mesh | null;
  cloudMesh: THREE.Mesh | null;
  atmoMat: THREE.ShaderMaterial | null;
  spinSpeed: number;
  /** 熔岩裂纹的基础自发光强度（0 = 无） */
  baseEmissive: number;
  glowMat: THREE.SpriteMaterial;
  glow: THREE.Sprite;
  /** 辉光基础不透明度（恒星浓 / 行星淡） */
  glowBase: number;
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
  /** 星云天空盒组：每帧位置同步到相机，保证任意轨道方位都有彩雾景深 */
  private nebulaGroup!: THREE.Group;
  /** GPU 贴图烘焙器（行星地表 / 云层 / 星云 / 银河带，持有全部 render target） */
  private baker: TextureBaker;

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
  private tmpV2 = new THREE.Vector3();
  private tmpV3 = new THREE.Vector3();
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
    // 物理光照管线：ACES 色调映射让行星的日照面/夜半球过渡更电影感；
    // 自定义着色器（恒星/星海/大气）不含 tonemapping chunk，亮度不受影响
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    const canvas = this.renderer.domElement;
    canvas.className = 'sg3-canvas';
    this.container.appendChild(canvas);

    this.labelRenderer = new CSS2DRenderer();
    const labelDom = this.labelRenderer.domElement;
    labelDom.className = 'sg3-labels';
    this.container.appendChild(labelDom);

    this.camera = new THREE.PerspectiveCamera(FOV, 1, 0.1, 200);

    // 冷色环境光：行星夜半球保留微弱可见度（不至于死黑）
    this.scene.add(new THREE.AmbientLight('#3a4f6f', 0.7));
    this.baker = new TextureBaker(this.renderer);
    this.glowTex = makeGlowTexture();
    this.buildStarfield();
    this.buildNebulae();
    this.buildSystems(reduce);

    // TEMP-DEBUG: 星云渲染排查用，提交前删除
    (window as unknown as Record<string, unknown>).__stargate = this;

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
      // 天空盒跟随相机（位置 + 朝向）：星云始终贴在视野外围球壳上，
      // 任意轨道方位都保证有彩雾景深；远景星场（世界坐标 Points）提供 3D 视差。
      this.nebulaGroup.position.copy(this.camera.position);
      this.nebulaGroup.quaternion.copy(this.camera.quaternion);
      if (this.starfieldMat) this.starfieldMat.uniforms.uTime.value = tSim;
      this.renderer.render(this.scene, this.camera);
      this.labelRenderer.render(this.scene, this.camera);
    };
    this.raf = requestAnimationFrame(frame);
  }

  /* ================= 构建 ================= */

  private buildStarfield() {
    const palette: [number, number, number][] = [
      [0.83, 0.9, 1.0], // 冷白
      [0.59, 0.78, 1.0], // 淡蓝
      [1.0, 0.89, 0.7], // 暖金
      [0.78, 0.67, 1.0], // 淡紫
      [1.0, 0.72, 0.5], // 橙红
    ];
    let seed = 0x5a7f21;
    const rnd = () => {
      seed |= 0;
      seed = (seed + 0x6d2b79f5) | 0;
      let x = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
      return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
    };
    const makeLayer = (
      count: number,
      rMin: number,
      rMax: number,
      sMin: number,
      sMax: number,
      dim: number,
    ): THREE.Points => {
      const pos = new Float32Array(count * 3);
      const col = new Float32Array(count * 3);
      const size = new Float32Array(count);
      const phase = new Float32Array(count);
      for (let i = 0; i < count; i++) {
        // 均匀球壳
        const r = rMin + rnd() * (rMax - rMin);
        const th = rnd() * Math.PI * 2;
        const ph = Math.acos(2 * rnd() - 1);
        pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
        pos[i * 3 + 1] = r * Math.cos(ph);
        pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
        const c = palette[rnd() < 0.58 ? 0 : rnd() < 0.5 ? 1 : rnd() < 0.62 ? 2 : rnd() < 0.72 ? 3 : 4];
        col[i * 3] = c[0] * dim;
        col[i * 3 + 1] = c[1] * dim;
        col[i * 3 + 2] = c[2] * dim;
        size[i] = sMin + rnd() * (sMax - sMin);
        phase[i] = rnd();
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('aColor', new THREE.BufferAttribute(col, 3));
      geo.setAttribute('aSize', new THREE.BufferAttribute(size, 1));
      geo.setAttribute('aPhase', new THREE.BufferAttribute(phase, 1));
      const points = new THREE.Points(geo, this.starfieldMat!);
      points.frustumCulled = false;
      return points;
    };

    this.starfieldMat = new THREE.ShaderMaterial({
      vertexShader: starfieldVert,
      fragmentShader: starfieldFrag,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    // 近层亮星（闪烁明显）+ 远层暗星（景深感），共享同一材质
    this.scene.add(makeLayer(2600, 25, 60, 0.3, 1.15, 1));
    this.scene.add(makeLayer(3200, 55, 95, 0.12, 0.36, 0.72));
  }

  private buildNebulae() {
    // 天空盒组：每帧同步相机位置 + 朝向，子级坐标即"相机空间"
    // （local -z 恒为视线方向），因此可以把星云精确贴到视野外围，
    // 任意轨道方位都保证外围有彩雾景深。
    this.nebulaGroup = new THREE.Group();
    this.scene.add(this.nebulaGroup);

    // 5 张 GPU 烘焙的 fBm 星云贴图（双色混合 + 丝缕结构）。
    // 烘焙次数固定为 5（+1 银河带），保证 baker 后续行星 RT 索引稳定。
    // 色相按"类似色相邻"排布（青→青蓝→品红，琥珀→绿→回到青），
    // 避免近互补色（如品红↔青）紧邻——加色混合下互补色叠加会冲淡成白，
    // 吞掉弱色相；类似色叠加仍保持饱和，各色相才能各自显色。
    const palettes: { a: string; b: string; seed: number }[] = [
      { a: '#22d3ee', b: '#0ea5e9', seed: 43.1 }, // 亮青 → 天蓝（k=0，0°）
      { a: '#2dd4bf', b: '#3b82f6', seed: 11.3 }, // 青 → 蓝（k=1，36°）
      { a: '#e879f9', b: '#c026d3', seed: 27.8 }, // 品红（k=2，72°，双色相 ~292°、高饱和）
      { a: '#fbbf24', b: '#f97316', seed: 58.6 }, // 琥珀 → 橙（k=3，288°）
      { a: '#34d399', b: '#14b8a6', seed: 71.2 }, // 翠绿 → 碧青（k=4，324°）
    ];
    const texs = palettes.map((p) =>
      this.baker.bakeNebula(this.renderer, p.a, p.b, p.seed),
    );

    const addSprite = (
      tex: THREE.Texture,
      x: number,
      y: number,
      z: number,
      s: number,
      o: number,
      rot: number,
    ) => {
      const mat = new THREE.SpriteMaterial({
        map: tex,
        transparent: true,
        opacity: o,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        rotation: rot,
        // 背景装饰绕过 ACES：暗色在色调映射里会被压到不可见，直出 sRGB 保住彩雾
        toneMapped: false,
      });
      const spr = new THREE.Sprite(mat);
      spr.position.set(x, y, z);
      spr.scale.set(s, s, 1);
      spr.frustumCulled = false;
      this.nebulaGroup.add(spr);
    };

    // 外围彩雾环：5 对镜像星云沿视野外围椭圆（相机空间 x 半轴 38 / y 半轴 18，z=-50）。
    // 每对在 (x,y) 与 (-x,y) 各放一团——同贴图（已水平对称）、同参数、旋转互为镜像，
    // 因此整环严格左右平衡，背景重心不偏斜；5 色相循环 → 外围青/品红/亮青/琥珀/翠俱全。
    const baseAng = [0, 36, 72, 288, 324]; // 右半 5 个基准角（度），镜像覆盖全环
    // 逐色相配平：冷色（青/青蓝）饱和度高、加色下极易显色，给低不透明度；
    // 品红/翠绿饱和度低、琥珀偏暖，需更高不透明度才能与冷色分庭抗礼。
    // 尺寸刻意收小（≈相邻间距），让每团保有不被邻居冲淡的饱和核心——
    // 团太大则核心互相重叠，加色混合把弱色相洗成白/青。
    const pairO = [0.24, 0.26, 0.40, 0.34, 0.38]; // k=0..4：亮青/青蓝/品红/琥珀/翠绿
    const pairS = [30, 30, 30, 32, 30];
    for (let k = 0; k < baseAng.length; k++) {
      const ang = (baseAng[k] * Math.PI) / 180;
      const x = Math.cos(ang) * 38;
      const y = Math.sin(ang) * 18;
      const z = -50 + (k % 3) * 4; // -50 / -46 / -42 错落景深
      const s = pairS[k];
      const o = pairO[k];
      const rot = (k * 1.3) % Math.PI;
      const tex = texs[k % texs.length];
      addSprite(tex, x, y, z, s, o, rot);
      addSprite(tex, -x, y, z, s, o, -rot); // 镜像对：保证左右平衡
    }

    // 银河带：横贯远景的暗弱光带（暖核 → 冷缘）。
    // 必须保持水平（rotation=0）：贴图已水平对称，水平放置时银河带关于屏幕竖直
    // 中线严格镜像，与镜像星云环加色叠加后整体亮度左右平衡；一旦倾斜，带心会在
    // 左右两侧穿过不同不透明度的星云团，加色非线性会把亮结推到一侧、拉偏画面重心。
    const bandTex = this.baker.bakeBand(this.renderer, '#f5d0a9', '#7aa5d8');
    const bandMat = new THREE.SpriteMaterial({
      map: bandTex,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      rotation: 0,
      toneMapped: false,
    });
    const band = new THREE.Sprite(bandMat);
    band.position.set(0, 4, -62);
    band.scale.set(150, 42, 1);
    band.frustumCulled = false;
    this.nebulaGroup.add(band);
  }

  private buildSystems(reduce: boolean) {
    const metaById = new Map(this.opts.meta.map((m) => [m.id, m]));
    for (const spec of this.opts.systems) {
      const sysGroup = new THREE.Group();
      sysGroup.position.set(...spec.center);
      this.scene.add(sysGroup);

      // 质心点光源：行星的昼夜晨昏线朝向恒星系中心（decay=1 缓和距离衰减，
      // 外行星稍暗但依然可见，符合"离恒星越远越暗"的直觉）
      const sunLight = new THREE.PointLight('#fff2e0', 7.5, 0, 1);
      sysGroup.add(sunLight);

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
              body.role === 'moon' ? 0.11 : body.role === 'core' ? 0.13 : 0.16,
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
          opacity: 0.2,
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
    const isStar = body.role === 'core' || body.role === 'lone';

    let sphereMat: THREE.ShaderMaterial | null = null;
    let stdMat: THREE.MeshStandardMaterial | null = null;
    let spinMesh: THREE.Mesh | null = null;
    let cloudMesh: THREE.Mesh | null = null;
    let atmoMat: THREE.ShaderMaterial | null = null;
    let spinSpeed = 0;
    let baseEmissive = 0;
    const glowBase = isStar ? 0.55 : 0.3;

    const sphereGeo = new THREE.SphereGeometry(body.radius, 48, 32);
    if (isStar) {
      // 恒星：自发光等离子体（fBm 翻涌 + 白热核心 + 阶段色边缘）
      sphereMat = new THREE.ShaderMaterial({
        vertexShader: starVert,
        fragmentShader: starFrag,
        uniforms: {
          uColor: { value: baseColor.clone() },
          uBoost: { value: 1 },
          uTime: { value: 0 },
          uSeed: { value: (phase * 7.13) % 10 },
        },
      });
      group.add(new THREE.Mesh(sphereGeo, sphereMat));
    } else {
      // 行星/卫星：烘焙地表 + 物理光照（昼夜来自质心点光源）
      const style = surfaceStyleFor(body.id);
      const maps = this.baker.bakePlanetMaps(this.renderer, body.id, style);
      stdMat = new THREE.MeshStandardMaterial({
        map: maps.map,
        roughness: style.roughness,
        metalness: 0,
        emissive: new THREE.Color(style.emissive ?? '#000000'),
        emissiveIntensity: style.emissive ? 1.5 : 0,
        // 仅在确有自发光贴图时传该键，避免 THREE 对 undefined 参数告警
        ...(maps.emissiveMap ? { emissiveMap: maps.emissiveMap } : {}),
      });
      baseEmissive = style.emissive ? 1.5 : 0;

      // 自转：倾斜容器 + 内部网格绕 Y 旋转（标签在 group 层不受影响）
      const h = hashId(body.id);
      const tilt = new THREE.Group();
      tilt.rotation.z = (((h % 1000) / 1000) - 0.5) * 0.6;
      spinMesh = new THREE.Mesh(sphereGeo, stdMat);
      tilt.add(spinMesh);
      group.add(tilt);
      spinSpeed =
        (((hashId(`${body.id}::spin`) % 1000) / 1000) * 0.22 + 0.06) *
        (hashId(`${body.id}::dir`) % 2 === 0 ? 1 : -1);

      // 云层：独立球壳，转速略快于地表
      if (style.clouds) {
        const cloudTex = this.baker.bakeClouds(this.renderer, body.id);
        const cloudMat = new THREE.MeshStandardMaterial({
          map: cloudTex,
          transparent: true,
          depthWrite: false,
          roughness: 1,
          metalness: 0,
        });
        cloudMesh = new THREE.Mesh(
          new THREE.SphereGeometry(body.radius * 1.025, 48, 32),
          cloudMat,
        );
        cloudMesh.renderOrder = 1;
        tilt.add(cloudMesh);
      }

      // 大气层：BackSide 菲涅尔辉光壳，昼半球一侧更亮
      if (style.atmosphere) {
        atmoMat = new THREE.ShaderMaterial({
          vertexShader: atmosphereVert,
          fragmentShader: atmosphereFrag,
          uniforms: {
            uColor: { value: rawSrgbColor(style.atmosphere.color) },
            uIntensity: { value: style.atmosphere.intensity },
            uBoost: { value: 1 },
            uLightDir: { value: new THREE.Vector3(1, 0, 0) },
          },
          side: THREE.BackSide,
          transparent: true,
          depthWrite: false,
          blending: THREE.AdditiveBlending,
        });
        const shell = new THREE.Mesh(
          new THREE.SphereGeometry(body.radius * 1.16, 48, 32),
          atmoMat,
        );
        shell.renderOrder = 2;
        group.add(shell);
      }
    }

    // 大气辉光 sprite（行星收敛为淡光环，恒星保持浓辉光）
    const glowMat = new THREE.SpriteMaterial({
      map: this.glowTex,
      color: baseColor.clone(),
      transparent: true,
      opacity: glowBase,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const glow = new THREE.Sprite(glowMat);
    const gs = body.radius * (isStar ? 5.5 : 3.6);
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
        opacity: 0.26,
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
      stdMat,
      spinMesh,
      cloudMesh,
      atmoMat,
      spinSpeed,
      baseEmissive,
      glowMat,
      glow,
      glowBase,
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
      const f = Math.pow(1 - k / (TRAIL_N - 1), 1.6);
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

        if (b.sphereMat) {
          // 恒星：等离子体流动 + 提亮
          b.sphereMat.uniforms.uBoost.value = b.boost;
          b.sphereMat.uniforms.uTime.value = t;
        } else if (b.stdMat) {
          // 行星：自转（云层稍快）+ 高亮/压暗反馈
          if (!reduce) {
            if (b.spinMesh) b.spinMesh.rotation.y += b.spinSpeed * dt;
            if (b.cloudMesh) b.cloudMesh.rotation.y += b.spinSpeed * 1.65 * dt;
          }
          b.stdMat.color.setScalar(b.boost);
          if (b.baseEmissive > 0) {
            // 熔岩裂纹：选中时夜半球流光更盛
            b.stdMat.emissiveIntensity =
              b.baseEmissive * (0.7 + 0.5 * b.boost) * (isActive ? 1.3 : 1);
          }
          if (b.atmoMat) {
            // 大气层昼半球朝向系统质心（光源方向逐帧更新）
            b.group.getWorldPosition(this.tmpV2);
            sys.group.getWorldPosition(this.tmpV3);
            this.tmpV3.sub(this.tmpV2).normalize();
            b.atmoMat.uniforms.uLightDir.value.copy(this.tmpV3);
            b.atmoMat.uniforms.uBoost.value = b.boost * (isActive ? 1.5 : 1);
          }
        }
        b.glowMat.opacity = b.glowBase * b.boost * (isActive ? 1.25 : 1);
        const gs =
          b.spec.radius * (b.sphereMat ? 5.5 : 3.6) * (isActive ? 1.35 : 1);
        b.glow.scale.set(gs, gs, 1);

        // 日冕脉冲
        if (b.corona && b.coronaMat) {
          const pulse = reduce ? 0.5 : Math.sin(t * 2.1 + b.phase) * 0.5 + 0.5;
          const cs = b.spec.radius * 9 * (1 + 0.07 * pulse);
          b.corona.scale.set(cs, cs, 1);
          b.coronaMat.opacity = (0.22 + 0.14 * pulse) * b.boost;
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
        sys.baryMat.opacity = reduce ? 0.2 : 0.18 + 0.06 * Math.sin(t * 1.3);
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
    // 烘焙器持有全部 render target（地表/云层/星云/银河带贴图），统一释放
    this.baker.dispose();
    this.renderer.dispose();
    el.remove();
    this.labelRenderer.domElement.remove();
  }
}

const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));
