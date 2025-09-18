// 网站内容数据管理文件
// 你可以直接在这里修改所有网站内容，无需修改组件代码

export const personalInfo = {
  name: "张博士",
  title: "清华大学计算机系",
  location: "北京，中国",
  email: "zhang@example.edu",
  avatar: "A", // 可以是字母或图片URL
  bio: {
    main: "我是一名专注于机器学习和分布式系统的研究者，致力于探索人工智能技术的前沿应用。在深度学习、计算机视觉、自然语言处理等领域有着丰富的研究经验，已发表多篇高质量学术论文，并在工业界有着成功的项目实践经验。",
    detail: "我的研究兴趣包括神经网络架构设计、分布式机器学习系统、以及AI在实际场景中的应用。目前专注于大规模深度学习模型的训练优化和部署，以及跨模态学习等前沿方向。在顶级会议如ICCV、SOSP、KDD等发表论文，总引用数超过1500次。"
  },
  researchInterests: ["机器学习", "深度学习", "视觉", "NLP"],
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    scholar: "https://scholar.google.com/citations?user=yourid",
    rss: "/rss.xml"
  }
};

export const recentNews = [
  {
    date: "2024.03",
    content: "🎉 论文《基于注意力机制的图像识别优化》被ICCV 2024接收"
  },
  {
    date: "2024.02", 
    content: "🚀 开源项目HybridRaft获得500+ GitHub Stars"
  },
  {
    date: "2024.01",
    content: "📱 移动学习应用正式上线，累计下载量突破10万"
  }
];

export const projects = [
  {
    id: 1,
    title: "基于深度学习的图像识别系统",
    period: "2024.01 - 2024.03",
    description: "采用卷积神经网络构建高精度图像识别系统，在CIFAR-10数据集上达到95.2%准确率",
    tags: ["深度学习", "计算机视觉", "Python"],
    status: "已完成",
    github: "https://github.com/example/image-recognition",
    demo: "https://demo.example.com",
    abstract: "本项目提出了一种新颖的卷积神经网络架构，通过引入注意力机制和残差连接，显著提升了图像识别的准确率。在多个标准数据集上进行了广泛的实验验证，结果表明该方法在保持计算效率的同时，达到了state-of-the-art的性能。",
    methodology: "基于ResNet架构，集成了通道注意力和空间注意力机制。网络采用多尺度特征融合策略，能够更好地捕获图像中的细节信息。训练过程中使用了数据增强、标签平滑等技术来提升模型的泛化能力。",
    results: [
      { dataset: "CIFAR-10", accuracy: "95.2%", improvement: "+2.1%" },
      { dataset: "CIFAR-100", accuracy: "78.9%", improvement: "+1.8%" },
      { dataset: "ImageNet", accuracy: "82.3%", improvement: "+1.2%" }
    ],
    achievements: [
      "在CIFAR-10数据集上达到95.2%的准确率",
      "相比基线模型提升2.1%的性能", 
      "模型参数量减少30%，推理速度提升40%",
      "开源代码获得200+ GitHub Stars"
    ]
  },
  // 可以继续添加更多项目...
];

export const publications = [
  {
    id: 1,
    title: "Deep Residual Learning for Image Recognition with Attention Mechanism",
    authors: "张博士, 李教授, 王研究员",
    venue: "ICCV 2024",
    citations: "201398",
    year: "2024",
    type: "会议论文",
    abstract: "本文提出了一种结合注意力机制的深度残差网络架构，在图像识别任务上取得了显著的性能提升。",
    fullAbstract: "深度学习在计算机视觉领域取得了巨大成功，但现有方法在处理复杂场景时仍存在局限性。本文提出了一种新颖的深度残差网络架构，通过引入双重注意力机制来增强特征表示能力。",
    methodology: "我们的方法基于ResNet架构，在每个残差块中集成了注意力模块。通道注意力模块通过全局平均池化和全连接层学习通道权重，空间注意力模块则通过卷积操作学习空间权重。",
    results: [
      { dataset: "CIFAR-10", accuracy: "96.8%", baseline: "94.7%" },
      { dataset: "CIFAR-100", accuracy: "82.1%", baseline: "78.9%" },
      { dataset: "ImageNet", accuracy: "78.2%", baseline: "76.1%" }
    ],
    contributions: [
      "提出了双重注意力机制的深度残差网络架构",
      "设计了高效的注意力模块融合策略",
      "在多个数据集上验证了方法的有效性",
      "分析了注意力机制对不同类型特征的影响"
    ]
  },
  // 可以继续添加更多论文...
];

