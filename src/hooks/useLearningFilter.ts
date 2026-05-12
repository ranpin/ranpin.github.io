import { useMemo } from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';

/**
 * 学习记录过滤与分页 Hook
 * @param {string} category - 'academic' | 'engineering'
 */
export const useLearningFilter = (category) => {
  const { 
    academicBlogs, 
    engineeringBlogs, 
    learningPage, 
    learningFilter,
    setLearningPage,
    setLearningFilter
  } = usePortfolioStore();

  // 根据类别获取原始数据
  const rawData = category === 'academic' ? academicBlogs : engineeringBlogs;

  // 过滤逻辑
  const filteredData = useMemo(() => {
    if (learningFilter === 'all') return rawData;
    return rawData.filter(item => item.tags?.includes(learningFilter));
  }, [rawData, learningFilter]);

  // 分页逻辑（每页 6 条）
  const ITEMS_PER_PAGE = 6;
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (learningPage - 1) * ITEMS_PER_PAGE,
    learningPage * ITEMS_PER_PAGE
  );

  // 获取所有可用的标签用于过滤器
  const availableTags = useMemo(() => {
    const tags = new Set();
    rawData.forEach(item => item.tags?.forEach(tag => tags.add(tag)));
    return ['all', ...Array.from(tags)];
  }, [rawData]);

  return {
    data: paginatedData,
    total: filteredData.length,
    currentPage: learningPage,
    totalPages,
    currentFilter: learningFilter,
    availableTags,
    setPage: setLearningPage,
    setFilter: setLearningFilter
  };
};
