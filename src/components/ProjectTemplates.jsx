import React, { useState } from 'react';

const ProjectTemplates = ({ onSelectTemplate, onClose }) => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const templates = [
    {
      id: 'web-app',
      name: 'Web应用项目',
      icon: 'fas fa-globe',
      color: 'bg-blue-500',
      description: '前端/全栈Web应用开发项目',
      template: {
        title: '',
        period: '2024.01 - 2024.03',
        description: '基于现代Web技术栈开发的应用项目，具备完整的前后端功能和用户交互体验。',
        abstract: '本项目采用现代化的Web开发技术栈，构建了一个功能完整、用户体验优秀的Web应用。项目涵盖了前端界面设计、后端API开发、数据库设计等多个方面，展现了全栈开发能力。',
        methodology: '前端采用React/Vue.js框架，配合现代化的UI组件库构建响应式界面。后端使用Node.js/Python构建RESTful API，数据库采用MySQL/MongoDB进行数据存储。整体架构遵循MVC模式，确保代码的可维护性和扩展性。',
        tags: ['React', 'Node.js', 'MongoDB', 'JavaScript'],
        status: '已完成',
        teamSize: '个人项目',
        role: '全栈开发工程师',
        duration: '3个月',
        achievements: [
          '完成了完整的前后端开发',
          '实现了用户认证和权限管理',
          '优化了页面加载速度，提升50%性能',
          '部署到云服务器，支持高并发访问'
        ]
      }
    },
    {
      id: 'mobile-app',
      name: '移动应用项目',
      icon: 'fas fa-mobile-alt',
      color: 'bg-green-500',
      description: 'iOS/Android移动应用开发项目',
      template: {
        title: '',
        period: '2024.01 - 2024.04',
        description: '跨平台移动应用开发项目，支持iOS和Android双平台，提供原生级别的用户体验。',
        abstract: '本项目开发了一款功能完整的移动应用，采用跨平台开发技术，实现了一套代码同时支持iOS和Android平台。应用具备完整的用户界面、数据同步、推送通知等核心功能。',
        methodology: '使用React Native/Flutter作为主要开发框架，结合原生模块实现平台特定功能。后端采用云服务架构，提供稳定的API接口和数据存储服务。集成了第三方SDK实现支付、地图、社交分享等功能。',
        tags: ['React Native', 'iOS', 'Android', 'JavaScript'],
        status: '已上线',
        teamSize: '3人团队',
        role: '移动端开发负责人',
        duration: '4个月',
        achievements: [
          'App Store和Google Play双平台上线',
          '累计下载量超过5万次',
          '用户评分达到4.5分以上',
          '实现了离线数据同步功能'
        ]
      }
    },
    {
      id: 'ai-ml',
      name: '人工智能/机器学习项目',
      icon: 'fas fa-brain',
      color: 'bg-purple-500',
      description: 'AI/ML算法研究与应用项目',
      template: {
        title: '',
        period: '2024.02 - 2024.06',
        description: '基于深度学习技术的智能算法研究项目，在特定领域实现了突破性的性能提升。',
        abstract: '本项目专注于深度学习算法的研究与应用，通过创新的网络架构设计和训练策略优化，在目标任务上取得了显著的性能提升。项目涵盖了数据预处理、模型设计、训练优化、部署应用等完整流程。',
        methodology: '采用PyTorch/TensorFlow深度学习框架，设计了创新的神经网络架构。通过数据增强、迁移学习、模型集成等技术提升模型性能。使用GPU集群进行大规模模型训练，并通过模型压缩和量化技术实现高效部署。',
        tags: ['深度学习', 'Python', 'PyTorch', '计算机视觉'],
        status: '论文发表',
        teamSize: '研究团队',
        role: '算法工程师',
        duration: '5个月',
        achievements: [
          '在标准数据集上达到SOTA性能',
          '相比基线方法提升15%准确率',
          '发表顶级会议论文1篇',
          '开源代码获得500+ GitHub Stars'
        ]
      }
    },
    {
      id: 'data-analysis',
      name: '数据分析项目',
      icon: 'fas fa-chart-bar',
      color: 'bg-orange-500',
      description: '大数据分析与可视化项目',
      template: {
        title: '',
        period: '2024.01 - 2024.03',
        description: '大规模数据分析项目，通过数据挖掘和可视化技术揭示数据背后的商业价值。',
        abstract: '本项目针对海量业务数据进行深入分析，运用统计学方法和机器学习技术挖掘数据价值，构建了完整的数据分析和可视化系统，为业务决策提供了有力支持。',
        methodology: '使用Python进行数据清洗和预处理，运用Pandas、NumPy等库进行数据分析。采用Scikit-learn构建预测模型，使用Matplotlib、Plotly等工具进行数据可视化。部署基于Flask/Django的Web应用展示分析结果。',
        tags: ['Python', '数据分析', 'Pandas', '机器学习'],
        status: '已完成',
        teamSize: '2人团队',
        role: '数据分析师',
        duration: '3个月',
        achievements: [
          '处理了超过100万条数据记录',
          '构建了准确率85%的预测模型',
          '为业务部门节省了30%的决策时间',
          '开发了交互式数据可视化仪表板'
        ]
      }
    },
    {
      id: 'system-design',
      name: '系统设计项目',
      icon: 'fas fa-server',
      color: 'bg-red-500',
      description: '分布式系统架构设计项目',
      template: {
        title: '',
        period: '2024.03 - 2024.08',
        description: '大规模分布式系统设计项目，支持高并发、高可用的业务场景需求。',
        abstract: '本项目设计并实现了一套完整的分布式系统架构，采用微服务架构模式，支持水平扩展和故障容错。系统具备高性能、高可用、高扩展性的特点，能够满足大规模业务场景的需求。',
        methodology: '采用微服务架构，使用Docker容器化部署，Kubernetes进行容器编排。使用Redis进行缓存，消息队列实现异步处理，数据库采用主从复制和分库分表策略。集成监控告警系统，确保系统稳定运行。',
        tags: ['微服务', 'Docker', 'Kubernetes', '分布式系统'],
        status: '生产部署',
        teamSize: '5人团队',
        role: '系统架构师',
        duration: '6个月',
        achievements: [
          '支持日均1000万请求处理',
          '系统可用性达到99.9%',
          '响应时间控制在100ms以内',
          '成功支撑了业务10倍增长'
        ]
      }
    },
    {
      id: 'open-source',
      name: '开源项目',
      icon: 'fab fa-github',
      color: 'bg-gray-700',
      description: '开源软件开发与维护项目',
      template: {
        title: '',
        period: '2024.01 - 至今',
        description: '开源软件项目，为开发者社区提供实用工具，获得了广泛的关注和使用。',
        abstract: '本项目是一个面向开发者社区的开源工具，旨在解决特定领域的技术痛点。项目采用现代化的开发流程，包含完整的文档、测试用例和CI/CD流程，为社区贡献了有价值的技术方案。',
        methodology: '采用敏捷开发模式，使用Git进行版本控制，GitHub Actions实现自动化测试和部署。编写详细的技术文档和使用指南，建立了完善的Issue管理和PR审核流程。积极响应社区反馈，持续迭代优化。',
        tags: ['开源', 'GitHub', 'CI/CD', '社区运营'],
        status: '开源项目',
        teamSize: '个人维护',
        role: '项目维护者',
        duration: '持续维护',
        achievements: [
          'GitHub获得1000+ Stars',
          '被100+项目引用和依赖',
          '收到50+社区贡献PR',
          '帮助解决了开发者的实际问题'
        ]
      }
    }
  ];

  const handleSelectTemplate = (template) => {
    if (onSelectTemplate) {
      onSelectTemplate(template.template);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <i className="fas fa-magic mr-3"></i>
                项目模板
              </h2>
              <p className="text-blue-100 mt-1">选择一个模板快速开始你的项目</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        {/* 模板列表 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template)}
                className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedTemplate?.id === template.id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-12 h-12 ${template.color} rounded-xl flex items-center justify-center text-white flex-shrink-0`}>
                    <i className={`${template.icon} text-xl`}></i>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">
                      {template.description}
                    </p>
                    
                    {/* 模板预览信息 */}
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-tags w-3"></i>
                        <span>{template.template.tags.slice(0, 3).join(', ')}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-clock w-3"></i>
                        <span>{template.template.duration}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-users w-3"></i>
                        <span>{template.template.teamSize}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {selectedTemplate?.id === template.id && (
                  <div className="mt-4 pt-4 border-t border-blue-200">
                    <div className="text-sm text-gray-700">
                      <p className="mb-2"><strong>项目描述：</strong></p>
                      <p className="text-gray-600 leading-relaxed">
                        {template.template.description}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* 操作按钮 */}
          <div className="flex justify-end space-x-4 mt-8 pt-6 border-t">
            <button
              onClick={onClose}
              className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              取消
            </button>
            <button
              onClick={() => selectedTemplate && handleSelectTemplate(selectedTemplate)}
              disabled={!selectedTemplate}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <i className="fas fa-check mr-2"></i>
              使用此模板
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTemplates;
