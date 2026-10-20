/* ============================================================================
   theme.js — ranpin 全站明暗主题切换（主站 hub + 各演示页共享）
   ----------------------------------------------------------------------------
   机制：localStorage['ranpin-theme'] 记偏好；<html data-theme="light|dark">
   驱动 CSS 变量（demo-shell.css 的 --ds-*、主站 index.css 的色板变量）。
   所有页面同源（ranpin.github.io），任一页切换、其它页打开时自动跟随。

   ⚠️ 必须在 <head> 中【同步】加载（不能 async/defer），以便首屏绘制前就应用
   已存主题、避免「先亮一下再变暗」的闪烁（FOUC）。

   按钮约定：class 含 ds-theme-btn / theme-btn，图标 span 含 ds-theme-icon /
   theme-icon；onclick 调 window.toggleTheme()。图标与 aria-label 由本脚本同步。
   ============================================================================ */
(function () {
  var KEY = 'ranpin-theme';

  function read() {
    try { return localStorage.getItem(KEY); } catch { return null; }
  }
  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // 同步浏览器 UI 主题色（移动端地址栏），与 --wg-50 保持一致
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#0f172a' : '#f8fafc');
  }
  function syncControls() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var icons = document.querySelectorAll('.ds-theme-icon, .theme-icon');
    for (var i = 0; i < icons.length; i++) icons[i].textContent = dark ? '☀️' : '🌙';
    var btns = document.querySelectorAll('.ds-theme-btn, .theme-btn');
    for (var j = 0; j < btns.length; j++) {
      btns[j].setAttribute('aria-label', dark ? '切换到亮色主题' : '切换到暗色主题');
      btns[j].setAttribute('title', dark ? '切换到亮色主题' : '切换到暗色主题');
    }
  }

  // 首屏绘制前应用已存主题（无偏好则默认亮色）
  apply(read() === 'dark' ? 'dark' : 'light');

  // 供页面按钮 onclick 调用
  window.toggleTheme = function () {
    var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    try { localStorage.setItem(KEY, next); } catch { /* 隐私模式等，仅本次会话有效 */ }
    syncControls();
  };
  window.__syncThemeControls = syncControls;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncControls);
  } else {
    syncControls();
  }
})();
