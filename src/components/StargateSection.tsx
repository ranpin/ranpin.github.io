import React, { useState } from 'react';
import Icon from './Icon';
import Markdown from './Markdown';
import { notes } from '../data/content';
import type { Note } from '../types';

type Filter = 'all' | 'til' | 'postmortem';

const TYPE_META: Record<
  'til' | 'postmortem',
  { label: string; icon: string; badge: string; accent: string }
> = {
  til: {
    label: '学习笔记',
    icon: 'lightbulb',
    badge: 'bg-blue-100 text-blue-700',
    accent: 'border-blue-500',
  },
  postmortem: {
    label: '踩坑复盘',
    icon: 'exclamation-triangle',
    badge: 'bg-amber-100 text-amber-700',
    accent: 'border-amber-500',
  },
};

const FILTERS: { key: Filter; label: string }[] = [
  { key: 'all', label: '全部' },
  { key: 'til', label: '学习笔记' },
  { key: 'postmortem', label: '踩坑复盘' },
];

// 从 Markdown 正文提取纯文本摘要
const excerpt = (md: string, n = 110): string => {
  const text = md
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/[#>*`_\-|]/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > n ? text.slice(0, n) + '…' : text;
};

const StargateSection: React.FC = () => {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Note | null>(null);

  const visible = notes.filter((n) => filter === 'all' || n.type === filter);

  return (
    <div className="max-w-4xl mx-auto">
      {/* 标题与使命说明 */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3 flex items-center justify-center">
          <Icon name="star" className="text-yellow-500 mr-3" />
          星际之门
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          简历之外的探索空间 —— 随手记录的学习笔记(TIL)、踩过的坑与复盘。
          真实、零散、持续更新,是我学习过程的一手痕迹。
        </p>
      </div>

      {/* 类型筛选 */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        {FILTERS.map((f) => {
          const count =
            f.key === 'all'
              ? notes.length
              : notes.filter((n) => n.type === f.key).length;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.key
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {f.label}
              <span className="ml-1 opacity-70">{count}</span>
            </button>
          );
        })}
      </div>

      {/* 笔记流 */}
      {visible.length === 0 ? (
        <div className="text-center py-16 text-gray-500">
          <Icon name="star" className="text-4xl mb-4" />
          <p>这里还没有内容,很快就会有 :)</p>
        </div>
      ) : (
        <div className="space-y-4">
          {visible.map((note) => {
            const meta = TYPE_META[note.type || 'til'];
            return (
              <button
                key={note.id}
                onClick={() => setSelected(note)}
                className={`w-full text-left bg-white rounded-xl border-l-4 ${meta.accent} border border-gray-100 shadow-sm hover:shadow-md transition-all p-5`}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${meta.badge}`}
                  >
                    <Icon name={meta.icon} className="mr-1" />
                    {meta.label}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {note.date}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-gray-800 mb-1">
                  {note.title}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {excerpt(note.content || '')}
                </p>
                {note.tags && note.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {note.tags.map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 详情弹窗 */}
      {selected && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl max-h-[95vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b p-6 flex items-start justify-between z-10 rounded-t-2xl">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${
                      TYPE_META[selected.type || 'til'].badge
                    }`}
                  >
                    <Icon
                      name={TYPE_META[selected.type || 'til'].icon}
                      className="mr-1"
                    />
                    {TYPE_META[selected.type || 'til'].label}
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {selected.date}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  {selected.title}
                </h2>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors ml-4 flex-shrink-0"
              >
                <Icon name="times" className="text-gray-600" />
              </button>
            </div>
            <div className="p-6 sm:p-8 overflow-y-auto max-h-[calc(95vh-96px)]">
              <Markdown>{selected.content}</Markdown>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StargateSection;
