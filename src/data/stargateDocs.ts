/**
 * 「星际之门 · 文档宇宙」策展数据 —— 把 edge-ai-docs 技术文档仓库的分类
 * 映射为三个星系：智能座舱 / 通用机器人 / 自动驾驶。
 *
 * 结构镜像 edge-ai-docs/docs.json（三大领域 × general/projects），并额外承载：
 *  - threads：三条贯穿主线（算法训练 / 部署优化 / Agent 框架），用于跨星系虫洞；
 *  - 花园概念原子：数字花园的想法笔记（gardenId 指向 content/garden/*.md）
 *    降格为卫星，环绕语义最贴近的文档星体，保留想法图谱的血肉。
 *
 * docs.json 在独立的 edge-ai-docs 仓库，无法跨仓库 import；此处为策展快照，
 * 只存导航元数据（标题/badge/摘要/标签/外链/主线）。文档正文的唯一信源仍是
 * edge-ai-docs 站点，星门面板通过 url 外链跳转。
 */

/** 贯穿三大领域的能力主线（虫洞切换的分组轴） */
export type ThreadId = 'training' | 'deploy' | 'agent';

/** 星系 id，与 edge-ai-docs 的 category id 一致 */
export type GalaxyId = 'cockpit' | 'robot' | 'ad';

export interface ThreadInfo {
  id: ThreadId;
  name: string;
  /** 主线在虫洞视图中的连线/高亮色 */
  color: string;
}

/** 三条主线：算法训练 / 部署优化 / Agent 框架 */
export const THREADS: ThreadInfo[] = [
  { id: 'training', name: '算法训练', color: '#4ade80' },
  { id: 'deploy', name: '部署优化', color: '#fbbf24' },
  { id: 'agent', name: 'Agent 框架', color: '#a78bfa' },
];

/** edge-ai-docs 站点基址（文档正文唯一信源） */
export const DOCS_BASE = 'https://ranpin.github.io/edge-ai-docs';

/**
 * 星系内的一个星体。
 * 天体角色由 (kind, parentId) 推导：interview → 核心恒星；有 parentId → 卫星；
 * 其余（module / project）→ 行星。
 */
export interface DocBody {
  id: string;
  title: string;
  /** interview 面试指南 / module 知识模块 / project 项目交付 / atom 花园概念原子 */
  kind: 'interview' | 'module' | 'project' | 'atom';
  /** 规模徽标，如 "38 题" / "Part A" / "15 章" */
  badge?: string;
  /** 摘要（详情面板展示，来自 docs.json 的 desc） */
  desc?: string;
  tags?: string[];
  /** 完整文档外链（atom 无，面板渲染花园 markdown） */
  url?: string;
  /** 所属主线（可多条；虫洞切换据此点亮跨星系星体） */
  threads: ThreadId[];
  /** 卫星所绕的母体星 id（无则为行星/核心） */
  parentId?: string;
  /** atom 对应的花园笔记 id（content/garden/<gardenId>.md） */
  gardenId?: string;
}

export interface Galaxy {
  id: GalaxyId;
  name: string;
  /** 星系副题（来自 docs.json 的 note） */
  note: string;
  /** 星系主题色：星云 tint + 核心恒星着色 */
  color: string;
  bodies: DocBody[];
}

/* ---------- 三星系策展数据 ---------- */

