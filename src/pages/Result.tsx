import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import type { Question } from '../data/questions';
import { calculateScore } from '../utils/calculator';
import { getOrCreateShareCode, saveLastResult } from '../utils/storage';
import { generateShareText, shareToWeb } from '../utils/share';

interface LocationState {
  answers: (number | null)[];
  questions: Question[];
  setName: string;
}

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();
  const cardRef = useRef<HTMLDivElement>(null);

  const state = location.state as LocationState | null;

  const [result, setResult] = useState<ReturnType<typeof calculateScore> | null>(null);
  const [shareCode, setShareCode] = useState('');
  const [scoreDisplay, setScoreDisplay] = useState(0);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  }, []);

  useEffect(() => {
    if (!state?.answers || state.answers.some((a) => a === null) || !state.questions) {
      navigate('/');
      return;
    }

    const scoreResult = calculateScore(
      state.answers.map((a, i) => ({ questionId: i, optionIndex: a! })),
      state.questions
    );
    setResult(scoreResult);
    setShareCode(getOrCreateShareCode());
    saveLastResult({
      score: scoreResult.totalScore,
      levelTitle: scoreResult.level.title,
      levelEmoji: scoreResult.level.emoji,
      timestamp: Date.now(),
    });
  }, [state, navigate]);

  useEffect(() => {
    if (!result) return;
    const target = result.percentage;
    let current = 0;
    const step = 16;
    const increment = target / (1200 / step);

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        setScoreDisplay(target);
        clearInterval(timer);
      } else {
        setScoreDisplay(Math.floor(current));
      }
    }, step);
    return () => clearInterval(timer);
  }, [result]);

  const handleShareToFriend = useCallback(async () => {
    if (!result) return;
    const text = generateShareText(result.level.emoji, result.level.title, result.percentage);
    const status = await shareToWeb({
      title: text.title,
      text: text.desc,
      url: `${window.location.origin}?share=${shareCode}`,
    });
    if (status === 'copied') {
      showToast('✅ 链接已复制，快去粘贴给好友吧');
    } else if (status === 'shared') {
      showToast('✅ 已分享');
    }
  }, [result, shareCode, showToast]);

  const handleSaveImage = useCallback(async () => {
    if (!cardRef.current || !result) return;
    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
        logging: false,
      });
      const link = document.createElement('a');
      link.download = `牛马等级-${result.level.title}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      showToast('✅ 图片已保存');
    } catch {
      showToast('❌ 保存失败，请重试');
    }
  }, [result, showToast]);

  if (!result) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex items-center gap-3 text-white/30">
          <span className="animate-spin inline-block w-4 h-4 border-2 border-[#f0a500]/30 border-t-[#f0a500] rounded-full" />
          <span className="text-sm">正在演算你的牛马纯度...</span>
        </div>
      </div>
    );
  }

  const level = result.level;

  return (
    <div className="min-h-screen relative overflow-y-auto">
      {/* 背景 */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full blur-3xl opacity-30"
          style={{ background: `radial-gradient(circle, ${level.gradientFrom}33, transparent 70%)` }} />
        <div className="absolute bottom-0 left-0 w-[400px] h-[250px] rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${level.gradientTo}33, transparent 70%)` }} />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-5 py-8 space-y-6 min-h-screen flex flex-col">

        {/* ========== 截图分享卡片（无动画、纯 inline，确保 html2canvas 正确渲染） ========== */}
        <div
          ref={cardRef}
          style={{
            background: `linear-gradient(145deg, ${level.gradientFrom}dd, ${level.gradientTo}dd)`,
            borderRadius: 24,
            overflow: 'hidden',
            flexShrink: 0,
            position: 'relative',
            width: '100%',
            maxWidth: 400,
            alignSelf: 'center',
            boxShadow: `0 0 60px ${level.gradientFrom}33, 0 20px 60px rgba(0,0,0,0.5)`,
          }}
        >
          {/* 装饰圆点纹理 */}
          <div style={{
            position: 'absolute', inset: 0, opacity: 0.08, pointerEvents: 'none',
            backgroundImage: `radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px),
              radial-gradient(circle at 75% 70%, #fff 1px, transparent 1px),
              radial-gradient(circle at 45% 15%, #fff 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }} />

          <div style={{ position: 'relative', padding: '28px 24px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            {/* ---- emoji ---- */}
            <div style={{ fontSize: 64, lineHeight: 1, marginBottom: 8, filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
              {level.emoji}
            </div>

            {/* ---- 称号 ---- */}
            <div style={{ textAlign: 'center', marginBottom: 4 }}>
              <div style={{ fontSize: 26, fontWeight: 900, color: '#fff', lineHeight: 1.3, letterSpacing: 1 }}>
                {level.title}
              </div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', marginTop: 2, letterSpacing: 2 }}>
                {level.subtitle}
              </div>
            </div>

            {/* ---- 分数 ---- */}
            <div style={{ textAlign: 'center', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4 }}>
                <span style={{ fontSize: 52, fontWeight: 900, color: '#fff', lineHeight: 1 }}>
                  {scoreDisplay}
                </span>
                <span style={{ fontSize: 16, fontWeight: 500, color: 'rgba(255,255,255,0.55)' }}>%</span>
              </div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2, letterSpacing: 1 }}>
                {result.totalScore}分 / {result.maxScore}分 · {level.percentage}
              </div>
            </div>

            {/* ---- 分隔线 ---- */}
            <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.18)', margin: '4px 0 12px' }} />

            {/* ---- 打油诗 ---- */}
            <div style={{ width: '100%', background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '12px 16px', textAlign: 'center', marginBottom: 10 }}>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.88)', fontSize: 12, lineHeight: 1.8, fontStyle: 'italic', whiteSpace: 'pre-line' }}>
                {level.poem}
              </p>
            </div>

            {/* ---- 评语 ---- */}
            <div style={{ width: '100%', marginBottom: 14 }}>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.6)', fontSize: 10, lineHeight: 1.7, whiteSpace: 'pre-line' }}>
                {level.comment}
              </p>
            </div>

            {/* ---- 二维码 ---- */}
            <div style={{ width: '100%', background: '#fff', borderRadius: 12, padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ width: 68, height: 68, flexShrink: 0 }}>
                <QRCodeSVG
                  value={`${window.location.origin}?share=${shareCode}`}
                  size={68}
                  bgColor="#ffffff"
                  fgColor="#141420"
                  level="M"
                />
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, color: '#333', fontSize: 13, fontWeight: 700 }}>扫码测你的牛马等级</p>
                <p style={{ margin: '2px 0 0', color: '#999', fontSize: 11 }}>看看你是哪种牛马</p>
              </div>
              <span style={{ color: '#ccc', fontSize: 10, whiteSpace: 'nowrap', writingMode: 'vertical-rl', letterSpacing: 2 }}>
                🐂牛马测试
              </span>
            </div>
          </div>
        </div>

        {/* ========== 操作按钮 ========== */}
        <motion.div
          className="space-y-3 flex-shrink-0 pb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <motion.button
            onClick={handleShareToFriend}
            className="w-full py-3.5 rounded-2xl font-bold text-sm tracking-wide
                       bg-gradient-to-r from-[#07c160] to-[#06ad56] text-white
                       shadow-[0_4px_20px_rgba(7,193,96,0.3)]
                       hover:shadow-[0_6px_30px_rgba(7,193,96,0.4)]
                       active:scale-[0.98] transition-all duration-200"
            whileTap={{ scale: 0.97 }}
          >
            💬 分享给好友
          </motion.button>

          <div className="grid grid-cols-2 gap-3">
            <motion.button
              onClick={handleSaveImage}
              className="py-3 rounded-2xl text-sm font-medium tracking-wide
                         border border-white/[0.08] bg-white/[0.03] text-white/70
                         hover:bg-white/[0.06] hover:text-white hover:border-white/15
                         active:scale-[0.98] transition-all duration-200"
              whileTap={{ scale: 0.97 }}
            >
              📷 保存图片
            </motion.button>
            <motion.button
              onClick={() => navigate('/')}
              className="py-3 rounded-2xl text-sm font-medium tracking-wide
                         border border-white/[0.05] bg-white/[0.02] text-white/35
                         hover:bg-white/[0.04] hover:text-white/55
                         active:scale-[0.98] transition-all duration-200"
              whileTap={{ scale: 0.97 }}
            >
              🔄 再测一次
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* ========== Toast ========== */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div className="bg-white/95 backdrop-blur-md text-gray-800 text-sm font-medium px-5 py-3 rounded-2xl shadow-xl">
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
