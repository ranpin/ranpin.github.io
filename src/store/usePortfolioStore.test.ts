import { describe, it, expect, beforeEach, vi } from 'vitest';
import { usePortfolioStore } from './usePortfolioStore';

describe('usePortfolioStore', () => {
  beforeEach(() => {
    window.localStorage.clear();
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

  it('setPresentationMode updates state and persists to localStorage', () => {
    usePortfolioStore.getState().setPresentationMode(false);
    expect(usePortfolioStore.getState().presentationMode).toBe(false);
    expect(window.localStorage.getItem('portfolio.presentationMode')).toBe(
      'full',
    );

    usePortfolioStore.getState().setPresentationMode(true);
    expect(usePortfolioStore.getState().presentationMode).toBe(true);
    expect(window.localStorage.getItem('portfolio.presentationMode')).toBe(
      'present',
    );
  });

  it('initial mode honors ?mode=full URL param', async () => {
    window.history.replaceState(null, '', '/?mode=full');
    vi.resetModules();
    const mod = await import('./usePortfolioStore');
    expect(mod.usePortfolioStore.getState().presentationMode).toBe(false);
  });

  it('initial mode honors a stored full preference', async () => {
    window.localStorage.setItem('portfolio.presentationMode', 'full');
    vi.resetModules();
    const mod = await import('./usePortfolioStore');
    expect(mod.usePortfolioStore.getState().presentationMode).toBe(false);
  });
});
