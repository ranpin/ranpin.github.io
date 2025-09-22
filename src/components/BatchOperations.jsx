import React, { useState } from 'react';

const BatchOperations = ({ 
  items, 
  type, 
  onBatchDelete, 
  onBatchEdit, 
  onClose 
}) => {
  const [selectedItems, setSelectedItems] = useState(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [batchAction, setBatchAction] = useState('');
  const [batchEditData, setBatchEditData] = useState({});

  // 处理全选/取消全选
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems(new Set());
    } else {
      setSelectedItems(new Set(items.map(item => item.id)));
    }
    setSelectAll(!selectAll);
  };

  // 处理单项选择
  const handleItemSelect = (itemId) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(itemId)) {
      newSelected.delete(itemId);
    } else {
      newSelected.add(itemId);
    }
    setSelectedItems(newSelected);
    setSelectAll(newSelected.size === items.length);
  };

  // 执行批量操作
  const executeBatchAction = () => {
    const selectedItemsArray = Array.from(selectedItems);
    
    if (selectedItemsArray.length === 0) {
      alert('请先选择要操作的项目！');
      return;
    }

    switch (batchAction) {
      case 'delete':
        if (window.confirm(`确定要删除选中的 ${selectedItemsArray.length} 个项目吗？此操作不可撤销！`)) {
          onBatchDelete(selectedItemsArray);
          onClose();
        }
        break;
      case 'edit':
        if (Object.keys(batchEditData).length === 0) {
          alert('请设置要批量修改的字段！');
          return;
        }
        onBatchEdit(selectedItemsArray, batchEditData);
        onClose();
        break;
      default:
        alert('请选择要执行的操作！');
    }
  };

  // 获取可批量编辑的字段
  const getEditableFields = () => {
    switch (type) {
      case 'projects':
        return [
          { name: 'status', label: '项目状态', type: 'select', options: ['已完成', '进行中', '已上线', '论文发表', '生产部署', '开源项目', '商业项目'] },
          { name: 'tags', label: '添加标签', type: 'text', placeholder: '用逗号分隔' }
        ];
      case 'publications':
        return [
          { name: 'type', label: '论文类型', type: 'select', options: ['会议论文', '期刊论文', '预印本', '专利'] },
          { name: 'year', label: '发表年份', type: 'text' }
        ];
      case 'internships':
        return [
          { name: 'type', label: '工作类型', type: 'select', options: ['实习', '全职', '兼职', '项目合作'] },
          { name: 'skills', label: '添加技能', type: 'text', placeholder: '用逗号分隔' }
        ];
      default:
        return [];
    }
  };

  const editableFields = getEditableFields();

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <i className="fas fa-tasks mr-3"></i>
                批量操作
              </h2>
              <p className="text-orange-100 mt-1">选择项目进行批量处理</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <div className="flex h-[calc(90vh-120px)]">
          {/* 左侧项目列表 */}
          <div className="flex-1 overflow-y-auto border-r">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <span className="text-sm font-medium text-gray-700">
                    全选 ({selectedItems.size}/{items.length})
                  </span>
                </label>
                <span className="text-sm text-gray-500">
                  已选择 {selectedItems.size} 个项目
                </span>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${
                    selectedItems.has(item.id)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleItemSelect(item.id)}
                >
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedItems.has(item.id)}
                      onChange={() => handleItemSelect(item.id)}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500 mt-1"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">
                        {item.title || item.position || item.award || '未命名'}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.period || item.year || '时间未知'}
                      </p>
                      {item.status && (
                        <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs mt-2">
                          {item.status}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 右侧操作面板 */}
          <div className="w-80 p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">批量操作</h3>
            
            <div className="space-y-4">
              {/* 操作类型选择 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  选择操作类型
                </label>
                <select
                  value={batchAction}
                  onChange={(e) => setBatchAction(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">请选择操作...</option>
                  <option value="delete">批量删除</option>
                  {editableFields.length > 0 && (
                    <option value="edit">批量编辑</option>
                  )}
                </select>
              </div>

              {/* 批量编辑字段 */}
              {batchAction === 'edit' && editableFields.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-700">编辑字段</h4>
                  {editableFields.map((field) => (
                    <div key={field.name}>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {field.label}
                      </label>
                      {field.type === 'select' ? (
                        <select
                          value={batchEditData[field.name] || ''}
                          onChange={(e) => setBatchEditData(prev => ({
                            ...prev,
                            [field.name]: e.target.value
                          }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                          <option value="">不修改</option>
                          {field.options.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type="text"
                          value={batchEditData[field.name] || ''}
                          onChange={(e) => setBatchEditData(prev => ({
                            ...prev,
                            [field.name]: e.target.value
                          }))}
                          placeholder={field.placeholder}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* 操作预览 */}
              {batchAction && selectedItems.size > 0 && (
                <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <i className="fas fa-exclamation-triangle text-yellow-600 mt-0.5"></i>
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800">操作预览</p>
                      <p className="text-yellow-700 mt-1">
                        {batchAction === 'delete' 
                          ? `将删除 ${selectedItems.size} 个项目`
                          : `将修改 ${selectedItems.size} 个项目的指定字段`
                        }
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 操作按钮 */}
            <div className="flex space-x-3 mt-8">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                onClick={executeBatchAction}
                disabled={!batchAction || selectedItems.size === 0}
                className={`flex-1 px-4 py-2 rounded-lg font-medium transition-colors ${
                  batchAction === 'delete'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                <i className={`fas ${batchAction === 'delete' ? 'fa-trash' : 'fa-edit'} mr-2`}></i>
                执行操作
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchOperations;
