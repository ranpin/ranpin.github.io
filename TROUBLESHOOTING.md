# 🔧 故障排除指南

## 问题：网站显示空白页面

### 可能原因和解决方案

#### 1. **GitHub Actions 构建失败**
**检查方法**：
- 访问 `https://github.com/ranpin/ranpin.github.io/actions`
- 查看最新的 workflow 运行状态

**解决方案**：
```bash
# 重新推送触发构建
git add .
git commit -m "Fix deployment issues"
git push origin main
```

#### 2. **GitHub Pages 设置问题**
**检查方法**：
- 进入仓库 Settings → Pages
- 确认 Source 设置为 "GitHub Actions"

**解决方案**：
- 如果设置错误，改为 "GitHub Actions"
- 等待几分钟让设置生效

#### 3. **文件路径问题**
**检查方法**：
- 确认所有文件都在仓库根目录
- 检查 `dist` 文件夹是否正确生成

**解决方案**：
```bash
# 本地测试构建
npm run build
npm run preview
# 访问 http://localhost:8080 测试
```

#### 4. **浏览器缓存问题**
**解决方案**：
- 按 `Ctrl+F5` (Windows) 或 `Cmd+Shift+R` (Mac) 强制刷新
- 或者使用无痕模式访问

#### 5. **DNS 传播延迟**
**解决方案**：
- 等待 5-10 分钟让 DNS 更新
- 尝试使用不同网络访问

## 🚀 快速修复步骤

### 步骤 1：检查构建状态
访问：`https://github.com/ranpin/ranpin.github.io/actions`

### 步骤 2：重新部署
```bash
cd ranpin.github.io
git add .
git commit -m "Redeploy website"
git push origin main
```

### 步骤 3：等待部署完成
- 通常需要 2-5 分钟
- 绿色 ✅ 表示成功
- 红色 ❌ 表示失败，查看错误日志

### 步骤 4：清除缓存访问
- 使用无痕模式访问 `https://ranpin.github.io`
- 或按 `Ctrl+F5` 强制刷新

## 📞 获取帮助

如果问题仍然存在：

1. **查看构建日志**：在 Actions 页面点击失败的 workflow
2. **检查控制台错误**：按 F12 打开开发者工具
3. **本地测试**：运行 `npm run build && npm run preview`

## 🔍 常见错误信息

### "404 - File not found"
- 检查 GitHub Pages 设置
- 确认文件已正确推送

### "This site can't be reached"
- 检查域名拼写
- 等待 DNS 传播

### 空白页面但无错误
- 检查 JavaScript 控制台
- 确认 React 应用正确加载

---

**最后更新**: 2024年3月
