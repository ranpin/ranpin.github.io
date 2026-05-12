#!/usr/bin/env python3
"""
修复 App.jsx 中的 Store 解构别名，使用原始名称
"""

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 替换 UI 状态的别名
replacements = [
    ('activeSection: storeActiveSection', 'activeSection'),
    ('learningCategory: storeLearningCategory', 'learningCategory'),
    ('resumeCategory: storeResumeCategory', 'resumeCategory'),
    ('resumeTabOrder: storeResumeTabOrder', 'resumeTabOrder'),
    ('customTabNames: storeCustomTabNames', 'customTabNames'),
    ('setActiveSection: storeSetActiveSection', 'setActiveSection'),
    ('setLearningCategory: storeSetLearningCategory', 'setLearningCategory'),
    ('setResumeCategory: storeSetResumeCategory', 'setResumeCategory'),
    ('setResumeTabOrder: storeSetResumeTabOrder', 'setResumeTabOrder'),
    ('setCustomTabNames: storeSetCustomTabNames', 'setCustomTabNames'),
]

for old, new in replacements:
    content = content.replace(old, new)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ 已修复 Store 解构别名")
