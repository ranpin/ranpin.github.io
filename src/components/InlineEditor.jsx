import React, { useState, useEffect } from 'react';
import ModuleRenderer from './ModuleRenderer';

const InlineEditor = ({ type, data, onSave, onClose }) => {
  const [formData, setFormData] = useState({ ...data });

  useEffect(() => {
    setFormData({ ...data });
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNestedChange = (field, subField, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: { ...prev[field], [subField]: value }
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  // 通用输入样式
  const inputClass = "w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-sm";
  const labelClass = "block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1 mt-3";

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[85vh] flex overflow-hidden animate-fade-in">
        
        {/* 左侧：编辑区 */}
        <div className="flex-1 flex flex-col border-r border-gray-100">
          <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
            <h3 className="font-bold text-gray-800">编辑模块: {type}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-red-500"><i className="fas fa-times"></i></button>
          </div>
          
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
            {type === 'project' && (
              <>
                <div><label className={labelClass}>项目名称</label><input name="title" value={formData.title || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>业务背景</label><textarea name="businessContext" value={formData.businessContext || ''} onChange={handleChange} rows={3} className={inputClass} /></div>
                <div><label className={labelClass}>你的角色</label><textarea name="yourRole" value={formData.yourRole || ''} onChange={handleChange} rows={3} className={inputClass} /></div>
                <div><label className={labelClass}>技术架构详解</label><textarea name="architectureDetail" value={formData.architectureDetail || ''} onChange={handleChange} rows={4} className={inputClass} /></div>
                
                <div className="pt-4 border-t">
                  <label className={labelClass}>核心技术难点 (每行一个)</label>
                  <textarea 
                    name="technicalChallenges" 
                    value={Array.isArray(formData.technicalChallenges) ? formData.technicalChallenges.map(c => typeof c === 'object' ? `${c.challenge} -> ${c.solution}` : c).join('\n') : formData.technicalChallenges || ''} 
                    onChange={(e) => {
                      const lines = e.target.value.split('\n').filter(l => l.trim());
                      setFormData(prev => ({ ...prev, technicalChallenges: lines.map(l => ({ challenge: l.split('->')[0]?.trim(), solution: l.split('->')[1]?.trim() || '待补充' })) }));
                    }} 
                    rows={4} 
                    className={inputClass} 
                    placeholder="挑战内容 -> 解决方案"
                  />
                </div>

                <div><label className={labelClass}>面试亮点 (每行一个)</label><textarea name="interviewHighlights" value={Array.isArray(formData.interviewHighlights) ? formData.interviewHighlights.join('\n') : ''} onChange={(e) => setFormData(prev => ({ ...prev, interviewHighlights: e.target.value.split('\n').filter(l => l) }))} rows={3} className={inputClass} /></div>
                <div><label className={labelClass}>可延伸讨论的话题</label><textarea name="discussionTopics" value={Array.isArray(formData.discussionTopics) ? formData.discussionTopics.join('\n') : ''} onChange={(e) => setFormData(prev => ({ ...prev, discussionTopics: e.target.value.split('\n').filter(l => l) }))} rows={3} className={inputClass} /></div>
              </>
            )}

            {type === 'news' && (
              <>
                <div><label className={labelClass}>日期</label><input name="date" value={formData.date || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>内容</label><textarea name="content" value={formData.content || ''} onChange={handleChange} rows={4} className={inputClass} /></div>
              </>
            )}

            {type === 'internship' && (
              <>
                <div><label className={labelClass}>公司</label><input name="company" value={formData.company || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>职位</label><input name="position" value={formData.position || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>主要贡献 (每行一个)</label><textarea name="contributions" value={Array.isArray(formData.contributions) ? formData.contributions.join('\n') : ''} onChange={(e) => setFormData(prev => ({ ...prev, contributions: e.target.value.split('\n').filter(l => l) }))} rows={4} className={inputClass} /></div>
              </>
            )}

            {type === 'honor' && (
              <>
                <div><label className={labelClass}>奖项名称</label><input name="award" value={formData.award || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>颁发机构</label><input name="organization" value={formData.organization || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>年份</label><input name="year" value={formData.year || ''} onChange={handleChange} className={inputClass} /></div>
              </>
            )}

            {type === 'publication' && (
              <>
                <div><label className={labelClass}>论文标题</label><input name="title" value={formData.title || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>作者</label><input name="authors" value={formData.authors || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>发表刊物</label><input name="venue" value={formData.venue || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>年份</label><input name="year" value={formData.year || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>链接</label><input name="link" value={formData.link || ''} onChange={handleChange} className={inputClass} /></div>
              </>
            )}

            {type === 'personal-info' && (
              <>
                <div><label className={labelClass}>姓名</label><input name="name" value={formData.name || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>职位</label><input name="title" value={formData.title || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>地点</label><input name="location" value={formData.location || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>邮箱</label><input name="email" value={formData.email || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>主要简介</label><textarea value={formData.bio?.main || ''} onChange={(e) => handleNestedChange('bio', 'main', e.target.value)} rows={3} className={inputClass} /></div>
                <div><label className={labelClass}>详细简介</label><textarea value={formData.bio?.detail || ''} onChange={(e) => handleNestedChange('bio', 'detail', e.target.value)} rows={3} className={inputClass} /></div>
              </>
            )}

            {(type === 'blog-academic' || type === 'blog-engineering') && (
              <>
                <div><label className={labelClass}>标题</label><input name="title" value={formData.title || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>日期</label><input name="date" value={formData.date || ''} onChange={handleChange} className={inputClass} /></div>
                <div><label className={labelClass}>摘要</label><textarea name="summary" value={formData.summary || ''} onChange={handleChange} rows={3} className={inputClass} /></div>
                <div><label className={labelClass}>标签 (逗号分隔)</label><input name="tags" value={Array.isArray(formData.tags) ? formData.tags.join(', ') : formData.tags || ''} onChange={(e) => setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(t => t.trim()).filter(Boolean) }))} className={inputClass} /></div>
                <div><label className={labelClass}>链接</label><input name="link" value={formData.link || ''} onChange={handleChange} className={inputClass} /></div>
              </>
            )}
            
            <div className="pt-6 flex justify-end space-x-3">
              <button type="button" onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg">取消</button>
              <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md">保存更改</button>
            </div>
          </form>
        </div>

        {/* 右侧：实时预览区 - 强制调用 ModuleRenderer */}
        <div className="w-[45%] bg-gray-50 p-6 overflow-y-auto">
          <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4 sticky top-0 bg-gray-50 pb-2">实时预览效果</h4>
          <div className="transform scale-95 origin-top">
            <ModuleRenderer type={type} data={formData} isDetail={true} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default InlineEditor;
