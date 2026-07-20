# 简历数据（content/resumes/）

本目录下每个 `NN-slug.yaml` 是**一份简历**，会出现在主站「个人简历 → 我的简历」的横排里，点击即渲染成 A4 简历查看，可一键导出 PDF。

- **文件名**：`NN-slug.yaml`，前缀 `NN` 控制横排顺序（如 `01-`、`02-`）。文件名（去掉扩展名）即该简历的稳定 id。
- **格式**：YAML，字段见下。除 `label` 与 `basics.name` 外基本都可选，留空的分区不会渲染。

## 字段

```yaml
label: 端侧大模型工程师        # 必填，横排 tab 名
target: 大模型 / AI Agent 方向  # 可选，目标岗位说明
updated: '2026-07'             # 可选，更新日期
basics:                        # 必填
  name: Ranpin                 # 必填
  title: 求职意向 / 头衔
  email: you@example.com
  phone: '138...'
  location: 杭州，中国
  website: https://...
  github: https://github.com/you
  avatar: R                    # 首字母（MVP 用首字母块）
  summary: 一段个人简介 / 自我评价
education:                     # 可选，数组
  - school: 学校
    degree: 学历
    major: 专业
    period: 2019 - 2023
    gpa: '3.8/4.0'
    detail: 补充说明
work:                          # 可选，数组
  - company: 公司
    position: 职位
    period: 2025.07 - 至今
    location: 杭州
    highlights: [要点1, 要点2]
projects:                      # 可选，数组
  - name: 项目名
    role: 你的角色
    period: 2026.03 - 2026.04
    tech: [C++, Python]
    highlights: [要点1, 要点2]
    link: https://...
skills:                        # 可选，数组（按类别分组）
  - category: 编程语言
    items: [C++, Python]
awards:                        # 可选，数组
  - title: 奖项
    issuer: 颁发方
    date: '2026'
```

## 编辑与发布

有两种方式：

1. **网页编辑器（推荐日常使用）**：主站「个人简历 → 我的简历」点某份简历的「编辑」，在超级简历式界面里改。改动实时存在浏览器本地（localStorage，刷新不丢），可随时「导出 PDF」。要**正式发布到线上**，点「导出数据」下载 YAML，覆盖/新增到本目录后提交。
2. **直接改文件**：编辑本目录下的 `.yaml`，提交到仓库 → 自动部署。可在 GitHub 仓库页按 `.` 进 github.dev 在线编辑。

> 网页编辑器的本地草稿只存在你自己的浏览器里，不会自动进仓库、不影响线上，直到你把导出的 YAML 提交进来。
