import React from 'react';
import Icon from './Icon';
import { homeIntro, homeCategories } from '../data/projects';

// 首页内容与排版直接采用 GitHub 主页 ranpin/ranpin 的 profile README：
// 单栏文档式布局（自我介绍 + 分类项目总览），不再使用左右两列的资料卡 + 动态时间轴。
const HomeSection: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto">
      {/* 自我介绍 */}
      <h2 className="text-2xl sm:text-3xl font-bold text-warm-gray-900 leading-snug">
        {homeIntro.greeting}
      </h2>
      <ul className="mt-4 space-y-1.5 text-warm-gray-700 leading-relaxed">
        <li>{homeIntro.focus}</li>
        <li>{homeIntro.tech}</li>
      </ul>

      {/* 站点入口 */}
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
        {homeIntro.links.map((l, i) => (
          <React.Fragment key={l.url}>
            {i > 0 && (
              <span className="text-warm-gray-300" aria-hidden="true">
                ｜
              </span>
            )}
            <a
              href={l.url}
              className="inline-flex items-center gap-1.5 text-sage-700 hover:text-sage-900 font-medium transition-colors"
            >
              <span aria-hidden="true">{l.emoji}</span>
              {l.label}
            </a>
          </React.Fragment>
        ))}
      </div>

      <hr className="my-8 border-warm-gray-200" />

      {/* 分类项目总览 */}
      <div className="space-y-9">
        {homeCategories.map((cat) => (
          <section key={cat.title}>
            <h3 className="text-lg font-semibold text-warm-gray-900 flex items-baseline flex-wrap gap-x-2">
              <span aria-hidden="true">{cat.emoji}</span>
              <span>{cat.title}</span>
              {cat.note && (
                <span className="text-sm font-normal text-warm-gray-400">
                  （{cat.note}）
                </span>
              )}
            </h3>
            <ul className="mt-3 space-y-2">
              {cat.projects.map((p) => (
                <li
                  key={p.name}
                  className="text-warm-gray-700 leading-relaxed pl-4 border-l-2 border-warm-gray-100"
                >
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-semibold text-warm-gray-900 hover:text-sage-700 transition-colors"
                  >
                    {p.name}
                  </a>
                  {p.demo && (
                    <a
                      href={p.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-2 inline-flex items-center gap-1 text-xs font-medium text-sage-600 hover:text-sage-800 transition-colors"
                      title="在线演示"
                    >
                      <Icon name="external-link-alt" className="w-3 h-3" />
                      演示
                    </a>
                  )}
                  <span className="text-warm-gray-500"> — {p.desc}</span>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
};

export default HomeSection;
