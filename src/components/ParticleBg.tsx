import { useMemo } from 'react';

interface ParticleBgProps {
  count?: number;
}

// 参考附件的鲜艳调色板：粉/黄/青/白
const palette = [
  { bg: '#FF2D7A', emoji: '🐂' },      // 粉红 + 牛
  { bg: '#FFE135', emoji: '🐎' },      // 亮黄 + 马
  { bg: '#00C2B8', emoji: '☕' },      // 青 + 咖啡
  { bg: '#FFFFFF', emoji: '💰' },      // 白 + 钱
  { bg: '#FF2D7A', emoji: '💤' },      // 粉 + 睡眠
  { bg: '#FFE135', emoji: '🧠' },      // 黄 + 脑
];

export default function ParticleBg({ count = 20 }: ParticleBgProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => {
      const p = palette[i % palette.length];
      return {
        id: i,
        left: `${Math.random() * 100}%`,
        delay: `${Math.random() * 8}s`,
        duration: `${10 + Math.random() * 10}s`,
        size: `${26 + Math.random() * 14}px`,
        bg: p.bg,
        emoji: p.emoji,
      };
    });
  }, [count]);

  return (
    <div className="particle-wrapper">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
            background: p.bg,
            fontSize: `${Math.max(14, parseInt(p.size) * 0.55)}px`,
          }}
        >
          {p.emoji}
        </div>
      ))}
    </div>
  );
}
