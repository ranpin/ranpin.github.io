import React from 'react';

const TagCloud = () => {
  const tags = [
    { name: "机器学习", count: 28, size: "text-lg" },
    { name: "深度学习", count: 25, size: "text-lg" },
    { name: "Python", count: 32, size: "text-xl" },
    { name: "React", count: 22, size: "text-lg" },
    { name: "Node.js", count: 18, size: "text-base" },
    { name: "分布式系统", count: 15, size: "text-base" },
    { name: "微服务", count: 12, size: "text-sm" },
    { name: "Docker", count: 16, size: "text-base" },
    { name: "Kubernetes", count: 11, size: "text-sm" },
    { name: "数据结构", count: 20, size: "text-base" },
    { name: "算法", count: 24, size: "text-lg" },
    { name: "计算机视觉", count: 14, size: "text-sm" },
    { name: "自然语言处理", count: 13, size: "text-sm" },
    { name: "区块链", count: 9, size: "text-sm" },
    { name: "云计算", count: 17, size: "text-base" },
    { name: "大数据", count: 19, size: "text-base" }
  ];

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm p-6 hover:shadow-lg transition-shadow duration-300 border border-white/20">
      <h3 className="text-xl font-serif font-semibold text-warm-gray-800 mb-6 flex items-center">
        <i className="fas fa-code text-sage-600 mr-2"></i>
        技术栈
      </h3>
      
      <div className="flex flex-wrap gap-3">
        {tags.map((tag, index) => (
          <button
            key={tag.name}
            className={`tag-cloud-item px-4 py-2 bg-gradient-to-r from-sage-50 to-warm-gray-50 hover:from-sage-100 hover:to-warm-gray-100 text-warm-gray-700 hover:text-sage-700 rounded-full border border-sage-200/50 hover:border-sage-300 transition-all duration-300 ${tag.size} font-medium hover:scale-105`}
            style={{
              animationDelay: `${index * 0.05}s`,
              animation: 'fadeIn 0.6s ease-out forwards'
            }}
          >
            <span className="relative z-10">{tag.name}</span>
            <span className="ml-1 text-xs text-warm-gray-500">({tag.count})</span>
          </button>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-warm-gray-100">
        <div className="flex items-center justify-between text-sm text-warm-gray-500">
          <span>共 {tags.length} 个标签</span>
          <button className="text-sage-600 hover:text-sage-700 font-medium transition-colors">
            查看全部 →
          </button>
        </div>
      </div>
    </div>
  );
};

export default TagCloud;
