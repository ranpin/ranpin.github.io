import { lazy, Suspense, useEffect, useState } from 'react';
import Header from './components/Header';
import HomeSection from './components/HomeSection';
import Icon from './components/Icon';
import ModeDialog from './components/ModeDialog';
import VisibilityPanel from './components/VisibilityPanel';
import { SECTIONS, SECTION_IDS } from './data/sections';
import { usePortfolioStore } from './store/usePortfolioStore';
import { useVisibilityStore, isSectionShown } from './store/useVisibilityStore';
import { useDocsAvailability } from './store/useDocsAvailability';

// 星际之门用到 Markdown + 代码高亮（highlight.js 较重），按需加载
const StargateSection = lazy(() => import('./components/StargateSection'));
// 文档目录运行时读取 edge-ai-docs 清单，按需加载
const DocsSection = lazy(() => import('./components/DocsSection'));

const App = () => {
  const { personalInfo, recentNews, activeSection, setActiveSection } =
    usePortfolioStore();
  const presentationMode = usePortfolioStore((s) => s.presentationMode);
  const sectionVisibility = useVisibilityStore((s) => s.sections);
  const docsAvailable = useDocsAvailability((s) => s.available);
  const docsChecked = useDocsAvailability((s) => s.checked);
  const checkDocs = useDocsAvailability((s) => s.check);

  // 探测 edge-ai-docs 仓库可见性：公开→显示「技术文档」，私有→隐藏（导航+路由）。仅挂载时一次。
  useEffect(() => {
    checkDocs();
  }, [checkDocs]);

  // 演示模式解锁弹窗：界面上无可见入口，仅通过隐藏快捷键 Ctrl/Cmd+Shift+M 唤出。
  const [modeDialogOpen, setModeDialogOpen] = useState(false);
  // 演示配置面板：仅完整模式下可打开（入口按钮也只在完整模式渲染）。
  const [configOpen, setConfigOpen] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === 'M' || e.key === 'm')
      ) {
        e.preventDefault();
        setModeDialogOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

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
  // 安全网：演示模式下即便 activeSection 落在被隐藏的板块（如状态竞争），也不渲染其内容。
  // 是否隐藏由可见性配置决定（配置优先，未配置回退代码默认）。
  // 「技术文档」不在此列：它由「仓库可见性 + 模式」单独治理（见下方 docs 路由分支）。
  const activeMeta = SECTIONS.find((s) => s.id === activeSection);
  const hiddenByPresentation =
    presentationMode &&
    !!activeMeta &&
    activeMeta.id !== 'docs' &&
    !isSectionShown(activeMeta, sectionVisibility);

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
        onOpenConfig={() => setConfigOpen(true)}
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
            如需查看完整内容，请联系站点主人
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
            // 把主站模式透传给简历中心：演示模式下其私密项目同样被隐藏。
            // 切换模式会改变 src 从而重载 iframe，属预期行为。
            src={`/openResume/?mode=${presentationMode ? 'present' : 'full'}`}
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
            !docsChecked ? (
              <div className="py-16 text-center text-warm-gray-400">
                加载中…
              </div>
            ) : docsAvailable ? (
              <Suspense
                fallback={
                  <div className="py-16 text-center text-warm-gray-400">
                    加载中…
                  </div>
                }
              >
                <DocsSection />
              </Suspense>
            ) : !presentationMode ? (
              // 完整模式 + 仓库私有：线上无内容（Free 套餐私有即停用 Pages），给本地预览指引
              <div className="py-20 flex flex-col items-center justify-center text-center max-w-md mx-auto">
                <Icon name="lock" className="text-4xl text-warm-gray-300 mb-4" />
                <p className="text-warm-gray-700 font-medium mb-2">
                  文档仓库当前为私有，线上无法预览
                </p>
                <p className="text-sm text-warm-gray-500 mb-3">
                  本地预览（无需公开仓库）——在 edge-ai-docs 仓库目录运行：
                </p>
                <pre className="text-left text-xs bg-warm-gray-100 text-warm-gray-700 rounded-lg px-4 py-3 whitespace-pre-wrap">
{`python3 _build/build.py
cd dist && python3 -m http.server 8000`}
                </pre>
                <p className="text-sm text-warm-gray-400 mt-3">
                  然后打开 http://localhost:8000
                </p>
              </div>
            ) : (
              // 演示模式 + 私有：导航已隐藏该入口，此处为直达 hash 的兜底
              <div className="py-24 flex flex-col items-center justify-center text-center">
                <Icon name="lock" className="text-4xl text-warm-gray-300 mb-4" />
                <p className="text-warm-gray-500 font-medium">
                  该内容当前不可用
                </p>
              </div>
            )
          )}
        </main>
      )}

      {modeDialogOpen && <ModeDialog onClose={() => setModeDialogOpen(false)} />}

      {configOpen && <VisibilityPanel onClose={() => setConfigOpen(false)} />}
    </div>
  );
};

export default App;
