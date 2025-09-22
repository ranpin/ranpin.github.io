# 🔧 故障排除指南

完整的问题诊断和解决方案指南，帮助你快速解决部署和使用中遇到的问题。

## 🚨 部署相关问题

### 问题 1: 网站显示空白页面

#### 🔍 **诊断步骤**

1. **检查构建状态**
   ```bash
   # 访问 GitHub Actions 页面
   https://github.com/yourusername/your-repo/actions
   ```

2. **验证本地构建**
   ```bash
   npm run build
   npm run preview
   # 访问 http://localhost:8080
   ```

3. **检查浏览器控制台**
   - 按 F12 打开开发者工具
   - 查看 Console 和 Network 标签页
   - 寻找错误信息和失败的请求

#### ✅ **解决方案**

**方案 A: GitHub Pages 配置问题**
```bash
# 1. 检查仓库设置
# Settings → Pages → Source 选择 "GitHub Actions"

# 2. 重新推送代码
git add .
git commit -m "Fix deployment configuration"
git push origin main
```

**方案 B: 构建配置问题**
```bash
# 1. 清理依赖
rm -rf node_modules package-lock.json
npm install

# 2. 检查 webpack 配置
# 确认 webpack.config.js 中的 publicPath 设置正确

# 3. 重新构建
npm run build
```

**方案 C: 路由配置问题**
```javascript
// 确认使用 HashRouter 而不是 BrowserRouter
import { HashRouter } from 'react-router-dom';

// 在 index.jsx 中
<HashRouter>
  <App />
</HashRouter>
```

### 问题 2: 静态资源 404 错误

#### 🔍 **诊断步骤**

1. **检查资源路径**
   ```bash
   # 查看构建输出
   ls -la dist/
   
   # 检查资源引用路径
   grep -r "src=" dist/index.html
   ```

2. **验证服务器配置**
   - 检查 nginx/apache 配置
   - 确认静态文件服务设置

#### ✅ **解决方案**

**方案 A: 修复资源路径**
```javascript
// webpack.config.js
module.exports = {
  output: {
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/'
  }
};
```

**方案 B: 服务器配置**
```nginx
# nginx.conf
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
    try_files $uri $uri/ =404;
}
```

### 问题 3: 构建失败

#### 🔍 **常见错误信息**

```bash
# 内存不足
FATAL ERROR: Ineffective mark-compacts near heap limit

# 依赖版本冲突
npm ERR! peer dep missing

# 语法错误
SyntaxError: Unexpected token
```

#### ✅ **解决方案**

**内存不足**
```bash
# 增加 Node.js 内存限制
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

**依赖问题**
```bash
# 清理并重新安装
rm -rf node_modules package-lock.json
npm cache clean --force
npm install

