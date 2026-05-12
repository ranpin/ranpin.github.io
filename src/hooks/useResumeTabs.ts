import { useMemo, useState } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

/**
 * 简历模块 Tab 管理 Hook
 */
export const useResumeTabs = () => {
  const {
    resumeCategory,
    resumeTabOrder,
    customTabNames,
    setResumeCategory,
    setResumeTabOrder,
    setCustomTabNames
  } = usePortfolioStore();

  const [editingTabId, setEditingTabId] = useState(null);
  const [editingTabName, setEditingTabName] = useState('');

  // 获取 Tab 的默认显示名称
  const getTabDisplayName = (key) => {
    const tabConfig = {
      projects: '项目经历',
      publications: '论文发表',
      internships: '实习经历',
      honors: '荣誉奖项'
    };
    return tabConfig[key] || key;
  };

  // 生成带有自定义名称和图标的 Tab 列表
  const tabs = useMemo(() => {
    const tabConfig = {
      projects: { label: '项目经历', icon: '💼' },
      publications: { label: '论文发表', icon: '📄' },
      internships: { label: '实习经历', icon: '🏢' },
      honors: { label: '荣誉奖项', icon: '🏆' }
    };

    return resumeTabOrder.map(key => ({
      key,
      ...tabConfig[key],
      customName: customTabNames[key]
    }));
  }, [resumeTabOrder, customTabNames]);

  // 处理拖拽结束
  const handleDragEnd = (result) => {
    if (!result.destination) return;
    
    const items = Array.from(resumeTabOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    
    setResumeTabOrder(items);
  };

  // Tab 编辑逻辑
  const startEditingTab = (tabKey) => {
    setEditingTabId(tabKey);
    setEditingTabName(customTabNames[tabKey] || getTabDisplayName(tabKey));
  };

  const cancelEditingTab = () => {
    setEditingTabId(null);
    setEditingTabName('');
  };

  const saveTabName = () => {
    if (editingTabId && editingTabName.trim()) {
      setCustomTabNames(prev => ({
        ...prev,
        [editingTabId]: editingTabName.trim()
      }));
    }
    cancelEditingTab();
  };

  return {
    activeCategory: resumeCategory,
    setActiveCategory: setResumeCategory,
    tabs,
    handleDragEnd,
    updateTabName: (key, newName) => setCustomTabNames(prev => ({ ...prev, [key]: newName })),
    editingTabId,
    editingTabName,
    setEditingTabName,
    startEditingTab,
    cancelEditingTab,
    saveTabName
  };
};
