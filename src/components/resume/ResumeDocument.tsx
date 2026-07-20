import React from 'react';
import Icon from '../Icon';
import type { ResumeData } from '../../types/resume';

/**
 * 纯展示组件：把 ResumeData 渲染成一份干净的 A4 简历。
 * 查看（ResumeSection）与打印（window.print + print.css）共用。
 * 传 id="resume-print" 的实例会被打印样式选中并单独输出为 PDF。
 */

interface ResumeDocumentProps {
  data: ResumeData;
  id?: string;
  className?: string;
}

const SectionTitle: React.FC<{ icon: string; children: React.ReactNode }> = ({
  icon,
  children,
}) => (
  <h2 className="flex items-center gap-2 text-[15px] font-bold tracking-wide text-gray-900 border-b-2 border-blue-600 pb-1 mb-3">
    <Icon name={icon} className="text-blue-600" />
    {children}
  </h2>
);

const ContactItem: React.FC<{ icon: string; text: string; href?: string }> = ({
  icon,
  text,
  href,
}) => {
  const inner = (
    <span className="inline-flex items-center gap-1 text-gray-600">
      <Icon name={icon} className="text-gray-400" />
      {text}
    </span>
  );
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className="hover:text-blue-600">
      {inner}
    </a>
  ) : (
    inner
  );
};

const Bullets: React.FC<{ items?: string[] }> = ({ items }) => {
  const rows = (items || []).filter((s) => s && s.trim());
  return rows.length > 0 ? (
    <ul className="mt-1 list-disc pl-5 space-y-0.5 text-[13px] leading-relaxed text-gray-700">
      {rows.map((h, i) => (
        <li key={i}>{h}</li>
      ))}
    </ul>
  ) : null;
};

const ResumeDocument: React.FC<ResumeDocumentProps> = ({
  data,
  id,
  className = '',
}) => {
  const { basics } = data;
  const website = basics.website;
  const github = basics.github;

  return (
    <div
      id={id}
      className={`bg-white text-gray-800 mx-auto w-full max-w-[820px] px-8 sm:px-12 py-10 ${className}`}
    >
      {/* 头部：姓名 + 头衔 + 联系方式 */}
      <header className="resume-block text-center border-b border-gray-200 pb-5 mb-6">
        <h1 className="text-3xl font-bold text-gray-900">{basics.name}</h1>
        {basics.title && (
          <p className="mt-1 text-[15px] text-blue-700 font-medium">
            {basics.title}
          </p>
        )}
        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-5 gap-y-1 text-[13px]">
          {basics.email && (
            <ContactItem
              icon="envelope"
              text={basics.email}
              href={`mailto:${basics.email}`}
            />
          )}
          {basics.phone && <ContactItem icon="phone" text={basics.phone} />}
          {basics.location && (
            <ContactItem icon="map-marker-alt" text={basics.location} />
          )}
          {github && (
            <ContactItem
              icon="github"
              text={github.replace(/^https?:\/\//, '')}
              href={github}
            />
          )}
          {website && (
            <ContactItem
              icon="external-link-alt"
              text={website.replace(/^https?:\/\//, '')}
              href={website}
            />
          )}
        </div>
      </header>

      {/* 个人简介 */}
      {basics.summary && (
        <section className="resume-block mb-6">
          <SectionTitle icon="user">个人简介</SectionTitle>
          <p className="text-[13px] leading-relaxed text-gray-700">
            {basics.summary}
          </p>
        </section>
      )}

      {/* 教育经历 */}
      {data.education && data.education.length > 0 && (
        <section className="mb-6">
          <SectionTitle icon="graduation-cap">教育经历</SectionTitle>
          <div className="space-y-3">
            {data.education.map((e, i) => (
              <div key={i} className="resume-block">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[14px] font-semibold text-gray-900">
                    {e.school}
                  </h3>
                  {e.period && (
                    <span className="text-[12px] font-mono text-gray-500 shrink-0">
                      {e.period}
                    </span>
                  )}
                </div>
                <div className="text-[13px] text-gray-600">
                  {[e.degree, e.major].filter(Boolean).join(' · ')}
                  {e.gpa && <span> · GPA {e.gpa}</span>}
                </div>
                {e.detail && (
                  <p className="text-[13px] text-gray-700 mt-0.5">{e.detail}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 工作经历 */}
      {data.work && data.work.length > 0 && (
        <section className="mb-6">
          <SectionTitle icon="briefcase">工作经历</SectionTitle>
          <div className="space-y-3">
            {data.work.map((w, i) => (
              <div key={i} className="resume-block">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[14px] font-semibold text-gray-900">
                    {w.position ? `${w.position} · ${w.company}` : w.company}
                  </h3>
                  {w.period && (
                    <span className="text-[12px] font-mono text-gray-500 shrink-0">
                      {w.period}
                    </span>
                  )}
                </div>
                {w.location && (
                  <div className="text-[12px] text-gray-500">{w.location}</div>
                )}
                <Bullets items={w.highlights} />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 项目经历 */}
      {data.projects && data.projects.length > 0 && (
        <section className="mb-6">
          <SectionTitle icon="code">项目经历</SectionTitle>
          <div className="space-y-3">
            {data.projects.map((p, i) => (
              <div key={i} className="resume-block">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-[14px] font-semibold text-gray-900">
                    {p.name}
                    {p.role && (
                      <span className="font-normal text-gray-600">
                        {' '}
                        · {p.role}
                      </span>
                    )}
                  </h3>
                  {p.period && (
                    <span className="text-[12px] font-mono text-gray-500 shrink-0">
                      {p.period}
                    </span>
                  )}
                </div>
                {p.tech && p.tech.filter(Boolean).length > 0 && (
                  <div className="text-[12px] text-gray-500 mt-0.5">
                    {p.tech.filter(Boolean).join(' / ')}
                  </div>
                )}
                <Bullets items={p.highlights} />
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
      )}

      {/* 专业技能 */}
      {data.skills && data.skills.length > 0 && (
        <section className="mb-6">
          <SectionTitle icon="cogs">专业技能</SectionTitle>
          <div className="space-y-1.5">
            {data.skills.map((s, i) => (
              <div key={i} className="resume-block text-[13px] text-gray-700">
                {s.category && (
                  <span className="font-semibold text-gray-900">
                    {s.category}：
                  </span>
                )}
                {(s.items || []).filter(Boolean).join('、')}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 荣誉奖项 */}
      {data.awards && data.awards.length > 0 && (
        <section className="mb-2">
          <SectionTitle icon="trophy">荣誉奖项</SectionTitle>
          <ul className="space-y-1 text-[13px] text-gray-700">
            {data.awards.map((a, i) => (
              <li
                key={i}
                className="resume-block flex items-baseline justify-between gap-3"
              >
                <span>
                  {a.title}
                  {a.issuer && (
                    <span className="text-gray-500"> · {a.issuer}</span>
                  )}
                </span>
                {a.date && (
                  <span className="text-[12px] font-mono text-gray-500 shrink-0">
                    {a.date}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
};

export default ResumeDocument;