export const internships = [
  {
    id: 1,
    company: "Google Research",
    position: "机器学习研究实习生", 
    period: "2023.06 - 2023.09",
    location: "加州山景城",
    type: "实习",
    department: "AI研究部",
    description: "参与大规模机器学习系统的研发，专注于分布式训练算法优化。与团队合作开发了新的梯度压缩技术，显著提升了训练效率。负责设计和实现新的优化算法，并在多个内部项目中验证其有效性。",
    responsibilities: "主要负责分布式机器学习算法的研究与开发，包括梯度压缩、模型并行化、以及大规模训练系统的优化。参与团队的技术讨论，协助导师完成多个研究项目，并负责实验结果的分析和报告撰写。",
    achievements: [
      "提出新的梯度压缩算法，训练速度提升40%，内存使用减少30%",
      "在内部技术分享会上做主题演讲，获得团队一致好评", 
      "获得实习生优秀表现奖，并收到全职工作邀请",
      "协助发表顶级会议论文1篇，专利申请2项"
    ],
    skills: ["深度学习", "分布式系统", "Python", "TensorFlow", "CUDA"],
    skillsGained: [
      {
        name: "分布式训练",
        description: "掌握大规模分布式机器学习系统的设计与优化"
      },
      {
        name: "算法优化",
        description: "深入理解梯度压缩和模型并行化技术"
      },
      {
        name: "团队协作",
        description: "在国际化团队中的沟通协作能力"
      }
    ],
    summary: "在Google Research的实习经历让我深入了解了前沿的机器学习研究，不仅在技术上有了显著提升，更重要的是学会了如何在顶级研究团队中进行高质量的科研工作。",
    projectImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop",
    resultsImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop"
  },
  {
    id: 2,
    company: "微软亚洲研究院",
    position: "算法工程师实习生",
    period: "2023.01 - 2023.05",
    location: "北京",
    type: "实习",
    department: "自然语言处理组",
    description: "负责自然语言处理模型的优化和部署，参与了多个产品级项目的开发。主要工作包括模型压缩、推理加速和系统集成，为Office产品线提供AI能力支持。",
    responsibilities: "参与大规模语言模型的工程化部署，负责模型压缩、量化和推理优化。与产品团队紧密合作，将研究成果转化为实际的产品功能。同时负责性能测试、系统集成和技术文档编写。",
    achievements: [
      "模型推理速度提升60%，内存占用减少40%，显著改善用户体验",
      "参与开发的智能写作功能已集成到Office产品中，服务千万用户",
      "发表内部技术报告2篇，获得团队技术创新奖",
      "优化的模型部署方案被采纳为团队标准流程"
    ],
    skills: ["自然语言处理", "模型优化", "Python", "PyTorch", "ONNX", "Docker"],
    skillsGained: [
      {
        name: "模型工程化",
        description: "从研究原型到产品部署的完整流程"
      },
      {
        name: "性能优化",
        description: "深度学习模型的推理加速和内存优化"
      },
      {
        name: "产品思维",
        description: "理解用户需求，将技术转化为产品价值"
      }
    ],
    summary: "在微软的实习让我体验了从研究到产品的完整流程，学会了如何将前沿技术转化为实际的产品功能，这段经历极大地提升了我的工程实践能力。",
    projectImage: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    demoVideo: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  },
  {
    id: 3,
    company: "阿里巴巴集团",
    position: "高级算法工程师",
    period: "2024.01 - 至今",
    location: "杭州",
    type: "全职",
    department: "达摩院机器智能技术实验室",
    description: "负责推荐系统和搜索算法的研发工作，专注于大规模机器学习系统的设计与优化。参与多个核心业务的算法升级，显著提升了用户体验和业务指标。",
    responsibilities: "主导推荐算法的设计与实现，负责大规模特征工程和模型训练。与业务团队合作进行A/B测试，持续优化算法效果。同时负责新人培养和技术分享，推动团队技术水平提升。",
    achievements: [
      "设计的新推荐算法使CTR提升15%，GMV增长8%",
      "主导的搜索算法优化项目获得集团技术创新奖",
      "培养实习生3名，其中2名获得优秀实习生称号",
      "在顶级会议发表论文2篇，申请专利5项"
    ],
    skills: ["推荐系统", "搜索算法", "大数据", "Spark", "Flink", "Java", "Python"],
    skillsGained: [
      {
        name: "业务理解",
        description: "深入理解电商业务，将技术与商业价值结合"
      },
      {
        name: "系统设计",
        description: "大规模分布式系统的架构设计能力"
      },
      {
        name: "团队管理",
        description: "技术团队的管理和人才培养经验"
      }
    ],
    summary: "在阿里巴巴的工作让我从一个研究者转变为工程师和技术领导者，不仅在技术深度上有了提升，更重要的是学会了如何在复杂的商业环境中发挥技术的价值。",
    projectImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=400&fit=crop",
    resultsImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=400&fit=crop"
  }
];

