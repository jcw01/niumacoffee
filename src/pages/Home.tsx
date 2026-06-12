import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParticleBg from '../components/ParticleBg';
import { useState, useEffect } from 'react';
import { questions as setA } from '../data/questions';
import { questions as setB } from '../data/questions-b';
import { questions as setC } from '../data/questions-c';
import { questions as setCampus } from '../data/questions-campus';
import { questions as setLove } from '../data/questions-love';
import { trackEvent } from '../utils/analytics';

// 题库版本配置
const versions = [
  { id: 'workplace', emoji: '🏢', name: '职场牛马版', desc: '打工人专属灵魂拷问', sets: [setA, setB, setC] },
  { id: 'campus', emoji: '🎓', name: '校园牛马版', desc: '学生党的生存图鉴', sets: [setCampus] },
  { id: 'love', emoji: '💕', name: '恋爱牛马版', desc: '舔狗等级鉴定', sets: [setLove] },
];

const emojis = ['🐂', '🐎', '🐕', '🐱', '🦄', '👑'];

// 呼吸光效 keyframes（注入到 document）
const PULSE_KEYFRAMES_ID = 'comic-pulse-keyframes';
if (typeof document !== 'undefined' && !document.getElementById(PULSE_KEYFRAMES_ID)) {
  const style = document.createElement('style');
  style.id = PULSE_KEYFRAMES_ID;
  style.textContent = `
    @keyframes comic-breathe {
      0%, 100% { box-shadow: 0 0 8px 2px rgba(255,45,122,0.4), 4px 4px 0 0 #141414; }
      50% { box-shadow: 0 0 22px 8px rgba(255,45,122,0.7), 4px 4px 0 0 #141414; }
    }
  `;
  document.head.appendChild(style);
}

