import React, { useEffect, useRef, useState } from 'react';
import { load as parseYaml } from 'js-yaml';
import Icon from './Icon';
import { SECTIONS } from '../data/sections';
import { usePortfolioStore } from '../store/usePortfolioStore';
import {
  useVisibilityStore,
  isSectionShown,
  projectShownByDefault,
} from '../store/useVisibilityStore';

// 与简历中心同一数据源（openResume/src/data/source.ts 中的 DATA_BASE_URL）。
// 项目 id 取文件名主干（slug），与简历中心 loadContent 的 id 规则一致，
// 保证这里的配置键和简历中心 useContentStore 里的 project.id 完全对应。
const DATA_BASE_URL =
  'https://raw.githubusercontent.com/ranpin/openResume-data/main';

interface ProjectEntry {
  id: string;
  title: string;
  visibility?: string;
}

interface VisibilityPanelProps {
  onClose: () => void;
}

const slugOf = (path: string): string =>
  path
    .split('/')
    .pop()!
    .replace(/\.(ya?ml)$/, '');

// 胶囊开关：开启 sage、关闭 warm-gray，滑块内带 eye / eye-off 微图标
const Toggle: React.FC<{
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}> = ({ checked, onChange, label }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
    className={`relative inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sage-500 focus:ring-offset-2 ${
      checked ? 'bg-sage-600' : 'bg-warm-gray-300'
    }`}
  >
    <span
      className={`inline-flex h-5 w-5 transform items-center justify-center rounded-full bg-white shadow transition-transform duration-200 ${
        checked ? 'translate-x-[22px]' : 'translate-x-0.5'
      }`}
    >
      <Icon
        name={checked ? 'eye' : 'eye-off'}
        className={`text-[10px] ${checked ? 'text-sage-600' : 'text-warm-gray-400'}`}
      />
    </span>
  </button>
);

// 分组标题：图标 + 标题 + 右侧计数
const GroupHeading: React.FC<{
  icon: string;
  title: string;
  count: string;
}> = ({ icon, title, count }) => (
  <div className="flex items-center gap-2.5 mb-3">
    <span className="w-7 h-7 rounded-lg bg-sage-100 text-sage-700 flex items-center justify-center">
      <Icon name={icon} className="text-sm" />
    </span>
    <h3 className="font-serif text-base font-bold text-warm-gray-800">
      {title}
    </h3>
    <span className="ml-auto text-xs font-medium text-warm-gray-400">
      {count}
    </span>
  </div>
);

const Tag: React.FC<{ tone: 'sage' | 'gray'; children: React.ReactNode }> = ({
  tone,
  children,
}) => (
  <span
    className={`inline-block px-1.5 py-0.5 rounded text-[10px] font-semibold ${
      tone === 'sage'
        ? 'bg-sage-50 text-sage-600'
        : 'bg-warm-gray-100 text-warm-gray-500'
    }`}
  >
    {children}
  </span>
);

