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
    const text = generateShareText(result.level.emoji, result.level.title, result.percentage);
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
        <div className="flex items-center gap-3 font-black text-[#141414]">
          <span
            className="inline-block w-5 h-5 border-[3px] border-[#141414] border-t-[#FF2D7A] rounded-full animate-spin"
          />
          <span className="text-sm">正在演算你的牛马纯度...</span>
        </div>
      </div>
    );
  }

  const level = result.level;

  return (
    <div className="min-h-screen relative overflow-y-auto px-5 py-8">
      <ParticleBg count={14} />

      <div className="relative z-10 max-w-md mx-auto space-y-6 min-h-screen flex flex-col">
        {/* ========== 截图分享卡片 ========== */}
        <div
          ref={cardRef}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 400,
            margin: '0 auto',
            padding: 18,
            borderRadius: 26,
            // 外边框整体阴影
            boxShadow: '8px 8px 0 0 ' + INK,
            border: '4px solid ' + INK,
            // 主背景：亮黄 + 斜纹（附件风格）
            backgroundImage:
              'repeating-linear-gradient(-45deg, #FFE135 0px, #FFE135 16px, #FFD400 16px, #FFD400 32px)',
            background: YELLOW,
          }}
        >
          {/* 斜纹背景层（独立层不影响文字） */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              borderRadius: 22,
              backgroundImage:
                'repeating-linear-gradient(-45deg, rgba(255,212,0,0.9) 0px, rgba(255,212,0,0.9) 16px, rgba(255,225,53,1) 16px, rgba(255,225,53,1) 32px)',
              opacity: 0.55,
              pointerEvents: 'none',
            }}
          />

          <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}>
            {/* 顶部粉红横幅徽章 */}
            <div
              style={{
                alignSelf: 'center',
                background: PINK,
                color: '#fff',
                border: '3px solid ' + INK,
                borderRadius: 999,
                padding: '8px 18px',
                fontWeight: 900,
                fontSize: 14,
                letterSpacing: 2,
                boxShadow: '3px 3px 0 0 ' + INK,
                marginBottom: 14,
                transform: 'rotate(-2deg)',
              }}
            >
              🔥 你的牛马等级鉴定书
            </div>

            {/* 内容主卡片（白底 + 粗黑描边） */}
            <div
              style={{
                background: '#fff',
                border: '4px solid ' + INK,
                borderRadius: 22,
                boxShadow: '5px 5px 0 0 ' + INK,
                padding: '22px 18px 20px',
                textAlign: 'center',
                marginBottom: 14,
              }}
            >
              {/* emoji 大圆 */}
              <div
                style={{
                  width: 100,
                  height: 100,
                  margin: '0 auto 10px',
                  borderRadius: 999,
                  border: '4px solid ' + INK,
                  background: YELLOW,
                  boxShadow: '4px 4px 0 0 ' + INK,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 54,
                }}
              >
                {level.emoji}
              </div>

              {/* 称号 */}
              <div
                style={{
                  fontSize: 30,
                  fontWeight: 900,
                  color: INK,
                  letterSpacing: 2,
                  lineHeight: 1.2,
                  marginBottom: 4,
                }}
              >
                {level.title}
              </div>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 900,
                  color: PINK,
                  letterSpacing: 4,
                  marginBottom: 10,
                }}
              >
                {level.subtitle.toUpperCase()}
              </div>

              {/* 百分数字（大号） */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'baseline',
                  justifyContent: 'center',
                  gap: 4,
                  marginBottom: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 56,
                    fontWeight: 900,
                    color: INK,
                    lineHeight: 1,
                    letterSpacing: 1,
                  }}
                >
                  {scoreDisplay}
                </span>
                <span style={{ fontSize: 18, fontWeight: 900, color: PINK }}>%</span>
              </div>

              {/* 小字说明 */}
              <div
                style={{
                  fontSize: 11,
                  fontWeight: 900,
                  color: INK,
                  letterSpacing: 2,
                  marginBottom: 12,
                }}
              >
                {result.totalScore} 分 · 击败 {level.percentage} 打工人
              </div>

              {/* 分隔线 */}
              <div
                style={{
                  width: '100%',
                  height: 3,
                  background: INK,
                  borderRadius: 2,
                  margin: '10px 0',
                }}
              />

              {/* 打油诗（粉红背景 + 粗黑描边徽章框） */}
              <div
                style={{
                  background: YELLOW,
                  border: '3px solid ' + INK,
                  borderRadius: 14,
                  boxShadow: '3px 3px 0 0 ' + INK,
                  padding: '12px 14px',
                  marginBottom: 12,
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: INK,
                    fontSize: 14,
                    fontWeight: 900,
                    lineHeight: 1.8,
                    whiteSpace: 'pre-line',
                    letterSpacing: 0.5,
                  }}
                >
                  {level.poem}
                </p>
              </div>

              {/* 评语（奶油背景框） */}
              <div
                style={{
                  background: '#FFF7E0',
                  border: '3px solid ' + INK,
                  borderRadius: 14,
                  boxShadow: '3px 3px 0 0 ' + INK,
                  padding: '12px 14px',
                  marginBottom: 14,
                  textAlign: 'left',
                }}
              >
                <p
                  style={{
                    margin: 0,
                    color: INK,
                    fontSize: 12.5,
                    fontWeight: 700,
                    lineHeight: 1.8,
                    whiteSpace: 'pre-line',
                    letterSpacing: 0.2,
                  }}
                >
                  {level.comment}
                </p>
              </div>

              {/* 二维码区域 */}
              <div
                style={{
                  background: '#fff',
                  border: '3px solid ' + INK,
                  borderRadius: 14,
                  boxShadow: '3px 3px 0 0 ' + INK,
                  padding: '10px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 12,
                }}
              >
                <div
                  style={{
                    width: 68,
                    height: 68,
                    flexShrink: 0,
                    background: '#fff',
                    border: '2px solid ' + INK,
                    borderRadius: 10,
                    padding: 4,
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
                  <p style={{ margin: 0, color: INK, fontSize: 13, fontWeight: 900, letterSpacing: 1 }}>
                    扫码测你的牛马等级
                  </p>
                  <p style={{ margin: '4px 0 0', color: PINK, fontSize: 12, fontWeight: 900, letterSpacing: 1 }}>
                    看看你是哪种牛马 🐂🐎
                  </p>
                </div>
              </div>
            </div>

            {/* 底部小水印 */}
            <div
              style={{
                alignSelf: 'center',
                background: '#fff',
                color: INK,
                border: '2px solid ' + INK,
                borderRadius: 999,
                padding: '4px 14px',
                fontSize: 11,
                fontWeight: 900,
                letterSpacing: 2,
                boxShadow: '2px 2px 0 0 ' + INK,
              }}
            >
              牛马测试 · 仅供娱乐
            </div>
          </div>
        </div>

        {/* ========== 操作按钮（漫画风） ========== */}
        <motion.div
          className="space-y-3 flex-shrink-0 pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <button
            onClick={handleShareToFriend}
            className="btn-comic-pink"
            style={{ width: '100%' }}
          >
            💬 分享给好友
          </button>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleSaveImage}
              className="btn-comic-white"
              style={{ width: '100%' }}
            >
              📷 保存图片
            </button>
            <button
              onClick={() => navigate('/')}
              className="btn-comic-white"
              style={{ width: '100%' }}
            >
              🔄 再测一次
            </button>
          </div>
        </motion.div>
      </div>

      {/* ========== Toast ========== */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
          <div
            style={{
              background: '#fff',
              color: INK,
              border: '3px solid ' + INK,
              boxShadow: '4px 4px 0 0 ' + INK,
              borderRadius: 14,
              padding: '10px 18px',
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
