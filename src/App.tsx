import { useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import ResumeSection from './components/ResumeSection';
import HomeSection from './components/HomeSection';
import Footer from './components/Footer';
import { usePortfolioStore } from './store/usePortfolioStore';
import type { Project, Publication, Internship, ContentItem } from './types';

// 详情弹窗仅在打开时才需要，按需加载以减小首屏体积
const GlobalModals = lazy(() => import('./components/GlobalModals'));
// 星际之门用到 Markdown + 代码高亮（highlight.js 较重），按需加载
const StargateSection = lazy(() => import('./components/StargateSection'));
// 文档目录运行时读取 edge-ai-docs 清单，按需加载
const DocsSection = lazy(() => import('./components/DocsSection'));

const App = () => {
  const {
    personalInfo,
    recentNews,
    activeSection,
    resumeCategory,
    setActiveSection,
  } = usePortfolioStore();

  // 详情弹窗的选中项
  const [selectedArticle, setSelectedArticle] = useState<Project | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null);
  const [selectedInternship, setSelectedInternship] =
    useState<Internship | null>(null);

  const handleRecommendClick = (item: ContentItem, type: string) => {
    const t = type.toLowerCase();
    if (t === 'project') setSelectedArticle(item as Project);
    else if (t === 'publication') setSelectedPaper(item as Publication);
    else if (t === 'internship') setSelectedInternship(item as Internship);
  };

  const anyModalOpen =
    selectedArticle || selectedPaper || selectedInternship;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onSectionChange={setActiveSection}
        personalInfo={personalInfo}
      />

      <main className="container mx-auto px-4 py-8 flex-1">
        {activeSection === 'home' && (
          <HomeSection personalInfo={personalInfo} recentNews={recentNews} />
        )}

        {activeSection === 'resume' && (
          <ResumeSection
            resumeCategory={resumeCategory}
            onArticleClick={(p) => setSelectedArticle(p)}
            onPaperClick={(p) => setSelectedPaper(p)}
            onInternshipClick={(i) => setSelectedInternship(i)}
          />
        )}

        {activeSection === 'docs' && (
          <Suspense
            fallback={
              <div className="py-16 text-center text-gray-400">加载中…</div>
            }
          >
            <DocsSection />
          </Suspense>
        )}

        {activeSection === 'stargate' && (
          <Suspense
            fallback={
              <div className="py-16 text-center text-gray-400">加载中…</div>
            }
          >
            <StargateSection />
          </Suspense>
        )}
      </main>

      <Footer personalInfo={personalInfo} />

      {anyModalOpen && (
        <Suspense fallback={null}>
          <GlobalModals
            selectedArticle={selectedArticle}
            selectedPaper={selectedPaper}
            selectedInternship={selectedInternship}
            onCloseArticle={() => setSelectedArticle(null)}
            onClosePaper={() => setSelectedPaper(null)}
            onCloseInternship={() => setSelectedInternship(null)}
            onRecommendClick={handleRecommendClick}
          />
        </Suspense>
      )}
    </div>
  );
};

export default App;
