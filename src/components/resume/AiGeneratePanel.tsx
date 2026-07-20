import React, { useState } from 'react';
import Icon from '../Icon';

/**
 * AI 生成简历入口（占位）。
 * 后续规划：读取技术文档（edge-ai-docs）+ 岗位 JD → 由 Claude 生成 ResumeData，
 * 写入本地草稿供编辑/导出。预留接口签名见下方 generateResume。
 *
 * 注：纯静态站前端不能内置 API 密钥，真实生成需后期加一个轻量代理或本地运行。
 */

// 预留接口（后期实现）：
// export async function generateResume(jd: string, docs: string[]): Promise<ResumeData> { ... }

interface AiGeneratePanelProps {
  onClose: () => void;
}

const AiGeneratePanel: React.FC<AiGeneratePanelProps> = ({ onClose }) => {
  const [jd, setJd] = useState('');

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
        <div className="sticky top-0 bg-white border-b p-5 flex items-center justify-between">
          <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <Icon name="sparkles" className="text-purple-500" />
            AI 生成简历
          </h2>
          <button
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            title="关闭"
          >
            <Icon name="times" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-start gap-3 rounded-xl bg-purple-50 border border-purple-100 p-4">
            <Icon name="lightbulb" className="text-purple-500 mt-0.5" />
            <p className="text-sm text-purple-900/80 leading-relaxed">
              即将支持：粘贴目标岗位 JD，AI 会结合你的技术文档（
              <span className="font-medium">edge-ai-docs</span>
              ）与项目经历，自动生成一份匹配该岗位的简历草稿，供你在编辑器里继续打磨。
            </p>
          </div>

          <label className="block">
            <span className="block text-sm font-medium text-gray-700 mb-1.5">
              目标岗位描述（JD）
            </span>
            <textarea
              value={jd}
              onChange={(e) => setJd(e.target.value)}
              rows={6}
              placeholder="粘贴岗位职责与要求…（当前为预留入口，生成功能开发中）"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 resize-y"
            />
          </label>

          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              生成能力开发中，敬请期待。
            </span>
            <button
              disabled
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium bg-gray-200 text-gray-400 cursor-not-allowed"
              title="开发中"
            >
              <Icon name="sparkles" />
              生成简历（开发中）
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AiGeneratePanel;
