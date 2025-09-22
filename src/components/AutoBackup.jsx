import { useEffect } from 'react';

const AutoBackup = () => {
  useEffect(() => {
    // 自动备份间隔（毫秒）- 默认30分钟
    const BACKUP_INTERVAL = 30 * 60 * 1000;
    
    // 最大自动备份数量
    const MAX_AUTO_BACKUPS = 10;

    const createAutoBackup = () => {
      try {
        // 获取当前数据
        const currentData = {
          personalInfo: JSON.parse(localStorage.getItem('portfolio_personal_info') || '{}'),
          recentNews: JSON.parse(localStorage.getItem('portfolio_recent_news') || '[]'),
          projects: JSON.parse(localStorage.getItem('portfolio_projects') || '[]'),
          publications: JSON.parse(localStorage.getItem('portfolio_publications') || '[]'),
          internships: JSON.parse(localStorage.getItem('portfolio_internships') || '[]'),
          honors: JSON.parse(localStorage.getItem('portfolio_honors') || '[]'),
          academicBlogs: JSON.parse(localStorage.getItem('portfolio_academic_blogs') || '[]'),
          engineeringBlogs: JSON.parse(localStorage.getItem('portfolio_engineering_blogs') || '[]')
        };

        // 检查是否有数据变化
        const lastBackup = localStorage.getItem('portfolio_last_backup_data');
        const currentDataStr = JSON.stringify(currentData);
        
        if (lastBackup === currentDataStr) {
          console.log('数据无变化，跳过自动备份');
          return;
        }

        // 创建新的自动备份
        const newBackup = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          description: `自动备份 - ${new Date().toLocaleString('zh-CN')}`,
          data: currentData,
          size: currentDataStr.length,
          type: 'auto'
        };

        // 获取现有版本
        const existingVersions = JSON.parse(localStorage.getItem('portfolio_versions') || '[]');
        
        // 过滤出自动备份，保留手动备份
        const manualBackups = existingVersions.filter(v => v.type === 'manual');
        const autoBackups = existingVersions.filter(v => v.type === 'auto');
        
        // 限制自动备份数量
        const limitedAutoBackups = [newBackup, ...autoBackups].slice(0, MAX_AUTO_BACKUPS);
        
        // 合并所有备份
        const allBackups = [...manualBackups, ...limitedAutoBackups];
        
        // 保存到localStorage
        localStorage.setItem('portfolio_versions', JSON.stringify(allBackups));
        localStorage.setItem('portfolio_last_backup_data', currentDataStr);
        
        console.log('自动备份创建成功:', newBackup.description);
      } catch (error) {
        console.error('自动备份失败:', error);
      }
    };

    // 页面加载时创建一次备份
    const initialTimer = setTimeout(createAutoBackup, 5000); // 5秒后创建初始备份

    // 设置定期自动备份
    const intervalTimer = setInterval(createAutoBackup, BACKUP_INTERVAL);

    // 监听数据变化，在用户操作后延迟备份
    const handleStorageChange = () => {
      // 延迟备份，避免频繁操作
      clearTimeout(window.autoBackupTimeout);
      window.autoBackupTimeout = setTimeout(createAutoBackup, 10000); // 10秒后备份
    };

    window.addEventListener('storage', handleStorageChange);

    // 清理函数
    return () => {
      clearTimeout(initialTimer);
      clearInterval(intervalTimer);
      clearTimeout(window.autoBackupTimeout);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  // 这个组件不渲染任何内容
  return null;
};

export default AutoBackup;
