import { lazy, Suspense } from 'react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import Footer from './components/Footer';
import { usePortfolioStore } from './store/usePortfolioStore';

// 「个人简历」已独立为 ranpin/resume 项目，主站用入口卡片引用
const ResumeLaunch = lazy(() => import('./components/ResumeLaunch'));
// 星际之门用到 Markdown + 代码高亮（highlight.js 较重），按需加载
const StargateSection = lazy(() => import('./components/StargateSection'));
// 文档目录运行时读取 edge-ai-docs 清单，按需加载
const DocsSection = lazy(() => import('./components/DocsSection'));

const App = () => {
  const { personalInfo, recentNews, activeSection, setActiveSection } =
    usePortfolioStore();

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
          <Suspense
            fallback={
              <div className="py-16 text-center text-gray-400">加载中…</div>
            }
          >
            <ResumeLaunch />
          </Suspense>
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
    </div>
  );
};

export default App;
