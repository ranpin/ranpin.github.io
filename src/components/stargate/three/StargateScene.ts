/**
 * 星际之门 three.js 场景管理器（纯 three，无 React 依赖）。
 *
 * 负责：WebGL 渲染 + CSS2D 标签层、星门圆环（能量环 + 9 个 chevron + 事件视界）、
 * 想法恒星（发光球体 + 辉光 + 瞄准环 + 可点击标签）、星座连线、背景星海与星云、
 * 自定义轨道相机（拖拽旋转带惯性 / 滚轮推拉 / 空闲自转 / 选中 fly-to）、射线拾取。
 *
 * React 侧（DigitalGarden）通过回调接收 hover/click，通过公开方法驱动相机与高亮。
 * 仅在客户端且确认支持 WebGL 后由 React 构造（见 DigitalGarden 的 supportsWebGL）。
 */
import * as THREE from 'three';
import {
  CSS2DRenderer,
  CSS2DObject,
} from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import {
  starVert,
  starFrag,
  horizonVert,
  horizonFrag,
  ringVert,
  ringFrag,
  starfieldVert,
  starfieldFrag,
  makeGlowTexture,
  makeNebulaTexture,
} from './shaders';

export interface SceneNode {
  id: string;
  title: string;
  designation: string;
  color: string;
  /** 球体半径（世界单位），由连接度决定 */
  radius: number;
  position: [number, number, number];
}

export interface StargateSceneOptions {
  container: HTMLElement;
  nodes: SceneNode[];
  edges: { a: number; b: number }[];
  reduceMotion: boolean;
  onNodeClick: (id: string) => void;
  onNodeHover: (id: string | null) => void;
}

/* ---------- 相机与布局常量 ---------- */
const FOV = 55;
const DIST_MIN = 2.8;
const DIST_MAX = 10.5;
const HOME = { rx: 0.18, ry: 0.52, dist: 4.7 };
const RX_LIMIT = 1.15;
const AUTO_SPEED = 0.00034; // 空闲自转 rad/帧
const NODE_SCALE = 1.65; // 力导向单位球 → 世界单位：星图是主角，要撑满画面中心

/* 星门几何：圆环是"画框"，半径大于星图，事件视界退居为背景 */
const RING_RADIUS = 2.55;
const TORUS_TUBE = 0.055;
const HORIZON_RADIUS = 2.42;
const CHEVRON_COUNT = 9;

/* 详情面板布局（与 DigitalGarden 的 sm:w-[400px] / Tailwind sm 断点保持一致）：
   面板打开时渲染视口需左移半个面板宽，让选中恒星落在"可见区"中心 */
const DETAIL_PANEL_W = 400;
const PANEL_BREAKPOINT = 640;

interface NodeRT {
  id: string;
  group: THREE.Group;
  sphereMat: THREE.ShaderMaterial;
  glowMat: THREE.SpriteMaterial;
  glow: THREE.Sprite;
  hit: THREE.Mesh;
  labelEl: HTMLButtonElement;
  orbit: THREE.Group;
  orbitMats: THREE.MeshBasicMaterial[];
  radius: number;
  boost: number;
  boostT: number;
  baseColor: THREE.Color;
}

interface EdgeRT {
  mat: THREE.LineBasicMaterial;
  a: number;
  b: number;
  opacity: number;
  opacityT: number;
}

export class StargateScene {
  private renderer: THREE.WebGLRenderer;
  private labelRenderer: CSS2DRenderer;
  private scene = new THREE.Scene();
  private camera: THREE.PerspectiveCamera;
  private container: HTMLElement;
  private opts: StargateSceneOptions;

  private nodesRT: NodeRT[] = [];
  private edgesRT: EdgeRT[] = [];
  private hitMeshes: THREE.Mesh[] = [];
  private idToIndex = new Map<string, number>();

  private ringGroup = new THREE.Group();
  private glyphBand: THREE.Mesh | null = null;
  private chevrons: THREE.Mesh[] = [];
  private chevronMats: THREE.MeshBasicMaterial[] = [];
  private horizonMat: THREE.ShaderMaterial | null = null;
  private ringMat: THREE.ShaderMaterial | null = null;
  private starfieldMat: THREE.ShaderMaterial | null = null;

  private glowTex: THREE.CanvasTexture;
  private nebulaTexs: THREE.CanvasTexture[] = [];

  private cam = {
    cur: { rx: HOME.rx + 0.5, ry: HOME.ry - 1.3, dist: 11.5 },
    tgt: { ...HOME },
    vel: { rx: 0, ry: 0 },
  };
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
  private timer = new THREE.Timer();
  private raf = 0;
  private ro: ResizeObserver | null = null;
  private disposed = false;

