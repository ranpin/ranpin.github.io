import React, { useState } from 'react';

const DataValidation = ({ onClose, onValidate }) => {
  const [validationResults, setValidationResults] = useState(null);
  const [isValidating, setIsValidating] = useState(false);

  // 数据验证规则
  const validationRules = {
    personalInfo: {
      required: ['name', 'title'],
      email: ['email'],
      url: ['avatar']
    },
    projects: {
      required: ['title', 'description'],
      date: ['period'],
      url: ['github', 'demo', 'website']
    },
    publications: {
      required: ['title', 'authors', 'venue', 'year'],
      year: ['year'],
      url: ['pdfUrl', 'arxivUrl', 'codeUrl']
    },
    internships: {
      required: ['company', 'position', 'period'],
      date: ['period'],
      url: []
    },
    honors: {
      required: ['award', 'organization', 'year'],
      year: ['year']
    },
    blogs: {
      required: ['title', 'summary', 'content'],
      date: ['date']
    }
  };

  // 执行数据验证
  const performValidation = async () => {
    setIsValidating(true);
    const results = {
      errors: [],
      warnings: [],
      suggestions: [],
      statistics: {}
    };

    try {
      // 验证个人信息
      const personalInfo = JSON.parse(localStorage.getItem('portfolio_personal_info') || '{}');
      validateSection('个人信息', personalInfo, validationRules.personalInfo, results);

      // 验证项目
      const projects = JSON.parse(localStorage.getItem('portfolio_projects') || '[]');
      projects.forEach((project, index) => {
        validateSection(`项目 #${index + 1}: ${project.title || '未命名'}`, project, validationRules.projects, results);
      });

      // 验证论文
      const publications = JSON.parse(localStorage.getItem('portfolio_publications') || '[]');
      publications.forEach((pub, index) => {
        validateSection(`论文 #${index + 1}: ${pub.title || '未命名'}`, pub, validationRules.publications, results);
      });

      // 验证工作经历
      const internships = JSON.parse(localStorage.getItem('portfolio_internships') || '[]');
      internships.forEach((internship, index) => {
        validateSection(`工作经历 #${index + 1}: ${internship.position || '未命名'}`, internship, validationRules.internships, results);
      });

      // 验证荣誉奖项
      const honors = JSON.parse(localStorage.getItem('portfolio_honors') || '[]');
      honors.forEach((honor, index) => {
        validateSection(`荣誉奖项 #${index + 1}: ${honor.award || '未命名'}`, honor, validationRules.honors, results);
      });

      // 验证博客
      const academicBlogs = JSON.parse(localStorage.getItem('portfolio_academic_blogs') || '[]');
      const engineeringBlogs = JSON.parse(localStorage.getItem('portfolio_engineering_blogs') || '[]');
      [...academicBlogs, ...engineeringBlogs].forEach((blog, index) => {
        validateSection(`博客 #${index + 1}: ${blog.title || '未命名'}`, blog, validationRules.blogs, results);
      });

      // 生成统计信息
      results.statistics = {
        totalProjects: projects.length,
        totalPublications: publications.length,
        totalInternships: internships.length,
        totalHonors: honors.length,
        totalBlogs: academicBlogs.length + engineeringBlogs.length,
        completionRate: calculateCompletionRate(results)
      };

      // 生成建议
      generateSuggestions(results);

    } catch (error) {
      results.errors.push({
        section: '系统',
        field: '数据解析',
        message: '数据解析失败，可能存在格式错误',
        severity: 'error'
      });
    }

    setValidationResults(results);
    setIsValidating(false);
  };

  // 验证单个部分
  const validateSection = (sectionName, data, rules, results) => {
    // 检查必填字段
    rules.required?.forEach(field => {
      if (!data[field] || (typeof data[field] === 'string' && !data[field].trim())) {
        results.errors.push({
          section: sectionName,
          field: field,
          message: `${field} 是必填字段`,
          severity: 'error'
        });
      }
    });

    // 检查邮箱格式
    rules.email?.forEach(field => {
      if (data[field] && !isValidEmail(data[field])) {
        results.warnings.push({
          section: sectionName,
          field: field,
          message: `${field} 邮箱格式不正确`,
          severity: 'warning'
        });
      }
    });

    // 检查URL格式
    rules.url?.forEach(field => {
      if (data[field] && !isValidUrl(data[field])) {
        results.warnings.push({
          section: sectionName,
          field: field,
          message: `${field} URL格式不正确`,
          severity: 'warning'
        });
      }
    });

    // 检查年份格式
    rules.year?.forEach(field => {
      if (data[field] && !isValidYear(data[field])) {
        results.warnings.push({
          section: sectionName,
          field: field,
          message: `${field} 年份格式不正确`,
          severity: 'warning'
        });
      }
    });

    // 检查日期格式
    rules.date?.forEach(field => {
      if (data[field] && !isValidDateRange(data[field])) {
        results.warnings.push({
          section: sectionName,
          field: field,
          message: `${field} 日期格式建议使用 YYYY.MM - YYYY.MM 格式`,
          severity: 'info'
        });
      }
    });
  };

  // 验证函数
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const isValidYear = (year) => {
    const yearNum = parseInt(year);
    return yearNum >= 1900 && yearNum <= new Date().getFullYear() + 10;
  };

  const isValidDateRange = (dateRange) => {
    const dateRangeRegex = /^\d{4}\.\d{2}\s*-\s*(\d{4}\.\d{2}|至今)$/;
    return dateRangeRegex.test(dateRange);
  };

  // 计算完成度
  const calculateCompletionRate = (results) => {
    const totalChecks = results.errors.length + results.warnings.length + 100; // 假设基准
    const passedChecks = 100 - results.errors.length - results.warnings.length * 0.5;
    return Math.max(0, Math.min(100, (passedChecks / totalChecks) * 100));
  };

  // 生成建议
  const generateSuggestions = (results) => {
    if (results.statistics.totalProjects === 0) {
      results.suggestions.push('建议添加至少3个项目经历来展示你的技术能力');
    }
    
    if (results.statistics.totalPublications === 0) {
      results.suggestions.push('如果有学术研究经历，建议添加论文发表记录');
    }
    
    if (results.statistics.totalBlogs < 5) {
      results.suggestions.push('建议增加学习记录，展示你的学习和思考过程');
    }

    if (results.errors.length === 0 && results.warnings.length === 0) {
      results.suggestions.push('数据质量很好！建议定期备份数据');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* 头部 */}
        <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <i className="fas fa-check-circle mr-3"></i>
                数据验证
              </h2>
              <p className="text-green-100 mt-1">检查数据完整性和格式规范</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center transition-colors"
            >
              <i className="fas fa-times text-xl"></i>
            </button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {!validationResults ? (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <i className="fas fa-shield-alt text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">数据质量检查</h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                检查数据完整性、格式规范性，并提供优化建议
              </p>
              <button
                onClick={performValidation}
                disabled={isValidating}
                className="px-8 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg hover:from-green-700 hover:to-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {isValidating ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    验证中...
                  </>
                ) : (
                  <>
                    <i className="fas fa-play mr-2"></i>
                    开始验证
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {/* 统计概览 */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 rounded-lg p-4 text-center">
                  <div className="text-bold text-blue-600">{validationResults.statistics.totalProjects}</div>
                  <div className="text-sm text-blue-800">项目</div>
                </div>
                <div className="bg-green-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-green-600">{validationResults.statistics.totalPublications}</div>
                  <div className="text-sm text-green-800">论文</div>
                </div>
                <div className="bg-purple-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-purple-600">{validationResults.statistics.totalInternships}</div>
                  <div className="text-sm text-purple-800">工作经历</div>
                </div>
                <div className="bg-orange-50 rounded-lg p-4 text-center">
                  <div className="text-2xl font-bold text-orange-600">{validationResults.statistics.completionRate.toFixed(1)}%</div>
                  <div className="text-sm text-orange-800">完成度</div>
                </div>
              </div>

              {/* 错误列表 */}
              {validationResults.errors.length > 0 && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                    <i className="fas fa-exclamation-circle mr-2"></i>
                    错误 ({validationResults.errors.length})
                  </h4>
                  <div className="space-y-2">
                    {validationResults.errors.map((error, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <i className="fas fa-times-circle text-red-500 mt-0.5"></i>
                        <div>
                          <div className="font-medium text-red-800">{error.section}</div>
                          <div className="text-sm text-red-600">{error.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 警告列表 */}
              {validationResults.warnings.length > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-3 flex items-center">
                    <i className="fas fa-exclamation-triangle mr-2"></i>
                    警告 ({validationResults.warnings.length})
                  </h4>
                  <div className="space-y-2">
                    {validationResults.warnings.map((warning, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <i className="fas fa-exclamation-triangle text-yellow-500 mt-0.5"></i>
                        <div>
                          <div className="font-medium text-yellow-800">{warning.section}</div>
                          <div className="text-sm text-yellow-600">{warning.message}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 建议列表 */}
              {validationResults.suggestions.length > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                    <i className="fas fa-lightbulb mr-2"></i>
                    优化建议 ({validationResults.suggestions.length})
                  </h4>
                  <div className="space-y-2">
                    {validationResults.suggestions.map((suggestion, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <i className="fas fa-lightbulb text-blue-500 mt-0.5"></i>
                        <div className="text-sm text-blue-700">{suggestion}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 成功状态 */}
              {validationResults.errors.length === 0 && validationResults.warnings.length === 0 && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
                  <i className="fas fa-check-circle text-green-500 text-3xl mb-3"></i>
                  <h4 className="text-lg font-semibold text-green-800 mb-2">数据验证通过！</h4>
                  <p className="text-green-600">所有数据格式正确，内容完整</p>
                </div>
              )}

              {/* 操作按钮 */}
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  onClick={() => setValidationResults(null)}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  重新验证
                </button>
                <button
                  onClick={onClose}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  完成
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataValidation;
