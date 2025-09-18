import React, { useState, useEffect } from 'react';
import { ContentManager } from '../utils/contentManager';

const AdminPanel = ({ isVisible, onClose, onContentUpdate, onResetData, onExportData, onImportData }) => {
  const [activeTab, setActiveTab] = useState('manage-projects');
  const [formData, setFormData] = useState({});
  const [message, setMessage] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [currentData, setCurrentData] = useState({
    projects: [],
    publications: [],
    internships: [],
    honors: [],
    academicBlogs: [],
    engineeringBlogs: [],
    recentNews: []
  });

  if (!isVisible) return null;

  // 加载当前数据
  useEffect(() => {
    const loadCurrentData = () => {
      try {
        const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
        const publications = JSON.parse(localStorage.getItem('portfolio_publications') || '[]');
        const internships = JSON.parse(localStorage.getItem('portfolio_internships') || '[]');
        const honors = JSON.parse(localStorage.getItem('portfolio_honors') || '[]');
        const academicBlogs = JSON.parse(localStorage.getItem('portfolio_academic_blogs') || '[]');
        const engineeringBlogs = JSON.parse(localStorage.getItem('portfolio_engineering_blogs') || '[]');
        const recentNews = JSON.parse(localStorage.getItem('portfolio_recent_news') || '[]');
        
        setCurrentData({
          projects,
          publications,
          internships,
          honors,
          academicBlogs,
          engineeringBlogs,
          recentNews
        });
      } catch (error) {
        console.warn('Failed to load current data:', error);
      }
    };

    if (isVisible) {
      loadCurrentData();
    }
  }, [isVisible, activeTab]);

  // 当切换到更新个人资料时，加载当前数据
  useEffect(() => {
    if (activeTab === 'update-profile') {
      try {
        const stored = localStorage.getItem('portfolio_personal_info');
        if (stored) {
          const personalInfo = JSON.parse(stored);
          setFormData({
            name: personalInfo.name || '',
            title: personalInfo.title || '',
            email: personalInfo.email || '',
            location: personalInfo.location || '',
            avatar: personalInfo.avatar || '',
            bioMain: personalInfo.bio?.main || '',
            bioDetail: personalInfo.bio?.detail || '',
            researchInterestsString: personalInfo.researchInterests?.join(', ') || '',
            researchInterests: personalInfo.researchInterests || [],
            githubUrl: personalInfo.socialLinks?.github || '',
            linkedinUrl: personalInfo.socialLinks?.linkedin || '',
            scholarUrl: personalInfo.socialLinks?.scholar || '',
            rssUrl: personalInfo.socialLinks?.rss || ''
          });
        }
      } catch (error) {
        console.warn('Failed to load personal info:', error);
      }
    } else if (editingItem) {
      // 编辑模式下加载项目数据
      loadEditingData();
    } else {
      setFormData({});
      setEditingItem(null);
    }
  }, [activeTab, editingItem]);

  const loadEditingData = () => {
    if (!editingItem) return;
    
    const item = editingItem.data;
    
    if (activeTab.includes('project')) {
      setFormData({
        title: item.title || '',
        period: item.period || '',
        description: item.description || '',
        abstract: item.abstract || '',
        methodology: item.methodology || '',
        tagsString: item.tags?.join(', ') || '',
        tags: item.tags || [],
        status: item.status || '',
        github: item.github || '',
        demo: item.demo || '',
        paper: item.paper || '',
        achievementsString: item.achievements?.join('\n') || '',
        achievements: item.achievements || [],
        resultsString: item.results?.map(r => `${r.dataset || r.metric}|${r.accuracy || r.value}|${r.improvement || r.baseline || ''}`).join('\n') || '',
        results: item.results || [],
        // 媒体文件字段
        demoImage: item.demoImage || '',
        demoVideo: item.demoVideo || '',
        architectureImage: item.architectureImage || '',
        resultsImage: item.resultsImage || '',
        screenshotImage: item.screenshotImage || '',
        demoDescription: item.demoDescription || '',
        projectSummary: item.projectSummary || ''
      });
    } else if (activeTab.includes('publication')) {
      setFormData({
        title: item.title || '',
        authors: item.authors || '',
        venue: item.venue || '',
        year: item.year || '',
        type: item.type || '',
        citations: item.citations || '',
        abstract: item.abstract || '',
        fullAbstract: item.fullAbstract || '',
        methodology: item.methodology || '',
        contributionsString: item.contributions?.join('\n') || '',
        contributions: item.contributions || [],
        resultsString: item.results?.map(r => `${r.dataset}|${r.accuracy}|${r.baseline || ''}`).join('\n') || '',
        results: item.results || [],
        // 媒体文件字段
        architectureImage: item.architectureImage || '',
        resultsImage: item.resultsImage || '',
        comparisonImage: item.comparisonImage || '',
        demoVideo: item.demoVideo || '',
        visualDescription: item.visualDescription || '',
        futureWork: item.futureWork || '',
        pdfUrl: item.pdfUrl || '',
        arxivUrl: item.arxivUrl || '',
        codeUrl: item.codeUrl || '',
        projectUrl: item.projectUrl || ''
      });
    } else if (activeTab.includes('internship')) {
      setFormData({
        company: item.company || '',
        position: item.position || '',
        period: item.period || '',
        location: item.location || '',
        type: item.type || '',
        department: item.department || '',
        description: item.description || '',
        responsibilities: item.responsibilities || '',
        achievementsString: item.achievements?.join('\n') || '',
        achievements: item.achievements || [],
        skillsString: item.skills?.join(', ') || '',
        skills: item.skills || [],
        skillsGainedString: item.skillsGained?.map(s => `${s.name}|${s.description}`).join('\n') || '',
        skillsGained: item.skillsGained || [],
        summary: item.summary || '',
        // 媒体文件字段
        projectImage: item.projectImage || '',
        demoVideo: item.demoVideo || '',
        resultsImage: item.resultsImage || ''
      });
    } else if (activeTab.includes('honor')) {
      setFormData({
        award: item.award || '',
        organization: item.organization || '',
        year: item.year || '',
        description: item.description || ''
      });
    } else if (activeTab.includes('blog')) {
      setFormData({
        title: item.title || '',
        category: item.category || '',
        summary: item.summary || '',
        content: item.content || '',
        tagsString: item.tags?.join(', ') || '',
        tags: item.tags || [],
        readTime: item.readTime || ''
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // 表单验证
    const validateForm = () => {
      switch (activeTab) {
        case 'add-project':
          if (!formData.title?.trim()) return '请填写项目标题';
          if (!formData.period?.trim()) return '请填写项目周期';
          if (!formData.description?.trim()) return '请填写项目描述';
          if (!formData.abstract?.trim()) return '请填写项目摘要';
          if (!formData.methodology?.trim()) return '请填写技术方法';
          if (!formData.achievementsString?.trim()) return '请填写项目成果';
          if (!formData.tagsString?.trim()) return '请填写技术标签';
          if (!formData.status?.trim()) return '请选择项目状态';
          break;
        case 'add-publication':
          if (!formData.title?.trim()) return '请填写论文标题';
          if (!formData.authors?.trim()) return '请填写作者列表';
          if (!formData.venue?.trim()) return '请填写发表会议/期刊';
          if (!formData.year?.trim()) return '请填写发表年份';
          if (!formData.type?.trim()) return '请选择论文类型';
          if (!formData.abstract?.trim()) return '请填写论文摘要';
          if (!formData.fullAbstract?.trim()) return '请填写完整摘要';
          if (!formData.methodology?.trim()) return '请填写研究方法';
          if (!formData.contributionsString?.trim()) return '请填写主要贡献';
          break;
        case 'add-blog':
          if (!formData.title?.trim()) return '请填写博客标题';
          if (!formData.category?.trim()) return '请选择博客分类';
          if (!formData.summary?.trim()) return '请填写博客摘要';
          if (!formData.content?.trim()) return '请填写博客内容';
          if (!formData.tagsString?.trim()) return '请填写标签';
          if (!formData.readTime?.trim()) return '请填写阅读时间';
          break;
        case 'add-internship':
        case 'manage-internships':
          if (!formData.company?.trim()) return '请填写公司名称';
          if (!formData.position?.trim()) return '请填写职位名称';
          if (!formData.period?.trim()) return '请填写工作周期';
          if (!formData.location?.trim()) return '请填写工作地点';
          if (!formData.type?.trim()) return '请选择工作类型';
          if (!formData.description?.trim()) return '请填写工作描述';
          if (!formData.skillsString?.trim()) return '请填写技能标签';
          if (!formData.achievementsString?.trim()) return '请填写主要成果';
          break;
        case 'add-honor':
          if (!formData.award?.trim()) return '请填写奖项名称';
          if (!formData.organization?.trim()) return '请填写颁发机构';
          if (!formData.year?.trim()) return '请填写获奖年份';
          break;
        case 'add-news':
          if (!formData.content?.trim()) return '请填写动态内容';
          break;
        case 'update-profile':
          if (!formData.name?.trim()) return '请填写姓名';
          if (!formData.title?.trim()) return '请填写职位/学校';
          if (!formData.email?.trim()) return '请填写邮箱';
          if (!formData.bioMain?.trim()) return '请填写主要简介';
          break;
      }
      return null;
    };

    const validationError = validateForm();
    if (validationError) {
      setMessage(validationError);
      setTimeout(() => setMessage(''), 3000);
      return;
    }
    
    try {
      if (editingItem) {
        // 编辑模式
        handleUpdate();
      } else {
        // 添加模式
        handleAdd();
      }
      
      setFormData({});
      setEditingItem(null);
      setTimeout(() => setMessage(''), 3000);
      
    } catch (error) {
      setMessage('操作失败：' + error.message);
    }
  };

  const handleAdd = () => {
    switch (activeTab) {
      case 'add-project':
      case 'manage-projects':
        onContentUpdate('project', formData);
        setMessage('项目添加成功！');
        break;
      case 'add-publication':
      case 'manage-publications':
        onContentUpdate('publication', formData);
        setMessage('论文添加成功！');
        break;
      case 'add-internship':
      case 'manage-internships':
        onContentUpdate('internship', formData);
        setMessage('实习经历添加成功！');
        break;
      case 'add-honor':
      case 'manage-honors':
        onContentUpdate('honor', formData);
        setMessage('荣誉奖项添加成功！');
        break;
      case 'add-blog':
      case 'manage-blogs':
        const blogType = formData.category === 'engineering' ? 'engineering-blog' : 'academic-blog';
        onContentUpdate(blogType, formData);
        setMessage('博客添加成功！');
        break;
      case 'add-news':
      case 'manage-news':
        onContentUpdate('news', formData);
        setMessage('动态添加成功！');
        break;
      case 'update-profile':
        const personalInfoUpdate = {
          name: formData.name,
          title: formData.title,
          email: formData.email,
          location: formData.location,
          avatar: formData.avatar,
          bio: {
            main: formData.bioMain,
            detail: formData.bioDetail
          },
          researchInterests: formData.researchInterests || [],
          socialLinks: {
            github: formData.githubUrl,
            linkedin: formData.linkedinUrl,
            scholar: formData.scholarUrl,
            rss: formData.rssUrl
          }
        };
        onContentUpdate('personal-info', personalInfoUpdate);
        setMessage('个人信息更新成功！');
        break;
    }
  };

  const handleUpdate = () => {
    // 更新现有项目
    const updatedData = { ...editingItem.data, ...formData };
    
    // 根据类型更新对应的数据
    let storageKey = '';
    let successMessage = '';
    
    if (activeTab.includes('project')) {
      storageKey = 'portfolio_projects';
      successMessage = '项目更新成功！';
    } else if (activeTab.includes('publication')) {
      storageKey = 'portfolio_publications';
      successMessage = '论文更新成功！';
    } else if (activeTab.includes('internship')) {
      storageKey = 'portfolio_internships';
      successMessage = '实习经历更新成功！';
    } else if (activeTab.includes('honor')) {
      storageKey = 'portfolio_honors';
      successMessage = '荣誉奖项更新成功！';
    } else if (activeTab.includes('blog')) {
      if (formData.category === 'engineering') {
        storageKey = 'portfolio_engineering_blogs';
      } else {
        storageKey = 'portfolio_academic_blogs';
      }
      successMessage = '博客更新成功！';
    }
    
    if (storageKey) {
      try {
        const currentItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const updatedItems = currentItems.map(item => 
          item.id === editingItem.data.id ? updatedData : item
        );
        localStorage.setItem(storageKey, JSON.stringify(updatedItems));
        
        // 触发页面刷新
        window.dispatchEvent(new Event('storage'));
        setMessage(successMessage);
      } catch (error) {
        setMessage('更新失败：' + error.message);
      }
    }
  };

  const handleDelete = (type, item) => {
    if (!window.confirm('确定要删除这个项目吗？此操作不可撤销！')) {
      return;
    }
    
    let storageKey = '';
    let successMessage = '';
    
    switch (type) {
      case 'project':
        storageKey = 'portfolio_projects';
        successMessage = '项目删除成功！';
        break;
      case 'publication':
        storageKey = 'portfolio_publications';
        successMessage = '论文删除成功！';
        break;
      case 'internship':
        storageKey = 'portfolio_internships';
        successMessage = '实习经历删除成功！';
        break;
      case 'honor':
        storageKey = 'portfolio_honors';
        successMessage = '荣誉奖项删除成功！';
        break;
      case 'academic-blog':
        storageKey = 'portfolio_academic_blogs';
        successMessage = '学术博客删除成功！';
        break;
      case 'engineering-blog':
        storageKey = 'portfolio_engineering_blogs';
        successMessage = '工程博客删除成功！';
        break;
      case 'news':
        storageKey = 'portfolio_recent_news';
        successMessage = '动态删除成功！';
        break;
    }
    
    if (storageKey) {
      try {
        const currentItems = JSON.parse(localStorage.getItem(storageKey) || '[]');
        const updatedItems = currentItems.filter(i => i.id !== item.id && i.createdAt !== item.createdAt);
        localStorage.setItem(storageKey, JSON.stringify(updatedItems));
        
        // 重新加载数据
        const loadCurrentData = () => {
          const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
          const publications = JSON.parse(localStorage.getItem('portfolio_publications') || '[]');
          const internships = JSON.parse(localStorage.getItem('portfolio_internships') || '[]');
          const honors = JSON.parse(localStorage.getItem('portfolio_honors') || '[]');
          const academicBlogs = JSON.parse(localStorage.getItem('portfolio_academic_blogs') || '[]');
          const engineeringBlogs = JSON.parse(localStorage.getItem('portfolio_engineering_blogs') || '[]');
          const recentNews = JSON.parse(localStorage.getItem('portfolio_recent_news') || '[]');
          
          setCurrentData({
            projects,
            publications,
            internships,
            honors,
            academicBlogs,
            engineeringBlogs,
            recentNews
          });
        };
        
        loadCurrentData();
        window.dispatchEvent(new Event('storage'));
        setMessage(successMessage);
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('删除失败：' + error.message);
      }
    }
  };

  const handleEdit = (type, item) => {
    setEditingItem({ type, data: item });
    
    // 切换到对应的管理标签页
    if (type === 'project') {
      setActiveTab('manage-projects');
    } else if (type === 'publication') {
      setActiveTab('manage-publications');
    } else if (type === 'internship') {
      setActiveTab('manage-internships');
    } else if (type === 'honor') {
      setActiveTab('manage-honors');
    } else if (type === 'academic-blog' || type === 'engineering-blog') {
      setActiveTab('manage-blogs');
    } else if (type === 'news') {
      setActiveTab('manage-news');
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  // 处理文件上传
  const handleFileUpload = (event, field) => {
    const file = event.target.files[0];
    if (!file) return;

    // 检查文件大小 (限制为 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setMessage('文件大小不能超过 10MB');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // 检查文件类型
    const isImage = file.type.startsWith('image/');
    const isVideo = file.type.startsWith('video/');
    
    if (!isImage && !isVideo) {
      setMessage('只支持图片和视频文件');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    // 创建 FileReader 来读取文件
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataUrl = e.target.result;
      handleInputChange(field, dataUrl);
      setMessage(`${isImage ? '图片' : '视频'}上传成功！`);
      setTimeout(() => setMessage(''), 3000);
    };
    
    reader.onerror = () => {
      setMessage('文件读取失败，请重试');
      setTimeout(() => setMessage(''), 3000);
    };

    reader.readAsDataURL(file);
  };

  // 检测B站链接并转换为嵌入格式
  const processBilibiliUrl = (url) => {
    if (!url) return url;
    
    // B站视频链接格式转换
    const bilibiliRegex = /(?:https?:\/\/)?(?:www\.)?bilibili\.com\/video\/(BV\w+|av\d+)/i;
    const match = url.match(bilibiliRegex);
    
    if (match) {
      const videoId = match[1];
      // 转换为B站嵌入格式
      return `https://player.bilibili.com/player.html?bvid=${videoId}&page=1`;
    }
    
    return url;
  };

  const renderManagementList = (type, items, title, icon) => {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <i className={`${icon} mr-2`}></i>
            {title}
          </h3>
          <button
            onClick={() => {
              setEditingItem(null);
              setFormData({});
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <i className="fas fa-plus mr-2"></i>
            添加新{title.replace('管理', '')}
          </button>
        </div>
        
        {items.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <i className={`${icon} text-4xl mb-4`}></i>
            <p>暂无{title.replace('管理', '')}数据</p>
          </div>
        ) : (
          <div className="space-y-3">
            {items.map((item, index) => (
              <div key={item.id || index} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 mb-1">
                      {item.title || item.award || item.company || item.content || `${title.replace('管理', '')} ${index + 1}`}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      {item.description || item.period || item.organization || item.summary || item.date}
                    </p>
                    {item.tags && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {item.tags.map(tag => (
                          <span 
                            key={`${tag}-${index}`}
                            className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="text-xs text-gray-500">
                      创建时间: {item.createdAt ? new Date(item.createdAt).toLocaleString('zh-CN') : '未知'}
                    </div>
                  </div>
                  <div className="flex space-x-2 ml-4">
                    <button
                      onClick={() => handleEdit(type, item)}
                      className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors text-sm"
                    >
                      <i className="fas fa-edit mr-1"></i>
                      编辑
                    </button>
                    <button
                      onClick={() => handleDelete(type, item)}
                      className="px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-sm"
                    >
                      <i className="fas fa-trash mr-1"></i>
                      删除
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const renderForm = () => {
    const isEditing = editingItem !== null;
    const formTitle = isEditing ? '编辑' : '添加';
    
    switch (activeTab) {
      case 'manage-projects':
        if (!isEditing && !formData.title) {
          return renderManagementList('project', currentData.projects, '项目管理', 'fas fa-code');
        }
        // 继续显示表单
      case 'add-project':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">{formTitle}项目 - 基本信息</h4>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="项目标题 *"
                className="w-full p-3 border rounded-lg"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="项目周期 (如: 2024.01 - 2024.03) *"
                className="w-full p-3 border rounded-lg"
                value={formData.period || ''}
                onChange={(e) => handleInputChange('period', e.target.value)}
                required
              />
              <textarea
                placeholder="项目描述 *"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
              />
              <textarea
                placeholder="项目摘要 (详情页显示) *"
                className="w-full p-3 border rounded-lg h-32"
                value={formData.abstract || ''}
                onChange={(e) => handleInputChange('abstract', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="技术标签 (用逗号分隔) *"
                className="w-full p-3 border rounded-lg"
                value={formData.tagsString || ''}
                onChange={(e) => {
                  handleInputChange('tagsString', e.target.value);
                  handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()));
                }}
                required
              />
              <select
                className="w-full p-3 border rounded-lg"
                value={formData.status || ''}
                onChange={(e) => handleInputChange('status', e.target.value)}
                required
              >
                <option value="">选择项目状态 *</option>
                <option value="已完成">已完成</option>
                <option value="进行中">进行中</option>
                <option value="已上线">已上线</option>
                <option value="论文发表">论文发表</option>
                <option value="生产部署">生产部署</option>
              </select>
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">效果演示 - 媒体文件</h4>
              <p className="text-sm text-orange-700">上传项目演示图片、视频或其他媒体文件</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">演示图片</label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="图片链接 (推荐使用 Unsplash)"
                      className="w-full p-3 border rounded-lg"
                      value={formData.demoImage || ''}
                      onChange={(e) => handleInputChange('demoImage', e.target.value)}
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">或</span>
                      <label className="flex-1">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e, 'demoImage')}
                          className="hidden"
                        />
                        <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                          <i className="fas fa-upload text-gray-400 mr-2"></i>
                          <span className="text-sm text-gray-600">本地上传图片</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    支持: Unsplash, 本地图片 (JPG, PNG, GIF)
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">演示视频</label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="视频链接 (YouTube/B站/Vimeo)"
                      className="w-full p-3 border rounded-lg"
                      value={formData.demoVideo || ''}
                      onChange={(e) => handleInputChange('demoVideo', e.target.value)}
                    />
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-gray-500">或</span>
                      <label className="flex-1">
                        <input
                          type="file"
                          accept="video/*"
                          onChange={(e) => handleFileUpload(e, 'demoVideo')}
                          className="hidden"
                        />
                        <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                          <i className="fas fa-upload text-gray-400 mr-2"></i>
                          <span className="text-sm text-gray-600">本地上传视频</span>
                        </div>
                      </label>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    支持: YouTube, B站, Vimeo, 本地视频 (MP4, WebM)
                  </p>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">演示说明</label>
                <textarea
                  placeholder="演示内容的详细说明，如：功能特性、使用方法、技术亮点等"
                  className="w-full p-3 border rounded-lg h-24"
                  value={formData.demoDescription || ''}
                  onChange={(e) => handleInputChange('demoDescription', e.target.value)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <input
                    type="url"
                    placeholder="架构图链接"
                    className="w-full p-3 border rounded-lg mb-2"
                    value={formData.architectureImage || ''}
                    onChange={(e) => handleInputChange('architectureImage', e.target.value)}
                  />
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'architectureImage')}
                      className="hidden"
                    />
                    <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                      <i className="fas fa-upload text-gray-400 mr-1"></i>
                      <span className="text-xs text-gray-600">本地上传</span>
                    </div>
                  </label>
                </div>
                <div>
                  <input
                    type="url"
                    placeholder="结果图表链接"
                    className="w-full p-3 border rounded-lg mb-2"
                    value={formData.resultsImage || ''}
                    onChange={(e) => handleInputChange('resultsImage', e.target.value)}
                  />
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'resultsImage')}
                      className="hidden"
                    />
                    <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                      <i className="fas fa-upload text-gray-400 mr-1"></i>
                      <span className="text-xs text-gray-600">本地上传</span>
                    </div>
                  </label>
                </div>
                <div>
                  <input
                    type="url"
                    placeholder="界面截图链接"
                    className="w-full p-3 border rounded-lg mb-2"
                    value={formData.screenshotImage || ''}
                    onChange={(e) => handleInputChange('screenshotImage', e.target.value)}
                  />
                  <label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'screenshotImage')}
                      className="hidden"
                    />
                    <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                      <i className="fas fa-upload text-gray-400 mr-1"></i>
                      <span className="text-xs text-gray-600">本地上传</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">详情页内容</h4>
            </div>

            <div className="space-y-4">
              <textarea
                placeholder="技术方法 (详情页技术架构部分显示) *"
                className="w-full p-3 border rounded-lg h-32"
                value={formData.methodology || ''}
                onChange={(e) => handleInputChange('methodology', e.target.value)}
                required
              />
              <textarea
                placeholder="项目成果 (每行一个成果，详情页核心特性显示) *"
                className="w-full p-3 border rounded-lg h-32"
                value={formData.achievementsString || ''}
                onChange={(e) => {
                  handleInputChange('achievementsString', e.target.value);
                  handleInputChange('achievements', e.target.value.split('\n').filter(item => item.trim()));
                }}
                required
              />
              <textarea
                placeholder="性能结果 (格式：数据集名称|准确率|提升幅度，每行一个，如：CIFAR-10|95.2%|+2.1%)"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.resultsString || ''}
                onChange={(e) => {
                  handleInputChange('resultsString', e.target.value);
                  const results = e.target.value.split('\n').filter(line => line.trim()).map(line => {
                    const parts = line.split('|');
                    return {
                      dataset: parts[0]?.trim() || '',
                      accuracy: parts[1]?.trim() || '',
                      improvement: parts[2]?.trim() || ''
                    };
                  });
                  handleInputChange('results', results);
                }}
              />
              <textarea
                placeholder="项目总结 (详情页项目总结部分显示)"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.projectSummary || ''}
                onChange={(e) => handleInputChange('projectSummary', e.target.value)}
              />
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">链接信息</h4>
            </div>

            <div className="space-y-4">
              <input
                type="url"
                placeholder="GitHub 链接"
                className="w-full p-3 border rounded-lg"
                value={formData.github || ''}
                onChange={(e) => handleInputChange('github', e.target.value)}
              />
              <input
                type="url"
                placeholder="在线演示链接"
                className="w-full p-3 border rounded-lg"
                value={formData.demo || ''}
                onChange={(e) => handleInputChange('demo', e.target.value)}
              />
              <input
                type="url"
                placeholder="论文链接 (如果有)"
                className="w-full p-3 border rounded-lg"
                value={formData.paper || ''}
                onChange={(e) => handleInputChange('paper', e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({});
                  setEditingItem(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {isEditing ? '取消编辑' : '重置'}
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {isEditing ? '更新项目' : '添加项目'}
              </button>
            </div>
          </div>
        );

      case 'manage-publications':
        if (!isEditing && !formData.title) {
          return renderManagementList('publication', currentData.publications, '论文管理', 'fas fa-file-alt');
        }
        // 继续显示表单
      case 'add-publication':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">{formTitle}论文 - 基本信息</h4>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="论文标题 *"
                className="w-full p-3 border rounded-lg"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="作者列表 (如: 张三, 李四, 王五) *"
                className="w-full p-3 border rounded-lg"
                value={formData.authors || ''}
                onChange={(e) => handleInputChange('authors', e.target.value)}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="发表会议/期刊 *"
                  className="w-full p-3 border rounded-lg"
                  value={formData.venue || ''}
                  onChange={(e) => handleInputChange('venue', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="发表年份 *"
                  className="w-full p-3 border rounded-lg"
                  value={formData.year || ''}
                  onChange={(e) => handleInputChange('year', e.target.value)}
                  required
                />
                <select
                  className="w-full p-3 border rounded-lg"
                  value={formData.type || ''}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  required
                >
                  <option value="">论文类型 *</option>
                  <option value="会议论文">会议论文</option>
                  <option value="期刊论文">期刊论文</option>
                  <option value="预印本">预印本</option>
                  <option value="专利">专利</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="引用次数 (如: 150)"
                className="w-full p-3 border rounded-lg"
                value={formData.citations || ''}
                onChange={(e) => handleInputChange('citations', e.target.value)}
              />
              <textarea
                placeholder="论文摘要 (简短版本，用于列表显示) *"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.abstract || ''}
                onChange={(e) => handleInputChange('abstract', e.target.value)}
                required
              />
              <textarea
                placeholder="完整摘要 (详情页显示的完整版本) *"
                className="w-full p-3 border rounded-lg h-32"
                value={formData.fullAbstract || ''}
                onChange={(e) => handleInputChange('fullAbstract', e.target.value)}
                required
              />
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">研究内容 - 媒体文件</h4>
              <p className="text-sm text-orange-700">上传模型架构图、实验结果图等</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">模型架构图</label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="架构图链接"
                      className="w-full p-3 border rounded-lg"
                      value={formData.architectureImage || ''}
                      onChange={(e) => handleInputChange('architectureImage', e.target.value)}
                    />
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'architectureImage')}
                        className="hidden"
                      />
                      <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                        <i className="fas fa-upload text-gray-400 mr-2"></i>
                        <span className="text-sm text-gray-600">本地上传架构图</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">实验结果图</label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="结果图链接"
                      className="w-full p-3 border rounded-lg"
                      value={formData.resultsImage || ''}
                      onChange={(e) => handleInputChange('resultsImage', e.target.value)}
                    />
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'resultsImage')}
                        className="hidden"
                      />
                      <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                        <i className="fas fa-upload text-gray-400 mr-2"></i>
                        <span className="text-sm text-gray-600">本地上传结果图</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">对比分析图</label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="对比图链接"
                      className="w-full p-3 border rounded-lg"
                      value={formData.comparisonImage || ''}
                      onChange={(e) => handleInputChange('comparisonImage', e.target.value)}
                    />
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'comparisonImage')}
                        className="hidden"
                      />
                      <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                        <i className="fas fa-upload text-gray-400 mr-2"></i>
                        <span className="text-sm text-gray-600">本地上传对比图</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">演示视频</label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="视频链接 (YouTube/B站/Vimeo)"
                      className="w-full p-3 border rounded-lg"
                      value={formData.demoVideo || ''}
                      onChange={(e) => handleInputChange('demoVideo', e.target.value)}
                    />
                    <label className="block">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileUpload(e, 'demoVideo')}
                        className="hidden"
                      />
                      <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                        <i className="fas fa-upload text-gray-400 mr-2"></i>
                        <span className="text-sm text-gray-600">本地上传视频</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">可视化说明</label>
                <textarea
                  placeholder="对上传的图表、视频等媒体内容的详细说明"
                  className="w-full p-3 border rounded-lg h-24"
                  value={formData.visualDescription || ''}
                  onChange={(e) => handleInputChange('visualDescription', e.target.value)}
                />
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">详情页内容</h4>
            </div>

            <div className="space-y-4">
              <textarea
                placeholder="研究方法 (详情页研究方法部分显示) *"
                className="w-full p-3 border rounded-lg h-32"
                value={formData.methodology || ''}
                onChange={(e) => handleInputChange('methodology', e.target.value)}
                required
              />
              <textarea
                placeholder="主要贡献 (每行一个贡献，详情页主要贡献显示) *"
                className="w-full p-3 border rounded-lg h-32"
                value={formData.contributionsString || ''}
                onChange={(e) => {
                  handleInputChange('contributionsString', e.target.value);
                  handleInputChange('contributions', e.target.value.split('\n').filter(item => item.trim()));
                }}
                required
              />
              <textarea
                placeholder="实验结果 (格式：数据集名称|准确率|基线对比，每行一个，如：CIFAR-10|95.2%|基线: 93.1%)"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.resultsString || ''}
                onChange={(e) => {
                  handleInputChange('resultsString', e.target.value);
                  const results = e.target.value.split('\n').filter(line => line.trim()).map(line => {
                    const parts = line.split('|');
                    return {
                      dataset: parts[0]?.trim() || '',
                      accuracy: parts[1]?.trim() || '',
                      baseline: parts[2]?.trim() || ''
                    };
                  });
                  handleInputChange('results', results);
                }}
              />
              <textarea
                placeholder="后续展望 (详情页后续工作部分显示)"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.futureWork || ''}
                onChange={(e) => handleInputChange('futureWork', e.target.value)}
              />
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">链接信息</h4>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="PDF 链接"
                  className="w-full p-3 border rounded-lg"
                  value={formData.pdfUrl || ''}
                  onChange={(e) => handleInputChange('pdfUrl', e.target.value)}
                />
                <input
                  type="url"
                  placeholder="arXiv 链接"
                  className="w-full p-3 border rounded-lg"
                  value={formData.arxivUrl || ''}
                  onChange={(e) => handleInputChange('arxivUrl', e.target.value)}
                />
                <input
                  type="url"
                  placeholder="代码链接 (GitHub)"
                  className="w-full p-3 border rounded-lg"
                  value={formData.codeUrl || ''}
                  onChange={(e) => handleInputChange('codeUrl', e.target.value)}
                />
                <input
                  type="url"
                  placeholder="项目主页链接"
                  className="w-full p-3 border rounded-lg"
                  value={formData.projectUrl || ''}
                  onChange={(e) => handleInputChange('projectUrl', e.target.value)}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({});
                  setEditingItem(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {isEditing ? '取消编辑' : '重置'}
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                {isEditing ? '更新论文' : '添加论文'}
              </button>
            </div>
          </div>
        );

      case 'manage-internships':
        if (!isEditing && !formData.company) {
          return renderManagementList('internship', currentData.internships, '经历管理', 'fas fa-briefcase');
        }
        // 继续显示表单
      case 'add-internship':
        return (
          <div className="space-y-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">{formTitle}工作&实习经历 - 基本信息</h4>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="公司名称 *"
                  className="w-full p-3 border rounded-lg"
                  value={formData.company || ''}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="职位名称 *"
                  className="w-full p-3 border rounded-lg"
                  value={formData.position || ''}
                  onChange={(e) => handleInputChange('position', e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input
                  type="text"
                  placeholder="工作周期 (如: 2023.06 - 2023.09) *"
                  className="w-full p-3 border rounded-lg"
                  value={formData.period || ''}
                  onChange={(e) => handleInputChange('period', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="工作地点 *"
                  className="w-full p-3 border rounded-lg"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  required
                />
                <select
                  className="w-full p-3 border rounded-lg"
                  value={formData.type || ''}
                  onChange={(e) => handleInputChange('type', e.target.value)}
                  required
                >
                  <option value="">工作类型 *</option>
                  <option value="实习">实习</option>
                  <option value="全职">全职</option>
                  <option value="兼职">兼职</option>
                  <option value="项目合作">项目合作</option>
                </select>
              </div>
              <input
                type="text"
                placeholder="所属部门"
                className="w-full p-3 border rounded-lg"
                value={formData.department || ''}
                onChange={(e) => handleInputChange('department', e.target.value)}
              />
              <textarea
                placeholder="工作描述 (简要描述工作内容和职责) *"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="技能标签 (用逗号分隔) *"
                className="w-full p-3 border rounded-lg"
                value={formData.skillsString || ''}
                onChange={(e) => {
                  handleInputChange('skillsString', e.target.value);
                  handleInputChange('skills', e.target.value.split(',').map(skill => skill.trim()));
                }}
                required
              />
            </div>

            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 mb-2">工作成果展示 - 媒体文件</h4>
              <p className="text-sm text-orange-700">上传项目截图、演示视频等工作成果</p>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">项目截图</label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="项目截图链接"
                      className="w-full p-3 border rounded-lg"
                      value={formData.projectImage || ''}
                      onChange={(e) => handleInputChange('projectImage', e.target.value)}
                    />
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'projectImage')}
                        className="hidden"
                      />
                      <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                        <i className="fas fa-upload text-gray-400 mr-1"></i>
                        <span className="text-xs text-gray-600">本地上传</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">演示视频</label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="演示视频链接"
                      className="w-full p-3 border rounded-lg"
                      value={formData.demoVideo || ''}
                      onChange={(e) => handleInputChange('demoVideo', e.target.value)}
                    />
                    <label className="block">
                      <input
                        type="file"
                        accept="video/*"
                        onChange={(e) => handleFileUpload(e, 'demoVideo')}
                        className="hidden"
                      />
                      <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                        <i className="fas fa-upload text-gray-400 mr-1"></i>
                        <span className="text-xs text-gray-600">本地上传</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">成果展示</label>
                  <div className="space-y-2">
                    <input
                      type="url"
                      placeholder="成果图表链接"
                      className="w-full p-3 border rounded-lg"
                      value={formData.resultsImage || ''}
                      onChange={(e) => handleInputChange('resultsImage', e.target.value)}
                    />
                    <label className="block">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'resultsImage')}
                        className="hidden"
                      />
                      <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                        <i className="fas fa-upload text-gray-400 mr-1"></i>
                        <span className="text-xs text-gray-600">本地上传</span>
                      </div>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2">详情页内容</h4>
            </div>

            <div className="space-y-4">
              <textarea
                placeholder="工作职责 (详细的工作职责描述)"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.responsibilities || ''}
                onChange={(e) => handleInputChange('responsibilities', e.target.value)}
              />
              <textarea
                placeholder="主要成果 (每行一个成果，详情页主要成果显示) *"
                className="w-full p-3 border rounded-lg h-32"
                value={formData.achievementsString || ''}
                onChange={(e) => {
                  handleInputChange('achievementsString', e.target.value);
                  handleInputChange('achievements', e.target.value.split('\n').filter(item => item.trim()));
                }}
                required
              />
              <textarea
                placeholder="技能收获 (格式：技能名称|技能描述，每行一个，如：Python开发|掌握了高级Python编程技巧)"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.skillsGainedString || ''}
                onChange={(e) => {
                  handleInputChange('skillsGainedString', e.target.value);
                  const skillsGained = e.target.value.split('\n').filter(line => line.trim()).map(line => {
                    const parts = line.split('|');
                    return {
                      name: parts[0]?.trim() || '',
                      description: parts[1]?.trim() || ''
                    };
                  });
                  handleInputChange('skillsGained', skillsGained);
                }}
              />
              <textarea
                placeholder="工作总结 (详情页工作总结部分显示)"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.summary || ''}
                onChange={(e) => handleInputChange('summary', e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({});
                  setEditingItem(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {isEditing ? '取消编辑' : '重置'}
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                {isEditing ? '更新经历' : '添加经历'}
              </button>
            </div>
          </div>
        );

      case 'manage-honors':
        if (!isEditing && !formData.award) {
          return renderManagementList('honor', currentData.honors, '荣誉管理', 'fas fa-trophy');
        }
        // 继续显示表单
      case 'add-honor':
        return (
          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 mb-2">{formTitle}荣誉奖项</h4>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="奖项名称 *"
                className="w-full p-3 border rounded-lg"
                value={formData.award || ''}
                onChange={(e) => handleInputChange('award', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="颁发机构 *"
                className="w-full p-3 border rounded-lg"
                value={formData.organization || ''}
                onChange={(e) => handleInputChange('organization', e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="获奖年份 *"
                className="w-full p-3 border rounded-lg"
                value={formData.year || ''}
                onChange={(e) => handleInputChange('year', e.target.value)}
                required
              />
              <textarea
                placeholder="奖项描述 (可选)"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({});
                  setEditingItem(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {isEditing ? '取消编辑' : '重置'}
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                {isEditing ? '更新荣誉' : '添加荣誉'}
              </button>
            </div>
          </div>
        );

      case 'manage-blogs':
        if (!isEditing && !formData.title) {
          return (
            <div className="space-y-6">
              <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
                <h4 className="font-semibold text-indigo-800 mb-2">学习记录管理</h4>
                <p className="text-sm text-indigo-700">管理学术研究和工程技术两类学习记录</p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-graduation-cap text-green-500 mr-2"></i>
                    学术研究记录
                  </h5>
                  {currentData.academicBlogs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                      <i className="fas fa-graduation-cap text-3xl mb-3"></i>
                      <p>暂无学术研究记录</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {currentData.academicBlogs.map((blog, index) => (
                        <div key={blog.id || index} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h6 className="font-medium text-gray-800 mb-1">{blog.title}</h6>
                              <p className="text-sm text-gray-600 mb-2">{blog.summary}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                                <span>{blog.date}</span>
                                <span>{blog.readTime}</span>
                                <span className="px-2 py-1 bg-green-100 text-green-700 rounded">{blog.category}</span>
                              </div>
                              {blog.tags && (
                                <div className="flex flex-wrap gap-1">
                                  {blog.tags.map(tag => (
                                    <span key={`${tag}-${index}`} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <button
                                onClick={() => handleEdit('academic-blog', blog)}
                                className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors text-xs"
                              >
                                <i className="fas fa-edit mr-1"></i>编辑
                              </button>
                              <button
                                onClick={() => handleDelete('academic-blog', blog)}
                                className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-xs"
                              >
                                <i className="fas fa-trash mr-1"></i>删除
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div>
                  <h5 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-cogs text-purple-500 mr-2"></i>
                    工程技术记录
                  </h5>
                  {currentData.engineeringBlogs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                      <i className="fas fa-cogs text-3xl mb-3"></i>
                      <p>暂无工程技术记录</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {currentData.engineeringBlogs.map((blog, index) => (
                        <div key={blog.id || index} className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h6 className="font-medium text-gray-800 mb-1">{blog.title}</h6>
                              <p className="text-sm text-gray-600 mb-2">{blog.summary}</p>
                              <div className="flex items-center space-x-4 text-xs text-gray-500 mb-2">
                                <span>{blog.date}</span>
                                <span>{blog.readTime}</span>
                                <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded">{blog.category}</span>
                              </div>
                              {blog.tags && (
                                <div className="flex flex-wrap gap-1">
                                  {blog.tags.map(tag => (
                                    <span key={`${tag}-${index}`} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                                      {tag}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </div>
                            <div className="flex space-x-2 ml-4">
                              <button
                                onClick={() => handleEdit('engineering-blog', blog)}
                                className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded hover:bg-yellow-200 transition-colors text-xs"
                              >
                                <i className="fas fa-edit mr-1"></i>编辑
                              </button>
                              <button
                                onClick={() => handleDelete('engineering-blog', blog)}
                                className="px-2 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 transition-colors text-xs"
                              >
                                <i className="fas fa-trash mr-1"></i>删除
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => {
                    setEditingItem(null);
                    setFormData({ category: 'academic' });
                  }}
                  className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors mr-4"
                >
                  <i className="fas fa-plus mr-2"></i>
                  添加新的学习记录
                </button>
              </div>
            </div>
          );
        }
        // 继续显示表单
      case 'add-blog':
        return (
          <div className="space-y-6">
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4">
              <h4 className="font-semibold text-indigo-800 mb-2">{formTitle}学习记录</h4>
            </div>
            
            <div className="space-y-4">
              <input
                type="text"
                placeholder="博客标题 *"
                className="w-full p-3 border rounded-lg"
                value={formData.title || ''}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select
                  className="w-full p-3 border rounded-lg"
                  value={formData.category || 'academic'}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  required
                >
                  <option value="academic">学术研究</option>
                  <option value="engineering">工程技术</option>
                </select>
                <input
                  type="text"
                  placeholder="阅读时间 (如: 15分钟) *"
                  className="w-full p-3 border rounded-lg"
                  value={formData.readTime || ''}
                  onChange={(e) => handleInputChange('readTime', e.target.value)}
                  required
                />
              </div>
              <input
                type="text"
                placeholder="标签 (用逗号分隔) *"
                className="w-full p-3 border rounded-lg"
                value={formData.tagsString || ''}
                onChange={(e) => {
                  handleInputChange('tagsString', e.target.value);
                  handleInputChange('tags', e.target.value.split(',').map(tag => tag.trim()));
                }}
                required
              />
              <textarea
                placeholder="博客摘要 *"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.summary || ''}
                onChange={(e) => handleInputChange('summary', e.target.value)}
                required
              />
              <textarea
                placeholder="博客内容 *"
                className="w-full p-3 border rounded-lg h-48"
                value={formData.content || ''}
                onChange={(e) => handleInputChange('content', e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({});
                  setEditingItem(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {isEditing ? '取消编辑' : '重置'}
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              >
                {isEditing ? '更新记录' : '添加记录'}
              </button>
            </div>
          </div>
        );

      case 'manage-news':
        if (!isEditing && !formData.content) {
          return renderManagementList('news', currentData.recentNews, '动态管理', 'fas fa-bullhorn');
        }
        // 继续显示表单
      case 'add-news':
        return (
          <div className="space-y-6">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2">{formTitle}最新动态</h4>
            </div>
            
            <div className="space-y-4">
              <textarea
                placeholder="动态内容 *"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.content || ''}
                onChange={(e) => handleInputChange('content', e.target.value)}
                required
              />
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => {
                  setFormData({});
                  setEditingItem(null);
                }}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {isEditing ? '取消编辑' : '重置'}
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                {isEditing ? '更新动态' : '添加动态'}
              </button>
            </div>
          </div>
        );

      case 'update-profile':
        return (
          <div className="space-y-6">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-4">
              <h4 className="font-semibold text-teal-800 mb-2">更新个人资料</h4>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="姓名 *"
                  className="w-full p-3 border rounded-lg"
                  value={formData.name || ''}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="职位/学校 *"
                  className="w-full p-3 border rounded-lg"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="email"
                  placeholder="邮箱 *"
                  className="w-full p-3 border rounded-lg"
                  value={formData.email || ''}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  required
                />
                <input
                  type="text"
                  placeholder="地点"
                  className="w-full p-3 border rounded-lg"
                  value={formData.location || ''}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">头像</label>
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="头像URL或单个字母 (如: A)"
                    className="w-full p-3 border rounded-lg"
                    value={formData.avatar || ''}
                    onChange={(e) => handleInputChange('avatar', e.target.value)}
                  />
                  <div className="flex items-center space-x-2">
                    <span className="text-xs text-gray-500">或</span>
                    <label className="flex-1">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileUpload(e, 'avatar')}
                        className="hidden"
                      />
                      <div className="w-full p-2 border-2 border-dashed border-gray-300 rounded-lg text-center cursor-pointer hover:border-blue-400 transition-colors">
                        <i className="fas fa-upload text-gray-400 mr-2"></i>
                        <span className="text-sm text-gray-600">本地上传头像</span>
                      </div>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  支持: 图片URL, 本地上传, 或单个字母作为默认头像
                </p>
              </div>
              
              <textarea
                placeholder="主要简介 *"
                className="w-full p-3 border rounded-lg h-24"
                value={formData.bioMain || ''}
                onChange={(e) => handleInputChange('bioMain', e.target.value)}
                required
              />
              <textarea
                placeholder="详细简介"
                className="w-full p-3 border rounded-lg h-32"
                value={formData.bioDetail || ''}
                onChange={(e) => handleInputChange('bioDetail', e.target.value)}
              />
              <input
                type="text"
                placeholder="研究兴趣 (用逗号分隔)"
                className="w-full p-3 border rounded-lg"
                value={formData.researchInterestsString || ''}
                onChange={(e) => {
                  handleInputChange('researchInterestsString', e.target.value);
                  handleInputChange('researchInterests', e.target.value.split(',').map(interest => interest.trim()));
                }}
              />
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h5 className="font-semibold text-gray-800 mb-3">社交链接</h5>
                <div className="space-y-3">
                  <input
                    type="url"
                    placeholder="GitHub 链接"
                    className="w-full p-3 border rounded-lg"
                    value={formData.githubUrl || ''}
                    onChange={(e) => handleInputChange('githubUrl', e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="LinkedIn 链接"
                    className="w-full p-3 border rounded-lg"
                    value={formData.linkedinUrl || ''}
                    onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="Google Scholar 链接"
                    className="w-full p-3 border rounded-lg"
                    value={formData.scholarUrl || ''}
                    onChange={(e) => handleInputChange('scholarUrl', e.target.value)}
                  />
                  <input
                    type="url"
                    placeholder="RSS 链接"
                    className="w-full p-3 border rounded-lg"
                    value={formData.rssUrl || ''}
                    onChange={(e) => handleInputChange('rssUrl', e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => setFormData({})}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                重置
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                更新资料
              </button>
            </div>
          </div>
        );

      case 'data-management':
        return (
          <div className="space-y-6">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">数据管理</h4>
              <p className="text-sm text-gray-600">备份、恢复和重置网站数据</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button
                onClick={onExportData}
                className="p-6 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors text-center"
              >
                <i className="fas fa-download text-blue-600 text-2xl mb-3"></i>
                <h5 className="font-semibold text-blue-800 mb-2">导出数据</h5>
                <p className="text-sm text-blue-600">下载所有数据的备份文件</p>
              </button>
              
              <label className="p-6 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors text-center cursor-pointer">
                <input
                  type="file"
                  accept=".json"
                  onChange={onImportData}
                  className="hidden"
                />
                <i className="fas fa-upload text-green-600 text-2xl mb-3"></i>
                <h5 className="font-semibold text-green-800 mb-2">导入数据</h5>
                <p className="text-sm text-green-600">从备份文件恢复数据</p>
              </label>
              
              <button
                onClick={onResetData}
                className="p-6 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition-colors text-center"
              >
                <i className="fas fa-trash-restore text-red-600 text-2xl mb-3"></i>
                <h5 className="font-semibold text-red-800 mb-2">重置数据</h5>
                <p className="text-sm text-red-600">恢复到初始状态</p>
              </button>
            </div>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <i className="fas fa-exclamation-triangle text-yellow-600 mt-1"></i>
                <div>
                  <h5 className="font-semibold text-yellow-800 mb-1">注意事项</h5>
                  <ul className="text-sm text-yellow-700 space-y-1">
                    <li>• 导出数据会下载包含所有内容的JSON文件</li>
                    <li>• 导入数据会覆盖当前所有数据，请谨慎操作</li>
                    <li>• 重置数据会清除所有自定义内容，恢复到初始状态</li>
                    <li>• 建议定期导出数据进行备份</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <i className="fas fa-cog text-4xl text-gray-400 mb-4"></i>
            <p className="text-gray-500">请选择一个管理选项</p>
          </div>
        );
    }
  };

  const tabs = [
    { id: 'manage-projects', label: '项目管理', icon: 'fas fa-code', shortLabel: '项目' },
    { id: 'manage-publications', label: '论文管理', icon: 'fas fa-file-alt', shortLabel: '论文' },
    { id: 'manage-internships', label: '经历管理', icon: 'fas fa-briefcase', shortLabel: '经历' },
    { id: 'manage-honors', label: '荣誉管理', icon: 'fas fa-trophy', shortLabel: '荣誉' },
    { id: 'manage-blogs', label: '学习记录', icon: 'fas fa-book', shortLabel: '学习' },
    { id: 'manage-news', label: '动态管理', icon: 'fas fa-bullhorn', shortLabel: '动态' },
    { id: 'update-profile', label: '个人资料', icon: 'fas fa-user', shortLabel: '资料' },
    { id: 'data-management', label: '数据管理', icon: 'fas fa-database', shortLabel: '数据' }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4">
      <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-6xl h-[95vh] sm:h-[90vh] flex flex-col">
        {/* 头部 - 移动端优化 */}
        <div className="flex items-center justify-between p-4 sm:p-6 border-b">
          <h2 className="text-lg sm:text-2xl font-bold text-gray-800 flex items-center">
            <i className="fas fa-cog text-blue-500 mr-2 sm:mr-3"></i>
            <span className="hidden sm:inline">内容管理面板</span>
            <span className="sm:hidden">管理面板</span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <i className="fas fa-times text-gray-500 text-lg sm:text-xl"></i>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row flex-1 overflow-hidden">
          {/* 标签栏 - 移动端水平滚动，桌面端垂直 */}
          <div className="sm:w-64 bg-gray-50 border-b sm:border-b-0 sm:border-r overflow-x-auto sm:overflow-y-auto">
            <div className="p-2 sm:p-4">
              <div className="flex sm:flex-col space-x-2 sm:space-x-0 sm:space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-shrink-0 sm:w-full flex items-center space-x-2 sm:space-x-3 px-3 sm:px-4 py-2 sm:py-3 rounded-lg text-left transition-all duration-200 text-sm sm:text-base whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-blue-600 text-white shadow-lg'
                        : 'text-gray-600 hover:bg-white hover:shadow-sm'
                    }`}
                  >
                    <i className={`${tab.icon} text-sm sm:text-lg`}></i>
                    <span className="font-medium sm:hidden">{tab.shortLabel}</span>
                    <span className="font-medium hidden sm:inline">{tab.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 右侧内容区域 - 移动端优化 */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-4 sm:p-6">
              {message && (
                <div className={`mb-4 p-3 rounded-lg ${
                  message.includes('成功') ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {message}
                </div>
              )}
              
              <form onSubmit={handleSubmit}>
                {renderForm()}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
