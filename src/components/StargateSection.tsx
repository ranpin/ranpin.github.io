import React from 'react';
import Icon from './Icon';

const StargateSection: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* 标题区域 */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center">
          <Icon name="star" className="text-yellow-500 mr-4 animate-pulse" />
          星际之门
          <Icon name="star" className="text-yellow-500 ml-4 animate-pulse" />
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          探索无限可能的创意宇宙 ——
          这里汇集了我的一些有趣的设计、实验性项目和奇思妙想
        </p>
      </div>

      {/* 特色项目网格 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {/* 示例卡片 1 - AI 艺术创作 */}
        <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon name="palette" className="text-3xl" />
          </div>
          <h3 className="text-xl font-bold mb-2">AI 艺术实验室</h3>
          <p className="text-sm text-white text-opacity-90 mb-4">
            探索人工智能与艺术创作的边界，生成独特的视觉作品
          </p>
          <div className="flex items-center text-sm">
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
              进行中
            </span>
          </div>
        </div>

        {/* 示例卡片 2 - 互动可视化 */}
        <div className="bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon name="chart-network" className="text-3xl" />
          </div>
          <h3 className="text-xl font-bold mb-2">数据宇宙可视化</h3>
          <p className="text-sm text-white text-opacity-90 mb-4">
            将复杂数据转化为沉浸式的交互式视觉体验
          </p>
          <div className="flex items-center text-sm">
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
              已完成
            </span>
          </div>
        </div>

        {/* 示例卡片 3 - 游戏开发 */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon name="gamepad" className="text-3xl" />
          </div>
          <h3 className="text-xl font-bold mb-2">迷你游戏工坊</h3>
          <p className="text-sm text-white text-opacity-90 mb-4">
            创意小游戏和互动体验的原型设计与开发
          </p>
          <div className="flex items-center text-sm">
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
              构思中
            </span>
          </div>
        </div>

        {/* 示例卡片 4 - 硬件创客 */}
        <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon name="microchip" className="text-3xl" />
          </div>
          <h3 className="text-xl font-bold mb-2">IoT 智能设备</h3>
          <p className="text-sm text-white text-opacity-90 mb-4">
            物联网硬件原型和智能家居解决方案
          </p>
          <div className="flex items-center text-sm">
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
              实验中
            </span>
          </div>
        </div>

        {/* 示例卡片 5 - 开源贡献 */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon name="github" className="text-3xl" />
          </div>
          <h3 className="text-xl font-bold mb-2">开源工具箱</h3>
          <p className="text-sm text-white text-opacity-90 mb-4">
            为开发者社区贡献的实用工具和库
          </p>
          <div className="flex items-center text-sm">
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
              持续更新
            </span>
          </div>
        </div>

        {/* 示例卡片 6 - 写作与思考 */}
        <div className="bg-gradient-to-br from-yellow-500 to-amber-500 rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer group">
          <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Icon name="pen-fancy" className="text-3xl" />
          </div>
          <h3 className="text-xl font-bold mb-2">思维碎片</h3>
          <p className="text-sm text-white text-opacity-90 mb-4">
            关于技术、设计和生活的随笔与深度思考
          </p>
          <div className="flex items-center text-sm">
            <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full">
              连载中
            </span>
          </div>
        </div>
      </div>

      {/* 底部提示 */}
      <div className="text-center">
        <div className="inline-block bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl px-8 py-6">
          <p className="text-gray-700 mb-2">
            <Icon name="lightbulb" className="text-yellow-500 mr-2" />
            更多精彩内容正在路上...
          </p>
          <p className="text-sm text-gray-600">
            如果你有有趣的想法或合作意向，欢迎联系我！
          </p>
        </div>
      </div>
    </div>
  );
};

export default StargateSection;
