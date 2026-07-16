import { create } from 'zustand';
import {
  personalInfo as initialPersonalInfo,
  recentNews as initialRecentNews,
  projects as initialProjects,
  publications as initialPublications,
  internships as initialInternships,
  honors as initialHonors,
  academicBlogs as initialAcademicBlogs,
  engineeringBlogs as initialEngineeringBlogs,
} from '../data/content';
import type {
  PersonalInfo,
  NewsItem,
  Project,
  Publication,
  Internship,
  Honor,
  BlogPost,
} from '../types';

// 向后兼容：允许从 store 处继续导入这些类型
export type {
  PersonalInfo,
  NewsItem,
  Project,
  Publication,
  Internship,
  Honor,
  BlogPost,
} from '../types';

// 纯静态站点：数据只读，来自 src/data/content.ts。
// store 只保留导航相关的 UI 状态，不再持久化、不再提供编辑能力。
export interface PortfolioState {
  // 只读数据
  personalInfo: PersonalInfo;
  recentNews: NewsItem[];
  projects: Project[];
  publications: Publication[];
  internships: Internship[];
  honors: Honor[];
  academicBlogs: BlogPost[];
  engineeringBlogs: BlogPost[];

  // 导航 / UI 状态
  activeSection: string;
  learningCategory: string;
  resumeCategory: string;
  resumeTabOrder: string[];
  learningPage: number;
  learningFilter: string;

  // Actions —— 仅 UI 状态
  setActiveSection: (section: string) => void;
  setLearningCategory: (category: string) => void;
  setResumeCategory: (category: string) => void;
  setLearningPage: (page: number) => void;
  setLearningFilter: (filter: string) => void;
}

export const usePortfolioStore = create<PortfolioState>()((set) => ({
  // 只读数据（直接引用 content.ts 导出的常量）
  personalInfo: initialPersonalInfo as PersonalInfo,
  recentNews: initialRecentNews as NewsItem[],
  projects: initialProjects as Project[],
  publications: initialPublications as Publication[],
  internships: initialInternships as Internship[],
  honors: initialHonors as Honor[],
  academicBlogs: initialAcademicBlogs as BlogPost[],
  engineeringBlogs: initialEngineeringBlogs as BlogPost[],

  // 导航 / UI 状态
  activeSection: 'home',
  learningCategory: 'academic',
  resumeCategory: 'projects',
  resumeTabOrder: ['projects', 'publications', 'internships', 'honors'],
  learningPage: 1,
  learningFilter: 'all',

  setActiveSection: (section) => set({ activeSection: section }),
  setLearningCategory: (category) => set({ learningCategory: category }),
  setResumeCategory: (category) => set({ resumeCategory: category }),
  setLearningPage: (page) => set({ learningPage: page }),
  setLearningFilter: (filter) => set({ learningFilter: filter }),
}));
