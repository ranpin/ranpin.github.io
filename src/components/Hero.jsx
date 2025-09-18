import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-sage-100/30 to-warm-gray-100/30"></div>
      
      {/* 装饰性背景元素 */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-sage-200/20 rounded-full blur-xl animate-float"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-warm-gray-200/20 rounded-full blur-xl animate-float" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-sage-300/20 rounded-full blur-xl animate-float" style={{animationDelay: '2s'}}></div>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-serif font-light text-warm-gray-800 mb-6 leading-tight">
            探索知识的
            <span className="text-gradient block mt-2">无限边界</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-warm-gray-600 mb-8 font-light leading-relaxed">
            分享学术研究，记录项目历程，传播知识价值
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="px-8 py-3 bg-sage-600 text-white rounded-full hover:bg-sage-700 transition-all duration-300 hover-lift font-medium">
              查看项目
            </button>
            <button className="px-8 py-3 border-2 border-sage-600 text-sage-600 rounded-full hover:bg-sage-600 hover:text-white transition-all duration-300 hover-lift font-medium">
              学术成果
            </button>
          </div>
        </div>
        
        <div className="mt-16 animate-slide-up">
          <div className="flex items-center justify-center space-x-6 text-warm-gray-500">
            <div className="flex items-center space-x-2">
              <i className="fas fa-project-diagram"></i>
              <span className="text-sm">15 个项目</span>
            </div>
            <div className="w-1 h-1 bg-warm-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-file-alt"></i>
              <span className="text-sm">8 篇论文</span>
            </div>
            <div className="w-1 h-1 bg-warm-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-code"></i>
              <span className="text-sm">12 个开源</span>
            </div>
            <div className="w-1 h-1 bg-warm-gray-400 rounded-full"></div>
            <div className="flex items-center space-x-2">
              <i className="fas fa-star"></i>
              <span className="text-sm">2.3k Stars</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <i className="fas fa-chevron-down text-warm-gray-400 text-xl"></i>
      </div>
    </section>
  );
};

export default Hero;
