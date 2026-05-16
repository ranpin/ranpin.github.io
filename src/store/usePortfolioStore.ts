import { create } from 'zustand';
import { persist } from 'zustand/middleware';
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

// --- 类型定义 (与 src/types/index.ts 保持一致) ---

export interface PersonalInfo {
  name: string;
  title: string;
  location: string;
  email: string;
  avatar: string;
  bio: { main: string; detail: string };
  researchInterests: string[];
  socialLinks: Record<string, string>;
  contact?: {
    email: string;
    phone: string;
    github: string;
    linkedin: string;
  };
}

export interface NewsItem {
  date: string;
  content: string;
}

export interface Project {
  id: number | string;
  title: string;
  period?: string;
  duration?: string;
  description: string;
  tags: string[];
  status?: string;
  github?: string;
  demo?: string;
  businessContext?: string;
  yourRole?: string;
  architectureDetail?: string;
  technicalChallenges?: string[];
  results?: string[];
  achievements?: string[];
  interviewHighlights?: string[];
  discussionTopics?: string[];
  demoImage?: string;
  architectureImage?: string;
  demoVideo?: string;
  resultChart?: string;
  githubUrl?: string;
  liveUrl?: string;
}

export interface Publication {
  id: number | string;
  title: string;
  authors: string;
  venue: string;
  year: string | number;
  link?: string;
  pdf?: string;
  abstract?: string;
  pdfUrl?: string;
}

export interface Internship {
  id: number | string;
  company: string;
  role: string;
  period?: string;
  duration?: string;
  description: string;
  contributions: string[];
  skills: string[];
}

export interface Honor {
  id: number | string;
  title: string;
  issuer: string;
  date: string;
  description?: string;
}

export interface BlogPost {
  id: number | string;
  title: string;
  date?: string;
  summary?: string;
  content?: string;
  category?: 'academic' | 'engineering';
  tags?: string[];
  createdAt?: string;
  updatedAt?: string;
  link?: string;
}

export type CollectionKey =
  | 'projects'
  | 'publications'
  | 'internships'
  | 'honors'
  | 'academicBlogs'
  | 'engineeringBlogs';

export interface InlineEditState {
  isVisible: boolean;
  type: string | null;
  data:
    | PersonalInfo
    | Project
    | Publication
    | Internship
    | Honor
    | BlogPost
    | NewsItem
    | null;
  index: number | null;
}

export interface InsertMenuState {
  isVisible: boolean;
  index: number | null;
  sectionType: CollectionKey | 'recentNews' | null;
}

export interface PortfolioState {
  // 数据状态
  personalInfo: PersonalInfo;
  recentNews: NewsItem[];
  projects: Project[];
  publications: Publication[];
  internships: Internship[];
  honors: Honor[];
  academicBlogs: BlogPost[];
  engineeringBlogs: BlogPost[];

  // UI 状态
  activeSection: string;
  learningCategory: string;
  resumeCategory: string;
  resumeTabOrder: string[];
  customTabNames: Record<string, string>;
  learningPage: number;
  learningFilter: string;
  isAdminMode: boolean;
  customContent: (Project | Publication | Internship | Honor | BlogPost)[];

  // Inline 编辑状态
  inlineEditState: InlineEditState;

  // 积木选择器状态
  insertMenuState: InsertMenuState;

  // 删除撤回状态
  deletedItems: any[];
  showUndoToast: boolean;
  undoTimer: NodeJS.Timeout | null;

  // Actions - 数据更新
  setPersonalInfo: (data: PersonalInfo) => void;
  setRecentNews: (data: NewsItem[]) => void;
  setProjects: (data: Project[]) => void;
  setPublications: (data: Publication[]) => void;
  setInternships: (data: Internship[]) => void;
  setHonors: (data: Honor[]) => void;
  setAcademicBlogs: (data: BlogPost[]) => void;
  setEngineeringBlogs: (data: BlogPost[]) => void;

  // Actions - UI 状态更新
  setActiveSection: (section: string) => void;
  setLearningCategory: (category: string) => void;
  setResumeCategory: (category: string) => void;
  setResumeTabOrder: (order: string[]) => void;
  setCustomTabNames: (names: Record<string, string>) => void;
  setLearningPage: (page: number) => void;
  setLearningFilter: (filter: string) => void;

  // Actions - 管理员模式
  setIsAdminMode: (mode: boolean) => void;

  // Actions - 自定义内容
  setCustomContent: (
    content: (Project | Publication | Internship | Honor | BlogPost)[],
  ) => void;

  // Actions - Inline 编辑
  openInlineEditor: (
    type: string,
    data:
      | PersonalInfo
      | Project
      | Publication
      | Internship
      | Honor
      | BlogPost
      | NewsItem
      | null,
    index: number | null,
  ) => void;
  closeInlineEditor: () => void;

