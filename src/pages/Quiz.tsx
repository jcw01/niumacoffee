import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { questions as setA } from '../data/questions';
import { questions as setB } from '../data/questions-b';
import { questions as setC } from '../data/questions-c';
import { questions as setCampus } from '../data/questions-campus';
import { questions as setCampusB } from '../data/questions-campus-b';
import { questions as setCampusC } from '../data/questions-campus-c';
import { questions as setLove } from '../data/questions-love';
import { questions as setLoveB } from '../data/questions-love-b';
import { questions as setLoveC } from '../data/questions-love-c';
import type { Question } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import OptionCard from '../components/OptionCard';
import ParticleBg from '../components/ParticleBg';
import { saveQuizProgress, loadQuizProgress, clearQuizProgress } from '../utils/storage';
import { trackEvent } from '../utils/analytics';
import { calculateScore } from '../utils/calculator';

// Fisher-Yates 洗牌算法
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 版本配置映射：每套版本的题库来源、抽题数量和显示标签
const versionConfig: Record<string, { sets: Question[][]; count: number; label: string }> = {
  workplace: { sets: [setA, setB, setC], count: 30, label: '🏢 职场牛马版' },
  campus: { sets: [setCampus, setCampusB, setCampusC], count: 30, label: '🎓 校园牛马版' },
  love: { sets: [setLove, setLoveB, setLoveC], count: 30, label: '💕 恋爱牛马版' },
};

// 根据版本从对应题库抽题
function buildQuestions(version: string): { questions: Question[]; label: string } {
  const config = versionConfig[version] || versionConfig.workplace;
  if (config.sets.length === 1) {
    return { questions: shuffle(config.sets[0]).slice(0, config.count), label: config.label };
  }
  // 多题库：各抽若干题合并打乱
  const perSet = Math.ceil(config.count / config.sets.length);
  const picked = config.sets.flatMap((set) => shuffle(set).slice(0, perSet));
  return { questions: shuffle(picked).slice(0, config.count), label: config.label };
}

const categoryLabels: Record<string, { icon: string; label: string }> = {
  intro: { icon: '🎬', label: '开场' },
  worktime: { icon: '⏰', label: '工作时长' },
  message: { icon: '📱', label: '工作消息' },
  salary: { icon: '💰', label: '薪资性价比' },
  status: { icon: '🎭', label: '职场地位' },
  life: { icon: '🏠', label: '生活状态' },
  dark: { icon: '🩸', label: '黑化时刻' },
  finale: { icon: '🏁', label: '终极拷问' },
};