export const honors = [
  { id: 1, year: "2024", award: "ICCV 2024 最佳论文奖", organization: "国际计算机视觉会议" },
  { id: 2, year: "2024", award: "KDD 2024 最佳应用论文奖", organization: "ACM SIGKDD" },
  { id: 3, year: "2023", award: "优秀青年学者奖", organization: "中国计算机学会" },
  { id: 4, year: "2023", award: "技术创新奖", organization: "IEEE计算机学会" },
  { id: 5, year: "2022", award: "国家奖学金", organization: "教育部" }
];

export const academicBlogs = [
  {
    id: 1,
    title: "Transformer架构深度解析",
    date: "2024.03.15",
    category: "深度学习",
    summary: "深入研究了Transformer架构的核心机制，包括自注意力机制、位置编码、多头注意力等关键组件。通过理论分析和实验验证，总结了Transformer在不同任务上的应用策略。",
    tags: ["Transformer", "注意力机制", "NLP"],
    readTime: "15分钟",
    content: "Transformer架构自2017年提出以来，已经成为自然语言处理领域的主流架构。本文从数学原理出发，详细分析了自注意力机制的计算过程，探讨了位置编码的设计思路，并通过实验对比了不同变体的性能表现。"
  },
  // 可以继续添加更多学术博客...
];

export const engineeringBlogs = [
  {
    id: 4,
    title: "Kubernetes集群优化实践",
    date: "2024.03.20", 
    category: "容器编排",
    summary: "分享了在生产环境中优化Kubernetes集群性能的实践经验，包括资源调度、网络配置、存储优化等方面的技术要点。",
    tags: ["Kubernetes", "容器", "DevOps"],
    readTime: "12分钟",
    content: "在大规模容器化部署中，Kubernetes集群的性能优化至关重要。本文基于实际项目经验，总结了集群资源调度策略、网络插件选择、存储卷优化等关键技术点，为运维团队提供实用的优化指南。"
  },
  // 可以继续添加更多工程博客...
];

// 统计数据
export const stats = {
  projects: 15,
  papers: 8, 
  openSource: 12,
  stars: 2300
};