export const stargateGalaxies: Galaxy[] = [
  {
    id: 'cockpit',
    name: '智能座舱',
    note: '座舱端侧大模型 · 学习与面试',
    color: '#8a7dff',
    bodies: [
      {
        id: 'interview-cockpit',
        title: '智能座舱面试指南',
        kind: 'interview',
        badge: '38 题',
        desc: '硬件系统、算法训练、部署优化、Agent 大模型、系统设计，38 题，难度分级，交互答题',
        tags: ['面试', '交互答题'],
        url: `${DOCS_BASE}/cockpit/general/interview.html`,
        threads: ['training', 'deploy', 'agent'],
      },
      {
        id: 'hw-cockpit',
        title: '硬件与系统底层',
        kind: 'module',
        badge: 'Part A',
        desc: 'SA8397P SoC 全景、Hexagon DSP 微架构、FastRPC 通信、Hypervisor 多域隔离、SSR 故障恢复',
        tags: ['SA8397P', 'DSP', 'FastRPC'],
        url: `${DOCS_BASE}/cockpit/general/hardware.html`,
        threads: ['deploy'],
      },
      {
        id: 'train-cockpit',
        title: '模型训练与微调',
        kind: 'module',
        badge: 'Part B',
        desc: 'DMS/OMS 数据策略、知识蒸馏、LoRA 微调、SWIFT 训练框架',
        tags: ['LoRA', '蒸馏', 'SWIFT'],
        url: `${DOCS_BASE}/cockpit/general/training.html`,
        threads: ['training'],
      },
      {
        id: 'infer-cockpit',
        title: '推理优化',
        kind: 'module',
        badge: 'Part C',
        desc: '量化 (PTQ/QAT/AIMET)、多核绑定、前缀缓存、投机采样、约束解码、KV Cache 优化',
        tags: ['量化', '投机采样', '约束解码'],
        url: `${DOCS_BASE}/cockpit/general/infer.html`,
        threads: ['deploy'],
      },
      {
        id: 'agent-framework',
        title: '大模型 Agent 框架的研发与应用',
        kind: 'project',
        badge: '2024.03 – 2025.10',
        desc: '座舱端侧 Agent 框架项目：从 QNN 设备部署到 aadkcore 核心、场景 Agent 与调试工具链',
        tags: ['QNN', 'MCP', 'A2A'],
        threads: ['agent', 'deploy'],
      },
      {
        id: 'af-deploy',
        title: '设备部署',
        kind: 'module',
        badge: 'Part D',
        desc: 'QNN 框架、ISP 数据流零拷贝、多模型调度策略、Context Binary',
        tags: ['QNN', 'ISP', '零拷贝'],
        url: `${DOCS_BASE}/cockpit/projects/agent-framework/deploy.html`,
        threads: ['deploy'],
        parentId: 'agent-framework',
      },
      {
        id: 'af-core',
        title: 'aadkcore 核心框架',
        kind: 'module',
        badge: 'Part E1',
        desc: '统一模型接口、模型调度器、多音区对话管理、RAG、MCP 工具协议、A2A 协议、运行时与插件机制',
        tags: ['C++17', 'MCP', 'A2A', 'ModelScheduler'],
        url: `${DOCS_BASE}/cockpit/projects/agent-framework/agent-core.html`,
        threads: ['agent'],
        parentId: 'agent-framework',
      },
      {
        id: 'af-app',
        title: '场景 Agent 应用',
        kind: 'module',
        badge: 'Part E2',
        desc: '车辆控制 Agent (30+ 技能)、主动视觉 Agent、闲聊 Agent、GUI Agent、Prompt 模板工程',
        tags: ['车控', '主动视觉', 'GUI Agent'],
        url: `${DOCS_BASE}/cockpit/projects/agent-framework/agent-group.html`,
        threads: ['agent'],
        parentId: 'agent-framework',
      },
      {
        id: 'af-debug',
        title: '调试与工具链',
        kind: 'module',
        badge: 'Part F',
        desc: 'mini-dm、Snapdragon Profiler、qnn-profile-viewer、排障决策树',
        tags: ['Profiler', '排障'],
        url: `${DOCS_BASE}/cockpit/projects/agent-framework/debug.html`,
        threads: ['deploy'],
        parentId: 'agent-framework',
      },
      // —— 概念原子（花园笔记降格为卫星）——
      {
        id: 'atom-kv-cache',
        title: 'KV Cache',
        kind: 'atom',
        threads: ['deploy'],
        parentId: 'infer-cockpit',
        gardenId: 'kv-cache',
      },
      {
        id: 'atom-quantization',
        title: '量化',
        kind: 'atom',
        threads: ['deploy'],
        parentId: 'infer-cockpit',
        gardenId: 'quantization',
      },
      {
        id: 'atom-latency-budget',
        title: '延迟预算',
        kind: 'atom',
        threads: ['deploy'],
        parentId: 'infer-cockpit',
        gardenId: 'latency-budget',
      },
      {
        id: 'atom-distillation',
        title: '知识蒸馏',
        kind: 'atom',
        threads: ['training'],
        parentId: 'train-cockpit',
        gardenId: 'distillation',
      },
      {
        id: 'atom-vram-budget',
        title: '显存预算',
        kind: 'atom',
        threads: ['deploy'],
        parentId: 'af-deploy',
        gardenId: 'vram-budget',
      },
      {
        id: 'atom-operator-fusion',
        title: '算子融合',
        kind: 'atom',
        threads: ['deploy'],
        parentId: 'af-deploy',
        gardenId: 'operator-fusion',
      },
    ],
  },

  {
    id: 'robot',
    name: '通用机器人',
    note: '具身智能 · 学习与面试',
    color: '#2dd4bf',
    bodies: [
      {
        id: 'interview-robot',
        title: '通用机器人面试指南',
        kind: 'interview',
        badge: '29 题',
        desc: '平台选型、算法训练、部署实时控制、Agent 大模型、系统设计，29 题',
        tags: ['面试', '29 题'],
        url: `${DOCS_BASE}/robot/general/interview.html`,
        threads: ['training', 'deploy', 'agent'],
      },
      {
        id: 'robot-learning',
        title: '通用机器人学习文档',
        kind: 'module',
        badge: '15 章',
        desc: 'Jetson/RK3588 平台、VLA 模型、ROS2 集成、Embodied Agent，15 章 4 Part',
        tags: ['Jetson', 'VLA', 'ROS2'],
        url: `${DOCS_BASE}/robot/projects/edge-deploy/learning.html`,
        threads: ['training', 'deploy', 'agent'],
      },
      {
        id: 'edge-ai',
        title: '端侧 AI',
        kind: 'module',
        desc: '端侧 AI 的总纲：在算力/功耗/延迟约束下把模型跑到设备上，贯穿三大领域',
        threads: ['training', 'deploy', 'agent'],
        gardenId: 'edge-ai',
      },
      {
        id: 'learning-in-public',
        title: '公开学习',
        kind: 'module',
        desc: '把学习过程摊开在阳光下：记录、分享、以输出倒逼输入',
        threads: ['training'],
        gardenId: 'learning-in-public',
      },
    ],
  },

  {
    id: 'ad',
    name: '自动驾驶',
    note: '端到端与 BEV · 学习与面试',
    color: '#fb923c',
    bodies: [
      {
        id: 'interview-ad',
        title: '自动驾驶面试指南',
        kind: 'interview',
        badge: '31 题',
        desc: 'BEV 算法、端到端模型、数据训练、部署优化、驾驶 Agent、系统设计，31 题',
        tags: ['面试', '31 题'],
        url: `${DOCS_BASE}/ad/general/interview.html`,
        threads: ['training', 'deploy', 'agent'],
      },
      {
        id: 'ad-learning',
        title: '自动驾驶学习文档',
        kind: 'module',
        badge: '15 章',
        desc: 'BEV 感知、端到端模型、越野场景、数据飞轮、驾驶 Agent、功能安全，15 章 5 Part',
        tags: ['BEV', '端到端', '功能安全'],
        url: `${DOCS_BASE}/ad/projects/bev/learning.html`,
        threads: ['training'],
      },
      {
        id: 'cosmos-deploy',
        title: 'Cosmos-Reason2-8B · Orin 量化部署实战',
        kind: 'project',
        badge: '实战',
        desc: 'INT4/INT8 量化 → Jetson Orin 端到端跑通推理 → 延迟/吞吐/显存/功耗/能效完整权衡；定位并修复 sm_87 FMHA 崩溃',
        tags: ['INT4/INT8', 'TensorRT-Edge-LLM', 'Jetson Orin', 'FMHA'],
        url: 'https://ranpin.github.io/qwen-trajectory-prediction/',
        threads: ['deploy', 'agent'],
      },
      // —— 概念原子 ——
      {
        id: 'atom-cosmos-reason',
        title: 'Cosmos-Reason',
        kind: 'atom',
        threads: ['deploy', 'agent'],
        parentId: 'cosmos-deploy',
        gardenId: 'cosmos-reason',
      },
      {
        id: 'atom-orin-fmha',
        title: 'Orin FMHA 崩溃',
        kind: 'atom',
        threads: ['deploy'],
        parentId: 'cosmos-deploy',
        gardenId: 'orin-fmha',
      },
      {
        id: 'atom-vlm',
        title: '视觉语言模型',
        kind: 'atom',
        threads: ['training', 'agent'],
        parentId: 'cosmos-deploy',
        gardenId: 'vlm',
      },
    ],
  },
];

/** 按 id 索引全部星体（跨星系），供面板/虫洞快速查找 */
export const docBodyById = new Map<string, DocBody>(
  stargateGalaxies.flatMap((g) => g.bodies.map((b) => [b.id, b] as const)),
);

/** 星体所属星系 id */
export const galaxyOfBody = new Map<string, GalaxyId>(
  stargateGalaxies.flatMap((g) => g.bodies.map((b) => [b.id, g.id] as const)),
);
