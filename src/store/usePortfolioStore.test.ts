import { describe, it, expect, beforeEach } from 'vitest';
import { usePortfolioStore } from './usePortfolioStore';

describe('usePortfolioStore', () => {
  beforeEach(() => {
    usePortfolioStore.setState({
      activeSection: 'home',
      resumeCategory: 'projects',
    });
  });

  it('loads read-only content from content.ts', () => {
    const state = usePortfolioStore.getState();
    expect(state.personalInfo).toBeDefined();
    expect(state.personalInfo.name).toBeTruthy();
    expect(Array.isArray(state.projects)).toBe(true);
    expect(state.projects.length).toBeGreaterThan(0);
    expect(Array.isArray(state.internships)).toBe(true);
  });

  it('has expected initial UI state', () => {
    const state = usePortfolioStore.getState();
    expect(state.activeSection).toBe('home');
    expect(state.resumeCategory).toBe('projects');
  });

  it('updates activeSection via setActiveSection', () => {
    usePortfolioStore.getState().setActiveSection('docs');
    expect(usePortfolioStore.getState().activeSection).toBe('docs');
  });

  it('updates resumeCategory via setResumeCategory', () => {
    usePortfolioStore.getState().setResumeCategory('honors');
    expect(usePortfolioStore.getState().resumeCategory).toBe('honors');
  });
});
