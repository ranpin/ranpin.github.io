import { lazy, Suspense } from 'react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
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
  const isResume = activeSection === 'resume';

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
      ) : isResume ? (
        // 简历中心全宽出血、去掉卡片外壳，内部应用自带 container 与其他板块对齐。
        // 高度固定为视口高：其编辑器/弹窗均为 fixed 定位，需要稳定的可视框，
        // 超出内容在框内自行滚动
        <main className="flex-1 w-full">
          <iframe
            src="/resume/"
            title="简历中心"
            className="w-full block border-0 bg-gray-50"
            style={{ height: 'calc(100vh - 60px)' }}
          />
        </main>
      ) : (
        <main className="container mx-auto px-4 py-8 flex-1">
          {activeSection === 'home' && (
            <HomeSection personalInfo={personalInfo} recentNews={recentNews} />
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
    </div>
  );
};

export default App;
