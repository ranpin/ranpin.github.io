import React from 'react';
import Icon from './Icon';

// 「个人简历」已独立为单独项目(ranpin/resume)，部署在同源子路径 /resume/。
// 主站以入口卡片引用，点击进入完整的简历中心。
const RESUME_BASE = '/resume/';

const FEATURES: { icon: string; title: string; desc: string }[] = [
  {
    icon: 'edit',
    title: '在线简历编辑器',
    desc: '超级简历式双栏编辑：富文本(字号/颜色/对齐/列表)、多模板、多配色、真·多页 A4、一键导出 PDF。',
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
    <div className="text-center mb-8">
      <Icon name="user" className="text-3xl text-blue-600" />
      <h2 className="text-2xl font-bold text-gray-900 mt-2">个人简历</h2>
      <p className="text-gray-500 mt-1">
        一个独立的简历中心：在线编辑器 · 经历库 · 大模型生成
      </p>
      <a
        href={RESUME_BASE}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        打开简历中心
        <Icon name="external-link-alt" className="ml-2" />
      </a>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

    <p className="text-center text-xs text-gray-400 mt-8">
      简历中心是独立项目，源码见{' '}
      <a
        href="https://github.com/ranpin/resume"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        github.com/ranpin/resume
      </a>
    </p>
  </div>
);

export default ResumeLaunch;
