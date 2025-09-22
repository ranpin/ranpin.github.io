import React from 'react';

const ArticleList = ({ onArticleClick, projects, onEditProject, onDeleteProject, isAdminMode }) => {
  // 确保projects是数组，如果没有传入projects或为空，使用默认数据
  const projectList = (projects && Array.isArray(projects) && projects.length > 0) ? projects : [
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
    {
      id: 2,
      title: "分布式系统一致性算法优化",
      period: "2023.09 - 2024.01",
      description: "提出混合一致性算法HybridRaft，结合Raft简洁性和PBFT拜占庭容错能力",
      tags: ["分布式系统", "一致性算法", "Go"],
      status: "论文发表",
      paper: "https://arxiv.org/example",
      github: "https://github.com/example/hybridraft",
      abstract: "分布式系统中的一致性问题一直是研究热点。本项目提出了一种新的混合一致性算法HybridRaft，结合了Raft算法的简洁性和PBFT算法的拜占庭容错能力。通过理论分析和实验验证，证明了该算法在各种网络环境下的优越性能。",
      methodology: "HybridRaft算法采用分层设计，在正常情况下使用Raft协议保证效率，在检测到拜占庭故障时自动切换到PBFT模式。设计了一套完整的故障检测和恢复机制，确保系统的可靠性和可用性。",
      results: [
        { metric: "吞吐量", value: "15,000 TPS", improvement: "+35%" },
        { metric: "延迟", value: "12ms", improvement: "-28%" },
        { metric: "容错能力", value: "33% 拜占庭节点", improvement: "新增" }
      ],
      achievements: [
        "论文被SOSP 2024会议接收",
        "算法吞吐量提升35%，延迟降低28%",
        "支持33%拜占庭节点容错",
        "开源实现被多个项目采用"
      ]
    },
    {
      id: 3,
      title: "跨平台移动学习应用",
      period: "2023.06 - 2023.12",
      description: "使用React Native开发移动学习应用，集成视频播放、在线测试、进度跟踪功能",
      tags: ["React Native", "移动开发", "Node.js"],
      status: "已上线",
      github: "https://github.com/example/learning-app",
      demo: "https://apps.apple.com/example",
      abstract: "本项目开发了一款功能完整的移动学习应用，支持iOS和Android双平台。应用采用现代化的UI设计，提供流畅的用户体验。核心功能包括课程浏览、视频学习、在线测试、学习进度跟踪等。",
      methodology: "技术栈选择React Native作为主要开发框架，使用Redux进行状态管理，集成了视频播放、推送通知、数据同步等功能模块。后端采用Node.js + MongoDB架构，提供RESTful API服务。",
      features: [
        "跨平台兼容：支持iOS和Android",
        "视频学习：支持在线和离线播放",
        "智能测试：自适应题目推荐",
        "进度跟踪：详细的学习数据分析",
        "社交功能：学习小组和讨论区"
      ],
      achievements: [
        "App Store和Google Play双平台上线",
        "累计下载量超过10万次",
        "用户平均使用时长45分钟",
        "获得4.8分用户评价"
      ]
    },
    {
      id: 4,
      title: "金融风控机器学习系统",
      period: "2023.03 - 2023.08",
      description: "构建信用评分模型，使用集成学习算法实现高精度风险预测，AUC达到0.87",
      tags: ["机器学习", "金融科技", "Python"],
      status: "生产部署",
      paper: "https://example.com/paper.pdf",
      abstract: "金融风控是机器学习的重要应用领域。本项目构建了一套完整的信用评分系统，通过多种机器学习算法的集成，实现了高精度的信用风险预测。系统已在实际业务中部署，取得了显著的经济效益。",
      methodology: "采用了特征工程、模型集成、在线学习等技术。首先通过专家知识和统计分析构建特征体系，然后使用随机森林、XGBoost、神经网络等算法训练基础模型，最后通过Stacking方法进行模型融合。",
      results: [
        { metric: "AUC", value: "0.87", benchmark: "0.82" },
        { metric: "精确率", value: "85.3%", benchmark: "78.9%" },
        { metric: "召回率", value: "79.6%", benchmark: "74.2%" }
      ],
      achievements: [
        "模型AUC达到0.87，超越基线5%",
        "日处理交易量100万笔",
        "降低坏账率15%，节省成本500万",
        "获得KDD 2024最佳应用论文奖"
      ]
    },
    {
      id: 5,
      title: "微服务架构设计与实现",
      period: "2022.12 - 2023.05",
      description: "设计完整微服务架构，包含服务发现、负载均衡、熔断降级、链路追踪等组件",
      tags: ["微服务", "Spring Cloud", "Docker"],
      status: "开源项目",
      github: "https://github.com/example/microservices",
      abstract: "随着业务复杂度的增加，传统的单体架构已无法满足现代应用的需求。本项目设计并实现了一套完整的微服务架构解决方案，涵盖了服务治理、监控告警、自动化部署等各个方面。",
      methodology: "架构采用Spring Cloud生态，使用Eureka进行服务注册发现，Zuul作为API网关，Hystrix实现熔断降级，Sleuth进行链路追踪。容器化部署使用Docker + Kubernetes，实现了自动化的CI/CD流程。",
      features: [
        "服务治理：注册发现、负载均衡、熔断降级",
        "监控体系：链路追踪、性能监控、日志聚合",
        "容器化：Docker镜像、Kubernetes编排",
        "自动化：CI/CD流水线、自动扩缩容",
        "安全机制：OAuth2认证、API限流"
      ],
      achievements: [
        "支持日均1000万请求处理",
        "系统可用性达到99.9%",
        "部署时间从2小时缩短到5分钟",
        "开源项目获得500+ GitHub Stars"
      ]
    }
  ];

  return (
    <div>
      
      <div className="space-y-4">
        {projectList && projectList.length > 0 ? (
          projectList.map((project, index) => (
            <div 
              key={project.id || index} 
              className="border-l-4 border-blue-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
              onClick={() => onArticleClick(project)}
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors">
                      {project.title || '未命名项目'}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                      project.status === '已完成' ? 'bg-green-100 text-green-700' :
                      project.status === '论文发表' ? 'bg-purple-100 text-purple-700' :
                      project.status === '已上线' ? 'bg-blue-100 text-blue-700' :
                      project.status === '生产部署' ? 'bg-orange-100 text-orange-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {project.status || '未知状态'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2 font-mono">{project.period || '时间未知'}</div>
                </div>
                <div className="flex items-center space-x-2">
                  {isAdminMode && (
                    <>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onEditProject(project);
                        }}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="编辑项目"
                      >
                        <i className="fas fa-edit text-sm"></i>
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (window.confirm('确定要删除这个项目吗？此操作不可撤销！')) {
                            onDeleteProject(project.id);
                          }
                        }}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="删除项目"
                      >
                        <i className="fas fa-trash text-sm"></i>
                      </button>
                    </>
                  )}
                  <i className="fas fa-chevron-right text-gray-300 hover:text-blue-500 transition-colors text-sm"></i>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {project.description || '暂无描述'}
              </p>
              
              <div className="flex flex-wrap gap-2">
                {project.tags && Array.isArray(project.tags) ? (
                  project.tags.map((tag, tagIndex) => (
                    <span 
                      key={`${tag}-${tagIndex}`}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                    暂无标签
                  </span>
                )}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-code text-4xl mb-4"></i>
            <p>暂无项目数据</p>
            <p className="text-sm mt-2">请通过管理面板添加项目</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
