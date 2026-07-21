import { create } from 'zustand';
import {
  personalInfo as initialPersonalInfo,
  recentNews as initialRecentNews,
} from '../data/content';
import type { PersonalInfo, NewsItem } from '../types';

// 向后兼容：允许从 store 处继续导入这些类型
export type { PersonalInfo, NewsItem } from '../types';

// 纯静态聚合站点：数据只读，来自 src/data/content.ts。
// store 只保留导航相关的 UI 状态。项目/简历等已迁移到独立的简历中心(ranpin/resume)。
export interface PortfolioState {
  personalInfo: PersonalInfo;
  recentNews: NewsItem[];

  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const usePortfolioStore = create<PortfolioState>()((set) => ({
  personalInfo: initialPersonalInfo as PersonalInfo,
  recentNews: initialRecentNews as NewsItem[],

  activeSection: 'home',
  setActiveSection: (section) => set({ activeSection: section }),
}));
