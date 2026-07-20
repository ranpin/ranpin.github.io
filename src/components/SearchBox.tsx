import React, { useState, useEffect } from 'react';
import Icon from './Icon';
import { projects, publications, internships } from '../data/content';

export interface SearchResult {
  type: string;
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface SearchBoxProps {
  onSearch?: (results: SearchResult[], action?: 'select') => void;
  placeholder?: string;
  className?: string;
}

const includesText = (value: unknown, q: string): boolean =>
  typeof value === 'string' && value.toLowerCase().includes(q);

const matchTags = (tags: unknown, q: string): boolean =>
  Array.isArray(tags) && tags.some((t) => includesText(t, q));

const SearchBox: React.FC<SearchBoxProps> = ({
  onSearch,
  placeholder = '搜索项目、论文、工作经历...',
  className = '',
}) => {
  const [query, setQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        const results = searchContent(query);
        setSearchResults(results);
        onSearch?.(results);
      } else {
        setSearchResults([]);
      }
    }, 200);
    return () => clearTimeout(timer);
  }, [query]);

  const searchContent = (searchQuery: string): SearchResult[] => {
    const q = searchQuery.toLowerCase();
    const results: SearchResult[] = [];

    projects.forEach((p) => {
      if (
        includesText(p.title, q) ||
        includesText(p.description, q) ||
        matchTags(p.tags, q)
      ) {
        results.push({
          type: 'project',
          title: p.title,
          description: p.description || '',
          icon: 'code',
          color: 'text-blue-600',
        });
      }
    });

    publications.forEach((pub) => {
      if (includesText(pub.title, q) || includesText(pub.abstract, q)) {
        results.push({
          type: 'publication',
          title: pub.title,
          description: pub.abstract || '',
          icon: 'file-alt',
          color: 'text-green-600',
        });
      }
    });

    internships.forEach((i) => {
      if (
        includesText(i.position, q) ||
        includesText(i.company, q) ||
        includesText(i.description, q)
      ) {
        results.push({
          type: 'internship',
          title: `${i.position} @ ${i.company}`,
          description: i.description || '',
          icon: 'briefcase',
          color: 'text-indigo-600',
        });
      }
    });

    return results.slice(0, 10);
  };

  const handleResultClick = (result: SearchResult) => {
    onSearch?.([result], 'select');
    setQuery('');
    setSearchResults([]);
    setIsExpanded(false);
  };

  const typeLabel = (type: string): string =>
    ({
      project: '项目',
      publication: '论文',
      internship: '经历',
    })[type] || '其他';

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icon name="search" className="text-gray-400" />
        </div>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsExpanded(true)}
          onBlur={() => setTimeout(() => setIsExpanded(false), 200)}
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
            <Icon name="times" className="text-sm" />
          </button>
        )}
      </div>

      {isExpanded && query && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 md:max-h-96 overflow-y-auto">
          {searchResults.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              <Icon name="search" className="mr-2" />
              没有找到相关内容
            </div>
          ) : (
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
                    <div
                      className={`flex-shrink-0 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center ${result.color}`}
                    >
                      <Icon name={result.icon} className="text-sm" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-medium text-gray-900 truncate">
                        {result.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                        {result.description.substring(0, 100)}
                      </p>
                      <span
                        className={`inline-block mt-2 text-xs px-2 py-1 rounded-full bg-gray-100 ${result.color}`}
                      >
                        {typeLabel(result.type)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBox;
