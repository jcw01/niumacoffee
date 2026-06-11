import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParticleBg from '../components/ParticleBg';
import { useState, useEffect } from 'react';

const emojis = ['🐂', '🐎', '🐕', '🐱', '🦄', '👑'];

export default function Home() {
  const navigate = useNavigate();
  const [emojiIndex, setEmojiIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setEmojiIndex((prev) => (prev + 1) % emojis.length);
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <ParticleBg count={30} />

      {/* 背景光束 */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-gradient-radial from-[#f0a500]/8 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-radial from-[#e63946]/6 via-transparent to-transparent rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 text-center max-w-md w-full px-6 py-12">
        {/* ---- 顶部装饰线 ---- */}
        <motion.div
          className="mx-auto mb-10 w-16 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, #f0a500, transparent)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.1, duration: 0.8 }}
        />

        {/* ---- Emoji 大图标 ---- */}
        <motion.div
          className="relative mx-auto mb-8 w-28 h-28"
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 150, damping: 12, delay: 0.2 }}
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#f0a500]/20 to-transparent blur-2xl" />
          <div className="relative w-full h-full rounded-full bg-white/[0.02] gold-border flex items-center justify-center backdrop-blur-sm">
            <span className="text-6xl" key={emojiIndex}>
              {emojis[emojiIndex]}
            </span>
          </div>

          {/* 脉冲光环 */}
          <div className="absolute inset-0 -m-3 rounded-full pulse-ring pointer-events-none" />
        </motion.div>

        {/* ---- 主标题 ---- */}
        <motion.h1
          className="text-4xl font-black tracking-tight mb-3"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
        >
          <span className="glow-gold">牛马</span>
          <span className="text-white/90">等级测试</span>
        </motion.h1>

        {/* ---- 副标题 ---- */}
        <motion.p
          className="text-base text-white/35 font-light tracking-widest mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          测测你是哪种牛马
        </motion.p>

        {/* ---- 说明标签 ---- */}
        <motion.div
          className="flex items-center justify-center gap-5 mb-12"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          {['30道灵魂拷问', '约3分钟', '仅供娱乐'].map((label, i) => (
            <span
              key={label}
              className="text-xs text-white/25 font-light tracking-wide px-3 py-1.5 rounded-full border border-white/[0.06] bg-white/[0.02]"
            >
              {label}
            </span>
          ))}
        </motion.div>

        {/* ---- CTA 按钮 ---- */}
        <motion.button
          onClick={() => navigate('/quiz')}
          className="relative w-56 py-4 rounded-2xl text-base font-bold tracking-wider
                     bg-gradient-to-r from-[#ffd666] via-[#f0a500] to-[#e68900] text-black
                     shadow-[0_0_40px_rgba(240,165,0,0.3),0_8px_32px_rgba(240,165,0,0.15)]
                     hover:shadow-[0_0_60px_rgba(240,165,0,0.4),0_12px_40px_rgba(240,165,0,0.2)]
                     active:scale-[0.97] transition-all duration-300"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.75, type: 'spring', stiffness: 180 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="relative z-10">⚡ 开始测试</span>
        </motion.button>

        {/* ---- 底部文字 ---- */}
        <motion.p
          className="mt-12 text-[11px] text-white/12 tracking-widest"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          本测试纯属娱乐 · 请勿对号入座
        </motion.p>

        {/* ---- 底部装饰线 ---- */}
        <motion.div
          className="mx-auto mt-8 w-32 h-px"
          style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)' }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ delay: 0.9, duration: 1 }}
        />
      </div>
    </div>
  );
}
