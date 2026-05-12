import { useMemo } from 'react';
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

  // 更新自定义 Tab 名称
  const updateTabName = (key, newName) => {
    setCustomTabNames(prev => ({
      ...prev,
      [key]: newName
    }));
  };

  return {
    activeCategory: resumeCategory,
    setActiveCategory: setResumeCategory,
    tabs,
    handleDragEnd,
    updateTabName
  };
};
