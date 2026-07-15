import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import Icon from './Icon';
import type { BlogPost } from '../types';

interface LearningSectionFullProps {
  learningCategory: string;
  setLearningCategory: (category: string) => void;
  onBlogClick: (blog: BlogPost) => void;
}

const BlogCard: React.FC<{
  blog: BlogPost;
  accent: string;
  onClick: () => void;
}> = ({ blog, accent, onClick }) => (
  <div
    onClick={onClick}
    className={`border-l-4 ${accent} pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer rounded-r-lg`}
  >
    <div className="flex items-start justify-between mb-2">
      <div className="flex-1">
        <div className="flex items-center space-x-3 mb-1">
          <h3 className="text-lg font-medium text-gray-800">{blog.title}</h3>
          {blog.category && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs font-medium">
              {blog.category}
            </span>
          )}
        </div>
        <div className="text-sm text-gray-500 mb-2 font-mono">
          {blog.date || '日期未知'}
          {blog.readTime && <span> • 阅读时间 {blog.readTime}</span>}
        </div>
      </div>
      <Icon name="chevron-right" className="text-gray-300 text-sm mt-1" />
    </div>
    <p className="text-gray-600 text-sm leading-relaxed mb-3">
      {blog.summary || '暂无摘要'}
    </p>
    <div className="flex flex-wrap gap-2">
      {(blog.tags || []).map((tag, i) => (
        <span
          key={`${tag}-${i}`}
          className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium"
        >
          {tag}
        </span>
      ))}
    </div>
  </div>
);

const LearningSectionFull: React.FC<LearningSectionFullProps> = ({
  learningCategory,
  setLearningCategory,
  onBlogClick,
}) => {
  const { academicBlogs, engineeringBlogs } = usePortfolioStore();
  const blogs =
    learningCategory === 'academic' ? academicBlogs : engineeringBlogs;
  const accent =
    learningCategory === 'academic' ? 'border-purple-500' : 'border-green-500';

  const tabClass = (active: boolean) =>
    `px-5 sm:px-7 py-3 sm:py-4 rounded-xl font-medium transition-all duration-200 text-sm sm:text-base flex items-center ${
      active
        ? 'bg-blue-600 text-white shadow-lg'
        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
    }`;

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-3 sm:gap-6">
        <button
          onClick={() => setLearningCategory('academic')}
          className={tabClass(learningCategory === 'academic')}
        >
          <Icon name="graduation-cap" className="mr-2" />
          学术研究
        </button>
        <button
          onClick={() => setLearningCategory('engineering')}
          className={tabClass(learningCategory === 'engineering')}
        >
          <Icon name="cogs" className="mr-2" />
          工程技术
        </button>
      </div>

      <div className="space-y-4">
        {blogs.map((blog, index) => (
          <BlogCard
            key={blog.id || index}
            blog={blog}
            accent={accent}
            onClick={() => onBlogClick(blog)}
          />
        ))}
        {blogs.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Icon
              name={learningCategory === 'academic' ? 'graduation-cap' : 'cogs'}
              className="text-4xl mb-4"
            />
            <p>暂无记录</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LearningSectionFull;
