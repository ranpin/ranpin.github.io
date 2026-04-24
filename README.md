# 🎓 Ranpin - 个人学术作品集网站

一个功能完整、技术先进的个人学术作品集管理系统，支持项目展示、论文发表、工作经历、技术博客和荣誉奖项的完整管理。

**在线预览**: [https://ranpin.github.io](https://ranpin.github.io)

---

## ✨ 核心特性

### 📱 **响应式设计**
- 完美适配桌面、平板和移动设备
- 触摸友好的交互体验
- 自适应布局和导航
- 移动端优化的弹窗和菜单

### 🎨 **现代化界面**
- 基于 Tailwind CSS 的精美设计
- 统一的视觉风格和交互动画
- 流畅的过渡效果和加载状态
- 优雅的字体排版（Inter + Noto Serif SC）

### 📝 **强大的内容管理**
- 内置可视化管理面板（密码保护）
- 支持 Markdown 编辑器，实时预览
- 批量操作和数据验证
- 版本管理和历史恢复
- 自动备份机制（30分钟间隔）

### 🔍 **智能搜索系统**
- 全局跨模块内容搜索
- 实时搜索建议和自动补全
- 关键词高亮显示
- 按内容类型筛选结果
- 搜索历史记录

### 💾 **智能数据管理**
- 浏览器 LocalStorage 持久化存储
- 类似 Git 的版本控制系统
- 手动版本创建 + 自动备份双重保障
- 选择性恢复，精确到模块级别
- 数据导入/导出功能（JSON 格式）
- 多层次数据验证和优化建议

### 🎬 **多媒体支持**
- 图片：Unsplash CDN、本地上传、任意 URL
- 视频：YouTube、B站、Vimeo 嵌入，本地 MP4/WebM
- 懒加载优化，提升页面性能
- 自动格式识别和转换

### 🏷️ **灵活的分类系统**
- 自定义内容分类和标签
- 拖拽排序调整显示顺序
- 字段标签自定义
- 章节标题个性化设置

### 👥 **访客留言系统**
- 支持访客留言和互动
- 留言管理和审核
- 时间轴展示

### 🤖 **智能推荐**
- 基于标签和内容的相关推荐
- 多维度相似度计算
- 清晰的推荐理由说明

---

## 🚀 快速开始

### 环境要求
- Node.js 16+ 
- npm 或 yarn

### 安装依赖

```bash
# 克隆项目
git clone https://github.com/ranpin/ranpin.github.io.git
cd ranpin.github.io

# 安装依赖
npm install
```

### 本地开发

```bash
# 启动开发服务器（端口 3001）
npm run dev

# 访问 http://localhost:3001
```

开发服务器支持热重载，修改代码后会自动刷新浏览器。

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 测试完整构建流程
npm run test:build

# 清理缓存
npm run clean
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

3. **自定义域名（可选）**
   - 在 `public/CNAME` 文件中添加域名
   - 配置 DNS CNAME 记录指向 `ranpin.github.io`

### 其他平台

**Vercel**
- 导入 GitHub 仓库
- 构建命令：`npm run build`
- 输出目录：`dist`

**Netlify**
- 连接 GitHub 仓库
- 构建命令：`npm run build`
- 发布目录：`dist`
- 添加重定向规则：`/* /index.html 200`

**Docker**
```bash
docker build -t ranpin-portfolio .
docker run -p 80:80 ranpin-portfolio
```

详细部署指南请查看 [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🔧 配置指南

### 管理员密码设置

首次使用需要设置管理面板密码：

```javascript
// 编辑 src/components/Header.jsx 第 44 行
const correctPassword = 'your-secure-password'; // 修改为你的密码
```

**安全建议**：
- 使用强密码（字母+数字+特殊字符）
- 部署前必须修改默认密码
- 定期更换密码

### 个人信息配置

通过管理面板或直接编辑 `src/data/content.js`：

```javascript
export const personalInfo = {
  name: "你的姓名",
  title: "你的职位/学校",
  location: "你的位置",
  email: "your@email.com",
  avatar: "A", // 字母头像或图片 URL
  bio: {
    main: "个人简介...",
    detail: "详细介绍..."
  },
  researchInterests: ["研究方向1", "研究方向2"],
  socialLinks: {
    github: "https://github.com/yourusername",
    linkedin: "https://linkedin.com/in/yourusername",
    scholar: "https://scholar.google.com/citations?user=yourid"
  }
};
```

### 内容数据管理

所有网站内容都存储在 `src/data/content.js` 中，包括：
- `personalInfo` - 个人信息
- `recentNews` - 最新动态
- `projects` - 项目经历
- `publications` - 学术论文
- `internships` - 工作/实习经历
- `honors` - 荣誉奖项
- `academicBlogs` - 学术博客
- `engineeringBlogs` - 工程技术博客
- `stats` - 统计数据

也可以通过管理面板在线编辑，数据会保存在浏览器 LocalStorage 中。

---

## 📁 项目架构

```
ranpin.github.io/
├── .github/
│   └── workflows/
│       ├── deploy.yml          # GitHub Pages 自动部署
│       └── webpack.yml         # Webpack 构建检查
├── public/                     # 静态资源
│   └── 404.html               # SPA 路由支持
├── src/
│   ├── components/             # React 组件（20个）
│   │   ├── AdminPanel.jsx     # 管理面板核心（87KB）
│   │   ├── ArticleList.jsx    # 文章列表组件
│   │   ├── AutoBackup.jsx     # 自动备份组件
│   │   ├── BatchOperations.jsx # 批量操作组件
│   │   ├── DataValidation.jsx # 数据验证组件
│   │   ├── DateRangePicker.jsx # 日期选择器
│   │   ├── Footer.jsx         # 页脚组件
│   │   ├── GuestBook.jsx      # 访客留言组件
│   │   ├── Header.jsx         # 导航栏 + 搜索
│   │   ├── Hero.jsx           # 首页横幅
│   │   ├── LazyImage.jsx      # 懒加载图片
│   │   ├── MarkdownEditor.jsx # Markdown 编辑器
│   │   ├── MediaViewer.jsx    # 媒体文件查看器
│   │   ├── Profile.jsx        # 个人信息展示
│   │   ├── ProjectTemplates.jsx # 项目模板
│   │   ├── SearchBox.jsx      # 智能搜索组件
│   │   ├── SectionTitleEditor.jsx # 章节标题编辑
│   │   ├── SmartRecommendations.jsx # 智能推荐
│   │   ├── TagCloud.jsx       # 标签云
│   │   └── VersionManager.jsx # 版本管理组件
│   ├── data/
│   │   └── content.js         # 默认数据模板（19KB）
│   ├── utils/
│   │   └── contentManager.js  # 内容管理工具类
│   ├── styles/
│   │   └── index.css          # 全局样式（Tailwind）
│   ├── App.jsx                # 主应用组件（111KB）
│   └── index.jsx              # 应用入口
├── index.html                 # HTML 模板
├── package.json               # 项目依赖和脚本
├── webpack.config.js          # Webpack 配置
├── tailwind.config.js         # Tailwind CSS 配置
├── postcss.config.js          # PostCSS 配置
├── DEPLOYMENT.md              # 详细部署指南
├── FEATURE_SUMMARY.md         # 功能总结报告
├── TROUBLESHOOTING.md         # 故障排除指南
└── README.md                  # 本文件
```

---

## 🛠️ 技术栈

### 核心技术
- **React 18** - 前端框架，支持并发特性和 Hooks
- **React Router DOM 6** - Hash 模式路由，适配 GitHub Pages
- **Tailwind CSS 3** - 原子化 CSS 框架
- **Webpack 5** - 模块打包器，支持代码分割
- **Babel 7** - JavaScript 编译器，ES6+ 语法支持

### UI 组件
- **Font Awesome 6** - 图标库
- **Google Fonts** - Inter + Noto Serif SC 字体
- **PostCSS + Autoprefixer** - CSS 后处理

### 开发工具
- **webpack-dev-server** - 开发服务器，支持热重载
- **serve** - 静态文件服务器（预览用）
- **HTMLWebpackPlugin** - HTML 模板处理

### 部署支持
- **GitHub Actions** - 自动化 CI/CD
- **GitHub Pages** - 静态网站托管
- **多平台兼容** - Vercel、Netlify、Firebase、Docker

---

## 📚 功能模块详解

### 1️⃣ 内容管理模块

#### 📋 项目经历
- 完整的 CRUD 操作（创建、读取、更新、删除）
- 6 种预设项目模板（Web 应用、移动应用、AI/ML、数据分析、系统设计、开源项目）
- 多媒体支持（图片、视频、架构图）
- 技术栈标签管理
- 项目详情页展示
- GitHub/Demo/文档链接

#### 📄 学术论文
- 论文信息完整记录（标题、作者、会议/期刊、年份）
- 论文类型分类（会议论文、期刊论文、预印本、专利）
- 引用数据统计
- 多格式链接（PDF、arXiv、代码）
- 研究贡献和方法论描述

#### 💼 工作/实习经历
- 详细的工作描述和职责
- 技能标签系统
- 量化成果展示
- 时间线管理
- 项目和成果展示
- 技能和成长记录

#### 🏆 荣誉奖项
- 奖项级别分类（国际级、国家级、省级等）
- 获奖时间和颁发机构
- 奖项描述和背景

#### 📚 学习记录（博客系统）
- 双分类：学术研究 + 工程技术
- Markdown 格式支持
- 标签系统和阅读时间估算
- 内容摘要和关键点提取
- 7+ 篇示例博客文章

#### 📰 最新动态
- 实时更新的个人动态
- 时间轴展示
- 表情符号支持

### 2️⃣ 高级功能

#### 🔍 智能搜索
- 跨所有模块的全局搜索
- 实时搜索，输入即搜索
- 智能匹配（标题、描述、标签）
- 搜索建议和自动补全
- 关键词高亮
- 按类型筛选结果
- 防抖优化和缓存机制

#### 📊 数据管理
- **版本控制**：类似 Git 的版本管理系统
  - 手动版本创建
  - 30 分钟自动备份
  - 完整版本历史
  - 一键恢复到任意版本
  - 选择性模块恢复
  - 版本间差异对比
  
- **数据验证**：多层次数据质量保障
  - 完整性检查（必填字段）
  - 格式验证（邮箱、URL、日期）
  - 业务逻辑验证
  - 数据统计和完成度分析
  - 智能优化建议
  - 错误分级（错误/警告/建议）

- **批量操作**：
  - 多选批量删除
  - 批量编辑共同属性
  - 批量导出数据
  - 操作预览和撤销

- **导入导出**：
  - JSON 格式数据交换
  - 完整导出和选择性导出
  - 数据导入和冲突处理

#### 🎨 界面定制
- 模块拖拽排序
- 字段标签自定义
- 章节标题个性化
- 布局顺序调整
- 自定义标签名称

#### 👥 访客留言（GuestBook）
- 访客留言和互动
- 留言管理和审核
- 时间轴展示

#### 🤖 智能推荐
- 基于标签的内容推荐
- 时间相关内容推荐
- 多维度相似度计算
- 推荐理由说明

---

## 🔒 安全与隐私

### 数据安全
- 所有数据存储在浏览器 LocalStorage，不会上传到服务器
- 多重备份机制（版本管理 + 自动备份）
- 支持数据导出，方便迁移和备份

### 访问控制
- 管理面板密码保护
- 快捷键快速访问（Ctrl/Cmd + Shift + A）
- 建议定期更换密码

### 最佳实践
- 使用 HTTPS 部署
- 不要在代码中硬编码敏感信息
- 定期导出数据备份

---

## 🐛 故障排除

### 常见问题

**网站显示空白**
- 检查 GitHub Actions 构建状态
- 确认 GitHub Pages 设置正确（Source 选择 "GitHub Actions"）
- 清除浏览器缓存重试
- 查看浏览器控制台错误信息

**管理面板无法访问**
- 确认密码输入正确
- 检查浏览器是否支持 LocalStorage
- 尝试无痕模式访问
- 按 Ctrl/Cmd + Shift + A 快捷键

**数据丢失**
- 检查浏览器 LocalStorage 是否被清理
- 从版本历史恢复（如果有备份）
- 导入之前导出的数据文件

**构建失败**
```bash
# 清理并重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 增加内存限制（如果内存不足）
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

详细故障排除请查看 [TROUBLESHOOTING.md](TROUBLESHOOTING.md)

---

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 代码格式检查（如配置了 ESLint）
npm run lint

# 运行测试（如配置了测试框架）
npm test
```

### 提交规范

建议使用语义化提交信息：
- `feat:` 新功能
- `fix:` 修复问题
- `docs:` 文档更新
- `style:` 样式调整
- `refactor:` 代码重构
- `perf:` 性能优化
- `test:` 测试相关
- `chore:` 构建/工具链相关

### 贡献流程

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'feat: add some amazing feature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 提交 Pull Request

---

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

## 🔗 相关资源

### 官方文档
- [React 官方文档](https://reactjs.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Webpack 官方文档](https://webpack.js.org/)
- [React Router 文档](https://reactrouter.com/)

### 部署平台
- [GitHub Pages 文档](https://pages.github.com/)
- [Vercel 部署指南](https://vercel.com/docs)
- [Netlify 部署文档](https://docs.netlify.com/)

### 开发工具
- [Font Awesome 图标](https://fontawesome.com/)
- [Unsplash 图片服务](https://unsplash.com/)
- [Google Fonts](https://fonts.google.com/)

---

## 📞 支持与反馈

### 获取帮助
- 📖 查看 [DEPLOYMENT.md](DEPLOYMENT.md) 了解详细部署步骤
- 🔧 查看 [TROUBLESHOOTING.md](TROUBLESHOOTING.md) 解决常见问题
- 📊 查看 [FEATURE_SUMMARY.md](FEATURE_SUMMARY.md) 了解完整功能清单
- 💬 提交 [GitHub Issue](https://github.com/ranpin/ranpin.github.io/issues) 反馈问题或建议

### 社区交流
- 欢迎在 Issues 中讨论功能建议
- 分享你的使用经验和改进想法
- 报告 Bug 时请提供详细的复现步骤

---

## 🌟 致谢

感谢以下开源项目的支持：
- React 团队提供的优秀前端框架
- Tailwind CSS 团队提供的实用样式框架
- Font Awesome 提供的丰富图标
- Google Fonts 提供的优质字体
- 所有为本项目做出贡献的开发者和用户

---

## 📈 项目统计

- **总文件数**: 30+ 个文件
- **React 组件**: 20 个组件
- **代码行数**: 约 12,000+ 行
- **功能模块**: 8 大核心模块
- **配置文件**: 10+ 个配置文件

---

**最后更新**: 2026年4月  
**维护状态**: 积极维护中 🚀  
**技术评级**: ⭐⭐⭐⭐⭐

> 💡 **提示**: 如果这个项目对你有帮助，欢迎给个 ⭐️ Star 支持一下！
