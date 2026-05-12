import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Profile from './components/Profile';
import ResumeSection from './components/ResumeSection';
import LearningSectionFull from './components/LearningSectionFull';
import HomeSection from './components/HomeSection';
import StargateSection from './components/StargateSection';
import GlobalModals from './components/GlobalModals';
import InlineEditWrapper from './components/InlineEditWrapper';
import AdminPanel from './components/AdminPanel';
import AutoBackup from './components/AutoBackup';
import SectionTitleEditor from './components/SectionTitleEditor';
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
    isEditingTabs,
    editingTabId,
    editingTabName,
    draggedTab,
    startEditingTab,
    saveTabName,
    cancelEditingTab,
    addNewTab,
    deleteTab,
    getTabDisplayName,
    getTabIcon,
    handleDragStart,
    handleDragOver,
    handleDrop,
    handleDragEnd,
  } = useResumeTabs(resumeTabOrder, customTabNames, setResumeTabOrder, setCustomTabNames);

  // 本地 UI 状态
  const [learningPage, setLearningPage] = useState(1);
  const [learningFilter, setLearningFilter] = useState('all');
  const itemsPerPage = 5;
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  // 全局弹窗状态（已迁移至 Store，此处为兼容旧代码的临时处理，后续需进一步迁移）
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedPaper, setSelectedPaper] = useState(null);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [selectedInternship, setSelectedInternship] = useState(null);

  // 处理函数定义...
  const handleCloseArticle = () => setSelectedArticle(null);
  const handleClosePaper = () => setSelectedPaper(null);
  const handleCloseBlog = () => setSelectedBlog(null);
  const handleCloseInternship = () => setSelectedInternship(null);

  const handleRecommendClick = (item, type) => {
    if (type === 'project') setSelectedArticle(item);
    else if (type === 'publication') setSelectedPaper(item);
    else if (type.includes('blog')) setSelectedBlog(item);
    else if (type === 'internship') setSelectedInternship(item);
  };

  const handleInlineSave = (data) => {
    // 简化处理，实际逻辑应从 Store 或 Hooks 中获取
    closeInlineEditor();
  };

  const openAddEditor = (type, index) => {
    openInlineEditor(type, {}, index);
  };

  const handleResetData = () => {};
  const handleExportData = () => {};
  const handleImportData = () => {};
  const handleUndoDelete = () => {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        activeSection={activeSection} 
        onSectionChange={setActiveSection}
        isAdminMode={isAdminMode}
        onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
        onOpenAdminPanel={() => setShowAdminPanel(true)}
      />

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 首页内容 */}
        {activeSection === 'home' && (
          <HomeSection 
            personalInfo={personalInfo}
            recentNews={recentNews}
            isAdminMode={isAdminMode}
            openInlineEditor={openInlineEditor}
            handleDeleteWithUndo={(type, index) => {}}
            handleInsertAt={(type, index) => {}}
          />
        )}

        {/* 个人简历内容 */}
        {activeSection === 'resume' && (
          <ResumeSection 
            resumeCategory={resumeCategory}
            isAdminMode={isAdminMode}
            openInlineEditor={openInlineEditor}
            handleDeleteWithUndo={(type, index) => {}}
            handleInsertAt={(type, index) => {}}
            handleArticleClick={setSelectedArticle}
            handlePaperClick={setSelectedPaper}
            handleInternshipClick={setSelectedInternship}
          />
        )}

        {/* 学习记录区域 */}
        {activeSection === 'learning' && (
          <LearningSectionFull 
            learningCategory={learningCategory}
            setLearningCategory={setLearningCategory}
            isAdminMode={isAdminMode}
            openInlineEditor={openInlineEditor}
            handleDeleteWithUndo={(type, index) => {}}
            handleInsertAt={(type, index) => {}}
            handleBlogClick={setSelectedBlog}
          />
        )}

        {/* 星际之门 */}
        {activeSection === 'stargate' && <StargateSection />}
      </main>

      {/* 全局弹窗 */}
      <GlobalModals
        selectedArticle={selectedArticle}
        selectedPaper={selectedPaper}
        selectedBlog={selectedBlog}
        selectedInternship={selectedInternship}
        onCloseArticle={handleCloseArticle}
        onClosePaper={handleClosePaper}
        onCloseBlog={handleCloseBlog}
        onCloseInternship={handleCloseInternship}
        onRecommendClick={handleRecommendClick}
      />

      {/* 内联编辑器 */}
      <InlineEditWrapper
        inlineEditState={inlineEditState}
        closeInlineEditor={closeInlineEditor}
        handleInlineSave={handleInlineSave}
        openInlineEditor={openInlineEditor}
      />

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
