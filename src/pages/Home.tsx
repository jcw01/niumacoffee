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
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-x-hidden px-4 py-6">
      <ParticleBg count={18} />

      <div className="relative z-10 max-w-md w-full flex flex-col items-center">
        {/* 顶部粉红横幅 */}
        <motion.div
          className="px-4 py-2 mb-5 rounded-full font-black text-xs tracking-widest whitespace-nowrap"
          style={{
            background: '#FF2D7A',
            color: '#fff',
            border: '3px solid #141414',
            boxShadow: '4px 4px 0 0 #141414',
          }}
          initial={{ y: -30, opacity: 0, rotate: -6 }}
          animate={{ y: 0, opacity: 1, rotate: -2 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 180, damping: 12 }}
        >
          🚨 牛马等级鉴定中心 · 限时免费
        </motion.div>

        {/* 标题大卡 */}
        <motion.div
          className="w-full mb-6 px-5 py-8 rounded-[22px] bg-white text-center"
          style={{
            border: '4px solid #141414',
            boxShadow: '8px 8px 0 0 #141414',
          }}
          initial={{ scale: 0.85, rotate: -3, opacity: 0 }}
          animate={{ scale: 1, rotate: -1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 160, damping: 14 }}
        >
          {/* ZOO·RANK 标签 */}
          <span
            className="inline-block mb-5 text-xs font-black tracking-[4px] px-3 py-1.5 rounded-full"
            style={{ background: '#FFE135', border: '2px solid #141414', color: '#141414' }}
          >
            ZOO·RANK
          </span>

          {/* 主标题：黑字 + 漫画阴影，不会溢出 */}
          <h1
            className="font-black leading-snug mb-1 text-comic-title"
            style={{ fontSize: 'clamp(36px, 10vw, 50px)' }}
          >
            牛马等级
          </h1>
          <h2
            className="font-black leading-snug mb-5 text-comic-title"
            style={{ fontSize: 'clamp(36px, 10vw, 50px)' }}
          >
            测 · 试
          </h2>

          <p
            className="font-black mb-4 tracking-[2px]"
            style={{ fontSize: 15, color: '#141414' }}
          >
            测测你是哪种牛马 🐂🐎
          </p>

          {/* Emoji 大圆 */}
          <motion.div
            className="mx-auto w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: '#FFE135',
              border: '4px solid #141414',
              boxShadow: '4px 4px 0 0 #141414',
            }}
            animate={{ rotate: [0, -4, 4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span key={emojiIndex} className="text-4xl">{emojis[emojiIndex]}</span>
          </motion.div>
        </motion.div>

        {/* 标签行 */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {[
            { text: '30 道灵魂拷问', color: '#FFE135' },
            { text: '约 3 分钟', color: '#FFFFFF' },
            { text: '仅供娱乐 🤪', color: '#FF2D7A', fg: '#fff' },
          ].map((chip, i) => (
            <span
              key={chip.text}
              className="font-black text-[13px] px-4 py-2 rounded-full whitespace-nowrap"
              style={{
                background: chip.color,
                color: chip.fg || '#141414',
                border: '3px solid #141414',
                boxShadow: '3px 3px 0 0 #141414',
                transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
              }}
            >
              {chip.text}
            </span>
          ))}
        </motion.div>

        {/* CTA 按钮 */}
        <motion.button
          onClick={() => navigate('/quiz')}
          className="btn-comic-pink mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 180 }}
          whileTap={{ scale: 0.97 }}
        >
          ⚡ 立即开始测试
        </motion.button>

        <motion.button
          onClick={() => navigate('/quiz')}
          className="btn-comic-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.97 }}
        >
          🔎 先看看规则
        </motion.button>

        {/* 底部脚注 */}
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span
            className="inline-block font-black text-[11px] px-4 py-2 rounded-full tracking-[2px]"
            style={{
              background: 'rgba(255,255,255,0.7)',
              color: '#141414',
              border: '2px solid #141414',
            }}
          >
            本测试纯属娱乐 · 请勿对号入座 🫡
          </span>
        </motion.div>
      </div>
    </div>
  );
}
