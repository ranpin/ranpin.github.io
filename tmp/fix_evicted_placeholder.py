#!/usr/bin/env python3
"""
删除 App.jsx 中的被驱逐占位符
"""

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 删除占位符行
placeholder = '  <evicted reason="file_written" chars=950 ref="/Users/ranpin/code/ranpin.github.io/src/App.jsx" />\n'
content = content.replace(placeholder, '')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ 已删除被驱逐的占位符")
