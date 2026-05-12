import { describe, it, expect, beforeEach } from 'vitest';
import { usePortfolioStore } from './usePortfolioStore';

describe('usePortfolioStore', () => {
  beforeEach(() => {
    // 重置 Store 到初始状态，确保测试隔离性
    usePortfolioStore.setState({
      activeSection: 'home',
      learningCategory: 'academic',
      resumeCategory: 'projects',
      isAdminMode: false,
      customContent: [],
      inlineEditState: { isVisible: false, type: null, data: null, index: null },
      insertMenuState: { isVisible: false, index: null, type: null },
    });
  });

  it('should have initial state correctly set', () => {
    const state = usePortfolioStore.getState();
    expect(state.activeSection).toBe('home');
    expect(state.isAdminMode).toBe(false);
    expect(state.personalInfo).toBeDefined();
  });

  it('should update activeSection via setActiveSection', () => {
    const { setActiveSection } = usePortfolioStore.getState();
    setActiveSection('learning');
    expect(usePortfolioStore.getState().activeSection).toBe('learning');
  });

  it('should toggle admin mode via setIsAdminMode', () => {
    const { setIsAdminMode } = usePortfolioStore.getState();
    
    setIsAdminMode(true);
    expect(usePortfolioStore.getState().isAdminMode).toBe(true);
    
    setIsAdminMode(false);
    expect(usePortfolioStore.getState().isAdminMode).toBe(false);
  });

  it('should add custom content via setCustomContent', () => {
    const { setCustomContent } = usePortfolioStore.getState();
    const initialContent = usePortfolioStore.getState().customContent;
    const newItem = { id: 'test-1', title: 'Test Item' };
    
    setCustomContent([...initialContent, newItem]);
    const state = usePortfolioStore.getState();
    expect(state.customContent).toContainEqual(newItem);
  });
});
