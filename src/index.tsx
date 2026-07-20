import React from 'react';
import { ViteReactSSG } from 'vite-react-ssg/single-page';
// 自托管 Inter 字体（替代 render-blocking 的 Google Fonts 外链）
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import App from './App';
import './styles/index.css';
// 代码块语法高亮主题（配合 Markdown 组件的 rehype-highlight）
import 'highlight.js/styles/github.css';
// 打印 / 导出 PDF 时只输出简历文档
import './styles/print.css';
// 简历正文富文本排版
import './styles/resume.css';

// 单页站点：构建时预渲染为静态 HTML（SSG），运行时再 hydrate。
export const createRoot = ViteReactSSG(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
