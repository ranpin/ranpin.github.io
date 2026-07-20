import React, { useState } from 'react';
import SearchBox from './SearchBox';
import Icon from './Icon';
import type { PersonalInfo } from '../types';

interface HeaderProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  onSectionChange?: (section: string) => void;
  personalInfo: PersonalInfo;
}

const navItems = [
  { id: 'home', label: '首页', shortLabel: '首页', icon: 'home' },
  { id: 'resume', label: '个人简历', shortLabel: '简历', icon: 'user' },
  { id: 'docs', label: '技术文档', shortLabel: '文档', icon: 'file-alt' },
  { id: 'stargate', label: '星际之门', shortLabel: '星际之门', icon: 'star' },
];

const Avatar: React.FC<{ personalInfo: PersonalInfo; size: string }> = ({
  personalInfo,
  size,
}) => {
  const { avatar } = personalInfo;
  if (avatar && (avatar.startsWith('http') || avatar.startsWith('data:'))) {
    return (
      <img
        src={avatar}
        alt="头像"
        className="w-full h-full object-cover"
        loading="eager"
      />
    );
  }
  return <span className={size}>{avatar || 'A'}</span>;
};

const Header: React.FC<HeaderProps> = ({
  activeSection,
  setActiveSection,
  onSectionChange,
  personalInfo,
}) => {
  const [showMobileProfile, setShowMobileProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const go = (id: string) => {
    if (onSectionChange) onSectionChange(id);
    else setActiveSection(id);
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <nav className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center min-h-[60px]">
            {/* 移动端个人信息入口 */}
            <div className="sm:hidden flex items-center flex-shrink-0 min-w-0">
              <button
                onClick={() => setShowMobileProfile(true)}
                className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors min-w-0"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold overflow-hidden flex-shrink-0">
                  <Avatar personalInfo={personalInfo} size="" />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <h2 className="text-sm font-semibold text-gray-800 truncate">
                    {personalInfo.name}
                  </h2>
                </div>
                <Icon
                  name="chevron-right"
                  className="text-gray-400 text-xs flex-shrink-0"
                />
              </button>
            </div>

            {/* 导航菜单 */}
            <div className="flex-1 flex items-center justify-center min-w-0">
              <div className="flex space-x-1 sm:space-x-4 lg:space-x-8 overflow-x-auto py-3 lg:py-4 scrollbar-hide">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                      activeSection === item.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    <Icon name={item.icon} className="text-xs sm:text-sm" />
                    <span className="hidden sm:inline">{item.label}</span>
                    <span className="sm:hidden text-xs">{item.shortLabel}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* 搜索按钮 */}
            <div className="py-3 lg:py-4 flex items-center flex-shrink-0">
              <button
                onClick={() => setShowSearch(true)}
                className="flex items-center justify-center w-8 h-8 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200"
                title="搜索"
              >
                <Icon name="search" className="text-sm" />
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* 搜索弹窗 */}
      {showSearch && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50"
          onClick={() => setShowSearch(false)}
        >
          <div className="fixed inset-0 flex items-start justify-center p-4 pt-20">
            <div
              className="bg-white rounded-2xl shadow-xl w-full max-w-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between p-6 border-b">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center">
                  <Icon name="search" className="text-blue-500 mr-3" />
                  全局搜索
                </h3>
                <button
                  onClick={() => setShowSearch(false)}
                  className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon name="times" className="text-gray-600" />
                </button>
              </div>
              <div className="p-6">
                <SearchBox
                  placeholder="搜索项目、论文、工作经历..."
                  className="w-full"
                  onSearch={(results, action) => {
                    if (action === 'select' && results.length > 0) {
                      setShowSearch(false);
                      go('resume');
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 移动端个人信息弹窗 */}
      {showMobileProfile && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setShowMobileProfile(false)}
        >
          <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-xl">
            <div className="p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-800">
                  个人信息
                </h3>
                <button
                  onClick={() => setShowMobileProfile(false)}
                  className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon name="times" className="text-gray-600" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-lg overflow-hidden">
                  <Avatar personalInfo={personalInfo} size="" />
                </div>
                <h1 className="text-xl font-bold text-gray-800 mb-2">
                  {personalInfo.name}
                </h1>
                <p className="text-base text-gray-600 mb-4">
                  {personalInfo.title}
                </p>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="map-marker-alt" className="text-blue-500 w-4" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="envelope" className="text-blue-500 w-4" />
                    <span>{personalInfo.email}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon name="lightbulb" className="text-yellow-500 mr-2" />
                  研究兴趣
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(personalInfo.researchInterests || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                  <Icon name="share-alt" className="text-blue-500 mr-2" />
                  社交链接
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {personalInfo.socialLinks?.github && (
                    <a
                      href={personalInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      <Icon name="github" className="text-gray-700 mr-2" />
                      <span className="text-sm font-medium text-gray-700">
                        GitHub
                      </span>
                    </a>
                  )}
                  {personalInfo.socialLinks?.linkedin && (
                    <a
                      href={personalInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                    >
                      <Icon name="linkedin" className="text-blue-700 mr-2" />
                      <span className="text-sm font-medium text-blue-700">
                        LinkedIn
                      </span>
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(Header);