  // Actions - 积木选择器
  openInsertMenu: (index: number | null, sectionType: string | null) => void;
  closeInsertMenu: () => void;

  // Actions - 删除撤回
  addDeletedItem: (item: any) => void;
  clearDeletedItems: () => void;
  hideUndoToast: () => void;
  setUndoTimer: (timer: NodeJS.Timeout | null) => void;

  // Actions - Tab 管理
  addNewTab: () => void;
  deleteTab: (key: string) => void;

  // Actions - 通用 CRUD
  updateItem: (
    collection: CollectionKey,
    id: number | string,
    data: Partial<Project | Publication | Internship | Honor | BlogPost>,
  ) => void;
  deleteItem: (collection: CollectionKey, id: number | string) => void;
  addItem: (
    collection: CollectionKey,
    newItem: Omit<
      Project | Publication | Internship | Honor | BlogPost,
      'id'
    > & { id?: number | string },
  ) => void;

  // Actions - 批量更新
  updateItemAt: (
    collection: CollectionKey,
    index: number,
    data: Partial<
      Project | Publication | Internship | Honor | BlogPost | NewsItem
    >,
  ) => void;
  deleteItemAt: (collection: CollectionKey, index: number) => void;
  addItemAt: (
    collection: CollectionKey,
    index: number,
    newItem: Omit<
      Project | Publication | Internship | Honor | BlogPost | NewsItem,
      'id'
    > & { id?: number | string },
  ) => void;
}

// 数据清洗函数（从 App.jsx 迁移）
const sanitizeData = <T extends Project[] | Internship[] | PersonalInfo>(
  data: T,
  type: 'project' | 'internship' | 'personalInfo',
): T => {
  if (!data) return data;

  if (type === 'project') {
    return (data as Project[]).map((p) => ({
      ...p,
      tags: p.tags || [],
      businessContext: p.businessContext || '',
      yourRole: p.yourRole || '',
      architectureDetail: p.architectureDetail || '',
      technicalChallenges: p.technicalChallenges || [],
      results: p.results || [],
      achievements: p.achievements || [],
      interviewHighlights: p.interviewHighlights || [],
      discussionTopics: p.discussionTopics || [],
      demoImage: p.demoImage || '',
      architectureImage: p.architectureImage || '',
      demoVideo: p.demoVideo || '',
      resultChart: p.resultChart || '',
      githubUrl: p.githubUrl || '',
      liveUrl: p.liveUrl || '',
    })) as unknown as T;
  }

  if (type === 'internship') {
    return (data as Internship[]).map((i) => ({
      ...i,
      contributions: i.contributions || [],
      skills: i.skills || [],
    })) as unknown as T;
  }

  if (type === 'personalInfo') {
    const info = data as PersonalInfo;
    return {
      ...info,
      bio: {
        main: info.bio?.main || '',
        detail: info.bio?.detail || '',
      },
    } as unknown as T;
  }

  return data;
};

