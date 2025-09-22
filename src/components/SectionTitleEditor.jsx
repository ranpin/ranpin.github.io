import React, { useState, useEffect } from 'react';

const SectionTitleEditor = ({ 
  sectionKey, 
  defaultTitle, 
  icon = 'fas fa-folder',
  onTitleChange,
  className = '',
  size = 'text-xl' // 新增size属性，支持不同大小
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingTitle, setEditingTitle] = useState('');
  const [customTitles, setCustomTitles] = useState({});

  // 加载自定义标题
  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio_custom_section_titles');
      if (stored) {
        const titles = JSON.parse(stored);
        setCustomTitles(titles);
      }
    } catch (error) {
      console.warn('Failed to load custom titles:', error);
    }
  }, []);

  // 获取显示标题
  const getDisplayTitle = () => {
    return customTitles[sectionKey] || defaultTitle;
  };

  // 开始编辑
  const startEditing = () => {
    setEditingTitle(getDisplayTitle());
    setIsEditing(true);
  };

  // 保存标题
  const saveTitle = () => {
    if (editingTitle.trim()) {
      const newTitles = {
        ...customTitles,
        [sectionKey]: editingTitle.trim()
      };
      setCustomTitles(newTitles);
      localStorage.setItem('portfolio_custom_section_titles', JSON.stringify(newTitles));
      
      if (onTitleChange) {
        onTitleChange(editingTitle.trim());
      }
    }
    setIsEditing(false);
    setEditingTitle('');
  };

  // 取消编辑
  const cancelEditing = () => {
    setIsEditing(false);
    setEditingTitle('');
  };

  // 重置标题
  const resetTitle = () => {
    if (window.confirm('确定要重置为默认标题吗？')) {
      const newTitles = { ...customTitles };
      delete newTitles[sectionKey];
      setCustomTitles(newTitles);
      localStorage.setItem('portfolio_custom_section_titles', JSON.stringify(newTitles));
      
      if (onTitleChange) {
        onTitleChange(defaultTitle);
      }
    }
  };

  const isAdminMode = localStorage.getItem('portfolio_admin_mode') === 'true';

  if (isEditing) {
    return (
      <div className={`flex items-center space-x-3 ${className}`}>
        <i className={`${icon} text-blue-500`}></i>
        <input
          type="text"
          value={editingTitle}
          onChange={(e) => setEditingTitle(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') saveTitle();
            if (e.key === 'Escape') cancelEditing();
          }}
          className={`${size} font-semibold bg-transparent border-b-2 border-blue-500 outline-none min-w-[200px]`}
          autoFocus
        />
        <div className="flex items-center space-x-2">
          <button
            onClick={saveTitle}
            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
            title="保存"
          >
            <i className="fas fa-check"></i>
          </button>
          <button
            onClick={cancelEditing}
            className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
            title="取消"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center justify-between group ${className}`}>
      <h3 className={`${size} font-semibold text-gray-800 flex items-center`}>
        <i className={`${icon} text-blue-500 mr-2`}></i>
        {getDisplayTitle()}
      </h3>
      
      {isAdminMode && (
        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={startEditing}
            className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            title="编辑标题"
          >
            <i className="fas fa-edit text-xs"></i>
          </button>
          {customTitles[sectionKey] && (
            <button
              onClick={resetTitle}
              className="p-1.5 text-gray-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-colors"
              title="重置为默认标题"
            >
              <i className="fas fa-undo text-xs"></i>
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SectionTitleEditor;
