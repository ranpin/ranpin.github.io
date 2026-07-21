import React, { useEffect, useState } from 'react';
import Icon from './Icon';

// 文档目录来自独立仓库 edge-ai-docs（同域子路径），运行时读取其清单 docs.json。
// 这样文档内容与主站解耦：docs 仓库独立维护/部署，主站只负责用自己的视觉呈现目录。
const DOCS_BASE = '/edge-ai-docs/';
const MANIFEST_URL = `${DOCS_BASE}docs.json`;

interface DocItem {
  title: string;
  file: string;
  desc?: string;
  tags?: string[];
  badge?: string;
  status?: 'done' | 'wip' | 'todo';
}
interface Project {
  name: string;
  period?: string;
  desc?: string;
  docs: DocItem[];
}
interface Category {
  name: string;
  note?: string;
  general?: DocItem[];
  projects?: Project[];
}
// 旧结构（扁平分组），保留以兼容部署窗口内尚未更新的 docs.json
interface DocGroup {
  name: string;
  note?: string;
  docs: DocItem[];
}
interface Manifest {
  title?: string;
  subtitle?: string;
  categories?: Category[];
  groups?: DocGroup[];
}

const badgeClass = (status?: string) =>
  status === 'wip'
    ? 'bg-amber-100 text-amber-700'
    : status === 'todo'
      ? 'bg-gray-100 text-gray-500'
      : 'bg-green-100 text-green-700';

// 新结构 categories；老结构 groups 回退成「仅通用文档」的大类
const normalize = (data: Manifest): Category[] => {
  if (data.categories) return data.categories;
  return (data.groups || []).map((g) => ({
    name: g.name,
    note: g.note,
    general: g.docs,
    projects: [],
  }));
};

const DocCard: React.FC<{ doc: DocItem }> = ({ doc }) => (
  <a
    href={`${DOCS_BASE}${doc.file}`}
    target="_blank"
    rel="noopener noreferrer"
    className="relative block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all group"
  >
    {doc.badge && (
      <span
        className={`absolute top-3 right-3 text-[10px] font-bold px-2 py-0.5 rounded ${badgeClass(
          doc.status,
        )}`}
      >
        {doc.badge}
      </span>
    )}
    <h4 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors pr-14">
      {doc.title}
    </h4>
    {doc.desc && (
      <p className="text-sm text-gray-500 mt-1 line-clamp-3">{doc.desc}</p>
    )}
    {doc.tags && doc.tags.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mt-3">
        {doc.tags.map((t) => (
          <span
            key={t}
            className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded text-xs"
          >
            {t}
          </span>
        ))}
      </div>
    )}
  </a>
);

const SubHead: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h4 className="flex items-center gap-3 text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
    <span className="whitespace-nowrap">{children}</span>
    <span className="flex-1 h-px bg-gray-200" />
  </h4>
);

const DocsSection: React.FC = () => {
  const [data, setData] = useState<Manifest | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'error'>('loading');

  useEffect(() => {
    let alive = true;
    fetch(MANIFEST_URL, { cache: 'no-cache' })
      .then((r) => {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then((json: Manifest) => {
        if (alive) {
          setData(json);
          setState('ready');
        }
      })
      .catch(() => alive && setState('error'));
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className="max-w-5xl mx-auto">
      {/* 标题与说明 */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center">
          <Icon name="book" className="text-blue-500 mr-3" />
          技术文档
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {data?.subtitle ||
            '端侧 AI 学习文档与面试指南 —— 智能座舱、通用机器人、自动驾驶。'}
        </p>
        <a
          href={DOCS_BASE}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          打开完整知识库
          <Icon name="external-link-alt" className="ml-2" />
        </a>
      </div>

      {state === 'loading' && (
        <div className="text-center py-16 text-gray-400">
          <Icon name="spinner" spin className="text-3xl" />
          <p className="mt-3">正在加载文档目录…</p>
        </div>
      )}

      {state === 'error' && (
        <div className="text-center py-16 text-gray-500">
          <Icon name="exclamation-triangle" className="text-3xl mb-3" />
          <p>目录加载失败（本地开发环境下需线上访问）。</p>
          <a
            href={DOCS_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline mt-2 inline-block"
          >
            直接前往知识库 →
          </a>
        </div>
      )}

      {state === 'ready' &&
        normalize(data!).map((cat) => (
          <section key={cat.name} className="mb-14">
            {/* 大类标题 */}
            <div className="flex items-baseline gap-3 pb-3 mb-6 border-b border-gray-200">
              <h3 className="text-2xl font-extrabold text-gray-900">
                {cat.name}
              </h3>
              {cat.note && (
                <span className="text-sm text-gray-400">{cat.note}</span>
              )}
            </div>

            {/* 上半部分：通用文档（网格） */}
            {cat.general && cat.general.length > 0 && (
              <div className="mb-8">
                <SubHead>通用文档 · 基础与面试</SubHead>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {cat.general.map((doc) => (
                    <DocCard key={doc.file} doc={doc} />
                  ))}
                </div>
              </div>
            )}

            {/* 下半部分：项目（竖向时间轴） */}
            {cat.projects && cat.projects.length > 0 && (
              <div>
                <SubHead>项目 · 时间轴</SubHead>
                <div className="relative pl-8">
                  {/* 时间轴竖线 */}
                  <span className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-blue-500 to-gray-200" />
                  {cat.projects.map((p) => (
                    <div key={p.name} className="relative mb-10 last:mb-0">
                      {/* 节点圆点 */}
                      <span className="absolute -left-[26px] top-1 w-3.5 h-3.5 rounded-full bg-white border-[3px] border-blue-500 ring-4 ring-white" />
                      <div className="flex items-baseline flex-wrap gap-x-3 gap-y-1 mb-1">
                        <span className="text-lg font-bold text-gray-800">
                          {p.name}
                        </span>
                        {p.period && (
                          <span className="text-[11px] font-semibold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full whitespace-nowrap">
                            {p.period}
                          </span>
                        )}
                      </div>
                      <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {p.docs.map((doc) => (
                          <DocCard key={doc.file} doc={doc} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </section>
        ))}
    </div>
  );
};

export default DocsSection;
