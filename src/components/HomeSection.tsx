import React from 'react';
import Profile from './Profile';
import EditableCard from './EditableCard';
import { PersonalInfo, NewsItem } from '../types';

interface HomeSectionProps {
  personalInfo: PersonalInfo;
  recentNews: NewsItem[];
  isAdminMode: boolean;
  openInlineEditor: (type: string, data: unknown, index: number | null) => void;
  handleDeleteWithUndo: (type: string, index: number) => void;
  handleInsertAt: (type: string, index: number) => void;
}

const HomeSection: React.FC<HomeSectionProps> = ({
  personalInfo,
  recentNews,
  isAdminMode,
  openInlineEditor,
  handleDeleteWithUndo,
  handleInsertAt,
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* 左侧个人信息侧边栏 */}
      <div className="lg:w-80 lg:flex-shrink-0">
        <Profile
          personalInfo={personalInfo}
          isAdminMode={isAdminMode}
          onEdit={() => openInlineEditor('personal-info', personalInfo, 0)}
        />
      </div>

      {/* 右侧主内容区域 */}
      <div className="flex-1 min-w-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <i className="fas fa-bolt text-yellow-500 mr-3"></i>
            最新动态
          </h2>
          <div className="space-y-4">
            {recentNews.map((news, index) => (
              <EditableCard
                key={news.id || index}
                isAdminMode={isAdminMode}
                onEdit={() => openInlineEditor('news', news, index)}
                onDelete={() => handleDeleteWithUndo('news', index)}
                onInsertBefore={() => handleInsertAt('news', index)}
                onInsertAfter={() => handleInsertAt('news', index + 1)}
              >
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
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
                  </div>
                </div>
              </EditableCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSection;
