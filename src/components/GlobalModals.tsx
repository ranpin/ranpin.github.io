import React from 'react';
import ModuleRenderer from './ModuleRenderer';
import SmartRecommendations from './SmartRecommendations';

interface Article { title: string; [key: string]: any }
interface Paper { title: string; venue?: string; year?: string; authors?: string; citations?: number; type?: string; abstract?: string; [key: string]: any }
interface Blog { title: string; content?: string; date?: string; tags?: string[]; category?: string; [key: string]: any }
interface Internship { company: string; position: string; duration?: string; description?: string; [key: string]: any }

interface GlobalModalsProps {
  selectedArticle: Article | null;
  selectedPaper: Paper | null;
  selectedBlog: Blog | null;
  selectedInternship: Internship | null;
  onCloseArticle: () => void;
  onClosePaper: () => void;
  onCloseBlog: () => void;
  onCloseInternship: () => void;
  onRecommendClick: (item: any, type: string) => void;
}

const GlobalModals: React.FC<GlobalModalsProps> = ({
  selectedArticle,
  selectedPaper,
  selectedBlog,
  selectedInternship,
  onCloseArticle,
  onClosePaper,
  onCloseBlog,
  onCloseInternship,
  onRecommendClick
}) => {
  return (
    <>
      {/* 项目详情弹窗 */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 text-center flex-1">{selectedArticle.title}</h2>
              <button onClick={onCloseArticle} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors ml-4 flex-shrink-0">
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[calc(95vh-80px)]">
              <ModuleRenderer type="project" data={selectedArticle} isDetail={true} />
              <SmartRecommendations 
                currentItem={selectedArticle}
                currentType="project"
                onItemClick={onRecommendClick}
              />
            </div>
          </div>
        </div>
      )}

      {/* 论文详情弹窗 */}
      {selectedPaper && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 text-center flex-1">{selectedPaper.title}</h2>
              <button onClick={onClosePaper} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors ml-4 flex-shrink-0">
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[calc(95vh-80px)]">
              <div className="text-center mb-12">
                <div className="flex items-center justify-center space-x-4 mb-6">
                  <span className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium">{selectedPaper.type || '未知类型'}</span>
                  <span className="text-gray-500 font-mono text-lg">{selectedPaper.venue} • {selectedPaper.year}</span>
                </div>
                <p className="text-gray-600 text-lg mb-4"><strong>作者：</strong>{selectedPaper.authors}</p>
                {selectedPaper.citations && (
                  <p className="text-gray-500"><i className="fas fa-quote-right mr-2"></i>被引用 {selectedPaper.citations} 次</p>
                )}
              </div>
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center flex items-center justify-center">
                  <i className="fas fa-file-alt text-blue-500 mr-3"></i>论文摘要
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{selectedPaper.abstract}</p>
              </div>
              <SmartRecommendations 
                currentItem={selectedPaper}
                currentType="publication"
                onItemClick={onRecommendClick}
              />
            </div>
          </div>
        </div>
      )}

      {/* 博客详情弹窗 */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 text-center flex-1">{selectedBlog.title}</h2>
              <button onClick={onCloseBlog} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors ml-4 flex-shrink-0">
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[calc(95vh-80px)]">
              <div className="flex items-center space-x-4 mb-6 text-sm text-gray-500">
                <span><i className="far fa-calendar-alt mr-2"></i>{selectedBlog.date}</span>
                <span><i className="fas fa-tag mr-2"></i>{selectedBlog.category}</span>
              </div>
              <div className="prose prose-blue max-w-none">
                <p className="whitespace-pre-wrap">{selectedBlog.content}</p>
              </div>
              <SmartRecommendations 
                currentItem={selectedBlog}
                currentType="blog"
                onItemClick={onRecommendClick}
              />
            </div>
          </div>
        </div>
      )}

      {/* 实习详情弹窗 */}
      {selectedInternship && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[95vh] overflow-hidden">
            <div className="sticky top-0 bg-white border-b p-6 flex items-center justify-between z-10 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-gray-900 text-center flex-1">{selectedInternship.company}</h2>
              <button onClick={onCloseInternship} className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors ml-4 flex-shrink-0">
                <i className="fas fa-times text-gray-600"></i>
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[calc(95vh-80px)]">
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800">{selectedInternship.position}</h3>
                <p className="text-gray-500">{selectedInternship.duration}</p>
              </div>
              <div className="prose prose-blue max-w-none">
                <p className="whitespace-pre-wrap">{selectedInternship.description}</p>
              </div>
              <SmartRecommendations 
                currentItem={selectedInternship}
                currentType="internship"
                onItemClick={onRecommendClick}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default GlobalModals;
