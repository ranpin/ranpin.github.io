// 网站内容数据管理文件
// 你可以直接在这里修改所有网站内容,无需修改组件代码

export const personalInfo = {
  name: "陈润斌",
  title: "斑马网络 - 大模型工程框架工程师",
  location: "杭州,中国",
  email: "chenrunbin.crb@alibaba-inc.com",
  avatar: "陈", // 可以是字母或图片URL
  bio: {
    main: "专注于端侧大模型工程化与AI Agent系统开发的软件工程师,具备扎实的大模型推理优化、SDK开发、多模态记忆系统等领域的实践经验。",
    detail: "擅长C++/Python开发,熟悉vLLM、QNN等推理框架,在车机端大模型部署、性能优化、跨团队联调等方面有丰富经验。主导岚图、比亚迪等多个车企项目的技术对接与交付,成功交付多个端侧大模型项目。"
  },
  researchInterests: ["端侧大模型", "AI Agent", "性能优化", "多模态"],
  socialLinks: {
    github: "https://github.com/ranpin",
    linkedin: "",
    scholar: "",
    rss: "/rss.xml"
  }
};

export const recentNews = [
  {
    date: "2026.04",
    content: "🚀 完成岚图基座大模型SDK开发与实车部署,舱内场景完全正确率提升至12/18"
  },
  {
    date: "2026.04", 
    content: "✨ 为比亚迪定制AADK框架,实现多LoRA动态切换机制,支持灵活场景扩展"
  },
  {
    date: "2026.03",
    content: "📱 端侧智能AADK框架正式发布,支持多种Agent场景快速开发和部署"
  }
];

