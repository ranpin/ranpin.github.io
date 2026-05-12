#!/usr/bin/env python3
"""
删除 App.jsx 中重复的 UI 状态声明
"""

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 要删除的块
blocks_to_remove = [
    """  // Inline 编辑状态
  const [inlineEditState, setInlineEditState] = useState({
    isVisible: false,
    type: null, // 'news', 'personal-info', 'project', etc.
    data: null,
    index: null
  });

""",
    """  // 积木选择器状态
  const [insertMenuState, setInsertMenuState] = useState({
    isVisible: false,
    index: null,
    sectionType: null
  });

""",
    """  // 删除撤回状态
  const [deletedItems, setDeletedItems] = useState([]);
  const [showUndoToast, setShowUndoToast] = useState(false);
  const [undoTimer, setUndoTimer] = useState(null);

"""
]

for block in blocks_to_remove:
    content = content.replace(block, '')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ 已删除重复的 UI 状态声明")
