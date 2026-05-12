#!/usr/bin/env python3
"""创建 InlineEditor.jsx 文件"""

content = '''import React, { useState, useEffect } from 'react';

/**
 * 通用内联编辑器组件
 * 支持在页面上直接编辑各种类型的内容
 */
const InlineEditor = ({ 
  isVisible, 
  onClose, 
  onSave, 
  itemType, 
  initialData, 
  title 
}) => {
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (initialData) {
      // 处理数组字段转换为字符串（用于表单输入）
      const processedData = { ...initialData };
      
      if (processedData.tags && Array.isArray(processedData.tags)) {
        processedData.tags = processedData.tags.join(', ');
      }
      if (processedData.achievements && Array.isArray(processedData.achievements)) {
        processedData.achievements = processedData.achievements.join('\\n');
      }
      if (processedData.contributions && Array.isArray(processedData.contributions)) {
        processedData.contributions = processedData.contributions.join('\\n');
      }
      if (processedData.skills && Array.isArray(processedData.skills)) {
        processedData.skills = processedData.skills.join(', ');
      }
      if (processedData.researchInterests && Array.isArray(processedData.researchInterests)) {
        processedData.researchInterests = processedData.researchInterests.join(', ');
      }
      
      setFormData(processedData);
    }
  }, [initialData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // 将字符串转换回数组
    const saveData = { ...formData };
    
    if (saveData.tags && typeof saveData.tags === 'string') {
      saveData.tags = saveData.tags.split(',').map(tag => tag.trim()).filter(tag => tag);
    }
    if (saveData.achievements && typeof saveData.achievements === 'string') {
      saveData.achievements = saveData.achievements.split('\\n').filter(line => line.trim());
    }
    if (saveData.contributions && typeof saveData.contributions === 'string') {
      saveData.contributions = saveData.contributions.split('\\n').filter(line => line.trim());
    }
    if (saveData.skills && typeof saveData.skills === 'string') {
      saveData.skills = saveData.skills.split(',').map(skill => skill.trim()).filter(skill => skill);
    }
    if (saveData.researchInterests && typeof saveData.researchInterests === 'string') {
      saveData.researchInterests = saveData.researchInterests.split(',').map(interest => interest.trim()).filter(interest => interest);
    }
    
    onSave(saveData);
    onClose();
  };

  const renderFormFields = () => {
    switch (itemType) {
      case 'news':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">日期</label>
              <input
                type="text"
                value={formData.date || ''}
                onChange={(e) => handleChange('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="例如：2026.04"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">内容</label>
              <textarea
                value={formData.content || ''}
                onChange={(e) => handleChange('content', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="动态内容..."
              />
            </div>
          </>
        );

      case 'personal-info':
        return (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">姓名</label>
              <input
                type="text"
                value={formData.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">职位</label>
              <input
                type="text"
                value={formData.title || ''}
                onChange={(e) => handleChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">位置</label>
              <input
                type="text"
                value={formData.location || ''}
                onChange={(e) => handleChange('location', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">邮箱</label>
              <input
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">头像（字母或URL）</label>
              <input
                type="text"
                value={formData.avatar || ''}
                onChange={(e) => handleChange('avatar', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">个人简介（主）</label>
              <textarea
                value={formData['bio.main'] || ''}
                onChange={(e) => handleChange('bio.main', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">个人简介（详细）</label>
              <textarea
                value={formData['bio.detail'] || ''}
                onChange={(e) => handleChange('bio.detail', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">研究兴趣（逗号分隔）</label>
              <input
                type="text"
                value={formData.researchInterests || ''}
                onChange={(e) => handleChange('researchInterests', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </>
        );

      default:
        return <p className="text-gray-500">暂不支持此类型的编辑</p>;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
        {/* 标题栏 */}
        <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900">
            {title || '编辑内容'}
          </h2>
          <button
            onClick={onClose}
            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <i className="fas fa-times text-gray-600"></i>
          </button>
        </div>
        
        {/* 表单内容 */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {renderFormFields()}
        </div>

        {/* 底部按钮 */}
        <div className="sticky bottom-0 bg-gray-50 border-t p-4 flex justify-end space-x-3 rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            取消
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default InlineEditor;
'''

with open('/Users/ranpin/code/ranpin.github.io/src/components/InlineEditor.jsx', 'w', encoding='utf-8') as f:
    f.write(content)

print("InlineEditor.jsx 创建成功！")