export const projects = [
  {
    id: 1,
    title: "岚图基座大模型SDK开发与联调",
    period: "2026.03 - 2026.04",
    description: "为岚图汽车提供端侧大模型能力,支持舱内遗留物检测、遗留儿童识别、衣着识别、舱外问答等多场景应用",
    tags: ["C++", "Python", "vLLM", "QNN", "GenAI SDK"],
    status: "已交付",
    github: "",
    demo: "",
    abstract: "本项目为岚图汽车打造完整的端侧大模型解决方案,涵盖从SDK架构设计、性能优化到实车部署的全流程。支持舱内遗留物检测、遗留儿童识别、衣着识别、舱外问答等多个核心场景,实现了端到端的高效推理链路。",
    methodology: "采用模块化SDK架构设计,实现数据dump功能(原图、裁图、query、返回结果),采用property配置方式。集成量化模型(0331/0403/0411/0416多个版本),优化图像预处理实现,统一全图识别和裁剪后的图像尺寸标准。",
    results: [
      { metric: "舱内端到端耗时", value: "~4s", baseline: "优化前更长" },
      { metric: "衣着识别耗时", value: "~2s", baseline: "行业平均~5s" },
      { metric: "舱外问答耗时", value: "~6s", baseline: "满足实时性要求" },
      { metric: "遗留物检测正确率", value: "12/18", improvement: "从5/12提升" }
    ],
    achievements: [
      "完成0326/0331/0403/0411/0416多个版本的SDK迭代",
      "舱内遗留物、遗留儿童场景完全正确率从5/12提升到12/18",
      "通过模型替换和图像预处理优化,累计提升推理速度数百毫秒",
      "解决TPS持续下降的性能问题(从40降到6的异常)",
      "成功交付岚图项目,支持实车测试"
    ]
  },
  {
    id: 2,
    title: "比亚迪项目 - AADK多LoRA支持",
    period: "2026.04",
    description: "为比亚迪定制AADK框架,支持单个场景加载多个LoRA模型,根据不同agent_id使用不同的LoRA进行推理",
    tags: ["AADK", "LoRA", "C++", "动态切换"],
    status: "已完成",
    github: "",
    demo: "",
    abstract: "针对比亚迪的业务需求,对AADK框架进行定制化改造,实现多LoRA动态加载和切换机制。该方案显著提升了模型复用效率,支持灵活的场景扩展,为后续业务迭代奠定了坚实基础。",
    methodology: "修改aadkcore代码支持单个场景加载多个LoRA,根据lora_name使用不同的LoRA。修改oai_inference agent代码,支持agent_id的解析与lora_name的映射。创建独立的byd分支,避免与主线代码冲突。",
    results: [
      { metric: "LoRA切换效率", value: "毫秒级", baseline: "传统方式需重新加载" },
      { metric: "模型复用率", value: "显著提升", baseline: "单场景单模型" },
      { metric: "场景扩展灵活性", value: "高", baseline: "基于agent_id映射" }
    ],
    achievements: [
      "实现多LoRA动态切换机制,提升模型复用效率",
      "设计agent_id到lora_name的映射方案,支持灵活的场景扩展",
      "更新设备上部署的agentcore,链路联调成功",
      "协商创建两个新的byd分支,便于后续代码迭代"
    ]
  },
  {
    id: 3,
    title: "端侧智能AADK框架开发",
    period: "2025.12 - 2026",
    description: "开发端侧AI Agent开发框架(AADK),支持多种Agent场景的快速开发和部署",
    tags: ["C++", "设计模式", "异步编程", "Agent框架"],
    status: "持续迭代",
    github: "",
    demo: "",
    abstract: "AADK(Autonomous Agent Development Kit)是一个面向端侧设备的AI Agent开发框架,采用模块化架构设计,支持视频聊天、主动语音、主动视觉、车辆控制、闲聊等多种Agent场景。框架提供统一的消息分发、模型推理和插件化接口,大幅降低Agent开发门槛。",
    methodology: "采用工厂模式和策略模式设计,核心模块包括消息分发中心(MsgDispatcher)、多个专用Agent模块、统一接口(AgentPlugin)和模型运行器(ModelRunner)。所有Agent继承自AgentPlugin基类,实现deliver_msg、scenario_id、clear_memory等标准接口。",
    results: [
      { metric: "支持的Agent类型", value: "5+", baseline: "VideoChat/ProactiveSpeech/ActiveVision/CarControl/Chitchat" },
      { metric: "开发效率", value: "显著提升", baseline: "标准化开发流程" },
      { metric: "代码复用率", value: "高", baseline: "模块化设计" }
    ],
    achievements: [
      "设计并实现模块化Agent架构,符合单一职责原则",
      "开发消息处理工作流: 消息接收 → 消息路由 → Agent内部处理 → 模型推理 → 结果处理",
      "编写Agent开发指南,规范新Agent的开发流程",
      "支持斑马云平台模型调用,实现云端模型接入",
      "实现持久化存储检索支持,增强Agent的记忆能力",
      "补充AADK API文档,完善开发者生态"
    ]
  },
  {
    id: 4,
    title: "端侧多模态记忆方案研究与实践",
    period: "2025",
    description: "研究端侧多模态记忆系统的实现方案,探索MIRIX解析机制和AI Memory技术",
    tags: ["多模态", "记忆系统", "MIRIX", "技术预研"],
    status: "研究中",
    github: "",
    demo: "",
    abstract: "该项目聚焦于端侧多模态记忆系统的技术预研,包括MIRIX-cpp的实现方案研究、业界多模态记忆方案的对比分析、以及AI Memory机制的深入理解。通过原型开发验证关键技术点,为后续产品化奠定基础。",
    methodology: "研究MIRIX解析机制并探索C++实现方案,对比分析业界多模态记忆方案的技术可行性和落地路径,基于调研结果进行原型开发并验证关键技术点,深入理解AI Memory机制并探索端侧实现方案。",
    results: [
      { metric: "技术方案储备", value: "完整", baseline: "覆盖主流方案" },
      { metric: "原型验证", value: "完成", baseline: "关键技术点已验证" },
      { metric: "知识沉淀", value: "系统化", baseline: "形成技术文档" }
    ],
    achievements: [
      "完成MIRIX-cpp预研,掌握解析机制和C++实现方案",
      "对比分析业界多模态记忆方案,评估技术可行性和落地路径",
      "基于调研结果进行原型开发,验证关键技术点",
      "深入理解AI Memory机制,探索端侧实现方案"
    ]
  },
  {
    id: 5,
    title: "9075平台编译发布与车机验证",
    period: "2026",
    description: "负责9075平台的编译发布流程,进行车机端的部署验证和问题排查",
    tags: ["编译发布", "车机部署", "技术支持"],
    status: "已完成",
    github: "",
    demo: "",
    abstract: "该项目负责9075芯片平台的编译发布全流程,包括交叉编译环境搭建、依赖库管理、编译脚本优化等。同时负责车机端的部署验证,协助解决编译和运行时遇到的各类问题,确保系统在真实车机环境中的稳定运行。",
    methodology: "建立标准化的编译发布流程,优化编译脚本和依赖管理,进行车机端的部署验证和性能测试,建立问题定位和解决机制,形成技术文档和最佳实践。",
    results: [
      { metric: "编译成功率", value: "100%", baseline: "稳定可靠" },
      { metric: "部署验证", value: "完成", baseline: "车机环境验证通过" },
      { metric: "问题解决", value: "及时", baseline: "协助解决编译和运行时问题" }
    ],
    achievements: [
      "负责9075平台的编译发布流程,确保编译稳定性",
      "进行车机端的部署验证,保障系统正常运行",
      "协助解决编译和运行时问题,提升团队效率",
      "形成标准化的编译发布流程和文档"
    ]
  }
];