# 检查依赖冲突
npm ls
npm audit fix
```

**语法错误**
```bash
# 检查 Babel 配置
# .babelrc 或 babel.config.js
{
  "presets": [
    ["@babel/preset-env", { "targets": "> 0.25%, not dead" }],
    ["@babel/preset-react", { "runtime": "automatic" }]
  ]
}
```

## 🔐 管理面板问题

### 问题 4: 无法访问管理面板

#### 🔍 **诊断步骤**

1. **检查密码设置**
   ```javascript
   // src/components/Header.jsx 第 44 行
   const correctPassword = 'admin123'; // 确认密码
   ```

2. **检查本地存储**
   ```javascript
   // 浏览器控制台执行
   console.log(localStorage.getItem('portfolio_admin_mode'));
   ```

3. **检查浏览器兼容性**
   - 确认浏览器支持 localStorage
   - 检查是否启用了隐私模式

#### ✅ **解决方案**

**方案 A: 重置管理状态**
```javascript
// 浏览器控制台执行
localStorage.removeItem('portfolio_admin_mode');
location.reload();
```

**方案 B: 检查密码配置**
```javascript
// 临时调试：在控制台查看密码
// 注意：生产环境中不要这样做
console.log('Password check:', 'your-input' === 'admin123');
```

**方案 C: 使用快捷键**
```
按 Ctrl/Cmd + Shift + A 快速打开管理面板
```

### 问题 5: 数据丢失或无法保存

#### 🔍 **诊断步骤**

1. **检查本地存储限制**
   ```javascript
   // 检查存储使用情况
   let total = 0;
   for (let key in localStorage) {
     if (localStorage.hasOwnProperty(key)) {
       total += localStorage[key].length;
     }
   }
   console.log('LocalStorage usage:', total, 'characters');
   ```

2. **检查数据格式**
   ```javascript
   // 验证数据完整性
   try {
     const data = JSON.parse(localStorage.getItem('portfolio_projects'));
     console.log('Data valid:', Array.isArray(data));
   } catch (e) {
     console.error('Data corrupted:', e);
   }
   ```

#### ✅ **解决方案**

**方案 A: 清理存储空间**
```javascript
// 清理旧版本数据
const keysToRemove = [];
for (let key in localStorage) {
  if (key.startsWith('old_') || key.includes('backup_')) {
    keysToRemove.push(key);
  }
}
keysToRemove.forEach(key => localStorage.removeItem(key));
```

**方案 B: 数据恢复**
```javascript
// 从版本历史恢复
const versions = JSON.parse(localStorage.getItem('portfolio_versions') || '[]');
if (versions.length > 0) {
  const latestVersion = versions[0];
  // 手动恢复数据
  Object.entries(latestVersion.data).forEach(([key, value]) => {
    const storageKey = `portfolio_${key.replace(/([A-Z])/g, '_$1').toLowerCase()}`;
    localStorage.setItem(storageKey, JSON.stringify(value));
  });
}
```

**方案 C: 重置到默认状态**
```javascript
// 完全重置（谨慎使用）
const portfolioKeys = Object.keys(localStorage).filter(key => 
  key.startsWith('portfolio_')
);
portfolioKeys.forEach(key => localStorage.removeItem(key));
location.reload();
```

## 📱 移动端问题

### 问题 6: 移动端显示异常

#### 🔍 **诊断步骤**

1. **检查响应式设计**
   ```css
   /* 确认 CSS 媒体查询 */
   @media (max-width: 640px) {
     /* 移动端样式 */
   }
   ```

2. **检查触摸事件**
   ```javascript
   // 确认触摸事件绑定
   element.addEventListener('touchstart', handler, { passive: true });
   ```

#### ✅ **解决方案**

**方案 A: 视口配置**
```html
<!-- 确认 meta 标签设置 -->
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

**方案 B: 触摸优化**
```css
/* 优化触摸目标大小 */
@media (max-width: 768px) {
  button, a {
    min-height: 44px;
    min-width: 44px;
  }
}
```

### 问题 7: 性能问题

#### 🔍 **诊断工具**

1. **Lighthouse 分析**
   ```bash
   npm install -g lighthouse
   lighthouse https://yourdomain.com --output html
   ```

2. **Bundle 分析**
   ```bash
   npm install --save-dev webpack-bundle-analyzer
   npm run build -- --analyze
   ```

#### ✅ **优化方案**

**方案 A: 代码分割**
```javascript
// 使用 React.lazy 进行组件懒加载
const AdminPanel = React.lazy(() => import('./components/AdminPanel'));

// 使用 Suspense 包装
<Suspense fallback={<div>Loading...</div>}>
  <AdminPanel />
</Suspense>
```

**方案 B: 图片优化**
```javascript
// 使用 WebP 格式和懒加载
const LazyImage = ({ src, alt }) => {
  const [loaded, setLoaded] = useState(false);
  
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onLoad={() => setLoaded(true)}
      style={{ opacity: loaded ? 1 : 0 }}
    />
  );
};
```

## 🔧 开发环境问题

### 问题 8: 开发服务器启动失败

#### 🔍 **常见错误**

```bash
# 端口被占用
Error: listen EADDRINUSE: address already in use :::3001

# 权限问题
Error: EACCES: permission denied

# 依赖问题
Module not found: Error: Can't resolve 'module-name'
```

#### ✅ **解决方案**

**端口冲突**
```bash
# 查找占用端口的进程
lsof -ti:3001
kill -9 <PID>

# 或使用不同端口
npm run dev -- --port 3002
```

**权限问题**
```bash
# 修复 npm 权限
sudo chown -R $(whoami) ~/.npm
sudo chown -R $(whoami) /usr/local/lib/node_modules
```