const VisibilityPanel: React.FC<VisibilityPanelProps> = ({ onClose }) => {
  const setPresentationMode = usePortfolioStore((s) => s.setPresentationMode);
  const sectionCfg = useVisibilityStore((s) => s.sections);
  const projectCfg = useVisibilityStore((s) => s.projects);
  const setSectionShown = useVisibilityStore((s) => s.setSectionShown);
  const setProjectShown = useVisibilityStore((s) => s.setProjectShown);
  const resetAll = useVisibilityStore((s) => s.resetAll);

  const [entered, setEntered] = useState(false);
  const [projectList, setProjectList] = useState<ProjectEntry[] | null>(null);
  const [loadFailed, setLoadFailed] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const openerRef = useRef<HTMLElement | null>(null);

  // 抽屉滑入动画：挂载后下一帧切到目标位移
  useEffect(() => {
    const raf = requestAnimationFrame(() =>
      requestAnimationFrame(() => setEntered(true)),
    );
    return () => cancelAnimationFrame(raf);
  }, []);

  // 打开时记住触发按钮、聚焦关闭按钮；关闭（卸载）时焦点归还触发处
  useEffect(() => {
    openerRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => openerRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // 拉取项目清单：index.json 只有路径，标题/visibility 需逐个 YAML 读取
  useEffect(() => {
    let cancelled = false;
    setLoadFailed(false);
    (async () => {
      try {
        const res = await fetch(`${DATA_BASE_URL}/index.json`, {
          cache: 'no-store',
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const index = (await res.json()) as { projects?: string[] };
        const paths = index.projects ?? [];
        const entries = await Promise.all(
          paths.map(async (p): Promise<ProjectEntry> => {
            const r = await fetch(`${DATA_BASE_URL}/${p}`, {
              cache: 'no-store',
            });
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const data = parseYaml(await r.text()) as {
              title?: string;
              visibility?: string;
            };
            return {
              id: slugOf(p),
              title: data?.title || slugOf(p),
              visibility: data?.visibility,
            };
          }),
        );
        if (!cancelled) setProjectList(entries.sort((a, b) => a.id.localeCompare(b.id)));
      } catch {
        if (!cancelled) setLoadFailed(true);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [retryKey]);

  const isProjectShown = (p: ProjectEntry) =>
    projectCfg[p.id] ?? projectShownByDefault(p.visibility);

  const shownSectionCount = SECTIONS.filter((s) =>
    isSectionShown(s, sectionCfg),
  ).length;
  const shownProjectCount = (projectList ?? []).filter(isProjectShown).length;

  return (
    <div className="fixed inset-0 z-50">
      {/* 背景遮罩：点击关闭 */}
      <div
        className={`absolute inset-0 bg-black bg-opacity-50 transition-opacity duration-300 ${
          entered ? 'opacity-100' : 'opacity-0'
        }`}
        onClick={onClose}
      />

      {/* 右侧抽屉 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="visibility-panel-title"
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col transition-transform duration-300 ease-out ${
          entered ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* 顶部饰条 */}
        <div className="h-1 flex-shrink-0 bg-gradient-to-r from-sage-500 via-sage-600 to-sage-700" />

        {/* 头部 */}
        <div className="flex items-start justify-between px-5 py-4 border-b border-warm-gray-200 flex-shrink-0">
          <div>
            <h2
              id="visibility-panel-title"
              className="text-lg font-bold font-serif text-warm-gray-800 flex items-center"
            >
              <Icon name="cog" className="text-sage-500 mr-2" />
              演示配置
            </h2>
            <p className="text-xs text-warm-gray-400 mt-0.5">
              配置演示模式下访客可见的内容
            </p>
          </div>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="关闭演示配置"
            className="w-8 h-8 bg-warm-gray-100 hover:bg-warm-gray-200 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
          >
            <Icon name="times" className="text-warm-gray-600" />
          </button>
        </div>

        {/* 内容区 */}
        <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-7">
          {/* 作用范围说明 */}
          <div className="rounded-xl bg-sage-50 border border-sage-100 px-4 py-3 text-xs leading-relaxed text-sage-800">
            <p className="flex items-start gap-2">
              <Icon name="eye" className="text-sage-500 mt-0.5" />
              <span>
                开关只影响<b>演示模式</b>（访客视角）；完整模式下所有内容照常可见。
                配置保存在<b>本浏览器</b>，用于你自己设备上的演示，不会同步给其他访客。
              </span>
            </p>
          </div>

          {/* 站点板块 */}
          <section>
            <GroupHeading
              icon="layer-group"
              title="站点板块"
              count={`${shownSectionCount}/${SECTIONS.length} 展示`}
            />
            <ul className="space-y-1">
              {SECTIONS.map((s) => {
                const shown = isSectionShown(s, sectionCfg);
                return (
                  <li
                    key={s.id}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-warm-gray-50"
                  >
                    <span
                      className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors ${
                        shown
                          ? 'bg-sage-100 text-sage-700'
                          : 'bg-warm-gray-100 text-warm-gray-400'
                      }`}
                    >
                      <Icon name={s.icon} className="text-base" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium truncate transition-colors ${
                          shown ? 'text-warm-gray-800' : 'text-warm-gray-400'
                        }`}
                      >
                        {s.label}
                      </p>
                      <div className="mt-0.5">
                        {s.visibility === 'private' ? (
                          <Tag tone="gray">默认隐藏</Tag>
                        ) : (
                          <Tag tone="sage">默认展示</Tag>
                        )}
                      </div>
                    </div>
                    <Toggle
                      checked={shown}
                      onChange={(v) => setSectionShown(s.id, v)}
                      label={`${s.label}在演示模式下${shown ? '隐藏' : '展示'}`}
                    />
                  </li>
                );
              })}
            </ul>
          </section>

          {/* 简历中心项目 */}
          <section>
            <GroupHeading
              icon="briefcase"
              title="简历中心 · 项目"
              count={
                projectList
                  ? `${shownProjectCount}/${projectList.length} 展示`
                  : '加载中'
              }
            />

            {loadFailed ? (
              <div className="rounded-xl border border-warm-gray-200 px-4 py-6 text-center">
                <Icon
                  name="exclamation-triangle"
                  className="text-2xl text-warm-gray-300"
                />
                <p className="text-sm text-warm-gray-500 mt-2">
                  项目清单加载失败
                </p>
                <button
                  onClick={() => setRetryKey((k) => k + 1)}
                  className="mt-3 px-3 py-1.5 text-xs font-medium text-sage-700 bg-sage-50 hover:bg-sage-100 rounded-lg transition-colors"
                >
                  重试
                </button>
              </div>
            ) : !projectList ? (
              <div className="rounded-xl border border-warm-gray-200 px-4 py-6 text-center text-warm-gray-400">
                <Icon name="spinner" spin className="text-2xl" />
                <p className="text-sm mt-2">正在加载项目清单…</p>
              </div>
            ) : projectList.length === 0 ? (
              <p className="rounded-xl border border-dashed border-warm-gray-200 px-4 py-5 text-center text-sm text-warm-gray-400">
                数据仓库中暂无项目
              </p>
            ) : (
              <ul className="space-y-1">
                {projectList.map((p) => {
                  const shown = isProjectShown(p);
                  return (
                    <li
                      key={p.id}
                      className="flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-warm-gray-50"
                    >
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-medium leading-snug transition-colors ${
                            shown ? 'text-warm-gray-800' : 'text-warm-gray-400'
                          }`}
                        >
                          {p.title}
                        </p>
                        <div className="mt-0.5">
                          {p.visibility === 'public' ? (
                            <Tag tone="sage">public</Tag>
                          ) : (
                            <Tag tone="gray">默认隐藏</Tag>
                          )}
                        </div>
                      </div>
                      <Toggle
                        checked={shown}
                        onChange={(v) => setProjectShown(p.id, v)}
                        label={`${p.title}在演示模式下${shown ? '隐藏' : '展示'}`}
                      />
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        </div>

        {/* 底部：实时汇总 + 操作 */}
        <div className="flex-shrink-0 border-t border-warm-gray-200 px-5 py-4 space-y-3 bg-warm-gray-50">
          <p className="text-xs text-warm-gray-500 text-center">
            演示模式将展示{' '}
            <b className="text-sage-700">
              {shownSectionCount}/{SECTIONS.length}
            </b>{' '}
            个板块
            {projectList && (
              <>
                {' '}·{' '}
                <b className="text-sage-700">
                  {shownProjectCount}/{projectList.length}
                </b>{' '}
                个项目
              </>
            )}
          </p>
          <div className="flex gap-2">
            <button
              onClick={resetAll}
              className="flex-1 py-2 rounded-lg text-sm font-medium text-warm-gray-600 bg-white border border-warm-gray-200 hover:bg-warm-gray-100 transition-colors"
            >
              恢复默认
            </button>
            <button
              onClick={() => {
                setPresentationMode(true);
                onClose();
              }}
              className="flex-1 py-2 rounded-lg text-sm font-medium text-white bg-sage-600 hover:bg-sage-700 shadow-sm transition-colors flex items-center justify-center gap-1.5"
            >
              <Icon name="eye" className="text-sm" />
              预览演示效果
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisibilityPanel;