export default function Quiz() {
  const navigate = useNavigate();
  const location = useLocation();
  const version = (location.state as { version?: string })?.version || 'workplace';

  // 尝试恢复进度，无则根据版本生成新题
  const [questionSet] = useState(() => {
    const saved = loadQuizProgress();
    if (saved) {
      return { questions: saved.questions as Question[], label: saved.label || '混合随机版' };
    }
    return buildQuestions(version);
  });

  const questions = questionSet.questions;
  const [currentIndex, setCurrentIndex] = useState(() => {
    const saved = loadQuizProgress();
    return saved ? saved.currentIndex : 0;
  });
  const [answers, setAnswers] = useState<(number | null)[]>(() => {
    const saved = loadQuizProgress();
    if (saved) return saved.answers;
    return new Array(questions.length).fill(null);
  });

  // 开始答题时埋点（仅首次进入）
  useEffect(() => {
    trackEvent('quiz_start', { version });
  }, [version]);

  // 每次 answers 或 currentIndex 变化时自动保存进度
  useEffect(() => {
    saveQuizProgress(questions, answers, currentIndex, questionSet.label);
  }, [questions, answers, currentIndex]);

  const currentQuestion = questions[currentIndex];
  const cat = categoryLabels[currentQuestion.category] || {
    icon: '📋',
    label: currentQuestion.category,
  };

  // 当前题是否已作答
  const isAnswered = answers[currentIndex] !== null;
  // 是否是最后一题且已全部作答
  const isLastAndAllDone = currentIndex === questions.length - 1 && answers.every((a) => a !== null);

  // 选择/修改答案（允许重新选择）
  const handleSelect = useCallback(
    (optionIndex: number) => {
      const newAnswers = [...answers];
      newAnswers[currentIndex] = optionIndex;
      setAnswers(newAnswers);
    },
    [currentIndex, answers]
  );

  // 下一题
  const handleNext = useCallback(() => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      // 最后一题，跳转结果并清除进度
      clearQuizProgress();
      const scoreResult = calculateScore(
        answers.map((a, i) => ({ questionId: i, optionIndex: a! })),
        questions
      );
      trackEvent('quiz_complete', { version, level: scoreResult.level.title });
      navigate('/result', {
        state: {
          answers,
          questions,
          setName: questionSet.label,
        },
      });
    }
  }, [currentIndex, navigate, answers, questionSet.label, questions]);

  // 上一题
  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  // 阶段性鼓励弹窗
  const [milestoneToast, setMilestoneToast] = useState<string | null>(null);

  useEffect(() => {
    // 根据题目总数动态计算里程碑位置
    const milestone1 = Math.floor(questions.length / 3);
    const milestone2 = Math.floor(questions.length * 2 / 3);
    if (currentIndex === milestone1) {
      setMilestoneToast('💪 已完成 1/3，继续加油！');
    } else if (currentIndex === milestone2) {
      const remaining = questions.length - milestone2;
      setMilestoneToast(`🔥 就剩 ${remaining} 题了，冲刺！`);
    }
  }, [currentIndex, questions.length]);

  // 弹窗自动消失
  useEffect(() => {
    if (!milestoneToast) return;
    const timer = setTimeout(() => setMilestoneToast(null), 2000);
    return () => clearTimeout(timer);
  }, [milestoneToast]);

  return (
    <div className="min-h-screen flex flex-col relative px-4 py-5">
      <ParticleBg count={10} />

      {/* 顶部导航栏：返回首页 */}
      <header className="relative z-10 max-w-lg mx-auto w-full mb-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => {
              if (window.confirm('确定要放弃当前进度吗？')) {
                clearQuizProgress();
                navigate('/');
              }
            }}
            className="font-black flex items-center gap-1"
            style={{
              fontSize: 'clamp(12px, 3vw, 14px)',
              color: '#141414',
              padding: '6px 12px',
              borderRadius: 999,
              border: '3px solid #141414',
              background: '#fff',
              boxShadow: '3px 3px 0 0 #141414',
            }}
          >
            🏠 首页
          </button>
          <span
            className="font-black text-white px-3 py-1.5 rounded-full"
            style={{
              fontSize: 'clamp(10px, 2.5vw, 12px)',
              background: '#FF2D7A',
              border: '3px solid #141414',
              boxShadow: '3px 3px 0 0 #141414',
              letterSpacing: 1,
            }}
          >
            {questionSet.label}
          </span>
        </div>
      </header>

      {/* 进度条 + 分类 */}
      <div className="relative z-10 max-w-lg mx-auto w-full mb-4">
        <ProgressBar current={currentIndex} total={questions.length} />
        <div className="flex items-center justify-between mt-3">
          <span
            className="font-black px-3 py-1.5 rounded-full inline-flex items-center gap-1.5"
            style={{
              fontSize: 'clamp(10px, 2.5vw, 12px)',
              background: '#fff',
              border: '3px solid #141414',
              boxShadow: '3px 3px 0 0 #141414',
              letterSpacing: 1,
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </span>
        </div>
      </div>

      {/* 题目 + 选项 */}
      <main className="flex-1 relative z-10 max-w-lg mx-auto w-full pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
          >
            {/* 题目卡片 */}
            <div
              className="relative mb-4 p-4 sm:p-5 rounded-[18px]"
              style={{
                background: '#fff',
                border: '3px solid #141414',
                boxShadow: '5px 5px 0 0 #141414',
              }}
            >
              <div
                className="absolute -top-2.5 -left-2.5 font-black text-white px-2.5 py-1 rounded-full"
                style={{
                  fontSize: 'clamp(10px, 2.5vw, 12px)',
                  background: '#FF2D7A',
                  border: '3px solid #141414',
                  boxShadow: '2px 2px 0 0 #141414',
                  letterSpacing: 1,
                }}
              >
                Q{currentIndex + 1}
              </div>

              <h2
                className="font-black leading-relaxed pt-2"
                style={{
                  fontSize: 'clamp(14px, 3.8vw, 18px)',
                  color: '#141414',
                  letterSpacing: 0.5,
                }}
              >
                {currentQuestion.question}
              </h2>
            </div>

            {/* 选项列表（可重复点击修改） */}
            <div className="flex flex-col gap-2.5">
              {currentQuestion.options.map((option, idx) => (
                <OptionCard
                  key={`${currentIndex}-${idx}`}
                  label={option.label}
                  text={option.text}
                  selected={answers[currentIndex] === idx}
                  onClick={() => handleSelect(idx)}
                  index={idx}
                />
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 阶段性鼓励弹窗 */}
      <AnimatePresence>
        {milestoneToast && (
          <motion.div
            className="fixed inset-0 z-30 flex items-center justify-center pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <motion.div
              className="font-black px-6 py-4 rounded-[16px]"
              style={{
                fontSize: 'clamp(16px, 4.5vw, 22px)',
                background: '#FFE135',
                color: '#141414',
                border: '4px solid #141414',
                boxShadow: '6px 6px 0 0 #141414',
                letterSpacing: '0.5px',
              }}
              initial={{ scale: 0.5, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.8, y: -20, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {milestoneToast}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 底部操作栏：上一题 / 下一题 / 查看结果 */}
      <footer
        className="fixed bottom-0 left-0 right-0 z-20 px-4 py-4 max-w-lg mx-auto"
        style={{
          background: 'linear-gradient(transparent, #FFE135 30%)',
          paddingBottom: 'max(16px, env(safe-area-inset-bottom))',
        }}
      >
        <div className="flex gap-3">
          {currentIndex > 0 && (
            <button onClick={handlePrev} className="btn-comic-white" style={{ flex: 1 }}>
              ⬅ 上一题
            </button>
          )}

          {/* 已作答才显示下一题/查看结果按钮 */}
          {isAnswered && (
            <button
              onClick={handleNext}
              className="btn-comic-pink"
              style={{ flex: currentIndex > 0 ? 1 : '1 1 100%' }}
            >
              {isLastAndAllDone ? '🏁 查看结果' : '➡ 下一题'}
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
