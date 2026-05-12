#!/usr/bin/env python3
"""
全面清理 App.jsx 中所有重复的事件处理函数包装器
"""

import re

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 使用正则表达式删除所有简单的包装函数
# 模式：const funcName = (...) => { usePortfolioStore.getState().funcName(...); };
patterns_to_remove = [
    r'  // [^\n]+\n  const (openInlineEditor|closeInlineEditor|openInsertMenu|closeInsertMenu) = \([^)]*\) => \{\s*usePortfolioStore\.getState\(\)\.\1\([^)]*\);\s*\};\s*\n',
]

for pattern in patterns_to_remove:
    content = re.sub(pattern, '', content)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ 已清理所有重复的包装函数")
