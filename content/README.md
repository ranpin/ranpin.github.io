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

| 文件 | 内容 |
|---|---|
| `profile.yaml` | 个人信息：姓名、头衔、地点、邮箱、简介、研究兴趣、社交链接 |
| `news.yaml` | 首页「最新动态」列表（新条目放最前面） |
| `honors.yaml` | 荣誉奖项 |
| `internships/*.yaml` | 工作/实习经历，一份一个文件 |
| `projects/NN-xxx.yaml` | 项目经历，一个一个文件；文件名前缀数字 `NN` 决定排列顺序 |
| `resumes/NN-xxx.yaml` | 简历文档，一份一个文件；显示在「个人简历 → 我的简历」横排（详见 `resumes/README.md`） |
| `notes/*.md` | 「星际之门」探索空间：学习笔记(TIL) 与 踩坑复盘 |

> YAML（`.yaml`）用来存**结构化字段**；探索笔记用 **Markdown（`.md`）**，正文支持标题、列表、代码块、图片、链接等格式。
>
> 成体系的学习文档 / 面试指南统一维护在独立仓库 [edge-ai-docs](https://github.com/ranpin/edge-ai-docs)，会显示在主站「技术文档」板块。

---

## 新增一条探索笔记（星际之门）

「星际之门」是放**简历之外**的探索空间：随手记的学习笔记(TIL)、踩坑与复盘。在 `content/notes/` 下新建 `.md`（可复制 `notes/_template.md`）：

```markdown
---
title: 笔记标题
date: 2026.05.01
type: til          # til = 学习笔记（短）；postmortem = 踩坑与复盘
tags: [标签]
draft: true        # 可选：true 时只在本地 npm run dev 可见，不会上线
---

正文（Markdown）。TIL 可以很短；复盘建议写「现象 / 定位 / 根因 / 修复 / 教训」。
```

- `type` 决定它归到「学习笔记」还是「踩坑复盘」筛选下。
- 想先存草稿不发布，就加 `draft: true`；写好后删掉该行即可上线。
- 笔记按 `date` 从新到旧排列。

## 改简介 / 项目 / 动态 / 荣誉

直接编辑对应的 `.yaml` 文件即可。注意：

- 缩进用**空格**（不要用 Tab）。
- 值里如果包含冒号 `:`、引号等特殊符号，用引号包起来，或用 `>-` / `|` 折行写法（可参考现有文件）。
- 数组（列表）每项用 `- ` 开头。

## 新增一个项目

复制 `projects/` 里任意一个 `.yaml`，改文件名前缀数字控制顺序（如 `06-xxx.yaml`），按里面的字段填写即可。可留空的字段直接删掉那一行。
