#!/usr/bin/env python3
"""
删除 App.jsx 中重复的事件处理函数定义
这些函数已经从 store 解构，不需要再定义包装函数
"""

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 要删除的重复函数定义
blocks_to_remove = [
    """  // 打开内联编辑器（使用 store action）
  const openInlineEditor = (type, data, index) => {
    usePortfolioStore.getState().openInlineEditor(type, data, index);
  };

  // 关闭内联编辑器（使用 store action）
  const closeInlineEditor = () => {
    usePortfolioStore.getState().closeInlineEditor();
  };

""",
    """  // 关闭积木选择器（使用 store action）
  const closeInsertMenu = () => {
    usePortfolioStore.getState().closeInsertMenu();
  };

  // 打开积木选择器（使用 store action）
  const openAddEditor = (index, sectionType) => {
    usePortfolioStore.getState().openInsertMenu(index, sectionType);
  };

"""
]

for block in blocks_to_remove:
    content = content.replace(block, '')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ 已删除重复的事件处理函数定义")
