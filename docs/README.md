# 🚀 Ranpin - 个人网站

一个功能完整、技术先进的个人作品集管理系统，采用现代化工程化底座构建。

**在线预览**: [https://ranpin.github.io](https://ranpin.github.io)

---

## ✨ 核心特性

### 📱 **响应式设计**
- 完美适配桌面、平板和移动设备
- 触摸友好的交互体验与自适应布局

### 🎨 **现代化界面**
- 基于 Tailwind CSS 的精美设计
- 统一的视觉风格与 Framer Motion 交互动画
- 优雅的字体排版（Inter + Noto Serif SC）

### 🛠️ **强大的内容管理**
- 内置可视化管理面板（密码保护）
- 支持 Markdown 编辑器与实时预览
- 类似 Git 的版本控制与自动备份机制

### 🔍 **智能搜索系统**
- 全局跨模块内容搜索与关键词高亮
- 实时搜索建议与历史记录

### 💾 **智能数据管理**
- 浏览器 LocalStorage 持久化存储
- 多层次数据验证与优化建议
- 数据导入/导出功能（JSON 格式）

---

## 🏗️ 项目架构

![Project Architecture](docs/architecture.md)

详细的技术栈说明、目录结构及性能优化策略请参考：[项目架构文档](docs/architecture.md)

---

## 🚀 快速开始

### 环境要求
- Node.js 18+ 
- npm 或 yarn

### 安装依赖

```bash
git clone https://github.com/ranpin/ranpin.github.io.git
cd ranpin.github.io
npm install
```

### 本地开发

```bash
npm run dev
# 访问 http://localhost:5173
```

### 生产构建

```bash
npm run build
npm run preview
```

---

## 📦 部署方案

### GitHub Pages（推荐）

项目已配置自动化部署流程：

1. **推送代码到 main 分支**
   ```bash
   git add .
   git commit -m "Update content"
   git push origin main
   ```

2. **自动部署**
   - GitHub Actions 自动触发构建
   - 构建完成后自动部署到 GitHub Pages
   - 访问 `https://ranpin.github.io`

---

## 🔧 配置指南

### 管理员密码设置

首次使用需要设置管理面板密码：

```javascript
// 编辑 src/components/Header.tsx 第 44 行
const correctPassword = 'your-secure-password'; // 修改为你的密码
```

### 个人信息配置

所有网站内容都存储在 `src/data/content.ts` 中，包括：
- `personalInfo` - 个人信息
- `projects` - 项目经历
- `internships` - 工作/实习经历
- `academicBlogs` / `engineeringBlogs` - 技术博客

也可以通过管理面板在线编辑，数据会保存在浏览器 LocalStorage 中。

---

## 🛠️ 技术栈

- **React 18 + TypeScript**: 静态类型检查与并发特性
- **Zustand**: 轻量级状态管理库
- **Vite 5**: 极速构建工具
- **Tailwind CSS 3**: 原子化 CSS 框架
- **Framer Motion**: 动画库
- **ESLint + Prettier + Husky**: 代码规范与自动化检查
- **Vitest**: 单元测试框架

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交规范
建议使用语义化提交信息：
- `feat:` 新功能
- `fix:` 修复问题
- `docs:` 文档更新
- `refactor:` 代码重构

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

**最后更新**: 2026年5月  
**维护状态**: 积极维护中 🚀  

> 💡 **提示**: 如果这个项目对你有帮助，欢迎给个 ⭐️ Star 支持一下！
