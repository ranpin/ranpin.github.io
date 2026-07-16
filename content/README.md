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
| `blog/academic/*.md` | 「学习记录 → 学术研究」下的文章 |
| `blog/engineering/*.md` | 「学习记录 → 工程技术」下的文章 |

> YAML（`.yaml`）用来存**结构化字段**；文章用 **Markdown（`.md`）**，正文支持标题、列表、代码块、图片、链接等格式。

---

## 新增一篇文章

在 `content/blog/academic/` 或 `content/blog/engineering/` 下新建一个 `.md` 文件（文件名建议 `日期-英文短名.md`，如 `2026-05-01-my-post.md`），内容格式：

```markdown
---
title: 文章标题
date: 2026.05.01
category: 分类名（如 性能优化）
readTime: 10分钟
tags: [标签1, 标签2]
summary: 一句话摘要，显示在列表里。
---

这里是正文，用 **Markdown** 写。可以有：

## 小标题

- 列表项
- `代码`

​```python
print("代码块也支持")
​```

> 引用块

[链接](https://example.com) 和图片 ![说明](图片URL)
```

- 上半部分 `---` 之间是**元信息**（frontmatter）。
- 下半部分是正文。文章列表按 `date` 从新到旧排序。

## 改简介 / 项目 / 动态 / 荣誉

直接编辑对应的 `.yaml` 文件即可。注意：

- 缩进用**空格**（不要用 Tab）。
- 值里如果包含冒号 `:`、引号等特殊符号，用引号包起来，或用 `>-` / `|` 折行写法（可参考现有文件）。
- 数组（列表）每项用 `- ` 开头。

## 新增一个项目

复制 `projects/` 里任意一个 `.yaml`，改文件名前缀数字控制顺序（如 `06-xxx.yaml`），按里面的字段填写即可。可留空的字段直接删掉那一行。
