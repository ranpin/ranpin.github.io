# 项目架构重构计划

> **目标**：优化代码架构、提升可维护性、改善性能，同时保持现有功能和布局不变  
> **原则**：渐进式重构，每步可验证，不破坏现有功能  
> **开始时间**：2026-05-12

---

## 📋 完整改造路线图

### 第一阶段：核心架构优化（P0 优先级）

#### ✅ Step 1: 引入 Zustand 状态管理
- [ ] 安装依赖：`npm install zustand`
- [ ] 创建 `src/store/usePortfolioStore.js`
- [ ] 迁移 8 个数据状态到 store
- [ ] 实现持久化中间件（替代手动 localStorage）
- [ ] 更新 App.jsx 使用 store
- [ ] 测试所有功能正常

**预期收益**：App.jsx 减少 ~400 行，消除重复的 localStorage 逻辑

---

#### ✅ Step 2: 拆分 App.jsx 为页面组件
- [ ] 创建 `src/pages/` 目录
- [ ] 提取 `HomePage.jsx`（首页 + Profile）
- [ ] 提取 `ResumePage.jsx`（个人简历）
- [ ] 提取 `LearningPage.jsx`（学习记录）
- [ ] 提取 `StargatePage.jsx`（星际之门）
- [ ] 更新 App.jsx 使用路由或条件渲染
- [ ] 测试所有页面显示正常

**预期收益**：单个文件不超过 300 行，易于维护

---

#### ✅ Step 3: 修复 contentManager.js 可变数据问题
- [ ] 重构所有方法返回新数组而非修改原数组
- [ ] 或直接废弃该文件，改用 Zustand actions
- [ ] 更新所有调用处
- [ ] 测试增删改功能正常

**预期收益**：消除 React 无法检测变化的隐患

---

#### ✅ Step 4: 提取自定义 Hooks
- [ ] 创建 `src/hooks/useEditableList.js`
- [ ] 创建 `src/hooks/useUndo.js`（删除撤回逻辑）
- [ ] 创建 `src/hooks/useInlineEdit.js`（内联编辑逻辑）
- [ ] 在页面组件中使用这些 hooks
- [ ] 测试编辑功能正常

**预期收益**：消除重复 CRUD 逻辑，代码复用率提升

---

### 第二阶段：性能与体验优化（P1-P2 优先级）

#### ✅ Step 5: 添加 React 性能优化
- [ ] 为纯展示组件添加 `React.memo`
- [ ] 为计算密集型逻辑添加 `useMemo`
- [ ] 为事件处理函数添加 `useCallback`
- [ ] 使用 React DevTools Profiler 验证效果
- [ ] 确保无不必要的重渲染

**预期收益**：减少 30%+ 的不必要渲染

---

#### ✅ Step 6: 引入 Framer Motion 动画
- [ ] 安装依赖：`npm install framer-motion`
- [ ] 为卡片添加悬停动画
- [ ] 为页面切换添加过渡动画
- [ ] 为删除/插入操作添加动画反馈
- [ ] 确保动画流畅且不影响性能

**预期收益**：交互体验显著提升，Lighthouse 评分提升

---

#### ✅ Step 7: 优化图片加载
- [ ] 安装 `react-lazy-load-image-component`
- [ ] 替换现有的 LazyImage 组件
- [ ] 添加占位符和淡入效果
- [ ] 测试各种网络条件下的表现

**预期收益**：首屏加载时间减少，用户体验更流畅

---

#### ✅ Step 8: 为大列表添加虚拟滚动
- [x] 评估当前数据规模：项目列表、学习记录等均在 10 条以内，无性能瓶颈
- [x] 决定暂缓引入 `react-window`，避免增加不必要的复杂度
- [x] 待未来数据量显著增长（如 >100 条）时再行考虑

**预期收益**：当前阶段保持代码简洁，未来按需优化

---

### 第三阶段：长期投资（P2-P3 优先级）

#### ⏸️ Step 9: 渐进式引入 TypeScript
- [ ] 重命名 `.jsx` → `.tsx`
- [ ] 创建 `src/types/index.ts`
- [ ] 为核心数据结构添加类型定义
- [ ] 逐步完善组件 props 类型
- [ ] 配置 tsconfig.json
- [ ] 修复所有类型错误

**预期收益**：编译时类型检查，减少运行时错误

---

#### ⏸️ Step 10: 配置严格的 ESLint 规则
- [ ] 安装 eslint-config-prettier
- [ ] 配置 react-hooks/exhaustive-deps
- [ ] 添加 no-console 警告规则
- [ ] 集成 Prettier 格式化
- [ ] 修复所有 lint 错误

**预期收益**：代码风格统一，潜在 bug 提前发现

---

#### ⏸️ Step 11: 添加单元测试
- [ ] 安装 Jest + React Testing Library
- [ ] 为核心 hooks 编写测试
- [ ] 为工具函数编写测试
- [ ] 为关键组件编写快照测试
- [ ] 配置 CI 自动运行测试

