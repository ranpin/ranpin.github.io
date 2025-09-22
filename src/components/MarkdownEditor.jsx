import React, { useState, useRef } from 'react';

const MarkdownEditor = ({ value, onChange, placeholder = "支持 Markdown 语法..." }) => {
  const [isPreview, setIsPreview] = useState(false);
  const textareaRef = useRef(null);

  // 简单的 Markdown 渲染函数
  const renderMarkdown = (text) => {
    if (!text) return '';
    
    let html = text
      // 标题
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      // 粗体
      .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
      // 斜体
      .replace(/\*(.*)\*/gim, '<em>$1</em>')
      // 代码块
      .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
      // 行内代码
      .replace(/`([^`]*)`/gim, '<code>$1</code>')
      // 链接
      .replace(/\[([^\]]*)\]\(([^\)]*)\)/gim, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>')
      // 列表
      .replace(/^\* (.*$)/gim, '<li>$1</li>')
      .replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>')
      // 换行
      .replace(/\n/gim, '<br>');
    
    return html;
  };

  // 插入 Markdown 语法
  const insertMarkdown = (syntax) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = value.substring(start, end);
    
    let newText = '';
    let cursorOffset = 0;

    switch (syntax) {
      case 'bold':
        newText = `**${selectedText || '粗体文本'}**`;
        cursorOffset = selectedText ? 0 : -2;
        break;
      case 'italic':
        newText = `*${selectedText || '斜体文本'}*`;
        cursorOffset = selectedText ? 0 : -1;
        break;
      case 'code':
        newText = `\`${selectedText || '代码'}\``;
        cursorOffset = selectedText ? 0 : -1;
        break;
      case 'link':
        newText = `[${selectedText || '链接文本'}](https://example.com)`;
        cursorOffset = selectedText ? -21 : -22;
        break;
      case 'list':
        newText = `* ${selectedText || '列表项'}`;
        cursorOffset = selectedText ? 0 : 0;
        break;
      case 'h1':
        newText = `# ${selectedText || '一级标题'}`;
        cursorOffset = selectedText ? 0 : 0;
        break;
      case 'h2':
        newText = `## ${selectedText || '二级标题'}`;
        cursorOffset = selectedText ? 0 : 0;
        break;
      case 'h3':
        newText = `### ${selectedText || '三级标题'}`;
        cursorOffset = selectedText ? 0 : 0;
        break;
      default:
        return;
    }

    const newValue = value.substring(0, start) + newText + value.substring(end);
    onChange(newValue);

    // 设置光标位置
    setTimeout(() => {
      const newCursorPos = start + newText.length + cursorOffset;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
      textarea.focus();
    }, 0);
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* 工具栏 */}
      <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-1 md:space-x-2 overflow-x-auto scrollbar-hide">
          <button
            type="button"
            onClick={() => insertMarkdown('bold')}
            className="p-1 md:p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
            title="粗体 (Ctrl+B)"
          >
            <i className="fas fa-bold text-xs md:text-sm"></i>
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('italic')}
            className="p-1 md:p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
            title="斜体 (Ctrl+I)"
          >
            <i className="fas fa-italic text-xs md:text-sm"></i>
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('code')}
            className="p-1 md:p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
            title="代码"
          >
            <i className="fas fa-code text-xs md:text-sm"></i>
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('link')}
            className="p-1 md:p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
            title="链接"
          >
            <i className="fas fa-link text-xs md:text-sm"></i>
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('list')}
            className="p-1 md:p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors flex-shrink-0"
            title="列表"
          >
            <i className="fas fa-list text-xs md:text-sm"></i>
          </button>
          <div className="w-px h-4 md:h-6 bg-gray-300 flex-shrink-0"></div>
          <button
            type="button"
            onClick={() => insertMarkdown('h1')}
            className="p-1 md:p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors text-xs md:text-sm font-bold flex-shrink-0"
            title="一级标题"
          >
            H1
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('h2')}
            className="p-1 md:p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors text-xs md:text-sm font-bold flex-shrink-0"
            title="二级标题"
          >
            H2
          </button>
          <button
            type="button"
            onClick={() => insertMarkdown('h3')}
            className="p-1 md:p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded transition-colors text-xs md:text-sm font-bold flex-shrink-0"
            title="三级标题"
          >
            H3
          </button>
        </div>
        
        <div className="flex items-center space-x-2 flex-shrink-0">
          <button
            type="button"
            onClick={() => setIsPreview(!isPreview)}
            className={`px-2 md:px-3 py-1 md:py-1.5 text-xs md:text-sm rounded transition-colors ${
              isPreview 
                ? 'bg-blue-100 text-blue-700' 
                : 'text-gray-600 hover:text-gray-800 hover:bg-gray-200'
            }`}
          >
            <i className={`fas ${isPreview ? 'fa-edit' : 'fa-eye'} mr-1`}></i>
            <span className="hidden sm:inline">{isPreview ? '编辑' : '预览'}</span>
            <span className="sm:hidden">{isPreview ? '编辑' : '预览'}</span>
          </button>
        </div>
      </div>

      {/* 编辑器内容 */}
      <div className="relative">
        {!isPreview ? (
          <textarea
            ref={textareaRef}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-3 border-0 focus:outline-none resize-vertical min-h-[200px] font-mono text-sm"
            onKeyDown={(e) => {
              // 快捷键支持
              if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                  case 'b':
                    e.preventDefault();
                    insertMarkdown('bold');
                    break;
                  case 'i':
                    e.preventDefault();
                    insertMarkdown('italic');
                    break;
                  case 'k':
                    e.preventDefault();
                    insertMarkdown('link');
                    break;
                }
              }
            }}
          />
        ) : (
          <div 
            className="px-4 py-3 min-h-[200px] prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: renderMarkdown(value) }}
          />
        )}
      </div>

      {/* 帮助信息 */}
      <div className="bg-gray-50 border-t border-gray-200 px-3 py-2 text-xs text-gray-500">
        <div className="flex items-center justify-between">
          <span className="flex-shrink-0">支持 Markdown 语法</span>
          <div className="hidden md:flex items-center space-x-4 overflow-x-auto">
            <span>**粗体**</span>
            <span>*斜体*</span>
            <span>`代码`</span>
            <span>[链接](url)</span>
            <span>* 列表</span>
            <span># 标题</span>
          </div>
          <div className="md:hidden text-right">
            <span>快捷键: Ctrl+B/I/K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarkdownEditor;
