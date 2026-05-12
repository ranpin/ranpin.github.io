import { usePortfolioStore } from '../store/usePortfolioStore';

/**
 * 管理员模式 Hook
 */
export const useAdminMode = () => {
  const {
    isAdminMode,
    setIsAdminMode,
    customContent,
    setCustomContent,
    openInlineEditor,
    closeInlineEditor,
    inlineEditState
  } = usePortfolioStore();

  // 切换管理员模式
  const toggleAdminMode = () => {
    setIsAdminMode(!isAdminMode);
  };

  // 更新星际之门自定义内容
  const updateCustomContent = (index, newData) => {
    const updated = [...customContent];
    updated[index] = { ...updated[index], ...newData };
    setCustomContent(updated);
  };

  return {
    isAdminMode,
    toggleAdminMode,
    customContent,
    updateCustomContent,
    inlineEditState,
    openInlineEditor,
    closeInlineEditor
  };
};
