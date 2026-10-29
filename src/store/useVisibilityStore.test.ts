import { describe, it, expect, beforeEach } from 'vitest';
import {
  VISIBILITY_CONFIG_KEY,
  loadVisibilityConfig,
  useVisibilityStore,
  isSectionShown,
} from './useVisibilityStore';
import type { SectionMeta } from '../data/sections';

// 演示可见性配置：读写 localStorage、配置优先于代码默认值。
// 2026-10-19：项目级可见性已随 openResume「作品集」模块移除，只剩板块级。

beforeEach(() => {
  window.localStorage.clear();
  useVisibilityStore.setState({ sections: {} });
});

describe('loadVisibilityConfig', () => {
  it('无配置时返回空结构', () => {
    expect(loadVisibilityConfig()).toEqual({ sections: {} });
  });

  it('解析已存储的合法配置', () => {
    window.localStorage.setItem(
      VISIBILITY_CONFIG_KEY,
      JSON.stringify({ sections: { stargate: true } }),
    );
    expect(loadVisibilityConfig()).toEqual({ sections: { stargate: true } });
  });

  it('忽略旧版残留的 projects 键（作品集已移除）', () => {
    window.localStorage.setItem(
      VISIBILITY_CONFIG_KEY,
      JSON.stringify({
        sections: { stargate: true },
        projects: { '01-a': false },
      }),
    );
    expect(loadVisibilityConfig()).toEqual({ sections: { stargate: true } });
  });

  it('配置损坏时安全回退为空结构', () => {
    window.localStorage.setItem(VISIBILITY_CONFIG_KEY, '{not-json');
    expect(loadVisibilityConfig()).toEqual({ sections: {} });
  });

  it('结构不完整时补齐缺失字段', () => {
    window.localStorage.setItem(VISIBILITY_CONFIG_KEY, JSON.stringify({}));
    expect(loadVisibilityConfig()).toEqual({ sections: {} });
  });
});

describe('useVisibilityStore', () => {
  it('setSectionShown 更新状态并持久化', () => {
    useVisibilityStore.getState().setSectionShown('stargate', true);
    expect(useVisibilityStore.getState().sections).toEqual({ stargate: true });
    expect(
      JSON.parse(window.localStorage.getItem(VISIBILITY_CONFIG_KEY)!),
    ).toEqual({ sections: { stargate: true } });
  });

  it('resetAll 清空配置与持久化内容', () => {
    useVisibilityStore.getState().setSectionShown('stargate', true);
    useVisibilityStore.getState().resetAll();
    expect(useVisibilityStore.getState().sections).toEqual({});
    expect(
      JSON.parse(window.localStorage.getItem(VISIBILITY_CONFIG_KEY)!),
    ).toEqual({ sections: {} });
  });
});

describe('isSectionShown', () => {
  const section = (
    id: string,
    visibility?: SectionMeta['visibility'],
  ): SectionMeta => ({
    id,
    label: id,
    shortLabel: id,
    icon: 'home',
    visibility,
  });

  it('未配置时回退代码默认：public 展示、private 隐藏', () => {
    expect(isSectionShown(section('home'), {})).toBe(true);
    expect(isSectionShown(section('stargate', 'private'), {})).toBe(false);
  });

  it('配置优先于代码默认（可强制展示 private / 隐藏 public）', () => {
    expect(
      isSectionShown(section('stargate', 'private'), { stargate: true }),
    ).toBe(true);
    expect(isSectionShown(section('home'), { home: false })).toBe(false);
  });
});
