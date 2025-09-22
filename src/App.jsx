import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Profile from './components/Profile';
import ArticleList from './components/ArticleList';
import AdminPanel from './components/AdminPanel';
import MediaViewer from './components/MediaViewer';
import AutoBackup from './components/AutoBackup';
import SmartRecommendations from './components/SmartRecommendations';
import SectionTitleEditor from './components/SectionTitleEditor';
import { 
  personalInfo as initialPersonalInfo, 
  recentNews as initialRecentNews, 
  projects as initialProjects, 
  publications as initialPublications, 
  internships as initialInternships, 
  honors as initialHonors, 
  academicBlogs as initialAcademicBlogs, 
  engineeringBlogs as initialEngineeringBlogs 
} from './data/content';

const App = () => {
  // 本地存储键名
  const STORAGE_KEYS = {
    personalInfo: 'portfolio_personal_info',
    recentNews: 'portfolio_recent_news',
    projects: 'portfolio_projects',
    publications: 'portfolio_publications',
    internships: 'portfolio_internships',
    honors: 'portfolio_honors',
    academicBlogs: 'portfolio_academic_blogs',
    engineeringBlogs: 'portfolio_engineering_blogs'
  };

  // 从本地存储加载数据的函数
  const loadFromStorage = (key, defaultValue) => {
    try {
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : defaultValue;
    } catch (error) {
      console.warn(`Failed to load ${key} from localStorage:`, error);
      return defaultValue;
    }
  };

  // 保存到本地存储的函数
  const saveToStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.warn(`Failed to save ${key} to localStorage:`, error);
    }
  };

  // 状态管理
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [learningCategory, setLearningCategory] = useState('academic');
  const [resumeCategory, setResumeCategory] = useState('projects');
  const [resumeTabOrder, setResumeTabOrder] = useState(['projects', 'publications', 'internships', 'honors']);
  const [draggedTab, setDraggedTab] = useState(null);
  
  // 分类导航编辑状态
  const [isEditingTabs, setIsEditingTabs] = useState(false);
  const [editingTabId, setEditingTabId] = useState(null);
  const [editingTabName, setEditingTabName] = useState('');
  const [customTabNames, setCustomTabNames] = useState({});
  
  // 学习记录分页状态
  const [learningPage, setLearningPage] = useState(1);
  const [learningFilter, setLearningFilter] = useState('all');
  const itemsPerPage = 5;
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // 内容数据状态 - 从本地存储初始化
  const [personalInfo, setPersonalInfo] = useState(() => 
    loadFromStorage(STORAGE_KEYS.personalInfo, initialPersonalInfo)
  );
  const [recentNews, setRecentNews] = useState(() => 
    loadFromStorage(STORAGE_KEYS.recentNews, initialRecentNews)
  );
  const [projects, setProjects] = useState(() => 
    loadFromStorage(STORAGE_KEYS.projects, initialProjects)
  );
  const [publications, setPublications] = useState(() => 
    loadFromStorage(STORAGE_KEYS.publications, initialPublications)
  );
  const [internships, setInternships] = useState(() => 
    loadFromStorage(STORAGE_KEYS.internships, initialInternships)
  );
  const [honors, setHonors] = useState(() => 
    loadFromStorage(STORAGE_KEYS.honors, initialHonors)
  );
  const [academicBlogs, setAcademicBlogs] = useState(() => 
    loadFromStorage(STORAGE_KEYS.academicBlogs, initialAcademicBlogs)
  );
  const [engineeringBlogs, setEngineeringBlogs] = useState(() => 
    loadFromStorage(STORAGE_KEYS.engineeringBlogs, initialEngineeringBlogs)
  );

  // 强制刷新组件
  const [refreshKey, setRefreshKey] = useState(0);

  // 监听数据变化并自动保存到本地存储
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.personalInfo, personalInfo);
  }, [personalInfo]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.recentNews, recentNews);
  }, [recentNews]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.projects, projects);
  }, [projects]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.publications, publications);
  }, [publications]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.internships, internships);
  }, [internships]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.honors, honors);
  }, [honors]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.academicBlogs, academicBlogs);
  }, [academicBlogs]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.engineeringBlogs, engineeringBlogs);
  }, [engineeringBlogs]);

  const handleArticleClick = (article) => {
    setSelectedArticle(article);
  };

  const handleCloseArticle = () => {
    setSelectedArticle(null);
  };

  const handlePaperClick = (paper) => {
    setSelectedPaper(paper);
  };

  const handleClosePaper = () => {
    setSelectedPaper(null);
  };

  const handleBlogClick = (blog) => {
    setSelectedBlog(blog);
  };

  const handleCloseBlog = () => {
    setSelectedBlog(null);
  };

  const handleInternshipClick = (internship) => {
    setSelectedInternship(internship);
  };

  const handleCloseInternship = () => {
    setSelectedInternship(null);
  };

  // 内容更新处理函数
  const handleContentUpdate = (type, data, isEditing = false) => {
    // 处理自定义内容
    if (type === 'custom-content') {
      // 自定义内容已在AdminPanel中处理，这里只需要刷新
      setRefreshKey(prev => prev + 1);
      return;
    }
    
    if (isEditing) {
      // 编辑模式：更新现有项目
      const updatedItem = {
        ...data,
        updatedAt: new Date().toISOString()
      };

      switch (type) {
        case 'project':
          setProjects(prev => {
            const updated = prev.map(item => 
              item.id === data.id ? updatedItem : item
            );
            return updated;
          });
          break;
        case 'publication':
          setPublications(prev => {
            const updated = prev.map(item => 
              item.id === data.id ? updatedItem : item
            );
            return updated;
          });
          break;
        case 'internship':
          setInternships(prev => {
            const updated = prev.map(item => 
              item.id === data.id ? updatedItem : item
            );
            return updated;
          });
          break;
        case 'honor':
          setHonors(prev => {
            const updated = prev.map(item => 
              item.id === data.id ? updatedItem : item
            );
            return updated;
          });
          break;
        case 'academic-blog':
          setAcademicBlogs(prev => {
            const updated = prev.map(item => 
              item.id === data.id ? updatedItem : item
            );
            return updated;
          });
          break;
        case 'engineering-blog':
          setEngineeringBlogs(prev => {
            const updated = prev.map(item => 
              item.id === data.id ? updatedItem : item
            );
            return updated;
          });
          break;
      }
    } else {
      // 添加模式：创建新项目
      const newItem = {
        id: Date.now(),
        ...data,
        createdAt: new Date().toISOString()
      };

      switch (type) {
        case 'project':
          setProjects(prev => {
            const updated = [newItem, ...prev];
            return updated;
          });
          break;
        case 'publication':
          setPublications(prev => {
            const updated = [newItem, ...prev];
            return updated;
          });
          break;
        case 'internship':
          setInternships(prev => {
            const updated = [newItem, ...prev];
            return updated;
          });
          break;
        case 'honor':
          setHonors(prev => {
            const updated = [newItem, ...prev];
            return updated;
          });
          break;
        case 'academic-blog':
          newItem.date = new Date().toLocaleDateString('zh-CN');
          setAcademicBlogs(prev => {
            const updated = [newItem, ...prev];
            return updated;
          });
          break;
        case 'engineering-blog':
          newItem.date = new Date().toLocaleDateString('zh-CN');
          setEngineeringBlogs(prev => {
            const updated = [newItem, ...prev];
            return updated;
          });
          break;
        case 'news':
          const newsItem = {
            date: new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: '2-digit' }),
            content: data.content,
            createdAt: new Date().toISOString()
          };
          setRecentNews(prev => {
            const updated = [newsItem, ...prev];
            return updated.slice(0, 5); // 保持最新的5条
          });
          break;
        case 'personal-info':
          setPersonalInfo(prev => {
            const updated = { ...prev, ...data };
            // 触发自定义事件通知Profile组件更新
            setTimeout(() => {
              window.dispatchEvent(new Event('personalInfoUpdated'));
            }, 100);
            return updated;
          });
          break;
      }
    }
    
    // 强制刷新组件
    setRefreshKey(prev => prev + 1);
  };

  // 处理编辑项目
  const handleEditProject = (project) => {
    setEditingItem(project);
    setShowAdminPanel(true);
  };

  // 处理删除项目
  const handleDeleteProject = (projectId) => {
    setProjects(prev => prev.filter(project => project.id !== projectId));
    setRefreshKey(prev => prev + 1);
  };

  // 处理编辑论文
  const handleEditPublication = (publication) => {
    setEditingItem(publication);
    setShowAdminPanel(true);
  };

  // 处理删除论文
  const handleDeletePublication = (publicationId) => {
    setPublications(prev => prev.filter(publication => publication.id !== publicationId));
    setRefreshKey(prev => prev + 1);
  };

  // 处理编辑实习经历
  const handleEditInternship = (internship) => {
    setEditingItem(internship);
    setShowAdminPanel(true);
  };

  // 处理删除实习经历
  const handleDeleteInternship = (internshipId) => {
    setInternships(prev => prev.filter(internship => internship.id !== internshipId));
    setRefreshKey(prev => prev + 1);
  };

  // 处理编辑荣誉奖项
  const handleEditHonor = (honor) => {
    setEditingItem(honor);
    setShowAdminPanel(true);
  };

  // 处理删除荣誉奖项
  const handleDeleteHonor = (honorId) => {
    setHonors(prev => prev.filter(honor => honor.id !== honorId));
    setRefreshKey(prev => prev + 1);
  };

  // 处理编辑博客
  const handleEditBlog = (blog, category) => {
    setEditingItem({ ...blog, category });
    setShowAdminPanel(true);
  };

  // 处理删除博客
  const handleDeleteBlog = (blogId, category) => {
    if (category === 'academic') {
      setAcademicBlogs(prev => prev.filter(blog => blog.id !== blogId));
    } else {
      setEngineeringBlogs(prev => prev.filter(blog => blog.id !== blogId));
    }
    setRefreshKey(prev => prev + 1);
  };

  // 处理编辑动态
  const handleEditNews = (news, index) => {
    setEditingItem({ ...news, index, type: 'news' });
    setShowAdminPanel(true);
  };

  // 处理删除动态
  const handleDeleteNews = (index) => {
    setRecentNews(prev => prev.filter((_, i) => i !== index));
    setRefreshKey(prev => prev + 1);
  };

  // 清除编辑状态
  const handleClearEditing = () => {
    setEditingItem(null);
  };

  // 加载标签页顺序和自定义名称
  useEffect(() => {
    try {
      const storedOrder = localStorage.getItem('portfolio_resume_tab_order');
      if (storedOrder) {
        setResumeTabOrder(JSON.parse(storedOrder));
      }
      
      const storedNames = localStorage.getItem('portfolio_custom_tab_names');
      if (storedNames) {
        setCustomTabNames(JSON.parse(storedNames));
      }
    } catch (error) {
      console.warn('Failed to load tab configuration:', error);
    }
  }, []);

  // 保存自定义标签名称
  const saveCustomTabNames = (names) => {
    setCustomTabNames(names);
    localStorage.setItem('portfolio_custom_tab_names', JSON.stringify(names));
  };

  // 开始编辑标签名称
  const startEditingTab = (tabKey) => {
    const defaultNames = {
      projects: '项目经历',
      publications: '学术论文',
      internships: '工作&实习经历',
      honors: '荣誉奖项'
    };
    
    setEditingTabId(tabKey);
    setEditingTabName(customTabNames[tabKey] || defaultNames[tabKey] || '');
  };

  // 保存标签名称
  const saveTabName = () => {
    if (editingTabId && editingTabName.trim()) {
      const newNames = {
        ...customTabNames,
        [editingTabId]: editingTabName.trim()
      };
      saveCustomTabNames(newNames);
    }
    setEditingTabId(null);
    setEditingTabName('');
  };

  // 取消编辑
  const cancelEditingTab = () => {
    setEditingTabId(null);
    setEditingTabName('');
  };

  // 删除标签
  const deleteTab = (tabKey) => {
    if (window.confirm('确定要删除这个分类吗？删除后该分类下的所有数据仍会保留，但不会在导航中显示。')) {
      const newOrder = resumeTabOrder.filter(key => key !== tabKey);
      setResumeTabOrder(newOrder);
      localStorage.setItem('portfolio_resume_tab_order', JSON.stringify(newOrder));
      
      // 如果删除的是当前选中的标签，切换到第一个标签
      if (resumeCategory === tabKey && newOrder.length > 0) {
        setResumeCategory(newOrder[0]);
      }
    }
  };

  // 添加新标签
  const addNewTab = () => {
    const newTabKey = `custom_${Date.now()}`;
    const newTabName = prompt('请输入新分类的名称：');
    
    if (newTabName && newTabName.trim()) {
      const newOrder = [...resumeTabOrder, newTabKey];
      setResumeTabOrder(newOrder);
      localStorage.setItem('portfolio_resume_tab_order', JSON.stringify(newOrder));
      
      const newNames = {
        ...customTabNames,
        [newTabKey]: newTabName.trim()
      };
      saveCustomTabNames(newNames);
      
      // 切换到新创建的标签
      setResumeCategory(newTabKey);
    }
  };

  // 获取标签显示名称
  const getTabDisplayName = (tabKey) => {
    const defaultNames = {
      projects: '项目经历',
      publications: '学术论文',
      internships: '工作&实习经历',
      honors: '荣誉奖项'
    };
    
    return customTabNames[tabKey] || defaultNames[tabKey] || '自定义分类';
  };

  // 获取标签图标
  const getTabIcon = (tabKey) => {
    const defaultIcons = {
      projects: 'fas fa-code',
      publications: 'fas fa-file-alt',
      internships: 'fas fa-briefcase',
      honors: 'fas fa-trophy'
    };
    
    return defaultIcons[tabKey] || 'fas fa-folder';
  };

  // 监听本地存储变化，实时更新数据
  useEffect(() => {
    const handleStorageChange = () => {
      // 重新加载所有数据
      setPersonalInfo(loadFromStorage(STORAGE_KEYS.personalInfo, initialPersonalInfo));
      setRecentNews(loadFromStorage(STORAGE_KEYS.recentNews, initialRecentNews));
      setProjects(loadFromStorage(STORAGE_KEYS.projects, initialProjects));
      setPublications(loadFromStorage(STORAGE_KEYS.publications, initialPublications));
      setInternships(loadFromStorage(STORAGE_KEYS.internships, initialInternships));
      setHonors(loadFromStorage(STORAGE_KEYS.honors, initialHonors));
      setAcademicBlogs(loadFromStorage(STORAGE_KEYS.academicBlogs, initialAcademicBlogs));
      setEngineeringBlogs(loadFromStorage(STORAGE_KEYS.engineeringBlogs, initialEngineeringBlogs));
      
      setRefreshKey(prev => prev + 1);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // 重置所有数据到初始状态
  const handleResetData = () => {
    if (window.confirm('确定要重置所有数据到初始状态吗？此操作不可撤销！')) {
      // 清除本地存储
      Object.values(STORAGE_KEYS).forEach(key => {
        localStorage.removeItem(key);
      });
      
      // 重置状态到初始值
      setPersonalInfo(initialPersonalInfo);
      setRecentNews(initialRecentNews);
      setProjects(initialProjects);
      setPublications(initialPublications);
      setInternships(initialInternships);
      setHonors(initialHonors);
      setAcademicBlogs(initialAcademicBlogs);
      setEngineeringBlogs(initialEngineeringBlogs);
      
      setRefreshKey(prev => prev + 1);
      alert('数据已重置到初始状态！');
    }
  };

  // 导出数据
  const handleExportData = () => {
    const exportData = {
      personalInfo,
      recentNews,
      projects,
      publications,
      internships,
      honors,
      academicBlogs,
      engineeringBlogs,
      exportTime: new Date().toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // 导入数据
  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedData = JSON.parse(e.target.result);
        
        if (window.confirm('确定要导入数据吗？这将覆盖当前所有数据！')) {
          // 更新状态
          if (importedData.personalInfo) setPersonalInfo(importedData.personalInfo);
          if (importedData.recentNews) setRecentNews(importedData.recentNews);
          if (importedData.projects) setProjects(importedData.projects);
          if (importedData.publications) setPublications(importedData.publications);
          if (importedData.internships) setInternships(importedData.internships);
          if (importedData.honors) setHonors(importedData.honors);
          if (importedData.academicBlogs) setAcademicBlogs(importedData.academicBlogs);
          if (importedData.engineeringBlogs) setEngineeringBlogs(importedData.engineeringBlogs);
          
          setRefreshKey(prev => prev + 1);
          alert('数据导入成功！');
        }
      } catch (error) {
        alert('导入失败：文件格式不正确！');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
    
    // 清空input值，允许重复选择同一文件
    event.target.value = '';
  };

  // 快捷键打开管理面板 (Ctrl/Cmd + Shift + A) - 仅在管理模式下有效
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        // 检查是否已登录管理模式
        const adminStatus = localStorage.getItem('portfolio_admin_mode');
        if (adminStatus === 'true') {
          setShowAdminPanel(true);
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 自动备份组件 */}
      <AutoBackup />
      
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        onOpenAdmin={() => setShowAdminPanel(true)}
      />
      
      <div className="flex min-h-screen">
        {/* 左侧个人信息 - 小屏移动端隐藏，平板及以上显示 */}
        <Profile key={refreshKey} />
        
        {/* 右侧主要内容 */}
        <div className="flex-1 bg-gray-50 sm:ml-0">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
            <div className="bg-white rounded-lg shadow-sm p-4 sm:p-6 lg:p-8">
              {activeSection === 'home' && (
                <div className="space-y-8">
                  <div>
                    <p className="text-gray-700 leading-relaxed text-lg mb-6">
                      {personalInfo.bio.main}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      {personalInfo.bio.detail}
                    </p>
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                      <i className="fas fa-fire text-orange-500 mr-2"></i>
                      最新动态
                    </h3>
                    <div className="space-y-3">
                      {recentNews.map((news, index) => (
                        <div key={index} className="flex items-start space-x-3 group hover:bg-gray-50 rounded-lg p-2 transition-colors">
                          <span className="text-sm text-gray-500 font-mono flex-shrink-0">{news.date}</span>
                          <div className="flex-1 min-w-0">
                            <span className="text-gray-700">{news.content}</span>
                          </div>
                          {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                            <div className="flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0">
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditNews(news, index);
                                }}
                                className="p-1 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded transition-colors"
                                title="编辑动态"
                              >
                                <i className="fas fa-edit text-xs"></i>
                              </button>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (window.confirm('确定要删除这条动态吗？此操作不可撤销！')) {
                                    handleDeleteNews(index);
                                  }
                                }}
                                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="删除动态"
                              >
                                <i className="fas fa-trash text-xs"></i>
                              </button>
                            </div>
                          )}
                        </div>
                      ))}
                      {recentNews.length === 0 && (
                        <div className="text-center py-8 text-gray-500">
                          <i className="fas fa-fire text-2xl mb-2"></i>
                          <p>暂无最新动态</p>
                          <p className="text-sm mt-1">请通过管理面板添加动态</p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}
              
              {activeSection === 'resume' && (
                <div>
          {/* 分类按钮 - 支持编辑功能 */}
          <div className="mb-8 sm:mb-10">
            <div className="flex items-center justify-between mb-6">
              {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                <button
                  onClick={() => setIsEditingTabs(!isEditingTabs)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isEditingTabs 
                      ? 'bg-orange-100 text-orange-700 hover:bg-orange-200' 
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                  title={isEditingTabs ? '退出编辑模式' : '编辑分类'}
                >
                  <i className={`fas ${isEditingTabs ? 'fa-check' : 'fa-edit'} mr-2`}></i>
                  {isEditingTabs ? '完成' : '编辑'}
                </button>
              )}
              
              {localStorage.getItem('portfolio_admin_mode') === 'true' && isEditingTabs && (
                <button
                  onClick={addNewTab}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                  title="添加新分类"
                >
                  <i className="fas fa-plus mr-2"></i>
                  添加分类
                </button>
              )}
            </div>
            
            <div className="flex flex-wrap gap-3 sm:gap-6">
              {resumeTabOrder.map((tabKey, index) => {
                const isAdminMode = localStorage.getItem('portfolio_admin_mode') === 'true';
                const isEditing = editingTabId === tabKey;
                const displayName = getTabDisplayName(tabKey);
                const icon = getTabIcon(tabKey);
                
                return (
                  <div key={tabKey} className="relative group">
                    {isEditing ? (
                      // 编辑模式
                      <div className="flex items-center space-x-2 bg-white border-2 border-blue-500 rounded-lg px-3 py-2">
                        <i className={`${icon} text-blue-600`}></i>
                        <input
                          type="text"
                          value={editingTabName}
                          onChange={(e) => setEditingTabName(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter') saveTabName();
                            if (e.key === 'Escape') cancelEditingTab();
                          }}
                          className="text-sm font-medium bg-transparent border-none outline-none min-w-[80px]"
                          autoFocus
                        />
                        <button
                          onClick={saveTabName}
                          className="p-1 text-green-600 hover:bg-green-100 rounded"
                          title="保存"
                        >
                          <i className="fas fa-check text-xs"></i>
                        </button>
                        <button
                          onClick={cancelEditingTab}
                          className="p-1 text-gray-500 hover:bg-gray-100 rounded"
                          title="取消"
                        >
                          <i className="fas fa-times text-xs"></i>
                        </button>
                      </div>
                    ) : (
                      // 正常显示模式
                      <button
                        draggable={isAdminMode && isEditingTabs}
                        onDragStart={isAdminMode && isEditingTabs ? (e) => {
                          setDraggedTab(tabKey);
                          e.dataTransfer.effectAllowed = 'move';
                        } : undefined}
                        onDragOver={isAdminMode && isEditingTabs ? (e) => {
                          e.preventDefault();
                          e.dataTransfer.dropEffect = 'move';
                        } : undefined}
                        onDrop={isAdminMode && isEditingTabs ? (e) => {
                          e.preventDefault();
                          if (draggedTab && draggedTab !== tabKey) {
                            const newOrder = [...resumeTabOrder];
                            const draggedIndex = newOrder.indexOf(draggedTab);
                            const targetIndex = newOrder.indexOf(tabKey);
                            
                            newOrder.splice(draggedIndex, 1);
                            newOrder.splice(targetIndex, 0, draggedTab);
                            
                            setResumeTabOrder(newOrder);
                            localStorage.setItem('portfolio_resume_tab_order', JSON.stringify(newOrder));
                          }
                          setDraggedTab(null);
                        } : undefined}
                        onDragEnd={isAdminMode && isEditingTabs ? () => setDraggedTab(null) : undefined}
                        onClick={() => !isEditingTabs && setResumeCategory(tabKey)}
                        className={`relative px-5 sm:px-7 py-3 sm:py-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                          isAdminMode && isEditingTabs ? 'cursor-move' : 'cursor-pointer'
                        } ${
                          resumeCategory === tabKey
                            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                        } ${draggedTab === tabKey ? 'opacity-50 scale-95' : ''} ${
                          draggedTab && draggedTab !== tabKey ? 'border-2 border-dashed border-blue-300' : ''
                        }`}
                        title={isAdminMode && isEditingTabs ? "拖拽调整顺序" : displayName}
                      >
                        <i className={`${icon} mr-2`}></i>
                        {displayName}
                        {isAdminMode && isEditingTabs && draggedTab && (
                          <i className="fas fa-arrows-alt ml-2 text-xs opacity-60"></i>
                        )}
                        
                        {/* 编辑按钮 - 只在编辑模式下显示 */}
                        {isAdminMode && isEditingTabs && (
                          <div className="absolute -top-2 -right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startEditingTab(tabKey);
                              }}
                              className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors"
                              title="编辑名称"
                            >
                              <i className="fas fa-edit text-xs"></i>
                            </button>
                            {resumeTabOrder.length > 1 && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteTab(tabKey);
                                }}
                                className="w-6 h-6 bg-red-600 text-white rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                                title="删除分类"
                              >
                                <i className="fas fa-trash text-xs"></i>
                              </button>
                            )}
                          </div>
                        )}
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
            
            {/* 编辑模式提示 */}
            {localStorage.getItem('portfolio_admin_mode') === 'true' && isEditingTabs && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-info-circle text-blue-600 mt-0.5"></i>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-2">编辑模式说明：</p>
                    <ul className="text-xs space-y-1.5">
                      <li>• 拖拽分类按钮可以调整顺序</li>
                      <li>• 点击分类上的编辑图标可以修改名称</li>
                      <li>• 点击删除图标可以移除分类（数据不会丢失）</li>
                      <li>• 点击"添加分类"可以创建新的自定义分类</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

                  {/* 项目经历 */}
                  {resumeCategory === 'projects' && (
                    <ArticleList 
                      onArticleClick={handleArticleClick} 
                      projects={projects}
                      onEditProject={handleEditProject}
                      onDeleteProject={handleDeleteProject}
                      isAdminMode={localStorage.getItem('portfolio_admin_mode') === 'true'}
                    />
                  )}

                  {/* 学术论文 */}
                  {resumeCategory === 'publications' && (
                    <div className="space-y-4">
                      {publications.map((paper, index) => (
                        <div 
                          key={paper.id || index} 
                          className="border-l-4 border-green-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handlePaperClick(paper)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-1">
                                <h3 className="text-lg font-medium text-gray-800 hover:text-green-600 transition-colors">
                                  {paper.title || '未命名论文'}
                                </h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  paper.type === '会议论文' ? 'bg-blue-100 text-blue-700' :
                                  paper.type === '期刊论文' ? 'bg-green-100 text-green-700' :
                                  paper.type === '预印本' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {paper.type || '未知类型'}
                                </span>
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">{paper.authors || '未知作者'}</span>
                                {paper.venue && <span> • {paper.venue}</span>}
                                {paper.year && <span> • {paper.year}</span>}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditPublication(paper);
                                    }}
                                    className="p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                    title="编辑论文"
                                  >
                                    <i className="fas fa-edit text-sm"></i>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (window.confirm('确定要删除这篇论文吗？此操作不可撤销！')) {
                                        handleDeletePublication(paper.id);
                                      }
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="删除论文"
                                  >
                                    <i className="fas fa-trash text-sm"></i>
                                  </button>
                                </>
                              )}
                              <i className="fas fa-chevron-right text-gray-300 hover:text-green-500 transition-colors text-sm"></i>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            {paper.abstract || '暂无摘要'}
                          </p>
                          
                          <div className="flex items-center space-x-4 text-xs text-gray-500">
                            {paper.citations && (
                              <span className="flex items-center">
                                <i className="fas fa-quote-right mr-1"></i>
                                引用 {paper.citations}
                              </span>
                            )}
                            {paper.pdfUrl && (
                              <span className="flex items-center text-blue-600">
                                <i className="fas fa-file-pdf mr-1"></i>
                                PDF
                              </span>
                            )}
                            {paper.codeUrl && (
                              <span className="flex items-center text-green-600">
                                <i className="fas fa-code mr-1"></i>
                                代码
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                      {publications.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-file-alt text-4xl mb-4"></i>
                          <p>暂无学术论文</p>
                          <p className="text-sm mt-2">请通过管理面板添加论文</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 工作&实习经历 */}
                  {resumeCategory === 'internships' && (
                    <div className="space-y-4">
                      {internships.map((internship, index) => (
                        <div 
                          key={internship.id || index} 
                          className="border-l-4 border-purple-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleInternshipClick(internship)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-1">
                                <h3 className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors">
                                  {internship.position || '未命名职位'} @ {internship.company || '未知公司'}
                                </h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  internship.type === '实习' ? 'bg-blue-100 text-blue-700' :
                                  internship.type === '全职' ? 'bg-green-100 text-green-700' :
                                  internship.type === '兼职' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {internship.type || '未知类型'}
                                </span>
                              </div>
                              <div className="text-sm text-gray-500 mb-2 font-mono">
                                {internship.period || '时间未知'}
                                {internship.location && <span> • {internship.location}</span>}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditInternship(internship);
                                    }}
                                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                    title="编辑经历"
                                  >
                                    <i className="fas fa-edit text-sm"></i>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (window.confirm('确定要删除这个工作经历吗？此操作不可撤销！')) {
                                        handleDeleteInternship(internship.id);
                                      }
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="删除经历"
                                  >
                                    <i className="fas fa-trash text-sm"></i>
                                  </button>
                                </>
                              )}
                              <i className="fas fa-chevron-right text-gray-300 hover:text-purple-500 transition-colors text-sm"></i>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            {internship.description || '暂无描述'}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {internship.skills && Array.isArray(internship.skills) ? (
                              internship.skills.map((skill, skillIndex) => (
                                <span 
                                  key={`${skill}-${skillIndex}`}
                                  className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
                                >
                                  {skill}
                                </span>
                              ))
                            ) : (
                              <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                                暂无技能标签
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                      {internships.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-briefcase text-4xl mb-4"></i>
                          <p>暂无工作经历</p>
                          <p className="text-sm mt-2">请通过管理面板添加经历</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 荣誉奖项 */}
                  {resumeCategory === 'honors' && (
                    <div className="space-y-4">
                      {honors.map((honor, index) => (
                        <div 
                          key={honor.id || index} 
                          className="border-l-4 border-yellow-500 pl-6 py-4 hover:bg-gray-50 transition-colors group"
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-1">
                                <h3 className="text-lg font-medium text-gray-800">
                                  {honor.award || '未命名奖项'}
                                </h3>
                                {honor.level && (
                                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                                    honor.level === '国际级' ? 'bg-red-100 text-red-700' :
                                    honor.level === '国家级' ? 'bg-blue-100 text-blue-700' :
                                    honor.level === '省级' ? 'bg-green-100 text-green-700' :
                                    'bg-gray-100 text-gray-700'
                                  }`}>
                                    {honor.level}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-600 mb-2">
                                <span className="font-medium">{honor.organization || '未知机构'}</span>
                                {honor.year && <span> • {honor.year}</span>}
                              </div>
                              {honor.description && (
                                <p className="text-gray-600 text-sm leading-relaxed">
                                  {honor.description}
                                </p>
                              )}
                            </div>
                            {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                              <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleEditHonor(honor);
                                  }}
                                  className="p-2 text-gray-400 hover:text-yellow-600 hover:bg-yellow-50 rounded-lg transition-colors"
                                  title="编辑奖项"
                                >
                                  <i className="fas fa-edit text-sm"></i>
                                </button>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (window.confirm('确定要删除这个奖项吗？此操作不可撤销！')) {
                                      handleDeleteHonor(honor.id);
                                    }
                                  }}
                                  className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                  title="删除奖项"
                                >
                                  <i className="fas fa-trash text-sm"></i>
                                </button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {honors.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-trophy text-4xl mb-4"></i>
                          <p>暂无荣誉奖项</p>
                          <p className="text-sm mt-2">请通过管理面板添加奖项</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 自定义分类内容 */}
                  {resumeCategory.startsWith('custom_') && (
                    <div className="space-y-4">
                      {(() => {
                        // 获取自定义内容
                        const customContent = JSON.parse(localStorage.getItem('portfolio_custom_content') || '[]');
                        const categoryContent = customContent.filter(item => 
                          item.customCategory === resumeCategory
                        );

                        if (categoryContent.length === 0) {
                          return (
                            <div className="text-center py-12 text-gray-500">
                              <i className="fas fa-folder-open text-4xl mb-4"></i>
                              <p>该分类下暂无内容</p>
                              <p className="text-sm mt-2">请通过管理面板添加内容</p>
                              {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                                <button
                                  onClick={() => {
                                    // 设置编辑项目为自定义内容类型
                                    setEditingItem({
                                      customCategory: resumeCategory,
                                      customCategoryName: getTabDisplayName(resumeCategory)
                                    });
                                    setShowAdminPanel(true);
                                  }}
                                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                                >
                                  <i className="fas fa-plus mr-2"></i>
                                  添加内容
                                </button>
                              )}
                            </div>
                          );
                        }

                        return categoryContent.map((item, index) => (
                          <div 
                            key={item.id || index} 
                            className="border-l-4 border-indigo-500 pl-6 py-4 hover:bg-gray-50 transition-colors group"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-1">
                                  <h3 className="text-lg font-medium text-gray-800">
                                    {item.title || '未命名内容'}
                                  </h3>
                                  {item.status && (
                                    <span className={`px-2 py-1 rounded text-xs font-medium ${
                                      item.status === '已完成' ? 'bg-green-100 text-green-700' :
                                      item.status === '进行中' ? 'bg-blue-100 text-blue-700' :
                                      item.status === '已发布' ? 'bg-purple-100 text-purple-700' :
                                      'bg-gray-100 text-gray-700'
                                    }`}>
                                      {item.status}
                                    </span>
                                  )}
                                </div>
                                {item.period && (
                                  <div className="text-sm text-gray-500 mb-2 font-mono">
                                    {item.period}
                                  </div>
                                )}
                              </div>
                              {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setEditingItem({
                                        ...item,
                                        customCategory: resumeCategory,
                                        customCategoryName: getTabDisplayName(resumeCategory)
                                      });
                                      setShowAdminPanel(true);
                                    }}
                                    className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                    title="编辑内容"
                                  >
                                    <i className="fas fa-edit text-sm"></i>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (window.confirm('确定要删除这个内容吗？此操作不可撤销！')) {
                                        // 删除自定义内容
                                        const updatedContent = customContent.filter(c => c.id !== item.id);
                                        localStorage.setItem('portfolio_custom_content', JSON.stringify(updatedContent));
                                        setRefreshKey(prev => prev + 1);
                                      }
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="删除内容"
                                  >
                                    <i className="fas fa-trash text-sm"></i>
                                  </button>
                                </div>
                              )}
                            </div>
                            
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                              {item.description || item.content || '暂无描述'}
                            </p>
                            
                            {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2">
                                {item.tags.map((tag, tagIndex) => (
                                  <span 
                                    key={`${tag}-${tagIndex}`}
                                    className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ));
                      })()}
                    </div>
                  )}
                </div>
              )}

              {activeSection === 'learning' && (
                <div>
                  {/* 学习记录分类按钮 */}
                  <div className="mb-8">
                    <div className="flex flex-wrap gap-3 sm:gap-6">
                      <button
                        onClick={() => setLearningCategory('academic')}
                        className={`px-5 sm:px-7 py-3 sm:py-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                          learningCategory === 'academic'
                            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <i className="fas fa-graduation-cap mr-2"></i>
                        学术研究
                      </button>
                      <button
                        onClick={() => setLearningCategory('engineering')}
                        className={`px-5 sm:px-7 py-3 sm:py-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
                          learningCategory === 'engineering'
                            ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                            : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
                        }`}
                      >
                        <i className="fas fa-cogs mr-2"></i>
                        工程技术
                      </button>
                    </div>
                  </div>

                  {/* 学术研究记录 */}
                  {learningCategory === 'academic' && (
                    <div className="space-y-4">
                      {academicBlogs.map((blog, index) => (
                        <div 
                          key={blog.id || index} 
                          className="border-l-4 border-purple-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleBlogClick(blog)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-1">
                                <h3 className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors">
                                  {blog.title || '未命名博客'}
                                </h3>
                                {blog.category && (
                                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                    {blog.category}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 mb-2 font-mono">
                                {blog.date || '日期未知'}
                                {blog.readTime && <span> • 阅读时间 {blog.readTime}</span>}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditBlog(blog, 'academic');
                                    }}
                                    className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors"
                                    title="编辑博客"
                                  >
                                    <i className="fas fa-edit text-sm"></i>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (window.confirm('确定要删除这篇博客吗？此操作不可撤销！')) {
                                        handleDeleteBlog(blog.id, 'academic');
                                      }
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="删除博客"
                                  >
                                    <i className="fas fa-trash text-sm"></i>
                                  </button>
                                </>
                              )}
                              <i className="fas fa-chevron-right text-gray-300 hover:text-purple-500 transition-colors text-sm"></i>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            {blog.summary || '暂无摘要'}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {blog.tags && Array.isArray(blog.tags) ? (
                              blog.tags.map((tag, tagIndex) => (
                                <span 
                                  key={`${tag}-${tagIndex}`}
                                  className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
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
                      ))}
                      {academicBlogs.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-graduation-cap text-4xl mb-4"></i>
                          <p>暂无学术研究记录</p>
                          <p className="text-sm mt-2">请通过管理面板添加学术博客</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 工程技术记录 */}
                  {learningCategory === 'engineering' && (
                    <div className="space-y-4">
                      {engineeringBlogs.map((blog, index) => (
                        <div 
                          key={blog.id || index} 
                          className="border-l-4 border-orange-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleBlogClick(blog)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-1">
                                <h3 className="text-lg font-medium text-gray-800 hover:text-orange-600 transition-colors">
                                  {blog.title || '未命名博客'}
                                </h3>
                                {blog.category && (
                                  <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium">
                                    {blog.category}
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 mb-2 font-mono">
                                {blog.date || '日期未知'}
                                {blog.readTime && <span> • 阅读时间 {blog.readTime}</span>}
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                                <>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      handleEditBlog(blog, 'engineering');
                                    }}
                                    className="p-2 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
                                    title="编辑博客"
                                  >
                                    <i className="fas fa-edit text-sm"></i>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (window.confirm('确定要删除这篇博客吗？此操作不可撤销！')) {
                                        handleDeleteBlog(blog.id, 'engineering');
                                      }
                                    }}
                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="删除博客"
                                  >
                                    <i className="fas fa-trash text-sm"></i>
                                  </button>
                                </>
                              )}
                              <i className="fas fa-chevron-right text-gray-300 hover:text-orange-500 transition-colors text-sm"></i>
                            </div>
                          </div>
                          
                          <p className="text-gray-600 text-sm leading-relaxed mb-3">
                            {blog.summary || '暂无摘要'}
                          </p>
                          
                          <div className="flex flex-wrap gap-2">
                            {blog.tags && Array.isArray(blog.tags) ? (
                              blog.tags.map((tag, tagIndex) => (
                                <span 
                                  key={`${tag}-${tagIndex}`}
                                  className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-medium"
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
                      ))}
                      {engineeringBlogs.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-cogs text-4xl mb-4"></i>
                          <p>暂无工程技术记录</p>
                          <p className="text-sm mt-2">请通过管理面板添加工程博客</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 项目详情弹窗 */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 text-center flex-1">
                {selectedArticle.title}
              </h2>
              <button
                onClick={handleCloseArticle}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors ml-4 flex-shrink-0"
              >
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto max-h-[calc(95vh-80px)]">
              {/* 项目基本信息 */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {selectedArticle.status || '未知状态'}
                  </span>
                  <span className="text-gray-500 font-mono text-lg">
                    {selectedArticle.period || '时间未知'}
                  </span>
                </div>
                <p className="text-gray-600 text-lg leading-relaxed max-w-4xl mx-auto">
                  {selectedArticle.description}
                </p>
              </div>

              {/* 演示图片 */}
              {selectedArticle.demoImage && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-image text-blue-500 mr-3"></i>
                    项目展示
                  </h3>
                  <div className="max-w-4xl mx-auto">
                    <MediaViewer src={selectedArticle.demoImage} type="image" alt="项目演示图片" className="rounded-2xl shadow-lg" />
                  </div>
                </div>
              )}

              {/* 项目摘要 */}
              {selectedArticle.abstract && (
                <div className="mb-12">
                  <SectionTitleEditor
                    sectionKey={`project_abstract_${selectedArticle.id}`}
                    defaultTitle="项目摘要"
                    icon="fas fa-lightbulb"
                    size="text-2xl"
                    className="mb-6 justify-center"
                  />
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <p className="text-gray-700 leading-relaxed text-center text-lg">
                      {selectedArticle.abstract}
                    </p>
                  </div>
                </div>
              )}

              {/* 技术方法 */}
              {selectedArticle.methodology && (
                <div className="mb-12">
                  <SectionTitleEditor
                    sectionKey={`project_methodology_${selectedArticle.id}`}
                    defaultTitle="技术方法"
                    icon="fas fa-cogs"
                    size="text-2xl"
                    className="mb-6 justify-center"
                  />
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-center text-lg">
                      {selectedArticle.methodology}
                    </p>
                  </div>
                </div>
              )}

              {/* 架构图 */}
              {selectedArticle.architectureImage && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-sitemap text-green-500 mr-3"></i>
                    系统架构
                  </h3>
                  <div className="max-w-4xl mx-auto">
                    <MediaViewer src={selectedArticle.architectureImage} type="image" alt="系统架构图" className="rounded-2xl shadow-lg" />
                  </div>
                </div>
              )}

              {/* 演示视频 */}
              {selectedArticle.demoVideo && (
                <div className="mb-12">
                  <SectionTitleEditor
                    sectionKey={`project_demo_video_${selectedArticle.id}`}
                    defaultTitle="演示视频"
                    icon="fas fa-play-circle"
                    size="text-2xl"
                    className="mb-6 justify-center"
                  />
                  <div className="max-w-4xl mx-auto">
                    <MediaViewer src={selectedArticle.demoVideo} type="video" alt="项目演示视频" className="rounded-2xl shadow-lg" />
                  </div>
                </div>
              )}

              {/* 结果图表 */}
              {selectedArticle.resultsImage && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-chart-line text-purple-500 mr-3"></i>
                    实验结果
                  </h3>
                  <div className="max-w-4xl mx-auto">
                    <MediaViewer src={selectedArticle.resultsImage} type="image" alt="实验结果图表" className="rounded-2xl shadow-lg" />
                  </div>
                </div>
              )}

              {/* 实验结果 */}
              {selectedArticle.results && selectedArticle.results.length > 0 && (
                <div className="mb-12">
                  <SectionTitleEditor
                    sectionKey={`project_results_${selectedArticle.id}`}
                    defaultTitle="实验结果"
                    icon="fas fa-chart-bar"
                    size="text-2xl"
                    className="mb-6 justify-center"
                  />
                  <div className="overflow-x-auto max-w-4xl mx-auto">
                    <table className="w-full border-collapse border border-gray-300 rounded-2xl overflow-hidden shadow-lg">
                      <thead className="bg-gradient-to-r from-green-500 to-green-600 text-white">
                        <tr>
                          <th className="border border-gray-300 px-6 py-4 text-left font-semibold">数据集</th>
                          <th className="border border-gray-300 px-6 py-4 text-left font-semibold">准确率</th>
                          <th className="border border-gray-300 px-6 py-4 text-left font-semibold">提升幅度</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedArticle.results.map((result, index) => (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                            <td className="border border-gray-300 px-6 py-4 font-medium text-gray-900">{result.dataset}</td>
                            <td className="border border-gray-300 px-6 py-4 text-green-600 font-semibold">{result.accuracy}</td>
                            <td className="border border-gray-300 px-6 py-4 text-blue-600 font-semibold">{result.improvement}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* 界面截图 */}
              {selectedArticle.screenshotImage && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-desktop text-indigo-500 mr-3"></i>
                    界面截图
                  </h3>
                  <div className="max-w-4xl mx-auto">
                    <MediaViewer src={selectedArticle.screenshotImage} type="image" alt="界面截图" className="rounded-2xl shadow-lg" />
                  </div>
                </div>
              )}

              {/* 主要成果 */}
              {selectedArticle.achievements && selectedArticle.achievements.length > 0 && (
                <div className="mb-12">
                  <SectionTitleEditor
                    sectionKey={`project_achievements_${selectedArticle.id}`}
                    defaultTitle="主要成果"
                    icon="fas fa-trophy"
                    size="text-2xl"
                    className="mb-6 justify-center"
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {selectedArticle.achievements.map((achievement, index) => (
                      <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-yellow-500 shadow-sm">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <i className="fas fa-star text-white text-sm"></i>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-center flex-1">
                            {achievement}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 技术挑战 */}
              {selectedArticle.challenges && (
                <div className="mb-12">
                  <SectionTitleEditor
                    sectionKey={`project_challenges_${selectedArticle.id}`}
                    defaultTitle="技术挑战"
                    icon="fas fa-exclamation-triangle"
                    size="text-2xl"
                    className="mb-6 justify-center"
                  />
                  <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-center text-lg">
                      {selectedArticle.challenges}
                    </p>
                  </div>
                </div>
              )}

              {/* 项目收获 */}
              {selectedArticle.learnings && (
                <div className="mb-12">
                  <SectionTitleEditor
                    sectionKey={`project_learnings_${selectedArticle.id}`}
                    defaultTitle="项目收获"
                    icon="fas fa-graduation-cap"
                    size="text-2xl"
                    className="mb-6 justify-center"
                  />
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-center text-lg">
                      {selectedArticle.learnings}
                    </p>
                  </div>
                </div>
              )}

              {/* 项目总结 */}
              {selectedArticle.projectSummary && (
                <div className="mb-12">
                  <SectionTitleEditor
                    sectionKey={`project_summary_${selectedArticle.id}`}
                    defaultTitle="项目总结"
                    icon="fas fa-clipboard-check"
                    size="text-2xl"
                    className="mb-6 justify-center"
                  />
                  <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <p className="text-gray-700 leading-relaxed whitespace-pre-line text-center text-lg">
                      {selectedArticle.projectSummary}
                    </p>
                  </div>
                </div>
              )}

              {/* 技术标签 */}
              <div className="mb-12">
                <SectionTitleEditor
                  sectionKey={`project_tech_stack_${selectedArticle.id}`}
                  defaultTitle="技术栈"
                  icon="fas fa-tags"
                  size="text-2xl"
                  className="mb-6 justify-center"
                />
                <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
                  {selectedArticle.tags && selectedArticle.tags.map((tag, index) => (
                    <span key={index} className="px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-lg font-medium shadow-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* 相关链接 */}
              <div className="border-t pt-8">
                <SectionTitleEditor
                  sectionKey={`project_links_${selectedArticle.id}`}
                  defaultTitle="相关链接"
                  icon="fas fa-external-link-alt"
                  size="text-2xl"
                  className="mb-6 justify-center"
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                  {selectedArticle.github && (
                    <a 
                      href={selectedArticle.github} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-6 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-2xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <i className="fab fa-github text-gray-700 text-2xl mr-3"></i>
                      <span className="font-medium text-gray-700">GitHub</span>
                    </a>
                  )}
                  {selectedArticle.demo && (
                    <a 
                      href={selectedArticle.demo} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-6 bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 rounded-2xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <i className="fas fa-external-link-alt text-blue-700 text-2xl mr-3"></i>
                      <span className="font-medium text-blue-700">在线演示</span>
                    </a>
                  )}
                  {selectedArticle.website && (
                    <a 
                      href={selectedArticle.website} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-6 bg-gradient-to-r from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 rounded-2xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <i className="fas fa-globe text-green-700 text-2xl mr-3"></i>
                      <span className="font-medium text-green-700">项目官网</span>
                    </a>
                  )}
                  {selectedArticle.documentation && (
                    <a 
                      href={selectedArticle.documentation} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-6 bg-gradient-to-r from-purple-100 to-purple-200 hover:from-purple-200 hover:to-purple-300 rounded-2xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <i className="fas fa-book text-purple-700 text-2xl mr-3"></i>
                      <span className="font-medium text-purple-700">项目文档</span>
                    </a>
                  )}
                </div>
              </div>

              {/* 智能推荐 */}
              <SmartRecommendations 
                currentItem={selectedArticle}
                currentType="project"
                onItemClick={(item, type) => {
                  if (type === 'project') {
                    setSelectedArticle(item);
                  } else if (type === 'publication') {
                    setSelectedPaper(item);
                  } else if (type.includes('blog')) {
                    setSelectedBlog(item);
                  } else if (type === 'internship') {
                    setSelectedInternship(item);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 论文详情弹窗 */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 text-center flex-1">
                {selectedPaper.title}
              </h2>
              <button
                onClick={handleClosePaper}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors ml-4 flex-shrink-0"
              >
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto max-h-[calc(95vh-80px)]">
              {/* 论文基本信息 */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                    {selectedPaper.type || '未知类型'}
                  </span>
                  <span className="text-gray-500 font-mono text-lg">
                    {selectedPaper.venue} • {selectedPaper.year}
                  </span>
                </div>
                <p className="text-gray-600 text-lg mb-4">
                  <strong>作者：</strong>{selectedPaper.authors}
                </p>
                {selectedPaper.citations && (
                  <p className="text-gray-500">
                    <i className="fas fa-quote-right mr-2"></i>
                    被引用 {selectedPaper.citations} 次
                  </p>
                )}
              </div>

              {/* 论文摘要 */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                  <i className="fas fa-file-alt text-blue-500 mr-3"></i>
                  论文摘要
                </h3>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-4xl mx-auto">
                  <p className="text-gray-700 leading-relaxed text-center text-lg">
                    {selectedPaper.abstract}
                  </p>
                </div>
              </div>

              {/* 详细摘要 */}
              {selectedPaper.fullAbstract && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-align-left text-green-500 mr-3"></i>
                    详细摘要
                  </h3>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <p className="text-gray-700 leading-relaxed text-center text-lg whitespace-pre-line">
                      {selectedPaper.fullAbstract}
                    </p>
                  </div>
                </div>
              )}

              {/* 研究方法 */}
              {selectedPaper.methodology && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-cogs text-purple-500 mr-3"></i>
                    研究方法
                  </h3>
                  <div className="bg-gradient-to-r from-purple-50 to-violet-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <p className="text-gray-700 leading-relaxed text-center text-lg whitespace-pre-line">
                      {selectedPaper.methodology}
                    </p>
                  </div>
                </div>
              )}

              {/* 模型架构图 */}
              {selectedPaper.architectureImage && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-project-diagram text-indigo-500 mr-3"></i>
                    模型架构
                  </h3>
                  <div className="max-w-4xl mx-auto">
                    <MediaViewer src={selectedPaper.architectureImage} type="image" alt="模型架构图" className="rounded-2xl shadow-lg" />
                  </div>
                </div>
              )}

              {/* 实验结果图 */}
              {selectedPaper.resultsImage && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-chart-line text-red-500 mr-3"></i>
                    实验结果
                  </h3>
                  <div className="max-w-4xl mx-auto">
                    <MediaViewer src={selectedPaper.resultsImage} type="image" alt="实验结果图" className="rounded-2xl shadow-lg" />
                  </div>
                </div>
              )}

              {/* 对比分析图 */}
              {selectedPaper.comparisonImage && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-balance-scale text-orange-500 mr-3"></i>
                    对比分析
                  </h3>
                  <div className="max-w-4xl mx-auto">
                    <MediaViewer src={selectedPaper.comparisonImage} type="image" alt="对比分析图" className="rounded-2xl shadow-lg" />
                  </div>
                </div>
              )}

              {/* 研究演示视频 */}
              {selectedPaper.demoVideo && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-play-circle text-red-500 mr-3"></i>
                    研究演示
                  </h3>
                  <div className="max-w-4xl mx-auto">
                    <MediaViewer src={selectedPaper.demoVideo} type="video" alt="研究演示视频" className="rounded-2xl shadow-lg" />
                  </div>
                </div>
              )}

              {/* 主要贡献 */}
              {selectedPaper.contributions && selectedPaper.contributions.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-star text-yellow-500 mr-3"></i>
                    主要贡献
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {selectedPaper.contributions.map((contribution, index) => (
                      <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-yellow-500 shadow-sm">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-white text-sm font-bold">{index + 1}</span>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-center flex-1">
                            {contribution}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 相关链接 */}
              <div className="border-t pt-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                  <i className="fas fa-external-link-alt text-blue-500 mr-3"></i>
                  相关链接
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
                  {selectedPaper.pdfUrl && (
                    <a 
                      href={selectedPaper.pdfUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-6 bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 rounded-2xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <i className="fas fa-file-pdf text-red-700 text-2xl mr-3"></i>
                      <span className="font-medium text-red-700">PDF 下载</span>
                    </a>
                  )}
                  {selectedPaper.arxivUrl && (
                    <a 
                      href={selectedPaper.arxivUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-6 bg-gradient-to-r from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 rounded-2xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <i className="fas fa-archive text-orange-700 text-2xl mr-3"></i>
                      <span className="font-medium text-orange-700">arXiv</span>
                    </a>
                  )}
                  {selectedPaper.codeUrl && (
                    <a 
                      href={selectedPaper.codeUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-6 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-2xl transition-all duration-200 hover:scale-105 shadow-sm hover:shadow-md"
                    >
                      <i className="fab fa-github text-gray-700 text-2xl mr-3"></i>
                      <span className="font-medium text-gray-700">源代码</span>
                    </a>
                  )}
                </div>
              </div>

              {/* 智能推荐 */}
              <SmartRecommendations 
                currentItem={selectedPaper}
                currentType="publication"
                onItemClick={(item, type) => {
                  if (type === 'project') {
                    setSelectedArticle(item);
                  } else if (type === 'publication') {
                    setSelectedPaper(item);
                  } else if (type.includes('blog')) {
                    setSelectedBlog(item);
                  } else if (type === 'internship') {
                    setSelectedInternship(item);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 博客详情弹窗 */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 text-center flex-1">
                {selectedBlog.title}
              </h2>
              <button
                onClick={handleCloseBlog}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors ml-4 flex-shrink-0"
              >
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto max-h-[calc(95vh-80px)]">
              {/* 博客基本信息 */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  {selectedBlog.category && (
                    <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                      {selectedBlog.category}
                    </span>
                  )}
                  <span className="text-gray-500 font-mono text-lg">
                    {selectedBlog.date}
                  </span>
                  {selectedBlog.readTime && (
                    <span className="text-gray-500">
                      <i className="fas fa-clock mr-1"></i>
                      {selectedBlog.readTime}
                    </span>
                  )}
                </div>
              </div>

              {/* 博客摘要 */}
              {selectedBlog.summary && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-quote-left text-blue-500 mr-3"></i>
                    内容摘要
                  </h3>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <p className="text-gray-700 leading-relaxed text-center text-lg">
                      {selectedBlog.summary}
                    </p>
                  </div>
                </div>
              )}

              {/* 博客内容 */}
              {selectedBlog.content && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-file-alt text-green-500 mr-3"></i>
                    详细内容
                  </h3>
                  <div className="bg-gradient-to-r from-gray-50 to-slate-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <div className="text-gray-700 leading-relaxed text-center text-lg whitespace-pre-line">
                      {selectedBlog.content}
                    </div>
                  </div>
                </div>
              )}

              {/* 技术标签 */}
              {selectedBlog.tags && selectedBlog.tags.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-tags text-indigo-500 mr-3"></i>
                    相关标签
                  </h3>
                  <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
                    {selectedBlog.tags.map((tag, index) => (
                      <span key={index} className="px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-lg font-medium shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 智能推荐 */}
              <SmartRecommendations 
                currentItem={selectedBlog}
                currentType="blog"
                onItemClick={(item, type) => {
                  if (type === 'project') {
                    setSelectedArticle(item);
                  } else if (type === 'publication') {
                    setSelectedPaper(item);
                  } else if (type.includes('blog')) {
                    setSelectedBlog(item);
                  } else if (type === 'internship') {
                    setSelectedInternship(item);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 实习经历详情弹窗 */}
      {selectedInternship && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 text-center flex-1">
                {selectedInternship.position} @ {selectedInternship.company}
              </h2>
              <button
                onClick={handleCloseInternship}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors ml-4 flex-shrink-0"
              >
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>
            
            <div className="p-8 overflow-y-auto max-h-[calc(95vh-80px)]">
              {/* 基本信息 */}
              <div className="text-center mb-12">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    {selectedInternship.type || '工作经历'}
                  </span>
                  <span className="text-gray-500 font-mono text-lg">
                    {selectedInternship.period}
                  </span>
                  {selectedInternship.location && (
                    <span className="text-gray-500">
                      <i className="fas fa-map-marker-alt mr-1"></i>
                      {selectedInternship.location}
                    </span>
                  )}
                </div>
                {selectedInternship.department && (
                  <p className="text-gray-600 text-lg">
                    <strong>部门：</strong>{selectedInternship.department}
                  </p>
                )}
              </div>

              {/* 工作描述 */}
              {selectedInternship.description && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-info-circle text-blue-500 mr-3"></i>
                    工作描述
                  </h3>
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <p className="text-gray-700 leading-relaxed text-center text-lg">
                      {selectedInternship.description}
                    </p>
                  </div>
                </div>
              )}

              {/* 工作职责 */}
              {selectedInternship.responsibilities && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-tasks text-green-500 mr-3"></i>
                    工作职责
                  </h3>
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <p className="text-gray-700 leading-relaxed text-center text-lg whitespace-pre-line">
                      {selectedInternship.responsibilities}
                    </p>
                  </div>
                </div>
              )}

              {/* 项目截图 */}
              {selectedInternship.projectImage && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-image text-purple-500 mr-3"></i>
                    项目展示
                  </h3>
                  <div className="max-w-4xl mx-auto">
                    <MediaViewer src={selectedInternship.projectImage} type="image" alt="项目截图" className="rounded-2xl shadow-lg" />
                  </div>
                </div>
              )}

              {/* 工作演示视频 */}
              {selectedInternship.demoVideo && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-play-circle text-red-500 mr-3"></i>
                    工作演示
                  </h3>
                  <div className="max-w-4xl mx-auto">
                    <MediaViewer src={selectedInternship.demoVideo} type="video" alt="工作演示视频" className="rounded-2xl shadow-lg" />
                  </div>
                </div>
              )}

              {/* 成果展示图 */}
              {selectedInternship.resultsImage && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-chart-line text-orange-500 mr-3"></i>
                    成果展示
                  </h3>
                  <div className="max-w-4xl mx-auto">
                    <MediaViewer src={selectedInternship.resultsImage} type="image" alt="成果展示图" className="rounded-2xl shadow-lg" />
                  </div>
                </div>
              )}

              {/* 主要成果 */}
              {selectedInternship.achievements && selectedInternship.achievements.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-trophy text-yellow-500 mr-3"></i>
                    主要成果
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {selectedInternship.achievements.map((achievement, index) => (
                      <div key={index} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-2xl p-6 border-l-4 border-yellow-500 shadow-sm">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <i className="fas fa-star text-white text-sm"></i>
                          </div>
                          <p className="text-gray-700 leading-relaxed text-center flex-1">
                            {achievement}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 工作总结 */}
              {selectedInternship.summary && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-clipboard-check text-indigo-500 mr-3"></i>
                    工作总结
                  </h3>
                  <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
                    <p className="text-gray-700 leading-relaxed text-center text-lg whitespace-pre-line">
                      {selectedInternship.summary}
                    </p>
                  </div>
                </div>
              )}

              {/* 技能标签 */}
              {selectedInternship.skills && selectedInternship.skills.length > 0 && (
                <div className="mb-12">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                    <i className="fas fa-tools text-blue-500 mr-3"></i>
                    技能标签
                  </h3>
                  <div className="flex flex-wrap gap-4 justify-center max-w-4xl mx-auto">
                    {selectedInternship.skills.map((skill, index) => (
                      <span key={index} className="px-6 py-3 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 rounded-full text-lg font-medium shadow-sm">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* 智能推荐 */}
              <SmartRecommendations 
                currentItem={selectedInternship}
                currentType="internship"
                onItemClick={(item, type) => {
                  if (type === 'project') {
                    setSelectedArticle(item);
                  } else if (type === 'publication') {
                    setSelectedPaper(item);
                  } else if (type.includes('blog')) {
                    setSelectedBlog(item);
                  } else if (type === 'internship') {
                    setSelectedInternship(item);
                  }
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* 管理面板 */}
      {showAdminPanel && (
        <AdminPanel
          isVisible={showAdminPanel}
          onClose={() => setShowAdminPanel(false)}
          onContentUpdate={handleContentUpdate}
          onResetData={handleResetData}
          onExportData={handleExportData}
          onImportData={handleImportData}
          editingItem={editingItem}
          onClearEditing={handleClearEditing}
        />
      )}
    </div>
  );
};

export default App;
