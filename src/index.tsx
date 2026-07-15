import React from 'react';
import ReactDOM from 'react-dom/client';
// 自托管 Inter 字体（替代 render-blocking 的 Google Fonts 外链）
import '@fontsource/inter/300.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import App from './App';
import './styles/index.css';

const container = document.getElementById('root');
if (!container) {
  throw new Error('未找到 #root 挂载节点');
}

ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
