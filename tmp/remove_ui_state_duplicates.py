#!/usr/bin/env python3
"""
删除 App.jsx 中已迁移到 Store 的 UI 状态的重复 useState 声明
"""

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 需要删除的行（基于行内容匹配）
lines_to_remove = []
for i, line in enumerate(lines):
    # 删除已迁移到 Store 的 UI 状态声明
    if "const [activeSection, setActiveSection] = useState('home');" in line:
        lines_to_remove.append(i)
    elif "const [learningCategory, setLearningCategory] = useState('academic');" in line:
        lines_to_remove.append(i)
    elif "const [resumeCategory, setResumeCategory] = useState('projects');" in line:
        lines_to_remove.append(i)
    elif "const [resumeTabOrder, setResumeTabOrder] = useState(['projects', 'publications', 'internships', 'honors']);" in line:
        lines_to_remove.append(i)
    elif "const [customTabNames, setCustomTabNames] = useState({});" in line:
        lines_to_remove.append(i)

# 从后往前删除，避免索引偏移
for i in sorted(lines_to_remove, reverse=True):
    del lines[i]

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(lines)

print(f"✅ 已删除 {len(lines_to_remove)} 个重复的 UI 状态声明")
