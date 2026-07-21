import { lazy, Suspense } from 'react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import Footer from './components/Footer';
import { usePortfolioStore } from './store/usePortfolioStore';

// 星际之门用到 Markdown + 代码高亮（highlight.js 较重），按需加载
const StargateSection = lazy(() => import('./components/StargateSection'));
// 文档目录运行时读取 edge-ai-docs 清单，按需加载
const DocsSection = lazy(() => import('./components/DocsSection'));

const App = () => {
  const { personalInfo, recentNews, activeSection, setActiveSection } =
    usePortfolioStore();

  // 星际之门是全屏沉浸式深空板块，跳出常规 container 边距，自行占满视口
  const isStargate = activeSection === 'stargate';

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onSectionChange={setActiveSection}
        personalInfo={personalInfo}
      />

      {isStargate ? (
        // 全宽出血：不加 container 内边距，交给 StargateSection 控制尺寸
        <main className="flex-1 w-full">
          <Suspense
            fallback={
              <div className="py-16 text-center text-gray-400">加载中…</div>
            }
          >
            <StargateSection />
          </Suspense>
        </main>
      ) : (
        <main className="container mx-auto px-4 py-8 flex-1">
          {activeSection === 'home' && (
            <HomeSection personalInfo={personalInfo} recentNews={recentNews} />
          )}

          {activeSection === 'resume' && (
            // 简历中心是独立项目(ranpin/resume)，同源子路径 /resume/，内嵌直接呈现
            <iframe
              src="/resume/"
              title="简历中心"
              className="w-full rounded-2xl border border-gray-200 shadow-sm bg-white"
              style={{ height: 'calc(100vh - 9rem)' }}
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
        </main>
      )}

      {/* 星际之门为全屏沉浸体验，隐藏页脚以免打断深空氛围 */}
      {!isStargate && <Footer personalInfo={personalInfo} />}
    </div>
  );
};

export default App;
