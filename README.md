# Ranpin 的个人网站

作为简历补充的个人站点：展示项目经历与技术细节，并记录简历之外的学习过程与探索。

**在线地址**：<https://ranpin.github.io>

纯静态站点（无后端）：内容以仓库里的 Markdown / YAML 文件为唯一数据源，构建时预渲染为静态 HTML，通过 GitHub Actions 自动部署到 GitHub Pages。

---

## ✏️ 如何编辑内容

**改内容不用碰代码**——所有内容都在 [`content/`](content/) 目录，编辑对应文件并提交到 `main` 即自动部署。

最快方式：在仓库主页按键盘 `.` 打开 github.dev（浏览器版 VS Code），改完 Commit 即可。

完整的字段说明与操作步骤见 **[`content/README.md`](content/README.md)**。

| 想改什么 | 文件 |
|---|---|
| 个人信息 / 简介 / 社交链接 | `content/profile.yaml` |
| 首页「最新动态」 | `content/news.yaml` |
| 荣誉奖项 | `content/honors.yaml` |
| 工作 / 实习经历 | `content/internships/*.yaml` |
| 项目经历 | `content/projects/*.yaml` |
| 文章（学习记录） | `content/blog/academic/*.md`、`content/blog/engineering/*.md` |
| 探索笔记（星际之门：TIL / 踩坑复盘） | `content/notes/*.md` |

---

## 🚀 本地开发

要求 Node.js 20+。

```bash
npm install
npm run dev        # 本地开发，边改边看
npm run build      # 生产构建（SSG 预渲染）
npm run preview    # 预览构建产物
```

其它脚本：`npm run lint`（ESLint）、`npx tsc --noEmit`（类型检查）、`npm test`（Vitest）。

---

## 🛠️ 技术栈

- **React 18 + TypeScript** — UI 与类型安全
- **Vite 5** + **vite-react-ssg** — 构建与静态预渲染（SSG）
- **Tailwind CSS 3**（+ Typography）— 样式与文章排版
- **Zustand** — 轻量 UI 状态（只读数据来自 `content/`）
- **react-markdown + remark-gfm + rehype-highlight** — 文章 Markdown 渲染与代码高亮
- **js-yaml** — 解析 `content/` 的 YAML / frontmatter
- **lucide-react** — 图标（SVG）
- **@fontsource/inter** — 自托管字体
- **ESLint + Prettier + Husky + Vitest** — 质量与测试

---

## 📁 目录结构

```text
content/            # 全站内容（唯一数据源，见 content/README.md）
public/             # 静态资源：images/、robots.txt、sitemap.xml、404.html
src/
├── components/     # UI 组件（.tsx）
├── store/          # Zustand（仅导航等 UI 状态）
├── data/content.ts # 内容加载器：读取 content/ 并解析为类型化数据
├── types/          # TypeScript 类型
├── styles/         # 全局样式
└── App.tsx         # 应用入口（按 section 切换渲染）
.github/workflows/  # ci.yml（PR 校验）+ deploy.yml（部署）
```

---

## 📚 更多文档

- [架构与技术实现](docs/architecture.md)
- [构建与部署](docs/deployment.md)
- [开发与贡献指南](docs/contributing.md)
- [内容编辑指南](content/README.md)

## 许可证

[MIT](LICENSE)
