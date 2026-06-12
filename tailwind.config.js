/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        // 参考附件：明黄主色 + 粉红强调色 + 墨黑描边色
        brand: {
          yellow: "#FFE135",          // 亮黄主色
          yellowDeep: "#F5C800",      // 深黄
          pink: "#FF2D7A",            // 粉红强调色
          pinkDeep: "#C71585",        // 深粉红
          ink: "#141414",             // 粗黑描边色
          cream: "#FFF7E0",           // 奶油白
          cyan: "#00C2B8",            // 青色辅色
          teal: "#06B6A5",
        },
      },
      boxShadow: {
        // 漫画风粗黑阴影（偏移+纯黑）
        comic: "6px 6px 0 0 #141414",
        comicSm: "4px 4px 0 0 #141414",
        comicLg: "8px 8px 0 0 #141414",
        comicPink: "6px 6px 0 0 #FF2D7A",
        comicInset: "inset 0 0 0 4px rgba(20,20,20,0.15)",
      },
      fontFamily: {
        comic: ['"ZCOOL KuaiLe"', '"Noto Sans SC"', "system-ui", "sans-serif"],
      },
      backgroundImage: {
        // 斜条纹（附件风格）
        "stripe-yellow":
          "repeating-linear-gradient(-45deg, #FFE135 0px, #FFE135 14px, #FFD400 14px, #FFD400 28px)",
        "stripe-pink":
          "repeating-linear-gradient(-45deg, #FF2D7A 0px, #FF2D7A 14px, #E0186A 14px, #E0186A 28px)",
        "stripe-soft":
          "repeating-linear-gradient(-45deg, #FFF7E0 0px, #FFF7E0 14px, #FFE135 14px, #FFE135 28px)",
      },
      keyframes: {
        wobble: {
          "0%,100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        popin: {
          "0%": { transform: "scale(0.6) rotate(-6deg)", opacity: 0 },
          "100%": { transform: "scale(1) rotate(0)", opacity: 1 },
        },
        badgeFloat: {
          "0%,100%": { transform: "translateY(0) rotate(-2deg)" },
          "50%": { transform: "translateY(-4px) rotate(2deg)" },
        },
      },
      animation: {
        wobble: "wobble 1.6s ease-in-out infinite",
        popin: "popin 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards",
        "badge-float": "badgeFloat 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
