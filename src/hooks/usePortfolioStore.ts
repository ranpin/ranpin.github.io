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

// 数据清洗函数（从 App.jsx 迁移）
const sanitizeData = (data, type) => {
  if (!data) return data;

  if (type === 'project') {
    return Array.isArray(data)
      ? data.map((p) => ({
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
        }))
      : data;
  }

  if (type === 'internship') {
    return Array.isArray(data)
      ? data.map((i) => ({
          ...i,
          contributions: i.contributions || [],
          skills: i.skills || [],
        }))
      : data;
  }

  if (type === 'personalInfo') {
    return {
      ...data,
      bio: {
        main: data.bio?.main || '',
        detail: data.bio?.detail || '',
      },
    };
  }

  return data;
};

// 创建持久化 store
export const usePortfolioStore = create(
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
