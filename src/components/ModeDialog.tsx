import React, { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { ACCESS_CODE } from '../data/access';
import { usePortfolioStore } from '../store/usePortfolioStore';

interface ModeDialogProps {
  onClose: () => void;
}

// 演示模式解锁弹窗：界面上没有可见入口，仅通过隐藏快捷键唤出。
//   - 演示模式下：输入正确访问码解锁到完整模式；
//   - 完整模式下：可一键切回演示模式（重新上锁，无需访问码）。
const ModeDialog: React.FC<ModeDialogProps> = ({ onClose }) => {
  const presentationMode = usePortfolioStore((s) => s.presentationMode);
  const setPresentationMode = usePortfolioStore((s) => s.setPresentationMode);
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    // 锁定时聚焦访问码输入框；已解锁时聚焦关闭按钮
    if (presentationMode) inputRef.current?.focus();
    else closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [presentationMode, onClose]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (code === ACCESS_CODE) {
      setPresentationMode(false);
      onClose();
    } else {
      setError(true);
      setCode('');
      inputRef.current?.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mode-dialog-title"
        className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2
            id="mode-dialog-title"
            className="text-lg font-semibold text-warm-gray-800 flex items-center"
          >
            <Icon name="lock" className="text-sage-500 mr-2" />
            {presentationMode ? '解锁完整模式' : '完整模式'}
          </h2>
          <button
            ref={closeRef}
            onClick={onClose}
            aria-label="关闭"
            className="w-8 h-8 bg-warm-gray-100 hover:bg-warm-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <Icon name="times" className="text-warm-gray-600" />
          </button>
        </div>

        {presentationMode ? (
          <form onSubmit={submit}>
            <p className="text-sm text-warm-gray-500 mb-3">
              输入访问码以显示全部板块。
            </p>
            <input
              ref={inputRef}
              type="password"
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError(false);
              }}
              placeholder="访问码"
              aria-label="访问码"
              aria-invalid={error}
              className={`w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-sage-500 transition-colors ${
                error ? 'border-red-400' : 'border-warm-gray-200'
              }`}
            />
            {error && (
              <p className="text-sm text-red-500 mt-2">访问码不正确</p>
            )}
            <button
              type="submit"
              className="mt-4 w-full bg-sage-600 hover:bg-sage-700 text-white font-medium py-2 rounded-lg transition-colors"
            >
              解锁
            </button>
          </form>
        ) : (
          <div>
            <p className="text-sm text-warm-gray-500 mb-4">
              当前正在显示全部板块（含私密内容）。
            </p>
            <button
              onClick={() => {
                setPresentationMode(true);
                onClose();
              }}
              className="w-full bg-warm-gray-100 hover:bg-warm-gray-200 text-warm-gray-700 font-medium py-2 rounded-lg transition-colors"
            >
              切回演示模式
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ModeDialog;