// 创建持久化 store
export const usePortfolioStore = create<PortfolioState>()(
  persist(
    (set, _get) => ({
      // 数据状态
      personalInfo: sanitizeData(initialPersonalInfo, 'personalInfo'),
      recentNews: initialRecentNews,
      projects: sanitizeData(initialProjects, 'project'),
      publications: initialPublications,
      internships: sanitizeData(initialInternships, 'internship'),
      honors: initialHonors,
      academicBlogs: initialAcademicBlogs,
      engineeringBlogs: initialEngineeringBlogs,

      // UI 状态（不持久化）
      activeSection: 'home',
      learningCategory: 'academic',
      resumeCategory: 'projects',
      resumeTabOrder: ['projects', 'publications', 'internships', 'honors'],
      customTabNames: {},
      learningPage: 1,
      learningFilter: 'all',

      // 管理员模式（持久化）
      isAdminMode: false,

      // 星际之门自定义内容（持久化）
      customContent: [],

      // Inline 编辑状态
      inlineEditState: {
        isVisible: false,
        type: null,
        data: null,
        index: null,
      },

      // 积木选择器状态
      insertMenuState: {
        isVisible: false,
        index: null,
        sectionType: null,
      },

      // 删除撤回状态
      deletedItems: [],
      showUndoToast: false,
      undoTimer: null,

      // Actions - 数据更新
      setPersonalInfo: (data) =>
        set({ personalInfo: sanitizeData(data, 'personalInfo') }),
      setRecentNews: (data) => set({ recentNews: data }),
      setProjects: (data) => set({ projects: sanitizeData(data, 'project') }),
      setPublications: (data) => set({ publications: data }),
      setInternships: (data) =>
        set({ internships: sanitizeData(data, 'internship') }),
      setHonors: (data) => set({ honors: data }),
      setAcademicBlogs: (data) => set({ academicBlogs: data }),
      setEngineeringBlogs: (data) => set({ engineeringBlogs: data }),

      // Actions - UI 状态更新
      setActiveSection: (section) => set({ activeSection: section }),
      setLearningCategory: (category) => set({ learningCategory: category }),
      setResumeCategory: (category) => set({ resumeCategory: category }),
      setResumeTabOrder: (order) => set({ resumeTabOrder: order }),
      setCustomTabNames: (names) => set({ customTabNames: names }),
      setLearningPage: (page) => set({ learningPage: page }),
      setLearningFilter: (filter) => set({ learningFilter: filter }),

      // Actions - 管理员模式
      setIsAdminMode: (mode) => set({ isAdminMode: mode }),

      // Actions - 自定义内容（星际之门）
      setCustomContent: (content) => set({ customContent: content }),

      // Actions - Inline 编辑
      openInlineEditor: (type, data, index) =>
        set({
          inlineEditState: { isVisible: true, type, data, index },
        }),
      closeInlineEditor: () =>
        set((state) => ({
          inlineEditState: { ...state.inlineEditState, isVisible: false },
        })),

      // Actions - 积木选择器
      openInsertMenu: (index, sectionType) =>
        set({
          insertMenuState: { isVisible: true, index, sectionType },
        }),
      closeInsertMenu: () =>
        set((state) => ({
          insertMenuState: { ...state.insertMenuState, isVisible: false },
        })),

      // Actions - 删除撤回
      addDeletedItem: (item) =>
        set((state) => ({
          deletedItems: [...state.deletedItems, item],
          showUndoToast: true,
        })),
      clearDeletedItems: () => set({ deletedItems: [], showUndoToast: false }),
      hideUndoToast: () => set({ showUndoToast: false }),
      setUndoTimer: (timer) => set({ undoTimer: timer }),

      // Actions - Tab 管理
      addNewTab: () =>
        set((state) => {
          const newKey = `custom_${Date.now()}`;
          return {
            resumeTabOrder: [...state.resumeTabOrder, newKey],
            customTabNames: { ...state.customTabNames, [newKey]: '新分类' },
            resumeCategory: newKey,
          };
        }),
      deleteTab: (key) =>
        set((state) => {
          const newOrder = state.resumeTabOrder.filter((k) => k !== key);
          const newCategory =
            state.resumeCategory === key && newOrder.length > 0
              ? newOrder[0]
              : state.resumeCategory;
          return {
            resumeTabOrder: newOrder,
            resumeCategory: newCategory,
          };
        }),

      // Actions - 通用 CRUD 操作
      updateItem: (collection, id, data) =>
        set((state) => {
          const items = state[collection];
          if (!Array.isArray(items)) return {};
          return {
            [collection]: items.map((item) =>
              item.id === id ? { ...item, ...data } : item,
            ),
          };
        }),

      deleteItem: (collection, id) =>
        set((state) => {
          const items = state[collection];
          if (!Array.isArray(items)) return {};
          return {
            [collection]: items.filter((item) => item.id !== id),
          };
        }),

      addItem: (collection, newItem) =>
        set((state) => {
          const items = state[collection];
          if (!Array.isArray(items)) return {};
          return {
            [collection]: [{ ...newItem, id: Date.now() }, ...items],
          };
        }),

      // Actions - 批量更新（用于 news 等简单数组）
      updateItemAt: (collection, index, data) =>
        set((state) => {
          const items = state[collection];
          if (!Array.isArray(items) || index < 0 || index >= items.length)
            return {};
          const newItems = [...items];
          newItems[index] = { ...newItems[index], ...data };
          return { [collection]: newItems };
        }),

      deleteItemAt: (collection, index) =>
        set((state) => {
          const items = state[collection];
          if (!Array.isArray(items) || index < 0 || index >= items.length)
            return {};
          const newItems = items.filter((_, i) => i !== index);
          return { [collection]: newItems };
        }),

      addItemAt: (collection, index, newItem) =>
        set((state) => {
          const items = state[collection];
          if (!Array.isArray(items)) return {};
          const newItems = [...items];
          newItems.splice(index, 0, { ...newItem, id: Date.now() });
          return { [collection]: newItems };
        }),
    }),
    {
      name: 'portfolio-storage', // localStorage key
      partialize: (state) => ({
        // 只持久化数据状态，不持久化 UI 状态
        personalInfo: state.personalInfo,
        recentNews: state.recentNews,
        projects: state.projects,
        publications: state.publications,
        internships: state.internships,
        honors: state.honors,
        academicBlogs: state.academicBlogs,
        engineeringBlogs: state.engineeringBlogs,
        resumeTabOrder: state.resumeTabOrder,
        customTabNames: state.customTabNames,
        isAdminMode: state.isAdminMode,
        customContent: state.customContent,
      }),
      // 迁移旧数据格式（如果需要）
      migrate: (persistedState, _version) => {
        // 未来可以在这里添加版本迁移逻辑
        return persistedState;
      },
    },
  ),
);
