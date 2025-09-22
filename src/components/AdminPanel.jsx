import React, { useState, useRef, useEffect } from 'react';
import ProjectTemplates from './ProjectTemplates';
import MarkdownEditor from './MarkdownEditor';
import BatchOperations from './BatchOperations';
import DataValidation from './DataValidation';
import VersionManager from './VersionManager';
import DateRangePicker from './DateRangePicker';

const AdminPanel = ({ 
  isVisible, 
  onClose, 
  onContentUpdate, 
  onResetData, 
  onExportData, 
  onImportData,
  editingItem,
  onClearEditing
}) => {
  const [activeTab, setActiveTab] = useState('project');
  const [formData, setFormData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef(null);
  
  // 处理编辑项目的数据加载
  useEffect(() => {
    if (editingItem) {
      setIsEditing(true);
      // 处理编辑数据
      const editData = { ...editingItem };
      
      // 处理数组字段转换为字符串
      if (editData.tags && Array.isArray(editData.tags)) {
        editData.tags = editData.tags.join(', ');
      }
      if (editData.achievements && Array.isArray(editData.achievements)) {
        editData.achievements = editData.achievements.join('\n');
      }
      if (editData.contributions && Array.isArray(editData.contributions)) {
        editData.contributions = editData.contributions.join('\n');
      }
      if (editData.skills && Array.isArray(editData.skills)) {
        editData.skills = editData.skills.join(', ');
      }
      
      // 根据编辑项目的类型设置对应的标签页
      if (editData.venue || editData.authors) {
        // 论文类型
        setActiveTab('publication');
      } else if (editData.company || editData.position) {
        // 实习经历类型
        setActiveTab('internship');
      } else if (editData.award || editData.organization) {
        // 荣誉奖项类型
        setActiveTab('honor');
      } else if (editData.category === 'academic') {
        // 学术博客类型
        setActiveTab('academic-blog');
      } else if (editData.category === 'engineering') {
        // 工程博客类型
        setActiveTab('engineering-blog');
      } else if (editData.type === 'news' || (editData.content && !editData.title)) {
        // 动态类型
        setActiveTab('news');
      } else if (editData.customCategory) {
        // 自定义内容类型
        setActiveTab('custom-content');
      } else {
        // 默认项目类型
        setActiveTab('project');
      }
      
      setFormData(editData);
    } else if (!editingItem && isEditing) {
      setIsEditing(false);
      setFormData({});
    }
  }, [editingItem]);

  // 加载现有个人信息数据
  useEffect(() => {
    if (activeTab === 'personal-info') {
      try {
        const stored = localStorage.getItem('portfolio_personal_info');
        if (stored) {
          const personalInfo = JSON.parse(stored);
          // 展平嵌套对象以便表单处理
          const flattenedData = {
            name: personalInfo.name || '',
            title: personalInfo.title || '',
            location: personalInfo.location || '',
            email: personalInfo.email || '',
            avatar: personalInfo.avatar || '',
            'bio.main': personalInfo.bio?.main || '',
            'bio.detail': personalInfo.bio?.detail || '',
            researchInterests: Array.isArray(personalInfo.researchInterests) 
              ? personalInfo.researchInterests.join(', ') 
              : ''
          };
          setFormData(flattenedData);
          
          // 加载社交链接
          if (personalInfo.socialLinks) {
            const links = Object.entries(personalInfo.socialLinks)
              .filter(([key, value]) => value && value.trim())
              .map(([platform, url]) => {
                const platformInfo = socialPlatforms.find(p => 
                  p.name.toLowerCase() === platform.toLowerCase() || 
                  platform.toLowerCase().includes(p.name.toLowerCase())
                );
                return {
                  id: Date.now() + Math.random(),
                  platform: platformInfo ? platformInfo.name : platform,
                  url: url,
                  icon: platformInfo ? platformInfo.icon : 'fas fa-link',
                  color: platformInfo ? platformInfo.color : 'text-gray-500'
                };
              });
            setSocialLinks(links);
          } else {
            setSocialLinks([]);
          }
        } else {
          // 如果没有存储数据，设置默认空值
          setFormData({
            name: '',
            title: '',
            location: '',
            email: '',
            avatar: '',
            'bio.main': '',
            'bio.detail': '',
            researchInterests: ''
          });
          setSocialLinks([]);
        }
      } catch (error) {
        console.warn('Failed to load personal info:', error);
        // 错误时设置空表单
        setFormData({
          name: '',
          title: '',
          location: '',
          email: '',
          avatar: '',
          'bio.main': '',
          'bio.detail': '',
          researchInterests: ''
        });
        setSocialLinks([]);
      }
    }
    // 移除了非个人信息标签时清空表单的逻辑，让其他标签保持独立状态
  }, [activeTab]);

  // 社交链接管理状态
  const [socialLinks, setSocialLinks] = useState([]);
  const [showAddSocialLink, setShowAddSocialLink] = useState(false);
  const [newSocialLink, setNewSocialLink] = useState({ platform: '', url: '', icon: '', customPlatform: '' });
  const [showProjectTemplates, setShowProjectTemplates] = useState(false);
  const [showSortingPanel, setShowSortingPanel] = useState(false);
  const [sortableItems, setSortableItems] = useState([]);
  const [sortingType, setSortingType] = useState('');
  const [showBatchOperations, setShowBatchOperations] = useState(false);
  const [batchItems, setBatchItems] = useState([]);
  const [batchType, setBatchType] = useState('');
  const [showDataValidation, setShowDataValidation] = useState(false);
  const [showVersionManager, setShowVersionManager] = useState(false);

  // 预设的社交平台
  const socialPlatforms = [
    { name: 'GitHub', icon: 'fab fa-github', color: 'text-gray-700' },
    { name: 'LinkedIn', icon: 'fab fa-linkedin', color: 'text-blue-700' },
    { name: 'Google Scholar', icon: 'fas fa-graduation-cap', color: 'text-red-700' },
    { name: 'RSS', icon: 'fas fa-rss', color: 'text-orange-700' },
    { name: '微博', icon: 'fab fa-weibo', color: 'text-red-600' },
    { name: '知乎', icon: 'fas fa-question-circle', color: 'text-blue-600' },
    { name: 'Twitter', icon: 'fab fa-twitter', color: 'text-blue-500' },
    { name: 'Facebook', icon: 'fab fa-facebook', color: 'text-blue-600' },
    { name: 'Instagram', icon: 'fab fa-instagram', color: 'text-pink-600' },
    { name: 'YouTube', icon: 'fab fa-youtube', color: 'text-red-600' },
    { name: 'B站', icon: 'fas fa-play-circle', color: 'text-pink-500' },
    { name: '个人博客', icon: 'fas fa-blog', color: 'text-green-600' },
    { name: '个人网站', icon: 'fas fa-globe', color: 'text-blue-500' },
    { name: 'Email', icon: 'fas fa-envelope', color: 'text-gray-600' },
    { name: '自定义', icon: 'fas fa-link', color: 'text-gray-500' }
  ];

  // 表单字段配置
  const formConfigs = {
    project: {
      title: isEditing ? '编辑项目' : '添加项目',
      fields: [
        { name: 'title', label: '项目标题', type: 'text', required: true },
        { name: 'period', label: '项目周期', type: 'date-range', placeholder: '2024.01 - 2024.03' },
        { name: 'description', label: '项目描述', type: 'textarea', required: false },
        { name: 'abstract', label: '项目摘要', type: 'textarea', placeholder: '项目的核心思想和创新点，建议100-200字' },
        { name: 'methodology', label: '技术方法', type: 'textarea', placeholder: '详细描述使用的技术栈、架构设计和实现方案' },
        { name: 'projectSummary', label: '项目总结', type: 'textarea', placeholder: '项目的收获、经验和后续展望' },
        { name: 'tags', label: '技术标签', type: 'text', placeholder: '用逗号分隔，如：React,Node.js,MongoDB' },
        { name: 'status', label: '项目状态', type: 'select', options: ['已完成', '进行中', '已上线', '论文发表', '生产部署', '开源项目', '商业项目'] },
        { name: 'teamSize', label: '团队规模', type: 'text', placeholder: '如：5人团队 或 个人项目' },
        { name: 'role', label: '担任角色', type: 'text', placeholder: '如：项目负责人、前端开发、算法工程师' },
        { name: 'duration', label: '开发周期', type: 'text', placeholder: '如：3个月 或 6周' },
        { name: 'github', label: 'GitHub链接', type: 'url' },
        { name: 'demo', label: '演示链接', type: 'url' },
        { name: 'website', label: '项目官网', type: 'url' },
        { name: 'documentation', label: '项目文档', type: 'url', placeholder: '技术文档或API文档链接' },
        { name: 'demoImage', label: '演示图片', type: 'media-upload', placeholder: 'Unsplash图片链接或上传' },
        { name: 'demoVideo', label: '演示视频', type: 'media-upload', placeholder: 'YouTube/B站链接' },
        { name: 'architectureImage', label: '架构图', type: 'media-upload' },
        { name: 'resultsImage', label: '结果图表', type: 'media-upload' },
        { name: 'screenshotImage', label: '界面截图', type: 'media-upload' },
        { name: 'achievements', label: '主要成果', type: 'textarea', placeholder: '每行一个成果，系统会自动分割\n例如：\n• 用户量突破10万\n• 性能提升50%\n• 获得技术创新奖' },
        { name: 'challenges', label: '技术挑战', type: 'textarea', placeholder: '项目中遇到的主要技术难点和解决方案' },
        { name: 'learnings', label: '项目收获', type: 'textarea', placeholder: '通过项目学到的新技术、经验和教训' }
      ]
    },
    'custom-content': {
      title: isEditing ? '编辑自定义内容' : '添加自定义内容',
      fields: [
        { name: 'title', label: '标题', type: 'text', required: true },
        { name: 'subtitle', label: '副标题', type: 'text', placeholder: '可选的副标题' },
        { name: 'period', label: '时间/周期', type: 'date-range', placeholder: '2024.01 - 2024.03 或 2024年' },
        { name: 'category', label: '分类', type: 'text', placeholder: '内容分类，如：技术分享、学习笔记等' },
        { name: 'description', label: '描述', type: 'textarea', placeholder: '简要描述内容要点' },
        { name: 'content', label: '详细内容', type: 'textarea', placeholder: '详细的内容描述，支持Markdown格式' },
        { name: 'tags', label: '标签', type: 'text', placeholder: '用逗号分隔，如：React,Node.js,学习笔记' },
        { name: 'status', label: '状态', type: 'select', options: ['已完成', '进行中', '计划中', '已发布', '草稿'] },
        { name: 'priority', label: '优先级', type: 'select', options: ['高', '中', '低'] },
        { name: 'url', label: '相关链接', type: 'url', placeholder: '相关的外部链接' },
        { name: 'imageUrl', label: '配图', type: 'media-upload', placeholder: 'Unsplash图片链接或上传' },
        { name: 'videoUrl', label: '视频链接', type: 'media-upload', placeholder: 'YouTube/B站链接' },
        { name: 'attachments', label: '附件说明', type: 'textarea', placeholder: '相关文件或资源的说明' },
        { name: 'notes', label: '备注', type: 'textarea', placeholder: '其他备注信息' }
      ]
    },
    publication: {
      title: isEditing ? '编辑论文' : '添加论文',
      fields: [
        { name: 'title', label: '论文标题', type: 'text', required: true },
        { name: 'authors', label: '作者列表', type: 'text', required: false },
        { name: 'venue', label: '发表会议/期刊', type: 'text', required: false },
        { name: 'year', label: '发表年份', type: 'year-select', required: false },
        { name: 'type', label: '论文类型', type: 'select', options: ['会议论文', '期刊论文', '预印本', '专利'] },
        { name: 'abstract', label: '论文摘要', type: 'textarea', required: true },
        { name: 'fullAbstract', label: '详细摘要', type: 'textarea' },
        { name: 'methodology', label: '研究方法', type: 'textarea' },
        { name: 'citations', label: '引用次数', type: 'number', placeholder: '0' },
        { name: 'pdfUrl', label: 'PDF链接', type: 'url' },
        { name: 'arxivUrl', label: 'arXiv链接', type: 'url' },
        { name: 'codeUrl', label: '代码链接', type: 'url' },
        { name: 'architectureImage', label: '模型架构图', type: 'media-upload' },
        { name: 'resultsImage', label: '实验结果图', type: 'media-upload' },
        { name: 'comparisonImage', label: '对比分析图', type: 'media-upload' },
        { name: 'demoVideo', label: '研究演示视频', type: 'media-upload' },
        { name: 'contributions', label: '主要贡献', type: 'textarea', placeholder: '每行一个贡献点' }
      ]
    },
    internship: {
      title: isEditing ? '编辑工作&实习经历' : '添加工作&实习经历',
      fields: [
        { name: 'company', label: '公司名称', type: 'text', required: true },
        { name: 'position', label: '职位名称', type: 'text', required: true },
        { name: 'period', label: '工作时间', type: 'date-range', required: false, placeholder: '2023.06 - 2023.09' },
        { name: 'location', label: '工作地点', type: 'text' },
        { name: 'department', label: '部门', type: 'text' },
        { name: 'type', label: '工作类型', type: 'select', options: ['实习', '全职', '兼职', '项目合作'] },
        { name: 'description', label: '工作描述', type: 'textarea', required: false },
        { name: 'responsibilities', label: '工作职责', type: 'textarea' },
        { name: 'summary', label: '工作总结', type: 'textarea' },
        { name: 'skills', label: '技能标签', type: 'text', placeholder: '用逗号分隔' },
        { name: 'projectImage', label: '项目截图', type: 'media-upload' },
        { name: 'demoVideo', label: '工作演示视频', type: 'media-upload' },
        { name: 'resultsImage', label: '成果展示图', type: 'media-upload' },
        { name: 'achievements', label: '主要成果', type: 'textarea', placeholder: '每行一个成果' }
      ]
    },
    honor: {
      title: isEditing ? '编辑荣誉奖项' : '添加荣誉奖项',
      fields: [
        { name: 'award', label: '奖项名称', type: 'text', required: true },
        { name: 'organization', label: '颁发机构', type: 'text', required: false },
        { name: 'year', label: '获奖年份', type: 'year-select', required: false },
        { name: 'description', label: '奖项描述', type: 'textarea' },
        { name: 'level', label: '奖项级别', type: 'select', options: ['国际级', '国家级', '省级', '市级', '校级', '企业级'] }
      ]
    },
    'academic-blog': {
      title: isEditing ? '编辑学术研究记录' : '添加学术研究记录',
      fields: [
        { name: 'title', label: '标题', type: 'text', required: true },
        { name: 'category', label: '分类', type: 'category-select', required: false, 
          options: ['深度学习', '机器学习', '计算机视觉', '自然语言处理', '数据挖掘', '强化学习', '神经网络', '算法优化'] },
        { name: 'summary', label: '摘要', type: 'textarea', required: false },
        { name: 'content', label: '详细内容', type: 'textarea', required: false },
        { name: 'tags', label: '标签', type: 'tags-input', placeholder: '用逗号分隔',
          suggestions: ['Python', 'TensorFlow', 'PyTorch', 'Keras', 'Scikit-learn', 'Pandas', 'NumPy', 'Jupyter', 'CUDA', 'OpenCV'] },
        { name: 'readTime', label: '阅读时间', type: 'text', placeholder: '如：15分钟' }
      ]
    },
    'engineering-blog': {
      title: isEditing ? '编辑工程技术记录' : '添加工程技术记录',
      fields: [
        { name: 'title', label: '标题', type: 'text', required: true },
        { name: 'category', label: '分类', type: 'category-select', required: false,
          options: ['前端开发', '后端开发', '系统架构', '容器编排', '数据库', '微服务', '云计算', '运维部署'] },
        { name: 'summary', label: '摘要', type: 'textarea', required: false },
        { name: 'content', label: '详细内容', type: 'textarea', required: false },
        { name: 'tags', label: '标签', type: 'tags-input', placeholder: '用逗号分隔',
          suggestions: ['React', 'Vue', 'Node.js', 'Spring', 'Docker', 'Kubernetes', 'MySQL', 'Redis', 'AWS', 'Git'] },
        { name: 'readTime', label: '阅读时间', type: 'text', placeholder: '如：12分钟' }
      ]
    },
    news: {
      title: isEditing ? '编辑最新动态' : '添加最新动态',
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
        { name: 'avatar', label: '头像', type: 'avatar', placeholder: '字母或图片URL' },
        { name: 'bio.main', label: '个人简介', type: 'textarea', required: true, placeholder: '请输入您的个人简介，介绍您的专业背景和研究方向' },
        { name: 'bio.detail', label: '详细介绍', type: 'textarea', placeholder: '可选：更详细的个人介绍，包括研究经历、学术成就等' },
        { name: 'researchInterests', label: '研究兴趣', type: 'text', placeholder: '用逗号分隔' }
      ]
    }
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 处理特殊字段
    const processedData = { ...formData };
    
    // 处理个人信息的嵌套结构
    if (activeTab === 'personal-info') {
      // 重构嵌套对象
      const restructuredData = {};
      
      // 处理基本字段
      ['name', 'title', 'location', 'email', 'avatar'].forEach(field => {
        if (processedData[field] !== undefined) {
          restructuredData[field] = processedData[field];
        }
      });
      
      // 处理 bio 嵌套对象
      restructuredData.bio = {
        main: processedData['bio.main'] || '',
        detail: processedData['bio.detail'] || ''
      };
      
      // 处理社交链接 - 从动态列表构建
      restructuredData.socialLinks = {};
      socialLinks.forEach(link => {
        if (link.url && link.url.trim()) {
          // 使用平台名称作为键，但转换为小写并处理特殊字符
          let key = link.platform.toLowerCase()
            .replace(/\s+/g, '')
            .replace('googlescholar', 'scholar')
            .replace('个人博客', 'blog')
            .replace('个人网站', 'website');
          restructuredData.socialLinks[key] = link.url;
        }
      });
      
      // 处理研究兴趣数组
      if (processedData.researchInterests && typeof processedData.researchInterests === 'string') {
        restructuredData.researchInterests = processedData.researchInterests
          .split(',')
          .map(interest => interest.trim())
          .filter(interest => interest);
      }
      
      onContentUpdate(activeTab, restructuredData);
    } else {
      // 处理其他模块的数据
      
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
      
      // 如果是编辑模式，保留原有ID
      if (isEditing && editingItem) {
        processedData.id = editingItem.id;
      }
      
      // 特殊处理自定义内容
      if (activeTab === 'custom-content') {
        // 确保自定义内容有必要的字段
        if (editingItem && editingItem.customCategory) {
          processedData.customCategory = editingItem.customCategory;
          processedData.customCategoryName = editingItem.customCategoryName;
        }
        
        if (isEditing && editingItem) {
          // 编辑现有自定义内容
          const currentCustomContent = JSON.parse(localStorage.getItem('portfolio_custom_content') || '[]');
          const updatedCustomContent = currentCustomContent.map(item => 
            item.id === editingItem.id ? { ...processedData, updatedAt: new Date().toISOString() } : item
          );
          localStorage.setItem('portfolio_custom_content', JSON.stringify(updatedCustomContent));
        } else {
          // 添加新的自定义内容
          const newCustomContent = {
            id: Date.now(),
            ...processedData,
            createdAt: new Date().toISOString()
          };
          const currentCustomContent = JSON.parse(localStorage.getItem('portfolio_custom_content') || '[]');
          const updatedCustomContent = [newCustomContent, ...currentCustomContent];
          localStorage.setItem('portfolio_custom_content', JSON.stringify(updatedCustomContent));
        }
        window.dispatchEvent(new Event('storage'));
      } else {
        onContentUpdate(activeTab, processedData, isEditing);
      }
      
      // 清空表单和编辑状态
      setFormData({});
      setIsEditing(false);
      if (onClearEditing) {
        onClearEditing();
      }
    }
    
    let actionText;
    if (activeTab === 'personal-info') {
      actionText = '个人资料保存成功！';
    } else if (isEditing) {
      actionText = '内容更新成功！';
    } else {
      actionText = '内容添加成功！';
    }
    alert(actionText);
  };

  const handleFileUpload = (fieldName) => {
    const input = document.createElement('input');
    input.type = 'file';
    
    // 根据字段名称设置接受的文件类型
    if (fieldName.includes('Video') || fieldName.includes('video')) {
      input.accept = 'video/*';
    } else if (fieldName.includes('Image') || fieldName.includes('image') || fieldName.includes('avatar')) {
      input.accept = 'image/*';
    } else {
      input.accept = 'image/*,video/*';
    }
    
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        // 检查文件大小（限制为10MB）
        if (file.size > 10 * 1024 * 1024) {
          alert('文件大小不能超过10MB！');
          return;
        }
        
        const reader = new FileReader();
        reader.onload = (e) => {
          handleInputChange(fieldName, e.target.result);
        };
        reader.readAsDataURL(file);
      }
    };
    input.click();
  };

  // 字段标签自定义功能
  const [customFieldLabels, setCustomFieldLabels] = useState({});
  const [editingFieldLabel, setEditingFieldLabel] = useState(null);
  const [editingLabelText, setEditingLabelText] = useState('');

  // 加载自定义字段标签
  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio_custom_field_labels');
      if (stored) {
        setCustomFieldLabels(JSON.parse(stored));
      }
    } catch (error) {
      console.warn('Failed to load custom field labels:', error);
    }
  }, []);

  // 保存自定义字段标签
  const saveCustomFieldLabels = (labels) => {
    setCustomFieldLabels(labels);
    localStorage.setItem('portfolio_custom_field_labels', JSON.stringify(labels));
  };

  // 获取字段显示标签
  const getFieldDisplayLabel = (fieldName, defaultLabel) => {
    const key = `${activeTab}_${fieldName}`;
    return customFieldLabels[key] || defaultLabel;
  };

  // 开始编辑字段标签
  const startEditingFieldLabel = (fieldName, defaultLabel) => {
    const key = `${activeTab}_${fieldName}`;
    setEditingFieldLabel(key);
    setEditingLabelText(customFieldLabels[key] || defaultLabel);
  };

  // 保存字段标签
  const saveFieldLabel = () => {
    if (editingFieldLabel && editingLabelText.trim()) {
      const newLabels = {
        ...customFieldLabels,
        [editingFieldLabel]: editingLabelText.trim()
      };
      saveCustomFieldLabels(newLabels);
    }
    setEditingFieldLabel(null);
    setEditingLabelText('');
  };

  // 取消编辑字段标签
  const cancelEditingFieldLabel = () => {
    setEditingFieldLabel(null);
    setEditingLabelText('');
  };

  // 重置字段标签
  const resetFieldLabel = (fieldName, defaultLabel) => {
    const key = `${activeTab}_${fieldName}`;
    const newLabels = { ...customFieldLabels };
    delete newLabels[key];
    saveCustomFieldLabels(newLabels);
  };

  const renderField = (field) => {
    const value = formData[field.name] || '';

    switch (field.type) {
      case 'textarea':
        // 对于以下字段使用 Markdown 编辑器
        const markdownFields = [
          'content', 'abstract', 'fullAbstract', 'methodology', 'description', 
          'responsibilities', 'summary', 'projectSummary', 'challenges', 'learnings',
          'bio.main', 'bio.detail'
        ];
        
        if (markdownFields.includes(field.name) || activeTab.includes('blog') || activeTab === 'news') {
          return (
            <MarkdownEditor
              value={value}
              onChange={(newValue) => handleInputChange(field.name, newValue)}
              placeholder={field.placeholder}
            />
          );
        }
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

      case 'media-upload':
        return (
          <div className="space-y-3">
            {/* 当前媒体预览 */}
            {value && (
              <div className="p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">当前文件</span>
                  <button
                    type="button"
                    onClick={() => handleInputChange(field.name, '')}
                    className="text-xs text-red-600 hover:text-red-800"
                  >
                    <i className="fas fa-trash mr-1"></i>清除
                  </button>
                </div>
                {value.startsWith('data:image') ? (
                  <img src={value} alt="预览" className="w-full max-w-xs rounded-lg" />
                ) : value.startsWith('data:video') ? (
                  <video src={value} controls className="w-full max-w-xs rounded-lg" />
                ) : (
                  <div className="text-sm text-gray-600 break-all">{value}</div>
                )}
              </div>
            )}
            
            {/* URL输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-link mr-2"></i>链接地址
              </label>
              <input
                type="url"
                value={value && !value.startsWith('data:') ? value : ''}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* 本地上传 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-upload mr-2"></i>本地上传
              </label>
              <button
                type="button"
                onClick={() => handleFileUpload(field.name)}
                className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center"
              >
                <i className="fas fa-cloud-upload-alt text-gray-400 text-xl mb-2"></i>
                <p className="text-sm text-gray-600">
                  {field.name.includes('Video') ? '点击上传视频文件' : '点击上传图片文件'}
                </p>
                <p className="text-xs text-gray-500">
                  {field.name.includes('Video') ? '支持 MP4、WebM、MOV 格式' : '支持 JPG、PNG、GIF、WebP 格式'}
                </p>
              </button>
            </div>
            
            {/* 快速选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <i className="fas fa-images mr-2"></i>快速选择
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    const unsplashUrl = field.name.includes('Video') 
                      ? 'https://www.youtube.com/embed/dQw4w9WgXcQ'
                      : `https://images.unsplash.com/photo-${Math.floor(Math.random() * 1000000000000)}?w=800&h=600&fit=crop`;
                    handleInputChange(field.name, unsplashUrl);
                  }}
                  className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-sm"
                >
                  <i className={`fas ${field.name.includes('Video') ? 'fa-video' : 'fa-image'} mr-2`}></i>
                  {field.name.includes('Video') ? '示例视频' : '随机图片'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const url = field.name.includes('Video') 
                      ? 'https://player.bilibili.com/player.html?bvid=BV1xx411c7mD'
                      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop';
                    handleInputChange(field.name, url);
                  }}
                  className="px-3 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors text-sm"
                >
                  <i className={`fas ${field.name.includes('Video') ? 'fa-play-circle' : 'fa-user-circle'} mr-2`}></i>
                  {field.name.includes('Video') ? 'B站视频' : '人物图片'}
                </button>
              </div>
            </div>
          </div>
        );

      case 'date-range':
        return (
          <DateRangePicker
            value={value}
            onChange={(newValue) => handleInputChange(field.name, newValue)}
            placeholder={field.placeholder}
          />
        );

      case 'year-select':
        return (
          <div className="space-y-3">
            {/* 手动输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">手动输入</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder="如：2024"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            {/* 年份快速选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">快速选择年份</label>
              <div className="grid grid-cols-4 gap-2 max-h-32 overflow-y-auto">
                {(() => {
                  const currentYear = new Date().getFullYear();
                  const years = [];
                  for (let i = currentYear + 2; i >= currentYear - 10; i--) {
                    years.push(i);
                  }
                  
                  return years.map(year => (
                    <button
                      key={year}
                      type="button"
                      onClick={() => handleInputChange(field.name, year.toString())}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        value === year.toString()
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {year}
                    </button>
                  ));
                })()}
              </div>
            </div>
          </div>
        );
      
      case 'category-select':
        return (
          <div className="space-y-3">
            {/* 预设分类按钮 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">选择分类</label>
              <div className="flex flex-wrap gap-2">
                {field.options.map(option => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleInputChange(field.name, option)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      value === option
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            
            {/* 自定义输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">或自定义分类</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder="输入自定义分类名称"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        );

      case 'tags-input':
        return (
          <div className="space-y-3">
            {/* 预设标签按钮 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">常用标签</label>
              <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto">
                {field.suggestions?.map(tag => {
                  const currentTags = value ? value.split(',').map(t => t.trim()) : [];
                  const isSelected = currentTags.includes(tag);
                  
                  return (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        if (isSelected) {
                          // 移除标签
                          const newTags = currentTags.filter(t => t !== tag);
                          handleInputChange(field.name, newTags.join(', '));
                        } else {
                          // 添加标签
                          const newTags = [...currentTags, tag];
                          handleInputChange(field.name, newTags.join(', '));
                        }
                      }}
                      className={`px-2 py-1 rounded text-xs font-medium transition-colors ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {isSelected && <i className="fas fa-check mr-1"></i>}
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* 手动输入 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">手动输入标签</label>
              <input
                type="text"
                value={value}
                onChange={(e) => handleInputChange(field.name, e.target.value)}
                placeholder={field.placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <p className="text-xs text-gray-500 mt-1">用逗号分隔多个标签，或点击上方常用标签快速添加</p>
            </div>
          </div>
        );

      case 'avatar':
        return (
          <div className="space-y-4">
            {/* 当前头像预览 */}
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold overflow-hidden flex-shrink-0">
                {value && value.startsWith('http') ? (
                  <img 
                    src={value} 
                    alt="头像预览" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : value && value.startsWith('data:') ? (
                  <img 
                    src={value} 
                    alt="头像预览" 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span>{value || "A"}</span>
                )}
                {value && (value.startsWith('http') || value.startsWith('data:')) && (
                  <span className="w-full h-full bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold" style={{display: 'none'}}>
                    {value.charAt(0).toUpperCase() || "A"}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-2">当前头像</p>
                <p className="text-xs text-gray-500">
                  {value && (value.startsWith('http') || value.startsWith('data:')) ? '图片头像' : '文字头像'}
                </p>
              </div>
            </div>
            
            {/* 头像选项 */}
            <div className="space-y-3">
              {/* 文字头像 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-font mr-2"></i>文字头像
                </label>
                <input
                  type="text"
                  value={(!value || (!value.startsWith('http') && !value.startsWith('data:'))) ? value : ''}
                  onChange={(e) => handleInputChange(field.name, e.target.value)}
                  placeholder="输入1-2个字符，如：张、ZH、A"
                  maxLength="2"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-xs text-gray-500 mt-1">建议使用姓氏首字母或名字缩写</p>
              </div>
              
              {/* 图片URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-link mr-2"></i>图片链接
                </label>
                <div className="flex space-x-2">
                  <input
                    type="url"
                    value={(value && value.startsWith('http')) ? value : ''}
                    onChange={(e) => handleInputChange(field.name, e.target.value)}
                    placeholder="https://example.com/avatar.jpg 或 Unsplash 图片链接"
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const unsplashUrl = `https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face`;
                      handleInputChange(field.name, unsplashUrl);
                    }}
                    className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-sm"
                    title="使用示例头像"
                  >
                    <i className="fas fa-user-circle"></i>
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">推荐使用 Unsplash 等图片服务</p>
              </div>
              
              {/* 本地上传 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-upload mr-2"></i>本地上传
                </label>
                <button
                  type="button"
                  onClick={() => handleFileUpload(field.name)}
                  className="w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-400 hover:bg-blue-50 transition-colors text-center"
                >
                  <i className="fas fa-cloud-upload-alt text-gray-400 text-xl mb-2"></i>
                  <p className="text-sm text-gray-600">点击上传头像图片</p>
                  <p className="text-xs text-gray-500">支持 JPG、PNG、GIF 格式</p>
                </button>
              </div>
              
              {/* 快速选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <i className="fas fa-palette mr-2"></i>快速选择
                </label>
                <div className="grid grid-cols-6 gap-2">
                  {['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'].map((letter) => (
                    <button
                      key={letter}
                      type="button"
                      onClick={() => handleInputChange(field.name, letter)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm transition-all ${
                        value === letter 
                          ? 'bg-blue-600 ring-2 ring-blue-300' 
                          : 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700'
                      }`}
                    >
                      {letter}
                    </button>
                  ))}
                </div>
              </div>
              
              {/* 清除头像 */}
              {value && (
                <div className="pt-2 border-t">
                  <button
                    type="button"
                    onClick={() => handleInputChange(field.name, '')}
                    className="text-sm text-red-600 hover:text-red-800 transition-colors"
                  >
                    <i className="fas fa-trash mr-1"></i>
                    清除头像
                  </button>
                </div>
              )}
            </div>
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
                      key === 'custom-content' ? 'fa-plus-circle' :
                      'fa-user'
                    } mr-2 w-4`}></i>
                    {typeof config.title === 'function' ? config.title() : config.title}
                  </button>
                ))}
              </div>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">数据管理</h3>
                  <div className="space-y-2">
                    <button
                      onClick={() => {
                        setShowSortingPanel(true);
                        setSortingType('projects');
                        // 从localStorage获取项目数据
                        try {
                          const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
                          setSortableItems(projects);
                        } catch (error) {
                          console.error('Failed to load projects for sorting:', error);
                          setSortableItems([]);
                        }
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <i className="fas fa-sort mr-2 w-4"></i>
                      排序管理
                    </button>
                    <button
                      onClick={() => {
                        setShowBatchOperations(true);
                        setBatchType('projects');
                        // 从localStorage获取项目数据
                        try {
                          const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
                          setBatchItems(projects);
                        } catch (error) {
                          console.error('Failed to load projects for batch operations:', error);
                        }
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <i className="fas fa-tasks mr-2 w-4"></i>
                      批量操作
                    </button>
                    <button
                      onClick={() => setShowDataValidation(true)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <i className="fas fa-check-circle mr-2 w-4"></i>
                      数据验证
                    </button>
                    <button
                      onClick={() => setShowVersionManager(true)}
                      className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-100 transition-colors"
                    >
                      <i className="fas fa-history mr-2 w-4"></i>
                      版本管理
                    </button>
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
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800">
                  {typeof formConfigs[activeTab]?.title === 'function' 
                    ? formConfigs[activeTab].title() 
                    : formConfigs[activeTab]?.title}
                </h3>
                
                {/* 项目模板按钮 */}
                {activeTab === 'project' && !isEditing && (
                  <button
                    type="button"
                    onClick={() => setShowProjectTemplates(true)}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    <i className="fas fa-magic mr-2"></i>
                    使用模板
                  </button>
                )}
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {formConfigs[activeTab]?.fields.map((field) => {
                  const fieldKey = `${activeTab}_${field.name}`;
                  const isEditingLabel = editingFieldLabel === fieldKey;
                  const displayLabel = getFieldDisplayLabel(field.name, field.label);
                  const isAdminMode = localStorage.getItem('portfolio_admin_mode') === 'true';
                  
                  return (
                    <div key={field.name}>
                      <div className="flex items-center justify-between mb-2">
                        {isEditingLabel ? (
                          <div className="flex items-center space-x-2 flex-1">
                            <input
                              type="text"
                              value={editingLabelText}
                              onChange={(e) => setEditingLabelText(e.target.value)}
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') saveFieldLabel();
                                if (e.key === 'Escape') cancelEditingFieldLabel();
                              }}
                              className="text-sm font-medium bg-transparent border-b-2 border-blue-500 outline-none flex-1"
                              autoFocus
                            />
                            <button
                              type="button"
                              onClick={saveFieldLabel}
                              className="p-1 text-green-600 hover:bg-green-100 rounded"
                              title="保存"
                            >
                              <i className="fas fa-check text-xs"></i>
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditingFieldLabel}
                              className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                              title="取消"
                            >
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </div>
                        ) : (
                          <label className="block text-sm font-medium text-gray-700 flex items-center group">
                            {displayLabel}
                            {field.required && <span className="text-red-500 ml-1">*</span>}
                            {isAdminMode && (
                              <div className="ml-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center space-x-1">
                                <button
                                  type="button"
                                  onClick={() => startEditingFieldLabel(field.name, field.label)}
                                  className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
                                  title="编辑标签名称"
                                >
                                  <i className="fas fa-edit text-xs"></i>
                                </button>
                                {customFieldLabels[fieldKey] && (
                                  <button
                                    type="button"
                                    onClick={() => resetFieldLabel(field.name, field.label)}
                                    className="p-1 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
                                    title="重置为默认标签"
                                  >
                                    <i className="fas fa-undo text-xs"></i>
                                  </button>
                                )}
                              </div>
                            )}
                          </label>
                        )}
                      </div>
                      {renderField(field)}
                    </div>
                  );
                })}
                
                {/* 社交链接管理 - 仅在个人信息页面显示 */}
                {activeTab === 'personal-info' && (
                  <div className="border-t pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-800">社交链接管理</h3>
                      <button
                        type="button"
                        onClick={() => setShowAddSocialLink(true)}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                      >
                        <i className="fas fa-plus mr-2"></i>
                        添加链接
                      </button>
                    </div>
                    
                    {/* 现有社交链接列表 */}
                    <div className="space-y-3 mb-4">
                      {socialLinks.map((link, index) => (
                        <div key={link.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                          <i className={`${link.icon} ${link.color} text-lg`}></i>
                          <div className="flex-1">
                            <div className="font-medium text-gray-800">{link.platform}</div>
                            <div className="text-sm text-gray-600 truncate">{link.url}</div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <button
                              type="button"
                              onClick={() => {
                                const newLinks = [...socialLinks];
                                if (index > 0) {
                                  [newLinks[index], newLinks[index - 1]] = [newLinks[index - 1], newLinks[index]];
                                  setSocialLinks(newLinks);
                                }
                              }}
                              disabled={index === 0}
                              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                              title="上移"
                            >
                              <i className="fas fa-chevron-up"></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                const newLinks = [...socialLinks];
                                if (index < newLinks.length - 1) {
                                  [newLinks[index], newLinks[index + 1]] = [newLinks[index + 1], newLinks[index]];
                                  setSocialLinks(newLinks);
                                }
                              }}
                              disabled={index === socialLinks.length - 1}
                              className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30"
                              title="下移"
                            >
                              <i className="fas fa-chevron-down"></i>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setSocialLinks(socialLinks.filter(l => l.id !== link.id));
                              }}
                              className="p-1 text-red-400 hover:text-red-600"
                              title="删除"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {socialLinks.length === 0 && (
                      <div className="text-center py-8 text-gray-500">
                        <i className="fas fa-link text-3xl mb-3"></i>
                        <p>暂无社交链接</p>
                        <p className="text-sm">点击"添加链接"开始添加</p>
                      </div>
                    )}
                  </div>
                )}
                
                <div className="flex justify-end space-x-4 pt-6 border-t">
                  {isEditing && (
                    <button
                      type="button"
                      onClick={() => {
                        setFormData({});
                        setIsEditing(false);
                        if (onClearEditing) {
                          onClearEditing();
                        }
                      }}
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <i className="fas fa-times mr-2"></i>
                      取消编辑
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => {
                      if (activeTab === 'personal-info') {
                        // 重置为当前存储的数据
                        try {
                          const stored = localStorage.getItem('portfolio_personal_info');
                          if (stored) {
                            const personalInfo = JSON.parse(stored);
                            const flattenedData = {
                              name: personalInfo.name || '',
                              title: personalInfo.title || '',
                              location: personalInfo.location || '',
                              email: personalInfo.email || '',
                              avatar: personalInfo.avatar || '',
                              'bio.main': personalInfo.bio?.main || '',
                              'bio.detail': personalInfo.bio?.detail || '',
                              researchInterests: Array.isArray(personalInfo.researchInterests) 
                                ? personalInfo.researchInterests.join(', ') 
                                : ''
                            };
                            setFormData(flattenedData);
                            
                            // 重新加载社交链接
                            if (personalInfo.socialLinks) {
                              const links = Object.entries(personalInfo.socialLinks)
                                .filter(([key, value]) => value && value.trim())
                                .map(([platform, url]) => {
                                  const platformInfo = socialPlatforms.find(p => 
                                    p.name.toLowerCase() === platform.toLowerCase() || 
                                    platform.toLowerCase().includes(p.name.toLowerCase())
                                  );
                                  return {
                                    id: Date.now() + Math.random(),
                                    platform: platformInfo ? platformInfo.name : platform,
                                    url: url,
                                    icon: platformInfo ? platformInfo.icon : 'fas fa-link',
                                    color: platformInfo ? platformInfo.color : 'text-gray-500'
                                  };
                                });
                              setSocialLinks(links);
                            } else {
                              setSocialLinks([]);
                            }
                            alert('已重置到上次保存的状态！');
                          } else {
                            // 如果没有存储数据，清空表单
                            setFormData({
                              name: '',
                              title: '',
                              location: '',
                              email: '',
                              avatar: '',
                              'bio.main': '',
                              'bio.detail': '',
                              researchInterests: ''
                            });
                            setSocialLinks([]);
                            alert('没有已保存的数据，已清空表单！');
                          }
                        } catch (error) {
                          console.warn('Failed to reset personal info:', error);
                          // 错误时清空表单
                          setFormData({
                            name: '',
                            title: '',
                            location: '',
                            email: '',
                            avatar: '',
                            'bio.main': '',
                            'bio.detail': '',
                            researchInterests: ''
                          });
                          setSocialLinks([]);
                          alert('重置失败，已清空表单！');
                        }
                      } else {
                        setFormData({});
                        if (isEditing) {
                          setIsEditing(false);
                          if (onClearEditing) {
                            onClearEditing();
                          }
                        }
                      }
                    }}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {activeTab === 'personal-info' ? '重置到已保存状态' : (isEditing ? '重置编辑' : '清空表单')}
                  </button>
                    <button
                      type="submit"
                      className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-colors font-medium"
                    >
                      <i className={`fas ${activeTab === 'personal-info' ? 'fa-save' : (isEditing ? 'fa-save' : 'fa-plus')} mr-2`}></i>
                      {activeTab === 'personal-info' ? '保存个人资料' : (isEditing ? '保存修改' : '添加内容')}
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
        
        {/* 添加社交链接弹窗 */}
        {showAddSocialLink && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
              <div 
                className="p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-800">添加社交链接</h3>
                  <button
                    onClick={() => {
                      setShowAddSocialLink(false);
                      setNewSocialLink({ platform: '', url: '', icon: '', customPlatform: '' });
                    }}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  >
                    <i className="fas fa-times text-gray-600"></i>
                  </button>
                </div>
                
                <div className="space-y-4">
                  {/* 平台选择 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">选择平台</label>
                    <div className="grid grid-cols-3 gap-2 max-h-48 overflow-y-auto">
                      {socialPlatforms.map((platform) => (
                        <button
                          key={platform.name}
                          type="button"
                          onClick={() => {
                            setNewSocialLink({
                              ...newSocialLink,
                              platform: platform.name,
                              icon: platform.icon,
                              customPlatform: platform.name === '自定义' ? '' : platform.name
                            });
                          }}
                          className={`p-3 rounded-lg border-2 transition-colors text-center ${
                            newSocialLink.platform === platform.name
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <i className={`${platform.icon} ${platform.color} text-lg mb-1`}></i>
                          <div className="text-xs font-medium text-gray-700">{platform.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  {/* 自定义平台名称 */}
                  {newSocialLink.platform === '自定义' && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">自定义平台名称</label>
                      <input
                        type="text"
                        value={newSocialLink.customPlatform}
                        onChange={(e) => setNewSocialLink({ ...newSocialLink, customPlatform: e.target.value })}
                        placeholder="输入平台名称"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  )}
                  
                  {/* URL输入 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">链接地址</label>
                    <input
                      type="url"
                      value={newSocialLink.url}
                      onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                      placeholder="https://..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddSocialLink(false);
                      setNewSocialLink({ platform: '', url: '', icon: '', customPlatform: '' });
                    }}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (newSocialLink.platform && newSocialLink.url) {
                        const platformName = newSocialLink.platform === '自定义' 
                          ? newSocialLink.customPlatform 
                          : newSocialLink.platform;
                        
                        const platformInfo = socialPlatforms.find(p => p.name === newSocialLink.platform);
                        
                        const newLink = {
                          id: Date.now() + Math.random(),
                          platform: platformName,
                          url: newSocialLink.url,
                          icon: platformInfo ? platformInfo.icon : 'fas fa-link',
                          color: platformInfo ? platformInfo.color : 'text-gray-500'
                        };
                        
                        setSocialLinks([...socialLinks, newLink]);
                        setShowAddSocialLink(false);
                        setNewSocialLink({ platform: '', url: '', icon: '', customPlatform: '' });
                        
                        // 提示用户记得保存
                        setTimeout(() => {
                          alert('社交链接已添加！请记得点击"保存个人资料"按钮保存更改。');
                        }, 100);
                      }
                    }}
                    disabled={!newSocialLink.platform || !newSocialLink.url || (newSocialLink.platform === '自定义' && !newSocialLink.customPlatform)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <i className="fas fa-plus mr-2"></i>
                    添加
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* 项目模板选择器 */}
        {showProjectTemplates && (
          <ProjectTemplates
            onSelectTemplate={(template) => {
              setFormData(template);
              setShowProjectTemplates(false);
            }}
            onClose={() => setShowProjectTemplates(false)}
          />
        )}

        {/* 排序管理面板 */}
        {showSortingPanel && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[80vh] overflow-hidden">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-gray-800">排序管理</h3>
                  <button
                    onClick={() => setShowSortingPanel(false)}
                    className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  >
                    <i className="fas fa-times text-gray-600"></i>
                  </button>
                </div>
              </div>
              
              {/* 分类选择 */}
              <div className="p-4 border-b bg-gray-50">
                <div className="flex flex-wrap gap-2">
                  {[
                    { key: 'projects', label: '项目经历', icon: 'fa-code' },
                    { key: 'publications', label: '学术论文', icon: 'fa-file-alt' },
                    { key: 'internships', label: '工作经历', icon: 'fa-briefcase' },
                    { key: 'honors', label: '荣誉奖项', icon: 'fa-trophy' },
                    { key: 'academic_blogs', label: '学术博客', icon: 'fa-graduation-cap' },
                    { key: 'engineering_blogs', label: '工程博客', icon: 'fa-cogs' }
                  ].map(category => (
                    <button
                      key={category.key}
                      onClick={() => {
                        setSortingType(category.key);
                        try {
                          const data = JSON.parse(localStorage.getItem(`portfolio_${category.key}`) || '[]');
                          setSortableItems(data);
                        } catch (error) {
                          console.error(`Failed to load ${category.key}:`, error);
                          setSortableItems([]);
                        }
                      }}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        sortingType === category.key
                          ? 'bg-blue-600 text-white'
                          : 'bg-white text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <i className={`fas ${category.icon} mr-2`}></i>
                      {category.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="p-6 overflow-y-auto max-h-[50vh]">
                {sortableItems.length > 0 ? (
                  <div className="space-y-3">
                    {sortableItems.map((item, index) => (
                      <div key={item.id || index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex flex-col space-y-1">
                          <button
                            onClick={() => {
                              if (index > 0) {
                                const newItems = [...sortableItems];
                                [newItems[index], newItems[index - 1]] = [newItems[index - 1], newItems[index]];
                                setSortableItems(newItems);
                              }
                            }}
                            disabled={index === 0}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
                          >
                            <i className="fas fa-chevron-up"></i>
                          </button>
                          <button
                            onClick={() => {
                              if (index < sortableItems.length - 1) {
                                const newItems = [...sortableItems];
                                [newItems[index], newItems[index + 1]] = [newItems[index + 1], newItems[index]];
                                setSortableItems(newItems);
                              }
                            }}
                            disabled={index === sortableItems.length - 1}
                            className="p-1 text-gray-400 hover:text-gray-600 disabled:opacity-30 transition-colors"
                          >
                            <i className="fas fa-chevron-down"></i>
                          </button>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-800">
                            {item.title || item.position || item.award || item.company || '未命名'}
                          </h4>
                          <p className="text-sm text-gray-600">
                            {item.period || item.year || item.date || '时间未知'}
                          </p>
                          {item.category && (
                            <span className="inline-block px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs mt-1">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-500 font-mono">#{index + 1}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <i className="fas fa-inbox text-3xl mb-3"></i>
                    <p>该分类下暂无内容</p>
                    <p className="text-sm mt-1">请先添加内容后再进行排序</p>
                  </div>
                )}
              </div>
              
              <div className="p-6 border-t flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  当前分类：<span className="font-medium">{
                    sortingType === 'projects' ? '项目经历' :
                    sortingType === 'publications' ? '学术论文' :
                    sortingType === 'internships' ? '工作经历' :
                    sortingType === 'honors' ? '荣誉奖项' :
                    sortingType === 'academic_blogs' ? '学术博客' :
                    sortingType === 'engineering_blogs' ? '工程博客' :
                    '未选择'
                  }</span> ({sortableItems.length} 项)
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => setShowSortingPanel(false)}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      if (sortableItems.length > 0) {
                        // 保存排序结果
                        localStorage.setItem(`portfolio_${sortingType}`, JSON.stringify(sortableItems));
                        setShowSortingPanel(false);
                        // 触发页面刷新
                        window.dispatchEvent(new Event('storage'));
                        alert('排序已保存！');
                      } else {
                        alert('没有可排序的内容！');
                      }
                    }}
                    disabled={sortableItems.length === 0}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    保存排序
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 批量操作面板 */}
        {showBatchOperations && (
          <BatchOperations
            items={batchItems}
            type={batchType}
            onBatchDelete={(itemIds) => {
              // 批量删除逻辑
              const currentItems = JSON.parse(localStorage.getItem(`portfolio_${batchType}`) || '[]');
              const filteredItems = currentItems.filter(item => !itemIds.includes(item.id));
              localStorage.setItem(`portfolio_${batchType}`, JSON.stringify(filteredItems));
              window.dispatchEvent(new Event('storage'));
              alert(`成功删除 ${itemIds.length} 个项目！`);
            }}
            onBatchEdit={(itemIds, editData) => {
              // 批量编辑逻辑
              const currentItems = JSON.parse(localStorage.getItem(`portfolio_${batchType}`) || '[]');
              const updatedItems = currentItems.map(item => {
                if (itemIds.includes(item.id)) {
                  const updatedItem = { ...item };
                  Object.keys(editData).forEach(key => {
                    if (editData[key]) {
                      if (key === 'tags' || key === 'skills') {
                        // 处理标签类字段 - 添加而不是替换
                        const existingTags = updatedItem[key] || [];
                        const newTags = editData[key].split(',').map(tag => tag.trim()).filter(tag => tag);
                        updatedItem[key] = [...new Set([...existingTags, ...newTags])];
                      } else {
                        updatedItem[key] = editData[key];
                      }
                    }
                  });
                  updatedItem.updatedAt = new Date().toISOString();
                  return updatedItem;
                }
                return item;
              });
              localStorage.setItem(`portfolio_${batchType}`, JSON.stringify(updatedItems));
              window.dispatchEvent(new Event('storage'));
              alert(`成功修改 ${itemIds.length} 个项目！`);
            }}
            onClose={() => setShowBatchOperations(false)}
          />
        )}

        {/* 数据验证面板 */}
        {showDataValidation && (
          <DataValidation
            onClose={() => setShowDataValidation(false)}
            onValidate={(results) => {
              console.log('Validation results:', results);
            }}
          />
        )}

        {/* 版本管理面板 */}
        {showVersionManager && (
          <VersionManager
            onClose={() => setShowVersionManager(false)}
            onRestore={(version) => {
              console.log('Restored version:', version);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
