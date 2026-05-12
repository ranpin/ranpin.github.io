import React, { useState } from 'react';

/**
 * 通用可编辑卡片包装器组件
 * 提供悬停编辑/删除按钮、插入点功能
 */
const EditableCard = ({ 
  children, 
  isAdminMode, 
  onEdit, 
  onDelete, 
  onInsertBefore, 
  onInsertAfter,
  className = '',
  showInsertPoints = true // 是否显示插入点
}) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  if (!isAdminMode) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div className={`group relative ${className}`}>
      {/* 插入点 - 上方 (管理员模式下常驻显示，带引导性) */}
      {showInsertPoints && onInsertBefore && (
        <div 
          className="absolute -top-3 left-0 right-0 h-6 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all z-20"
          onClick={(e) => {
            e.stopPropagation();
            onInsertBefore();
          }}
        >
          <div className="w-full max-w-md h-px bg-blue-400 rounded-full cursor-pointer hover:bg-blue-600 hover:h-0.5 transition-all flex items-center justify-center group-hover:shadow-sm">
            <div className="bg-white border border-blue-400 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
              + 在此插入新模块
            </div>
          </div>
        </div>
      )}

      {/* 主内容区域 */}
      <div className="relative">
        {children}
        
        {/* 悬浮操作按钮 */}
        <div className="absolute top-2 right-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
          {onEdit && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-2 bg-white shadow-md rounded-lg hover:bg-blue-50 text-gray-600 hover:text-blue-600 transition-colors"
              title="编辑"
            >
              <i className="fas fa-edit text-sm"></i>
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowConfirmDelete(true);
              }}
              className="p-2 bg-white shadow-md rounded-lg hover:bg-red-50 text-gray-600 hover:text-red-600 transition-colors"
              title="删除"
            >
              <i className="fas fa-trash text-sm"></i>
            </button>
          )}
        </div>
      </div>

      {/* 插入点 - 下方 (管理员模式下常驻显示，带引导性) */}
      {showInsertPoints && onInsertAfter && (
        <div 
          className="absolute -bottom-3 left-0 right-0 h-6 flex items-center justify-center opacity-40 group-hover:opacity-100 transition-all z-20"
          onClick={(e) => {
            e.stopPropagation();
            onInsertAfter();
          }}
        >
          <div className="w-full max-w-md h-px bg-blue-400 rounded-full cursor-pointer hover:bg-blue-600 hover:h-0.5 transition-all flex items-center justify-center group-hover:shadow-sm">
            <div className="bg-white border border-blue-400 text-blue-600 text-[10px] font-bold px-2 py-0.5 rounded-full opacity-60 group-hover:opacity-100 transition-opacity pointer-events-none shadow-sm">
              + 在此插入新模块
            </div>
          </div>
        </div>
      )}

      {/* 删除确认弹窗 */}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                <i className="fas fa-exclamation-triangle text-red-600 text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">确认删除</h3>
                <p className="text-sm text-gray-500 mt-1">此操作可以撤销，但建议谨慎操作</p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setShowConfirmDelete(false)}
                className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                取消
              </button>
              <button
                onClick={() => {
                  setShowConfirmDelete(false);
                  onDelete();
                }}
                className="flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
              >
                确认删除
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditableCard;
