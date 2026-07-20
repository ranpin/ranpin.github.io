import { describe, it, expect, beforeEach } from 'vitest';
import { useResumeStore } from './useResumeStore';
import type { ResumeData } from '../types/resume';

const sample: ResumeData = {
  id: 'x',
  label: '测试简历',
  basics: { name: 'Ranpin' },
};

describe('useResumeStore', () => {
  beforeEach(() => {
    useResumeStore.setState({ drafts: {}, activeId: null, hydrated: false });
  });

  it('has empty initial state', () => {
    const s = useResumeStore.getState();
    expect(s.drafts).toEqual({});
    expect(s.activeId).toBeNull();
    expect(s.hydrated).toBe(false);
  });

  it('sets and resets a draft', () => {
    useResumeStore.getState().setDraft('x', sample);
    expect(useResumeStore.getState().drafts.x.label).toBe('测试简历');
    useResumeStore.getState().resetDraft('x');
    expect(useResumeStore.getState().drafts.x).toBeUndefined();
  });

  it('tracks the active resume id', () => {
    useResumeStore.getState().setActiveId('x');
    expect(useResumeStore.getState().activeId).toBe('x');
  });
});
