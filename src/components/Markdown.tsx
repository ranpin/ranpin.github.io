import React from 'react';
import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';

interface MarkdownProps {
  children?: string;
  /** 额外的 prose 尺寸/主题类，如 "prose-sm prose-blue" */
  className?: string;
  /** 可选：覆盖部分元素的渲染（如自定义链接跳转） */
  components?: Components;
}

/**
 * 统一的 Markdown 渲染组件：react-markdown + GFM，外层套 Tailwind Typography 的 prose。
 * 用于文章正文与项目详情的长文本字段。
 */
const Markdown: React.FC<MarkdownProps> = ({
  children,
  className = '',
  components,
}) => (
  <div className={`prose max-w-none ${className}`.trim()}>
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeHighlight]}
      components={components}
    >
      {children || ''}
    </ReactMarkdown>
  </div>
);

export default Markdown;
