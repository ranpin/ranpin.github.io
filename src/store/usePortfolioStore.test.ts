import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePortfolioStore } from './usePortfolioStore';

describe('usePortfolioStore', () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.history.replaceState(null, '', '/');
    usePortfolioStore.setState({ activeSection: 'home', presentationMode: true });
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

  it('defaults to presentation mode (public-only) for first-time visitors', () => {
    expect(usePortfolioStore.getState().presentationMode).toBe(true);
  });

  it('setPresentationMode updates state and persists to sessionStorage', () => {
    usePortfolioStore.getState().setPresentationMode(false);
    expect(usePortfolioStore.getState().presentationMode).toBe(false);
    expect(window.sessionStorage.getItem('portfolio.presentationMode')).toBe(
      'full',
    );

    usePortfolioStore.getState().setPresentationMode(true);
    expect(usePortfolioStore.getState().presentationMode).toBe(true);
    expect(window.sessionStorage.getItem('portfolio.presentationMode')).toBe(
      'present',
    );
  });

  it('initial mode honors a stored full preference', async () => {
    window.sessionStorage.setItem('portfolio.presentationMode', 'full');
    vi.resetModules();
    const mod = await import('./usePortfolioStore');
    expect(mod.usePortfolioStore.getState().presentationMode).toBe(false);
  });

  it('URL 参数不能解锁（无免密码后门）', async () => {
    // 即便带上 ?mode=full，未经密码框解锁仍保持演示模式
    window.history.replaceState(null, '', '/?mode=full');
    vi.resetModules();
    const mod = await import('./usePortfolioStore');
    expect(mod.usePortfolioStore.getState().presentationMode).toBe(true);
  });
});
