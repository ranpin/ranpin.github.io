# 🚀 学术作品集 - 部署指南

一个完整的部署指南，帮助你将学术作品集网站部署到各种平台。

## 📋 部署前准备

### 环境检查
```bash
# 检查 Node.js 版本 (需要 16+)
node --version

# 检查 npm 版本
npm --version

# 本地构建测试
npm run build
npm run preview
```

### 安全配置
1. **修改管理员密码**
   ```javascript
   // 编辑 src/components/Header.jsx 第 44 行
   const correctPassword = 'your-secure-password';
   ```

2. **更新个人信息**
   - 编辑 `src/data/content.js`
   - 或通过管理面板更新

## 🌐 GitHub Pages 部署 (推荐)

### 自动部署设置

1. **创建 GitHub 仓库**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/your-repo.git
   git push -u origin main
   ```

2. **配置 GitHub Pages**
   - 进入仓库 Settings → Pages
   - Source 选择 **"GitHub Actions"**
   - 项目已包含自动部署配置

3. **部署工作流**
   - 推送代码后自动触发构建
   - 构建完成后自动部署到 GitHub Pages
   - 访问 `https://yourusername.github.io/your-repo`

### 自定义域名 (可选)

1. **添加 CNAME 文件**
   ```bash
   echo "your-domain.com" > public/CNAME
   ```

2. **DNS 配置**
   - 添加 CNAME 记录指向 `yourusername.github.io`
   - 或添加 A 记录指向 GitHub Pages IP

3. **HTTPS 设置**
   - GitHub Pages 自动提供 HTTPS
   - 在仓库设置中启用 "Enforce HTTPS"

## ☁️ Vercel 部署

### 快速部署

