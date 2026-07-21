import React from 'react';
import Icon from './Icon';

// 「个人简历」已独立为单独项目(ranpin/resume)，部署在同源子路径 /resume/。
// 主站以入口卡片引用，点击进入完整的简历中心。
const RESUME_BASE = '/resume/';
const REPO_URL = 'https://github.com/ranpin/resume';

const TECHS = ['React 18', 'TypeScript', 'Vite', 'Tailwind', 'Zustand'];

const FEATURES: { icon: string; title: string; desc: string }[] = [
  {
    icon: 'edit',
    title: '在线简历编辑器',
    desc: '超级简历式双栏编辑：富文本（字号 / 颜色 / 对齐 / 列表）、多模板、多配色、真·多页 A4，一键导出 PDF。',
  },
  {
    icon: 'folder-open',
    title: '经历库',
    desc: '项目 / 论文 / 实习 / 荣誉的结构化目录，含详情与相关推荐，作为简历素材。',
  },
  {
    icon: 'sparkles',
    title: '大模型生成简历',
    desc: '结合目标岗位 JD、经历库与技术文档，AI 自动生成一份针对性的简历草稿。',
  },
];

const ResumeLaunch: React.FC = () => (
  <div className="max-w-5xl mx-auto">
    {/* 概览卡 */}
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 sm:p-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="min-w-0">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
              <Icon name="user" className="text-blue-600 text-lg" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900 leading-tight">
                个人简历
              </h2>
              <p className="text-sm text-gray-500">
                一个独立的简历中心 —— 在线编辑 · 经历库 · AI 生成
              </p>
            </div>
          </div>
          <p className="text-gray-600 text-sm leading-relaxed mt-4 max-w-xl">
            简历部分已独立成单独项目，可像投递工具一样在线编辑、导出
            PDF，并用大模型按岗位生成。改动实时存本地，满意后一键发布上线。
          </p>
          <div className="flex flex-wrap gap-2 mt-4">
            {TECHS.map((t) => (
              <span
                key={t}
                className="px-2.5 py-1 bg-gray-100 text-gray-600 rounded-md text-xs font-medium"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        <div className="flex sm:flex-col gap-3 flex-shrink-0">
          <a
            href={RESUME_BASE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors whitespace-nowrap"
          >
            打开简历中心
            <Icon name="external-link-alt" />
          </a>
          <a
            href={REPO_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap"
          >
            <Icon name="github" />
            查看源码
          </a>
        </div>
      </div>
    </div>

    {/* 三大能力 */}
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
      {FEATURES.map((f) => (
        <a
          key={f.title}
          href={RESUME_BASE}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all group"
        >
          <div className="w-11 h-11 bg-blue-50 rounded-xl flex items-center justify-center mb-3">
            <Icon name={f.icon} className="text-blue-600 text-lg" />
          </div>
          <h4 className="text-base font-semibold text-gray-800 group-hover:text-blue-600 transition-colors">
            {f.title}
          </h4>
          <p className="text-sm text-gray-500 mt-1 leading-relaxed">{f.desc}</p>
        </a>
      ))}
    </div>
  </div>
);

export default ResumeLaunch;
