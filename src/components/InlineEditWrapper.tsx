import React from 'react';
import InlineEditor from './InlineEditor';
import ProjectEditor from './ProjectEditor';

interface InlineEditState {
  isVisible: boolean;
  type: string;
  data: unknown;
  index: number | null;
}

interface InlineEditWrapperProps {
  inlineEditState: InlineEditState;
  closeInlineEditor: () => void;
  handleInlineSave: (data: unknown) => void;
  openInlineEditor: (type: string, data: unknown, index: number | null) => void;
}

const InlineEditWrapper: React.FC<InlineEditWrapperProps> = ({
  inlineEditState,
  closeInlineEditor,
  handleInlineSave,
  openInlineEditor,
}) => {
  if (!inlineEditState.isVisible) return null;

  const isProject = inlineEditState.type === 'project';

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto animate-fade-in">
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full ${isProject ? 'max-w-5xl' : 'max-w-3xl'} max-h-[90vh] overflow-hidden border border-gray-100 transform transition-all scale-100`}
      >
        <div className="sticky top-0 bg-white/95 backdrop-blur border-b p-6 flex items-center justify-between z-10 rounded-t-2xl">
          <h2 className="text-xl font-bold text-gray-900 flex items-center">
            <i
              className={`fas ${inlineEditState.index === null ? 'fa-plus-circle' : 'fa-edit'} mr-3 text-blue-600`}
            ></i>
            {inlineEditState.index === null
              ? `新增${getLabel(inlineEditState.type)}`
              : `编辑${getLabel(inlineEditState.type)}`}
          </h2>
          <button
            onClick={closeInlineEditor}
            className="w-10 h-10 bg-gray-50 hover:bg-red-50 hover:text-red-600 rounded-full flex items-center justify-center transition-colors"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="p-8 overflow-y-auto max-h-[calc(90vh-140px)] custom-scrollbar">
          {isProject ? (
            <ProjectEditor
              formData={inlineEditState.data || {}}
              onChange={(field, value) =>
                openInlineEditor(
                  inlineEditState.type,
                  { ...inlineEditState.data, [field]: value },
                  inlineEditState.index,
                )
              }
            />
          ) : (
            <InlineEditor
              type={inlineEditState.type}
              data={inlineEditState.data}
              onSave={handleInlineSave}
              onClose={closeInlineEditor}
            />
          )}
        </div>

        {!isProject && (
          <div className="sticky bottom-0 bg-gray-50/95 backdrop-blur border-t p-4 flex justify-end space-x-3 rounded-b-2xl">
            <button
              onClick={closeInlineEditor}
              className="px-6 py-2.5 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium shadow-sm"
            >
              取消
            </button>
            <button
              onClick={() => handleInlineSave(inlineEditState.data)}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              {inlineEditState.index === null ? '确认添加' : '保存更改'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

const getLabel = (type: string) => {
  const map: Record<string, string> = {
    project: '项目',
    publication: '论文',
    internship: '实习',
    honor: '荣誉',
    'blog-academic': '学术博客',
    'blog-engineering': '技术博客',
    news: '动态',
  };
  return map[type] || '内容';
};

export default InlineEditWrapper;
