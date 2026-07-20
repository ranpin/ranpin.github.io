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
interface DocGroup {
  name: string;
  note?: string;
  docs: DocItem[];
}
interface Manifest {
  title?: string;
  subtitle?: string;
  groups: DocGroup[];
}

const badgeClass = (status?: string) =>
  status === 'wip'
    ? 'bg-amber-100 text-amber-700'
    : status === 'todo'
      ? 'bg-gray-100 text-gray-500'
      : 'bg-green-100 text-green-700';

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
        data?.groups?.map((group) => (
          <div key={group.name} className="mb-10">
            <h3 className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-4">
              {group.name}
              {group.note && (
                <span className="text-gray-400 ml-2 normal-case tracking-normal">
                  ({group.note})
                </span>
              )}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {group.docs.map((doc) => (
                <a
                  key={doc.file}
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
                    <p className="text-sm text-gray-500 mt-1 line-clamp-3">
                      {doc.desc}
                    </p>
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
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default DocsSection;
