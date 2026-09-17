import { describe, it, expect, beforeEach } from 'vitest';
import {
  VISIBILITY_CONFIG_KEY,
  loadVisibilityConfig,
  useVisibilityStore,
  isSectionShown,
  projectShownByDefault,
} from './useVisibilityStore';
import type { SectionMeta } from '../data/sections';

// 演示可见性配置：读写 localStorage、配置优先于代码默认值。

beforeEach(() => {
  window.localStorage.clear();
  useVisibilityStore.setState({ sections: {}, projects: {} });
});

describe('loadVisibilityConfig', () => {
  it('无配置时返回空结构', () => {
    expect(loadVisibilityConfig()).toEqual({ sections: {}, projects: {} });
  });

  it('解析已存储的合法配置', () => {
    window.localStorage.setItem(
      VISIBILITY_CONFIG_KEY,
      JSON.stringify({ sections: { docs: true }, projects: { '01-a': false } }),
    );
    expect(loadVisibilityConfig()).toEqual({
      sections: { docs: true },
      projects: { '01-a': false },
    });
  });

  it('配置损坏时安全回退为空结构', () => {
    window.localStorage.setItem(VISIBILITY_CONFIG_KEY, '{not-json');
    expect(loadVisibilityConfig()).toEqual({ sections: {}, projects: {} });
  });

  it('结构不完整时补齐缺失字段', () => {
    window.localStorage.setItem(
      VISIBILITY_CONFIG_KEY,
      JSON.stringify({ sections: { home: false } }),
    );
    expect(loadVisibilityConfig()).toEqual({
      sections: { home: false },
      projects: {},
    });
  });
});

describe('useVisibilityStore', () => {
  it('setSectionShown 更新状态并持久化', () => {
    useVisibilityStore.getState().setSectionShown('docs', true);
    expect(useVisibilityStore.getState().sections).toEqual({ docs: true });
    expect(
      JSON.parse(window.localStorage.getItem(VISIBILITY_CONFIG_KEY)!),
    ).toEqual({ sections: { docs: true }, projects: {} });
  });

  it('setProjectShown 更新状态并持久化', () => {
    useVisibilityStore.getState().setProjectShown('01-lantu-sdk', true);
    expect(useVisibilityStore.getState().projects).toEqual({
      '01-lantu-sdk': true,
    });
    expect(
      JSON.parse(window.localStorage.getItem(VISIBILITY_CONFIG_KEY)!),
    ).toEqual({ sections: {}, projects: { '01-lantu-sdk': true } });
  });

  it('resetAll 清空配置与持久化内容', () => {
    useVisibilityStore.getState().setSectionShown('docs', true);
    useVisibilityStore.getState().setProjectShown('x', false);
    useVisibilityStore.getState().resetAll();
    expect(useVisibilityStore.getState().sections).toEqual({});
    expect(useVisibilityStore.getState().projects).toEqual({});
    expect(
      JSON.parse(window.localStorage.getItem(VISIBILITY_CONFIG_KEY)!),
    ).toEqual({ sections: {}, projects: {} });
  });
});

describe('isSectionShown', () => {
  const section = (
    id: string,
    visibility?: SectionMeta['visibility'],
  ): SectionMeta => ({ id, label: id, shortLabel: id, icon: 'home', visibility });

  it('未配置时回退代码默认：public 展示、private 隐藏', () => {
    expect(isSectionShown(section('home'), {})).toBe(true);
    expect(isSectionShown(section('docs', 'private'), {})).toBe(false);
  });

  it('配置优先于代码默认（可强制展示 private / 隐藏 public）', () => {
    expect(isSectionShown(section('docs', 'private'), { docs: true })).toBe(true);
    expect(isSectionShown(section('home'), { home: false })).toBe(false);
  });
});

describe('projectShownByDefault', () => {
  it('仅显式 public 默认展示（fail-closed）', () => {
    expect(projectShownByDefault('public')).toBe(true);
    expect(projectShownByDefault('private')).toBe(false);
    expect(projectShownByDefault(undefined)).toBe(false);
  });
});
