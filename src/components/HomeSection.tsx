import React from 'react';
import Profile from './Profile';
import Icon from './Icon';
import type { PersonalInfo, NewsItem } from '../types';

interface HomeSectionProps {
  personalInfo: PersonalInfo;
  recentNews: NewsItem[];
}

const HomeSection: React.FC<HomeSectionProps> = ({
  personalInfo,
  recentNews,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* 左侧个人信息侧边栏 */}
      <div className="lg:w-80 lg:flex-shrink-0">
        <Profile personalInfo={personalInfo} />
      </div>

      {/* 右侧主内容区域 */}
      <div className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Icon name="bolt" className="text-yellow-500 mr-3" />
            最新动态
          </h2>

          {/* 时间轴 */}
          <ol className="relative border-l-2 border-gray-200 ml-2 space-y-8">
            {recentNews.map((news, index) => (
              <li key={index} className="ml-6">
                {/* 节点 */}
                <span className="absolute -left-[9px] flex items-center justify-center w-4 h-4 bg-blue-500 rounded-full ring-4 ring-gray-50" />
                <div className="flex items-center flex-wrap gap-3 mb-1">
                  <time className="text-sm text-gray-500 font-mono">
                    {news.date}
                  </time>
                  {news.type && (
                    <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                      {news.type}
                    </span>
                  )}
                </div>
                <p className="text-gray-800 leading-relaxed">{news.content}</p>
              </li>
            ))}
          </ol>

          {recentNews.length === 0 && (
            <div className="text-center py-12 text-gray-400">暂无动态</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
