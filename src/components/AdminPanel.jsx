import React, { useState, useRef } from 'react';

const AdminPanel = ({ 
  isVisible, 
  onClose, 
  onResetData, 
  onExportData, 
  onImportData
}) => {
  const [activeTab, setActiveTab] = useState('stats');
  const fileInputRef = useRef(null);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[80vh] flex flex-col animate-fade-in">
        
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-800 flex items-center">
            <i className="fas fa-shield-alt text-blue-600 mr-3"></i>
            后台运维中心
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-red-500 transition-colors">
            <i className="fas fa-times text-xl"></i>
          </button>
        </div>

        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="w-56 bg-gray-50 border-r border-gray-100 p-4 space-y-2">
            {[
              { id: 'stats', label: '数据统计', icon: 'fa-chart-pie' },
              { id: 'backup', label: '备份与恢复', icon: 'fa-database' },
              { id: 'settings', label: '全局设置', icon: 'fa-cogs' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white shadow-md' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <i className={`fas ${tab.icon} mr-3 w-5`}></i>
                {tab.label}
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 overflow-y-auto p-8">
            {activeTab === 'stats' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">网站概览</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div className="bg-blue-50 p-6 rounded-xl border border-blue-100">
                    <div className="text-blue-600 text-sm font-bold uppercase tracking-wider mb-2">项目总数</div>
                    <div className="text-3xl font-bold text-gray-900">{JSON.parse(localStorage.getItem('portfolio_projects') || '[]').length}</div>
                  </div>
                  <div className="bg-green-50 p-6 rounded-xl border border-green-100">
                    <div className="text-green-600 text-sm font-bold uppercase tracking-wider mb-2">学术论文</div>
                    <div className="text-3xl font-bold text-gray-900">{JSON.parse(localStorage.getItem('portfolio_publications') || '[]').length}</div>
                  </div>
                  <div className="bg-purple-50 p-6 rounded-xl border border-purple-100">
                    <div className="text-purple-600 text-sm font-bold uppercase tracking-wider mb-2">最新动态</div>
                    <div className="text-3xl font-bold text-gray-900">{JSON.parse(localStorage.getItem('portfolio_recent_news') || '[]').length}</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'backup' && (
              <div className="space-y-8">
                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-download text-blue-500 mr-2"></i>
                    数据导出
                  </h3>
                  <p className="text-gray-600 mb-6">将当前所有网站数据导出为 JSON 文件，用于本地备份或迁移。</p>
                  <button 
                    onClick={onExportData}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    立即导出
                  </button>
                </div>

                <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                    <i className="fas fa-upload text-green-500 mr-2"></i>
                    数据导入
                  </h3>
                  <p className="text-gray-600 mb-6">从之前导出的 JSON 文件中恢复数据。此操作会覆盖当前所有内容。</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".json"
                    onChange={onImportData}
                    className="hidden"
                  />
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    选择文件并导入
                  </button>
                </div>

                <div className="bg-red-50 border border-red-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                    <i className="fas fa-exclamation-triangle text-red-600 mr-2"></i>
                    重置数据
                  </h3>
                  <p className="text-red-600 mb-6">将所有数据恢复到初始状态。此操作不可撤销，请谨慎使用。</p>
                  <button 
                    onClick={onResetData}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    执行重置
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'settings' && (
              <div className="text-center py-12 text-gray-500">
                <i className="fas fa-tools text-4xl mb-4 text-gray-300"></i>
                <p>全局设置功能正在开发中...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
