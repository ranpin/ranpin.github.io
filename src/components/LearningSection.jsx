import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { useLearningFilter } from '../hooks/useLearningFilter';
import EditableCard from './EditableCard';

const LearningSection = React.memo(({ 
  isAdminMode, 
  openInlineEditor, 
  handleDeleteWithUndo, 
  handleInsertAt, 
  handleBlogClick 
}) => {
  const { learningCategory, setLearningCategory } = usePortfolioStore();
  const academicFilter = useLearningFilter('academic');
  const engineeringFilter = useLearningFilter('engineering');

  const renderBlogList = (filter, category) => {
    const isAcademic = category === 'academic';
    const borderColor = isAcademic ? 'border-purple-500' : 'border-orange-500';
    const hoverColor = isAcademic ? 'hover:text-purple-600' : 'hover:text-orange-600';
    const iconColor = isAcademic ? 'text-purple-500' : 'text-orange-500';
    const tagBg = isAcademic ? 'bg-purple-100 text-purple-700' : 'bg-orange-100 text-orange-700';
    const emptyIcon = isAcademic ? 'fa-graduation-cap' : 'fa-cogs';
    const emptyText = isAcademic ? '暂无学术研究记录' : '暂无工程技术记录';

    return (
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filter.data.map((blog, index) => (
            <motion.div
              key={blog.id || index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              layout
            >
              <EditableCard
                isAdminMode={isAdminMode}
                onEdit={() => openInlineEditor(`blog-${category}`, blog, index)}
                onDelete={() => handleDeleteWithUndo(`blog-${category}`, index)}
                onInsertBefore={() => handleInsertAt(`blog-${category}`, index)}
                onInsertAfter={() => handleInsertAt(`blog-${category}`, index + 1)}
                className={`border-l-4 ${borderColor} pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer`}
              >
                <div onClick={() => handleBlogClick(blog)}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-1">
                        <h3 className={`text-lg font-medium text-gray-800 ${hoverColor} transition-colors`}>
                          {blog.title || '未命名博客'}
                        </h3>
                        {blog.category && (
                          <span className={`px-2 py-1 ${tagBg} rounded text-xs font-medium`}>
                            {blog.category}
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 mb-2 font-mono">
                        {blog.date || '日期未知'}
                        {blog.readTime && <span> • 阅读时间 {blog.readTime}</span>}
                      </div>
                    </div>
                    <i className={`fas fa-chevron-right text-gray-300 ${iconColor.replace('text-', 'hover:text-')} transition-colors text-sm`}></i>
                  </div>
                  
                  <p className="text-gray-600 text-sm leading-relaxed mb-3">
                    {blog.summary || '暂无摘要'}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {blog.tags && Array.isArray(blog.tags) ? (
                      blog.tags.map((tag, tagIndex) => (
                        <span 
                          key={`${tag}-${tagIndex}`}
                          className={`px-2 py-1 ${tagBg} rounded text-xs font-medium`}
                        >
                          {tag}
                        </span>
                      ))
                    ) : (
                      <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                        暂无标签
                      </span>
                    )}
                  </div>
                </div>
              </EditableCard>
            </motion.div>
          ))}
        </AnimatePresence>
        {filter.data.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12 text-gray-500"
          >
            <i className={`fas ${emptyIcon} text-4xl mb-4`}></i>
            <p>{emptyText}</p>
            {isAdminMode && (
              <p className="text-sm mt-2">点击任意位置插入点添加{isAcademic ? '学术' : '工程'}博客</p>
            )}
          </motion.div>
        )}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {/* 学习记录分类按钮 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 sm:gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLearningCategory('academic')}
            className={`px-5 sm:px-7 py-3 sm:py-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
              learningCategory === 'academic'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
            }`}
          >
            <i className="fas fa-graduation-cap mr-2"></i>
            学术研究
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setLearningCategory('engineering')}
            className={`px-5 sm:px-7 py-3 sm:py-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
              learningCategory === 'engineering'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
            }`}
          >
            <i className="fas fa-cogs mr-2"></i>
            工程技术
          </motion.button>
        </div>
      </div>

      {/* 学术研究记录 */}
      {learningCategory === 'academic' && renderBlogList(academicFilter, 'academic')}

      {/* 工程技术记录 */}
      {learningCategory === 'engineering' && renderBlogList(engineeringFilter, 'engineering')}
    </motion.div>
  );
};

export default React.memo(LearningSection);
