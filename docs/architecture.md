# 架构与技术实现

## 概览

纯静态个人站点（聚合入口），无后端、无数据库。内容以仓库中的 **Markdown / YAML 文件**为唯一数据源，构建时由加载器读入并**预渲染（SSG）**为静态 HTML，部署到 GitHub Pages，运行时再 hydrate。

站点由四个板块组成：

| 板块 | 实现方式 |
|------|----------|
| 首页 | 个人信息（`profile.yaml`）+ 最新动态（`news.yaml`） |
| 简历中心 | iframe 嵌入同源子路径 `/resume/`（独立仓库 [ranpin/resume](https://github.com/ranpin/resume)） |
| 技术文档 | 运行时 fetch 独立仓库 [edge-ai-docs](https://github.com/ranpin/edge-ai-docs) 的 `docs.json` 清单并渲染目录 |
| 星际之门 | 全屏沉浸式深空体验：Warp 穿越动画 → 数字花园星图（`content/garden/*.md`） |

## 技术栈

| 层 | 选型 |
|---|---|
| UI | React 18 + TypeScript |
| 构建 / 预渲染 | Vite 5 + `vite-react-ssg`（单页模式） |
| 样式 | Tailwind CSS 3 + `@tailwindcss/typography` |
| 状态 | Zustand（仅承载导航等 UI 状态） |
| 内容解析 | `js-yaml`（YAML 与 Markdown frontmatter） |
| 文章渲染 | `react-markdown` + `remark-gfm` + `rehype-highlight` |
| 图标 / 字体 | `lucide-react`（SVG）/ `@fontsource/inter`（自托管） |
| 质量 / 测试 | ESLint(flat) + Prettier + Husky + lint-staged + Vitest |

> 站点无路由库：页面「板块」通过 `App.tsx` 里的 `activeSection` 状态条件渲染切换。

## 数据流

```text
content/*.{yaml,md}
      │  (import.meta.glob + js-yaml)
      ▼
src/data/content.ts            # 加载器：解析并导出类型化数据
      │
      ├──▶ usePortfolioStore   # 只读数据 + 导航 UI 状态
      └──▶ 组件直接 import      # 如 DigitalGarden 直接导入 gardenNotes
      ▼
组件渲染（文章正文经 <Markdown> 渲染）
```

- **加载器** `src/data/content.ts`：用 `import.meta.glob('/content/**', { query: '?raw' })` 在构建期收集文件原文，`js-yaml` 解析 YAML 与 Markdown frontmatter，导出 `personalInfo`（个人信息）、`recentNews`（最新动态）、`gardenNotes`（数字花园节点，跳过 `_` 开头模板与无标题辅助文件，生产构建隐藏 `draft: true`，按 `updated` 倒序）。修改内容只需改 `content/` 下的文件，无需改代码。
- **store** `src/store/usePortfolioStore.ts`：不持久化、不含编辑逻辑，只提供只读数据（`personalInfo`、`recentNews`）与导航状态（`activeSection` / `setActiveSection`）。
- **草稿**：`content/garden/*.md` 的 frontmatter 可写 `draft: true`，生产构建自动隐藏，仅 `npm run dev` 可见。

## 目录结构

```text
content/                # 唯一数据源（见 content/README.md）
├── profile.yaml        # 个人信息 + 社交链接
├── news.yaml           # 最新动态
└── garden/*.md         # 星际之门 · 数字花园：想法节点（星图，非线性、可互链）

public/                 # images/、robots.txt、sitemap.xml、404.html
src/
├── components/
│   ├── Header.tsx          # 顶部导航（四个板块切换 + 移动端个人信息弹窗）
│   ├── HomeSection.tsx     # 首页（个人信息 + 最新动态）
│   ├── Profile.tsx         # 个人信息卡片
│   ├── DocsSection.tsx     # 技术文档（fetch edge-ai-docs 清单渲染目录）
│   ├── StargateSection.tsx # 星际之门（Warp 穿越 + HUD + 数字花园入口）
│   ├── stargate/
│   │   ├── Warp.tsx        # 穿越动画
│   │   ├── Starfield.tsx   # 星空背景
│   │   └── DigitalGarden.tsx # 数字花园星图（节点布局 + 连线 + Markdown 详情）
│   ├── Footer.tsx          # 页脚
│   ├── Icon.tsx            # lucide-react 图标封装
│   └── Markdown.tsx        # react-markdown 渲染（prose 排版 + 代码高亮）
├── store/usePortfolioStore.ts
├── data/content.ts     # 内容加载器
├── types/index.ts      # 类型定义
├── styles/
│   ├── index.css       # 全局样式（Tailwind）
│   └── stargate.css    # 星际之门专属样式（扫描线、暗角、霓虹等）
├── App.tsx             # 入口，按 activeSection 渲染
└── index.tsx           # ViteReactSSG 入口（导出 createRoot）
```

## 渲染与性能

- **SSG 预渲染**：`src/index.tsx` 以 `ViteReactSSG(<App/>)` 单页模式导出，`npm run build` 输出含真实内容的 `dist/index.html`（利于 SEO 与分享抓取），客户端再 hydrate。
- **代码分割**：`StargateSection`（含 highlight.js 等较重依赖）与 `DocsSection` 用 `React.lazy` 按需加载；`StargateSection` 内部的 `DigitalGarden` 再做二级懒加载，保持首屏主包精简。
- **图片**：原生 `loading="lazy"`。
- **字体**：自托管 Inter，去除 render-blocking 的外链字体/图标 CDN。
- **SEO**：`index.html` 含 Open Graph / Twitter Card / canonical / `Person` JSON-LD；`public/` 提供 `robots.txt` 与 `sitemap.xml`。
