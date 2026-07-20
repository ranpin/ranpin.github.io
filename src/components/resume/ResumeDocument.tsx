import React from 'react';
import Icon from '../Icon';
import RichText from './RichText';
import { THEMES, type ThemeClasses } from './resumeTheme';
import type {
  ResumeData,
  ResumeBasics,
  ResumeEducation,
  ResumeWork,
  ResumeProject,
  ResumeSkill,
  ResumeAward,
} from '../../types/resume';

/**
 * 纯展示组件：把 ResumeData 渲染成一份 A4 简历。
 * 支持多模板（classic / compact / sidebar）与配色主题，正文支持内联富文本。
 * 查看（ResumeSection）与打印（window.print + print.css）共用。
 * 传 id="resume-print" 的实例会被打印样式选中并单独输出为 PDF。
 */

interface ResumeDocumentProps {
  data: ResumeData;
  id?: string;
  className?: string;
}

const clean = (arr?: string[]) => (arr || []).filter((s) => s && s.trim());

const SectionTitle: React.FC<{
  icon: string;
  theme: ThemeClasses;
  onDark?: boolean;
  children: React.ReactNode;
}> = ({ icon, theme, onDark, children }) =>
  onDark ? (
    <h2 className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wide text-white/90 border-b border-white/30 pb-1 mb-2">
      <Icon name={icon} />
      {children}
    </h2>
  ) : (
    <h2
      className={`flex items-center gap-2 text-[15px] font-bold tracking-wide text-gray-900 border-b-2 ${theme.ruleBorder} pb-1 mb-3`}
    >
      <Icon name={icon} className={theme.icon} />
      {children}
    </h2>
  );

