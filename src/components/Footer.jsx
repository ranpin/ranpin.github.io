import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-warm-gray-900 text-warm-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-br from-sage-500 to-sage-600 rounded-full flex items-center justify-center">
                <i className="fas fa-graduation-cap text-white text-sm"></i>
              </div>
              <h3 className="text-xl font-serif font-semibold text-white">学术分享</h3>
            </div>
            <p className="text-warm-gray-400 leading-relaxed mb-6 max-w-md">
              分享学术研究成果，记录项目开发历程，传播知识与技术。
              每一个项目都是探索的足迹，每一篇论文都是思考的结晶。
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-warm-gray-800 hover:bg-sage-600 rounded-full flex items-center justify-center text-warm-gray-400 hover:text-white transition-all duration-300">
                <i className="fab fa-github"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-warm-gray-800 hover:bg-sage-600 rounded-full flex items-center justify-center text-warm-gray-400 hover:text-white transition-all duration-300">
                <i className="fab fa-linkedin"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-warm-gray-800 hover:bg-sage-600 rounded-full flex items-center justify-center text-warm-gray-400 hover:text-white transition-all duration-300">
                <i className="fas fa-graduation-cap"></i>
              </a>
              <a href="#" className="w-10 h-10 bg-warm-gray-800 hover:bg-sage-600 rounded-full flex items-center justify-center text-warm-gray-400 hover:text-white transition-all duration-300">
                <i className="fas fa-rss"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">快速导航</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-warm-gray-400 hover:text-sage-400 transition-colors">首页</a></li>
              <li><a href="#" className="text-warm-gray-400 hover:text-sage-400 transition-colors">项目展示</a></li>
              <li><a href="#" className="text-warm-gray-400 hover:text-sage-400 transition-colors">学术论文</a></li>
              <li><a href="#" className="text-warm-gray-400 hover:text-sage-400 transition-colors">技术分享</a></li>
              <li><a href="#" className="text-warm-gray-400 hover:text-sage-400 transition-colors">个人简历</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-white font-semibold mb-4">学术合作</h4>
            <p className="text-warm-gray-400 text-sm mb-4">
              欢迎学术交流与项目合作，共同探索技术前沿
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="输入邮箱地址"
                className="flex-1 px-3 py-2 bg-warm-gray-800 border border-warm-gray-700 rounded-l-lg text-white placeholder-warm-gray-500 focus:outline-none focus:border-sage-500"
              />
              <button className="px-4 py-2 bg-sage-600 hover:bg-sage-700 text-white rounded-r-lg transition-colors">
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-warm-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-warm-gray-400 text-sm">
            © 2024 学术分享. 探索知识，分享智慧.
          </p>
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-warm-gray-400 hover:text-sage-400 text-sm transition-colors">隐私政策</a>
            <a href="#" className="text-warm-gray-400 hover:text-sage-400 text-sm transition-colors">使用条款</a>
            <a href="#" className="text-warm-gray-400 hover:text-sage-400 text-sm transition-colors">RSS订阅</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
