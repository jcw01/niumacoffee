import { useRef, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import type { Question } from '../data/questions';
import { calculateScore } from '../utils/calculator';
import { getOrCreateShareCode, saveLastResult } from '../utils/storage';
import { generateShareText, shareToWeb } from '../utils/share';
import ParticleBg from '../components/ParticleBg';

interface LocationState {
  answers: (number | null)[];
  questions: Question[];
  setName: string;
}

const INK = '#141414';
const YELLOW = '#FFE135';
const PINK = '#FF2D7A';

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
    const increment = target / (1000 / step);
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
    const text = generateShareText(result.level.emoji, result.level.title, result.percentage, result.level.shareText);
    const status = await shareToWeb({
      title: text.title,
      text: text.desc,
      url: `${window.location.origin}?share=${shareCode}`,
    });
    if (status === 'copied') showToast('✅ 链接已复制，快去粘贴给好友吧');
    else if (status === 'shared') showToast('✅ 已分享');
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
        <div className="flex items-center gap-3 font-black" style={{ color: INK }}>
          <span
            className="inline-block w-5 h-5 border-[3px] rounded-full animate-spin"
            style={{ borderColor: INK, borderTopColor: PINK }}
          />
          <span style={{ fontSize: 14 }}>正在演算你的牛马纯度...</span>
        </div>
      </div>
    );
  }

  const level = result.level;

  return (
    <div className="min-h-screen relative overflow-y-auto px-4 py-6">
      <ParticleBg count={14} />

      <div className="relative z-10 max-w-md mx-auto space-y-5 min-h-screen flex flex-col">
        {/* ========== 截图分享卡片 ========== */}
        <div
          ref={cardRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 400,
            margin: '0 auto',
            padding: 'clamp(12px, 3vw, 18px)',
            borderRadius: 22,
            border: '4px solid ' + INK,
            boxShadow: '6px 6px 0 0 ' + INK,
            background: YELLOW,
          }}
        >
          {/* 斜纹装饰层 */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 18,
              backgroundImage:
                'repeating-linear-gradient(-45deg, rgba(255,212,0,0.9) 0px, rgba(255,212,0,0.9) 16px, rgba(255,225,53,1) 16px, rgba(255,225,53,1) 32px)',
              opacity: 0.5,
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            {/* 顶部粉红横幅 */}
            <div
              style={{
                alignSelf: 'center',
                background: PINK,
                color: '#fff',
                border: '3px solid ' + INK,
                borderRadius: 999,
                padding: '6px 16px',
                fontWeight: 900,
                fontSize: 'clamp(11px, 2.8vw, 14px)',
                letterSpacing: 2,
                boxShadow: '3px 3px 0 0 ' + INK,
                marginBottom: 12,
                transform: 'rotate(-2deg)',
              }}
            >
              🔥 你的牛马等级鉴定书
            </div>

            {/* 内容主卡片 */}
            <div
              style={{
                background: '#fff',
                border: '3px solid ' + INK,
                borderRadius: 18,
                boxShadow: '4px 4px 0 0 ' + INK,
                padding: 'clamp(14px, 3.5vw, 22px) clamp(12px, 3vw, 18px) clamp(12px, 3vw, 20px)',
                textAlign: 'center',
                marginBottom: 12,
              }}
            >
              {/* emoji 大圆 - flex居中 + lineHeight:1 */}
              <div
                style={{
                  width: 'clamp(72px, 20vw, 100px)',
                  height: 'clamp(72px, 20vw, 100px)',
                  margin: '0 auto 10px',
                  borderRadius: 999,
                  border: '4px solid ' + INK,
                  background: YELLOW,
                  boxShadow: '4px 4px 0 0 ' + INK,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: 1,
                }}
              >
                <span style={{ fontSize: 'clamp(36px, 10vw, 52px)', lineHeight: 1, display: 'block' }}>
                  {level.emoji}
                </span>
              </div>

              {/* 称号 */}
              <div style={{ fontSize: 'clamp(22px, 6vw, 30px)', fontWeight: 900, color: INK, letterSpacing: 2, lineHeight: 1.3, marginBottom: 4, textRendering: 'optimizeLegibility' }}>
                {level.title}
              </div>
              <div style={{ fontSize: 'clamp(9px, 2.2vw, 12px)', fontWeight: 700, color: PINK, letterSpacing: 3, marginBottom: 12, textRendering: 'optimizeLegibility' }}>
                {level.subtitle.toUpperCase()}
              </div>

              {/* 百分比大数字 - 加大下边距避免与击败文字重叠 */}
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: 4, marginBottom: 16 }}>
                <span style={{ fontSize: 'clamp(40px, 11vw, 60px)', fontWeight: 900, color: INK, lineHeight: 1.1, letterSpacing: 1, textRendering: 'optimizeLegibility' }}>
                  {scoreDisplay}
                </span>
                <span style={{ fontSize: 'clamp(16px, 4vw, 20px)', fontWeight: 900, color: PINK, lineHeight: 1.1, textRendering: 'optimizeLegibility' }}>%</span>
              </div>

              {/* 击败信息 - pill/badge 样式 */}
              <div style={{
                display: 'inline-block',
                background: YELLOW,
                border: '2px solid ' + INK,
                borderRadius: 999,
                padding: '4px 14px',
                fontSize: 'clamp(10px, 2.5vw, 12px)',
                fontWeight: 900,
                color: INK,
                letterSpacing: 1,
                marginBottom: 10,
                boxShadow: '2px 2px 0 0 ' + INK,
                textRendering: 'optimizeLegibility',
              }}>
                {result.totalScore} 分 · 击败 {level.percentage} 打工人
              </div>

              {/* 社交传播文案 */}
              <div style={{
                fontSize: 'clamp(11px, 2.8vw, 13px)',
                fontWeight: 900,
                color: PINK,
                letterSpacing: 1,
                marginBottom: 14,
                textRendering: 'optimizeLegibility',
              }}>
                {level.shareText}
              </div>

              {/* 分隔线 */}
              <div style={{ width: '100%', height: 3, background: INK, borderRadius: 2, margin: '8px 0' }} />

              {/* 打油诗 */}
              <div
                style={{
                  background: YELLOW,
                  border: '3px solid ' + INK,
                  borderRadius: 12,
                  boxShadow: '3px 3px 0 0 ' + INK,
                  padding: '10px 12px',
                  marginBottom: 10,
                }}
              >
                <p style={{ margin: 0, color: INK, fontSize: 'clamp(12px, 3vw, 14px)', fontWeight: 900, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {level.poem}
                </p>
              </div>

              {/* 评语 */}
              <div
                style={{
                  background: '#FFF7E0',
                  border: '3px solid ' + INK,
                  borderRadius: 12,
                  boxShadow: '3px 3px 0 0 ' + INK,
                  padding: '10px 12px',
                  marginBottom: 12,
                  textAlign: 'left',
                }}
              >
                <p style={{ margin: 0, color: INK, fontSize: 'clamp(11px, 2.8vw, 12.5px)', fontWeight: 700, lineHeight: 1.8, whiteSpace: 'pre-line' }}>
                  {level.comment}
                </p>
              </div>

              {/* 二维码 */}
              <div
                style={{
                  background: '#fff',
                  border: '3px solid ' + INK,
                  borderRadius: 12,
                  boxShadow: '3px 3px 0 0 ' + INK,
                  padding: '8px 10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                }}
              >
                <div
                  style={{
                    width: 'clamp(52px, 14vw, 68px)',
                    height: 'clamp(52px, 14vw, 68px)',
                    flexShrink: 0,
                    border: '2px solid ' + INK,
                    borderRadius: 8,
                    padding: 3,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <QRCodeSVG
                    value={`${window.location.origin}?share=${shareCode}`}
                    size={56}
                    bgColor="#ffffff"
                    fgColor={INK}
                    level="M"
                  />
                </div>
                <div style={{ flex: 1, textAlign: 'left' }}>
                  <p style={{ margin: 0, color: INK, fontSize: 'clamp(11px, 2.8vw, 13px)', fontWeight: 900, letterSpacing: 1 }}>
                    扫码测你的牛马等级
                  </p>
                  <p style={{ margin: '3px 0 0', color: PINK, fontSize: 'clamp(10px, 2.5vw, 12px)', fontWeight: 900, letterSpacing: 1 }}>
                    看看你是哪种牛马 🐂🐎
                  </p>
                </div>
              </div>
            </div>

            {/* 底部水印 - 居中对齐 */}
            <div
              style={{
                textAlign: 'center',
                width: '100%',
              }}
            >
              <span
                style={{
                  display: 'inline-block',
                  background: '#fff',
                  color: INK,
                  border: '2px solid ' + INK,
                  borderRadius: 999,
                  padding: '3px 12px',
                  fontSize: 'clamp(9px, 2.2vw, 11px)',
                  fontWeight: 900,
                  letterSpacing: 2,
                  boxShadow: '2px 2px 0 0 ' + INK,
                }}
              >
                牛马测试 · 仅供娱乐
              </span>
            </div>
          </div>
        </div>

        {/* ========== 操作按钮 ========== */}
        <motion.div
          className="space-y-3 flex-shrink-0 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button onClick={handleShareToFriend} className="btn-comic-pink">
            💅 让好友也来测
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleSaveImage} className="btn-comic-white">
              📷 保存战绩图
            </button>
            <button onClick={() => navigate('/')} className="btn-comic-white">
              🔄 再测一次
            </button>
          </div>
        </motion.div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div
            style={{
              background: '#fff',
              color: INK,
              border: '3px solid ' + INK,
              boxShadow: '4px 4px 0 0 ' + INK,
              borderRadius: 12,
              padding: '8px 16px',
              fontSize: 13,
              fontWeight: 900,
              letterSpacing: 1,
            }}
          >
            {toast}
          </div>
        </div>
      )}
    </div>
  );
}
