/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1700px',
      },
      colors: {
        warm: {
          bg: '#FFF8FA',             // 波奇酱柔粉奶白底色
          card: '#FFFFFF',
          'card-subtle': '#FDF0F4',  // 卡片次级柔粉
          text: '#2B2328',           // 柔和深碳紫咖字色
          'text-muted': '#7D6F77',   // 次要文本浅紫灰
          peach: '#FA7298',          // 波奇标志性粉发主色 (Bocchi Pink)
          'peach-light': '#FDE2EB',  // 浅粉背景点缀
          coral: '#FFB830',          // 眼睛十字星/发饰暖黄色 (Star Yellow)
          matcha: '#4FC3F7',         // 发饰青蓝方块色 (Cyan Cube)
          border: 'rgba(43, 35, 40, 0.08)',
          'border-hover': 'rgba(250, 114, 152, 0.45)',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        display: ['"Outfit"', 'system-ui', 'sans-serif'],
        serif: ['"Newsreader"', 'Georgia', 'serif'],
        script: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'warm-sm': '0 2px 8px rgba(45, 38, 33, 0.04)',
        'warm-md': '0 8px 24px rgba(45, 38, 33, 0.06)',
        'warm-lg': '0 16px 40px rgba(45, 38, 33, 0.08)',
        'warm-glow': '0 0 32px rgba(244, 162, 97, 0.25)',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    },
  },
  plugins: [],
}
