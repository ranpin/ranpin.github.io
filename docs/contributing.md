# 开发与贡献指南

## 环境

- Node.js 20+
- npm（仓库用 `package-lock.json`，请勿改用其它包管理器提交锁文件）

```bash
npm install
```

> `npm install` 会通过 `prepare` 脚本安装 Husky Git 钩子（提交前自动 lint + 格式化）。

## 常用脚本

| 命令 | 说明 |
|---|---|
| `npm run dev` | 本地开发服务器（vite-react-ssg） |
| `npm run build` | 生产构建（SSG 预渲染，产物在 `dist/`） |
| `npm run preview` | 预览构建产物 |
| `npm run lint` | ESLint（`--max-warnings 0`） |
| `npx tsc --noEmit` | 类型检查 |
| `npm test` | Vitest（`vitest run` 跑一次） |
| `npm run format` | Prettier 格式化 |

## 提交前自检

Husky + lint-staged 会在 `git commit` 时对暂存文件自动执行 `eslint --fix` 与 `prettier --write`。提交较大改动前，建议本地跑一遍：

```bash
npm run lint && npx tsc --noEmit && npm test && npm run build
```

## 代码约定

- **改内容不改代码**：站点内容在 `content/`（见 [内容编辑指南](../content/README.md)），组件只负责渲染。
- **数据只读**：`src/store/usePortfolioStore.ts` 只放导航/UI 状态；业务数据一律来自 `src/data/content.ts` 加载器。
- **图标**：统一用 `src/components/Icon.tsx`（lucide 封装），不要重新引入图标字体 CDN。
- **Markdown**：文章/长文本一律经 `src/components/Markdown.tsx` 渲染，勿直接堆 `dangerouslySetInnerHTML`。
- **懒加载**：较重或非首屏组件（弹窗、星际之门等）用 `React.lazy`，避免撑大首屏主包。
- **TypeScript**：`strict` 开启（`noImplicitAny` 因历史展示组件放宽为 `false`）；新增代码尽量补类型。

## 分支与提交

- 在分支上开发，通过 PR 合入 `main`（PR 触发 CI）。
- 提交信息用语义化前缀：`feat:` / `fix:` / `docs:` / `refactor:` / `chore:` / `revert:`。
- 合入 `main` 会自动部署上线，见 [构建与部署](deployment.md)。

## 测试

测试用 Vitest + React Testing Library（`src/**/*.test.tsx`）。改动组件行为或数据加载时，请同步更新/新增用例。注意懒加载组件在测试中需用 `findBy*` 异步查询等待其加载。
