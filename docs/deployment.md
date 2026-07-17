# 构建与部署

## 流程概览

- **CI（`.github/workflows/ci.yml`）**：对 `main` 的 Pull Request 触发。在 Node 20 / 22 双版本上跑 `lint` → `tsc --noEmit` → `vitest` → `build`。
- **部署（`.github/workflows/deploy.yml`）**：push 到 `main` 触发。构建后经 `actions/upload-pages-artifact` + `actions/deploy-pages` 发布到 GitHub Pages。
- 站点为 GitHub 用户页（`ranpin.github.io`），Vite `base` 用默认根路径 `/`。

## 部署 job 关键步骤

```yaml
- uses: actions/setup-node@v4
  with: { node-version: 20, cache: npm }
- run: npm install -g npm@11          # 见下方「注意事项」
- run: npm ci --no-audit --no-fund    # HUSKY=0
- run: npm run build                  # = vite-react-ssg build，输出预渲染 dist/
- uses: actions/upload-pages-artifact@v3
  with: { path: ./dist }
```

## 注意事项（踩过的坑）

1. **lockfile 必须指向公共 npm 源。** 仓库根有 `.npmrc` 固定 `registry=https://registry.npmjs.org/`，`package-lock.json` 的 `resolved` 也须是公共源地址。若在配置了内网镜像（如公司内网源）的机器上生成 lockfile，GitHub 公共 Runner 无法访问该地址，`npm ci` 会静默挂起约 8 分钟后报 `Exit handler never called!` 崩溃。
   - 生成 lockfile 时请确保用公共源：`npm install --registry https://registry.npmjs.org/`。
2. **CI 里升级 npm** (`npm install -g npm@11`)：规避 Runner 自带旧 npm 在本仓库 reify 时的偶发问题。
3. **安装加 `--no-audit --no-fund`**：减少易挂起的网络请求；`HUSKY=0` 跳过 CI 中无意义的 husky 安装。
4. **Node 版本**：本地与 CI 统一 Node 20+。

## 本地复现部署构建

```bash
rm -rf node_modules dist
npm ci
npm run build      # 产物在 dist/，dist/index.html 应含真实预渲染内容
npm run preview    # 本地预览产物
```

## 手动触发

`deploy.yml` 配了 `workflow_dispatch`，可在 GitHub Actions 页面手动运行部署。
