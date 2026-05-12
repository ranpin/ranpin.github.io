import React from 'react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import EditableCard from './EditableCard';

interface ResumeSectionProps {
  resumeCategory: string;
  isAdminMode: boolean;
  openInlineEditor: (type: string, data: unknown, index: number | null) => void;
  handleDeleteWithUndo: (type: string, index: number) => void;
  handleInsertAt: (type: string, index: number) => void;
  handleArticleClick: (article: unknown) => void;
  handlePaperClick: (paper: unknown) => void;
  handleInternshipClick: (internship: unknown) => void;
}

const ResumeSection: React.FC<ResumeSectionProps> = ({
  resumeCategory,
  isAdminMode,
  openInlineEditor,
  handleDeleteWithUndo,
  handleInsertAt,
  handleArticleClick,
  handlePaperClick,
  handleInternshipClick,
}) => {
  const { projects, publications, internships, honors, customContent } =
    usePortfolioStore();

  // 项目经历
  if (resumeCategory === 'projects') {
    return (
      <div className="space-y-4">
        {projects.map((project, index) => (
          <EditableCard
            key={project.id || index}
            isAdminMode={isAdminMode}
            onEdit={() => openInlineEditor('project', project, index)}
            onDelete={() => handleDeleteWithUndo('project', index)}
            onInsertBefore={() => handleInsertAt('project', index)}
            onInsertAfter={() => handleInsertAt('project', index + 1)}
            className="border-l-4 border-blue-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div onClick={() => handleArticleClick(project)}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="text-lg font-medium text-gray-800 hover:text-blue-600 transition-colors">
                      {project.title || '未命名项目'}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        project.status === '已完成'
                          ? 'bg-green-100 text-green-700'
                          : project.status === '论文发表'
                            ? 'bg-purple-100 text-purple-700'
                            : project.status === '已上线'
                              ? 'bg-blue-100 text-blue-700'
                              : project.status === '生产部署'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {project.status || '未知状态'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2 font-mono">
                    {project.period || '时间未知'}
                  </div>
                </div>
                <i className="fas fa-chevron-right text-gray-300 hover:text-blue-500 transition-colors text-sm"></i>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {project.description || '暂无描述'}
              </p>

              <div className="flex flex-wrap gap-2">
                {project.tags && Array.isArray(project.tags) ? (
                  project.tags.map((tag, tagIndex) => (
                    <span
                      key={`${tag}-${tagIndex}`}
                      className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                    暂无标签
                  </span>
                )}
              </div>
            </div>
          </EditableCard>
        ))}
        {projects.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-code text-4xl mb-4"></i>
            <p>暂无项目数据</p>
            {isAdminMode && (
              <p className="text-sm mt-2">点击任意位置插入点添加新项目</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // 学术论文
  if (resumeCategory === 'publications') {
    return (
      <div className="space-y-4">
        {publications.map((paper, index) => (
          <EditableCard
            key={paper.id || index}
            isAdminMode={isAdminMode}
            onEdit={() => openInlineEditor('publication', paper, index)}
            onDelete={() => handleDeleteWithUndo('publication', index)}
            onInsertBefore={() => handleInsertAt('publication', index)}
            onInsertAfter={() => handleInsertAt('publication', index + 1)}
            className="border-l-4 border-green-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div onClick={() => handlePaperClick(paper)}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="text-lg font-medium text-gray-800 hover:text-green-600 transition-colors">
                      {paper.title || '未命名论文'}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        paper.type === '会议论文'
                          ? 'bg-blue-100 text-blue-700'
                          : paper.type === '期刊论文'
                            ? 'bg-green-100 text-green-700'
                            : paper.type === '预印本'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {paper.type || '未知类型'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <span className="font-medium">
                      {paper.authors || '未知作者'}
                    </span>
                    {paper.venue && <span> • {paper.venue}</span>}
                    {paper.year && <span> • {paper.year}</span>}
                  </div>
                </div>
                <i className="fas fa-chevron-right text-gray-300 hover:text-green-500 transition-colors text-sm"></i>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {paper.abstract || '暂无摘要'}
              </p>

              <div className="flex items-center space-x-4 text-xs text-gray-500">
                {paper.citations && (
                  <span className="flex items-center">
                    <i className="fas fa-quote-right mr-1"></i>
                    引用 {paper.citations}
                  </span>
                )}
                {paper.pdfUrl && (
                  <span className="flex items-center text-blue-600">
                    <i className="fas fa-file-pdf mr-1"></i>
                    PDF
                  </span>
                )}
                {paper.codeUrl && (
                  <span className="flex items-center text-green-600">
                    <i className="fas fa-code mr-1"></i>
                    代码
                  </span>
                )}
              </div>
            </div>
          </EditableCard>
        ))}
        {publications.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-file-alt text-4xl mb-4"></i>
            <p>暂无学术论文</p>
            {isAdminMode && (
              <p className="text-sm mt-2">点击任意位置插入点添加新论文</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // 工作&实习经历
  if (resumeCategory === 'internships') {
    return (
      <div className="space-y-4">
        {internships.map((internship, index) => (
          <EditableCard
            key={internship.id || index}
            isAdminMode={isAdminMode}
            onEdit={() => openInlineEditor('internship', internship, index)}
            onDelete={() => handleDeleteWithUndo('internship', index)}
            onInsertBefore={() => handleInsertAt('internship', index)}
            onInsertAfter={() => handleInsertAt('internship', index + 1)}
            className="border-l-4 border-purple-500 pl-6 py-4 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            <div onClick={() => handleInternshipClick(internship)}>
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <h3 className="text-lg font-medium text-gray-800 hover:text-purple-600 transition-colors">
                      {internship.position || '未命名职位'} @{' '}
                      {internship.company || '未知公司'}
                    </h3>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        internship.type === '实习'
                          ? 'bg-blue-100 text-blue-700'
                          : internship.type === '全职'
                            ? 'bg-green-100 text-green-700'
                            : internship.type === '兼职'
                              ? 'bg-yellow-100 text-yellow-700'
                              : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {internship.type || '未知类型'}
                    </span>
                  </div>
                  <div className="text-sm text-gray-500 mb-2 font-mono">
                    {internship.period || '时间未知'}
                    {internship.location && (
                      <span> • {internship.location}</span>
                    )}
                  </div>
                </div>
                <i className="fas fa-chevron-right text-gray-300 hover:text-purple-500 transition-colors text-sm"></i>
              </div>

              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                {internship.description || '暂无描述'}
              </p>

              <div className="flex flex-wrap gap-2">
                {internship.skills && Array.isArray(internship.skills) ? (
                  internship.skills.map((skill, skillIndex) => (
                    <span
                      key={`${skill}-${skillIndex}`}
                      className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs font-medium"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded text-xs font-medium">
                    暂无技能标签
                  </span>
                )}
              </div>
            </div>
          </EditableCard>
        ))}
        {internships.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-briefcase text-4xl mb-4"></i>
            <p>暂无工作经历</p>
            {isAdminMode && (
              <p className="text-sm mt-2">点击任意位置插入点添加新经历</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // 荣誉奖项
  if (resumeCategory === 'honors') {
    return (
      <div className="space-y-4">
        {honors.map((honor, index) => (
          <EditableCard
            key={honor.id || index}
            isAdminMode={isAdminMode}
            onEdit={() => openInlineEditor('honor', honor, index)}
            onDelete={() => handleDeleteWithUndo('honor', index)}
            onInsertBefore={() => handleInsertAt('honor', index)}
            onInsertAfter={() => handleInsertAt('honor', index + 1)}
            className="border-l-4 border-yellow-500 pl-6 py-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="text-lg font-medium text-gray-800">
                    {honor.award || '未命名奖项'}
                  </h3>
                  {honor.level && (
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        honor.level === '国际级'
                          ? 'bg-red-100 text-red-700'
                          : honor.level === '国家级'
                            ? 'bg-blue-100 text-blue-700'
                            : honor.level === '省级'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {honor.level}
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  <span className="font-medium">
                    {honor.organization || '未知机构'}
                  </span>
                  {honor.year && <span> • {honor.year}</span>}
                </div>
                {honor.description && (
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {honor.description}
                  </p>
                )}
              </div>
            </div>
          </EditableCard>
        ))}
        {honors.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-trophy text-4xl mb-4"></i>
            <p>暂无荣誉奖项</p>
            {isAdminMode && (
              <p className="text-sm mt-2">点击任意位置插入点添加新奖项</p>
            )}
          </div>
        )}
      </div>
    );
  }

  // 自定义分类内容
  if (resumeCategory.startsWith('custom_')) {
    const categoryContent = customContent.filter(
      (item) => item.customCategory === resumeCategory,
    );

    if (categoryContent.length === 0) {
      return (
        <div className="text-center py-12 text-gray-500">
          <i className="fas fa-folder-open text-4xl mb-4"></i>
          <p>该分类下暂无内容</p>
          <p className="text-sm mt-2">请通过管理面板添加内容</p>
        </div>
      );
    }

    return (
      <div className="space-y-4">
        {categoryContent.map((item, index) => (
          <div
            key={item.id || index}
            className="border-l-4 border-indigo-500 pl-6 py-4 hover:bg-gray-50 transition-colors group"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-1">
                  <h3 className="text-lg font-medium text-gray-800">
                    {item.title || '未命名内容'}
                  </h3>
                  {item.status && (
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        item.status === '已完成'
                          ? 'bg-green-100 text-green-700'
                          : item.status === '进行中'
                            ? 'bg-blue-100 text-blue-700'
                            : item.status === '已发布'
                              ? 'bg-purple-100 text-purple-700'
                              : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {item.status}
                    </span>
                  )}
                </div>
                {item.period && (
                  <div className="text-sm text-gray-500 mb-2 font-mono">
                    {item.period}
                  </div>
                )}
              </div>
            </div>

            <p className="text-gray-600 text-sm leading-relaxed mb-3">
              {item.description || item.content || '暂无描述'}
            </p>

            {item.tags && Array.isArray(item.tags) && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag, tagIndex) => (
                  <span
                    key={`${tag}-${tagIndex}`}
                    className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded text-xs font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  }

  return null;
};

export default ResumeSection;
