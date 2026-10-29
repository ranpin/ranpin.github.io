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
    try {
      return localStorage.getItem(KEY);
    } catch {
      return null;
    }
  }
  function apply(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // 同步浏览器 UI 主题色（移动端地址栏），与 --wg-50 保持一致
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta)
      meta.setAttribute('content', theme === 'dark' ? '#0f172a' : '#f8fafc');
  }
  function syncControls() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    var icons = document.querySelectorAll('.ds-theme-icon, .theme-icon');
    for (var i = 0; i < icons.length; i++)
      icons[i].textContent = dark ? '☀️' : '🌙';
    var btns = document.querySelectorAll('.ds-theme-btn, .theme-btn');
    for (var j = 0; j < btns.length; j++) {
      btns[j].setAttribute(
        'aria-label',
        dark ? '切换到亮色主题' : '切换到暗色主题',
      );
      btns[j].setAttribute('title', dark ? '切换到亮色主题' : '切换到暗色主题');
    }
  }

  // 首屏绘制前应用已存主题（无偏好则默认亮色）
  apply(read() === 'dark' ? 'dark' : 'light');

  // 供页面按钮 onclick 调用
  window.toggleTheme = function () {
    var next =
      document.documentElement.getAttribute('data-theme') === 'dark'
        ? 'light'
        : 'dark';
    apply(next);
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* 隐私模式等，仅本次会话有效 */
    }
    syncControls();
  };
  window.__syncThemeControls = syncControls;

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', syncControls);
  } else {
    syncControls();
  }
})();

/* ============================================================================
   图片点击放大（2026-10-29 用户要求）：事件委托——各 demo 页的图片多为动态
   插入（切 tab/回放轮次才生成），load 时直接绑定覆盖不到。
   跳过两类图：链接内的图（让导航生效）、自带 onclick 缩放祖先内的图
   （页面自有 lightbox 优先，避免双弹）。样式在 demo-shell.css 的 .ds-lightbox。
   ============================================================================ */
(function () {
  var lb = null;
  var lbImg = null;

  function ensure() {
    if (lb) return;
    lb = document.createElement('div');
    lb.className = 'ds-lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lbImg = document.createElement('img');
    lbImg.alt = '';
    lbImg.onload = fit;
    var hint = document.createElement('div');
    hint.className = 'ds-lightbox__hint';
    hint.textContent = '点击任意处关闭';
    lb.appendChild(lbImg);
    lb.appendChild(hint);
    lb.addEventListener('click', close);
    document.body.appendChild(lb);
    window.addEventListener('resize', function () {
      if (lb.classList.contains('ds-lightbox--on')) fit();
    });
  }
  // 小源图（heat2label 224px、cosmos3 帧 448px）按原始尺寸显示几乎没放大，
  // 统一 2 倍上采样再按视口等比封顶——插值虽软但细节可辨，服务于「看得清」
  function fit() {
    var nw = lbImg.naturalWidth,
      nh = lbImg.naturalHeight;
    if (!nw || !nh) return;
    var w = nw,
      h = nh;
    if (nw < 480) {
      w *= 2;
      h *= 2;
    }
    var maxW = window.innerWidth * 0.96,
      maxH = window.innerHeight * 0.86;
    if (w > maxW) {
      h *= maxW / w;
      w = maxW;
    }
    if (h > maxH) {
      w *= maxH / h;
      h = maxH;
    }
    lbImg.style.width = Math.round(w) + 'px';
    lbImg.style.height = Math.round(h) + 'px';
  }
  function open(img) {
    ensure();
    lbImg.style.width = lbImg.style.height = '';
    lbImg.src = img.currentSrc || img.src;
    lbImg.alt = img.alt || '';
    // 缓存图（缩略图已加载过）complete 立即为 true 且 load 事件可能不再触发，须主动 fit
    if (lbImg.complete && lbImg.naturalWidth) fit();
    lb.classList.add('ds-lightbox--on');
    document.body.classList.add('ds-lightbox-open');
  }
  function close() {
    if (!lb) return;
    lb.classList.remove('ds-lightbox--on');
    document.body.classList.remove('ds-lightbox-open');
  }

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') close();
  });
  document.addEventListener('click', function (e) {
    var img = e.target;
    if (!img || img.tagName !== 'IMG') return;
    if (!img.closest('.ds-wrap')) return;
    if (img.closest('a')) return;
    if (img.closest('[onclick]')) return;
    open(img);
  });
})();
