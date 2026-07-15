import { useState, lazy, Suspense } from 'react';
import Header from './components/Header';
import ResumeSection from './components/ResumeSection';
import LearningSectionFull from './components/LearningSectionFull';
import HomeSection from './components/HomeSection';
import StargateSection from './components/StargateSection';
import Footer from './components/Footer';
import { usePortfolioStore } from './store/usePortfolioStore';
import type {
  Project,
  Publication,
  BlogPost,
  Internship,
  ContentItem,
} from './types';

// 详情弹窗仅在打开时才需要，按需加载以减小首屏体积
const GlobalModals = lazy(() => import('./components/GlobalModals'));

const App = () => {
  const {
    personalInfo,
    recentNews,
    activeSection,
    learningCategory,
    resumeCategory,
    setActiveSection,
    setLearningCategory,
  } = usePortfolioStore();

  // 详情弹窗的选中项
  const [selectedArticle, setSelectedArticle] = useState<Project | null>(null);
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null);
  const [selectedBlog, setSelectedBlog] = useState<BlogPost | null>(null);
  const [selectedInternship, setSelectedInternship] =
    useState<Internship | null>(null);

  const handleRecommendClick = (item: ContentItem, type: string) => {
    const t = type.toLowerCase();
    if (t === 'project') setSelectedArticle(item as Project);
    else if (t === 'publication') setSelectedPaper(item as Publication);
    else if (t.includes('blog')) setSelectedBlog(item as BlogPost);
    else if (t === 'internship') setSelectedInternship(item as Internship);
  };

  const anyModalOpen =
    selectedArticle || selectedPaper || selectedBlog || selectedInternship;

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

        {activeSection === 'learning' && (
          <LearningSectionFull
            learningCategory={learningCategory}
            setLearningCategory={setLearningCategory}
            onBlogClick={(b) => setSelectedBlog(b)}
          />
        )}

        {activeSection === 'stargate' && <StargateSection />}
      </main>

      <Footer personalInfo={personalInfo} />

      {anyModalOpen && (
        <Suspense fallback={null}>
          <GlobalModals
            selectedArticle={selectedArticle}
            selectedPaper={selectedPaper}
            selectedBlog={selectedBlog}
            selectedInternship={selectedInternship}
            onCloseArticle={() => setSelectedArticle(null)}
            onClosePaper={() => setSelectedPaper(null)}
            onCloseBlog={() => setSelectedBlog(null)}
            onCloseInternship={() => setSelectedInternship(null)}
            onRecommendClick={handleRecommendClick}
          />
        </Suspense>
      )}
    </div>
  );
};

export default App;