export const publications = [];

export const internships = [
  {
    id: 1,
    company: "斑马网络",
    position: "大模型工程框架工程师", 
    period: "2025.07 - 至今",
    location: "杭州",
    type: "全职",
    department: "斑马智行 - 端智能技术部 - 大模型工程框架",
    description: "负责端侧大模型SDK开发、AI Agent系统架构设计、多模态记忆方案落地等工作,主导岚图、比亚迪等多个车企项目的技术对接与交付。",
    responsibilities: "主导端侧大模型SDK的架构设计与开发,负责性能优化和实车部署联调。开发AADK框架支持多种Agent场景,推动多模态记忆方案的技术预研。与算法、量化、测试、车企等多团队紧密协作,确保项目顺利交付。",
    achievements: [
      "成功交付岚图汽车大模型项目,支持遗留物检测、遗留儿童识别、衣着识别、舱外问答等多个场景",
      "完成比亚迪AADK定制化开发,实现多LoRA动态切换机制",
      "建立AADK框架,支持多种Agent场景快速开发,编写开发指南和API文档",
      "通过模型替换、图像预处理优化等手段,累计提升推理速度数百毫秒",
      "解决TPS持续下降的性能问题,保障系统稳定性",
      "沉淀岚图联调经验,形成标准化测试流程"
    ],
    skills: ["C++", "Python", "vLLM", "QNN", "GenAI SDK", "LoRA", "AADK", "多模态"],
    skillsGained: [
      {
        name: "端侧大模型工程化",
        description: "掌握从SDK设计、性能优化到实车部署的全流程能力"
      },
      {
        name: "Agent框架开发",
        description: "具备模块化系统设计和消息路由机制的开发经验"
      },
      {
        name: "跨团队协作",
        description: "能够有效推动算法、量化、测试、车企等多团队协作"
      }
    ],
    summary: "在斑马网络的工作让我深入理解了端侧大模型工程化的完整链路,从底层推理优化到上层Agent架构设计,积累了丰富的实战经验。通过与多个车企的合作,我学会了如何在复杂的业务场景中平衡性能、成本和用户体验。",
    projectImage: "",
    resultsImage: ""
  }
];

export const honors = [
  { id: 1, year: "2026", award: "岚图项目成功交付", organization: "斑马网络" },
  { id: 2, year: "2026", award: "比亚迪项目技术突破", organization: "斑马网络" },
  { id: 3, year: "2026", award: "AADK框架正式发布", organization: "斑马网络" }
];

