import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import rehypeRaw from 'rehype-raw';
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
  // README 项目区是「时间 | 项目」两列表格（GitHub 侧用表格实现左右布局）。
  // 主站把它渲染成时间轴：时间列在左，竖线 + 圆点节点居中，项目列在右。
  // 单元格内 <br> 分行依赖 rehypeRaw（react-markdown 默认跳过原始 HTML）。
  table: ({ children }) => (
    <table className="my-8 w-full border-collapse text-left">{children}</table>
  ),
  th: ({ children }) => (
    <th className="border-b border-warm-gray-200 pb-2 pr-4 text-left text-xs font-semibold tracking-wide text-warm-gray-400 last:pl-6">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="align-top py-4 leading-relaxed text-warm-gray-700 first:w-36 first:pr-4 first:font-semibold first:tabular-nums first:text-sage-700 first:whitespace-nowrap sm:first:w-40 last:relative last:border-l-2 last:border-sage-200 last:pl-6 last:before:absolute last:before:-left-1.5 last:before:top-[24px] last:before:h-2.5 last:before:w-2.5 last:before:rounded-full last:before:bg-sage-400 last:before:content-['']">
      {children}
    </td>
  ),
};

const HomeSection: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {homeReadme}
      </ReactMarkdown>
    </div>
  );
};

export default HomeSection;
