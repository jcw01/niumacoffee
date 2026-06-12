// 数据采集工具 - 预留接口，当前仅本地存储
// 后续可对接后端API实现数据聚合分析

const ANALYTICS_KEY = 'nm_analytics';

interface AnalyticsEvent {
  type: 'quiz_start' | 'quiz_complete' | 'quiz_abandon' | 'share_click' | 'image_save' | 'page_view';
  version?: string;       // 题库版本
  timestamp: number;
  data?: Record<string, unknown>;
}

interface QuizAnalytics {
  events: AnalyticsEvent[];
  // 聚合数据（本地计算）
  totalQuizzes: number;
  totalShares: number;
  versionStats: Record<string, number>;  // 各版本测试次数
  levelStats: Record<string, number>;    // 各等级出现次数
}

// 记录事件
export function trackEvent(type: AnalyticsEvent['type'], data?: Record<string, unknown>): void {
  const analytics = loadAnalytics();
  analytics.events.push({ type, timestamp: Date.now(), data });
  // 只保留最近100条事件
  if (analytics.events.length > 100) {
    analytics.events = analytics.events.slice(-100);
  }
  // 更新聚合数据
  if (type === 'quiz_complete') {
    analytics.totalQuizzes++;
    if (data?.version) {
      analytics.versionStats[data.version as string] = (analytics.versionStats[data.version as string] || 0) + 1;
    }
    if (data?.level) {
      analytics.levelStats[data.level as string] = (analytics.levelStats[data.level as string] || 0) + 1;
    }
  }
  if (type === 'share_click') {
    analytics.totalShares++;
  }
  localStorage.setItem(ANALYTICS_KEY, JSON.stringify(analytics));
}

// 加载数据
function loadAnalytics(): QuizAnalytics {
  const raw = localStorage.getItem(ANALYTICS_KEY);
  if (!raw) return { events: [], totalQuizzes: 0, totalShares: 0, versionStats: {}, levelStats: {} };
  try {
    return JSON.parse(raw) as QuizAnalytics;
  } catch {
    return { events: [], totalQuizzes: 0, totalShares: 0, versionStats: {}, levelStats: {} };
  }
}

// 获取聚合数据（预留：后续可对接后端）
export function getAnalytics(): QuizAnalytics {
  return loadAnalytics();
}

// 获取模拟的"城市排行"数据（预留接口，当前返回模拟数据）
export function getCityRanking(): { city: string; score: number }[] {
  // TODO: 对接后端API后替换为真实数据
  return [
    { city: '北京', score: 78 },
    { city: '深圳', score: 75 },
    { city: '上海', score: 73 },
    { city: '杭州', score: 70 },
    { city: '广州', score: 68 },
    { city: '成都', score: 62 },
    { city: '武汉', score: 58 },
    { city: '南京', score: 55 },
  ];
}

// 获取模拟的"行业排行"数据（预留接口）
export function getIndustryRanking(): { industry: string; score: number }[] {
  return [
    { industry: '互联网', score: 82 },
    { industry: '金融', score: 76 },
    { industry: '教育', score: 71 },
    { industry: '医疗', score: 65 },
    { industry: '制造', score: 60 },
    { industry: '体制内', score: 42 },
  ];
}
