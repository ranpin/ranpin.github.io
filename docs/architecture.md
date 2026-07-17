# 架构与技术实现

## 概览

纯静态个人站点，无后端、无数据库。内容以仓库中的 **Markdown / YAML 文件**为唯一数据源，构建时由加载器读入并**预渲染（SSG）**为静态 HTML，部署到 GitHub Pages，运行时再 hydrate。

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
      └──▶ 组件直接 import      # 如 SearchBox / SmartRecommendations
      ▼
组件渲染（文章正文经 <Markdown> 渲染）
```

- **加载器** `src/data/content.ts`：用 `import.meta.glob('/content/**', { query: '?raw' })` 在构建期收集文件原文，`js-yaml` 解析 YAML 与 Markdown frontmatter，导出 `personalInfo / recentNews / projects / internships / honors / academicBlogs / engineeringBlogs / notes / stats`。修改内容只需改 `content/` 下的文件，无需改代码。
- **store** `src/store/usePortfolioStore.ts`：不再持久化、不含编辑逻辑，只提供只读数据与 `activeSection / resumeCategory / learningCategory` 等导航状态。
- **草稿**：`content/notes/*.md` 的 frontmatter 可写 `draft: true`，生产构建自动隐藏，仅 `npm run dev` 可见。

## 目录结构

```text
content/                # 唯一数据源（见 content/README.md）
├── profile.yaml        # 个人信息 + 首屏亮点（可选）
├── news.yaml           # 最新动态
├── honors.yaml         # 荣誉
├── internships/*.yaml  # 工作/实习
├── projects/*.yaml     # 项目（文件名前缀 NN 控制顺序）
├── blog/{academic,engineering}/*.md   # 文章
└── notes/*.md          # 星际之门：TIL / 踩坑复盘

public/                 # images/、robots.txt、sitemap.xml、404.html
src/
├── components/         # Header, HomeSection, Profile, ResumeSection,
│                       # LearningSectionFull, StargateSection, GlobalModals,
│                       # ModuleRenderer, SmartRecommendations, SearchBox,
│                       # Footer, Icon, Markdown
├── store/usePortfolioStore.ts
├── data/content.ts     # 内容加载器
├── types/index.ts      # 类型定义
├── styles/index.css
├── App.tsx             # 入口，按 activeSection 渲染
└── index.tsx           # ViteReactSSG 入口（导出 createRoot）
```

## 渲染与性能

- **SSG 预渲染**：`src/index.tsx` 以 `ViteReactSSG(<App/>)` 单页模式导出，`npm run build` 输出含真实内容的 `dist/index.html`（利于 SEO 与分享抓取），客户端再 hydrate。
- **代码分割**：详情弹窗 `GlobalModals` 与「星际之门」`StargateSection`（含较重的 highlight.js）用 `React.lazy` 按需加载，保持首屏主包精简。
- **图片**：原生 `loading="lazy"`。
- **字体**：自托管 Inter，去除 render-blocking 的外链字体/图标 CDN。
- **SEO**：`index.html` 含 Open Graph / Twitter Card / canonical / `Person` JSON-LD；`public/` 提供 `robots.txt` 与 `sitemap.xml`。

## 内容数据模型（项目详情字段规范）

项目（`content/projects/*.yaml`）除基础字段（`title / period / status / tags / description`）外，支持以下"面试友好"字段，便于展示深度：

- **businessContext**：业务背景，说明项目价值与要解决的问题
- **yourRole**：你的角色与具体职责，体现个人贡献
- **architectureDetail**：技术架构详解（Markdown，支持列表/代码）
- **technicalChallenges**：核心难点，数组，每项 `{ challenge, solution, impact }`
- **results**：关键指标，数组，每项 `{ metric, value, baseline?, improvement? }`（列表页卡片会直出前 2 项）
- **achievements / interviewHighlights / discussionTopics**：成果 / 面试亮点 / 可延伸话题（字符串数组）
- **abstract / methodology**：摘要 / 方法（可选）
- **demoImage / architectureImage**：配图（放 `public/images/`，值为 `/images/...`）

详情弹窗由统一的 `ModuleRenderer` 渲染，保证列表、详情展示一致。长文本字段经 `<Markdown>`（`prose` 排版 + 代码高亮）渲染。
