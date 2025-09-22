import React, { useState, useEffect } from 'react';

const GuestBook = () => {
  const [messages, setMessages] = useState([]);
  const [pendingMessages, setPendingMessages] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    website: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    loadMessages();
    checkAdminStatus();
  }, []);

  // 检查管理员状态
  const checkAdminStatus = () => {
    const adminStatus = localStorage.getItem('portfolio_admin_mode');
    setIsAdmin(adminStatus === 'true');
  };

  // 加载留言
  const loadMessages = () => {
    try {
      const approvedMessages = JSON.parse(localStorage.getItem('portfolio_guest_messages') || '[]');
      const pendingMessages = JSON.parse(localStorage.getItem('portfolio_pending_messages') || '[]');
      
      setMessages(approvedMessages);
      setPendingMessages(pendingMessages);
    } catch (error) {
      console.error('加载留言失败:', error);
    }
  };

  // 提交留言
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const newMessage = {
        id: Date.now(),
        ...formData,
        timestamp: new Date().toISOString(),
        status: 'pending'
      };

      const currentPending = JSON.parse(localStorage.getItem('portfolio_pending_messages') || '[]');
      const updatedPending = [newMessage, ...currentPending];
      
      localStorage.setItem('portfolio_pending_messages', JSON.stringify(updatedPending));
      setPendingMessages(updatedPending);

      // 重置表单
      setFormData({ name: '', email: '', website: '', message: '' });
      setShowForm(false);
      
      alert('留言提交成功！管理员审核后将会显示。');
    } catch (error) {
      console.error('提交留言失败:', error);
      alert('提交失败，请稍后重试。');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 审核留言
  const approveMessage = (messageId) => {
    try {
      const messageToApprove = pendingMessages.find(msg => msg.id === messageId);
      if (!messageToApprove) return;

      // 添加到已审核列表
      const currentApproved = JSON.parse(localStorage.getItem('portfolio_guest_messages') || '[]');
      const updatedApproved = [{ ...messageToApprove, status: 'approved' }, ...currentApproved];
      localStorage.setItem('portfolio_guest_messages', JSON.stringify(updatedApproved));

      // 从待审核列表移除
      const updatedPending = pendingMessages.filter(msg => msg.id !== messageId);
      localStorage.setItem('portfolio_pending_messages', JSON.stringify(updatedPending));

      setMessages(updatedApproved);
      setPendingMessages(updatedPending);
    } catch (error) {
      console.error('审核留言失败:', error);
    }
  };

  // 删除留言
  const deleteMessage = (messageId, isPending = false) => {
    if (!window.confirm('确定要删除这条留言吗？')) return;

    try {
      if (isPending) {
        const updatedPending = pendingMessages.filter(msg => msg.id !== messageId);
        localStorage.setItem('portfolio_pending_messages', JSON.stringify(updatedPending));
        setPendingMessages(updatedPending);
      } else {
        const updatedMessages = messages.filter(msg => msg.id !== messageId);
        localStorage.setItem('portfolio_guest_messages', JSON.stringify(updatedMessages));
        setMessages(updatedMessages);
      }
    } catch (error) {
      console.error('删除留言失败:', error);
    }
  };

  // 格式化时间
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return '刚刚';
    if (diff < 3600000) return Math.floor(diff / 60000) + ' 分钟前';
    if (diff < 86400000) return Math.floor(diff / 3600000) + ' 小时前';
    if (diff < 604800000) return Math.floor(diff / 86400000) + ' 天前';
    
    return date.toLocaleDateString('zh-CN');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6 sm:p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-900 flex items-center">
          <i className="fas fa-comments text-blue-500 mr-3"></i>
          访客留言
        </h3>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
        >
          <i className="fas fa-plus mr-2"></i>
          写留言
        </button>
      </div>

      {/* 管理员待审核提醒 */}
      {isAdmin && pendingMessages.length > 0 && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <div className="flex items-center space-x-2">
            <i className="fas fa-clock text-yellow-600"></i>
            <span className="font-medium text-yellow-800">
              有 {pendingMessages.length} 条留言待审核
            </span>
          </div>
        </div>
      )}

      {/* 留言表单 */}
      {showForm && (
        <div className="mb-8 p-6 bg-gray-50 rounded-xl">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">写下你的留言</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  姓名 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="请输入您的姓名"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  邮箱 <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                网站 (可选)
              </label>
              <input
                type="url"
                value={formData.website}
                onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="https://your-website.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                留言内容 <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-vertical"
                placeholder="写下您的想法、建议或问题..."
              />
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                取消
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <i className="fas fa-spinner fa-spin mr-2"></i>
                    提交中...
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane mr-2"></i>
                    提交留言
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* 管理员待审核区域 */}
      {isAdmin && pendingMessages.length > 0 && (
        <div className="mb-8">
          <h4 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
            <i className="fas fa-clock text-yellow-500 mr-2"></i>
            待审核留言 ({pendingMessages.length})
          </h4>
          <div className="space-y-4">
            {pendingMessages.map((message) => (
              <div key={message.id} className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                      {message.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h5 className="font-medium text-gray-900">{message.name}</h5>
                        {message.website && (
                          <a 
                            href={message.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 text-sm"
                          >
                            <i className="fas fa-external-link-alt"></i>
                          </a>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{message.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => approveMessage(message.id)}
                      className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700 transition-colors"
                      title="批准"
                    >
                      <i className="fas fa-check"></i>
                    </button>
                    <button
                      onClick={() => deleteMessage(message.id, true)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition-colors"
                      title="删除"
                    >
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">{message.message}</p>
                <div className="mt-2 text-xs text-gray-500">
                  {formatTime(message.timestamp)}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 已审核留言列表 */}
      <div className="space-y-6">
        {messages.length > 0 ? (
          messages.map((message) => (
            <div key={message.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                {message.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-3">
                    <h5 className="font-medium text-gray-900">{message.name}</h5>
                    {message.website && (
                      <a 
                        href={message.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:text-blue-800 text-sm"
                        title="访问网站"
                      >
                        <i className="fas fa-external-link-alt"></i>
                      </a>
                    )}
                    <span className="text-sm text-gray-500">{formatTime(message.timestamp)}</span>
                  </div>
                  {isAdmin && (
                    <button
                      onClick={() => deleteMessage(message.id, false)}
                      className="p-1 text-gray-400 hover:text-red-600 rounded transition-colors"
                      title="删除留言"
                    >
                      <i className="fas fa-trash text-sm"></i>
                    </button>
                  )}
                </div>
                <p className="text-gray-700 leading-relaxed">{message.message}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 text-gray-500">
            <i className="fas fa-comments text-4xl mb-4"></i>
            <p className="text-lg mb-2">还没有留言</p>
            <p className="text-sm">成为第一个留言的访客吧！</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuestBook;
