import React from 'react';
import { ViteReactSSG } from 'vite-react-ssg/single-page';
import App from './App';
// 自托管 Inter 字体的 @font-face 定义在 index.css（latin 子集 + 预加载）
import './styles/index.css';
// 代码块语法高亮主题（配合 Markdown 组件的 rehype-highlight）
import 'highlight.js/styles/github.css';

// 单页站点：构建时预渲染为静态 HTML（SSG），运行时再 hydrate。
export const createRoot = ViteReactSSG(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
