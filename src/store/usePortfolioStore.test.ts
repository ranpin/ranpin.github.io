import { describe, it, expect, beforeEach } from 'vitest';
import { usePortfolioStore } from './usePortfolioStore';

describe('usePortfolioStore', () => {
  beforeEach(() => {
    usePortfolioStore.setState({ activeSection: 'home' });
  });

  it('loads read-only content from content.ts', () => {
    const state = usePortfolioStore.getState();
    expect(state.personalInfo).toBeDefined();
    expect(state.personalInfo.name).toBeTruthy();
    expect(Array.isArray(state.recentNews)).toBe(true);
  });

  it('has expected initial UI state', () => {
    expect(usePortfolioStore.getState().activeSection).toBe('home');
  });

  it('updates activeSection via setActiveSection', () => {
    usePortfolioStore.getState().setActiveSection('docs');
    expect(usePortfolioStore.getState().activeSection).toBe('docs');
  });
});
