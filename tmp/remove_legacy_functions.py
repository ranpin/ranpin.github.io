#!/usr/bin/env python3
"""
删除 App.jsx 中遗留的 localStorage 工具函数和相关操作
"""

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

# 找到并删除 loadFromStorage 和 saveToStorage 函数定义
# 以及 localStorage.clear() 和 Tab 顺序保存操作
new_lines = []
skip_until_next_function = False
in_legacy_function = False

i = 0
while i < len(lines):
    line = lines[i]
    
    # 检测遗留函数的开始
    if '// 从本地存储加载数据的函数（带数据清洗）' in line:
        in_legacy_function = True
        i += 1
        continue
    
    # 如果在遗留函数中，跳过直到下一个函数或状态声明
    if in_legacy_function:
        # 检测到下一个函数或状态声明的开始
        if line.strip().startswith('// 状态管理') or \
           (line.strip().startswith('const [') and 'useState' in line):
            in_legacy_function = False
            new_lines.append(line)
            i += 1
            continue
        else:
            # 跳过这一行
            i += 1
            continue
    
    # 删除 localStorage.clear() 调用及其上下文
    if 'localStorage.clear()' in line:
        # 跳过这一行和前后的空行/注释
        # 向前查找，删除前面的空行和注释
        while new_lines and (new_lines[-1].strip() == '' or new_lines[-1].strip().startswith('//')):
            new_lines.pop()
        i += 1
        continue
    
    # 替换 Tab 顺序保存操作
    if "localStorage.setItem('portfolio_resume_tab_order'" in line:
        # 替换为 Store action
        indent = line[:len(line) - len(line.lstrip())]
        new_lines.append(f"{indent}setResumeTabOrder(newOrder);\n")
        i += 1
        continue
    
    new_lines.append(line)
    i += 1

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✅ 已删除遗留的 localStorage 工具函数和操作")
