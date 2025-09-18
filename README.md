# 个人学术项目分享网站

一个现代化的个人学术作品集网站，用于展示项目经历、学术论文、工作经历和学习记录。

## ✨ 特性

- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🎨 **现代化UI** - 使用 Tailwind CSS 构建的美观界面
- 📝 **内容管理** - 内置管理面板，支持在线编辑所有内容
- 🔒 **访问控制** - 管理功能需要密码验证
- 💾 **本地存储** - 数据保存在浏览器本地存储中
- 📊 **媒体支持** - 支持图片、视频展示，兼容多种平台
- 🚀 **快速部署** - 纯前端项目，易于部署到各种平台

## 🚀 快速开始

### 本地开发

1. **克隆项目**
```bash
git clone https://github.com/yourusername/academic-portfolio.git
cd academic-portfolio
```

2. **安装依赖**
```bash
npm install
# 或使用 anpm（推荐，速度更快）
anpm install
```

3. **启动开发服务器**
```bash
npm run dev
```

4. **访问网站**
打开浏览器访问 `http://localhost:3001`

### 生产构建

```bash
npm run build
```

构建文件将输出到 `dist` 目录。

## 📦 部署指南

### GitHub Pages 部署

1. **推送代码到 GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **启用 GitHub Pages**
   - 进入仓库设置 (Settings)
   - 找到 Pages 选项
   - Source 选择 "GitHub Actions"
   - 创建 `.github/workflows/deploy.yml` 文件：

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    
    steps:
    - name: Checkout
      uses: actions/checkout@v3
      
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        
    - name: Install dependencies
      run: npm install
      
    - name: Build
      run: npm run build
      
    - name: Deploy to GitHub Pages
      uses: peaceiris/actions-gh-pages@v3
      with:
        github_token: ${{ secrets.GITHUB_TOKEN }}
        publish_dir: ./dist
```

### Vercel 部署

1. **连接 GitHub 仓库**
   - 访问 [Vercel](https://vercel.com)
   - 导入你的 GitHub 仓库

2. **配置构建设置**
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

### Netlify 部署

1. **连接 GitHub 仓库**
   - 访问 [Netlify](https://netlify.com)
   - 选择 "New site from Git"

2. **配置构建设置**
   - Build command: `npm run build`
   - Publish directory: `dist`

## 🔧 配置说明

### 管理员访问

- **默认密码**: `admin123`
- **修改密码**: 编辑 `src/components/Header.jsx` 中的 `correctPassword` 变量
- **登录方式**: 点击右上角的盾牌图标输入密码

### 内容管理

管理面板支持以下功能：
- ✅ 项目经历管理
- ✅ 学术论文管理  
- ✅ 工作&实习经历管理
- ✅ 荣誉奖项管理
- ✅ 学习记录管理
- ✅ 最新动态管理
- ✅ 个人资料管理
- ✅ 数据导入/导出

### 媒体文件支持

**图片支持**:
- Unsplash 链接 (推荐)
- 本地上传 (JPG, PNG, GIF)
- 任意图片URL

**视频支持**:
- YouTube 链接
- B站链接 (自动转换为嵌入格式)
- Vimeo 链接
- 本地上传 (MP4, WebM)

## 📁 项目结构

```
src/
├── components/          # React 组件
│   ├── Header.jsx      # 导航栏组件
│   ├── Profile.jsx     # 个人信息组件
│   ├── ArticleList.jsx # 项目列表组件
│   ├── AdminPanel.jsx  # 管理面板组件
│   └── MediaViewer.jsx # 媒体查看器组件
├── data/
│   └── content.js      # 默认内容数据
├── utils/
│   └── contentManager.js # 内容管理工具
├── styles/
│   └── index.css       # 全局样式
├── App.jsx             # 主应用组件
└── index.jsx           # 应用入口
```

## 🛠️ 技术栈

- **前端框架**: React 18
- **路由**: React Router DOM (Hash 模式)
- **样式**: Tailwind CSS
- **构建工具**: Webpack 5
- **代码转换**: Babel
- **图标**: Font Awesome
- **字体**: Google Fonts (Inter + Noto Serif SC)

## 📝 使用说明

### 首次使用

1. 访问网站后，点击右上角盾牌图标
2. 输入管理员密码 (默认: `admin123`)
3. 进入管理面板，更新个人资料
4. 添加你的项目、论文、工作经历等内容

### 内容编辑

- **快捷键**: `Ctrl/Cmd + Shift + A` 快速打开管理面板
- **自动保存**: 所有更改自动保存到浏览器本地存储
- **数据备份**: 支持导出所有数据为 JSON 文件
- **批量导入**: 支持从 JSON 文件批量导入数据

### 安全建议

1. **修改默认密码**: 部署前请修改管理员密码
2. **定期备份**: 定期导出数据进行备份
3. **访问控制**: 生产环境建议使用更强的身份验证

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

MIT License

## 🔗 相关链接

- [React 官方文档](https://reactjs.org/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Webpack 官方文档](https://webpack.js.org/)
- [GitHub Pages 文档](https://pages.github.com/)

---

如果这个项目对你有帮助，请给个 ⭐️ Star！
