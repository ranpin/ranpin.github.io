# 🎓 个人学术作品集网站

一个现代化的个人学术作品集管理系统，支持项目展示、论文发表、工作经历和学习记录的完整管理。

## ✨ 核心特性

### 📱 **响应式设计**
- 完美适配桌面、平板和移动设备
- 触摸友好的交互体验
- 自适应布局和导航

### 🎨 **现代化界面**
- 基于 Tailwind CSS 的精美设计
- 统一的视觉风格和交互动画
- 支持深色/浅色主题切换

### 📝 **强大的内容管理**
- 内置可视化管理面板
- 支持 Markdown 编辑器
- 实时预览和自动保存
- 批量操作和数据验证

### 🔒 **安全访问控制**
- 密码保护的管理功能
- 快捷键访问 (Ctrl/Cmd + Shift + A)
- 权限分级管理

### 💾 **智能数据管理**
- 浏览器本地存储
- 自动备份机制 (30分钟间隔)
- 版本管理和历史恢复
- 数据导入/导出功能

### 📊 **多媒体支持**
- 图片：Unsplash、本地上传、任意URL
- 视频：YouTube、B站、Vimeo、本地文件
- 自动格式转换和优化

### 🔍 **智能搜索**
- 全局内容搜索
- 实时搜索建议
- 跨模块内容检索

## 🚀 快速开始

### 环境要求
- Node.js 16+ 
- npm 或 yarn

### 本地开发

```bash
# 克隆项目
git clone <your-repository-url>
cd academic-portfolio

# 安装依赖 (推荐使用 anpm 获得更快速度)
anpm install
# 或使用 npm
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3001
```

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览构建结果
npm run preview

