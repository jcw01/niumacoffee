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
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-5 py-10">
      <ParticleBg count={18} />

      {/* 顶部斜条纹装饰横幅 */}
      <div className="relative z-10 max-w-md w-full flex flex-col items-center">
        {/* ---- 顶部徽章（粉红背景，粗黑描边，轻微晃动） ---- */}
        <motion.div
          className="px-5 py-2 mb-6 rounded-full bg-[#FF2D7A] text-white font-black text-sm tracking-widest"
          style={{
            border: '3px solid #141414',
            boxShadow: '4px 4px 0 0 #141414',
          }}
          initial={{ y: -30, opacity: 0, rotate: -6 }}
          animate={{ y: 0, opacity: 1, rotate: -2 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 180, damping: 12 }}
        >
          🚨 牛马等级鉴定中心 · 限时免费
        </motion.div>

        {/* ---- 标题大卡（白底粗黑描边 + 漫画阴影） ---- */}
        <motion.div
          className="w-full mb-6 p-6 rounded-[22px] bg-white text-center"
          style={{
            border: '4px solid #141414',
            boxShadow: '8px 8px 0 0 #141414',
          }}
          initial={{ scale: 0.85, rotate: -3, opacity: 0 }}
          animate={{ scale: 1, rotate: -1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 160, damping: 14 }}
        >
          {/* 顶部小标签 */}
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xs font-black tracking-[4px] text-[#141414] bg-[#FFE135] px-3 py-1 rounded-full"
              style={{ border: '2px solid #141414' }}>
              ZOO·RANK
            </span>
          </div>

          {/* 主标题（白字黑描边，漫画效果） */}
          <h1
            className="font-black leading-none mb-2 text-stroke-ink"
            style={{
              fontSize: '56px',
              letterSpacing: '2px',
            }}
          >
            牛马等级
          </h1>
          <h2
            className="font-black leading-none mb-4 text-stroke-ink"
            style={{ fontSize: '56px' }}
          >
            测 · 试
          </h2>

          {/* 副标题 / Slogan */}
          <p
            className="font-black text-[#141414] mb-4"
            style={{ fontSize: '16px', letterSpacing: '2px' }}
          >
            测测你是哪种牛马 🐂🐎
          </p>

          {/* 底部卡通 emoji 大圈 */}
          <motion.div
            className="mx-auto w-24 h-24 rounded-full bg-[#FFE135] flex items-center justify-center relative"
            style={{ border: '4px solid #141414', boxShadow: '4px 4px 0 0 #141414' }}
            animate={{ rotate: [0, -4, 4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span key={emojiIndex} className="text-5xl">
              {emojis[emojiIndex]}
            </span>
          </motion.div>
        </motion.div>

        {/* ---- 标签说明行（3 个小徽章，轻微倾斜） ---- */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 mb-7"
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
              className="font-black text-[13px] px-4 py-2 rounded-full"
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

        {/* ---- CTA 按钮（粉红 + 粗黑描边阴影） ---- */}
        <motion.button
          onClick={() => navigate('/quiz')}
          className="btn-comic-pink mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 180 }}
          whileTap={{ scale: 0.97 }}
        >
          ⚡ 立即开始测试
        </motion.button>

        {/* ---- 次按钮（白底，进入"查看结果样本" / 直接跳转结果） ---- */}
        <motion.button
          onClick={() => navigate('/quiz')}
          className="btn-comic-white mb-7"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.97 }}
        >
          🔎 先看看规则
        </motion.button>

        {/* ---- 底部脚注 ---- */}
        <motion.div
          className="w-full text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div
            className="inline-block font-black text-[11px] text-[#141414] bg-white/70 px-4 py-2 rounded-full"
            style={{ border: '2px solid #141414', letterSpacing: '2px' }}
          >
            本测试纯属娱乐 · 请勿对号入座 🫡
          </div>
        </motion.div>
      </div>
    </div>
  );
}