export const academicBlogs = [
  {
    id: 1,
    title: "端侧大模型推理优化实践",
    date: "2026.04.15",
    category: "性能优化",
    summary: "分享在岚图项目中积累的端侧大模型推理优化经验,包括模型量化、图像预处理、TPS优化等关键技术点。",
    tags: ["vLLM", "QNN", "性能优化", "端侧部署"],
    readTime: "15分钟",
    content: "在端侧大模型部署中,性能优化是核心挑战。本文从实际项目出发,详细分析了模型量化、图像预处理、内存管理等优化手段,分享了如何将端到端耗时从初始版本优化至4秒以内的实战经验。"
  },
  {
    id: 2,
    title: "AADK框架架构设计思路",
    date: "2026.03.20",
    category: "系统架构",
    summary: "深入解析AADK框架的设计理念,包括消息分发机制、Agent插件化、模型运行器等核心模块的设计思路。",
    tags: ["AADK", "Agent框架", "设计模式", "C++"],
    readTime: "18分钟",
    content: "AADK框架采用模块化架构设计,通过消息分发中心实现场景路由,通过AgentPlugin接口实现插件化扩展。本文详细介绍了框架的核心设计思路和实现细节。"
  },
  {
    id: 3,
    title: "多LoRA动态切换机制实现",
    date: "2026.04.10",
    category: "模型优化",
    summary: "介绍在比亚迪项目中实现的多LoRA动态切换机制,探讨如何在不重新加载模型的情况下实现场景间的快速切换。",
    tags: ["LoRA", "动态切换", "模型复用", "AADK"],
    readTime: "12分钟",
    content: "多LoRA动态切换是提升模型复用效率的关键技术。本文介绍了如何通过修改aadkcore和oai_inference agent代码,实现基于agent_id的LoRA动态加载和切换。"
  },
  {
    id: 4,
    title: "车机端大模型部署踩坑指南",
    date: "2026.03.25",
    category: "工程实践",
    summary: "总结在岚图实车部署过程中遇到的各类问题和解决方案,包括crash排查、性能监控、OTA升级等。",
    tags: ["车机部署", "问题排查", "实车测试", "OTA"],
    readTime: "20分钟",
    content: "车机端部署面临着复杂的硬件环境和严格的稳定性要求。本文总结了在岚图项目中遇到的典型问题及其解决方案,为后续项目提供参考。"
  },
  {
    id: 5,
    title: "多模态记忆系统技术调研",
    date: "2025.12.15",
    category: "技术预研",
    summary: "对比分析业界多模态记忆方案,探讨MIRIX解析机制和AI Memory在端侧的实现路径。",
    tags: ["多模态", "记忆系统", "MIRIX", "AI Memory"],
    readTime: "22分钟",
    content: "多模态记忆系统是提升Agent智能水平的关键技术。本文调研了业界主流方案,分析了技术可行性和落地路径,为后续产品化奠定基础。"
  }
];

export const engineeringBlogs = [
  {
    id: 1,
    title: "vLLM在端侧的适配与优化",
    date: "2026.04.05", 
    category: "推理框架",
    summary: "分享vLLM推理框架在端侧设备上的适配经验,包括QNN后端集成、量化模型支持、性能调优等。",
    tags: ["vLLM", "QNN", "端侧推理", "量化"],
    readTime: "16分钟",
    content: "vLLM作为主流的大模型推理框架,在端侧设备上需要进行针对性适配。本文介绍了如何将vLLM与QNN后端集成,支持量化模型,并进行性能调优。"
  },
  {
    id: 2,
    title: "C++ SDK设计规范与实践",
    date: "2026.03.30",
    category: "软件开发",
    summary: "总结在岚图SDK开发中积累的C++设计规范,包括接口设计、错误处理、日志记录、数据dump等。",
    tags: ["C++", "SDK设计", "接口规范", "工程实践"],
    readTime: "14分钟",
    content: "高质量的SDK需要良好的接口设计和完善的错误处理机制。本文分享了在岚图项目中积累的C++ SDK设计经验和最佳实践。"
  },
  {
    id: 3,
    title: "跨团队协作的技术对接技巧",
    date: "2026.04.01",
    category: "团队协作",
    summary: "分享在与算法、量化、测试、车企等多团队协作过程中的经验,包括沟通技巧、文档规范、问题反馈机制等。",
    tags: ["跨团队协作", "技术对接", "沟通技巧", "项目管理"],
    readTime: "10分钟",
    content: "复杂项目往往涉及多个团队的协作。本文总结了在岚图和比亚迪项目中积累的跨团队协作经验,帮助提升协作效率。"
  },
  {
    id: 4,
    title: "Git分支管理策略在车企项目中的应用",
    date: "2026.04.08",
    category: "版本控制",
    summary: "介绍在比亚迪项目中采用的Git分支管理策略,包括主线分支、定制分支的隔离与合并策略。",
    tags: ["Git", "分支管理", "版本控制", "代码管理"],
    readTime: "8分钟",
    content: "在多客户并行开发的项目中,合理的分支管理策略至关重要。本文介绍了如何通过创建独立的定制分支来避免代码冲突。"
  },
  {
    id: 5,
    title: "实车环境调试方法论",
    date: "2026.03.28",
    category: "调试技巧",
    summary: "总结在岚图实车调试过程中形成的方法论,包括日志收集、问题复现、根因分析、解决方案验证等步骤。",
    tags: ["实车调试", "问题排查", "日志分析", "调试方法"],
    readTime: "12分钟",
    content: "实车环境调试面临着资源受限、复现困难等挑战。本文总结了在岚图项目中形成的系统化调试方法论。"
  }
];

// 统计数据
export const stats = {
  projects: 5,
  papers: 0, 
  openSource: 0,
  stars: 0
};
