import React from 'react';
import Icon from './Icon';
import type { PersonalInfo } from '../types';

interface FooterProps {
  personalInfo: PersonalInfo;
}

const Footer: React.FC<FooterProps> = ({ personalInfo }) => {
  const { socialLinks } = personalInfo;
  const year = 2026;

  const socials: { key: string; icon: string; label: string }[] = [
    { key: 'github', icon: 'github', label: 'GitHub' },
    { key: 'linkedin', icon: 'linkedin', label: 'LinkedIn' },
    { key: 'scholar', icon: 'graduation-cap', label: 'Scholar' },
    { key: 'rss', icon: 'rss', label: 'RSS' },
  ];

  return (
    <footer className="bg-warm-gray-900 text-warm-gray-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h3 className="text-lg font-serif font-semibold text-white mb-1">
              {personalInfo.name}
            </h3>
            <p className="text-warm-gray-400 text-sm max-w-md">
              {personalInfo.title}
            </p>
          </div>

          <div className="flex space-x-4">
            {socials.map(
              (s) =>
                socialLinks?.[s.key] && (
                  <a
                    key={s.key}
                    href={socialLinks[s.key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="w-10 h-10 bg-warm-gray-800 hover:bg-sage-600 rounded-full flex items-center justify-center text-warm-gray-400 hover:text-white transition-all duration-300"
                  >
                    <Icon name={s.icon} aria-label={s.label} />
                  </a>
                ),
            )}
          </div>
        </div>

        <div className="border-t border-warm-gray-800 mt-8 pt-6 text-center text-sm text-warm-gray-500">
          © {year} {personalInfo.name}. 保留所有权利.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
