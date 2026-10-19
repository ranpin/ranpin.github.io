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
        // 2026-10-19 配色刷新（用户要求「明亮活泼」）：
        //   warm-gray 由暖米石色 → 冷调中性灰（冷白底）；sage 由灰橄榄绿 → 明亮高饱和蔚蓝（全站唯一主色）。
        //   类名保持不变（warm-gray-* / sage-*），全站既有引用自动换色；名字与新色相不符属已知，勿据此「修复」。
        //   对比度（对白底）：sage-600 #1a67eb=4.96:1、sage-700=5.85:1、warm-gray-500=4.77:1，均达 AA。
        'warm-gray': {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        sage: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bedaff',
          300: '#91c3ff',
          400: '#5da2fb',
          500: '#3583f6',
          600: '#1a67eb',
          700: '#1552d1',
          800: '#1744a9',
          900: '#183c85',
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
