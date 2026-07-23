import React, { useEffect, useRef, useState } from 'react';
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
  { id: 'resume', label: '简历中心', shortLabel: '简历', icon: 'user' },
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
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const go = (id: string) => {
    if (onSectionChange) onSectionChange(id);
    else setActiveSection(id);
  };

  // 弹窗打开：焦点移入、支持 ESC 关闭；关闭后焦点归还触发按钮
  useEffect(() => {
    if (!showMobileProfile) return;
    closeBtnRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowMobileProfile(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      triggerRef.current?.focus();
    };
  }, [showMobileProfile]);

  return (
    <>
      <header className="bg-white shadow-sm border-b border-warm-gray-200 sticky top-0 z-40">
        <nav className="px-4 sm:px-6 lg:px-8">
          {/* 三栏网格让导航真正居中，不依赖右侧占位 */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center min-h-[60px]">
            {/* 移动端个人信息入口 */}
            <div className="sm:hidden flex items-center justify-self-start min-w-0">
              <button
                ref={triggerRef}
                onClick={() => setShowMobileProfile(true)}
                className="flex items-center space-x-2 hover:bg-warm-gray-100 rounded-lg p-2 transition-colors min-w-0"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-sage-500 to-sage-600 rounded-full flex items-center justify-center text-white text-sm font-bold overflow-hidden flex-shrink-0">
                  <Avatar personalInfo={personalInfo} size="" />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <span className="block text-sm font-semibold text-warm-gray-800 truncate">
                    {personalInfo.name}
                  </span>
                </div>
                <Icon
                  name="chevron-right"
                  className="text-warm-gray-400 text-xs flex-shrink-0"
                />
              </button>
            </div>
            <div className="hidden sm:block" />

            {/* 导航菜单 */}
            <div className="flex items-center justify-center min-w-0">
              <div className="flex space-x-1 sm:space-x-4 lg:space-x-8 overflow-x-auto py-3 lg:py-4 scrollbar-hide">
                {navItems.map((item) => {
                  const active = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => go(item.id)}
                      aria-current={active ? 'page' : undefined}
                      className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                        active
                          ? 'bg-sage-100 text-sage-700'
                          : 'text-warm-gray-600 hover:text-warm-gray-900 hover:bg-warm-gray-100'
                      }`}
                    >
                      <Icon name={item.icon} className="text-xs sm:text-sm" />
                      <span className="hidden sm:inline">{item.label}</span>
                      <span className="sm:hidden text-xs">{item.shortLabel}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="justify-self-end" />
          </div>
        </nav>
      </header>

      {/* 移动端个人信息弹窗 */}
      {showMobileProfile && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-50 sm:hidden"
          onClick={() => setShowMobileProfile(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="mobile-profile-title"
            className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-xl overscroll-contain"
          >
            <div className="p-6" onClick={(e) => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h2
                  id="mobile-profile-title"
                  className="text-lg font-semibold text-warm-gray-800"
                >
                  个人信息
                </h2>
                <button
                  ref={closeBtnRef}
                  onClick={() => setShowMobileProfile(false)}
                  aria-label="关闭个人信息弹窗"
                  className="w-8 h-8 bg-warm-gray-100 hover:bg-warm-gray-200 rounded-full flex items-center justify-center transition-colors"
                >
                  <Icon name="times" className="text-warm-gray-600" />
                </button>
              </div>

              <div className="text-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-sage-500 to-sage-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-lg overflow-hidden">
                  <Avatar personalInfo={personalInfo} size="" />
                </div>
                <p className="text-xl font-bold font-serif text-warm-gray-800 mb-2">
                  {personalInfo.name}
                </p>
                <p className="text-base text-warm-gray-600 mb-4">
                  {personalInfo.title}
                </p>
                <div className="space-y-2 text-sm text-warm-gray-600">
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="map-marker-alt" className="text-sage-500 w-4" />
                    <span>{personalInfo.location}</span>
                  </div>
                  <div className="flex items-center justify-center space-x-2">
                    <Icon name="envelope" className="text-sage-500 w-4" />
                    <span>{personalInfo.email}</span>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-base font-semibold text-warm-gray-800 mb-3 flex items-center">
                  <Icon name="lightbulb" className="text-yellow-500 mr-2" />
                  研究兴趣
                </h3>
                <div className="flex flex-wrap gap-2">
                  {(personalInfo.researchInterests || []).map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-sage-100 text-sage-700 rounded-full text-sm font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-base font-semibold text-warm-gray-800 mb-3 flex items-center">
                  <Icon name="share-alt" className="text-sage-500 mr-2" />
                  社交链接
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {personalInfo.socialLinks?.github && (
                    <a
                      href={personalInfo.socialLinks.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 bg-warm-gray-100 hover:bg-warm-gray-200 rounded-lg transition-colors"
                    >
                      <Icon name="github" className="text-warm-gray-700 mr-2" />
                      <span className="text-sm font-medium text-warm-gray-700">
                        GitHub
                      </span>
                    </a>
                  )}
                  {personalInfo.socialLinks?.linkedin && (
                    <a
                      href={personalInfo.socialLinks.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center p-3 bg-sage-100 hover:bg-sage-200 rounded-lg transition-colors"
                    >
                      <Icon name="linkedin" className="text-sage-700 mr-2" />
                      <span className="text-sm font-medium text-sage-700">
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
