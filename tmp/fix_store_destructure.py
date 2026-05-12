#!/usr/bin/env python3
"""
修复 App.jsx 中的 store 解构问题
将重命名的变量改回原始名称，使代码其他部分能正确引用
"""

import re

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 替换 actions 的重命名，保持原名
replacements = [
    ('setPersonalInfo: storeSetPersonalInfo,', 'setPersonalInfo,'),
    ('setRecentNews: storeSetRecentNews,', 'setRecentNews,'),
    ('setProjects: storeSetProjects,', 'setProjects,'),
    ('setPublications: storeSetPublications,', 'setPublications,'),
    ('setInternships: storeSetInternships,', 'setInternships,'),
    ('setHonors: storeSetHonors,', 'setHonors,'),
    ('setAcademicBlogs: storeSetAcademicBlogs,', 'setAcademicBlogs,'),
    ('setEngineeringBlogs: storeSetEngineeringBlogs,', 'setEngineeringBlogs,'),
    ('openInlineEditor: storeOpenInlineEditor,', 'openInlineEditor,'),
    ('closeInlineEditor: storeCloseInlineEditor,', 'closeInlineEditor,'),
    ('openInsertMenu: storeOpenInsertMenu,', 'openInsertMenu,'),
    ('closeInsertMenu: storeCloseInsertMenu,', 'closeInsertMenu,'),
]

for old, new in replacements:
    content = content.replace(old, new)

# 替换数据的重命名，保持原名
data_replacements = [
    ('personalInfo: storePersonalInfo,', 'personalInfo,'),
    ('recentNews: storeRecentNews,', 'recentNews,'),
    ('projects: storeProjects,', 'projects,'),
    ('publications: storePublications,', 'publications,'),
    ('internships: storeInternships,', 'internships,'),
    ('honors: storeHonors,', 'honors,'),
    ('academicBlogs: storeAcademicBlogs,', 'academicBlogs,'),
    ('engineeringBlogs: storeEngineeringBlogs,', 'engineeringBlogs,'),
    ('inlineEditState: storeInlineEditState,', 'inlineEditState,'),
    ('insertMenuState: storeInsertMenuState,', 'insertMenuState,'),
    ('deletedItems: storeDeletedItems,', 'deletedItems,'),
    ('showUndoToast: storeShowUndoToast,', 'showUndoToast,'),
]

for old, new in data_replacements:
    content = content.replace(old, new)

# 删除重复的 store 解构块，合并为一个
# 查找并替换整个解构部分
old_pattern = r'''  // 从 store 获取状态和 actions
  const store = usePortfolioStore\(\);
  const \{
    setPersonalInfo,
    setRecentNews,
    setProjects,
    setPublications,
    setInternships,
    setHonors,
    setAcademicBlogs,
    setEngineeringBlogs,
    updateItem,
    deleteItem,
    addItem,
    updateItemAt,
    deleteItemAt,
    addItemAt,
    addDeletedItem,
    clearDeletedItems,
    hideUndoToast,
    openInlineEditor,
    closeInlineEditor,
    openInsertMenu,
    closeInsertMenu,
  \} = store;

  // 从 store 获取数据（用于事件处理函数中的读取）
  const \{ 
    personalInfo,
    recentNews,
    projects,
    publications,
    internships,
    honors,
    academicBlogs,
    engineeringBlogs,
    inlineEditState,
    insertMenuState,
    deletedItems,
    showUndoToast,
  \} = store;'''

new_pattern = '''  // 从 store 获取所有状态和 actions
  const {
    // 数据状态
    personalInfo,
    recentNews,
    projects,
    publications,
    internships,
    honors,
    academicBlogs,
    engineeringBlogs,
    
    // UI 状态
    activeSection: storeActiveSection,
    learningCategory: storeLearningCategory,
    resumeCategory: storeResumeCategory,
    resumeTabOrder: storeResumeTabOrder,
    customTabNames: storeCustomTabNames,
    inlineEditState,
    insertMenuState,
    deletedItems,
    showUndoToast,
    
    // Actions - 数据更新
    setPersonalInfo,
    setRecentNews,
    setProjects,
    setPublications,
    setInternships,
    setHonors,
    setAcademicBlogs,
    setEngineeringBlogs,
    
    // Actions - UI 状态
    setActiveSection: storeSetActiveSection,
    setLearningCategory: storeSetLearningCategory,
    setResumeCategory: storeSetResumeCategory,
    setResumeTabOrder: storeSetResumeTabOrder,
    setCustomTabNames: storeSetCustomTabNames,
    
    // Actions - CRUD
    updateItem,
    deleteItem,
    addItem,
    updateItemAt,
    deleteItemAt,
    addItemAt,
    
    // Actions - Inline 编辑
    openInlineEditor,
    closeInlineEditor,
    
    // Actions - 积木选择器
    openInsertMenu,
    closeInsertMenu,
    
    // Actions - 删除撤回
    addDeletedItem,
    clearDeletedItems,
    hideUndoToast,
  } = usePortfolioStore();'''

content = re.sub(old_pattern, new_pattern, content, flags=re.DOTALL)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ Store 解构已修复")
