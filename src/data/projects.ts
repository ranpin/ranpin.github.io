// 首页项目总览 —— 内容与排版直接采用 GitHub 主页 ranpin/ranpin 的 profile README。
// 单一事实源：https://github.com/ranpin/ranpin/blob/main/README.md
// 有在线 demo / 展示页的项目额外附 demo 链接（README 顶部放 demo 链接的惯例）。

export interface HomeProject {
  name: string;
  url: string;
  desc: string;
  /** 在线 demo / Pages 展示页（可选） */
  demo?: string;
}

export interface HomeCategory {
  emoji: string;
  title: string;
  note?: string;
  projects: HomeProject[];
}

export const homeIntro = {
  greeting: 'Hi 👋 我是 ranpin，端侧 AI 工程师。',
  focus: '关注方向：智能机器人 / 具身智能、自动驾驶、智能座舱。',
  tech: '关注技术：Agent Harness · VLA 与世界模型 · 压缩与量化 · 边缘部署（Jetson Orin / 高通8x97 / NPU）。',
  links: [
    { emoji: '🏠', label: '个人主页', url: 'https://ranpin.github.io/' },
    {
      emoji: '📚',
      label: '端侧 AI 技术文档',
      url: 'https://ranpin.github.io/edge-ai-docs/',
    },
  ],
};

export const homeCategories: HomeCategory[] = [
  {
    emoji: '🧰',
    title: '工具 / 作品',
    note: '做点可能无用但有意思的',
    projects: [
      {
        name: 'openResume',
        url: 'https://github.com/ranpin/openResume',
        desc: '在线简历中心',
        demo: 'https://ranpin.github.io/openResume/',
      },
      {
        name: 'easter-egg-map',
        url: 'https://github.com/ranpin/easter-egg-map',
        desc: '旅行彩蛋 UGC 平台',
      },
      {
        name: 'MagicEye',
        url: 'https://github.com/ranpin/MagicEye',
        desc: '手势 + AI 魔法交互（微信小程序）',
      },
    ],
  },
  {
    emoji: '🤖',
    title: '智能机器人 / 具身智能',
    note: '学习研究中',
    projects: [
      {
        name: 'alpamayo-edge',
        url: 'https://github.com/ranpin/alpamayo-edge',
        desc: 'NVIDIA Physical AI（Alpamayo 1.5 VLA + Cosmos3-Edge WAM）在 Jetson Orin 的量化部署 · INT4/INT8 · Orin 实测 · VLA 轨迹推理',
        demo: 'https://ranpin.github.io/alpamayo-edge/',
      },
      {
        name: 'homebot-wm',
        url: 'https://github.com/ranpin/homebot-wm',
        desc: '世界模型驱动的家用机器人轻量算法框架 · 扩散策略压缩（DDIM+INT8）· Push-T 闭环评测',
        demo: 'https://ranpin.github.io/homebot-wm/',
      },
      {
        name: 'spring-festival-dance-robot',
        url: 'https://github.com/ranpin/spring-festival-dance-robot',
        desc: '视频 → 9 台 Unitree G1 机器人同步起舞',
        demo: 'https://ranpin.github.io/spring-festival-dance-robot/',
      },
    ],
  },
  {
    emoji: '🚗',
    title: '智能座舱',
    note: '主要工作 2025.07-至今',
    projects: [
      {
        name: 'inforExtra',
        url: 'https://github.com/ranpin/inforExtra',
        desc: '车载座舱人员/身份/座位信息提取（laya 类型化决策替代巨型 prompt）',
        demo: 'https://ranpin.github.io/inforExtra/',
      },
      {
        name: 'mirix-cpp',
        url: 'https://github.com/ranpin/mirix-cpp',
        desc: '多模态交互记忆系统（C++）',
      },
      {
        name: 'aadkMemory',
        url: 'https://github.com/ranpin/aadkMemory',
        desc: 'FAISS 对话记忆检索',
      },
      {
        name: 'chat_huanhuan',
        url: 'https://github.com/ranpin/chat_huanhuan',
        desc: '甄嬛传角色对话系统（Ollama + MCP）',
      },
    ],
  },
  {
    emoji: '🛣️',
    title: '自动驾驶',
    note: '读研期间 2022.09–2025.06',
    projects: [
      {
        name: 'cam2label',
        url: 'https://github.com/ranpin/cam2label',
        desc: 'Grad-CAM 热力图自动生成旋转框标注',
      },
      {
        name: 'offroad-judge-suite',
        url: 'https://github.com/ranpin/offroad-judge-suite',
        desc: '越野挑战赛多传感器评测基础设施（2023）',
      },
      {
        name: 'Resnet50_TensorRT',
        url: 'https://github.com/ranpin/Resnet50_TensorRT',
        desc: 'ResNet50 TensorRT 部署（fork）',
      },
    ],
  },
  {
    emoji: '🎓',
    title: '本科项目',
    note: '2017.09-2021.06',
    projects: [
      {
        name: 'agriculturalScience',
        url: 'https://github.com/ranpin/agriculturalScience',
        desc: '智慧e农 / 土圈后台管理系统（Java EE + BeX5 移动端，存档）',
      },
      {
        name: 'musicPlayer',
        url: 'https://github.com/ranpin/musicPlayer',
        desc: '仿网易云音乐播放器（Vue 2）',
      },
      {
        name: 'ptaCode',
        url: 'https://github.com/ranpin/ptaCode',
        desc: 'PTA 习题练习',
      },
      {
        name: 'JavaTiku',
        url: 'https://github.com/ranpin/JavaTiku',
        desc: '《Java2 实用教程》配套练习题库程序（Java Swing）',
      },
    ],
  },
];
