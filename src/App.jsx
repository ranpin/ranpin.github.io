import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Profile from './components/Profile';
import ArticleList from './components/ArticleList';
import AdminPanel from './components/AdminPanel';
import MediaViewer from './components/MediaViewer';
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
  const [showAdminPanel, setShowAdminPanel] = useState(false);

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
  const handleContentUpdate = (type, data) => {
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
    
    // 强制刷新组件
    setRefreshKey(prev => prev + 1);
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
                        <div key={index} className="flex items-start space-x-3">
                          <span className="text-sm text-gray-500 font-mono">{news.date}</span>
                          <div className="flex-1">
                            <span className="text-gray-700">{news.content}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {activeSection === 'resume' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <i className="fas fa-user text-blue-500 mr-3"></i>
                    个人简历
                  </h2>
                  
                  {/* 分类按钮 */}
                  <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
                    <button
                      onClick={() => setResumeCategory('projects')}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                        resumeCategory === 'projects'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <i className="fas fa-code mr-2"></i>
                      项目经历
                    </button>
                    <button
                      onClick={() => setResumeCategory('publications')}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                        resumeCategory === 'publications'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <i className="fas fa-file-alt mr-2"></i>
                      学术论文
                    </button>
                    <button
                      onClick={() => setResumeCategory('internships')}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                        resumeCategory === 'internships'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <i className="fas fa-briefcase mr-2"></i>
                      实习经历
                    </button>
                    <button
                      onClick={() => setResumeCategory('honors')}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                        resumeCategory === 'honors'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <i className="fas fa-trophy mr-2"></i>
                      荣誉奖项
                    </button>
                  </div>

                  {/* 项目经历 */}
                  {resumeCategory === 'projects' && (
                    <ArticleList onArticleClick={handleArticleClick} projects={projects} />
                  )}

                  {/* 学术论文 */}
                  {resumeCategory === 'publications' && (
                    <div>
                      <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                        <i className="fas fa-file-alt text-blue-500 mr-3"></i>
                        学术论文
                      </h2>
                      <div className="space-y-6">
                        {publications && publications.length > 0 ? (
                          publications.map((paper, index) => (
                            <div key={index} className="border-l-4 border-blue-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                                 onClick={() => handlePaperClick(paper)}>
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors">
                                    {paper.title}
                                  </h3>
                                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium mt-1 inline-block">
                                    {paper.venue}
                                  </span>
                                </div>
                                <i className="fas fa-chevron-right text-gray-300 hover:text-blue-500 transition-colors text-sm"></i>
                              </div>
                              <p className="text-gray-600 text-sm mb-2">{paper.authors}</p>
                              <p className="text-gray-600 text-sm mb-3">{paper.abstract}</p>
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>📄 {paper.type}</span>
                                <span>📅 {paper.year}</span>
                                <span>📊 引用: {paper.citations}</span>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <i className="fas fa-file-alt text-4xl mb-4"></i>
                            <p>暂无论文发表</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

              {/* 工作&实习经历 */}
              {resumeCategory === 'internships' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <i className="fas fa-briefcase text-purple-500 mr-3"></i>
                    工作&实习经历
                  </h2>
                  <div className="space-y-4">
                    {internships && internships.length > 0 ? (
                      internships.map((internship, index) => (
                        <div 
                          key={internship.id || index} 
                          className="border-l-4 border-purple-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                          onClick={() => handleInternshipClick(internship)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-1">
                                <h3 className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors">
                                  {internship.position || '未命名职位'}
                                </h3>
                                <span className={`px-2 py-1 rounded text-xs font-medium ${
                                  internship.type === '全职' ? 'bg-blue-100 text-blue-700' :
                                  internship.type === '实习' ? 'bg-green-100 text-green-700' :
                                  internship.type === '兼职' ? 'bg-yellow-100 text-yellow-700' :
                                  'bg-gray-100 text-gray-700'
                                }`}>
                                  {internship.type || '实习'}
                                </span>
                              </div>
                              <p className="text-gray-700 font-medium mb-1">{internship.company || '未知公司'}</p>
                              <div className="text-sm text-gray-500 mb-2 font-mono">{internship.period || '时间未知'}</div>
                            </div>
                            <i className="fas fa-chevron-right text-gray-300 hover:text-purple-500 transition-colors text-sm"></i>
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
                      ))
                    ) : (
                      <div className="text-center py-12 text-gray-500">
                        <i className="fas fa-briefcase text-4xl mb-4"></i>
                        <p>暂无工作&实习经历</p>
                        <p className="text-sm mt-2">请通过管理面板添加经历</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

                  {/* 荣誉奖项 */}
                  {resumeCategory === 'honors' && (
                    <div>
                      <div className="space-y-4">
                        {honors && honors.length > 0 ? (
                          honors.map((honor, index) => (
                            <div key={index} className="flex items-center space-x-4 p-4 bg-yellow-50 rounded-lg">
                              <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
                                <i className="fas fa-medal text-white"></i>
                              </div>
                              <div className="flex-1">
                                <h3 className="font-medium text-gray-800">{honor.award}</h3>
                                <p className="text-sm text-gray-600">{honor.organization} • {honor.year}</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <div className="text-center py-12 text-gray-500">
                            <i className="fas fa-trophy text-4xl mb-4"></i>
                            <p>暂无荣誉奖项</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {activeSection === 'learning' && (
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                    <i className="fas fa-book text-green-500 mr-3"></i>
                    学习记录
                  </h2>
                  
                  {/* 分类按钮 */}
                  <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
                    <button
                      onClick={() => setLearningCategory('academic')}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                        learningCategory === 'academic'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <i className="fas fa-graduation-cap mr-2"></i>
                      学术研究
                    </button>
                    <button
                      onClick={() => setLearningCategory('engineering')}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-medium transition-all duration-200 text-sm sm:text-base ${
                        learningCategory === 'engineering'
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      <i className="fas fa-cogs mr-2"></i>
                      工程技术
                    </button>
                  </div>

                  {/* 学术研究记录 */}
                  {learningCategory === 'academic' && (
                    <div className="space-y-6" key={`academic-${refreshKey}`}>
                      {academicBlogs && academicBlogs.length > 0 ? (
                        academicBlogs.map((blog, index) => (
                          <div key={index} className="border-l-4 border-green-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                               onClick={() => handleBlogClick(blog)}>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="text-lg font-medium text-gray-800 hover:text-green-600 transition-colors">
                                    {blog.title}
                                  </h3>
                                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                    {blog.category}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                                  <span>📅 {blog.date}</span>
                                  <span>⏱️ {blog.readTime}</span>
                                </div>
                              </div>
                              <i className="fas fa-chevron-right text-gray-300 hover:text-green-500 transition-colors text-sm"></i>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">{blog.summary}</p>
                            <div className="flex flex-wrap gap-2">
                              {blog.tags && blog.tags.length > 0 ? (
                                blog.tags.map((tag) => (
                                  <span key={tag} className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                                    {tag}
                                  </span>
                                ))
                              ) : null}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-graduation-cap text-4xl mb-4"></i>
                          <p>暂无学术论文记录</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 工程技术记录 */}
                  {learningCategory === 'engineering' && (
                    <div className="space-y-6" key={`engineering-${refreshKey}`}>
                      {engineeringBlogs && engineeringBlogs.length > 0 ? (
                        engineeringBlogs.map((blog, index) => (
                          <div key={index} className="border-l-4 border-purple-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                               onClick={() => handleBlogClick(blog)}>
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-2">
                                  <h3 className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors">
                                    {blog.title}
                                  </h3>
                                  <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                    {blog.category}
                                  </span>
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                                  <span>📅 {blog.date}</span>
                                  <span>⏱️ {blog.readTime}</span>
                                </div>
                              </div>
                              <i className="fas fa-chevron-right text-gray-300 hover:text-purple-500 transition-colors text-sm"></i>
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">{blog.summary}</p>
                            <div className="flex flex-wrap gap-2">
                              {blog.tags && blog.tags.length > 0 ? (
                                blog.tags.map((tag) => (
                                  <span key={tag} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                                    {tag}
                                  </span>
                                ))
                              ) : null}
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-cogs text-4xl mb-4"></i>
                          <p>暂无工程技术记录</p>
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

      {/* 项目详情页 */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-gray-50">
          <div className="h-full flex flex-col">
            {/* 简洁的顶部导航 - 移动端优化 */}
            <div className="bg-white shadow-sm px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between">
              <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
                <button 
                  onClick={handleCloseArticle}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                >
                  <i className="fas fa-arrow-left text-gray-600"></i>
                </button>
                <div className="min-w-0 flex-1">
                  <h1 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">{selectedArticle.title}</h1>
                  <p className="text-xs sm:text-sm text-gray-500 truncate">{selectedArticle.period}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
                {selectedArticle.github && (
                  <a href={selectedArticle.github} target="_blank" rel="noopener noreferrer" 
                     className="px-2 sm:px-4 py-1 sm:py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs sm:text-sm">
                    <i className="fab fa-github mr-1 sm:mr-2"></i>
                    <span className="hidden sm:inline">Code</span>
                  </a>
                )}
                {selectedArticle.demo && (
                  <a href={selectedArticle.demo} target="_blank" rel="noopener noreferrer"
                     className="px-2 sm:px-4 py-1 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-xs sm:text-sm">
                    <i className="fas fa-external-link-alt mr-1 sm:mr-2"></i>
                    <span className="hidden sm:inline">Demo</span>
                  </a>
                )}
              </div>
            </div>

            {/* 主要内容区域 - 移动端优化 */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-12">
                {/* Hero Section - 移动端优化 */}
                <div className="text-center mb-8 sm:mb-12 lg:mb-16">
                  <div className="inline-flex items-center px-3 sm:px-4 py-1 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
                    <i className="fas fa-code mr-1 sm:mr-2"></i>
                    {selectedArticle.status}
                  </div>
                  
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight px-4">
                    {selectedArticle.title}
                  </h1>
                  
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6 mb-6 sm:mb-8 text-gray-600 text-sm sm:text-base">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{selectedArticle.period}</span>
                    </div>
                    {selectedArticle.github && (
                      <div className="flex items-center space-x-2">
                        <i className="fab fa-github"></i>
                        <span>开源项目</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center flex-wrap gap-2 sm:gap-3 mb-8 sm:mb-12 px-4">
                    {selectedArticle.tags.map((tag) => (
                      <span key={tag} className="px-3 sm:px-4 py-1 sm:py-2 bg-gray-100 text-gray-700 rounded-full text-xs sm:text-sm font-medium">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 摘要 - 移动端优化 */}
                <div className="mb-8 sm:mb-12 lg:mb-16">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl sm:rounded-2xl p-1 sm:p-2 shadow-sm">
                    <div className="bg-white rounded-lg sm:rounded-xl p-4 sm:p-6 lg:p-8">
                      <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-4 sm:mb-6 text-center flex items-center justify-center">
                        <i className="fas fa-lightbulb text-blue-500 mr-2 sm:mr-3"></i>
                        项目摘要
                      </h2>
                      <p className="text-sm sm:text-base lg:text-lg text-gray-700 leading-relaxed text-center">
                        {selectedArticle.abstract}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 效果演示 - 移动端优化 */}
                <div className="mb-8 sm:mb-12 lg:mb-16">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 text-center">效果演示</h2>
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6 lg:p-8">
                    {/* 演示图片 */}
                    {selectedArticle.demoImage && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">项目截图</h3>
                        <MediaViewer 
                          src={selectedArticle.demoImage} 
                          type="image" 
                          alt="项目演示图片"
                          className="shadow-lg"
                        />
                      </div>
                    )}
                    
                    {/* 演示视频 */}
                    {selectedArticle.demoVideo && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">演示视频</h3>
                        <MediaViewer 
                          src={selectedArticle.demoVideo} 
                          type="video" 
                          alt="项目演示视频"
                          className="shadow-lg"
                        />
                      </div>
                    )}
                    
                    {/* 架构图 */}
                    {selectedArticle.architectureImage && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">系统架构</h3>
                        <MediaViewer 
                          src={selectedArticle.architectureImage} 
                          type="image" 
                          alt="系统架构图"
                          className="shadow-lg"
                        />
                      </div>
                    )}
                    
                    {/* 结果图表 */}
                    {selectedArticle.resultsImage && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">实验结果</h3>
                        <MediaViewer 
                          src={selectedArticle.resultsImage} 
                          type="image" 
                          alt="实验结果图表"
                          className="shadow-lg"
                        />
                      </div>
                    )}
                    
                    {/* 界面截图 */}
                    {selectedArticle.screenshotImage && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">界面展示</h3>
                        <MediaViewer 
                          src={selectedArticle.screenshotImage} 
                          type="image" 
                          alt="界面截图"
                          className="shadow-lg"
                        />
                      </div>
                    )}
                    
                    {/* 演示说明 */}
                    {selectedArticle.demoDescription && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">功能说明</h3>
                        <p className="text-gray-700 leading-relaxed">{selectedArticle.demoDescription}</p>
                      </div>
                    )}
                    
                    {/* 如果没有任何媒体文件，显示默认内容 */}
                    {!selectedArticle.demoImage && !selectedArticle.demoVideo && !selectedArticle.architectureImage && !selectedArticle.resultsImage && !selectedArticle.screenshotImage && (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <i className="fas fa-play text-white text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">项目演示</h3>
                        <p className="text-gray-600 mb-6">演示图片、视频或交互式内容将在此处显示</p>
                      </div>
                    )}
                    
                    {/* 在线演示链接 */}
                    {selectedArticle.demo && (
                      <div className="text-center pt-6 border-t">
                        <a href={selectedArticle.demo} target="_blank" rel="noopener noreferrer"
                           className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                          <i className="fas fa-external-link-alt mr-2"></i>
                          查看在线演示
                        </a>
                      </div>
                    )}
                  </div>
                </div>

                {/* 主要贡献/成果 - 移动端优化 */}
                {selectedArticle.achievements && selectedArticle.achievements.length > 0 && (
                  <div className="mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 text-center">主要贡献</h2>
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6 lg:p-8">
                      <div className="space-y-4 sm:space-y-6">
                        {selectedArticle.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start space-x-3 sm:space-x-4">
                            <div className="flex-shrink-0 w-6 h-6 sm:w-8 sm:h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 技术方法 - 移动端优化 */}
                <div className="mb-8 sm:mb-12 lg:mb-16">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 text-center">技术方法</h2>
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6 lg:p-8">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">{selectedArticle.methodology}</p>
                  </div>
                </div>

                {/* 实验结果 - 移动端优化 */}
                {selectedArticle.results && selectedArticle.results.length > 0 && (
                  <div className="mb-8 sm:mb-12 lg:mb-16">
                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 text-center">实验结果</h2>
                    <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border overflow-hidden">
                      {/* 移动端卡片式布局 */}
                      <div className="block sm:hidden">
                        <div className="divide-y divide-gray-100">
                          {selectedArticle.results.map((result, index) => (
                            <div key={index} className="p-4">
                              <div className="font-medium text-gray-900 mb-2">
                                {result.dataset || result.metric}
                              </div>
                              <div className="flex justify-between items-center">
                                <span className="text-sm text-gray-900 font-semibold">
                                  {result.accuracy || result.value}
                                </span>
                                <div className="text-sm">
                                  {result.improvement && (
                                    <span className="text-green-600 font-semibold">{result.improvement}</span>
                                  )}
                                  {result.baseline && (
                                    <div className="text-gray-500">基线: {result.baseline}</div>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* 桌面端表格布局 */}
                      <table className="w-full hidden sm:table">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                              数据集/指标
                            </th>
                            <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                              结果
                            </th>
                            <th className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-left text-xs sm:text-sm font-semibold text-gray-700 uppercase tracking-wider">
                              提升/基线
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                          {selectedArticle.results.map((result, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-xs sm:text-sm font-medium text-gray-900">
                                {result.dataset || result.metric}
                              </td>
                              <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-xs sm:text-sm text-gray-900 font-semibold">
                                {result.accuracy || result.value}
                              </td>
                              <td className="px-4 sm:px-6 lg:px-8 py-3 sm:py-4 text-xs sm:text-sm text-gray-900">
                                {result.improvement && (
                                  <span className="text-green-600 font-semibold">{result.improvement}</span>
                                )}
                                {result.baseline && (
                                  <span className="text-gray-500">基线: {result.baseline}</span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 项目总结 - 移动端优化 */}
                <div className="mb-8 sm:mb-12 lg:mb-16">
                  <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 lg:mb-8 text-center">项目总结</h2>
                  <div className="bg-white rounded-xl sm:rounded-2xl shadow-sm border p-4 sm:p-6 lg:p-8">
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base lg:text-lg">
                      {selectedArticle.projectSummary || selectedArticle.description}
                    </p>
                  </div>
                </div>

                {/* 操作按钮 - 移动端优化 */}
                <div className="text-center">
                  <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                    {selectedArticle.github && (
                      <a href={selectedArticle.github} target="_blank" rel="noopener noreferrer" 
                         className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm sm:text-base">
                        <i className="fab fa-github mr-2"></i>
                        查看代码
                      </a>
                    )}
                    {selectedArticle.demo && (
                      <a href={selectedArticle.demo} target="_blank" rel="noopener noreferrer"
                         className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm sm:text-base">
                        <i className="fas fa-external-link-alt mr-2"></i>
                        在线演示
                      </a>
                    )}
                    <button 
                      onClick={handleCloseArticle}
                      className="w-full sm:w-auto inline-flex items-center justify-center px-4 sm:px-6 py-2 sm:py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium text-sm sm:text-base"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      返回列表
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 论文详情页 */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 bg-gray-50">
          <div className="h-full flex flex-col">
            {/* 简洁的顶部导航 */}
            <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleClosePaper}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="fas fa-arrow-left text-gray-600"></i>
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">{selectedPaper.title}</h1>
                  <p className="text-sm text-gray-500">{selectedPaper.venue} {selectedPaper.year}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                {selectedPaper.pdfUrl && (
                  <a href={selectedPaper.pdfUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm">
                    <i className="fas fa-file-pdf mr-2"></i>PDF
                  </a>
                )}
                <a href="#" className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm">
                  <i className="fas fa-quote-left mr-2"></i>Cite
                </a>
              </div>
            </div>

            {/* 主要内容区域 */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-5xl mx-auto px-8 py-12">
                {/* Hero Section - 美化的标题区域 */}
                <div className="text-center mb-16">
                  <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
                    <i className="fas fa-file-alt mr-2"></i>
                    {selectedPaper.type}
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {selectedPaper.title}
                  </h1>
                  
                  <div className="text-lg text-gray-600 mb-8">
                    {selectedPaper.authors}
                  </div>

                  <div className="flex justify-center items-center space-x-6 mb-8 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-university"></i>
                      <span>{selectedPaper.venue}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{selectedPaper.year}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-quote-right"></i>
                      <span>{selectedPaper.citations} 引用</span>
                    </div>
                  </div>
                </div>

                {/* 摘要 - 美化设计 */}
                <div className="mb-16">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-2 shadow-sm">
                    <div className="bg-white rounded-xl p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                        <i className="fas fa-lightbulb text-blue-500 mr-3"></i>
                        论文摘要
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed text-center">
                        {selectedPaper.fullAbstract || selectedPaper.abstract}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 效果演示 - 提前到前面 */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">效果演示</h2>
                  <div className="bg-white rounded-2xl shadow-sm border p-8">
                    {/* 模型架构图 */}
                    {selectedPaper.architectureImage && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">模型架构</h3>
                        <MediaViewer 
                          src={selectedPaper.architectureImage} 
                          type="image" 
                          alt="模型架构图"
                          className="shadow-lg"
                        />
                      </div>
                    )}
                    
                    {/* 实验结果图 */}
                    {selectedPaper.resultsImage && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">实验结果</h3>
                        <MediaViewer 
                          src={selectedPaper.resultsImage} 
                          type="image" 
                          alt="实验结果图表"
                          className="shadow-lg"
                        />
                      </div>
                    )}
                    
                    {/* 对比分析图 */}
                    {selectedPaper.comparisonImage && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">对比分析</h3>
                        <MediaViewer 
                          src={selectedPaper.comparisonImage} 
                          type="image" 
                          alt="对比分析图"
                          className="shadow-lg"
                        />
                      </div>
                    )}
                    
                    {/* 演示视频 */}
                    {selectedPaper.demoVideo && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">研究演示</h3>
                        <MediaViewer 
                          src={selectedPaper.demoVideo} 
                          type="video" 
                          alt="研究演示视频"
                          className="shadow-lg"
                        />
                      </div>
                    )}
                    
                    {/* 可视化说明 */}
                    {selectedPaper.visualDescription && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">可视化说明</h3>
                        <p className="text-gray-700 leading-relaxed">{selectedPaper.visualDescription}</p>
                      </div>
                    )}
                    
                    {/* 如果没有任何媒体文件，显示默认内容 */}
                    {!selectedPaper.architectureImage && !selectedPaper.resultsImage && !selectedPaper.comparisonImage && !selectedPaper.demoVideo && (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <i className="fas fa-chart-line text-white text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">实验结果可视化</h3>
                        <p className="text-gray-600">实验结果图表、对比分析和可视化内容将在此处显示</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 主要贡献 */}
                {selectedPaper.contributions && selectedPaper.contributions.length > 0 && (
                  <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">主要贡献</h2>
                    <div className="bg-white rounded-2xl shadow-sm border p-8">
                      <div className="space-y-6">
                        {selectedPaper.contributions.map((contribution, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 leading-relaxed text-lg">{contribution}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 研究方法 */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">研究方法</h2>
                  <div className="bg-white rounded-2xl shadow-sm border p-8">
                    <p className="text-gray-700 leading-relaxed text-lg">{selectedPaper.methodology}</p>
                  </div>
                </div>

                {/* 实验结果 */}
                {selectedPaper.results && selectedPaper.results.length > 0 && (
                  <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">实验结果</h2>
                    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">
                      <table className="w-full">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                              数据集
                            </th>
                            <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                              准确率
                            </th>
                            <th className="px-8 py-4 text-left text-sm font-semibold text-gray-700 uppercase tracking-wider">
                              基线对比
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-100">
                          {selectedPaper.results.map((result, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                              <td className="px-8 py-4 text-sm font-medium text-gray-900">
                                {result.dataset}
                              </td>
                              <td className="px-8 py-4 text-sm text-gray-900">
                                <span className="font-semibold text-green-600">{result.accuracy}</span>
                              </td>
                              <td className="px-8 py-4 text-sm text-gray-500">
                                {result.baseline}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* 后续展望 */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">后续展望</h2>
                  <div className="bg-white rounded-2xl shadow-sm border p-8">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedPaper.futureWork || "基于当前研究成果，未来工作将重点关注模型的进一步优化、在更多数据集上的验证，以及在实际应用场景中的部署和性能评估。同时，我们也将探索与其他前沿技术的结合，以推动该领域的持续发展。"}
                    </p>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="text-center">
                  <div className="inline-flex items-center space-x-4">
                    {selectedPaper.pdfUrl && (
                      <a href={selectedPaper.pdfUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium">
                        <i className="fas fa-file-pdf mr-2"></i>
                        下载PDF
                      </a>
                    )}
                    {selectedPaper.arxivUrl && (
                      <a href={selectedPaper.arxivUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors font-medium">
                        <i className="fas fa-archive mr-2"></i>
                        arXiv
                      </a>
                    )}
                    {selectedPaper.codeUrl && (
                      <a href={selectedPaper.codeUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                        <i className="fab fa-github mr-2"></i>
                        代码
                      </a>
                    )}
                    <a href="#" className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                      <i className="fas fa-quote-left mr-2"></i>
                      引用格式
                    </a>
                    <button 
                      onClick={handleClosePaper}
                      className="inline-flex items-center px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-colors font-medium"
                    >
                      <i className="fas fa-arrow-left mr-2"></i>
                      返回列表
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 工作&实习详情页 */}
      {selectedInternship && (
        <div className="fixed inset-0 z-50 bg-gray-50">
          <div className="h-full flex flex-col">
            {/* 简洁的顶部导航 */}
            <div className="bg-white shadow-sm px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleCloseInternship}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <i className="fas fa-arrow-left text-gray-600"></i>
                </button>
                <div>
                  <h1 className="text-lg font-semibold text-gray-900">{selectedInternship.position}</h1>
                  <p className="text-sm text-gray-500">{selectedInternship.company} • {selectedInternship.period}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  selectedInternship.type === '全职' ? 'bg-blue-100 text-blue-700' :
                  selectedInternship.type === '实习' ? 'bg-green-100 text-green-700' :
                  selectedInternship.type === '兼职' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-700'
                }`}>
                  {selectedInternship.type || '实习'}
                </span>
              </div>
            </div>

            {/* 主要内容区域 */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-5xl mx-auto px-8 py-12">
                {/* Hero Section - 美化的标题区域 */}
                <div className="text-center mb-16">
                  <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-6">
                    <i className="fas fa-briefcase mr-2"></i>
                    {selectedInternship.type || '实习'}
                  </div>
                  
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {selectedInternship.position}
                  </h1>
                  
                  <div className="text-xl text-gray-600 mb-8">
                    {selectedInternship.company}
                  </div>

                  <div className="flex justify-center items-center space-x-6 mb-8 text-gray-600">
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{selectedInternship.period}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>{selectedInternship.location}</span>
                    </div>
                    {selectedInternship.department && (
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-building"></i>
                        <span>{selectedInternship.department}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-center flex-wrap gap-3 mb-12">
                    {selectedInternship.skills && selectedInternship.skills.length > 0 ? (
                      selectedInternship.skills.map((skill) => (
                        <span key={skill} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium">
                          {skill}
                        </span>
                      ))
                    ) : null}
                  </div>
                </div>

                {/* 工作概述 - 美化设计 */}
                <div className="mb-16">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-2 shadow-sm">
                    <div className="bg-white rounded-xl p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                        <i className="fas fa-lightbulb text-purple-500 mr-3"></i>
                        工作概述
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed text-center">
                        {selectedInternship.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 效果演示 */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">工作成果展示</h2>
                  <div className="bg-white rounded-2xl shadow-sm border p-8">
                    {/* 项目截图 */}
                    {selectedInternship.projectImage && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">项目截图</h3>
                        <img 
                          src={selectedInternship.projectImage} 
                          alt="项目截图"
                          className="w-full rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                    
                    {/* 演示视频 */}
                    {selectedInternship.demoVideo && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">工作演示</h3>
                        <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                          <iframe
                            src={selectedInternship.demoVideo}
                            className="absolute top-0 left-0 w-full h-full rounded-lg shadow-lg"
                            frameBorder="0"
                            allowFullScreen
                            title="工作演示视频"
                          />
                        </div>
                      </div>
                    )}
                    
                    {/* 成果图表 */}
                    {selectedInternship.resultsImage && (
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">成果展示</h3>
                        <img 
                          src={selectedInternship.resultsImage} 
                          alt="成果展示"
                          className="w-full rounded-lg shadow-lg"
                        />
                      </div>
                    )}
                    
                    {/* 如果没有任何媒体文件，显示默认内容 */}
                    {!selectedInternship.projectImage && !selectedInternship.demoVideo && !selectedInternship.resultsImage && (
                      <div className="text-center py-12">
                        <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                          <i className="fas fa-briefcase text-white text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-800 mb-3">工作成果展示</h3>
                        <p className="text-gray-600">项目截图、演示视频和成果展示将在此处显示</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 主要成果 */}
                {selectedInternship.achievements && selectedInternship.achievements.length > 0 && (
                  <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">主要成果</h2>
                    <div className="bg-white rounded-2xl shadow-sm border p-8">
                      <div className="space-y-6">
                        {selectedInternship.achievements.map((achievement, index) => (
                          <div key={index} className="flex items-start space-x-4">
                            <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <p className="text-gray-700 leading-relaxed text-lg">{achievement}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 工作职责 */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">工作职责</h2>
                  <div className="bg-white rounded-2xl shadow-sm border p-8">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedInternship.responsibilities || selectedInternship.description}
                    </p>
                  </div>
                </div>

                {/* 技能收获 */}
                {selectedInternship.skillsGained && selectedInternship.skillsGained.length > 0 && (
                  <div className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">技能收获</h2>
                    <div className="bg-white rounded-2xl shadow-sm border p-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {selectedInternship.skillsGained.map((skill, index) => (
                          <div key={index} className="bg-purple-50 rounded-lg p-4 text-center">
                            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                              <i className="fas fa-star text-purple-600"></i>
                            </div>
                            <h3 className="font-semibold text-gray-800 mb-2">{skill.name}</h3>
                            <p className="text-sm text-gray-600">{skill.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* 工作总结 */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">工作总结</h2>
                  <div className="bg-white rounded-2xl shadow-sm border p-8">
                    <p className="text-gray-700 leading-relaxed text-lg">
                      {selectedInternship.summary || `在${selectedInternship.company}担任${selectedInternship.position}期间，我积累了宝贵的工作经验，不仅提升了专业技能，也培养了团队协作和问题解决能力。这段经历为我的职业发展奠定了坚实的基础。`}
                    </p>
                  </div>
                </div>

                {/* 返回按钮 */}
                <div className="text-center">
                  <button 
                    onClick={handleCloseInternship}
                    className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-semibold hover:scale-105"
                  >
                    <i className="fas fa-arrow-left mr-3"></i>
                    返回经历列表
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 博客详情页 */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-gray-50">
          <div className="h-full flex flex-col">
            {/* 顶部导航栏 */}
            <div className="bg-white shadow-sm px-8 py-6 flex items-center justify-between">
              <div className="flex items-center space-x-6">
                <button 
                  onClick={handleCloseBlog}
                  className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-xl flex items-center justify-center text-gray-600 transition-all duration-200 hover:scale-105"
                >
                  <i className="fas fa-arrow-left text-lg"></i>
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-1">{selectedBlog.title}</h1>
                  <p className="text-gray-500 font-medium">{selectedBlog.date} • {selectedBlog.readTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  learningCategory === 'academic' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-purple-100 text-purple-700'
                }`}>
                  {selectedBlog.category}
                </span>
              </div>
            </div>

            {/* 主要内容区域 */}
            <div className="flex-1 overflow-y-auto">
              <div className="max-w-4xl mx-auto px-8 py-12">
                {/* Hero Section */}
                <div className="text-center mb-16">
                  <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                    {selectedBlog.title}
                  </h1>
                  
                  <div className="flex justify-center items-center space-x-6 mb-8">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <i className="fas fa-calendar-alt"></i>
                      <span>{selectedBlog.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <i className="fas fa-clock"></i>
                      <span>{selectedBlog.readTime}</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      learningCategory === 'academic' 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-purple-100 text-purple-700'
                    }`}>
                      {selectedBlog.category}
                    </span>
                  </div>

                  <div className="flex justify-center flex-wrap gap-3 mb-8">
                    {selectedBlog.tags && selectedBlog.tags.length > 0 ? (
                      selectedBlog.tags.map((tag) => (
                        <span key={tag} className={`px-4 py-2 rounded-full text-sm font-semibold ${
                          learningCategory === 'academic' 
                            ? 'bg-green-100 text-green-700' 
                            : 'bg-purple-100 text-purple-700'
                        }`}>
                          {tag}
                        </span>
                      ))
                    ) : null}
                  </div>
                </div>

                {/* 摘要 */}
                <div className="mb-16">
                  <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl p-2 shadow-lg">
                    <div className="bg-white rounded-2xl p-8">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                        <i className="fas fa-lightbulb text-yellow-500 mr-3"></i>
                        核心要点
                      </h2>
                      <p className="text-lg text-gray-700 leading-relaxed text-center">
                        {selectedBlog.summary}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 正文内容 */}
                <div className="mb-16">
                  <div className="bg-white rounded-3xl p-12 shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center">
                      <i className="fas fa-file-alt text-blue-500 mr-3"></i>
                      详细内容
                    </h2>
                    <div className="prose prose-lg max-w-none">
                      <p className="text-gray-700 leading-relaxed text-lg mb-8">
                        {selectedBlog.content}
                      </p>
                      
                      {/* 内容占位区域 */}
                      <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 text-center mb-8">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 ${
                          learningCategory === 'academic' 
                            ? 'bg-gradient-to-br from-green-500 to-blue-600' 
                            : 'bg-gradient-to-br from-purple-500 to-blue-600'
                        }`}>
                          <i className="fas fa-book-open text-white text-2xl"></i>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 mb-3">深度解析</h3>
                        <p className="text-gray-600">这里将展示更详细的技术分析和实践经验</p>
                      </div>

                      <p className="text-gray-700 leading-relaxed text-lg">
                        通过深入的理论分析和实践验证，本文为相关领域的研究者和工程师提供了宝贵的参考资料。
                        希望这些经验和见解能够帮助读者在各自的项目中取得更好的成果。
                      </p>
                    </div>
                  </div>
                </div>

                {/* 相关推荐 */}
                <div className="mb-16">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">相关推荐</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">相关技术文章</h3>
                      <p className="text-gray-600 text-sm">探索更多相关的技术内容和实践经验</p>
                    </div>
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                      <h3 className="text-lg font-semibold text-gray-800 mb-3">延伸阅读</h3>
                      <p className="text-gray-600 text-sm">深入了解相关领域的最新发展动态</p>
                    </div>
                  </div>
                </div>

                {/* 返回按钮 */}
                <div className="text-center">
                  <button 
                    onClick={handleCloseBlog}
                    className="inline-flex items-center px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 font-semibold hover:scale-105"
                  >
                    <i className="fas fa-arrow-left mr-3"></i>
                    返回学习记录
                  </button>
                </div>
              </div>
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
        />
      )}
    </div>
  );
};

export default App;