**依赖问题**
```bash
# 重新安装依赖
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### 问题 9: 热重载不工作

#### 🔍 **诊断步骤**

1. **检查 webpack 配置**
   ```javascript
   // webpack.config.js
   devServer: {
     hot: true,
     liveReload: true
   }
   ```

2. **检查文件监听**
   ```bash
   # 检查文件系统限制
   echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
   sudo sysctl -p
   ```

#### ✅ **解决方案**

**方案 A: 重启开发服务器**
```bash
# 完全重启
npm run dev
```

**方案 B: 检查文件路径**
```javascript
// 确认文件在 src 目录下
// 检查 .gitignore 是否排除了重要文件
```

## 📊 数据相关问题

### 问题 10: 版本管理异常

#### 🔍 **诊断步骤**

1. **检查版本数据**
   ```javascript
   const versions = JSON.parse(localStorage.getItem('portfolio_versions') || '[]');
   console.log('Versions count:', versions.length);
   console.log('Latest version:', versions[0]);
   ```

2. **验证数据完整性**
   ```javascript
   versions.forEach((version, index) => {
     try {
       JSON.parse(JSON.stringify(version.data));
       console.log(`Version ${index} is valid`);
     } catch (e) {
       console.error(`Version ${index} is corrupted:`, e);
     }
   });
   ```

#### ✅ **解决方案**

**方案 A: 清理损坏版本**
```javascript
const validVersions = versions.filter(version => {
  try {
    JSON.parse(JSON.stringify(version.data));
    return true;
  } catch (e) {
    return false;
  }
});
localStorage.setItem('portfolio_versions', JSON.stringify(validVersions));
```

**方案 B: 重建版本历史**
```javascript
// 基于当前数据创建新版本
const currentData = {
  personalInfo: JSON.parse(localStorage.getItem('portfolio_personal_info') || '{}'),
  projects: JSON.parse(localStorage.getItem('portfolio_projects') || '[]'),
  // ... 其他数据
};

const newVersion = {
  id: Date.now(),
  timestamp: new Date().toISOString(),
  description: '数据恢复版本',
  data: currentData,
  type: 'manual'
};

localStorage.setItem('portfolio_versions', JSON.stringify([newVersion]));
```

## 🆘 紧急恢复方案

### 完全重置系统

```javascript
// ⚠️ 警告：这将删除所有数据！
// 仅在系统完全无法使用时执行

// 1. 备份当前数据（如果可能）
const backup = {};
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('portfolio_')) {
    backup[key] = localStorage.getItem(key);
  }
});
console.log('Backup created:', backup);

// 2. 清除所有数据
Object.keys(localStorage).forEach(key => {
  if (key.startsWith('portfolio_')) {
    localStorage.removeItem(key);
  }
});

// 3. 重新加载页面
location.reload();
```

### 数据导入恢复

```javascript
// 从备份文件恢复数据
const restoreFromBackup = (backupData) => {
  try {
    Object.entries(backupData).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });
    location.reload();
    console.log('Data restored successfully');
  } catch (e) {
    console.error('Restore failed:', e);
  }
};

// 使用方法：
// restoreFromBackup(yourBackupData);
```

## 📞 获取帮助

### 自助诊断清单

- [ ] 检查浏览器控制台错误
- [ ] 验证网络连接状态
- [ ] 确认浏览器版本兼容性
- [ ] 测试无痕模式访问
- [ ] 检查本地存储功能
- [ ] 验证构建输出文件
- [ ] 确认服务器配置正确

### 收集诊断信息

```javascript
// 生成诊断报告
const generateDiagnosticReport = () => {
  const report = {
    timestamp: new Date().toISOString(),
    userAgent: navigator.userAgent,
    url: window.location.href,
    localStorage: {
      available: typeof Storage !== 'undefined',
      usage: Object.keys(localStorage).length,
      portfolioKeys: Object.keys(localStorage).filter(k => k.startsWith('portfolio_'))
    },
    errors: [], // 手动添加遇到的错误
    buildInfo: {
      // 从 package.json 获取版本信息
    }
  };
  
  console.log('Diagnostic Report:', JSON.stringify(report, null, 2));
  return report;
};
```

### 联系支持

1. **GitHub Issues**
   - 提供详细的错误描述
   - 包含诊断报告
   - 附上错误截图

2. **技术论坛**
   - Stack Overflow
   - Reddit r/webdev
   - 开发者社区

3. **文档资源**
   - 项目 README
   - 技术文档
   - 常见问题解答

---

**最后更新**: 2024年3月  
**维护状态**: 积极维护中 🚀

> 💡 **提示**: 遇到问题时，首先尝试清除浏览器缓存和重新加载页面，这能解决大部分显示相关的问题。
