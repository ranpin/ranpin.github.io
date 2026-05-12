# 项目架构与技术栈

## 🏗️ 架构图

![Project Architecture](https://i2rq7l4yrx.ai-app.pub)

## 🛠️ 技术栈概览

### 核心框架
- **React 18**: 采用并发特性与 Hooks 模式构建高效 UI。
- **TypeScript**: 实现全量强类型覆盖，提升代码健壮性与开发体验。
- **Zustand**: 轻量级状态管理库，负责全局数据持久化与分发。
- **Vite 5**: 极速构建工具，提供毫秒级热更新（HMR）体验。

### 样式与动画
- **Tailwind CSS 3**: 原子化 CSS 框架，确保设计风格统一且易于维护。
- **Framer Motion**: 为页面切换、列表增删及微交互提供流畅的动画效果。
- **Google Fonts**: 选用 Inter 与 Noto Serif SC 字体，兼顾现代感与阅读舒适度。

### 工程化底座
- **ESLint + Prettier**: 自动化代码规范检查与格式化。
- **Husky + lint-staged**: Git 提交前自动执行质量门禁，确保仓库整洁。
- **Vitest + React Testing Library**: 单元测试框架，保障核心业务逻辑稳定性。
- **GitHub Actions**: 自动化 CI/CD 流水线，支持多版本 Node.js 测试与自动部署。

## 📂 目录结构说明

```text
src/
├── components/          # UI 组件层（全部 .tsx）
│   ├── sections/        # 业务板块组件 (Home, Resume, Learning...)
│   ├── modals/          # 全局弹窗与编辑器
│   └── common/          # 通用基础组件
├── hooks/               # 自定义 Hooks (逻辑复用)
├── store/               # Zustand Store 定义
├── types/               # TypeScript 全局类型定义
├── data/                # 静态数据模板
└── App.tsx              # 应用入口与路由分发
```

## 🚀 性能与优化

- **代码分割**: 利用 Vite 的动态导入特性，实现按需加载。
- **渲染优化**: 核心展示组件均使用 `React.memo` 包裹，减少非必要重绘。
- **图片懒加载**: 首屏关键资源优先加载，长列表图片采用原生 `loading="lazy"`。
- **状态持久化**: 通过 Zustand 中间件自动同步 LocalStorage，避免手动操作带来的性能损耗。

---
*最后更新时间: 2026年5月*