import React from 'react';
import Icon from './Icon';
import type { PersonalInfo } from '../types';

interface ProfileProps {
  personalInfo: PersonalInfo;
}

const Profile: React.FC<ProfileProps> = ({ personalInfo }) => {
  const { avatar, socialLinks } = personalInfo;
  const showImage =
    avatar && (avatar.startsWith('http') || avatar.startsWith('data:'));

  return (
    <div className="w-full lg:w-80 bg-white shadow-lg rounded-2xl p-6 lg:p-8">
      {/* 头像与基本信息 */}
      <div className="text-center mb-6">
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4 shadow-lg overflow-hidden">
          {showImage ? (
            <img
              src={avatar}
              alt="头像"
              className="w-full h-full object-cover"
              loading="eager"
            />
          ) : (
            avatar || 'A'
          )}
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-3">
          {personalInfo.name}
        </h1>
        <p className="text-base text-gray-600 mb-6">{personalInfo.title}</p>

        <div className="space-y-2 text-sm text-gray-600">
          <div className="flex items-center justify-center space-x-2">
            <Icon name="map-marker-alt" className="text-blue-500 w-4" />
            <span>{personalInfo.location}</span>
          </div>
          <div className="flex items-center justify-center space-x-2">
            <Icon name="envelope" className="text-blue-500 w-4" />
            <span>{personalInfo.email}</span>
          </div>
          {socialLinks?.scholar && (
            <div className="flex items-center justify-center space-x-2">
              <Icon name="graduation-cap" className="text-blue-500 w-4" />
              <a
                href={socialLinks.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 transition-colors"
              >
                Google Scholar
              </a>
            </div>
          )}
        </div>
      </div>

      {/* 研究兴趣 */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Icon name="lightbulb" className="text-yellow-500 mr-2" />
          研究兴趣
        </h3>
        <div className="flex flex-wrap gap-3">
          {(personalInfo.researchInterests || []).map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* 社交链接 */}
      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <Icon name="share-alt" className="text-blue-500 mr-2" />
          社交链接
        </h3>
        <div className="grid grid-cols-2 gap-4">
          {socialLinks?.github && (
            <a
              href={socialLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
            >
              <Icon name="github" className="text-gray-700 mr-2" />
              <span className="text-sm font-medium text-gray-700">GitHub</span>
            </a>
          )}
          {socialLinks?.linkedin && (
            <a
              href={socialLinks.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-blue-100 hover:bg-blue-200 rounded-xl transition-colors"
            >
              <Icon name="linkedin" className="text-blue-700 mr-2" />
              <span className="text-sm font-medium text-blue-700">
                LinkedIn
              </span>
            </a>
          )}
          {socialLinks?.scholar && (
            <a
              href={socialLinks.scholar}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-red-100 hover:bg-red-200 rounded-xl transition-colors"
            >
              <Icon name="graduation-cap" className="text-red-700 mr-2" />
              <span className="text-sm font-medium text-red-700">Scholar</span>
            </a>
          )}
          {socialLinks?.rss && (
            <a
              href={socialLinks.rss}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center p-4 bg-orange-100 hover:bg-orange-200 rounded-xl transition-colors"
            >
              <Icon name="rss" className="text-orange-700 mr-2" />
              <span className="text-sm font-medium text-orange-700">RSS</span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Profile);
