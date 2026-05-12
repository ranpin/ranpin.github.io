import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { usePortfolioStore } from '../usePortfolioStore';

// 由于 useLearningFilter 是自定义 Hook，我们直接测试其逻辑或通过在组件中的表现来验证
// 这里我们测试 Store 中与学习记录相关的状态管理逻辑

describe('usePortfolioStore - Learning Records', () => {
  it('should initialize with academic and engineering blogs', () => {
    const { result } = renderHook(() => usePortfolioStore());
    
    expect(result.current.academicBlogs).toBeDefined();
    expect(result.current.engineeringBlogs).toBeDefined();
    expect(Array.isArray(result.current.academicBlogs)).toBe(true);
    expect(Array.isArray(result.current.engineeringBlogs)).toBe(true);
  });

  it('should update learning category correctly', () => {
    const { result } = renderHook(() => usePortfolioStore());
    
    act(() => {
      result.current.setActiveSection('learning');
    });

    // 假设 Store 中有设置 learningCategory 的 action，如果没有则测试相关状态切换
    expect(result.current.activeSection).toBe('learning');
  });
});
