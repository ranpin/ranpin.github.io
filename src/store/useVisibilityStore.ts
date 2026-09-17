import { create } from 'zustand';
import type { SectionMeta } from '../data/sections';

// 演示可见性配置 —— 与简历中心（同源 iframe）共享的契约：
// 两侧读写同一个 localStorage 键、同一结构，因此在主站配置面板里改一处，
// 主站板块与简历中心项目两处同时生效。
//
// 结构：{ sections: { [sectionId]: boolean }, projects: { [projectId]: boolean } }
// 值的语义：true = 演示模式下展示；false = 演示模式下隐藏。
// 缺少的条目回退到各自代码里的默认值（板块看 visibility，项目默认隐藏）。
//
// 注意：配置只存在于当前浏览器（localStorage），影响的是这台机器上的演示效果；
// 其他设备上的访客看到的仍是代码默认值。
export const VISIBILITY_CONFIG_KEY = 'portfolio.visibilityConfig';

export interface VisibilityConfig {
  sections: Record<string, boolean>;
  projects: Record<string, boolean>;
}

const EMPTY_CONFIG: VisibilityConfig = { sections: {}, projects: {} };

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
      projects:
        parsed.projects && typeof parsed.projects === 'object'
          ? (parsed.projects as Record<string, boolean>)
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
  setProjectShown: (id: string, shown: boolean) => void;
  resetAll: () => void;
}

export const useVisibilityStore = create<VisibilityState>()((set) => ({
  ...loadVisibilityConfig(),

  setSectionShown: (id, shown) =>
    set((s) => {
      const sections = { ...s.sections, [id]: shown };
      persist({ sections, projects: s.projects });
      return { sections };
    }),

  setProjectShown: (id, shown) =>
    set((s) => {
      const projects = { ...s.projects, [id]: shown };
      persist({ sections: s.sections, projects });
      return { projects };
    }),

  resetAll: () =>
    set(() => {
      persist(EMPTY_CONFIG);
      return { sections: {}, projects: {} };
    }),
}));

// 板块在演示模式下是否展示：配置优先，否则回退代码默认（visibility !== 'private'）。
export const isSectionShown = (
  section: SectionMeta,
  sections: Record<string, boolean>,
): boolean => sections[section.id] ?? section.visibility !== 'private';

// 项目默认值（未配置时）：与简历中心代码默认一致（仅 visibility === 'public' 展示）。
export const projectShownByDefault = (visibility?: string): boolean =>
  visibility === 'public';