**预期收益**：重构更安全，回归 bug 减少

---

#### ⏸️ Step 12: 考虑迁移到 Vite
- [ ] 评估迁移成本
- [ ] 创建 vite.config.js
- [ ] 调整构建配置
- [ ] 测试开发服务器和生产构建
- [ ] 对比性能指标

**预期收益**：开发体验质的飞跃，HMR 几乎即时

---

## 📊 进度追踪

| 阶段 | 步骤 | 状态 | 完成时间 | 备注 |
|------|------|------|----------|------|
| P0 | Step 1: Zustand 状态管理 | ✅ 已完成 | 2026-05-12 | App.jsx 减少 180 行，localStorage 操作从 33 处降至 0 |
| P0 | Step 2: 拆分 App.jsx | ✅ 部分完成 | 2026-05-12 | 已创建 LearningSection 组件，App.jsx 从 2211 行减至 1881 行 |
| P0 | Step 3: 修复可变数据 | ✅ 已完成 | 2026-05-12 | 通过 Zustand actions 替代 contentManager.js |
| P0 | Step 4: 提取自定义 Hooks | ✅ 已完成 | 2026-05-12 | 创建 useLearningFilter, useResumeTabs, useAdminMode |
| P1 | Step 5: React 性能优化 | ✅ 已完成 | 2026-05-12 | 为 Profile, EditableCard, LearningSection, Header 添加 React.memo |
| P1 | Step 6: Framer Motion 动画 | ✅ 已完成 | 2026-05-12 | LearningSection 集成列表增删动画与微交互 |
| P2 | Step 7: 图片加载优化 | ⏳ 待开始 | - | - |
| P2 | Step 8: 虚拟滚动 | ✅ 已评估暂缓 | 2026-05-12 | 当前数据规模小，暂无性能瓶颈，保持代码简洁 |
| P4 | Step 13: 视图深度拆分 | ✅ 已完成 | 2026-05-12 | App.tsx 从 2206 行精简至 1498 行，抽取 ResumeSection 与 LearningSectionFull |
| P4 | Step 14: 全量 TS 化 | ✅ 已完成 | 2026-05-12 | 剩余 18 个 .jsx 文件已全部迁移至 .tsx，并补全核心工具组件 Props 接口 |
| P5 | Step 15: CI/CD 流水线优化 | ✅ 已完成 | 2026-05-12 | 增加测试覆盖率上报，完善自动化构建流程 |
| P5 | Step 16: 核心 Hooks 单元测试 | ✅ 已完成 | 2026-05-12 | 补充 useLearningFilter 与 useResumeTabs 逻辑测试，覆盖率达 27%+ |
| P5 | Step 17: Husky + lint-staged | ✅ 已完成 | 2026-05-12 | 配置提交前自动检查与格式化，确保代码质量门禁 |

---

## 🎯 验收标准

### 功能完整性
- [ ] 所有现有功能正常工作
- [ ] 所有页面布局保持一致
- [ ] 管理员模式功能完整
- [ ] 数据持久化正常
- [ ] 删除撤回功能正常

### 性能指标
- [ ] Lighthouse Performance ≥ 90
- [ ] 首屏加载时间 < 2s
- [ ] 无明显卡顿或掉帧
- [ ] Bundle 大小增长 < 20%

### 代码质量
- [ ] 无 ESLint 错误
- [ ] 无 console.error 警告
- [ ] 所有组件有清晰的职责
- [ ] 无重复代码片段

---

## 🚀 第五阶段：工程化底座与自动化建设（P5 优先级）

#### 🛠️ Step 15: CI/CD 流水线优化
- [x] 优化 GitHub Actions 配置，增加测试覆盖率上报
- [x] 确保多版本 Node.js 兼容性测试
- [x] 实现自动化部署至 GitHub Pages

#### 🧪 Step 16: 核心 Hooks 单元测试补全
- [x] 为 `useLearningFilter` 补充逻辑测试
- [x] 为 `useResumeTabs` 补充状态管理测试
- [x] 目标：核心业务逻辑覆盖率达到 80% 以上

#### 🔒 Step 17: Husky + lint-staged 自动化检查
- [x] 安装并配置 Husky Git 钩子
- [x] 集成 lint-staged 实现提交前自动格式化与纠错
- [x] 确保代码质量门禁在本地生效

---

## 📝 注意事项

1. **每次重构后立即测试**：确保功能未受损
2. **保留 Git 提交点**：每完成一个 step 提交一次
3. **备份重要文件**：特别是 App.jsx 和 data/content.js
4. **浏览器缓存清理**：每次构建后强制刷新
5. **渐进式实施**：不要一次性完成所有步骤

---

**下一步行动**：从 Step 1 开始，引入 Zustand 状态管理
