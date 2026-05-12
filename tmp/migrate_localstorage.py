#!/usr/bin/env python3
"""
将 App.jsx 中的 localStorage 操作迁移到 Store
"""
import re

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 替换所有读取管理员模式的操作
# localStorage.getItem('portfolio_admin_mode') === 'true' → isAdminMode
content = re.sub(
    r"localStorage\.getItem\('portfolio_admin_mode'\)\s*===\s*'true'",
    'isAdminMode',
    content
)

# 2. 替换设置管理员模式的操作（如果有）
# localStorage.setItem('portfolio_admin_mode', 'true') → setIsAdminMode(true)
content = re.sub(
    r"localStorage\.setItem\('portfolio_admin_mode',\s*'true'\)",
    'setIsAdminMode(true)',
    content
)
content = re.sub(
    r"localStorage\.setItem\('portfolio_admin_mode',\s*'false'\)",
    'setIsAdminMode(false)',
    content
)

# 3. 替换读取自定义内容的操作
# JSON.parse(localStorage.getItem('portfolio_custom_content') || '[]') → customContent
content = re.sub(
    r"JSON\.parse\(localStorage\.getItem\('portfolio_custom_content'\)\s*\|\|\s*'\[\]'\)",
    'customContent',
    content
)

# 4. 替换设置自定义内容的操作
# localStorage.setItem('portfolio_custom_content', JSON.stringify(...)) → setCustomContent(...)
content = re.sub(
    r"localStorage\.setItem\('portfolio_custom_content',\s*JSON\.stringify\(([^)]+)\)\)",
    r'setCustomContent(\1)',
    content
)

# 5. 删除 STORAGE_KEYS 常量定义（如果还存在）
content = re.sub(
    r'\s*// 本地存储键名\s*\n\s*const STORAGE_KEYS = \{[^}]+\};',
    '',
    content,
    flags=re.DOTALL
)

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ 已完成 localStorage 迁移")