  constructor(opts: StargateSceneOptions) {
    this.opts = opts;
    this.container = opts.container;
    const reduce = opts.reduceMotion;
    if (reduce) Object.assign(this.cam.cur, this.cam.tgt);

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
    this.buildRing();
    this.buildNodes();
    this.buildEdges();

    this.resize();
    this.bindEvents();

    /* ---------- 动画循环 ---------- */
    const frame = (ts: number) => {
      if (this.disposed) return;
      this.raf = requestAnimationFrame(frame);
      this.timer.update(ts);
      const dt = Math.min(this.timer.getDelta(), 0.05);
      const t = this.timer.getElapsed();
      this.updateCamera(dt);
      this.updateRing(t, reduce);
      this.updateNodes(t, dt, reduce);
      this.updateEdges(t);
      if (this.starfieldMat) this.starfieldMat.uniforms.uTime.value = t;
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

  private buildRing() {
    // 主能量环：流动辉光 shader
    this.ringMat = new THREE.ShaderMaterial({
      vertexShader: ringVert,
      fragmentShader: ringFrag,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: new THREE.Color('#3ec7e8') },
      },
    });
    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(RING_RADIUS, TORUS_TUBE, 24, 140),
      this.ringMat,
    );
    this.ringGroup.add(torus);

    // 内圈符号带：缓慢自转的细环（代表可旋转的内环）
    const bandMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#1b5e7a'),
      transparent: true,
      opacity: 0.85,
    });
    this.glyphBand = new THREE.Mesh(
      new THREE.TorusGeometry(RING_RADIUS - 0.16, 0.028, 12, 120),
      bandMat,
    );
    this.ringGroup.add(this.glyphBand);

    // 9 个 chevron：环形分布，逐个"锁定"脉冲
    const chevGeo = new THREE.BoxGeometry(0.09, 0.22, 0.13);
    for (let i = 0; i < CHEVRON_COUNT; i++) {
      const a = (i / CHEVRON_COUNT) * Math.PI * 2 + Math.PI / 2;
      const mat = new THREE.MeshBasicMaterial({ color: new THREE.Color('#8a5a1f') });
      const m = new THREE.Mesh(chevGeo, mat);
      const rr = RING_RADIUS + TORUS_TUBE + 0.07;
      m.position.set(Math.cos(a) * rr, Math.sin(a) * rr, 0);
      m.rotation.z = a - Math.PI / 2;
      this.chevrons.push(m);
      this.chevronMats.push(mat);
      this.ringGroup.add(m);
    }

    // 事件视界（蓝色漩涡水洼）
    this.horizonMat = new THREE.ShaderMaterial({
      vertexShader: horizonVert,
      fragmentShader: horizonFrag,
      uniforms: { uTime: { value: 0 } },
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
    });
    const horizon = new THREE.Mesh(
      new THREE.CircleGeometry(HORIZON_RADIUS, 72),
      this.horizonMat,
    );
    horizon.renderOrder = 1;
    this.ringGroup.add(horizon);

    // 轻微倾斜，避免完全正对相机，增强立体感
    this.ringGroup.rotation.x = 0.14;
    this.ringGroup.rotation.y = -0.06;
    this.scene.add(this.ringGroup);
  }

  private buildNodes() {
    const { nodes, onNodeClick, onNodeHover } = this.opts;
    nodes.forEach((n, i) => {
      const group = new THREE.Group();
      group.position.set(
        n.position[0] * NODE_SCALE,
        n.position[1] * NODE_SCALE,
        n.position[2] * NODE_SCALE,
      );

      const baseColor = new THREE.Color(n.color);

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
      const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(n.radius, 24, 24),
        sphereMat,
      );
      group.add(sphere);

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
      const gs = n.radius * 5.5;
      glow.scale.set(gs, gs, 1);
      glow.renderOrder = 3;
      group.add(glow);

      // 瞄准环（双环陀螺仪，仅激活时可见）
      const orbit = new THREE.Group();
      const orbitMats: THREE.MeshBasicMaterial[] = [];
      const or = n.radius * 2.4;
      for (let k = 0; k < 2; k++) {
        const om = new THREE.MeshBasicMaterial({
          color: baseColor.clone(),
          transparent: true,
          opacity: 0,
          depthWrite: false,
          side: THREE.DoubleSide,
        });
        orbitMats.push(om);
        const ring = new THREE.Mesh(new THREE.TorusGeometry(or, 0.008, 8, 48), om);
        if (k === 0) ring.rotation.x = Math.PI / 2.4;
        else {
          ring.rotation.x = Math.PI / 2.4;
          ring.rotation.y = Math.PI / 2.8;
        }
        orbit.add(ring);
      }
      orbit.visible = false;
      group.add(orbit);

      // 射线拾取用的隐形命中球（更大，易点）
      const hit = new THREE.Mesh(
        new THREE.SphereGeometry(Math.max(n.radius * 2.4, 0.17), 10, 10),
        new THREE.MeshBasicMaterial({ transparent: true, opacity: 0, depthWrite: false }),
      );
      hit.userData.nodeIndex = i;
      group.add(hit);
      this.hitMeshes.push(hit);

      // CSS2D 标签（真实 DOM button，可键盘访问）
      const labelEl = document.createElement('button');
      labelEl.type = 'button';
      labelEl.className = 'sg3-label';
      labelEl.dataset.id = n.id;
      labelEl.setAttribute('aria-label', `${n.title}（${n.designation}）`);
      labelEl.innerHTML = `<span class="sg3-label__title"></span><span class="sg3-label__cat"></span>`;
      (labelEl.querySelector('.sg3-label__title') as HTMLElement).textContent = n.title;
      (labelEl.querySelector('.sg3-label__cat') as HTMLElement).textContent =
        n.designation;
      labelEl.addEventListener('click', (e) => {
        e.stopPropagation();
        onNodeClick(n.id);
      });
      labelEl.addEventListener('mouseenter', () => onNodeHover(n.id));
      labelEl.addEventListener('mouseleave', () => onNodeHover(null));
      labelEl.addEventListener('focus', () => onNodeHover(n.id));
      labelEl.addEventListener('blur', () => onNodeHover(null));
      const label = new CSS2DObject(labelEl);
      label.position.set(0, n.radius * 2.6 + 0.07, 0);
      group.add(label);

      this.scene.add(group);
      this.nodesRT.push({
        id: n.id,
        group,
        sphereMat,
        glowMat,
        glow,
        hit,
        labelEl,
        orbit,
        orbitMats,
        radius: n.radius,
        boost: 1,
        boostT: 1,
        baseColor,
      });
      this.idToIndex.set(n.id, i);
    });
  }

  private buildEdges() {
    const { nodes, edges } = this.opts;
    for (const e of edges) {
      const a = nodes[e.a].position;
      const b = nodes[e.b].position;
      const geo = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(a[0] * NODE_SCALE, a[1] * NODE_SCALE, a[2] * NODE_SCALE),
        new THREE.Vector3(b[0] * NODE_SCALE, b[1] * NODE_SCALE, b[2] * NODE_SCALE),
      ]);
      const mat = new THREE.LineBasicMaterial({
        color: new THREE.Color('#4a7fb5'),
        transparent: true,
        opacity: 0.3,
        depthWrite: false,
      });
      const line = new THREE.Line(geo, mat);
      line.renderOrder = 2;
      this.scene.add(line);
      this.edgesRT.push({ mat, a: e.a, b: e.b, opacity: 0.3, opacityT: 0.3 });
    }
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
      const hit = this.raycast(e);
      if (hit !== null) this.opts.onNodeClick(this.opts.nodes[hit].id);
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

  private raycast(e: PointerEvent): number | null {
    this.setNdc(e);
    this.raycaster.setFromCamera(this.ndc, this.camera);
    const hits = this.raycaster.intersectObjects(this.hitMeshes, false);
    if (hits.length === 0) return null;
    return hits[0].object.userData.nodeIndex as number;
  }

  private raycastHover(e: PointerEvent) {
    const idx = this.raycast(e);
    const id = idx === null ? null : this.opts.nodes[idx].id;
    if (id !== this.hovered) {
      this.hovered = id;
      this.opts.onNodeHover(id);
    }
    this.renderer.domElement.style.cursor = id ? 'pointer' : 'grab';
  }

  /* ================= 每帧更新 ================= */

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

    // 球坐标 → 相机位置（rx 仰角 / ry 方位）
    const cd = Math.cos(c.cur.rx);
    this.camera.position.set(
      c.cur.dist * cd * Math.sin(c.cur.ry),
      c.cur.dist * Math.sin(c.cur.rx),
      c.cur.dist * cd * Math.cos(c.cur.ry),
    );
    this.camera.lookAt(0, 0, 0);

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

  private updateRing(t: number, reduce: boolean) {
    if (this.ringMat) this.ringMat.uniforms.uTime.value = t;
    if (this.horizonMat) this.horizonMat.uniforms.uTime.value = reduce ? 0 : t;
    // 内环缓慢自转
    if (this.glyphBand && !reduce) this.glyphBand.rotation.z = t * 0.12;
    // chevron 循环"锁定"脉冲
    const active = reduce ? -1 : Math.floor(t / 0.9) % CHEVRON_COUNT;
    const dim = new THREE.Color('#6b4a1c');
    const lit = new THREE.Color('#ffc861');
    this.chevronMats.forEach((m, i) => {
      const pulse =
        i === active ? 0.75 + 0.25 * Math.sin(t * 8) : i === (active + 8) % CHEVRON_COUNT ? 0.35 : 0;
      m.color.copy(dim).lerp(lit, pulse);
    });
  }

  private updateNodes(t: number, dt: number, reduce: boolean) {
    const act = this.hovered ?? this.selected;
    const activeIdx = act ? this.idToIndex.get(act) ?? -1 : -1;
    const activeNeighbors = this.neighborSet(act);

    const k = 1 - Math.pow(0.002, dt);
    this.nodesRT.forEach((n, i) => {
      const isActive = i === activeIdx;
      const isNeighbor = act ? activeNeighbors.has(n.id) : false;
      // 目标亮度：激活 1.45 / 邻居 1.1 / 有激活时的其余 0.42 / 无激活 1
      n.boostT = isActive ? 1.45 : act ? (isNeighbor ? 1.1 : 0.42) : 1;
      n.boost += (n.boostT - n.boost) * k;

      n.sphereMat.uniforms.uBoost.value = n.boost;
      n.sphereMat.uniforms.uTime.value = t;
      n.glowMat.opacity = 0.55 * n.boost * (isActive ? 1.25 : 1);
      const gs = n.radius * 5.5 * (isActive ? 1.35 : 1);
      n.glow.scale.set(gs, gs, 1);

      // 瞄准环：激活时显现并旋转
      const showOrbit = isActive;
      n.orbit.visible = showOrbit || n.orbitMats[0].opacity > 0.01;
      const orbitT = showOrbit ? 0.85 : 0;
      n.orbitMats.forEach((om) => {
        om.opacity += (orbitT - om.opacity) * k;
      });
      if (n.orbit.visible && !reduce) {
        n.orbit.children[0].rotation.z = t * 1.4;
        n.orbit.children[1].rotation.z = -t * 1.1;
      }

      // 标签状态类（CSS 控制明暗/描边）
      n.labelEl.classList.toggle('is-active', isActive);
      n.labelEl.classList.toggle('is-dim', !!act && !isActive && !isNeighbor);
    });
  }

  private neighborCache: { for: string | null; set: Set<string> } = {
    for: null,
    set: new Set(),
  };
  private neighborSet(id: string | null): Set<string> {
    if (this.neighborCache.for === id) return this.neighborCache.set;
    const set = new Set<string>();
    if (id) {
      const { nodes, edges } = this.opts;
      const idx = this.idToIndex.get(id) ?? -1;
      edges.forEach((e) => {
        if (e.a === idx) set.add(nodes[e.b].id);
        if (e.b === idx) set.add(nodes[e.a].id);
      });
    }
    this.neighborCache = { for: id, set };
    return set;
  }

  private updateEdges(t: number) {
    const act = this.hovered ?? this.selected;
    const actIdx = act ? this.idToIndex.get(act) ?? -1 : -1;
    const k = 0.12;
    this.edgesRT.forEach((e, i) => {
      const lit = actIdx !== -1 && (e.a === actIdx || e.b === actIdx);
      const breathe = 0.85 + 0.15 * Math.sin(t * 1.3 + i);
      e.opacityT = act ? (lit ? 0.9 : 0.07) : 0.3 * breathe;
      e.opacity += (e.opacityT - e.opacity) * k;
      e.mat.opacity = e.opacity;
      e.mat.color.set(lit ? '#8fe5ff' : '#4a7fb5');
    });
  }

  /* ================= 公开 API ================= */

  setHovered(id: string | null) {
    this.hovered = id;
  }

  /** 选中并 fly-to：把相机转向节点方向并适度推近 */
  setSelected(id: string | null) {
    this.selected = id;
    this.shift.tgt = this.panelShift();
    if (!id) return;
    const idx = this.idToIndex.get(id);
    if (idx === undefined) return;
    const p = this.nodesRT[idx].group.position;
    const len = Math.hypot(p.x, p.y, p.z) || 1;
    const targetRy = Math.atan2(p.x, p.z);
    const targetRx = clamp(Math.asin(p.y / len) * 0.7, -RX_LIMIT, RX_LIMIT);
    // 取与当前朝向最近的等价角，避免倒转多圈
    const twoPi = Math.PI * 2;
    const mod = (a: number) => ((a % twoPi) + twoPi) % twoPi;
    let delta = mod(targetRy - mod(this.cam.cur.ry));
    if (delta > Math.PI) delta -= twoPi;
    this.cam.tgt.ry = this.cam.cur.ry + delta;
    this.cam.tgt.rx = targetRx;
    this.cam.tgt.dist = 3.4;
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
