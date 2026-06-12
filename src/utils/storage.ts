const USER_ID_KEY = 'nm_user_id';
const SHARE_CODE_KEY = 'nm_share_code';
const LAST_RESULT_KEY = 'nm_last_result';

interface StoredResult {
  score: number;
  levelTitle: string;
  levelEmoji: string;
  timestamp: number;
}

// 获取或创建用户ID
export function getOrCreateUserId(): string {
  let userId = localStorage.getItem(USER_ID_KEY);
  if (!userId) {
    userId = crypto.randomUUID();
    localStorage.setItem(USER_ID_KEY, userId);
  }
  return userId;
}

// 生成分享码
export function getOrCreateShareCode(userId?: string): string {
  let shareCode = localStorage.getItem(SHARE_CODE_KEY);
  if (!shareCode) {
    const uid = userId || getOrCreateUserId();
    // 取UUID前8位作为短码
    shareCode = `nm_${uid.replace(/-/g, '').substring(0, 8)}_${Date.now().toString(36)}`;
    localStorage.setItem(SHARE_CODE_KEY, shareCode);
  }
  return shareCode;
}

// 保存最近一次测试结果
export function saveLastResult(result: StoredResult): void {
  localStorage.setItem(LAST_RESULT_KEY, JSON.stringify(result));
}

// 获取最近一次测试结果
export function getLastResult(): StoredResult | null {
  const raw = localStorage.getItem(LAST_RESULT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as StoredResult;
  } catch {
    return null;
  }
}

const QUIZ_PROGRESS_KEY = 'nm_quiz_progress';

interface QuizProgress {
  questions: { id: number; category: string; question: string; options: { label: string; text: string; score: number }[] }[];
  answers: (number | null)[];
  currentIndex: number;
  timestamp: number;
}

// 保存答题进度
export function saveQuizProgress(questions: QuizProgress['questions'], answers: (number | null)[], currentIndex: number): void {
  localStorage.setItem(QUIZ_PROGRESS_KEY, JSON.stringify({
    questions,
    answers,
    currentIndex,
    timestamp: Date.now(),
  }));
}

// 恢复答题进度（24小时内有效）
export function loadQuizProgress(): QuizProgress | null {
  const raw = localStorage.getItem(QUIZ_PROGRESS_KEY);
  if (!raw) return null;
  try {
    const data = JSON.parse(raw) as QuizProgress;
    // 24小时过期
    if (Date.now() - data.timestamp > 24 * 60 * 60 * 1000) {
      clearQuizProgress();
      return null;
    }
    return data;
  } catch {
    return null;
  }
}

// 清除答题进度
export function clearQuizProgress(): void {
  localStorage.removeItem(QUIZ_PROGRESS_KEY);
}
