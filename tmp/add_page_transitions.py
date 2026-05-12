import re

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 定义需要添加动画的板块
sections = ['home', 'resume', 'learning', 'stargate']

for section in sections:
    # 匹配 {activeSection === 'section' && (
    pattern = r"(\{activeSection === '" + section + r"' && \()"
    replacement = r"\1\n                <PageTransition>"
    
    # 找到对应的结束位置 })}
    # 这是一个简化的处理，实际需要根据嵌套层级匹配
    # 为了安全起见，我们只在起始处添加，并在下一个板块开始前关闭
    
    content = re.sub(pattern, replacement, content)

# 由于正则替换难以处理嵌套括号，我们采用更直接的方式：
# 在每个板块的第一个子 div 后添加 <PageTransition>，在板块结束前添加 </PageTransition>

# 重新读取并手动处理
with open(file_path, 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_lines = []
i = 0
while i < len(lines):
    line = lines[i]
    new_lines.append(line)
    
    # 检查是否是板块起始行
    for section in sections:
        if f"{{activeSection === '{section}' && (" in line:
            # 在下一行添加 <PageTransition>
            if i + 1 < len(lines):
                indent = "                "
                new_lines.append(f"{indent}<PageTransition>\n")
            break
            
    # 检查是否是板块结束行
    for section in sections:
        # 查找板块结束的标记：通常是 })} 后面跟着下一个板块或注释
        if i > 0 and f"{{activeSection === '{section}' && (" in lines[i-2]:
            # 简单判断：如果当前行是 })} 且下一行是新板块或注释
            if line.strip() == ")}" or (line.strip() == ")}" and i + 1 < len(lines) and ("activeSection ===" in lines[i+1] or "{/*" in lines[i+1])):
                indent = "                "
                new_lines.append(f"{indent}</PageTransition>\n")
            break
            
    i += 1

with open(file_path, 'w', encoding='utf-8') as f:
    f.writelines(new_lines)

print("✅ 已尝试添加 PageTransition 动画包装器")
