import React from 'react';

/**
 * 极轻量内联富文本：把字符串里的 **粗体** / *斜体* / `代码` / [文本](链接)
 * 渲染成 React 节点（不使用 dangerouslySetInnerHTML，天然无 XSS）。
 * 仅支持非嵌套的内联语法，足够简历要点使用，且零第三方依赖、不增大主包。
 */

const TOKEN =
  /(\*\*([^*]+)\*\*|\*([^*]+)\*|`([^`]+)`|\[([^\]]+)\]\(([^)\s]+)\))/g;

export function formatInline(text?: string): React.ReactNode {
  if (!text) return text ?? null;
  const nodes: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  TOKEN.lastIndex = 0;
  while ((m = TOKEN.exec(text)) !== null) {
    if (m.index > last) nodes.push(text.slice(last, m.index));
    if (m[2] !== undefined) {
      nodes.push(<strong key={key++}>{m[2]}</strong>);
    } else if (m[3] !== undefined) {
      nodes.push(<em key={key++}>{m[3]}</em>);
    } else if (m[4] !== undefined) {
      nodes.push(
        <code
          key={key++}
          className="px-1 rounded bg-gray-100 text-[0.9em] font-mono"
        >
          {m[4]}
        </code>,
      );
    } else if (m[5] !== undefined) {
      nodes.push(
        <a
          key={key++}
          href={m[6]}
          target="_blank"
          rel="noreferrer"
          className="text-blue-600 hover:underline"
        >
          {m[5]}
        </a>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}
