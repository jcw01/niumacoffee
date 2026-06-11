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
