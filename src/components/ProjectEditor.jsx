import React from 'react';
import ModuleRenderer from './ModuleRenderer';

/**
 * 项目专用编辑器 - 终极修复版
 * 实现左右分栏：左侧编辑，右侧实时预览 (ModuleRenderer)
 */
const ProjectEditor = ({ formData, onChange }) => {
  const handleChange = (field, value) => {
    onChange(field, value);
  };

  const getTitle = (field, defaultTitle) => {
    return formData.customTitles?.[field] || defaultTitle;
  };

  const inputClass = "w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 focus:bg-white transition-all text-sm";
  const labelClass = "block text-xs font-bold text-gray-700 mb-1.5 flex items-center justify-between";
  const sectionClass = "mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100";

  // 辅助组件：自定义标题输入
  const CustomTitleInput = ({ field, defaultTitle }) => (
    <div className="flex items-center space-x-2 mb-1">
      <label className="text-xs font-medium text-gray-500">{defaultTitle}</label>
      <input
        type="text"
        placeholder="自定义标题..."
        value={formData.customTitles?.[field] || ''}
        onChange={(e) => onChange('customTitles', { ...formData.customTitles, [field]: e.target.value })}
        className="text-[10px] px-2 py-0.5 border border-gray-200 rounded bg-gray-50 focus:bg-white focus:border-blue-400 w-32 transition-all"
      />
    </div>
  );

  const getFieldDefaultTitle = (field) => {
    const titles = {
      businessContext: '业务背景', yourRole: '你的角色', architectureDetail: '技术架构详解',
      technicalChallenges: '核心技术难点', results: '实验结果/主要成果', achievements: '主要成就',
      interviewHighlights: '面试亮点', discussionTopics: '可延伸讨论的话题'
    };
    return titles[field] || field;
  };

  return (
    <div className="flex h-full gap-6">
      {/* 左侧：编辑表单 */}
      <div className="w-3/5 h-full overflow-y-auto custom-scrollbar pr-2">
        {/* 基础信息 */}
        <div className={sectionClass}>
          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center"><i className="fas fa-info-circle mr-2 text-blue-500"></i> 基础信息</h4>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>项目名称</label><input type="text" value={formData.title || ''} onChange={(e) => handleChange('title', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>时间段</label><input type="text" value={formData.period || ''} onChange={(e) => handleChange('period', e.target.value)} className={inputClass} placeholder="例如：2023.01 - 至今" /></div>
          </div>
          <div className="mt-4"><label className={labelClass}>项目摘要</label><textarea rows={3} value={formData.abstract || ''} onChange={(e) => handleChange('abstract', e.target.value)} className={inputClass} placeholder="一句话概括项目核心价值..." /></div>
          <div className="mt-4"><label className={labelClass}>状态</label>
            <select value={formData.status || '进行中'} onChange={(e) => handleChange('status', e.target.value)} className={inputClass}>
              <option value="已完成">已完成</option>
              <option value="论文发表">论文发表</option>
              <option value="已上线">已上线</option>
              <option value="生产部署">生产部署</option>
              <option value="进行中">进行中</option>
            </select>
          </div>
        </div>

        {/* 深度详情 (面试核心) */}
        <div className={sectionClass}>
          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center"><i className="fas fa-layer-group mr-2 text-indigo-500"></i> 深度详情</h4>
          
          {['businessContext', 'yourRole', 'architectureDetail'].map((field) => (
            <div key={field} className="mb-4 last:mb-0">
              <CustomTitleInput field={field} defaultTitle={getFieldDefaultTitle(field)} />
              <textarea rows={4} value={formData[field] || ''} onChange={(e) => handleChange(field, e.target.value)} className={`${inputClass} font-mono text-xs`} placeholder={`请输入${getTitle(field, getFieldDefaultTitle(field))}...`} />
            </div>
          ))}

          {['technicalChallenges', 'results', 'achievements', 'interviewHighlights', 'discussionTopics'].map((field) => (
            <div key={field} className="mb-4 last:mb-0">
              <CustomTitleInput field={field} defaultTitle={getFieldDefaultTitle(field)} />
              <textarea rows={5} value={Array.isArray(formData[field]) ? formData[field].join('\n') : (formData[field] || '')} onChange={(e) => handleChange(field, e.target.value.split('\n').filter(l => l.trim()))} className={`${inputClass} font-mono text-xs`} placeholder={`每行一条${getTitle(field, getFieldDefaultTitle(field))}...`} />
            </div>
          ))}
        </div>

        {/* 多媒体与外部链接 */}
        <div className={sectionClass}>
          <h4 className="text-sm font-bold text-gray-900 mb-4 flex items-center"><i className="fas fa-photo-video mr-2 text-purple-500"></i> 多媒体与链接</h4>
          <div className="grid grid-cols-2 gap-4">
            <div><label className={labelClass}>演示图片 URL</label><input type="text" value={formData.demoImage || ''} onChange={(e) => handleChange('demoImage', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>架构图 URL</label><input type="text" value={formData.architectureImage || ''} onChange={(e) => handleChange('architectureImage', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>GitHub 地址</label><input type="text" value={formData.githubUrl || ''} onChange={(e) => handleChange('githubUrl', e.target.value)} className={inputClass} /></div>
            <div><label className={labelClass}>在线演示 URL</label><input type="text" value={formData.liveUrl || ''} onChange={(e) => handleChange('liveUrl', e.target.value)} className={inputClass} /></div>
          </div>
          <div className="mt-4">
            <label className={labelClass}>技术标签 (逗号分隔)</label>
            <input type="text" value={Array.isArray(formData.tags) ? formData.tags.join(', ') : ''} onChange={(e) => handleChange('tags', e.target.value.split(/[,，]/).map(t => t.trim()).filter(t => t))} className={inputClass} />
          </div>
        </div>
      </div>

      {/* 右侧：实时预览 (强制调用 ModuleRenderer) */}
      <div className="w-2/5 h-full bg-gray-50 rounded-xl border border-gray-200 p-4 overflow-y-auto custom-scrollbar">
        <div className="sticky top-0 bg-gray-50 pb-2 mb-2 border-b border-gray-200 flex items-center justify-between">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">实时预览</h4>
          <i className="fas fa-eye text-blue-500 text-xs"></i>
        </div>
        <div className="transform scale-95 origin-top">
          <ModuleRenderer type="project" data={formData} isPreview={true} />
        </div>
      </div>
    </div>
  );
};

export default ProjectEditor;