const ContactList: React.FC<{ basics: ResumeBasics; onDark?: boolean }> = ({
  basics,
  onDark,
}) => {
  const items: { icon: string; text: string; href?: string }[] = [];
  if (basics.email)
    items.push({
      icon: 'envelope',
      text: basics.email,
      href: `mailto:${basics.email}`,
    });
  if (basics.phone) items.push({ icon: 'phone', text: basics.phone });
  if (basics.location)
    items.push({ icon: 'map-marker-alt', text: basics.location });
  if (basics.github)
    items.push({
      icon: 'github',
      text: basics.github.replace(/^https?:\/\//, ''),
      href: basics.github,
    });
  if (basics.website)
    items.push({
      icon: 'external-link-alt',
      text: basics.website.replace(/^https?:\/\//, ''),
      href: basics.website,
    });

  return (
    <div
      className={
        onDark
          ? 'flex flex-col gap-1.5 text-[12px] text-white/90'
          : 'flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[13px]'
      }
    >
      {items.map((it, i) => {
        const inner = (
          <span
            className={`inline-flex items-center gap-1 ${
              onDark ? 'text-white/90' : 'text-gray-600'
            }`}
          >
            <Icon name={it.icon} className={onDark ? 'text-white/70' : 'text-gray-400'} />
            <span className="break-all">{it.text}</span>
          </span>
        );
        return it.href ? (
          <a
            key={i}
            href={it.href}
            target="_blank"
            rel="noreferrer"
            className={onDark ? 'hover:text-white' : 'hover:text-blue-600'}
          >
            {inner}
          </a>
        ) : (
          <React.Fragment key={i}>{inner}</React.Fragment>
        );
      })}
    </div>
  );
};

// 要点：整块作为 Markdown 富文本渲染（支持箭头/序列号列表、加粗、字号、链接等）。
// 未显式使用 markdown 标记的普通行，默认补成箭头列表项（保持简历要点的默认观感）。
const LIST_MARKER = /^\s*([-*+]|\d+[.)]|>|#{1,6})\s/;
const Highlights: React.FC<{ items?: string[] }> = ({ items }) => {
  const md = clean(items)
    .map((line) => (LIST_MARKER.test(line) ? line : `- ${line}`))
    .join('\n');
  return md ? <RichText className="mt-1">{md}</RichText> : null;
};

const Period: React.FC<{ text?: string }> = ({ text }) =>
  text ? (
    <span className="text-[12px] font-mono text-gray-500 shrink-0">{text}</span>
  ) : null;

// --- 各分区（可被不同模板复用）---

const EducationSection: React.FC<{
  items: ResumeEducation[];
  theme: ThemeClasses;
  dense?: boolean;
}> = ({ items, theme, dense }) => (
  <section className={dense ? 'mb-4' : 'mb-6'}>
    <SectionTitle icon="graduation-cap" theme={theme}>
      教育经历
    </SectionTitle>
    <div className={dense ? 'space-y-2' : 'space-y-3'}>
      {items.map((e, i) => (
        <div key={i} className="resume-block">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[14px] font-semibold text-gray-900">
              {e.school}
            </h3>
            <Period text={e.period} />
          </div>
          <div className="text-[13px] text-gray-600">
            {[e.degree, e.major].filter(Boolean).join(' · ')}
            {e.gpa && <span> · GPA {e.gpa}</span>}
          </div>
          {e.detail && <RichText className="mt-0.5">{e.detail}</RichText>}
        </div>
      ))}
    </div>
  </section>
);

const WorkSection: React.FC<{
  items: ResumeWork[];
  theme: ThemeClasses;
  dense?: boolean;
}> = ({ items, theme, dense }) => (
  <section className={dense ? 'mb-4' : 'mb-6'}>
    <SectionTitle icon="briefcase" theme={theme}>
      工作经历
    </SectionTitle>
    <div className={dense ? 'space-y-2' : 'space-y-3'}>
      {items.map((w, i) => (
        <div key={i} className="resume-block">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[14px] font-semibold text-gray-900">
              {w.position ? `${w.position} · ${w.company}` : w.company}
            </h3>
            <Period text={w.period} />
          </div>
          {w.location && (
            <div className="text-[12px] text-gray-500">{w.location}</div>
          )}
          <Highlights items={w.highlights} />
        </div>
      ))}
    </div>
  </section>
);

const ProjectSection: React.FC<{
  items: ResumeProject[];
  theme: ThemeClasses;
  dense?: boolean;
}> = ({ items, theme, dense }) => (
  <section className={dense ? 'mb-4' : 'mb-6'}>
    <SectionTitle icon="code" theme={theme}>
      项目经历
    </SectionTitle>
    <div className={dense ? 'space-y-2' : 'space-y-3'}>
      {items.map((p, i) => (
        <div key={i} className="resume-block">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[14px] font-semibold text-gray-900">
              {p.name}
              {p.role && (
                <span className="font-normal text-gray-600"> · {p.role}</span>
              )}
            </h3>
            <Period text={p.period} />
          </div>
          {clean(p.tech).length > 0 && (
            <div className="text-[12px] text-gray-500 mt-0.5">
              {clean(p.tech).join(' / ')}
            </div>
          )}
          <Highlights items={p.highlights} />
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[12px] text-blue-600 hover:underline mt-1"
            >
              <Icon name="external-link-alt" />
              {p.link.replace(/^https?:\/\//, '')}
            </a>
          )}
        </div>
      ))}
    </div>
  </section>
);

const SkillsSection: React.FC<{
  items: ResumeSkill[];
  theme: ThemeClasses;
  onDark?: boolean;
  dense?: boolean;
}> = ({ items, theme, onDark, dense }) => (
  <section className={dense ? 'mb-4' : 'mb-6'}>
    <SectionTitle icon="cogs" theme={theme} onDark={onDark}>
      专业技能
    </SectionTitle>
    <div className="space-y-1.5">
      {items.map((s, i) => (
        <div
          key={i}
          className={`resume-block text-[13px] ${
            onDark ? 'text-white/90' : 'text-gray-700'
          }`}
        >
          {s.category && (
            <span
              className={`font-semibold ${onDark ? 'text-white' : 'text-gray-900'}`}
            >
              {s.category}：
            </span>
          )}
          {clean(s.items).join('、')}
        </div>
      ))}
    </div>
  </section>
);

const AwardsSection: React.FC<{
  items: ResumeAward[];
  theme: ThemeClasses;
  onDark?: boolean;
  dense?: boolean;
}> = ({ items, theme, onDark, dense }) => (
  <section className={dense ? 'mb-2' : 'mb-2'}>
    <SectionTitle icon="trophy" theme={theme} onDark={onDark}>
      荣誉奖项
    </SectionTitle>
    <ul
      className={`space-y-1 text-[13px] ${onDark ? 'text-white/90' : 'text-gray-700'}`}
    >
      {items.map((a, i) => (
        <li
          key={i}
          className={`resume-block ${
            onDark
              ? ''
              : 'flex items-baseline justify-between gap-3'
          }`}
        >
          <span>
            {a.title}
            {a.issuer && (
              <span className={onDark ? 'text-white/70' : 'text-gray-500'}>
                {' '}
                · {a.issuer}
              </span>
            )}
          </span>
          {a.date &&
            (onDark ? (
              <span className="text-[12px] text-white/60"> （{a.date}）</span>
            ) : (
              <Period text={a.date} />
            ))}
        </li>
      ))}
    </ul>
  </section>
);

const SummarySection: React.FC<{
  summary: string;
  theme: ThemeClasses;
  dense?: boolean;
}> = ({ summary, theme, dense }) => (
  <section className={`resume-block ${dense ? 'mb-4' : 'mb-6'}`}>
    <SectionTitle icon="user" theme={theme}>
      个人简介
    </SectionTitle>
    <RichText>{summary}</RichText>
  </section>
);

// --- 模板 ---

const SidebarLayout: React.FC<{ data: ResumeData; theme: ThemeClasses }> = ({
  data,
  theme,
}) => {
  const { basics } = data;
  return (
    <div className="grid grid-cols-[34%_1fr]">
      {/* 侧栏 */}
      <aside
        className={`${theme.sidebarBg} resume-color-exact text-white px-6 py-8`}
      >
        <div className="resume-block mb-6">
          <h1 className="text-2xl font-bold leading-tight">{basics.name}</h1>
          {basics.title && (
            <p className="mt-1 text-[13px] text-white/80">{basics.title}</p>
          )}
        </div>
        <div className="resume-block mb-6">
          <SectionTitle icon="paper-plane" theme={theme} onDark>
            联系方式
          </SectionTitle>
          <ContactList basics={basics} onDark />
        </div>
        {data.skills && data.skills.length > 0 && (
          <SkillsSection items={data.skills} theme={theme} onDark />
        )}
        {data.awards && data.awards.length > 0 && (
          <AwardsSection items={data.awards} theme={theme} onDark />
        )}
      </aside>

      {/* 主栏 */}
      <div className="px-8 py-8">
        {basics.summary && (
          <SummarySection summary={basics.summary} theme={theme} />
        )}
        {data.work && data.work.length > 0 && (
          <WorkSection items={data.work} theme={theme} />
        )}
        {data.projects && data.projects.length > 0 && (
          <ProjectSection items={data.projects} theme={theme} />
        )}
        {data.education && data.education.length > 0 && (
          <EducationSection items={data.education} theme={theme} />
        )}
      </div>
    </div>
  );
};

const SingleColumnLayout: React.FC<{
  data: ResumeData;
  theme: ThemeClasses;
  dense?: boolean;
}> = ({ data, theme, dense }) => {
  const { basics } = data;
  return (
    <div className={dense ? 'px-8 sm:px-10 py-8' : 'px-8 sm:px-12 py-10'}>
      <header
        className={`resume-block text-center border-b border-gray-200 ${
          dense ? 'pb-4 mb-4' : 'pb-5 mb-6'
        }`}
      >
        <h1
          className={`${dense ? 'text-2xl' : 'text-3xl'} font-bold text-gray-900`}
        >
          {basics.name}
        </h1>
        {basics.title && (
          <p className={`mt-1 text-[15px] font-medium ${theme.title}`}>
            {basics.title}
          </p>
        )}
        <div className="mt-3">
          <ContactList basics={basics} />
        </div>
      </header>

      {basics.summary && (
        <SummarySection summary={basics.summary} theme={theme} dense={dense} />
      )}
      {data.education && data.education.length > 0 && (
        <EducationSection items={data.education} theme={theme} dense={dense} />
      )}
      {data.work && data.work.length > 0 && (
        <WorkSection items={data.work} theme={theme} dense={dense} />
      )}
      {data.projects && data.projects.length > 0 && (
        <ProjectSection items={data.projects} theme={theme} dense={dense} />
      )}
      {data.skills && data.skills.length > 0 && (
        <SkillsSection items={data.skills} theme={theme} dense={dense} />
      )}
      {data.awards && data.awards.length > 0 && (
        <AwardsSection items={data.awards} theme={theme} dense={dense} />
      )}
    </div>
  );
};

const ResumeDocument: React.FC<ResumeDocumentProps> = ({
  data,
  id,
  className = '',
}) => {
  const theme = THEMES[data.theme || 'blue'];
  const template = data.template || 'classic';

  return (
    <div
      id={id}
      className={`resume-page bg-white text-gray-800 mx-auto w-full max-w-[820px] ${className}`}
    >
      {template === 'sidebar' ? (
        <SidebarLayout data={data} theme={theme} />
      ) : (
        <SingleColumnLayout
          data={data}
          theme={theme}
          dense={template === 'compact'}
        />
      )}
    </div>
  );
};

export default ResumeDocument;
