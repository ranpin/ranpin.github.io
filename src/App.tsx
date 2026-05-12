import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Profile from './components/Profile';
import ResumeSection from './components/ResumeSection';
import LearningSectionFull from './components/LearningSectionFull';
import HomeSection from './components/HomeSection';
import StargateSection from './components/StargateSection';
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
import { usePortfolioStore } from './store/usePortfolioStore';
import { useResumeTabs } from './hooks/useResumeTabs';
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
  // 从 store 获取所有状态和 actions
  const {
    // 数据状态
    personalInfo,
    recentNews,
    projects,
    publications,
    internships,
    honors,
    academicBlogs,
    engineeringBlogs,
    
    // UI 状态
    activeSection,
    learningCategory,
    resumeCategory,
    resumeTabOrder,
    customTabNames,
    inlineEditState,
    insertMenuState,
    deletedItems,
    showUndoToast,
    isAdminMode,
    customContent,
    
    // Actions - 数据更新
    setPersonalInfo: storeSetPersonalInfo,
    setRecentNews: storeSetRecentNews,
    setProjects: storeSetProjects,
    setPublications: storeSetPublications,
    setInternships: storeSetInternships,
    setHonors: storeSetHonors,
    setAcademicBlogs: storeSetAcademicBlogs,
    setEngineeringBlogs: storeSetEngineeringBlogs,
    
    // Actions - UI 状态
    setActiveSection,
    setLearningCategory,
    setResumeCategory,
    setResumeTabOrder,
    setCustomTabNames,
    setIsAdminMode,
    setCustomContent,
    
    // Actions - CRUD
    updateItem,
    deleteItem,
    addItem,
    updateItemAt,
    deleteItemAt,
    addItemAt,
    
    // Actions - Inline 编辑
    openInlineEditor,
    closeInlineEditor,
    
    // Actions - 积木选择器
    openInsertMenu,
    closeInsertMenu,
    
    // Actions - 删除撤回
    addDeletedItem,
    clearDeletedItems,
    hideUndoToast,
    setUndoTimer,
    undoTimer,
  } = usePortfolioStore();

  // 使用自定义 Hooks 管理简历 Tab 逻辑
  const {
    editingTabId,
    editingTabName,
    setEditingTabName,
    startEditingTab,
    cancelEditingTab,
    saveTabName,
  } = useResumeTabs();

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

  // 状态管理
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [draggedTab, setDraggedTab] = useState(null);
  
  // 分类导航编辑状态（已迁移至 useResumeTabs）
  const [isEditingTabs, setIsEditingTabs] = useState(false);
  
  // 学习记录分页状态
  const [learningPage, setLearningPage] = useState(1);
  const [learningFilter, setLearningFilter] = useState('all');
  const itemsPerPage = 5;
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  
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

  // ========== 基于 Store Actions 的事件处理函数 ==========
  
  // 保存内联编辑内容
  const handleInlineSave = (data) => {
    const { type, index } = inlineEditState;
    
    if (type === 'personal-info') {
      storeSetPersonalInfo(data);
    } else if (type === 'news') {
      updateItemAt('recentNews', index, data);
    } else if (type === 'project') {
      if (index === null) {
        addItem('projects', data);
      } else {
        updateItem('projects', projects[index].id, data);
      }
    } else if (type === 'publication') {
      if (index === null) {
        addItem('publications', data);
      } else {
        updateItem('publications', publications[index].id, data);
      }
    } else if (type === 'internship') {
      if (index === null) {
        addItem('internships', data);
      } else {
        updateItem('internships', internships[index].id, data);
      }
    } else if (type === 'honor') {
      if (index === null) {
        addItem('honors', data);
      } else {
        updateItem('honors', honors[index].id, data);
      }
    } else if (type === 'blog-academic') {
      if (index === null) {
        addItem('academicBlogs', data);
      } else {
        updateItem('academicBlogs', academicBlogs[index].id, data);
      }
    } else if (type === 'blog-engineering') {
      if (index === null) {
        addItem('engineeringBlogs', data);
      } else {
        updateItem('engineeringBlogs', engineeringBlogs[index].id, data);
      }
    }
    
    closeInlineEditor();
  };

  // 删除项目并支持撤回
  const handleDeleteWithUndo = (collection, index) => {
    const items = collection === 'news' ? recentNews : 
                  collection === 'project' ? projects :
                  collection === 'publication' ? publications :
                  collection === 'internship' ? internships :
                  collection === 'honor' ? honors :
                  collection === 'blog-academic' ? academicBlogs :
                  collection === 'blog-engineering' ? engineeringBlogs : [];
    
    const itemToDelete = items[index];
    const storeCollection = collection === 'news' ? 'recentNews' :
                           collection === 'project' ? 'projects' :
                           collection === 'publication' ? 'publications' :
                           collection === 'internship' ? 'internships' :
                           collection === 'honor' ? 'honors' :
                           collection === 'blog-academic' ? 'academicBlogs' :
                           collection === 'blog-engineering' ? 'engineeringBlogs' : collection;
    
    // 添加到撤回列表
    addDeletedItem({ collection: storeCollection, index, item: itemToDelete });
    
    // 执行删除
    deleteItemAt(storeCollection, index);
    
    // 设置定时器自动隐藏 toast
    const timer = setTimeout(() => {
      hideUndoToast();
      clearDeletedItems();
    }, 5000);
    setUndoTimer(timer);
  };

  // 撤销删除
  const handleUndoDelete = () => {
    if (deletedItems.length === 0) return;
    
    const lastDeleted = deletedItems[deletedItems.length - 1];
    const { collection, index, item } = lastDeleted;
    
    // 恢复数据
    addItemAt(collection, index, item);
    
    // 清除状态
    hideUndoToast();
    clearDeletedItems();
    if (undoTimer) {
      clearTimeout(undoTimer);
      setUndoTimer(null);
    }
  };

  // 在指定位置插入新项目
  const handleInsertAt = (collection, index) => {
    const storeCollection = collection === 'news' ? 'recentNews' :
                           collection === 'project' ? 'projects' :
                           collection === 'publication' ? 'publications' :
                           collection === 'internship' ? 'internships' :
                           collection === 'honor' ? 'honors' :
                           collection === 'blog-academic' ? 'academicBlogs' :
                           collection === 'blog-engineering' ? 'engineeringBlogs' : collection;
    
    openInsertMenu(index, storeCollection);
  };

  // 打开添加编辑器
  const openAddEditor = (type, index) => {
    const emptyData = type === 'project' ? {
      title: '',
      period: '',
      role: '',
      description: '',
      tags: [],
      businessContext: '',
      yourRole: '',
      architectureDetail: '',
      technicalChallenges: [],
      results: [],
      achievements: [],
      interviewHighlights: [],
      discussionTopics: [],
      demoImage: '',
      architectureImage: '',
      demoVideo: '',
      resultChart: '',
      githubUrl: '',
      liveUrl: ''
    } : type === 'publication' ? {
      title: '',
      authors: '',
      venue: '',
      year: '',
      abstract: '',
      pdfUrl: '',
      codeUrl: ''
    } : type === 'internship' ? {
      company: '',
      role: '',
      period: '',
      description: '',
      contributions: [],
      skills: []
    } : type === 'honor' ? {
      title: '',
      issuer: '',
      date: '',
      description: ''
    } : type === 'blog-academic' || type === 'blog-engineering' ? {
      title: '',
      date: '',
      summary: '',
      url: '',
      tags: []
    } : type === 'news' ? {
      date: new Date().toISOString().split('T')[0],
      content: '',
      type: ''
    } : {};
    
    openInlineEditor(type, emptyData, null);
  };

  // 详情弹窗处理函数（补充缺失的 handlers）
  const handleArticleClick = (item) => setSelectedArticle(item);
  const handleCloseArticle = () => setSelectedArticle(null);
  const handlePaperClick = (item) => setSelectedPaper(item);
  const handleClosePaper = () => setSelectedPaper(null);
  const handleBlogClick = (item) => setSelectedBlog(item);
  const handleCloseBlog = () => setSelectedBlog(null);
  const handleInternshipClick = (item) => setSelectedInternship(item);
  const handleCloseInternship = () => setSelectedInternship(null);

  // 管理面板相关函数
  const handleResetData = () => {
    if (confirm('确定要重置所有数据吗？此操作不可恢复！')) {
      window.location.reload();
    }
  };

  const handleExportData = () => {
    const data = {
      personalInfo,
      recentNews,
      projects,
      publications,
      internships,
      honors,
      academicBlogs,
      engineeringBlogs,
      exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `portfolio-backup-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImportData = (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        
        if (data.personalInfo) storeSetPersonalInfo(sanitizeData(data.personalInfo, 'personalInfo'));
        if (data.recentNews) storeSetRecentNews(data.recentNews);
        if (data.projects) storeSetProjects(sanitizeData(data.projects, 'project'));
        if (data.publications) storeSetPublications(data.publications);
        if (data.internships) storeSetInternships(sanitizeData(data.internships, 'internship'));
        if (data.honors) storeSetHonors(data.honors);
        if (data.academicBlogs) storeSetAcademicBlogs(data.academicBlogs);
        if (data.engineeringBlogs) storeSetEngineeringBlogs(data.engineeringBlogs);
        
        alert('数据导入成功！');
      } catch (error) {
        alert('数据导入失败：文件格式错误');
        console.error('Import error:', error);
      }
    };
    reader.readAsText(file);
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
          <HomeSection 
            personalInfo={personalInfo}
            recentNews={recentNews}
            isAdminMode={isAdminMode}
            openInlineEditor={openInlineEditor}
            handleDeleteWithUndo={handleDeleteWithUndo}
            handleInsertAt={handleInsertAt}
          />
        )}

        {/* 个人简历内容 */}
        {activeSection === 'resume' && (
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                  {/* 分类按钮 - 支持编辑功能 */}
                  <div className="mb-8 sm:mb-10">
                    <div className="flex items-center justify-between mb-6">
                      {isAdminMode && (
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
                      
                      {isAdminMode && isEditingTabs && (
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
                const isAdminMode = isAdminMode;
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
                            setResumeTabOrder(newOrder);
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
            {isAdminMode && isEditingTabs && (
              <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start space-x-3">
                  <i className="fas fa-info-circle text-blue-600 mt-0.5"></i>
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-2">编辑模式说明：</p>
                    <ul className="text-xs space-y-1.5">
                      <li>• 拖拽分类按钮可以调整顺序</li>
                      <li>• 点击分类上的编辑图标可以修改名称</li>
                      <li>• 点击删除图标可以移除分类（数据不会丢失）</li>
                      <li>• 点击&quot;添加分类&quot;可以创建新的自定义分类</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* 简历内容区域 - 已抽取至 ResumeSection */}
          {activeSection === 'resume' && (
            <ResumeSection 
              resumeCategory={resumeCategory}
              isAdminMode={isAdminMode}
              openInlineEditor={openInlineEditor}
              handleDeleteWithUndo={handleDeleteWithUndo}
              handleInsertAt={handleInsertAt}
              handleArticleClick={handleArticleClick}
              handlePaperClick={handlePaperClick}
              handleInternshipClick={handleInternshipClick}
            />
          )}

          {/* 学习记录区域 - 已抽取至 LearningSectionFull */}
          {activeSection === 'learning' && (
            <LearningSectionFull 
              learningCategory={learningCategory}
              setLearningCategory={setLearningCategory}
              isAdminMode={isAdminMode}
              openInlineEditor={openInlineEditor}
              handleDeleteWithUndo={handleDeleteWithUndo}
              handleInsertAt={handleInsertAt}
              handleBlogClick={handleBlogClick}
            />
          )}

              {/* 星际之门 - 创意项目与设计展示 */}
              {/* 星际之门 - 已抽取至 StargateSection */}
              {activeSection === 'stargate' && <StargateSection />}
            </main>
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
                  onChange={(field, value) => openInlineEditor(inlineEditState.type, { ...inlineEditState.data, [field]: value }, inlineEditState.index)} 
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
      {insertMenuState.isVisible && isAdminMode && (
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
              hideUndoToast();
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