export default function Home() {
  const navigate = useNavigate();
  const [emojiIndex, setEmojiIndex] = useState(0);
  const [selectedVersion, setSelectedVersion] = useState('workplace');

  // 页面浏览埋点
  useEffect(() => {
    trackEvent('page_view', { page: 'home' });
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setEmojiIndex((prev) => (prev + 1) % emojis.length);
    }, 1800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative px-4 py-6">
      {/* 粒子背景：z-0，在最底层 */}
      <ParticleBg count={18} />

      {/* 内容区：z-10，在粒子之上 */}
      <div className="relative z-10 max-w-md w-full flex flex-col items-center">
        {/* 顶部粉红横幅 */}
        <motion.div
          className="px-4 py-2 mb-4 rounded-full font-black text-[clamp(10px,3vw,12px)] tracking-widest whitespace-nowrap"
          style={{
            background: '#FF2D7A',
            color: '#fff',
            border: '3px solid #141414',
            boxShadow: '4px 4px 0 0 #141414',
          }}
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1, type: 'spring', stiffness: 180 }}
        >
          🚨 牛马等级鉴定中心 · 限时免费
        </motion.div>

        {/* 标题大卡 */}
        <motion.div
          className="w-full mb-5 px-4 py-6 sm:px-6 sm:py-8 rounded-[20px] bg-white text-center"
          style={{
            maxWidth: 'min(100%, 420px)',
            border: '4px solid #141414',
            boxShadow: '6px 6px 0 0 #141414',
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 160 }}
        >
          {/* ZOO·RANK 标签 */}
          <span
            className="inline-block mb-4 font-black tracking-[3px] px-3 py-1 rounded-full"
            style={{
              fontSize: 'clamp(10px, 2.5vw, 12px)',
              background: '#FFE135',
              border: '2px solid #141414',
              color: '#141414',
            }}
          >
            ZOO·RANK
          </span>

          {/* 主标题 */}
          <h1
            className="font-black leading-tight mb-1 text-comic-title"
            style={{ fontSize: 'clamp(32px, 9vw, 50px)' }}
          >
            牛马等级
          </h1>
          <h2
            className="font-black leading-tight mb-4 text-comic-title"
            style={{ fontSize: 'clamp(32px, 9vw, 50px)' }}
          >
            测 · 试
          </h2>

          <p
            className="font-black mb-4 tracking-[1px]"
            style={{ fontSize: 'clamp(13px, 3.5vw, 15px)', color: '#141414' }}
          >
            测测你是哪种牛马 🐂🐎
          </p>

          {/* Emoji 大圆 + 脉冲光环 */}
          <div className="relative mx-auto" style={{ width: 'clamp(64px, 18vw, 80px)', height: 'clamp(64px, 18vw, 80px)' }}>
            {/* 脉冲光环 */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '3px solid #FFE135' }}
              animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{ border: '2px solid #FF2D7A' }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            />
            <motion.div
              className="relative flex items-center justify-center w-full h-full"
              style={{
                borderRadius: 999,
                background: '#FFE135',
                border: '4px solid #141414',
                boxShadow: '4px 4px 0 0 #141414',
                lineHeight: 1,
              }}
              animate={{ rotate: [0, -4, 4, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              <span key={emojiIndex} style={{ fontSize: 'clamp(28px, 8vw, 40px)' }}>{emojis[emojiIndex]}</span>
            </motion.div>
          </div>
        </motion.div>

        {/* 标签行 - 交错入场 */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-5">
          {[
            { text: '30 道灵魂拷问', color: '#FFE135' },
            { text: '约 3 分钟', color: '#FFFFFF' },
            { text: '仅供娱乐 🤪', color: '#FF2D7A', fg: '#fff' },
          ].map((chip, i) => (
            <motion.span
              key={chip.text}
              className="font-black px-3 py-1.5 rounded-full whitespace-nowrap"
              style={{
                fontSize: 'clamp(11px, 2.8vw, 13px)',
                background: chip.color,
                color: chip.fg || '#141414',
                border: '3px solid #141414',
                boxShadow: '3px 3px 0 0 #141414',
                transform: `rotate(${i % 2 === 0 ? -2 : 2}deg)`,
              }}
              initial={{ opacity: 0, y: 16, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.35 + i * 0.12, type: 'spring', stiffness: 200 }}
            >
              {chip.text}
            </motion.span>
          ))}
        </div>

        {/* 题库版本选择器 - 小屏时允许换行实现 2+1 布局 */}
        <div className="flex flex-wrap gap-2 mb-5 w-full" style={{ justifyContent: 'center' }}>
          {versions.map((v, i) => {
            const isSelected = selectedVersion === v.id;
            return (
              <motion.button
                key={v.id}
                onClick={() => setSelectedVersion(v.id)}
                className="flex flex-col items-center rounded-[14px] font-black"
                style={{
                  flex: '1 1 clamp(90px, 28vw, 130px)',
                  maxWidth: 'clamp(100px, 28vw, 130px)',
                  minWidth: '90px',
                  padding: 'clamp(8px, 2vw, 12px) clamp(4px, 1vw, 8px)',
                  background: isSelected ? '#FFE135' : '#FFFFFF',
                  border: isSelected ? '3px solid #FF2D7A' : '3px solid #141414',
                  boxShadow: isSelected
                    ? '4px 4px 0 0 #FF2D7A'
                    : '4px 4px 0 0 #141414',
                  cursor: 'pointer',
                  transition: 'background 0.2s, border-color 0.2s, box-shadow 0.2s',
                }}
                initial={{ opacity: 0, y: 16, scale: 0.85 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.1, type: 'spring', stiffness: 200 }}
                whileTap={{ scale: 0.95 }}
              >
                <span style={{ fontSize: 'clamp(20px, 5vw, 28px)', lineHeight: 1.2 }}>{v.emoji}</span>
                <span style={{ fontSize: 'clamp(10px, 2.5vw, 13px)', color: '#141414', marginTop: 4 }}>{v.name}</span>
                <span style={{ fontSize: 'clamp(8px, 2vw, 10px)', color: 'rgba(20,20,20,0.55)', marginTop: 2 }}>{v.desc}</span>
              </motion.button>
            );
          })}
        </div>

        {/* CTA 按钮 - 呼吸光效 */}
        <motion.button
          onClick={() => navigate('/quiz', { state: { version: selectedVersion } })}
          className="btn-comic-pink mb-1"
          style={{ animation: 'comic-breathe 2s ease-in-out infinite' }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: 'spring', stiffness: 180 }}
          whileTap={{ scale: 0.97 }}
        >
          ⚡ 立即开始测试
        </motion.button>

        {/* 社交证明 */}
        <motion.p
          className="mb-3 font-black"
          style={{
            fontSize: 'clamp(10px, 2.4vw, 12px)',
            color: 'rgba(20,20,20,0.45)',
            letterSpacing: '0.5px',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          已有 12,847+ 人完成测试
        </motion.p>

        <motion.button
          onClick={() => navigate('/rules')}
          className="btn-comic-white mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.97 }}
        >
          📖 先看看规则
        </motion.button>

        {/* 底部脚注 */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span
            className="inline-block font-black px-3 py-1.5 rounded-full"
            style={{
              fontSize: 'clamp(9px, 2.2vw, 11px)',
              background: 'rgba(255,255,255,0.7)',
              color: '#141414',
              border: '2px solid #141414',
              letterSpacing: '1px',
            }}
          >
            本测试纯属娱乐 · 请勿对号入座 🫡
          </span>
        </motion.div>
      </div>
    </div>
  );
}
