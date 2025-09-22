import React, { useState, useEffect } from 'react';

const Profile = () => {
  const [personalInfo, setPersonalInfo] = useState({
    name: "张博士",
    title: "清华大学计算机系",
    location: "北京，中国",
    email: "zhang@example.edu",
    avatar: "A",
    researchInterests: ["机器学习", "深度学习", "视觉", "NLP"],
    socialLinks: {
      github: "#",
      linkedin: "#",
      scholar: "#",
      rss: "#"
    }
  });

  // 布局顺序状态
  const [layoutOrder, setLayoutOrder] = useState(['profile', 'interests', 'social']);
  const [draggedItem, setDraggedItem] = useState(null);

  // 从本地存储加载个人信息
  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio_personal_info');
      if (stored) {
        const data = JSON.parse(stored);
        setPersonalInfo(prev => ({ ...prev, ...data }));
      }
      
      // 加载布局顺序
      const storedLayout = localStorage.getItem('portfolio_profile_layout');
      if (storedLayout) {
        setLayoutOrder(JSON.parse(storedLayout));
      }
    } catch (error) {
      console.warn('Failed to load personal info:', error);
    }
  }, []);

  // 监听本地存储变化
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const stored = localStorage.getItem('portfolio_personal_info');
        if (stored) {
          const data = JSON.parse(stored);
          setPersonalInfo(prev => ({ ...prev, ...data }));
        }
      } catch (error) {
        console.warn('Failed to load personal info:', error);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('personalInfoUpdated', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('personalInfoUpdated', handleStorageChange);
    };
  }, []);

  // 拖拽处理函数
  const handleDragStart = (e, itemId) => {
    setDraggedItem(itemId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetId) => {
    e.preventDefault();
    
    if (draggedItem && draggedItem !== targetId) {
      const newOrder = [...layoutOrder];
      const draggedIndex = newOrder.indexOf(draggedItem);
      const targetIndex = newOrder.indexOf(targetId);
      
      // 移动元素
      newOrder.splice(draggedIndex, 1);
      newOrder.splice(targetIndex, 0, draggedItem);
      
      setLayoutOrder(newOrder);
      localStorage.setItem('portfolio_profile_layout', JSON.stringify(newOrder));
    }
    
    setDraggedItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
  };

  // 渲染各个模块
  const renderProfileSection = () => (
    <div 
      key="profile"
      draggable
      onDragStart={(e) => handleDragStart(e, 'profile')}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, 'profile')}
      onDragEnd={handleDragEnd}
      className={`text-center mb-6 cursor-move transition-all duration-200 ${
        draggedItem === 'profile' ? 'opacity-50 scale-95' : ''
      } ${draggedItem && draggedItem !== 'profile' ? 'border-2 border-dashed border-blue-300 rounded-lg p-2' : ''}`}
    >
      {draggedItem && (
        <div className="text-xs text-blue-600 mb-2 flex items-center justify-center">
          <i className="fas fa-arrows-alt mr-1"></i>
          拖拽调整顺序
        </div>
      )}
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg overflow-hidden">
        {personalInfo.avatar && personalInfo.avatar.startsWith('http') ? (
          <img 
            src={personalInfo.avatar} 
            alt="头像" 
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : personalInfo.avatar && personalInfo.avatar.startsWith('data:') ? (
          <img 
            src={personalInfo.avatar} 
            alt="头像" 
            className="w-full h-full object-cover"
          />
        ) : (
          personalInfo.avatar || "A"
        )}
      </div>
      <h1 className="text-2xl font-bold text-gray-800 mb-3">{personalInfo.name}</h1>
      <p className="text-base text-gray-600 mb-6">{personalInfo.title}</p>
      
      <div className="space-y-2 text-sm text-gray-600">
        <div className="flex items-center justify-center space-x-2">
          <i className="fas fa-map-marker-alt text-blue-500 w-4"></i>
          <span>{personalInfo.location}</span>
        </div>
        <div className="flex items-center justify-center space-x-2">
          <i className="fas fa-envelope text-blue-500 w-4"></i>
          <span>{personalInfo.email}</span>
        </div>
        {personalInfo.socialLinks?.scholar && (
          <div className="flex items-center justify-center space-x-2">
            <i className="fas fa-graduation-cap text-blue-500 w-4"></i>
            <a href={personalInfo.socialLinks.scholar} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-colors">Google Scholar</a>
          </div>
        )}
      </div>
    </div>
  );

  const renderInterestsSection = () => (
    <div 
      key="interests"
      draggable
      onDragStart={(e) => handleDragStart(e, 'interests')}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, 'interests')}
      onDragEnd={handleDragEnd}
      className={`mb-8 cursor-move transition-all duration-200 ${
        draggedItem === 'interests' ? 'opacity-50 scale-95' : ''
      } ${draggedItem && draggedItem !== 'interests' ? 'border-2 border-dashed border-blue-300 rounded-lg p-2' : ''}`}
    >
      {draggedItem && (
        <div className="text-xs text-blue-600 mb-2 flex items-center justify-center">
          <i className="fas fa-arrows-alt mr-1"></i>
          拖拽调整顺序
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
        研究兴趣
      </h3>
      <div className="flex flex-wrap gap-3">
        {(personalInfo.researchInterests || []).map((tag) => (
          <span key={tag} className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );

  const renderSocialSection = () => (
    <div 
      key="social"
      draggable
      onDragStart={(e) => handleDragStart(e, 'social')}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, 'social')}
      onDragEnd={handleDragEnd}
      className={`cursor-move transition-all duration-200 ${
        draggedItem === 'social' ? 'opacity-50 scale-95' : ''
      } ${draggedItem && draggedItem !== 'social' ? 'border-2 border-dashed border-blue-300 rounded-lg p-2' : ''}`}
    >
      {draggedItem && (
        <div className="text-xs text-blue-600 mb-2 flex items-center justify-center">
          <i className="fas fa-arrows-alt mr-1"></i>
          拖拽调整顺序
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
        <i className="fas fa-share-alt text-blue-500 mr-2"></i>
        社交链接
      </h3>
      <div className="grid grid-cols-2 gap-4">
        {personalInfo.socialLinks?.github && (
          <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors group">
            <i className="fab fa-github text-gray-700 group-hover:text-gray-900 mr-2"></i>
            <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">GitHub</span>
          </a>
        )}
        {personalInfo.socialLinks?.linkedin && (
          <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors group">
            <i className="fab fa-linkedin text-blue-700 group-hover:text-blue-900 mr-2"></i>
            <span className="text-sm font-medium text-blue-700 group-hover:text-blue-900">LinkedIn</span>
          </a>
        )}
        {personalInfo.socialLinks?.scholar && (
          <a href={personalInfo.socialLinks.scholar} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-red-100 hover:bg-red-200 rounded-xl transition-colors group">
            <i className="fas fa-graduation-cap text-red-700 group-hover:text-red-900 mr-2"></i>
            <span className="text-sm font-medium text-red-700 group-hover:text-red-900">Scholar</span>
          </a>
        )}
        {personalInfo.socialLinks?.rss && (
          <a href={personalInfo.socialLinks.rss} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-4 bg-orange-100 hover:bg-orange-200 rounded-xl transition-colors group">
            <i className="fas fa-rss text-orange-700 group-hover:text-orange-900 mr-2"></i>
            <span className="text-sm font-medium text-orange-700 group-hover:text-orange-900">RSS</span>
          </a>
        )}
      </div>
    </div>
  );

  // 根据布局顺序渲染模块
  const renderSections = () => {
    const sectionMap = {
      profile: renderProfileSection,
      interests: renderInterestsSection,
      social: renderSocialSection
    };

    return layoutOrder.map(sectionId => sectionMap[sectionId]());
  };

  return (
    <div className="w-80 bg-white shadow-lg flex-shrink-0 rounded-2xl m-6 p-8 h-fit hidden sm:block">
      {renderSections()}
    </div>
  );
};

export default Profile;
