import { describe, it, expect, beforeEach } from 'vitest';
import { usePortfolioStore } from './usePortfolioStore';

describe('usePortfolioStore', () => {
  beforeEach(() => {
    usePortfolioStore.setState({
      activeSection: 'home',
      learningCategory: 'academic',
      resumeCategory: 'projects',
    });
  });

  it('loads read-only content from content.ts', () => {
    const state = usePortfolioStore.getState();
    expect(state.personalInfo).toBeDefined();
    expect(state.personalInfo.name).toBeTruthy();
    expect(Array.isArray(state.projects)).toBe(true);
    expect(state.projects.length).toBeGreaterThan(0);
    expect(Array.isArray(state.academicBlogs)).toBe(true);
  });

  it('has expected initial UI state', () => {
    const state = usePortfolioStore.getState();
    expect(state.activeSection).toBe('home');
    expect(state.learningCategory).toBe('academic');
    expect(state.resumeCategory).toBe('projects');
  });

  it('updates activeSection via setActiveSection', () => {
    usePortfolioStore.getState().setActiveSection('learning');
    expect(usePortfolioStore.getState().activeSection).toBe('learning');
  });

  it('updates resumeCategory via setResumeCategory', () => {
    usePortfolioStore.getState().setResumeCategory('honors');
    expect(usePortfolioStore.getState().resumeCategory).toBe('honors');
  });

  it('updates learningCategory via setLearningCategory', () => {
    usePortfolioStore.getState().setLearningCategory('engineering');
    expect(usePortfolioStore.getState().learningCategory).toBe('engineering');
  });
});
