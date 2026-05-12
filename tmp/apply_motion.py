import re

file_path = '/Users/ranpin/code/ranpin.github.io/src/App.jsx'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# 1. 替换 home 板块
content = content.replace(
    "{activeSection === 'home' && (\n          <div className=\"flex flex-col lg:flex-row gap-8\">",
    "{activeSection === 'home' && (\n          <motion.div \n            key=\"home\"\n            initial={{ opacity: 0, x: -20 }}\n            animate={{ opacity: 1, x: 0 }}\n            exit={{ opacity: 0, x: 20 }}\n            transition={{ duration: 0.3 }}\n            className=\"flex flex-col lg:flex-row gap-8\">"
)

# 2. 替换 resume 板块
content = content.replace(
    "{activeSection === 'resume' && (\n          <div>",
    "{activeSection === 'resume' && (\n          <motion.div \n            key=\"resume\"\n            initial={{ opacity: 0, y: 20 }}\n            animate={{ opacity: 1, y: 0 }}\n            exit={{ opacity: 0, y: -20 }}\n            transition={{ duration: 0.3 }}\n            className=\"max-w-6xl mx-auto\">"
)

# 3. 替换 learning 板块
content = content.replace(
    "{activeSection === 'learning' && (\n                <LearningSection",
    "{activeSection === 'learning' && (\n              <motion.div\n                key=\"learning\"\n                initial={{ opacity: 0, scale: 0.95 }}\n                animate={{ opacity: 1, scale: 1 }}\n                exit={{ opacity: 0, scale: 0.95 }}\n                transition={{ duration: 0.3 }}\n              >\n                <LearningSection"
)

# 4. 替换 stargate 板块
content = content.replace(
    "{activeSection === 'stargate' && (\n                <div className=\"max-w-6xl mx-auto\">",
    "{activeSection === 'stargate' && (\n              <motion.div\n                key=\"stargate\"\n                initial={{ opacity: 0, rotateX: 10 }}\n                animate={{ opacity: 1, rotateX: 0 }}\n                exit={{ opacity: 0, rotateX: -10 }}\n                transition={{ duration: 0.4 }}\n                className=\"max-w-6xl mx-auto\""
)

# 5. 在每个板块结束前添加 </motion.div>
# 这是一个复杂的操作，需要根据嵌套层级手动调整
# 为了安全，我们先尝试构建看看是否有语法错误

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("✅ 已添加 motion.div 动画属性")
