import { lazy, Suspense, useEffect } from 'react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import Icon from './components/Icon';
import { SECTION_IDS, isPrivateSection } from './data/sections';
import { usePortfolioStore } from './store/usePortfolioStore';

// 星际之门用到 Markdown + 代码高亮（highlight.js 较重），按需加载
const StargateSection = lazy(() => import('./components/StargateSection'));
// 文档目录运行时读取 edge-ai-docs 清单，按需加载
const DocsSection = lazy(() => import('./components/DocsSection'));

const App = () => {
  const { personalInfo, recentNews, activeSection, setActiveSection } =
    usePortfolioStore();
  const presentationMode = usePortfolioStore((s) => s.presentationMode);

  // 板块状态 ↔ URL hash 双向同步：可分享直达链接，浏览器前进/后退可用。
  // 演示模式下 private 板块的内容门禁由下方渲染守卫（hiddenByPresentation）统一处理。
  useEffect(() => {
    const applyHash = () => {
      const id = window.location.hash.replace(/^#\/?/, '');
      if (SECTION_IDS.includes(id)) setActiveSection(id);
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
  // 安全网：演示模式下即便 activeSection 落在 private 板块（如状态竞争），也不渲染其内容
  const hiddenByPresentation =
    presentationMode && isPrivateSection(activeSection);

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

      {hiddenByPresentation ? (
        // 演示模式下直达 private 板块时的占位：不暴露内容，仅提示当前模式
        <main
          id="main"
          className="container mx-auto px-4 py-24 flex-1 flex flex-col items-center justify-center text-center"
        >
          <Icon name="lock" className="text-4xl text-warm-gray-300 mb-4" />
          <p className="text-warm-gray-500 font-medium mb-1">
            该板块在演示模式下已隐藏
          </p>
          <p className="text-sm text-warm-gray-400">
            点击右上角「演示模式」开关可切换到完整视图
          </p>
        </main>
      ) : isStargate ? (
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
            src="/openResume/"
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
