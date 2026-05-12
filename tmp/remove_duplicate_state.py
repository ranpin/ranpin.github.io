#!/usr/bin/env python3
"""
删除 App.jsx 中重复的 UI 状态 useState 声明
这些状态已经从 store 解构，不需要再声明
"""

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 找到并删除重复的 useState 声明
new_lines = []
skip_until_next_const = False
i = 0

while i < len(lines):
    line = lines[i]
    
    # 检查是否是重复的 UI 状态声明
    if '// Inline 编辑状态' in line:
        # 跳过这个注释和接下来的 useState 声明
        skip_until_next_const = True
        i += 1
        continue
    
    if '// 积木选择器状态' in line:
        skip_until_next_const = True
        i += 1
        continue
    
    if '// 删除撤回状态' in line:
        skip_until_next_const = True
        i += 1
        continue
    
    if skip_until_next_const:
        # 跳过直到下一个非 useState 的 const 声明或注释
        if line.strip().startswith('const [') and ('inlineEditState' in line or 'insertMenuState' in line or 'deletedItems' in line or 'showUndoToast' in line or 'undoTimer' in line):
            # 跳过这一行
            i += 1
            # 继续跳过后续的行，直到遇到下一个不缩进的行或新的注释
            while i < len(lines) and (lines[i].startswith('    ') or lines[i].strip() == '' or lines[i].strip().startswith('//')):
                i += 1
            skip_until_next_const = False
            continue
        else:
            skip_until_next_const = False
    
    new_lines.append(line)
    i += 1

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✅ 已删除重复的 UI 状态声明")
