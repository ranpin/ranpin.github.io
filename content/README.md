# 内容编辑指南

本站所有内容都在这个 `content/` 目录里,**改内容不用碰代码**。改完提交（commit）到 `main` 分支，GitHub Actions 会自动构建并部署到 https://ranpin.github.io/ 。

## 最方便的编辑方式：github.dev（浏览器里改）

1. 打开仓库主页 https://github.com/ranpin/ranpin.github.io
2. 按一下键盘 **`.`**（英文句号），会打开浏览器版 VS Code（github.dev）
3. 在左侧文件树进入 `content/`，改文件
4. 左侧「源代码管理」图标 → 填一句说明 → **Commit & Push**
5. 约 1 分钟后线上自动更新

也可以直接在 GitHub 网页上点开某个文件右上角的 ✏️ 编辑、提交。或本地 `git` 编辑后推送。

---

## 文件说明

| 文件           | 内容                                                       |
| -------------- | ---------------------------------------------------------- |
| `profile.yaml` | 个人信息：姓名、头衔、地点、邮箱、简介、研究兴趣、社交链接 |
| `news.yaml`    | 首页「最新动态」列表（新条目放最前面）                     |
| `garden/*.md`  | 「星际之门 · 数字花园」的想法节点（星图，非线性、可互链）  |

> YAML（`.yaml`）用来存**结构化字段**；数字花园节点用 **Markdown（`.md`）**，正文支持标题、列表、代码块、图片、链接等格式。
>
> **个人简历 / 经历库（项目、论文、实习、荣誉）已迁移到独立仓库 [resume](https://github.com/ranpin/resume)（简历中心，主站「个人简历」入口链接过去）。**在那里编辑 `content/` 下的内容。
>
> 成体系的学习文档 / 面试指南维护在独立仓库 [edge-ai-docs](https://github.com/ranpin/edge-ai-docs)，显示在主站「技术文档」板块。

---

## 新增一个数字花园节点（星际之门）

「星际之门」是放**简历之外**的赛博实验空间；其中的**数字花园**是一张想法星图：每个 `.md` 是一个节点，非线性、可互链、按成长阶段生长。在 `content/garden/` 下新建 `.md`（可复制 `garden/_template.md`）：

```markdown
---
title: 节点标题
stage: seedling # seedling 🌱萌芽 / budding 🌿生长 / evergreen 🌲常青（决定星点颜色）
tags: [标签]
links: [相邻节点的文件名] # 用于在星图中连线（填其它节点的文件名，去掉 .md）
updated: 2026.05.01
draft: true # 可选：true 时只在本地 npm run dev 可见，不会上线
---

正文（Markdown）。正文里可用 [[节点文件名]] 提示互链（连线以 links 为准）。
```

- **文件名就是节点 id**，`links` 里填相邻节点的文件名，星图据此画出连线（无向）。
- `stage` 决定星点颜色与「成长阶段」。
- 想先存草稿不发布，就加 `draft: true`；写好后删掉该行即可上线。
- 节点按 `updated` 从新到旧排列。详见 `content/garden/README.md`。

## 改简介 / 动态

直接编辑 `profile.yaml` / `news.yaml` 即可。注意：

- 缩进用**空格**（不要用 Tab）。
- 值里如果包含冒号 `:`、引号等特殊符号，用引号包起来，或用 `>-` / `|` 折行写法（可参考现有文件）。
- 数组（列表）每项用 `- ` 开头。

## 改项目 / 简历

项目、论文、实习、荣誉与简历都在独立的**简历中心**仓库 [resume](https://github.com/ranpin/resume) 里维护（主站「个人简历」点击进入）。可在该仓库的网页编辑器里改并一键发布，或直接改其 `content/` 下的 YAML。
