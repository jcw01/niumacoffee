import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { questions as setA } from '../data/questions';
import { questions as setB } from '../data/questions-b';
import { questions as setC } from '../data/questions-c';
import type { Question } from '../data/questions';
import ProgressBar from '../components/ProgressBar';
import OptionCard from '../components/OptionCard';
import ParticleBg from '../components/ParticleBg';

const allSets = [setA, setB, setC] as Question[][];
const setNames = ['经典黑化版', '反向讽刺版', '硬核实录版'];

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

  const [questionSet, setNameIndex] = useState(() => {
    const idx = Math.floor(Math.random() * allSets.length);
    return { set: allSets[idx], nameIndex: idx };
  });

  const questions = questionSet.set;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    new Array(questions.length).fill(null)
  );

  const currentQuestion = questions[currentIndex];
  const cat = categoryLabels[currentQuestion.category] || {
    icon: '📋',
    label: currentQuestion.category,
  };

  const handleSelect = useCallback(
    (optionIndex: number) => {
      if (answers[currentIndex] !== null) return;
      const newAnswers = [...answers];
      newAnswers[currentIndex] = optionIndex;
      setAnswers(newAnswers);

      setTimeout(() => {
        if (currentIndex < questions.length - 1) {
          setCurrentIndex((prev) => prev + 1);
        } else {
          navigate('/result', {
            state: {
              answers: newAnswers,
              questions: questions,
              setName: setNames[questionSet.nameIndex],
            },
          });
        }
      }, 350);
    },
    [currentIndex, answers, navigate, questions, questionSet.nameIndex]
  );

  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen flex flex-col relative px-5 py-6">
      <ParticleBg count={10} />

      <header className="relative z-10 max-w-lg mx-auto w-full mb-5">
        <ProgressBar current={currentIndex} total={questions.length} />

        <div className="flex items-center justify-between mt-3 flex-wrap gap-2">
          {/* 分类徽章（白底 + 粗黑描边） */}
          <span
            className="font-black text-[12px] text-[#141414] px-3 py-1.5 rounded-full inline-flex items-center gap-1.5"
            style={{
              background: '#fff',
              border: '3px solid #141414',
              boxShadow: '3px 3px 0 0 #141414',
              letterSpacing: 1,
            }}
          >
            <span>{cat.icon}</span>
            <span>{cat.label}</span>
          </span>

          {/* 题库版本小徽章（粉红） */}
          <span
            className="font-black text-[12px] text-white px-3 py-1.5 rounded-full"
            style={{
              background: '#FF2D7A',
              border: '3px solid #141414',
              boxShadow: '3px 3px 0 0 #141414',
              letterSpacing: 1,
            }}
          >
            {setNames[questionSet.nameIndex]}
          </span>
        </div>
      </header>

      <main className="flex-1 relative z-10 max-w-lg mx-auto w-full pb-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
          >
            {/* 题目卡片（白底 + 粗黑描边 + 阴影 + 轻微倾斜） */}
            <motion.div
              className="relative mb-5 p-5 rounded-[20px]"
              style={{
                background: '#fff',
                border: '4px solid #141414',
                boxShadow: '6px 6px 0 0 #141414',
                transform: 'rotate(-0.5deg)',
              }}
              initial={{ opacity: 0, y: 10, rotate: 0 }}
              animate={{ opacity: 1, y: 0, rotate: -0.5 }}
              transition={{ duration: 0.3 }}
            >
              {/* 左上角小标签 */}
              <div
                className="absolute -top-3 -left-3 font-black text-[12px] text-white px-3 py-1.5 rounded-full"
                style={{
                  background: '#FF2D7A',
                  border: '3px solid #141414',
                  boxShadow: '3px 3px 0 0 #141414',
                  letterSpacing: 1,
                }}
              >
                Q{currentIndex + 1}
              </div>

              <h2
                className="font-black text-[#141414] leading-relaxed pt-2"
                style={{ fontSize: 18, letterSpacing: 1 }}
              >
                {currentQuestion.question}
              </h2>
            </motion.div>

            {/* 选项列表 */}
            <div className="flex flex-col gap-3">
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

      {/* 底部按钮区 */}
      {currentIndex > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 z-20 px-5 py-5 max-w-lg mx-auto w-full">
          <button
            onClick={handlePrev}
            className="btn-comic-white"
            style={{ width: '100%' }}
          >
            ⬅ 返回上一题
          </button>
        </footer>
      )}
    </div>
  );
}
