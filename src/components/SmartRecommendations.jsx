import React, { useState, useEffect } from 'react';

const SmartRecommendations = ({ currentItem, currentType, onItemClick }) => {
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    if (currentItem) {
      generateRecommendations();
    }
  }, [currentItem, currentType]);

  // 生成智能推荐
  const generateRecommendations = () => {
    try {
      const allContent = {
        projects: JSON.parse(localStorage.getItem('portfolio_projects') || '[]'),
        publications: JSON.parse(localStorage.getItem('portfolio_publications') || '[]'),
        academicBlogs: JSON.parse(localStorage.getItem('portfolio_academic_blogs') || '[]'),
        engineeringBlogs: JSON.parse(localStorage.getItem('portfolio_engineering_blogs') || '[]'),
        internships: JSON.parse(localStorage.getItem('portfolio_internships') || '[]')
      };

      const recommendations = [];

      // 基于标签的推荐
      if (currentItem.tags && Array.isArray(currentItem.tags)) {
        Object.entries(allContent).forEach(([type, items]) => {
          if (type === currentType) return; // 跳过同类型

          items.forEach(item => {
            if (item.id === currentItem.id) return; // 跳过当前项目

            let score = 0;
            
            // 标签匹配度计算
            if (item.tags && Array.isArray(item.tags)) {
              const commonTags = item.tags.filter(tag => 
                currentItem.tags.some(currentTag => 
                  currentTag.toLowerCase().includes(tag.toLowerCase()) ||
                  tag.toLowerCase().includes(currentTag.toLowerCase())
                )
              );
              score += commonTags.length * 10;
            }

            // 时间相关性（同年份的内容）
            const currentYear = extractYear(currentItem.period || currentItem.year || currentItem.date);
            const itemYear = extractYear(item.period || item.year || item.date);
            if (currentYear && itemYear && Math.abs(currentYear - itemYear) <= 1) {
              score += 5;
            }

            // 关键词匹配
            const currentText = (currentItem.title + ' ' + (currentItem.description || currentItem.abstract || currentItem.summary || '')).toLowerCase();
            const itemText = (item.title + ' ' + (item.description || item.abstract || item.summary || '')).toLowerCase();
            
            const keywords = ['机器学习', '深度学习', '人工智能', '算法', '系统', '优化', '网络', '数据', '模型', '框架'];
            keywords.forEach(keyword => {
              if (currentText.includes(keyword.toLowerCase()) && itemText.includes(keyword.toLowerCase())) {
                score += 3;
              }
            });

            if (score > 0) {
              recommendations.push({
                ...item,
                type: type.replace(/s$/, ''), // 去掉复数形式
                score,
                reason: getRecommendationReason(score, commonTags?.length || 0)
              });
            }
          });
        });
      }

      // 按分数排序，取前3个
      const sortedRecommendations = recommendations
        .sort((a, b) => b.score - a.score)
        .slice(0, 3);

      setRecommendations(sortedRecommendations);
    } catch (error) {
      console.error('生成推荐失败:', error);
      setRecommendations([]);
    }
  };

  // 提取年份
  const extractYear = (dateString) => {
    if (!dateString) return null;
    const match = dateString.match(/(\d{4})/);
    return match ? parseInt(match[1]) : null;
  };

  // 获取推荐理由
  const getRecommendationReason = (score, commonTagsCount) => {
    if (commonTagsCount >= 2) return '技术栈高度相关';
    if (commonTagsCount >= 1) return '相关技术领域';
    if (score >= 8) return '时间相近的项目';
    return '可能感兴趣';
  };

  // 获取类型图标和颜色
  const getTypeInfo = (type) => {
    const typeMap = {
      project: { icon: 'fas fa-code', color: 'text-blue-600', bg: 'bg-blue-50', name: '项目' },
      publication: { icon: 'fas fa-file-alt', color: 'text-green-600', bg: 'bg-green-50', name: '论文' },
      academicBlog: { icon: 'fas fa-graduation-cap', color: 'text-purple-600', bg: 'bg-purple-50', name: '学术' },
      engineeringBlog: { icon: 'fas fa-cogs', color: 'text-orange-600', bg: 'bg-orange-50', name: '工程' },
      internship: { icon: 'fas fa-briefcase', color: 'text-indigo-600', bg: 'bg-indigo-50', name: '经历' }
    };
    return typeMap[type] || { icon: 'fas fa-file', color: 'text-gray-600', bg: 'bg-gray-50', name: '内容' };
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 border-t pt-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
        <i className="fas fa-magic text-purple-500 mr-3"></i>
        相关推荐
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {recommendations.map((item, index) => {
          const typeInfo = getTypeInfo(item.type);
          
          return (
            <div
              key={`${item.type}-${item.id}-${index}`}
              onClick={() => onItemClick && onItemClick(item, item.type)}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer hover:border-blue-300 group"
            >
              <div className="flex items-start space-x-4 mb-4">
                <div className={`w-12 h-12 ${typeInfo.bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                  <i className={`${typeInfo.icon} ${typeInfo.color} text-lg`}></i>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`px-2 py-1 ${typeInfo.bg} ${typeInfo.color} rounded text-xs font-medium`}>
                      {typeInfo.name}
                    </span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded text-xs font-medium">
                      {item.reason}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2 text-sm">
                    {item.title || item.position || item.award}
                  </h4>
                </div>
              </div>
              
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">
                {item.description || item.abstract || item.summary || '暂无描述'}
              </p>
              
              {/* 标签 */}
              {item.tags && item.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map((tag, tagIndex) => (
                    <span key={tagIndex} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                  {item.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs">
                      +{item.tags.length - 3}
                    </span>
                  )}
                </div>
              )}
              
              {/* 时间信息 */}
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{item.period || item.year || item.date}</span>
                <div className="flex items-center space-x-1">
                  <i className="fas fa-star text-yellow-400"></i>
                  <span>匹配度 {Math.round((item.score / 20) * 100)}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="text-center mt-6">
        <p className="text-sm text-gray-500">
          <i className="fas fa-lightbulb mr-1"></i>
          基于标签相似度和时间相关性的智能推荐
        </p>
      </div>
    </div>
  );
};

export default SmartRecommendations;
