import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Profile from './components/Profile';
import ArticleList from './components/ArticleList';
import AdminPanel from './components/AdminPanel';
import InlineEditor from './components/InlineEditor';
import ProjectEditor from './components/ProjectEditor';
import EditableCard from './components/EditableCard';
import MediaViewer from './components/MediaViewer';
import AutoBackup from './components/AutoBackup';
import SmartRecommendations from './components/SmartRecommendations';
import SectionTitleEditor from './components/SectionTitleEditor';
import ModuleRenderer from './components/ModuleRenderer';
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

  // 数据迁移与防御性清洗函数
  const sanitizeData = (data, type) => {
    if (!data) return data;

    if (type === 'project') {
      return Array.isArray(data) ? data.map(p => ({
        ...p,
        tags: p.tags || [],
        businessContext: p.businessContext || '',
        yourRole: p.yourRole || '',
        architectureDetail: p.architectureDetail || '',
        technicalChallenges: p.technicalChallenges || [],
        results: p.results || [],
        achievements: p.achievements || [],
        interviewHighlights: p.interviewHighlights || [],
        discussionTopics: p.discussionTopics || [],
        demoImage: p.demoImage || '',
        architectureImage: p.architectureImage || '',
        demoVideo: p.demoVideo || '',
        resultChart: p.resultChart || '',
        githubUrl: p.githubUrl || '',
        liveUrl: p.liveUrl || ''
      })) : data;
    }

    if (type === 'internship') {
      return Array.isArray(data) ? data.map(i => ({
        ...i,
        contributions: i.contributions || [],
        skills: i.skills || []
      })) : data;
    }

    if (type === 'personalInfo') {
      return {
        ...data,
        bio: {
          main: data.bio?.main || '',
          detail: data.bio?.detail || ''
        }
      };
    }

    return data;
  };

  // 从本地存储加载数据的函数（带数据清洗）
  const loadFromStorage = (key, defaultValue, type) => {
    try {
      const stored = localStorage.getItem(key);
      const rawData = stored ? JSON.parse(stored) : defaultValue;
      return sanitizeData(rawData, type);
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
  
  // Inline 编辑状态
  const [inlineEditState, setInlineEditState] = useState({
    isVisible: false,
    type: null, // 'news', 'personal-info', 'project', etc.
    data: null,
    index: null
  });

  // 积木选择器状态
  const [insertMenuState, setInsertMenuState] = useState({
    isVisible: false,
    index: null,
    sectionType: null
  });

  // 删除撤回状态
  const [deletedItems, setDeletedItems] = useState([]);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [undoTimer, setUndoTimer] = useState(null);

  // 数据状态管理（从 localStorage 加载， fallback 到初始数据）
  const [personalInfo, setPersonalInfo] = useState(() => 
    loadFromStorage(STORAGE_KEYS.personalInfo, initialPersonalInfo, 'personalInfo')
  );
  const [recentNews, setRecentNews] = useState(() => 
    loadFromStorage(STORAGE_KEYS.recentNews, initialRecentNews, 'news')
  );
  const [projects, setProjects] = useState(() => 
    loadFromStorage(STORAGE_KEYS.projects, initialProjects, 'project')
  );
  const [publications, setPublications] = useState(() => 
    loadFromStorage(STORAGE_KEYS.publications, initialPublications, 'publication')
  );
  const [internships, setInternships] = useState(() => 
    loadFromStorage(STORAGE_KEYS.internships, initialInternships, 'internship')
  );
  const [honors, setHonors] = useState(() => 
    loadFromStorage(STORAGE_KEYS.honors, initialHonors, 'honor')
  );
  const [academicBlogs, setAcademicBlogs] = useState(() => 
    loadFromStorage(STORAGE_KEYS.academicBlogs, initialAcademicBlogs, 'blog-academic')
  );
  const [engineeringBlogs, setEngineeringBlogs] = useState(() => 
    loadFromStorage(STORAGE_KEYS.engineeringBlogs, initialEngineeringBlogs, 'blog-engineering')
  );

  // 获取分类显示名称
  const getTabDisplayName = (key) => {
    if (customTabNames[key]) return customTabNames[key];
    const defaults = { projects: '项目经历', publications: '学术论文', internships: '工作实习', honors: '荣誉奖项' };
    return defaults[key] || key;
  };

  const getTabIcon = (key) => {
    const icons = { projects: 'fas fa-project-diagram', publications: 'fas fa-file-alt', internships: 'fas fa-briefcase', honors: 'fas fa-trophy' };
    return icons[key] || 'fas fa-folder';
  };

  const addNewTab = () => {
    const newKey = `custom_${Date.now()}`;
    setResumeTabOrder([...resumeTabOrder, newKey]);
    setCustomTabNames({ ...customTabNames, [newKey]: '新分类' });
    setResumeCategory(newKey);
  };

  const deleteTab = (key) => {
    const newOrder = resumeTabOrder.filter(k => k !== key);
    setResumeTabOrder(newOrder);
    if (resumeCategory === key && newOrder.length > 0) {
      setResumeCategory(newOrder[0]);
    }
  };

  // 组件主渲染逻辑
  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        personalInfo={personalInfo}
      />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 首页内容 */}
        {activeSection === 'home' && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* 左侧个人信息侧边栏 */}
            <div className="lg:w-80 lg:flex-shrink-0">
              <Profile 
                personalInfo={personalInfo} 
                isAdminMode={localStorage.getItem('portfolio_admin_mode') === 'true'}
                onEdit={() => openInlineEditor('personal-info', personalInfo, 0)}
              />
            </div>
            
            {/* 右侧主内容区域 */}
            <div className="flex-1 min-w-0">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <i className="fas fa-bolt text-yellow-500 mr-3"></i>
                  最新动态
                </h2>
                <div className="space-y-4">
                  {recentNews.map((news, index) => (
                    <EditableCard
                      key={news.id || index}
                      isAdminMode={localStorage.getItem('portfolio_admin_mode') === 'true'}
                      onEdit={() => openInlineEditor('news', news, index)}
                      onDelete={() => handleDeleteWithUndo('news', index)}
                      onInsertBefore={() => handleInsertAt('news', index)}
                      onInsertAfter={() => handleInsertAt('news', index + 1)}
                    >
                      <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className="text-sm text-gray-500 font-mono">{news.date}</span>
                              {news.type && (
                                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">{news.type}</span>
                              )}
                            </div>
                            <p className="text-gray-800 leading-relaxed">{news.content}</p>
                          </div>
                        </div>
                      </div>
                    </EditableCard>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 个人简历内容 */}
        {activeSection === 'resume' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
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
                    <div className="space-y-4">
                      {projects.map((project, index) => (
                        <EditableCard
                          key={project.id || index}
                          isAdminMode={localStorage.getItem('portfolio_admin_mode') === 'true'}
                          onEdit={() => openInlineEditor('project', project, index)}
                          onDelete={() => handleDeleteWithUndo('project', index)}
                          onInsertBefore={() => handleInsertAt('project', index)}
                          onInsertAfter={() => handleInsertAt('project', index + 1)}
                          className="border-l-4 border-blue-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div onClick={() => handleArticleClick(project)}>
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
                              <i className="fas fa-chevron-right text-gray-300 hover:text-blue-500 transition-colors text-sm"></i>
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
                        </EditableCard>
                      ))}
                      {projects.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-code text-4xl mb-4"></i>
                          <p>暂无项目数据</p>
                          {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                            <p className="text-sm mt-2">点击任意位置插入点添加新项目</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 学术论文 */}
                  {resumeCategory === 'publications' && (
                    <div className="space-y-4">
                      {publications.map((paper, index) => (
                        <EditableCard
                          key={paper.id || index}
                          isAdminMode={localStorage.getItem('portfolio_admin_mode') === 'true'}
                          onEdit={() => openInlineEditor('publication', paper, index)}
                          onDelete={() => handleDeleteWithUndo('publication', index)}
                          onInsertBefore={() => handleInsertAt('publication', index)}
                          onInsertAfter={() => handleInsertAt('publication', index + 1)}
                          className="border-l-4 border-green-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div onClick={() => handlePaperClick(paper)}>
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
                              <i className="fas fa-chevron-right text-gray-300 hover:text-green-500 transition-colors text-sm"></i>
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
                        </EditableCard>
                      ))}
                      {publications.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-file-alt text-4xl mb-4"></i>
                          <p>暂无学术论文</p>
                          {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                            <p className="text-sm mt-2">点击任意位置插入点添加新论文</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 工作&实习经历 */}
                  {resumeCategory === 'internships' && (
                    <div className="space-y-4">
                      {internships.map((internship, index) => (
                        <EditableCard
                          key={internship.id || index}
                          isAdminMode={localStorage.getItem('portfolio_admin_mode') === 'true'}
                          onEdit={() => openInlineEditor('internship', internship, index)}
                          onDelete={() => handleDeleteWithUndo('internship', index)}
                          onInsertBefore={() => handleInsertAt('internship', index)}
                          onInsertAfter={() => handleInsertAt('internship', index + 1)}
                          className="border-l-4 border-purple-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div onClick={() => handleInternshipClick(internship)}>
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
                        </EditableCard>
                      ))}
                      {internships.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-briefcase text-4xl mb-4"></i>
                          <p>暂无工作经历</p>
                          {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                            <p className="text-sm mt-2">点击任意位置插入点添加新经历</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 荣誉奖项 */}
                  {resumeCategory === 'honors' && (
                    <div className="space-y-4">
                      {honors.map((honor, index) => (
                        <EditableCard
                          key={honor.id || index}
                          isAdminMode={localStorage.getItem('portfolio_admin_mode') === 'true'}
                          onEdit={() => openInlineEditor('honor', honor, index)}
                          onDelete={() => handleDeleteWithUndo('honor', index)}
                          onInsertBefore={() => handleInsertAt('honor', index)}
                          onInsertAfter={() => handleInsertAt('honor', index + 1)}
                          className="border-l-4 border-yellow-500 pl-6 py-4 hover:bg-gray-50 transition-colors"
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
                          </div>
                        </EditableCard>
                      ))}
                      {honors.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-trophy text-4xl mb-4"></i>
                          <p>暂无荣誉奖项</p>
                          {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                            <p className="text-sm mt-2">点击任意位置插入点添加新奖项</p>
                          )}
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
                        <EditableCard
                          key={blog.id || index}
                          isAdminMode={localStorage.getItem('portfolio_admin_mode') === 'true'}
                          onEdit={() => openInlineEditor('blog-academic', blog, index)}
                          onDelete={() => handleDeleteWithUndo('blog-academic', index)}
                          onInsertBefore={() => handleInsertAt('blog-academic', index)}
                          onInsertAfter={() => handleInsertAt('blog-academic', index + 1)}
                          className="border-l-4 border-purple-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div onClick={() => handleBlogClick(blog)}>
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
                              <i className="fas fa-chevron-right text-gray-300 hover:text-purple-500 transition-colors text-sm"></i>
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
                        </EditableCard>
                      ))}
                      {academicBlogs.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-graduation-cap text-4xl mb-4"></i>
                          <p>暂无学术研究记录</p>
                          {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                            <p className="text-sm mt-2">点击任意位置插入点添加学术博客</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 工程技术记录 */}
                  {learningCategory === 'engineering' && (
                    <div className="space-y-4">
                      {engineeringBlogs.map((blog, index) => (
                        <EditableCard
                          key={blog.id || index}
                          isAdminMode={localStorage.getItem('portfolio_admin_mode') === 'true'}
                          onEdit={() => openInlineEditor('blog-engineering', blog, index)}
                          onDelete={() => handleDeleteWithUndo('blog-engineering', index)}
                          onInsertBefore={() => handleInsertAt('blog-engineering', index)}
                          onInsertAfter={() => handleInsertAt('blog-engineering', index + 1)}
                          className="border-l-4 border-orange-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div onClick={() => handleBlogClick(blog)}>
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
                              <i className="fas fa-chevron-right text-gray-300 hover:text-orange-500 transition-colors text-sm"></i>
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
                        </EditableCard>
                      ))}
                      {engineeringBlogs.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-cogs text-4xl mb-4"></i>
                          <p>暂无工程技术记录</p>
                          {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                            <p className="text-sm mt-2">点击任意位置插入点添加工程博客</p>
                          )}
                        </div>
                      )}
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
                        <EditableCard
                          key={blog.id || index}
                          isAdminMode={localStorage.getItem('portfolio_admin_mode') === 'true'}
                          onEdit={() => openInlineEditor('blog-academic', blog, index)}
                          onDelete={() => handleDeleteWithUndo('blog-academic', index)}
                          onInsertBefore={() => handleInsertAt('blog-academic', index)}
                          onInsertAfter={() => handleInsertAt('blog-academic', index + 1)}
                          className="border-l-4 border-purple-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div onClick={() => handleBlogClick(blog)}>
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
                              <i className="fas fa-chevron-right text-gray-300 hover:text-purple-500 transition-colors text-sm"></i>
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
                        </EditableCard>
                      ))}
                      {academicBlogs.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-graduation-cap text-4xl mb-4"></i>
                          <p>暂无学术研究记录</p>
                          {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                            <p className="text-sm mt-2">点击任意位置插入点添加学术博客</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}

                  {/* 工程技术记录 */}
                  {learningCategory === 'engineering' && (
                    <div className="space-y-4">
                      {engineeringBlogs.map((blog, index) => (
                        <EditableCard
                          key={blog.id || index}
                          isAdminMode={localStorage.getItem('portfolio_admin_mode') === 'true'}
                          onEdit={() => openInlineEditor('blog-engineering', blog, index)}
                          onDelete={() => handleDeleteWithUndo('blog-engineering', index)}
                          onInsertBefore={() => handleInsertAt('blog-engineering', index)}
                          onInsertAfter={() => handleInsertAt('blog-engineering', index + 1)}
                          className="border-l-4 border-orange-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
                        >
                          <div onClick={() => handleBlogClick(blog)}>
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
                              <i className="fas fa-chevron-right text-gray-300 hover:text-orange-500 transition-colors text-sm"></i>
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
                        </EditableCard>
                      ))}
                      {engineeringBlogs.length === 0 && (
                        <div className="text-center py-12 text-gray-500">
                          <i className="fas fa-cogs text-4xl mb-4"></i>
                          <p>暂无工程技术记录</p>
                          {localStorage.getItem('portfolio_admin_mode') === 'true' && (
                            <p className="text-sm mt-2">点击任意位置插入点添加工程博客</p>
                          )}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* 星际之门 - 创意项目与设计展示 */}
              {activeSection === 'stargate' && (
                <div className="max-w-6xl mx-auto">
                  {/* 标题区域 */}
                  <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
                      <i className="fas fa-star text-yellow-500 mr-4 animate-pulse"></i>
                      星际之门
                      <i className="fas fa-star text-yellow-500 ml-4 animate-pulse"></i>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                      探索无限可能的创意宇宙 —— 这里汇集了我的一些有趣的设计、实验性项目和奇思妙想
                    </p>
                  </div>

                  {/* 特色项目网格 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    {/* 示例卡片 1 - AI 艺术创作 */}
                    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i className="fas fa-palette text-3xl"></i>
                      </div>
                      <h3 className="text-xl font-bold mb-2">AI 艺术实验室</h3>
                      <p className="text-sm text-white text-opacity-90 mb-4">
                        探索人工智能与艺术创作的边界，生成独特的视觉作品
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
                          进行中
                        </span>
                      </div>
                    </div>

                    {/* 示例卡片 2 - 互动可视化 */}
                    <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i className="fas fa-chart-network text-3xl"></i>
                      </div>
                      <h3 className="text-xl font-bold mb-2">数据宇宙可视化</h3>
                      <p className="text-sm text-white text-opacity-90 mb-4">
                        将复杂数据转化为沉浸式的交互式视觉体验
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
                          已完成
                        </span>
                      </div>
                    </div>

                    {/* 示例卡片 3 - 游戏开发 */}
                    <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i className="fas fa-gamepad text-3xl"></i>
                      </div>
                      <h3 className="text-xl font-bold mb-2">迷你游戏工坊</h3>
                      <p className="text-sm text-white text-opacity-90 mb-4">
                        创意小游戏和互动体验的原型设计与开发
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
                          构思中
                        </span>
                      </div>
                    </div>

                    {/* 示例卡片 4 - 硬件创客 */}
                    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i className="fas fa-microchip text-3xl"></i>
                      </div>
                      <h3 className="text-xl font-bold mb-2">IoT 智能设备</h3>
                      <p className="text-sm text-white text-opacity-90 mb-4">
                        物联网硬件原型和智能家居解决方案
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
                          实验中
                        </span>
                      </div>
                    </div>

                    {/* 示例卡片 5 - 开源贡献 */}
                    <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i className="fab fa-github text-3xl"></i>
                      </div>
                      <h3 className="text-xl font-bold mb-2">开源工具箱</h3>
                      <p className="text-sm text-white text-opacity-90 mb-4">
                        为开发者社区贡献的实用工具和库
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
                          持续更新
                        </span>
                      </div>
                    </div>

                    {/* 示例卡片 6 - 写作与思考 */}
                    <div className="bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
                      <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <i className="fas fa-pen-fancy text-3xl"></i>
                      </div>
                      <h3 className="text-xl font-bold mb-2">思维碎片</h3>
                      <p className="text-sm text-white text-opacity-90 mb-4">
                        关于技术、设计和生活的随笔与深度思考
                      </p>
                      <div className="flex items-center text-sm">
                        <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
                          连载中
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 底部提示 */}
                  <div className="text-center">
                    <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl px-8 py-6">
                      <p className="text-gray-700 mb-2">
                        <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                        更多精彩内容正在路上...
                      </p>
                      <p className="text-sm text-gray-600">
                        如果你有有趣的想法或合作意向，欢迎联系我！
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </main>

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
              {/* 统一使用 ModuleRenderer 渲染，确保与编辑预览完全一致 */}
              <ModuleRenderer type="project" data={selectedArticle} isDetail={true} />
              
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
          onResetData={handleResetData}
          onExportData={handleExportData}
          onImportData={handleImportData}
        />
      )}

      {/* Inline 编辑器 */}
      {inlineEditState.isVisible && (
        inlineEditState.type === 'project' ? (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-hidden border border-gray-100 transform transition-all scale-100">
              <div className="sticky top-0 bg-white/95 backdrop-blur border-b p-6 flex items-center justify-between z-10 rounded-t-2xl">
                <h2 className="text-xl font-bold text-gray-900 flex items-center">
                  <i className={`fas ${inlineEditState.index === null ? 'fa-plus-circle' : 'fa-edit'} mr-3 text-blue-600`}></i>
                  {inlineEditState.index === null ? '新增项目' : '编辑项目'}
                </h2>
                <button onClick={closeInlineEditor} className="w-10 h-10 bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-full flex items-center justify-center transition-colors">
                  <i className="fas fa-times"></i>
                </button>
              </div>
              <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
                <ProjectEditor 
                  formData={inlineEditState.data || {}} 
                  onChange={(field, value) => setInlineEditState(prev => ({ ...prev, data: { ...prev.data, [field]: value } }))} 
                />
              </div>
              <div className="sticky bottom-0 bg-gray-50/95 backdrop-blur border-t p-4 flex justify-end space-x-3 rounded-b-2xl">
                <button onClick={closeInlineEditor} className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm">取消</button>
                <button onClick={() => handleInlineSave(inlineEditState.data)} className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5">
                  {inlineEditState.index === null ? '确认添加' : '保存更改'}
                </button>
              </div>
            </div>
          </div>
        ) : (
          <InlineEditor
            type={inlineEditState.type}
            data={inlineEditState.data}
            onSave={handleInlineSave}
            onClose={closeInlineEditor}
          />
        )
      )}

      {/* 积木选择器 (Block Selector) */}
      {insertMenuState.isVisible && localStorage.getItem('portfolio_admin_mode') === 'true' && (
        <div className="fixed inset-0 z-50 bg-black/20 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 animate-fade-in">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold text-gray-800">选择要插入的模块类型</h3>
              <button onClick={closeInsertMenu} className="text-gray-400 hover:text-gray-600">
                <i className="fas fa-times"></i>
              </button>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { type: 'project', label: '项目经历', icon: 'fa-code', color: 'blue' },
                { type: 'publication', label: '学术论文', icon: 'fa-file-alt', color: 'indigo' },
                { type: 'internship', label: '工作实习', icon: 'fa-briefcase', color: 'green' },
                { type: 'honor', label: '荣誉奖项', icon: 'fa-trophy', color: 'yellow' },
                { type: 'blog-academic', label: '学术博客', icon: 'fa-book', color: 'purple' },
                { type: 'blog-engineering', label: '技术博客', icon: 'fa-laptop-code', color: 'pink' },
                { type: 'news', label: '最新动态', icon: 'fa-fire', color: 'orange' }
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => {
                    openAddEditor(item.type, insertMenuState.index);
                    closeInsertMenu();
                  }}
                  className={`p-4 rounded-xl border-2 border-${item.color}-100 bg-${item.color}-50 hover:bg-${item.color}-100 hover:border-${item.color}-300 transition-all flex flex-col items-center space-y-2 group`}
                >
                  <div className={`w-12 h-12 rounded-full bg-${item.color}-100 text-${item.color}-600 flex items-center justify-center text-xl group-hover:scale-110 transition-transform`}>
                    <i className={`fas ${item.icon}`}></i>
                  </div>
                  <span className="font-medium text-gray-700">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 撤回删除提示 Toast */}
      {showUndoToast && deletedItems.length > 0 && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-4 animate-slide-up">
          <span className="text-sm">
            已删除 {deletedItems[deletedItems.length - 1].item.title || deletedItems[deletedItems.length - 1].item.content || '项目'}
          </span>
          <button
            onClick={handleUndoDelete}
            className="px-4 py-1 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colors"
          >
            撤销
          </button>
          <button
            onClick={() => {
              setShowUndoToast(false);
              if (undoTimer) {
                clearTimeout(undoTimer);
                setUndoTimer(null);
              }
            }}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