1. **连接仓库**
   - 访问 [vercel.com](https://vercel.com)
   - 点击 "New Project"
   - 导入 GitHub 仓库

2. **构建配置**
   ```json
   {
     "buildCommand": "npm run build",
     "outputDirectory": "dist",
     "installCommand": "npm install"
   }
   ```

3. **环境变量** (如需要)
   - 在 Vercel 控制台设置
   - 用于 API 密钥等敏感信息

### 自定义域名

1. **添加域名**
   - 在 Vercel 项目设置中添加域名
   - 配置 DNS 记录

2. **SSL 证书**
   - Vercel 自动提供 SSL 证书
   - 支持自动续期

## 🌊 Netlify 部署

### 拖拽部署

1. **构建项目**
   ```bash
   npm run build
   ```

2. **上传 dist 文件夹**
   - 访问 [netlify.com](https://netlify.com)
   - 拖拽 `dist` 文件夹到部署区域

### Git 集成部署

1. **连接仓库**
   - 选择 "New site from Git"
   - 连接 GitHub 仓库

2. **构建设置**
   ```
   Build command: npm run build
   Publish directory: dist
   ```

3. **重定向配置**
   ```
   # public/_redirects
   /*    /index.html   200
   ```

## 🔥 Firebase Hosting

### 初始化项目

1. **安装 Firebase CLI**
   ```bash
   npm install -g firebase-tools
   firebase login
   ```

2. **初始化 Firebase**
   ```bash
   firebase init hosting
   ```

3. **配置文件**
   ```json
   {
     "hosting": {
       "public": "dist",
       "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

### 部署流程

```bash
# 构建项目
npm run build

# 部署到 Firebase
firebase deploy
```

## 🐳 Docker 部署

### Dockerfile

```dockerfile
# 构建阶段
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

# 生产阶段
FROM nginx:alpine

COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Nginx 配置

```nginx
# nginx.conf
events {
    worker_connections 1024;
}

http {
    include /etc/nginx/mime.types;
    default_type application/octet-stream;

    server {
        listen 80;
        server_name localhost;
        root /usr/share/nginx/html;
        index index.html;

        location / {
            try_files $uri $uri/ /index.html;
        }

        # 缓存静态资源
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
}
```

### 构建和运行

```bash
# 构建镜像
docker build -t academic-portfolio .

# 运行容器
docker run -p 80:80 academic-portfolio
```

## 🔧 高级配置

### 环境变量

```bash
# .env.production
VITE_API_URL=https://api.yourdomain.com
VITE_ANALYTICS_ID=your-analytics-id
```

### 构建优化

```javascript
// webpack.config.js 优化配置
module.exports = {
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
```

### CDN 配置

```javascript
// 使用 CDN 加速静态资源
const cdnUrl = 'https://cdn.yourdomain.com';

module.exports = {
  output: {
    publicPath: process.env.NODE_ENV === 'production' ? cdnUrl : '/',
  },
};
```

## 📊 性能监控

### 分析工具

1. **Lighthouse**
   ```bash
   npm install -g lighthouse
   lighthouse https://yourdomain.com
   ```

2. **Bundle Analyzer**
   ```bash
   npm install --save-dev webpack-bundle-analyzer
   npm run build -- --analyze
   ```

### 性能优化

1. **图片优化**
   - 使用 WebP 格式
   - 启用懒加载
   - 使用 CDN 服务

2. **代码分割**
   - 路由级别分割
   - 组件懒加载
   - 第三方库分离

3. **缓存策略**
   - 静态资源长期缓存
   - HTML 文件短期缓存
   - API 响应缓存

## 🚨 故障排除

### 常见问题

**构建失败**
```bash
# 清理缓存
rm -rf node_modules package-lock.json
npm install

# 检查依赖版本
npm audit
npm audit fix
```

**部署后空白页面**
- 检查构建输出目录
- 确认路由配置正确
- 查看浏览器控制台错误

**静态资源 404**
- 检查 publicPath 配置
- 确认文件路径正确
- 验证服务器配置

### 调试技巧

1. **本地模拟生产环境**
   ```bash
   npm run build
   npm run preview
   ```

2. **检查构建输出**
   ```bash
   ls -la dist/
   ```

3. **网络调试**
   - 使用浏览器开发者工具
   - 检查网络请求状态
   - 查看响应头信息

## 🔒 安全最佳实践

### 部署安全

1. **HTTPS 强制**
   - 所有平台都启用 HTTPS
   - 配置 HSTS 头部
   - 使用安全的 Cookie 设置

2. **内容安全策略**
   ```html
   <meta http-equiv="Content-Security-Policy" 
         content="default-src 'self'; script-src 'self' 'unsafe-inline';">
   ```

3. **访问控制**
   - 定期更换管理员密码
   - 监控异常访问
   - 设置访问日志

### 数据安全

1. **备份策略**
   - 定期导出数据
   - 多地备份存储
   - 版本控制管理

2. **隐私保护**
   - 不在代码中存储敏感信息
   - 使用环境变量
   - 定期清理日志

## 📈 监控和维护

### 监控指标

1. **性能监控**
   - 页面加载时间
   - 资源加载状态
   - 用户交互响应

2. **错误监控**
   - JavaScript 错误
   - 网络请求失败
   - 资源加载失败

3. **用户分析**
   - 访问量统计
   - 用户行为分析
   - 设备和浏览器分布

### 维护计划

1. **定期更新**
   - 依赖包更新
   - 安全补丁应用
   - 功能优化升级

2. **备份计划**
   - 每周数据备份
   - 重要节点版本备份
   - 灾难恢复测试

3. **性能优化**
   - 定期性能测试
   - 资源使用分析
   - 用户体验优化

---

## 📞 技术支持

### 获取帮助

1. **文档资源**
   - 查看项目 README
   - 阅读相关技术文档
   - 搜索常见问题解答

2. **社区支持**
   - GitHub Issues
   - 技术论坛讨论
   - 开发者社区

3. **专业服务**
   - 技术咨询服务
   - 定制开发需求
   - 部署运维支持

**最后更新**: 2024年3月  
**维护状态**: 积极维护中 🚀
