import React, { useState, useEffect } from 'react';

const VersionManager = ({ onClose, onRestore }) => {
  const [versions, setVersions] = useState([]);
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [isCreatingBackup, setIsCreatingBackup] = useState(false);

  useEffect(() => {
    loadVersions();
  }, []);

  // 加载版本历史
  const loadVersions = () => {
    try {
      const storedVersions = localStorage.getItem('portfolio_versions');
      if (storedVersions) {
        const parsedVersions = JSON.parse(storedVersions);
        setVersions(parsedVersions.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
      }
    } catch (error) {
      console.error('Failed to load versions:', error);
    }
  };

  // 创建新版本
  const createVersion = async (description = '') => {
    setIsCreatingBackup(true);
    try {
      const currentData = {
        personalInfo: JSON.parse(localStorage.getItem('portfolio_personal_info') || '{}'),
        recentNews: JSON.parse(localStorage.getItem('portfolio_recent_news') || '[]'),
        projects: JSON.parse(localStorage.getItem('portfolio_projects') || '[]'),
        publications: JSON.parse(localStorage.getItem('portfolio_publications') || '[]'),
        internships: JSON.parse(localStorage.getItem('portfolio_internships') || '[]'),
        honors: JSON.parse(localStorage.getItem('portfolio_honors') || '[]'),
        academicBlogs: JSON.parse(localStorage.getItem('portfolio_academic_blogs') || '[]'),
        engineeringBlogs: JSON.parse(localStorage.getItem('portfolio_engineering_blogs') || '[]')
      };

      const newVersion = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        description: description || `自动备份 - ${new Date().toLocaleString('zh-CN')}`,
        data: currentData,
        size: JSON.stringify(currentData).length,
        type: description ? 'manual' : 'auto'
      };

      const existingVersions = JSON.parse(localStorage.getItem('portfolio_versions') || '[]');
      const updatedVersions = [newVersion, ...existingVersions];

      // 限制版本数量，保留最新的20个版本
      const limitedVersions = updatedVersions.slice(0, 20);

      localStorage.setItem('portfolio_versions', JSON.stringify(limitedVersions));
      setVersions(limitedVersions);
      
      alert('版本创建成功！');
    } catch (error) {
      console.error('Failed to create version:', error);
      alert('版本创建失败！');
    } finally {
      setIsCreatingBackup(false);
    }
  };

  // 选择性恢复状态
  const [showSelectiveRestore, setShowSelectiveRestore] = useState(false);
  const [restoreSelection, setRestoreSelection] = useState({});
  const [restoreVersion, setRestoreVersion] = useState(null);

  // 恢复版本（完整恢复）
  const restoreFullVersion = (version) => {
    if (window.confirm(`确定要完整恢复到版本 "${version.description}" 吗？当前数据将被覆盖！`)) {
      try {
        // 恢复数据到localStorage
        Object.entries(version.data).forEach(([key, value]) => {
          const storageKey = `portfolio_${key.replace(/([A-Z])/g, '_$1').toLowerCase()}`;
          localStorage.setItem(storageKey, JSON.stringify(value));
        });

        // 触发页面刷新
        window.dispatchEvent(new Event('storage'));
        
        if (onRestore) {
          onRestore(version);
        }
        
        alert('版本恢复成功！');
        onClose();
      } catch (error) {
        console.error('Failed to restore version:', error);
        alert('版本恢复失败！');
      }
    }
  };

  // 开始选择性恢复
  const startSelectiveRestore = (version) => {
    setRestoreVersion(version);
    // 初始化选择状态（默认全选）
    const initialSelection = {};
    Object.keys(version.data).forEach(key => {
      initialSelection[key] = true;
    });
    setRestoreSelection(initialSelection);
    setShowSelectiveRestore(true);
  };

  // 执行选择性恢复
  const executeSelectiveRestore = () => {
    if (!restoreVersion) return;

    const selectedModules = Object.keys(restoreSelection).filter(key => restoreSelection[key]);
    
    if (selectedModules.length === 0) {
      alert('请至少选择一个模块进行恢复！');
      return;
    }

    const moduleNames = selectedModules.map(key => getModuleName(key)).join('、');
    
    if (window.confirm(`确定要恢复以下模块吗？\n\n${moduleNames}\n\n这些模块的当前数据将被覆盖！`)) {
      try {
        // 只恢复选中的模块
        selectedModules.forEach(key => {
          const storageKey = `portfolio_${key.replace(/([A-Z])/g, '_$1').toLowerCase()}`;
          localStorage.setItem(storageKey, JSON.stringify(restoreVersion.data[key]));
        });

        // 触发页面刷新
        window.dispatchEvent(new Event('storage'));
        
        if (onRestore) {
          onRestore(restoreVersion);
        }
        
        alert(`成功恢复 ${selectedModules.length} 个模块！`);
        setShowSelectiveRestore(false);
        setRestoreVersion(null);
        setRestoreSelection({});
        onClose();
      } catch (error) {
        console.error('Failed to restore selected modules:', error);
        alert('选择性恢复失败！');
      }
    }
  };

  // 切换模块选择状态
  const toggleModuleSelection = (moduleKey) => {
    setRestoreSelection(prev => ({
      ...prev,
      [moduleKey]: !prev[moduleKey]
    }));
  };

  // 全选/取消全选
  const toggleSelectAll = () => {
    const allSelected = Object.values(restoreSelection).every(selected => selected);
    const newSelection = {};
    Object.keys(restoreSelection).forEach(key => {
      newSelection[key] = !allSelected;
    });
    setRestoreSelection(newSelection);
  };

  // 删除版本
  const deleteVersion = (versionId) => {
    if (window.confirm('确定要删除这个版本吗？此操作不可撤销！')) {
      try {
        const updatedVersions = versions.filter(v => v.id !== versionId);
        localStorage.setItem('portfolio_versions', JSON.stringify(updatedVersions));
        setVersions(updatedVersions);
        alert('版本删除成功！');
      } catch (error) {
        console.error('Failed to delete version:', error);
        alert('版本删除失败！');
      }
    }
  };

  // 导出版本
  const exportVersion = (version) => {
    try {
      const dataStr = JSON.stringify(version, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `portfolio-version-${version.id}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export version:', error);
      alert('版本导出失败！');
    }
  };

  // 格式化文件大小
  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  // 格式化时间
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return Math.floor(diff / 60000) + ' 分钟前';
    if (diff < 86400000) return Math.floor(diff / 3600000) + ' 小时前';
    if (diff < 604800000) return Math.floor(diff / 86400000) + ' 天前';
    
    return date.toLocaleString('zh-CN');
  };

  // 计算数据变化
  const calculateDataChanges = (versionData) => {
    const changes = {
      added: 0,
      modified: 0,
      deleted: 0,
      details: []
    };

    // 获取当前数据进行对比
    try {
      const currentData = {
        personalInfo: JSON.parse(localStorage.getItem('portfolio_personal_info') || '{}'),
        recentNews: JSON.parse(localStorage.getItem('portfolio_recent_news') || '[]'),
        projects: JSON.parse(localStorage.getItem('portfolio_projects') || '[]'),
        publications: JSON.parse(localStorage.getItem('portfolio_publications') || '[]'),
        internships: JSON.parse(localStorage.getItem('portfolio_internships') || '[]'),
        honors: JSON.parse(localStorage.getItem('portfolio_honors') || '[]'),
        academicBlogs: JSON.parse(localStorage.getItem('portfolio_academic_blogs') || '[]'),
        engineeringBlogs: JSON.parse(localStorage.getItem('portfolio_engineering_blogs') || '[]')
      };

      // 比较各个模块的数据
      Object.keys(versionData).forEach(key => {
        const versionItems = versionData[key];
        const currentItems = currentData[key];

        if (Array.isArray(versionItems) && Array.isArray(currentItems)) {
          const versionCount = versionItems.length;
          const currentCount = currentItems.length;
          
          if (versionCount !== currentCount) {
            const diff = currentCount - versionCount;
            if (diff > 0) {
              changes.added += diff;
              changes.details.push(`${getModuleName(key)}: 新增 ${diff} 项`);
            } else {
              changes.deleted += Math.abs(diff);
              changes.details.push(`${getModuleName(key)}: 删除 ${Math.abs(diff)} 项`);
            }
          }
        }
      });

    } catch (error) {
      console.error('计算数据变化失败:', error);
    }

    return changes;
  };

  // 获取模块中文名称
  const getModuleName = (key) => {
    const moduleNames = {
      personalInfo: '个人信息',
      recentNews: '最新动态',
      projects: '项目经历',
      publications: '学术论文',
      internships: '工作经历',
      honors: '荣誉奖项',
      academicBlogs: '学术博客',
      engineeringBlogs: '工程博客'
    };
    return moduleNames[key] || key;
  };

  // 获取备份内容详情
  const getBackupDetails = (versionData) => {
    const details = [];
    
    Object.entries(versionData).forEach(([key, value]) => {
      const moduleName = getModuleName(key);
      
      if (key === 'personalInfo') {
        const info = value || {};
        details.push({
          module: moduleName,
          type: 'object',
          count: 1,
          items: [
            info.name && `姓名: ${info.name}`,
            info.title && `职位: ${info.title}`,
            info.email && `邮箱: ${info.email}`,
            info.location && `地点: ${info.location}`,
            info.bio?.main && `简介: ${info.bio.main.substring(0, 50)}...`,
            info.researchInterests && `研究兴趣: ${Array.isArray(info.researchInterests) ? info.researchInterests.join(', ') : info.researchInterests}`,
            info.socialLinks && `社交链接: ${Object.keys(info.socialLinks).length} 个`
          ].filter(Boolean)
        });
      } else if (Array.isArray(value)) {
        details.push({
          module: moduleName,
          type: 'array',
          count: value.length,
          items: value.slice(0, 5).map(item => {
            if (key === 'recentNews') {
              return `${item.date}: ${item.content?.substring(0, 30)}...`;
            } else {
              return `${item.title || item.position || item.award || '未命名'}${item.period || item.year ? ` (${item.period || item.year})` : ''}`;
            }
          })
        });
      }
    });
    
    return details;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <i className="fas fa-history mr-3"></i>
                版本管理
              </h2>
              <p className="text-indigo-100 mt-1">管理数据版本历史和备份恢复</p>
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
          {/* 左侧版本列表 */}
          <div className="flex-1 overflow-y-auto border-r max-w-2xl">
            <div className="p-4 border-b bg-gray-50">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">版本历史</h3>
                <button
                  onClick={() => {
                    const description = prompt('请输入版本描述（可选）：');
                    if (description !== null) {
                      createVersion(description);
                    }
                  }}
                  disabled={isCreatingBackup}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium disabled:opacity-50"
                >
                  {isCreatingBackup ? (
                    <>
                      <i className="fas fa-spinner fa-spin mr-2"></i>
                      创建中...
                    </>
                  ) : (
                    <>
                      <i className="fas fa-plus mr-2"></i>
                      创建版本
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-4">
              {versions.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <i className="fas fa-history text-4xl mb-4"></i>
                  <p>暂无版本历史</p>
                  <p className="text-sm mt-2">点击"创建版本"开始版本管理</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {versions.map((version) => (
                    <div
                      key={version.id}
                      onClick={() => setSelectedVersion(version)}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedVersion?.id === version.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <h4 className="font-medium text-gray-900">{version.description}</h4>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              version.type === 'manual' 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-gray-100 text-gray-700'
                            }`}>
                              {version.type === 'manual' ? '手动' : '自动'}
                            </span>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <div>时间: {formatTime(version.timestamp)}</div>
                            <div>大小: {formatSize(version.size)}</div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                restoreFullVersion(version);
                              }}
                              className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                              title="完整恢复"
                            >
                              <i className="fas fa-undo text-sm"></i>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startSelectiveRestore(version);
                              }}
                              className="p-2 text-purple-600 hover:bg-purple-100 rounded-lg transition-colors"
                              title="选择性恢复"
                            >
                              <i className="fas fa-list-check text-sm"></i>
                            </button>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              exportVersion(version);
                            }}
                            className="p-2 text-green-600 hover:bg-green-100 rounded-lg transition-colors"
                            title="导出版本"
                          >
                            <i className="fas fa-download text-sm"></i>
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteVersion(version.id);
                            }}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                            title="删除版本"
                          >
                            <i className="fas fa-trash text-sm"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 右侧版本详情 */}
          <div className="w-96 p-6 overflow-y-auto">
            {selectedVersion ? (
              <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">版本详情</h3>
                
                <div className="space-y-6">
                  {/* 基本信息 */}
                  <div className="bg-white rounded-lg border p-4">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <i className="fas fa-info-circle text-blue-500 mr-2"></i>
                      基本信息
                    </h4>
                    <div className="space-y-3 text-sm">
                      <div>
                        <label className="block text-gray-600 mb-1">版本描述</label>
                        <p className="text-gray-900 font-medium">{selectedVersion.description}</p>
                      </div>
                      
                      <div>
                        <label className="block text-gray-600 mb-1">创建时间</label>
                        <p className="text-gray-900">{new Date(selectedVersion.timestamp).toLocaleString('zh-CN')}</p>
                      </div>
                      
                      <div className="flex justify-between">
                        <div>
                          <label className="block text-gray-600 mb-1">数据大小</label>
                          <p className="text-gray-900">{formatSize(selectedVersion.size)}</p>
                        </div>
                        <div>
                          <label className="block text-gray-600 mb-1">版本类型</label>
                          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${
                            selectedVersion.type === 'manual' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {selectedVersion.type === 'manual' ? '手动' : '自动'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 数据统计 */}
                  <div className="bg-white rounded-lg border p-4">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <i className="fas fa-chart-bar text-green-500 mr-2"></i>
                      数据统计
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="bg-blue-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-blue-600">{selectedVersion.data.projects?.length || 0}</div>
                        <div className="text-blue-800">项目经历</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-green-600">{selectedVersion.data.publications?.length || 0}</div>
                        <div className="text-green-800">学术论文</div>
                      </div>
                      <div className="bg-purple-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-purple-600">{selectedVersion.data.internships?.length || 0}</div>
                        <div className="text-purple-800">工作经历</div>
                      </div>
                      <div className="bg-orange-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-orange-600">{selectedVersion.data.honors?.length || 0}</div>
                        <div className="text-orange-800">荣誉奖项</div>
                      </div>
                      <div className="bg-indigo-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-indigo-600">{selectedVersion.data.recentNews?.length || 0}</div>
                        <div className="text-indigo-800">最新动态</div>
                      </div>
                      <div className="bg-pink-50 rounded-lg p-3 text-center">
                        <div className="text-xl font-bold text-pink-600">
                          {(selectedVersion.data.academicBlogs?.length || 0) + (selectedVersion.data.engineeringBlogs?.length || 0)}
                        </div>
                        <div className="text-pink-800">学习记录</div>
                      </div>
                    </div>
                  </div>

                  {/* 备份内容详情 */}
                  <div className="bg-white rounded-lg border p-4">
                    <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                      <i className="fas fa-list-ul text-purple-500 mr-2"></i>
                      备份内容详情
                    </h4>
                    <div className="space-y-4 max-h-80 overflow-y-auto">
                      {getBackupDetails(selectedVersion.data).map((detail, index) => (
                        <div key={index} className="border-l-4 border-blue-200 pl-3">
                          <div className="flex items-center justify-between mb-2">
                            <h5 className="font-medium text-gray-800">{detail.module}</h5>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {detail.count} {detail.type === 'array' ? '项' : '个'}
                            </span>
                          </div>
                          {detail.items.length > 0 && (
                            <div className="space-y-1">
                              {detail.items.map((item, itemIndex) => (
                                <div key={itemIndex} className="text-xs text-gray-600 bg-gray-50 rounded px-2 py-1">
                                  {item}
                                </div>
                              ))}
                              {detail.count > 5 && (
                                <div className="text-xs text-gray-500 italic">
                                  ... 还有 {detail.count - 5} 项
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 与当前数据对比 */}
                  {(() => {
                    const changes = calculateDataChanges(selectedVersion.data);
                    return changes.details.length > 0 && (
                      <div className="bg-white rounded-lg border p-4">
                        <h4 className="font-medium text-gray-800 mb-3 flex items-center">
                          <i className="fas fa-exchange-alt text-yellow-500 mr-2"></i>
                          与当前数据对比
                        </h4>
                        <div className="space-y-2">
                          {changes.details.map((detail, index) => (
                            <div key={index} className="text-sm text-gray-600 bg-yellow-50 rounded px-3 py-2">
                              {detail}
                            </div>
                          ))}
                          {changes.details.length === 0 && (
                            <div className="text-sm text-green-600 bg-green-50 rounded px-3 py-2">
                              <i className="fas fa-check mr-2"></i>
                              与当前数据一致
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* 操作按钮 */}
                <div className="space-y-3 mt-8 pt-6 border-t">
                  <button
                    onClick={() => restoreFullVersion(selectedVersion)}
                    className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <i className="fas fa-undo mr-2"></i>
                    完整恢复
                  </button>
                  <button
                    onClick={() => startSelectiveRestore(selectedVersion)}
                    className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                  >
                    <i className="fas fa-list-check mr-2"></i>
                    选择性恢复
                  </button>
                  <button
                    onClick={() => exportVersion(selectedVersion)}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <i className="fas fa-download mr-2"></i>
                    导出版本
                  </button>
                  <button
                    onClick={() => deleteVersion(selectedVersion.id)}
                    className="w-full px-4 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium"
                  >
                    <i className="fas fa-trash mr-2"></i>
                    删除版本
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500">
                <i className="fas fa-mouse-pointer text-3xl mb-3"></i>
                <p>选择一个版本查看详情</p>
              </div>
            )}
          </div>
        </div>

        {/* 选择性恢复弹窗 */}
        {showSelectiveRestore && restoreVersion && (
          <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] overflow-hidden">
              {/* 头部 */}
              <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold flex items-center">
                      <i className="fas fa-list-check mr-2 sm:mr-3"></i>
                      选择性恢复
                    </h3>
                    <p className="text-purple-100 mt-1 text-sm sm:text-base">选择要恢复的模块</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowSelectiveRestore(false);
                      setRestoreVersion(null);
                      setRestoreSelection({});
                    }}
                    className="w-8 h-8 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors flex-shrink-0"
                  >
                    <i className="fas fa-times text-sm"></i>
                  </button>
                </div>
              </div>

              <div className="flex flex-col h-[calc(95vh-80px)] sm:h-[calc(90vh-120px)]">
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                  {/* 版本信息 */}
                  <div className="bg-purple-50 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6">
                    <h4 className="font-semibold text-purple-800 mb-2 text-sm sm:text-base">恢复版本信息</h4>
                    <div className="text-xs sm:text-sm text-purple-700 space-y-1">
                      <p><strong>版本：</strong>{restoreVersion.description}</p>
                      <p><strong>时间：</strong>{new Date(restoreVersion.timestamp).toLocaleString('zh-CN')}</p>
                    </div>
                  </div>

                  {/* 全选控制 */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={Object.values(restoreSelection).every(selected => selected)}
                        onChange={toggleSelectAll}
                        className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                      />
                      <span className="font-medium text-gray-700 text-sm sm:text-base">全选/取消全选</span>
                    </label>
                    <span className="text-xs sm:text-sm text-gray-500">
                      已选择 {Object.values(restoreSelection).filter(Boolean).length} / {Object.keys(restoreSelection).length} 个模块
                    </span>
                  </div>

                  {/* 模块选择列表 */}
                  <div className="space-y-2 sm:space-y-3">
                    {Object.entries(restoreVersion.data).map(([moduleKey, moduleData]) => {
                      const moduleName = getModuleName(moduleKey);
                      const isSelected = restoreSelection[moduleKey];
                      
                      // 计算模块数据统计
                      let itemCount = 0;
                      let previewText = '';
                      
                      if (moduleKey === 'personalInfo') {
                        itemCount = 1;
                        previewText = `${moduleData.name || '未设置姓名'} - ${moduleData.title || '未设置职位'}`;
                      } else if (Array.isArray(moduleData)) {
                        itemCount = moduleData.length;
                        if (itemCount > 0) {
                          const firstItem = moduleData[0];
                          previewText = firstItem.title || firstItem.position || firstItem.award || firstItem.content || '未命名';
                          if (itemCount > 1) {
                            previewText += ` 等 ${itemCount} 项`;
                          }
                        } else {
                          previewText = '暂无数据';
                        }
                      }

                      return (
                        <div
                          key={moduleKey}
                          className={`p-3 sm:p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            isSelected
                              ? 'border-purple-500 bg-purple-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                          onClick={() => toggleModuleSelection(moduleKey)}
                        >
                          <div className="flex items-start space-x-2 sm:space-x-3">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              onChange={() => toggleModuleSelection(moduleKey)}
                              className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 mt-0.5 sm:mt-1 flex-shrink-0"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-2 mb-2">
                                <h4 className="font-medium text-gray-900 text-sm sm:text-base">{moduleName}</h4>
                                <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs mt-1 sm:mt-0 self-start">
                                  {moduleKey === 'personalInfo' ? '1个配置' : `${itemCount} 项数据`}
                                </span>
                              </div>
                              <p className="text-xs sm:text-sm text-gray-600 break-words">{previewText}</p>
                              
                              {/* 显示当前数据对比 */}
                              {(() => {
                                try {
                                  const currentStorageKey = `portfolio_${moduleKey.replace(/([A-Z])/g, '_$1').toLowerCase()}`;
                                  const currentData = JSON.parse(localStorage.getItem(currentStorageKey) || (moduleKey === 'personalInfo' ? '{}' : '[]'));
                                  
                                  let currentCount = 0;
                                  if (moduleKey === 'personalInfo') {
                                    currentCount = Object.keys(currentData).length > 0 ? 1 : 0;
                                  } else if (Array.isArray(currentData)) {
                                    currentCount = currentData.length;
                                  }
                                  
                                  const diff = itemCount - currentCount;
                                  if (diff !== 0) {
                                    return (
                                      <div className="mt-2">
                                        <span className={`inline-block px-2 py-1 rounded text-xs ${
                                          diff > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                                        }`}>
                                          {diff > 0 ? `+${diff}` : diff} 相对当前数据
                                        </span>
                                      </div>
                                    );
                                  }
                                } catch (error) {
                                  console.error('Error comparing data:', error);
                                }
                                return null;
                              })()}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* 警告提示 */}
                  <div className="mt-4 sm:mt-6 p-3 sm:p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-start space-x-2">
                      <i className="fas fa-exclamation-triangle text-yellow-600 mt-0.5 flex-shrink-0"></i>
                      <div className="text-xs sm:text-sm">
                        <p className="font-medium text-yellow-800">恢复提醒</p>
                        <p className="text-yellow-700 mt-1">
                          选中的模块数据将被版本数据覆盖，当前数据将丢失。建议在恢复前先创建当前版本的备份。
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* 操作按钮 */}
                <div className="p-4 sm:p-6 border-t flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                  <button
                    onClick={() => {
                      setShowSelectiveRestore(false);
                      setRestoreVersion(null);
                      setRestoreSelection({});
                    }}
                    className="w-full sm:flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm sm:text-base"
                  >
                    取消
                  </button>
                  <button
                    onClick={() => {
                      // 先创建当前数据的备份
                      if (window.confirm('是否在恢复前先创建当前数据的备份？\n\n建议选择"确定"以防数据丢失。')) {
                        createVersion('恢复前自动备份');
                      }
                      executeSelectiveRestore();
                    }}
                    disabled={Object.values(restoreSelection).filter(Boolean).length === 0}
                    className="w-full sm:flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                  >
                    <i className="fas fa-undo mr-2"></i>
                    恢复选中模块 ({Object.values(restoreSelection).filter(Boolean).length})
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VersionManager;
