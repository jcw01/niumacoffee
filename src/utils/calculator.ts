import type { Question } from '../data/questions';
import { levels } from '../data/levels';

export interface Answer {
  questionId: number;
  optionIndex: number;
}

export interface ScoreResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: (typeof levels)[number];
}

/**
 * 标准化评分算法
 * 核心逻辑：百分比映射等级，不依赖题目总数
 * 任意题库（不同题数、不同分值）均使用同一套百分比→等级映射
 */
function computeLevelByPercentage(pct: number): (typeof levels)[number] {
  if (pct >= 72) return levels[5];     // 👑 牛马王
  if (pct >= 56) return levels[4];     // 🐎 驴
  if (pct >= 41) return levels[3];     // 🐂 牛马
  if (pct >= 27) return levels[2];     // 🐕 打工狗
  if (pct >= 14) return levels[1];     // 🐱 摸鱼猫
  return levels[0];                    // 🦄 独角兽
}

export function calculateScore(
  answers: Answer[],
  questionSet: Question[]
): ScoreResult {
  let totalScore = 0;
  const maxScore = questionSet.reduce((sum, q) => {
    const maxOpt = Math.max(...q.options.map((o) => o.score));
    return sum + maxOpt;
  }, 0);

  for (const answer of answers) {
    const question = questionSet.find((q) => q.id === answer.questionId);
    if (question && answer.optionIndex < question.options.length) {
      totalScore += question.options[answer.optionIndex].score;
    }
  }

  const percentage = Math.round((totalScore / maxScore) * 100);
  const level = computeLevelByPercentage(percentage);

  return { totalScore, maxScore, percentage, level };
}
