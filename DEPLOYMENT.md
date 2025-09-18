# 🚀 Ranpin 学术作品集 - 部署指南

## 📍 当前部署状态

- **仓库**: `ranpin/ranpin.github.io`
- **访问地址**: [https://ranpin.github.io](https://ranpin.github.io)
- **部署方式**: GitHub Pages + GitHub Actions 自动部署

## 🔄 部署流程

### 1. 推送更新
```bash
# 添加所有更改
git add .

# 提交更改
git commit -m "Update portfolio content"

# 推送到 GitHub
git push origin main
```

### 2. 自动部署
- GitHub Actions 会自动检测到推送
- 自动执行构建流程：`npm install` → `npm run build`
- 将构建结果部署到 GitHub Pages
- 整个过程通常需要 2-5 分钟

### 3. 查看部署状态
- 访问仓库的 **Actions** 标签页
- 查看最新的 workflow 运行状态
- 绿色 ✅ 表示部署成功
- 红色 ❌ 表示部署失败，需要检查错误日志

## 🛠️ 本地开发

### 启动开发服务器
```bash
npm run dev
```
访问 `http://localhost:3001`

### 本地构建测试
```bash
npm run build
npm run preview
```

## 📝 内容管理

### 管理员登录
1. 访问 [https://ranpin.github.io](https://ranpin.github.io)
2. 点击右上角盾牌图标
3. 输入密码：`admin123`
4. 或使用快捷键：`Ctrl/Cmd + Shift + A`

### 数据备份
- 定期在管理面板中导出数据
- 保存 JSON 文件作为备份
- 重要更新前建议先备份

## 🔧 配置说明

### 重要文件
- `package.json` - 项目配置和依赖
- `webpack.config.js` - 构建配置
- `.github/workflows/deploy.yml` - 自动部署配置
- `src/data/content.js` - 默认内容数据

### 自定义域名（可选）
如果想使用自定义域名：
1. 在仓库根目录创建 `CNAME` 文件
2. 文件内容为你的域名，如：`ranpin.com`
3. 在域名提供商处设置 DNS 记录

## 🚨 故障排除

### 部署失败
1. 检查 Actions 页面的错误日志
2. 确认所有文件都已正确推送
3. 检查 `package.json` 中的依赖是否正确

### 网站无法访问
1. 确认部署已成功完成
2. 等待 DNS 传播（可能需要几分钟）
3. 清除浏览器缓存

### 管理面板无法使用
1. 检查浏览器控制台是否有错误
2. 确认本地存储功能正常
3. 尝试清除浏览器数据后重新登录

## 📊 性能优化

- 图片建议使用 Unsplash 等 CDN 服务
- 视频文件建议上传到 YouTube/B站等平台
- 定期清理不需要的本地存储数据

## 🔒 安全建议

1. **修改默认密码**：编辑 `src/components/Header.jsx` 第 44 行
2. **定期备份数据**：避免数据丢失
3. **谨慎分享管理密码**：只给信任的人

---

**最后更新**: 2024年3月
**维护者**: Ranpin
