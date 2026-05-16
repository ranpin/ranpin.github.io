# GitHub Actions 自动化部署技术方案

## 1. 背景与目标

本项目采用 Vite 5.4+ 作为构建工具，该版本对 Node.js 运行环境有严格要求（必须 >= 20.19.0）。为确保代码推送至 `main` 分支后能自动完成编译、类型检查并部署至 GitHub Pages，我们制定了以下标准化 CI/CD 流程。

## 2. 核心挑战与解决方案

### 2.1 Node.js 版本强制锁定

**问题描述**：GitHub Actions 默认的 `actions/setup-node` 在部分 Runner 环境中存在缓存粘滞或版本解析 Bug，导致云端实际运行的 Node.js 版本仍为 v18，引发 Vite 5 的 `CustomEvent is not defined` 报错。

**固定解决方案**：
放弃使用官方 Action，改为通过 Shell 脚本直接从 Node.js 官方源下载指定版本的二进制包。

- **版本选择**：严格锁定为 `v20.19.0`（Vite 5.4+ 的最低兼容版本）。
- **安装方式**：使用 `curl` 下载 `.tar.gz` 压缩包并解压至当前工作目录。
- **路径配置**：将解压后的 `bin` 目录同时写入 `$GITHUB_PATH` 和 `$GITHUB_ENV`，确保后续所有步骤均能识别。

### 2.2 环境变量显式导出

**问题描述**：在某些并发场景下，Runner 可能会忽略全局 PATH 的更新，导致 `npm run build` 依然调用系统预装的旧版 Node.js。

**固定解决方案**：
在 **"Install dependencies"** 和 **"Build"** 这两个关键步骤中，通过 `export PATH="$NODE_BIN_DIR:$PATH"` 显式覆盖环境变量。这种“双重保险”策略确保了构建环境的绝对一致性。

### 2.3 SPA 路由容错处理

**问题描述**：单页应用（SPA）通常需要 `404.html` 来支持前端路由跳转。若项目中未手动创建该文件，硬性复制操作会导致构建中断。

**固定解决方案**：
在执行复制命令前增加文件存在性检查：

```bash
if [ -f public/404.html ]; then
  cp public/404.html dist/404.html
else
  echo "public/404.html not found, skipping copy."
fi
```

## 3. 标准化工作流程 (deploy.yml)

以下是经过验证的生产级配置模板：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js 20 (Direct Binary)
        run: |
          curl -o node-v20.tar.gz https://nodejs.org/dist/v20.19.0/node-v20.19.0-linux-x64.tar.gz
          tar -xzf node-v20.tar.gz
          NODE_BIN_DIR="$(pwd)/node-v20.19.0-linux-x64/bin"
          echo "$NODE_BIN_DIR" >> $GITHUB_PATH
          echo "NODE_BIN_DIR=$NODE_BIN_DIR" >> $GITHUB_ENV

      - name: Install dependencies
        run: |
          export PATH="$NODE_BIN_DIR:$PATH"
          npm ci

      - name: Build
        run: |
          export PATH="$NODE_BIN_DIR:$PATH"
          npm run build

      - name: Copy 404.html for SPA routing
        run: |
          if [ -f public/404.html ]; then
            cp public/404.html dist/404.html
          else
            echo "public/404.html not found, skipping copy."
          fi

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

## 4. 维护与扩展建议

1. **版本升级**：当 Vite 发布新版本并提高 Node.js 要求时，只需修改 Shell 脚本中的版本号（如 `v22.12.0`）即可。
2. **依赖缓存**：若需进一步优化构建速度，可在 `Install dependencies` 步骤前增加 `actions/cache` 逻辑，但需注意缓存键（Cache Key）应与 `package-lock.json` 的哈希值绑定。
3. **类型检查**：建议在 `Build` 步骤前单独增加 `Run Type Check` 步骤（执行 `npx tsc --noEmit`），以便在编译前快速发现 TypeScript 类型错误。

---

_最后更新时间：2026-05-16_
_维护者：Ranpin_
