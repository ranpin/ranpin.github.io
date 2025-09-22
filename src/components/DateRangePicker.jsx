import React, { useState } from 'react';

const DateRangePicker = ({ value, onChange, placeholder = "选择日期范围" }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [startYear, setStartYear] = useState('');
  const [startMonth, setStartMonth] = useState('');
  const [endYear, setEndYear] = useState('');
  const [endMonth, setEndMonth] = useState('');
  const [isOngoing, setIsOngoing] = useState(false);

  // 解析现有值
  React.useEffect(() => {
    if (value) {
      const match = value.match(/(\d{4})\.(\d{2})\s*-\s*(\d{4})\.(\d{2})|(\d{4})\.(\d{2})\s*-\s*至今|(\d{4})年/);
      if (match) {
        if (match[7]) {
          // 单年格式
          setStartYear(match[7]);
          setStartMonth('');
          setEndYear('');
          setEndMonth('');
          setIsOngoing(false);
        } else if (match[5] && match[6]) {
          // 至今格式
          setStartYear(match[5]);
          setStartMonth(match[6]);
          setEndYear('');
          setEndMonth('');
          setIsOngoing(true);
        } else if (match[1] && match[2] && match[3] && match[4]) {
          // 完整日期范围
          setStartYear(match[1]);
          setStartMonth(match[2]);
          setEndYear(match[3]);
          setEndMonth(match[4]);
          setIsOngoing(false);
        }
      }
    }
  }, [value]);

  // 生成日期范围字符串
  const generateDateRange = () => {
    if (!startYear) return '';
    
    if (!startMonth) {
      return `${startYear}年`;
    }
    
    if (isOngoing) {
      return `${startYear}.${startMonth.padStart(2, '0')} - 至今`;
    }
    
    if (endYear && endMonth) {
      return `${startYear}.${startMonth.padStart(2, '0')} - ${endYear}.${endMonth.padStart(2, '0')}`;
    }
    
    return `${startYear}.${startMonth.padStart(2, '0')}`;
  };

  // 应用日期范围
  const applyDateRange = () => {
    const dateRange = generateDateRange();
    onChange(dateRange);
    setShowPicker(false);
  };

  // 快速选择选项
  const quickOptions = (() => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    
    return [
      {
        label: '本年度',
        value: `${currentYear}年`
      },
      {
        label: '去年',
        value: `${currentYear - 1}年`
      },
      {
        label: '当前进行中',
        value: `${currentYear}.${currentMonth.toString().padStart(2, '0')} - 至今`
      },
      {
        label: '本学年',
        value: `${currentYear - 1}.09 - ${currentYear}.06`
      },
      {
        label: '上学年',
        value: `${currentYear - 2}.09 - ${currentYear - 1}.06`
      },
      {
        label: '最近3个月',
        value: `${currentYear}.${Math.max(1, currentMonth - 2).toString().padStart(2, '0')} - ${currentYear}.${currentMonth.toString().padStart(2, '0')}`
      }
    ];
  })();

  return (
    <div className="relative">
      {/* 输入框 */}
      <div className="flex space-x-2">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors text-sm"
          title="日期选择器"
        >
          <i className="fas fa-calendar-alt"></i>
        </button>
      </div>

      {/* 日期选择器弹窗 */}
      {showPicker && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4">
          {/* 快速选择 */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">快速选择</label>
            <div className="grid grid-cols-2 gap-2">
              {quickOptions.map((option, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => {
                    onChange(option.value);
                    setShowPicker(false);
                  }}
                  className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm text-left"
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* 自定义日期范围 */}
          <div className="border-t pt-4">
            <label className="block text-sm font-medium text-gray-700 mb-3">自定义日期范围</label>
            
            {/* 开始日期 */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs text-gray-600 mb-1">开始年份</label>
                <select
                  value={startYear}
                  onChange={(e) => setStartYear(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="">年份</option>
                  {Array.from({ length: 15 }, (_, i) => {
                    const year = new Date().getFullYear() + 2 - i;
                    return (
                      <option key={year} value={year}>{year}</option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">开始月份</label>
                <select
                  value={startMonth}
                  onChange={(e) => setStartMonth(e.target.value)}
                  className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  <option value="">月份</option>
                  {Array.from({ length: 12 }, (_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}月</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 结束日期或至今 */}
            <div className="mb-3">
              <label className="flex items-center space-x-2 mb-2">
                <input
                  type="checkbox"
                  checked={isOngoing}
                  onChange={(e) => setIsOngoing(e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
                <span className="text-sm text-gray-700">至今</span>
              </label>
            </div>

            {!isOngoing && (
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <label className="block text-xs text-gray-600 mb-1">结束年份</label>
                  <select
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="">年份</option>
                    {Array.from({ length: 15 }, (_, i) => {
                      const year = new Date().getFullYear() + 2 - i;
                      return (
                        <option key={year} value={year}>{year}</option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-600 mb-1">结束月份</label>
                  <select
                    value={endMonth}
                    onChange={(e) => setEndMonth(e.target.value)}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
                  >
                    <option value="">月份</option>
                    {Array.from({ length: 12 }, (_, i) => (
                      <option key={i + 1} value={i + 1}>{i + 1}月</option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* 预览 */}
            {startYear && (
              <div className="mb-4 p-2 bg-blue-50 rounded text-sm text-blue-700">
                预览: {generateDateRange()}
              </div>
            )}

            {/* 操作按钮 */}
            <div className="flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowPicker(false)}
                className="px-3 py-1 border border-gray-300 text-gray-700 rounded text-sm hover:bg-gray-50"
              >
                取消
              </button>
              <button
                type="button"
                onClick={applyDateRange}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                应用
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
