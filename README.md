# 个人学术项目分享网站

一个现代化的个人网站，用于展示项目经历、学术论文、工作经历和学习记录。

## ✨ 特性

- 📱 **响应式设计** - 完美适配桌面和移动设备
- 🎨 **现代化UI** - 使用 Tailwind CSS 构建的美观界面
- 📝 **内容管理** - 内置管理面板，支持在线编辑所有内容
- 🔒 **访问控制** - 管理功能需要密码验证
- 💾 **本地存储** - 数据保存在浏览器本地存储中
- 📊 **媒体支持** - 支持图片、视频展示，兼容多种平台
- 🚀 **快速部署** - 纯前端项目，易于部署到各种平台


## 🔧 配置说明

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
