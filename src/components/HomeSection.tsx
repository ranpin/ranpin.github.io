import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { homeReadme } from '../data/content';

// 首页内容 = ranpin/ranpin 的 profile README（构建时由 scripts/sync-home-readme.mjs
// 同步进 content/home-readme.md）。本文件只决定「怎么显示」——配色、排版、链接可点性
// 全由主站掌控；要改首页内容只需改 README，不用动这里。
//
// 链接一律「主色 + 常驻下划线」：仅靠加粗不足以传达可点击（用户 2026-10-19 反馈），
// 下划线是最普适的可点信号，因此不做成 hover 才出现。
const components: Components = {
  a: ({ href, children }) => {
    const external = !!href && /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        className="font-semibold text-sage-700 underline decoration-sage-300 decoration-2 underline-offset-[3px] transition-colors hover:text-sage-900 hover:decoration-sage-600"
      >
        {children}
      </a>
    );
  },
  // README 用 h3 作自我介绍标题
  h3: ({ children }) => (
    <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-warm-gray-900 leading-snug">
      {children}
    </h3>
  ),
  // README 用 h4 作分类标题（🧰 工具 / 🤖 机器人 / 🚗 座舱 / 🛣️ 自动驾驶 / 🎓 本科）
  h4: ({ children }) => (
    <h4 className="mt-10 mb-3.5 flex items-center gap-2.5 text-base sm:text-lg font-bold text-warm-gray-900">
      <span
        className="h-4 w-1 flex-none rounded-full bg-sage-500"
        aria-hidden="true"
      />
      <span>{children}</span>
    </h4>
  ),
  p: ({ children }) => (
    <p className="my-3 leading-relaxed text-warm-gray-700">{children}</p>
  ),
  ul: ({ children }) => (
    <ul className="my-3 list-disc space-y-2 pl-5 marker:text-sage-400">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="leading-relaxed text-warm-gray-700">{children}</li>
  ),
  hr: () => <hr className="my-8 border-warm-gray-200" />,
};

const HomeSection: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {homeReadme}
      </ReactMarkdown>
    </div>
  );
};

export default HomeSection;
