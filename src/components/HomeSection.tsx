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
  const hasHighlights =
    personalInfo.highlights && personalInfo.highlights.length > 0;

  return (
    <div className="space-y-8">
      {/* 首屏亮点带：价值主张 + 硬指标 */}
      {(personalInfo.headline || hasHighlights) && (
        <section className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl p-6 sm:p-8 text-white shadow-lg">
          {personalInfo.headline && (
            <p className="text-lg sm:text-2xl font-semibold leading-snug mb-6">
              {personalInfo.headline}
            </p>
          )}
          {hasHighlights && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {personalInfo.highlights!.map((h, i) => (
                <div
                  key={i}
                  className="bg-white/10 backdrop-blur rounded-xl px-4 py-3 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold">
                    {h.value}
                  </div>
                  <div className="text-xs sm:text-sm text-blue-100 mt-1">
                    {h.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        {/* 左侧个人信息侧边栏 */}
        <div className="lg:w-80 lg:flex-shrink-0">
          <Profile personalInfo={personalInfo} />
        </div>

        {/* 右侧主内容区域 */}
        <div className="flex-1 min-w-0">
          <div className="max-w-4xl mx-auto">
            {/* 个人简介 */}
            {personalInfo.bio?.detail && (
              <div className="bg-white rounded-xl p-6 shadow-sm mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <Icon name="user" className="text-blue-500 mr-3" />
                  关于我
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  {personalInfo.bio.detail}
                </p>
              </div>
            )}

            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Icon name="bolt" className="text-yellow-500 mr-3" />
              最新动态
            </h2>
            <div className="space-y-4">
              {recentNews.map((news, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500"
                >
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="text-sm text-gray-500 font-mono">
                      {news.date}
                    </span>
                    {news.type && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium">
                        {news.type}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-800 leading-relaxed">
                    {news.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
