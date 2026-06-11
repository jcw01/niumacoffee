import { useState, useCallback, useMemo } from 'react';
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

  // 随机选择一套题库
  const [questionSet, setNameIndex] = useState(() => {
    const idx = Math.floor(Math.random() * allSets.length);
    return { set: allSets[idx], nameIndex: idx };
  });

  const questions = questionSet.set;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(() =>
    new Array(questions.length).fill(null)
  );
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[currentIndex];
  const cat = categoryLabels[currentQuestion.category] || { icon: '📋', label: currentQuestion.category };

  const handleSelect = useCallback((optionIndex: number) => {
    if (answers[currentIndex] !== null) return;

    const newAnswers = [...answers];
    newAnswers[currentIndex] = optionIndex;
    setAnswers(newAnswers);
    setDirection(1);

    setTimeout(() => {
      if (currentIndex < questions.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setDirection(1);
      } else {
        navigate('/result', {
          state: {
            answers: newAnswers,
            questions: questions,
            setName: setNames[questionSet.nameIndex],
          },
        });
      }
    }, 400);
  }, [currentIndex, answers, navigate, questions, questionSet.nameIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <ParticleBg count={12} />

      <header className="relative z-10 pt-6 pb-3 px-5">
        <div className="max-w-lg mx-auto">
          <ProgressBar current={currentIndex} total={questions.length} />

          <div className="flex items-center justify-between mt-4">
            <span className="inline-flex items-center gap-1.5 text-[10px] text-white/30 tracking-wider uppercase bg-white/[0.03] px-2.5 py-1 rounded-full border border-white/[0.04]">
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </span>
            <span className="text-[10px] text-white/15 tracking-wider">
              {setNames[questionSet.nameIndex]}
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 relative z-10 px-5 pb-28">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentIndex}
            custom={direction}
            className="max-w-lg mx-auto"
            initial={{ opacity: 0, x: 50 * direction }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 * direction }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
          >
            <motion.div
              className="relative mt-2 mb-7 p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#f0a500]/30 rounded-tl-lg" />
              <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#f0a500]/30 rounded-br-lg" />

              <h2 className="text-base font-medium text-white/95 leading-relaxed">
                {currentQuestion.question}
              </h2>
            </motion.div>

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

      {currentIndex > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 z-20 px-5 py-5">
          <div className="max-w-lg mx-auto">
            <button
              onClick={handlePrev}
              className="w-full py-3 rounded-xl border border-white/[0.08] bg-white/[0.02] text-white/30 text-sm
                         backdrop-blur-md hover:border-white/15 hover:text-white/50 hover:bg-white/[0.04]
                         active:scale-[0.98] transition-all duration-200"
            >
              返回上一题
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
