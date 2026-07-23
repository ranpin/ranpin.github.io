import { lazy, Suspense, useEffect } from 'react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import { usePortfolioStore } from './store/usePortfolioStore';

// 星际之门用到 Markdown + 代码高亮（highlight.js 较重），按需加载
const StargateSection = lazy(() => import('./components/StargateSection'));
// 文档目录运行时读取 edge-ai-docs 清单，按需加载
const DocsSection = lazy(() => import('./components/DocsSection'));

const SECTIONS = ['home', 'resume', 'docs', 'stargate'];

const App = () => {
  const { personalInfo, recentNews, activeSection, setActiveSection } =
    usePortfolioStore();

  // 板块状态 ↔ URL hash 双向同步：可分享直达链接，浏览器前进/后退可用
  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace(/^#\/?/, '');
      if (SECTIONS.includes(id)) setActiveSection(id);
      else if (!id) setActiveSection('home');
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, [setActiveSection]);

  useEffect(() => {
    const desired = activeSection === 'home' ? '' : `#${activeSection}`;
    if (window.location.hash !== desired) {
      window.history.pushState(
        null,
        '',
        desired || window.location.pathname + window.location.search,
      );
    }
  }, [activeSection]);

  // 星际之门是全屏沉浸式深空板块，跳出常规 container 边距，自行占满视口
  const isStargate = activeSection === 'stargate';
  const isResume = activeSection === 'resume';

  return (
    <div className="min-h-screen flex flex-col bg-warm-gray-50">
      {/* 键盘用户跳过导航直达正文 */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-50 focus:bg-sage-600 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg"
      >
        跳到主要内容
      </a>

      <Header
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        onSectionChange={setActiveSection}
        personalInfo={personalInfo}
      />

      {isStargate ? (
        // 全宽出血：不加 container 内边距，交给 StargateSection 控制尺寸
        <main id="main" className="flex-1 w-full">
          <Suspense
            fallback={
              <div className="py-16 text-center text-warm-gray-400">
                加载中…
              </div>
            }
          >
            <StargateSection />
          </Suspense>
        </main>
      ) : isResume ? (
        // 简历中心全宽出血、去掉卡片外壳，内部应用自带 container 与其他板块对齐。
        // 高度固定为视口高：其编辑器/弹窗均为 fixed 定位，需要稳定的可视框，
        // 超出内容在框内自行滚动
        <main id="main" className="flex-1 w-full">
          <iframe
            src="/resume/"
            title="简历中心"
            className="w-full block border-0 bg-warm-gray-50"
            style={{ height: 'calc(100vh - 60px)' }}
          />
        </main>
      ) : (
        <main
          id="main"
          className="container mx-auto px-4 py-8 flex-1 scroll-mt-16"
        >
          {activeSection === 'home' && (
            <HomeSection personalInfo={personalInfo} recentNews={recentNews} />
          )}

          {activeSection === 'docs' && (
            <Suspense
              fallback={
                <div className="py-16 text-center text-warm-gray-400">
                  加载中…
                </div>
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
