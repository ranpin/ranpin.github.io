const fs = require('fs');
const code = fs.readFileSync('/Users/ranpin/code/ranpin.github.io/src/App.jsx', 'utf8');
let depth = 0;
const lines = code.split('\n');

for (let i = 145; i < 1100; i++) {
  const line = lines[i];
  if (!line) continue;
  
  const openCount = (line.match(/<div/g) || []).length;
  const closeCount = (line.match(/<\/div>/g) || []).length;
  
  depth += openCount;
  depth -= closeCount;
  
  if (depth < 0) {
    console.log(`Unmatched closing div at line ${i + 1}: ${line.trim()}`);
    break;
  }
}

console.log(`Final depth at line 1100: ${depth}`);
