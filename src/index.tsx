import React from 'react';
import { ViteReactSSG } from 'vite-react-ssg/single-page';
// 自托管 Inter 字体（替代 render-blocking 的 Google Fonts 外链）
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import App from './App';
import './styles/index.css';

// 单页站点：构建时预渲染为静态 HTML（SSG），运行时再 hydrate。
export const createRoot = ViteReactSSG(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