# 测试完整构建流程
npm run test:build
```

## 📦 部署方案

### GitHub Pages (推荐)

1. **配置仓库**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **启用 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 "GitHub Actions"

3. **自动部署**
   - 项目已包含 `.github/workflows/deploy.yml`
   - 推送代码后自动构建部署

### 其他平台

- **Vercel**: 导入仓库，构建命令 `npm run build`，输出目录 `dist`
- **Netlify**: 连接仓库，构建命令 `npm run build`，发布目录 `dist`
- **Cloudflare Pages**: 支持自动部署，配置同上

## 🔧 配置指南

### 管理员设置

```javascript
// 修改 src/components/Header.jsx 第 44 行
const correctPassword = 'your-secure-password'; // 修改默认密码
```

### 个人信息配置

通过管理面板或直接编辑 `src/data/content.js`：

```javascript
export const personalInfo = {
  name: "你的姓名",
  title: "你的职位/学校",
  location: "你的位置",
  email: "your@email.com",
  avatar: "A", // 字母或图片URL
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

## 📁 项目架构

```
src/
├── components/              # React 组件 (15个)
│   ├── Header.jsx          # 导航栏 + 搜索
│   ├── Profile.jsx         # 个人信息展示
│   ├── AdminPanel.jsx      # 管理面板核心
│   ├── SearchBox.jsx       # 全局搜索组件
│   ├── MarkdownEditor.jsx  # Markdown编辑器
│   ├── MediaViewer.jsx     # 媒体文件查看器
│   ├── ProjectTemplates.jsx # 项目模板
│   ├── BatchOperations.jsx # 批量操作
│   ├── DataValidation.jsx  # 数据验证
│   ├── VersionManager.jsx  # 版本管理
│   └── AutoBackup.jsx      # 自动备份
├── data/
│   └── content.js          # 默认数据
├── utils/
│   └── contentManager.js   # 内容管理工具
├── styles/
│   └── index.css           # 全局样式
├── App.jsx                 # 主应用
└── index.jsx               # 应用入口
```

## 🛠️ 技术栈

### 核心技术
- **React 18** - 前端框架
- **Tailwind CSS** - 样式框架
- **Webpack 5** - 构建工具
- **Babel** - 代码转换

### 开发工具
- **Font Awesome** - 图标库
- **Google Fonts** - 字体服务
- **PostCSS** - CSS 处理
- **Autoprefixer** - CSS 兼容性

### 部署支持
- **GitHub Actions** - 自动化部署
- **GitHub Pages** - 静态托管
- **SPA 路由支持** - Hash 模式

## 📚 功能详解

### 内容管理模块

#### 📋 **项目经历**
- 项目模板快速创建
- 完整的项目信息管理
- 媒体文件展示支持
- 技术栈标签管理

#### 📄 **学术论文**
- 论文信息完整记录
- 引用数据统计
- 多种发表类型支持
- 相关链接管理

#### 💼 **工作经历**
- 详细的工作描述
- 技能标签系统
- 成果展示功能
- 时间线管理

#### 🏆 **荣誉奖项**
- 奖项级别分类
- 获奖时间记录
- 颁发机构信息
- 奖项描述详情

#### 📚 **学习记录**
- 学术研究记录
- 工程技术分享
- 分类标签管理
- Markdown 内容支持

### 高级功能

#### 🔍 **智能搜索**
- 跨模块内容搜索
- 实时搜索建议
- 关键词高亮显示
- 搜索结果分类

#### 📊 **数据管理**
- 自动备份 (30分钟间隔)
- 版本历史管理
- 数据验证检查
- 批量操作支持

#### 🎨 **界面定制**
- 模块拖拽排序
- 字段标签自定义
- 布局顺序调整
- 主题色彩配置

## 📝 使用指南

### 首次配置

1. **访问管理面板**
   - 点击右上角盾牌图标
   - 输入管理员密码 (默认: `admin123`)

2. **更新个人信息**
   - 进入"个人资料"标签
   - 填写基本信息和社交链接
   - 上传头像和设置研究兴趣

3. **添加内容**
   - 使用项目模板快速创建
   - 支持 Markdown 格式编辑
   - 添加媒体文件和链接

### 日常维护

- **内容编辑**: 悬停显示编辑按钮
- **批量管理**: 使用批量操作功能
- **数据备份**: 定期导出数据文件
- **版本管理**: 创建重要节点备份

### 快捷操作

- `Ctrl/Cmd + Shift + A` - 快速打开管理面板
- 拖拽排序 - 调整内容显示顺序
- 双击编辑 - 快速编辑字段标签

## 🔒 安全建议

### 密码安全
1. **修改默认密码** - 部署前必须修改
2. **使用强密码** - 包含字母、数字、特殊字符
3. **定期更换** - 建议每3-6个月更换

### 数据安全
1. **定期备份** - 使用导出功能备份数据
2. **版本管理** - 重要更新前创建版本
3. **本地存储** - 数据存储在浏览器本地

### 访问控制
1. **HTTPS 部署** - 确保传输安全
2. **访问日志** - 监控异常访问
3. **权限分级** - 区分查看和编辑权限

## 🐛 故障排除

### 常见问题

**网站显示空白**
- 检查 GitHub Actions 构建状态
- 确认 GitHub Pages 设置正确
- 清除浏览器缓存重试

**管理面板无法访问**
- 确认密码输入正确
- 检查浏览器本地存储功能
- 尝试无痕模式访问

**数据丢失**
- 检查浏览器本地存储
- 恢复最近的版本备份
- 导入之前的数据文件

### 性能优化

**加载速度慢**
- 使用 CDN 图片服务
- 压缩媒体文件大小
- 启用浏览器缓存

**内存占用高**
- 清理不需要的版本历史
- 优化图片文件大小
- 定期清理本地存储

## 🤝 贡献指南

### 开发环境

```bash
# 安装开发依赖
npm install

# 启动开发服务器
npm run dev

# 代码格式检查
npm run lint

# 运行测试
npm test
```

### 提交规范

- `feat:` 新功能
- `fix:` 修复问题
- `docs:` 文档更新
- `style:` 样式调整
- `refactor:` 代码重构

### 问题反馈

1. 搜索现有 Issues
2. 提供详细的问题描述
3. 包含复现步骤
4. 附上错误截图或日志

## 📄 许可证

MIT License - 详见 [LICENSE](LICENSE) 文件

## 🔗 相关资源

### 官方文档
- [React 官方文档](https://reactjs.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Webpack 官方文档](https://webpack.js.org/)

### 部署平台
- [GitHub Pages 文档](https://pages.github.com/)
- [Vercel 部署指南](https://vercel.com/docs)
- [Netlify 部署文档](https://docs.netlify.com/)

### 开发工具
- [Font Awesome 图标](https://fontawesome.com/)
- [Unsplash 图片服务](https://unsplash.com/)
- [Google Fonts](https://fonts.google.com/)

---

## 🌟 致谢

感谢所有为这个项目做出贡献的开发者和用户！

如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！

**最后更新**: 2024年3月  
**维护状态**: 积极维护中 🚀
