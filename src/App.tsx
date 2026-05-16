import { useState } from 'react';
import Header from './components/Header';
import ResumeSection from './components/ResumeSection';
import LearningSectionFull from './components/LearningSectionFull';
import HomeSection from './components/HomeSection';
import StargateSection from './components/StargateSection';
import GlobalModals from './components/GlobalModals';
import InlineEditWrapper from './components/InlineEditWrapper';
import AdminPanel from './components/AdminPanel';
import {
  usePortfolioStore,
  Project,
  Publication,
  BlogPost,
  Internship,
  PersonalInfo,
  Honor,
  NewsItem,
} from './store/usePortfolioStore';
import { useResumeTabs } from './hooks/useResumeTabs';

const App = () => {
  // 从 store 获取所有状态和 actions
  const {
    // 数据状态
    personalInfo,
    recentNews,

    // UI 状态
    activeSection,
    learningCategory,
    resumeCategory,
    inlineEditState,
    deletedItems,
    showUndoToast,
    isAdminMode,

    // Actions - UI 状态
    setActiveSection,
    setLearningCategory,
    setIsAdminMode,

    // Actions - Inline 编辑
    openInlineEditor,
    closeInlineEditor,

    // Actions - 删除撤回
    hideUndoToast,
    undoTimer,
    setUndoTimer,
  } = usePortfolioStore();

  // 使用自定义 Hooks 管理简历 Tab 逻辑
  useResumeTabs();

  // 本地 UI 状态
  const [showAdminPanel, setShowAdminPanel] = useState(false);

  // 全局弹窗状态（已迁移至 Store，此处为兼容旧代码的临时处理，后续需进一步迁移）
  const [selectedArticle, setSelectedArticle] = useState<Project | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedInternship, setSelectedInternship] =
    useState<Internship | null>(null);

  // 处理函数定义...
  const handleCloseArticle = () => setSelectedArticle(null);
  const handleClosePaper = () => setSelectedPaper(null);
  const handleCloseBlog = () => setSelectedBlog(null);
  const handleCloseInternship = () => setSelectedInternship(null);

  const handleRecommendClick = (
    item: Project | Publication | BlogPost | Internship,
    type: string,
  ) => {
    if (type === 'project') setSelectedArticle(item as Project);
    else if (type === 'publication') setSelectedPaper(item as Publication);
    else if (type.includes('blog')) setSelectedBlog(item as BlogPost);
    else if (type === 'internship') setSelectedInternship(item as Internship);
  };

  const handleInlineSave = (
    _data:
      | PersonalInfo
      | Project
      | Publication
      | Internship
      | Honor
      | BlogPost
      | NewsItem
      | null,
  ) => {
    closeInlineEditor();
  };

  const handleResetData = () => {};
  const handleExportData = () => {};
  const handleImportData = () => {};

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onSectionChange={setActiveSection}
        isAdminMode={isAdminMode}
        onToggleAdmin={() => setIsAdminMode(!isAdminMode)}
        onOpenAdmin={() => setShowAdminPanel(true)}
        personalInfo={personalInfo}
      />

      <main className="container mx-auto px-4 py-8">
        {activeSection === 'home' && (
          <HomeSection
            personalInfo={personalInfo}
            recentNews={recentNews}
            onRecommendClick={handleRecommendClick}
            isAdminMode={isAdminMode}
            onUpdateItemAt={(index, data) => {
              /* TODO */
            }}
            onDeleteItemAt={(index) => {
              /* TODO */
            }}
            onAddItemAt={(index, item) => {
              /* TODO */
            }}
          />
        )}

        {activeSection === 'resume' && (
          <ResumeSection
            resumeCategory={resumeCategory}
            projects={[]} // TODO: 从 store 获取
            publications={[]} // TODO: 从 store 获取
            internships={[]} // TODO: 从 store 获取
            honors={[]} // TODO: 从 store 获取
            onRecommendClick={handleRecommendClick}
            isAdminMode={isAdminMode}
          />
        )}

        {activeSection === 'learning' && (
          <LearningSectionFull
            learningCategory={learningCategory}
            academicBlogs={[]} // TODO: 从 store 获取
            engineeringBlogs={[]} // TODO: 从 store 获取
            onRecommendClick={handleRecommendClick}
            isAdminMode={isAdminMode}
          />
        )}

        {activeSection === 'stargate' && (
          <StargateSection
            customContent={[]} // TODO: 从 store 获取
            onRecommendClick={handleRecommendClick}
            isAdminMode={isAdminMode}
          />
        )}
      </main>

      <GlobalModals
        selectedArticle={selectedArticle}
        selectedPaper={selectedPaper}
        selectedBlog={selectedBlog}
        selectedInternship={selectedInternship}
        onCloseArticle={handleCloseArticle}
        onClosePaper={handleClosePaper}
        onCloseBlog={handleCloseBlog}
        onCloseInternship={handleCloseInternship}
      />

      {inlineEditState.isVisible && (
        <InlineEditWrapper
          isVisible={inlineEditState.isVisible}
          type={inlineEditState.type || ''}
          data={inlineEditState.data}
          index={inlineEditState.index}
          onSave={handleInlineSave}
          onClose={closeInlineEditor}
        />
      )}

      {showAdminPanel && (
        <AdminPanel
          onClose={() => setShowAdminPanel(false)}
          onReset={handleResetData}
          onExport={handleExportData}
          onImport={handleImportData}
        />
      )}

      {showUndoToast && (
        <div className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded shadow-lg">
          已删除项目
          <button
            onClick={() => {
              /* TODO: 实现撤销逻辑 */
              hideUndoToast();
            }}
            className="ml-4 text-blue-400 hover:text-blue-300"
          >
            撤销
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
