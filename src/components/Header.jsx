import React, { useState, useEffect } from 'react';

const Header = ({ activeSection, setActiveSection, onOpenAdmin }) => {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [showMobileProfile, setShowMobileProfile] = useState(false);
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

  const navItems = [
    { id: 'home', label: '首页', icon: 'fas fa-home' },
    { id: 'resume', label: '个人简历', icon: 'fas fa-user' },
    { id: 'learning', label: '学习记录', icon: 'fas fa-book' }
  ];

  // 检查是否已经登录管理模式
  useEffect(() => {
    const adminStatus = localStorage.getItem('portfolio_admin_mode');
    if (adminStatus === 'true') {
      setIsAdminMode(true);
    }
  }, []);

  // 从本地存储加载个人信息
  useEffect(() => {
    try {
      const stored = localStorage.getItem('portfolio_personal_info');
      if (stored) {
        const data = JSON.parse(stored);
        setPersonalInfo(prev => ({ ...prev, ...data }));
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

  // 处理管理员登录
  const handleAdminLogin = () => {
    // 简单的密码验证，你可以根据需要修改密码
    const correctPassword = 'ranpin.github'; // 建议修改为更安全的密码
    
    if (adminPassword === correctPassword) {
      setIsAdminMode(true);
      localStorage.setItem('portfolio_admin_mode', 'true');
      setShowPasswordInput(false);
      setAdminPassword('');
      onOpenAdmin();
    } else {
      alert('密码错误！');
      setAdminPassword('');
    }
  };

  // 退出管理模式
  const handleAdminLogout = () => {
    setIsAdminMode(false);
    localStorage.removeItem('portfolio_admin_mode');
  };

  // 处理密码输入框的回车键
  const handlePasswordKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdminLogin();
    }
  };

  return (
    <>
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <nav className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center min-h-[60px]">
            {/* 仅在小屏移动端显示个人信息 - 只在 sm 以下显示 */}
            <div className="sm:hidden flex items-center flex-shrink-0 min-w-0">
              <button 
                onClick={() => setShowMobileProfile(true)}
                className="flex items-center space-x-2 hover:bg-gray-50 rounded-lg p-2 transition-colors min-w-0"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold overflow-hidden flex-shrink-0">
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
                <div className="text-left min-w-0 flex-1">
                  <h2 className="text-sm font-semibold text-gray-800 truncate">{personalInfo.name}</h2>
                </div>
                <i className="fas fa-chevron-right text-gray-400 text-xs flex-shrink-0"></i>
              </button>
            </div>
          
          <div className="flex-1 sm:flex sm:justify-center min-w-0">
            <div className="flex space-x-1 sm:space-x-4 lg:space-x-8 overflow-x-auto py-3 lg:py-4 scrollbar-hide">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center justify-center space-x-1 sm:space-x-2 px-2 sm:px-4 py-2 sm:py-3 rounded-lg text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${
                    activeSection === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <i className={`${item.icon} text-xs sm:text-sm`}></i>
                  <span className="hidden sm:inline">{item.label}</span>
                  <span className="sm:hidden text-xs">
                    {item.id === 'home' ? '首页' : 
                     item.id === 'resume' ? '简历' : 
                     item.id === 'learning' ? '学习' : item.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
          
          {/* 管理按钮区域 - 移动端优化 */}
          <div className="py-3 lg:py-4 flex items-center space-x-1 sm:space-x-3 flex-shrink-0">
            {!isAdminMode ? (
              // 未登录管理模式时显示登录按钮
              <>
                {!showPasswordInput ? (
                  <button
                    onClick={() => setShowPasswordInput(true)}
                    className="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:space-x-2 sm:px-3 sm:py-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition-all duration-200 text-xs sm:text-sm"
                    title="管理员登录"
                  >
                    <i className="fas fa-user-shield text-xs sm:text-sm"></i>
                  </button>
                ) : (
                  // 桌面端显示内联输入框
                  <div className="hidden sm:flex items-center space-x-1">
                    <input
                      type="password"
                      placeholder="密码"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      onKeyPress={handlePasswordKeyPress}
                      className="px-3 py-2 border border-gray-300 rounded text-sm w-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      autoFocus
                    />
                    <button
                      onClick={handleAdminLogin}
                      className="px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      <i className="fas fa-sign-in-alt text-xs"></i>
                    </button>
                    <button
                      onClick={() => {
                        setShowPasswordInput(false);
                        setAdminPassword('');
                      }}
                      className="px-3 py-2 text-gray-500 hover:text-gray-700 rounded hover:bg-gray-100 transition-colors"
                    >
                      <i className="fas fa-times text-xs"></i>
                    </button>
                  </div>
                )}
              </>
            ) : (
              // 已登录管理模式时显示管理按钮和退出按钮
              <>
                <button
                  onClick={onOpenAdmin}
                  className="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:space-x-2 sm:px-4 sm:py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl transform hover:scale-105 text-xs sm:text-sm"
                  title="打开内容管理面板 (Ctrl/Cmd + Shift + A)"
                >
                  <i className="fas fa-cog text-xs sm:text-sm"></i>
                  <span className="hidden sm:inline">管理</span>
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="flex items-center justify-center w-8 h-8 sm:w-auto sm:h-auto sm:space-x-2 sm:px-3 sm:py-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition-all duration-200 text-xs sm:text-sm"
                  title="退出管理模式"
                >
                  <i className="fas fa-sign-out-alt text-xs sm:text-sm"></i>
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>

    {/* 移动端管理员登录弹窗 */}
    {showPasswordInput && (
      <div 
        className="fixed inset-0 z-50 bg-black bg-opacity-50 sm:hidden"
        onClick={() => {
          setShowPasswordInput(false);
          setAdminPassword('');
        }}
      >
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-sm transform transition-all duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-user-shield text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">管理员登录</h3>
              <p className="text-gray-600 text-sm">请输入管理员密码以访问管理功能</p>
            </div>
            
            <div className="space-y-4">
              <input
                type="password"
                placeholder="请输入管理员密码"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                onKeyPress={handlePasswordKeyPress}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                autoFocus
              />
              
              <div className="flex space-x-3">
                <button
                  onClick={handleAdminLogin}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium"
                >
                  <i className="fas fa-sign-in-alt mr-2"></i>
                  登录
                </button>
                <button
                  onClick={() => {
                    setShowPasswordInput(false);
                    setAdminPassword('');
                  }}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors font-medium"
                >
                  <i className="fas fa-times mr-2"></i>
                  取消
                </button>
              </div>
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
        <div className="fixed inset-x-0 bottom-0 bg-white rounded-t-2xl shadow-xl transform transition-transform duration-300">
          <div 
            className="p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 关闭按钮 */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">个人信息</h3>
              <button 
                onClick={() => setShowMobileProfile(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
              >
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>

            {/* 个人头像和基本信息 */}
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4 shadow-lg overflow-hidden">
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
              <h1 className="text-xl font-bold text-gray-800 mb-2">{personalInfo.name}</h1>
              <p className="text-base text-gray-600 mb-4">{personalInfo.title}</p>
              
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
            
            {/* 研究兴趣 */}
            <div className="mb-6">
              <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                <i className="fas fa-lightbulb text-yellow-500 mr-2"></i>
                研究兴趣
              </h3>
              <div className="flex flex-wrap gap-2">
                {(personalInfo.researchInterests || []).map((tag) => (
                  <span key={tag} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            {/* 社交链接 */}
            <div>
              <h3 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
                <i className="fas fa-share-alt text-blue-500 mr-2"></i>
                社交链接
              </h3>
              <div className="grid grid-cols-2 gap-3">
                {personalInfo.socialLinks?.github && (
                  <a href={personalInfo.socialLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors group">
                    <i className="fab fa-github text-gray-700 group-hover:text-gray-900 mr-2"></i>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">GitHub</span>
                  </a>
                )}
                {personalInfo.socialLinks?.linkedin && (
                  <a href={personalInfo.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors group">
                    <i className="fab fa-linkedin text-blue-700 group-hover:text-blue-900 mr-2"></i>
                    <span className="text-sm font-medium text-blue-700 group-hover:text-blue-900">LinkedIn</span>
                  </a>
                )}
                {personalInfo.socialLinks?.scholar && (
                  <a href={personalInfo.socialLinks.scholar} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-red-100 hover:bg-red-200 rounded-lg transition-colors group">
                    <i className="fas fa-graduation-cap text-red-700 group-hover:text-red-900 mr-2"></i>
                    <span className="text-sm font-medium text-red-700 group-hover:text-red-900">Scholar</span>
                  </a>
                )}
                {personalInfo.socialLinks?.rss && (
                  <a href={personalInfo.socialLinks.rss} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center p-3 bg-orange-100 hover:bg-orange-200 rounded-lg transition-colors group">
                    <i className="fas fa-rss text-orange-700 group-hover:text-orange-900 mr-2"></i>
                    <span className="text-sm font-medium text-orange-700 group-hover:text-orange-900">RSS</span>
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

export default Header;
