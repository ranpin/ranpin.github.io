import { create } from 'zustand';
import type { SectionMeta } from '../data/sections';

// 演示可见性配置：控制「演示模式」（访客视角）下哪些**站点板块**可见。
//
// 结构：{ sections: { [sectionId]: boolean } }
// 值的语义：true = 演示模式下展示；false = 演示模式下隐藏。
// 缺少的条目回退到代码默认值（看 SectionMeta.visibility）。
//
// 2026-10-19：原「简历中心 · 项目」逐项可见性已随 openResume 的「作品集」模块
// 一并移除，本配置只剩板块级。老浏览器 localStorage 里可能残留 projects 键，
// 读取时直接忽略、下次写入自然清掉。
//
// 注意：配置只存在于当前浏览器（localStorage），影响的是这台机器上的演示效果；
// 其他设备上的访客看到的仍是代码默认值。
export const VISIBILITY_CONFIG_KEY = 'portfolio.visibilityConfig';

export interface VisibilityConfig {
  sections: Record<string, boolean>;
}

const EMPTY_CONFIG: VisibilityConfig = { sections: {} };

export const loadVisibilityConfig = (): VisibilityConfig => {
  if (typeof window === 'undefined') return EMPTY_CONFIG;
  try {
    const raw = window.localStorage.getItem(VISIBILITY_CONFIG_KEY);
    if (!raw) return EMPTY_CONFIG;
    const parsed = JSON.parse(raw) as Partial<VisibilityConfig>;
    return {
      sections:
        parsed.sections && typeof parsed.sections === 'object'
          ? (parsed.sections as Record<string, boolean>)
          : {},
    };
  } catch {
    return EMPTY_CONFIG;
  }
};

const persist = (cfg: VisibilityConfig) => {
  try {
    window.localStorage.setItem(VISIBILITY_CONFIG_KEY, JSON.stringify(cfg));
  } catch {
    // 持久化失败（隐私模式等）不影响本次切换
  }
};

export interface VisibilityState extends VisibilityConfig {
  setSectionShown: (id: string, shown: boolean) => void;
  resetAll: () => void;
}

export const useVisibilityStore = create<VisibilityState>()((set) => ({
  ...loadVisibilityConfig(),

  setSectionShown: (id, shown) =>
    set((s) => {
      const sections = { ...s.sections, [id]: shown };
      persist({ sections });
      return { sections };
    }),

  resetAll: () =>
    set(() => {
      persist(EMPTY_CONFIG);
      return { sections: {} };
    }),
}));

// 板块在演示模式下是否展示：配置优先，否则回退代码默认（visibility !== 'private'）。
export const isSectionShown = (
  section: SectionMeta,
  sections: Record<string, boolean>,
): boolean => sections[section.id] ?? section.visibility !== 'private';
