import React, { useState, useEffect } from 'react';

const SearchBox = ({ 
  onSearch, 
  placeholder = "搜索项目、论文、博客...", 
  className = "" 
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);

  // 防抖搜索
  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        performSearch(query);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  const performSearch = async (searchQuery) => {
    setIsSearching(true);
    try {
      // 模拟搜索延迟
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const results = searchContent(searchQuery);
      setSearchResults(results);
      
      if (onSearch) {
        onSearch(results);
      }
    } catch (error) {
      console.error('搜索失败:', error);
    } finally {
      setIsSearching(false);
    }
  };

  // 搜索内容的函数
  const searchContent = (searchQuery) => {
    const results = [];
    const searchText = searchQuery.toLowerCase();

    // 从本地存储获取数据
    try {
      // 搜索项目
      const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
      projects.forEach(project => {
        if (project.title?.toLowerCase().includes(searchText) || 
            project.description?.toLowerCase().includes(searchText) ||
            project.tags?.some(tag => tag.toLowerCase().includes(searchText))) {
          results.push({
            type: 'project',
            title: project.title,
            description: project.description,
            data: project,
            icon: 'fas fa-code',
            color: 'text-blue-600'
          });
        }
      });

      // 搜索论文
      const publications = JSON.parse(localStorage.getItem('portfolio_publications') || '[]');
      publications.forEach(pub => {
        if (pub.title?.toLowerCase().includes(searchText) || 
            pub.abstract?.toLowerCase().includes(searchText) ||
            pub.authors?.toLowerCase().includes(searchText)) {
          results.push({
            type: 'publication',
            title: pub.title,
            description: pub.abstract,
            data: pub,
            icon: 'fas fa-file-alt',
            color: 'text-green-600'
          });
        }
      });

      // 搜索学术博客
      const academicBlogs = JSON.parse(localStorage.getItem('portfolio_academic_blogs') || '[]');
      academicBlogs.forEach(blog => {
        if (blog.title?.toLowerCase().includes(searchText) || 
            blog.summary?.toLowerCase().includes(searchText) ||
            blog.tags?.some(tag => tag.toLowerCase().includes(searchText))) {
          results.push({
            type: 'academic-blog',
            title: blog.title,
            description: blog.summary,
            data: blog,
            icon: 'fas fa-graduation-cap',
            color: 'text-purple-600'
          });
        }
      });

      // 搜索工程博客
      const engineeringBlogs = JSON.parse(localStorage.getItem('portfolio_engineering_blogs') || '[]');
      engineeringBlogs.forEach(blog => {
        if (blog.title?.toLowerCase().includes(searchText) || 
            blog.summary?.toLowerCase().includes(searchText) ||
            blog.tags?.some(tag => tag.toLowerCase().includes(searchText))) {
          results.push({
            type: 'engineering-blog',
            title: blog.title,
            description: blog.summary,
            data: blog,
            icon: 'fas fa-cogs',
            color: 'text-orange-600'
          });
        }
      });

      // 搜索工作经历
      const internships = JSON.parse(localStorage.getItem('portfolio_internships') || '[]');
      internships.forEach(internship => {
        if (internship.position?.toLowerCase().includes(searchText) || 
            internship.company?.toLowerCase().includes(searchText) ||
            internship.description?.toLowerCase().includes(searchText)) {
          results.push({
            type: 'internship',
            title: `${internship.position} @ ${internship.company}`,
            description: internship.description,
            data: internship,
            icon: 'fas fa-briefcase',
            color: 'text-indigo-600'
          });
        }
      });

    } catch (error) {
      console.error('搜索数据解析失败:', error);
    }

    return results.slice(0, 10); // 限制结果数量
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  const handleBlur = () => {
    // 延迟收起，允许点击搜索结果
    setTimeout(() => {
      setIsExpanded(false);
    }, 200);
  };

  const handleResultClick = (result) => {
    // 触发搜索结果点击事件
    if (onSearch) {
      onSearch([result], 'select');
    }
    setQuery('');
    setSearchResults([]);
    setIsExpanded(false);
  };

  const highlightText = (text, query) => {
    if (!query || !text) return text;
    
    const regex = new RegExp(`(${query})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? (
        <mark key={index} className="bg-yellow-200 text-yellow-900 px-1 rounded">
          {part}
        </mark>
      ) : part
    );
  };

  return (
    <div className={`relative ${className}`}>
      {/* 搜索输入框 */}
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <i className={`fas ${isSearching ? 'fa-spinner fa-spin' : 'fa-search'} text-gray-400`}></i>
        </div>
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-sm"
        />
        {query && (
          <button
            onClick={() => {
              setQuery('');
              setSearchResults([]);
            }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <i className="fas fa-times text-sm"></i>
          </button>
        )}
      </div>

      {/* 搜索结果下拉框 */}
      {isExpanded && (query || searchResults.length > 0) && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 md:max-h-96 overflow-y-auto">
          {isSearching && (
            <div className="p-4 text-center text-gray-500">
              <i className="fas fa-spinner fa-spin mr-2"></i>
              搜索中...
            </div>
          )}
          
          {!isSearching && searchResults.length === 0 && query && (
            <div className="p-4 text-center text-gray-500">
              <i className="fas fa-search mr-2"></i>
              没有找到相关内容
            </div>
          )}
          
          {!isSearching && searchResults.length > 0 && (
            <>
              <div className="px-4 py-2 bg-gray-50 border-b text-sm text-gray-600 font-medium">
                找到 {searchResults.length} 个结果
              </div>
              {searchResults.map((result, index) => (
                <div
                  key={index}
                  onClick={() => handleResultClick(result)}
                  className="p-4 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0 transition-colors"
                >
                  <div className="flex items-start space-x-3">
                    <div className={`flex-shrink-0 w-6 h-6 md:w-8 md:h-8 rounded-full bg-gray-100 flex items-center justify-center ${result.color}`}>
                      <i className={`${result.icon} text-xs md:text-sm`}></i>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs md:text-sm font-medium text-gray-900 truncate">
                        {highlightText(result.title, query)}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2 hidden md:block">
                        {highlightText(result.description?.substring(0, 100) + '...', query)}
                      </p>
                      <div className="flex items-center mt-1 md:mt-2">
                        <span className={`text-xs px-2 py-1 rounded-full bg-gray-100 ${result.color}`}>
                          {result.type === 'project' ? '项目' :
                           result.type === 'publication' ? '论文' :
                           result.type === 'academic-blog' ? '学术' :
                           result.type === 'engineering-blog' ? '工程' :
                           result.type === 'internship' ? '经历' : '其他'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
          
          {!isSearching && query && (
            <div className="p-3 bg-gray-50 border-t text-center">
              <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
                查看所有搜索结果
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
