import { Props } from '../types';
import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import EditableCard from './EditableCard';

interface LearningSectionFullProps {
  learningCategory: string;
  setLearningCategory: (category: string) => void;
  isAdminMode: boolean;
  openInlineEditor: (type: string, data: any, index: number | null) => void;
  handleDeleteWithUndo: (type: string, index: number) => void;
  handleInsertAt: (type: string, index: number) => void;
  handleBlogClick: (blog: any) => void;
}

const LearningSectionFull: React.FC<LearningSectionFullProps> = ({
  learningCategory,
  setLearningCategory,
  isAdminMode,
  openInlineEditor,
  handleDeleteWithUndo,
  handleInsertAt,
  handleBlogClick,
}) => {
  const { academicBlogs, engineeringBlogs } = usePortfolioStore();

  return (
    <div>
      {/* 学习记录分类按钮 */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3 sm:gap-6">
          <button
            onClick={() => setLearningCategory('academic')}
            className={`px-5 sm:px-7 py-3 sm:py-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
              learningCategory === 'academic'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
            }`}
          >
            <i className="fas fa-graduation-cap mr-2"></i>
            学术研究
          </button>
          <button
            onClick={() => setLearningCategory('engineering')}
            className={`px-5 sm:px-7 py-3 sm:py-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base ${
              learningCategory === 'engineering'
                ? 'bg-blue-600 text-white shadow-lg transform scale-105'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'
            }`}
          >
            <i className="fas fa-cogs mr-2"></i>
            工程技术
          </button>
        </div>
      </div>

      {/* 学术研究记录 */}
      {learningCategory === 'academic' && (
        <div className="space-y-4">
          {academicBlogs.map((blog, index) => (
            <EditableCard
              key={blog.id || index}
              isAdminMode={isAdminMode}
              onEdit={() => openInlineEditor('blog-academic', blog, index)}
              onDelete={() => handleDeleteWithUndo('blog-academic', index)}
              onInsertBefore={() => handleInsertAt('blog-academic', index)}
              onInsertAfter={() => handleInsertAt('blog-academic', index + 1)}
              className="border-l-4 border-purple-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div onClick={() => handleBlogClick(blog)}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors">
                        {blog.title || '未命名博客'}
                      </h3>
                      {blog.category && (
                        <span className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium">
                          {blog.category}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mb-2 font-mono">
                      {blog.date || '日期未知'}
                      {blog.readTime && <span> • 阅读时间 {blog.readTime}</span>}
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-gray-300 hover:text-purple-500 transition-colors text-sm"></i>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {blog.summary || '暂无摘要'}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {blog.tags && Array.isArray(blog.tags) ? (
                    blog.tags.map((tag, tagIndex) => (
                      <span 
                        key={`${tag}-${tagIndex}`}
                        className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
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
          ))}
          {academicBlogs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <i className="fas fa-graduation-cap text-4xl mb-4"></i>
              <p>暂无学术研究记录</p>
              {isAdminMode && (
                <p className="text-sm mt-2">点击任意位置插入点添加新记录</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* 工程技术记录 */}
      {learningCategory === 'engineering' && (
        <div className="space-y-4">
          {engineeringBlogs.map((blog, index) => (
            <EditableCard
              key={blog.id || index}
              isAdminMode={isAdminMode}
              onEdit={() => openInlineEditor('blog-engineering', blog, index)}
              onDelete={() => handleDeleteWithUndo('blog-engineering', index)}
              onInsertBefore={() => handleInsertAt('blog-engineering', index)}
              onInsertAfter={() => handleInsertAt('blog-engineering', index + 1)}
              className="border-l-4 border-green-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
            >
              <div onClick={() => handleBlogClick(blog)}>
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-1">
                      <h3 className="text-lg font-medium text-gray-800 hover:text-green-600 transition-colors">
                        {blog.title || '未命名博客'}
                      </h3>
                      {blog.category && (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium">
                          {blog.category}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 mb-2 font-mono">
                      {blog.date || '日期未知'}
                      {blog.readTime && <span> • 阅读时间 {blog.readTime}</span>}
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-gray-300 hover:text-green-500 transition-colors text-sm"></i>
                </div>
                
                <p className="text-gray-600 text-sm leading-relaxed mb-3">
                  {blog.summary || '暂无摘要'}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {blog.tags && Array.isArray(blog.tags) ? (
                    blog.tags.map((tag, tagIndex) => (
                      <span 
                        key={`${tag}-${tagIndex}`}
                        className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-medium"
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
          ))}
          {engineeringBlogs.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <i className="fas fa-cogs text-4xl mb-4"></i>
              <p>暂无工程技术记录</p>
              {isAdminMode && (
                <p className="text-sm mt-2">点击任意位置插入点添加新记录</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LearningSectionFull;