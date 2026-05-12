import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePortfolioStore } from '../usePortfolioStore';

describe('usePortfolioStore - Resume Tabs', () => {
  it('should initialize with default resume tab order', () => {
    const { result } = renderHook(() => usePortfolioStore());
    
    expect(result.current.resumeTabOrder).toBeDefined();
    expect(Array.isArray(result.current.resumeTabOrder)).toBe(true);
    expect(result.current.resumeTabOrder.length).toBeGreaterThan(0);
  });

  it('should update resume tab order', () => {
    const { result } = renderHook(() => usePortfolioStore());
    const initialTabs = [...result.current.resumeTabOrder];
    
    act(() => {
      if (initialTabs.length > 1) {
        const newOrder = [initialTabs[1], initialTabs[0], ...initialTabs.slice(2)];
        result.current.setResumeTabOrder(newOrder);
      }
    });

    if (initialTabs.length > 1) {
      expect(result.current.resumeTabOrder[0]).toBe(initialTabs[1]);
    }
  });

  it('should handle custom tab name updates', () => {
    const { result } = renderHook(() => usePortfolioStore());
    
    act(() => {
      result.current.setCustomTabNames({ projects: '我的项目' });
    });

    expect(result.current.customTabNames.projects).toBe('我的项目');
  });
});
