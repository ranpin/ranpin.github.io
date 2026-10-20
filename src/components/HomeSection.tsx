import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { homeReadme } from '../data/content';

// 首页内容 = ranpin/ranpin 的 profile README（构建时由 scripts/sync-home-readme.mjs
// 同步进 content/home-readme.md）。本文件只决定「怎么显示」——配色、排版、链接可点性
// 全由主站掌控；要改首页内容只需改 README，不用动这里。
//
// 两类链接区别对待（用户 2026-10-19 要求「一眼看出哪些项目有 demo」）：
//   ① 仓库链接 → 主色 + 常驻下划线（仅靠加粗不足以传达可点击）；
//   ② demo 链接 → 胶囊徽章，视觉上和普通链接分开。README 侧自 2026-10-20 起写成
//      [![🎬 演示Demo](demo-badge.svg)](…)：GitHub 上图片链接没有文字下划线，
//      与项目名文字链接明显区分；主站不渲染徽章图，统一渲染自己的主题感知胶囊。

// react-markdown 传进来的 children 可能是字符串、节点数组或元素（如徽章 <img>），
// 取纯文本用于判定链接类型；图片取其 alt 文案。
const textOf = (node: React.ReactNode): string => {
  if (node == null || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(textOf).join('');
  if (React.isValidElement(node)) {
    const props = node.props as { alt?: unknown; children?: React.ReactNode };
    if (typeof props.alt === 'string') return props.alt;
    return textOf(props.children);
  }
  return '';
};

const components: Components = {
  a: ({ href, children }) => {
    const external = !!href && /^https?:\/\//i.test(href);
    const extAttrs = external
      ? ({ target: '_blank', rel: 'noopener noreferrer' } as const)
      : {};

    // demo 链接 → 胶囊徽章。README 侧为在 GitHub 上与项目名区分，写成
    // [<sup>🎬 演示Demo</sup>](…)；react-markdown 不渲染原始 HTML，会把 <sup>
    // 转义成可见文本，故这里剥掉 HTML 标记后只渲染干净文案。
    const rawText = textOf(children);
    if (/演示/.test(rawText)) {
      const label =
        rawText.replace(/<\/?[a-z][^>]*>/gi, '').trim() || '🎬 演示Demo';
      return (
        <a
          href={href}
          {...extAttrs}
          title="打开在线演示"
          className="mx-0.5 inline-flex items-center rounded-full bg-sage-50 px-2 py-0.5 align-middle text-xs font-semibold text-sage-700 ring-1 ring-inset ring-sage-200 transition-colors hover:bg-sage-100 hover:text-sage-900"
        >
          {label}
        </a>
      );
    }

    // 普通链接（仓库 / 站点入口）→ 主色 + 常驻下划线
    return (
      <a
        href={href}
        {...extAttrs}
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
  // 时间轴段：README 项目区每个时间段是一个 blockquote（时间行 + 分类行 + 项目列表）。
  // 渲染成竖向时间轴：左侧连续竖线（after）+ 每段一个圆点节点（before，z-10 压在线上）；
  // 时间行蔚蓝 semibold + tabular-nums，分类行加深。段间 my-0、间距全靠 padding，竖线才连续。
  blockquote: ({ children }) => (
    <blockquote className="relative my-0 border-l-0 pb-2 pl-8 pt-6 before:absolute before:left-0 before:top-[35px] before:z-10 before:h-3 before:w-3 before:rounded-full before:bg-sage-500 before:content-[''] after:absolute after:bottom-0 after:left-[5px] after:top-0 after:w-0.5 after:bg-sage-200 after:content-[''] [&>p:first-of-type]:font-semibold [&>p:first-of-type]:tabular-nums [&>p:first-of-type]:text-sage-700 [&>p:nth-of-type(2)]:font-bold [&>p:nth-of-type(2)]:text-warm-gray-900 [&_p]:my-1">
      {children}
    </blockquote>
  ),
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
