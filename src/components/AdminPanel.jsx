import React, { useState, useRef } from 'react';

const AdminPanel = ({ 
  isVisible, 
  onClose, 
  onContentUpdate, 
  onResetData, 
  onExportData, 
  onImportData 
}) => {
  const [activeTab, setActiveTab] = useState('project');
  const [formData, setFormData] = useState({});
  const fileInputRef = useRef(null);

  // 表单字段配置
  const formConfigs = {
    project: {
      title: '添加项目',
      fields: [
        { name: 'title', label: '项目标题', type: 'text', required: true },
        { name: 'period', label: '项目周期', type: 'text', placeholder: '2024.01 - 2024.03' },
        { name: 'description', label: '项目描述', type: 'textarea', required: true },
        { name: 'abstract', label: '项目摘要', type: 'textarea' },
        { name: 'methodology', label: '技术方法', type: 'textarea' },
        { name: 'projectSummary', label: '项目总结', type: 'textarea' },
        { name: 'tags', label: '技术标签', type: 'text', placeholder: '用逗号分隔，如：React,Node.js,MongoDB' },
        { name: 'status', label: '项目状态', type: 'select', options: ['已完成', '进行中', '已上线', '论文发表', '生产部署'] },
        { name: 'github', label: 'GitHub链接', type: 'url' },
        { name: 'demo', label: '演示链接', type: 'url' },
        { name: 'demoImage', label: '演示图片', type: 'url', placeholder: 'Unsplash图片链接或上传' },
        { name: 'demoVideo', label: '演示视频', type: 'url', placeholder: 'YouTube/B站链接' },
        { name: 'architectureImage', label: '架构图', type: 'url' },
        { name: 'resultsImage', label: '结果图表', type: 'url' },
        { name: 'screenshotImage', label: '界面截图', type: 'url' },
        { name: 'achievements', label: '主要成果', type: 'textarea', placeholder: '每行一个成果，系统会自动分割' }
      ]
    },
    publication: {
      title: '添加论文',
      fields: [
        { name: 'title', label: '论文标题', type: 'text', required: true },
        { name: 'authors', label: '作者列表', type: 'text', required: true },
        { name: 'venue', label: '发表会议/期刊', type: 'text', required: true },
        { name: 'year', label: '发表年份', type: 'text', required: true },
        { name: 'type', label: '论文类型', type: 'select', options: ['会议论文', '期刊论文', '预印本', '专利'] },
        { name: 'abstract', label: '论文摘要', type: 'textarea', required: true },
        { name: 'fullAbstract', label: '详细摘要', type: 'textarea' },
        { name: 'methodology', label: '研究方法', type: 'textarea' },
        { name: 'citations', label: '引用次数', type: 'number', placeholder: '0' },
        { name: 'pdfUrl', label: 'PDF链接', type: 'url' },
        { name: 'arxivUrl', label: 'arXiv链接', type: 'url' },
        { name: 'codeUrl', label: '代码链接', type: 'url' },
        { name: 'architectureImage', label: '模型架构图', type: 'url' },
        { name: 'resultsImage', label: '实验结果图', type: 'url' },
        { name: 'comparisonImage', label: '对比分析图', type: 'url' },
        { name: 'demoVideo', label: '研究演示视频', type: 'url' },
        { name: 'contributions', label: '主要贡献', type: 'textarea', placeholder: '每行一个贡献点' }
      ]
    },
    internship: {
      title: '添加工作&实习经历',
      fields: [
        { name: 'company', label: '公司名称', type: 'text', required: true },
        { name: 'position', label: '职位名称', type: 'text', required: true },
        { name: 'period', label: '工作时间', type: 'text', required: true, placeholder: '2023.06 - 2023.09' },
        { name: 'location', label: '工作地点', type: 'text' },
        { name: 'department', label: '部门', type: 'text' },
        { name: 'type', label: '工作类型', type: 'select', options: ['实习', '全职', '兼职', '项目合作'] },
        { name: 'description', label: '工作描述', type: 'textarea', required: true },
        { name: 'responsibilities', label: '工作职责', type: 'textarea' },
        { name: 'summary', label: '工作总结', type: 'textarea' },
        { name: 'skills', label: '技能标签', type: 'text', placeholder: '用逗号分隔' },
        { name: 'projectImage', label: '项目截图', type: 'url' },
        { name: 'demoVideo', label: '工作演示视频', type: 'url' },
        { name: 'resultsImage', label: '成果展示图', type: 'url' },
        { name: 'achievements', label: '主要成果', type: 'textarea', placeholder: '每行一个成果' }
      ]
    },
    honor: {
      title: '添加荣誉奖项',
      fields: [
        { name: 'award', label: '奖项名称', type: 'text', required: true },
        { name: 'organization', label: '颁发机构', type: 'text', required: true },
        { name: 'year', label: '获奖年份', type: 'text', required: true },
        { name: 'description', label: '奖项描述', type: 'textarea' },
        { name: 'level', label: '奖项级别', type: 'select', options: ['国际级', '国家级', '省级', '市级', '校级', '企业级'] }
      ]
    },
    'academic-blog': {
      title: '添加学术研究记录',
      fields: [
        { name: 'title', label: '标题', type: 'text', required: true },
        { name: 'category', label: '分类', type: 'text', required: true, placeholder: '如：深度学习、计算机视觉' },
        { name: 'summary', label: '摘要', type: 'textarea', required: true },
        { name: 'content', label: '详细内容', type: 'textarea', required: true },
        { name: 'tags', label: '标签', type: 'text', placeholder: '用逗号分隔' },
        { name: 'readTime', label: '阅读时间', type: 'text', placeholder: '如：15分钟' }
      ]
    },
    'engineering-blog': {
      title: '添加工程技术记录',
      fields: [
        { name: 'title', label: '标题', type: 'text', required: true },
        { name: 'category', label: '分类', type: 'text', required: true, placeholder: '如：前端开发、后端架构' },
        { name: 'summary', label: '摘要', type: 'textarea', required: true },
        { name: 'content', label: '详细内容', type: 'textarea', required: true },
        { name: 'tags', label: '标签', type: 'text', placeholder: '用逗号分隔' },
        { name: 'readTime', label: '阅读时间', type: 'text', placeholder: '如：12分钟' }
      ]
    },
    news: {
      title: '添加最新动态',
      fields: [
        { name: 'content', label: '动态内容', type: 'textarea', required: true, placeholder: '🎉 论文被ICCV 2024接收' }
      ]
    },
    'personal-info': {
      title: '更新个人资料',
      fields: [
        { name: 'name', label: '姓名', type: 'text', required: true },
        { name: 'title', label: '职位/学校', type: 'text', required: true },
        { name: 'location', label: '所在地', type: 'text' },
        { name: 'email', label: '邮箱', type: 'email' },
        { name: 'avatar', label: '头像', type: 'text', placeholder: '字母或图片URL' },
        { name: 'bio.main', label: '个人简介', type: 'textarea', required: true },
        { name: 'bio.detail', label: '详细介绍', type: 'textarea' },
        { name: 'researchInterests', label: '研究兴趣', type: 'text', placeholder: '用逗号分隔' },
        { name: 'socialLinks.github', label: 'GitHub链接', type: 'url' },
        { name: 'socialLinks.linkedin', label: 'LinkedIn链接', type: 'url' },
        { name: 'socialLinks.scholar', label: 'Google Scholar链接', type: 'url' },
        { name: 'socialLinks.rss', label: 'RSS链接', type: 'url' }
      ]
    }
  };

  const handleInputChange = (name, value) => {
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 处理特殊字段
    const processedData = { ...formData };
    
    // 处理标签和数组字段
    if (processedData.tags && typeof processedData.tags === 'string') {
      processedData.tags = processedData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
    if (processedData.skills && typeof processedData.skills === 'string') {
      processedData.skills = processedData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    }
    if (processedData.researchInterests && typeof processedData.researchInterests === 'string') {
      processedData.researchInterests = processedData.researchInterests.split(',').map(interest => interest.trim()).filter(interest => interest);
    }
    
    // 处理成果列表
    if (processedData.achievements && typeof processedData.achievements === 'string') {
      processedData.achievements = processedData.achievements.split('\n').map(achievement => achievement.trim()).filter(achievement => achievement);
    }
    if (processedData.contributions && typeof processedData.contributions === 'string') {
      processedData.contributions = processedData.contributions.split('\n').map(contribution => contribution.trim()).filter(contribution => contribution);
    }
    
    // 处理实验结果
    if (activeTab === 'project' && processedData.results && typeof processedData.results === 'string') {
      // 这里可以添加结果解析逻辑
    }

    onContentUpdate(activeTab, processedData);
    setFormData({});
    alert('内容添加成功！');
  };

  const handleFileUpload = (fieldName) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*,video/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          handleInputChange(fieldName, e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  const renderField = (field) => {
    const value = field.name.includes('.') 
      ? formData[field.name.split('.')[0]]?.[field.name.split('.')[1]] || ''
      : formData[field.name] || '';

    switch (field.type) {
      case 'textarea':
        return (
          <textarea
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
          />
        );
      
      case 'select':
        return (
          <select
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">请选择...</option>
            {field.options.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        );
      
      case 'url':
        return (
          <div className="flex space-x-2">
            <input
              type="url"
              value={value}
              onChange={(e) => handleInputChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              required={field.required}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {(field.name.includes('Image') || field.name.includes('Video')) && (
              <button
                type="button"
                onClick={() => handleFileUpload(field.name)}
                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm"
                title="上传文件"
              >
                <i className="fas fa-upload"></i>
              </button>
            )}
          </div>
        );
      
      default:
        return (
          <input
            type={field.type}
            value={value}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            required={field.required}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        );
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <i className="fas fa-cog mr-3"></i>
                内容管理面板
              </h2>
              <p className="text-purple-100 mt-1">管理你的学术作品集内容</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* 左侧标签栏 */}
          <div className="w-64 bg-gray-50 border-r overflow-y-auto">
            <div className="p-4">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">内容管理</h3>
              <div className="space-y-1">
                {Object.entries(formConfigs).map(([key, config]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setActiveTab(key);
                      setFormData({});
                    }}
                    className={`w-full text-left px-3 py-2 rounded-lg transition-colors text-sm ${
                      activeTab === key
                        ? 'bg-blue-100 text-blue-700 font-medium'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    <i className={`fas ${
                      key === 'project' ? 'fa-code' :
                      key === 'publication' ? 'fa-file-alt' :
                      key === 'internship' ? 'fa-briefcase' :
                      key === 'honor' ? 'fa-trophy' :
                      key.includes('blog') ? 'fa-book' :
                      key === 'news' ? 'fa-fire' :
                      'fa-user'
                    } mr-2 w-4`}></i>
                    {config.title}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">数据管理</h3>
                <div className="space-y-2">
                  <button
                    onClick={onExportData}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <i className="fas fa-download mr-2 w-4"></i>
                    导出数据
                  </button>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                  >
                    <i className="fas fa-upload mr-2 w-4"></i>
                    导入数据
                  </button>
                  <button
                    onClick={onResetData}
                    className="w-full text-left px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <i className="fas fa-redo mr-2 w-4"></i>
                    重置数据
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧表单区域 */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-6">
                {formConfigs[activeTab]?.title}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {formConfigs[activeTab]?.fields.map((field) => (
                  <div key={field.name}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {field.label}
                      {field.required && <span className="text-red-500 ml-1">*</span>}
                    </label>
                    {renderField(field)}
                  </div>
                ))}
                
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => setFormData({})}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    清空表单
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    添加内容
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* 隐藏的文件输入 */}
        <input
          ref={fileInputRef}
          type="file"
          accept=".json"
          onChange={onImportData}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default AdminPanel;
