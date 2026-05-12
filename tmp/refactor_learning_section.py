import re

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 找到第一个 {activeSection === 'learning' && ( 的位置
first_start = content.find("{activeSection === 'learning' && (")
if first_start == -1:
    print("❌ 未找到学习记录板块起始位置")
    exit(1)

# 2. 找到第二个 {activeSection === 'learning' && ( 的位置（即重复块的开始）
second_start = content.find("{activeSection === 'learning' && (", first_start + 10)
if second_start == -1:
    print("❌ 未找到重复的学习记录板块")
    exit(1)

# 3. 找到第二个块的结束位置（即下一个 {activeSection === 'stargate' && ( 之前）
stargate_start = content.find("{activeSection === 'stargate' && (")
if stargate_start == -1:
    print("❌ 未找到星际之门板块")
    exit(1)

# 4. 提取第一个块之前的内容和星际之门之后的内容
before_first_block = content[:first_start]
after_duplicate_block = content[stargate_start:]

# 5. 构建新的内容：保留第一个块的位置，但用组件调用替换整个块
new_content = before_first_block + """{activeSection === 'learning' && (
                <LearningSection 
                  isAdminMode={isAdminMode}
                  openInlineEditor={openInlineEditor}
                  handleDeleteWithUndo={handleDeleteWithUndo}
                  handleInsertAt={handleInsertAt}
                  handleBlogClick={handleBlogClick}
                />
              )}

              {/* 星际之门 - 创意项目与设计展示 */}
              """ + after_duplicate_block

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("✅ 已成功替换学习记录板块为 LearningSection 组件并删除重复代码")
