/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Songti SC', 'STSong', 'Noto Serif CJK SC', 'serif'],
        sans: [
          'Inter',
          'system-ui',
          '-apple-system',
          'PingFang SC',
          'Microsoft YaHei',
          'sans-serif',
        ],
      },
      colors: {
        // 2026-10-20 明暗主题：色值改为 CSS 变量，跟随 <html data-theme="light|dark"> 翻转
        // （变量定义在 src/styles/index.css 的 :root / [data-theme="dark"]，由 theme.js 切换）。
        // 类名保持不变（warm-gray-* / sage-* / leaf-* / surface），全站既有引用自动换肤。
        // 中性色暗色下整体反转（50=最深底、900=最亮字）；主色暗色下提亮保证暗底对比。
        surface: 'var(--c-surface)',
        'warm-gray': {
          50: 'var(--wg-50)',
          100: 'var(--wg-100)',
          200: 'var(--wg-200)',
          300: 'var(--wg-300)',
          400: 'var(--wg-400)',
          500: 'var(--wg-500)',
          600: 'var(--wg-600)',
          700: 'var(--wg-700)',
          800: 'var(--wg-800)',
          900: 'var(--wg-900)',
        },
        sage: {
          50: 'var(--sage-50)',
          100: 'var(--sage-100)',
          200: 'var(--sage-200)',
          300: 'var(--sage-300)',
          400: 'var(--sage-400)',
          500: 'var(--sage-500)',
          600: 'var(--sage-600)',
          700: 'var(--sage-700)',
          800: 'var(--sage-800)',
          900: 'var(--sage-900)',
        },
        // 描述标题专用亮绿（2026-10-27）：亮底 leaf-600=#16a34a、暗底 leaf-600=#4ade80
        leaf: {
          50: 'var(--leaf-50)',
          100: 'var(--leaf-100)',
          200: 'var(--leaf-200)',
          300: 'var(--leaf-300)',
          400: 'var(--leaf-400)',
          500: 'var(--leaf-500)',
          600: 'var(--leaf-600)',
          700: 'var(--leaf-700)',
          800: 'var(--leaf-800)',
          900: 'var(--leaf-900)',
        },
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
