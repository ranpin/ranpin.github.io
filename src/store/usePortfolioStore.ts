import { create } from 'zustand';
import {
  personalInfo as initialPersonalInfo,
  recentNews as initialRecentNews,
} from '../data/content';
import type { PersonalInfo, NewsItem } from '../types';

// 向后兼容：允许从 store 处继续导入这些类型
export type { PersonalInfo, NewsItem } from '../types';

// 演示模式持久化键。值为 'present'（仅公开板块）或 'full'（全部板块）。
const MODE_STORAGE_KEY = 'portfolio.presentationMode';

// 初始演示模式：仅依据 localStorage（由密码框解锁写入），否则回退到「演示模式」
// 这一安全默认——访客首次进入只看到公开板块。
// 注意：不再支持任何 URL 参数解锁，避免留下免密码后门；解锁唯一入口是密码框。
// SSG 预渲染阶段没有 window，直接返回安全默认。
const initialPresentationMode = (): boolean => {
  if (typeof window === 'undefined') return true;
  try {
    if (window.localStorage.getItem(MODE_STORAGE_KEY) === 'full') return false;
  } catch {
    // localStorage 不可用（隐私模式等）时静默回退默认
  }
  return true;
};

// 纯静态聚合站点：数据只读，来自 src/data/content.ts。
// store 只保留导航相关的 UI 状态。项目/简历等已迁移到独立的简历中心(resume)。
export interface PortfolioState {
  personalInfo: PersonalInfo;
  recentNews: NewsItem[];

  activeSection: string;
  setActiveSection: (section: string) => void;

  // true = 演示模式（隐藏 private 板块，访客默认）；false = 完整模式
  presentationMode: boolean;
  setPresentationMode: (mode: boolean) => void;
}

export const usePortfolioStore = create<PortfolioState>()((set) => ({
  personalInfo: initialPersonalInfo as PersonalInfo,
  recentNews: initialRecentNews as NewsItem[],

  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),

  presentationMode: initialPresentationMode(),
  setPresentationMode: (mode) => {
    try {
      window.localStorage.setItem(MODE_STORAGE_KEY, mode ? 'present' : 'full');
    } catch {
      // 持久化失败不影响本次切换
    }
    set({ presentationMode: mode });
  },
}));
