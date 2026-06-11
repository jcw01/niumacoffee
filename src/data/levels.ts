export interface LevelConfig {
  minScore: number;
  maxScore: number;
  level: number;      // 1-6
  emoji: string;
  title: string;
  subtitle: string;
  color: string;       // CSS渐变色值
  gradientFrom: string;
  gradientTo: string;
  comment: string;
  poem: string;
  percentage: string;  // 如 "前3%"
}

export const levels: LevelConfig[] = [
  {
    minScore: 0,
    maxScore: 60,
    level: 1,
    emoji: '🦄',
    title: '独角兽',
    subtitle: '人间清醒',
    color: '#667eea→#764ba2',
    gradientFrom: '#667eea',
    gradientTo: '#764ba2',
    comment: '你确定你有在上班吗？你的生活状态让99%的打工人想给你寄刀片。请收下我们的膝盖，并请在评论区留下你的赚钱秘籍——谢谢，牛马们等着抄作业。',
    poem: '朝九晚五不加班，周末旅行朋友圈；牛马看了都叹息，你是人生赢家团。',
    percentage: '前3%',
  },
  {
    minScore: 61,
    maxScore: 120,
    level: 2,
    emoji: '🐱',
    title: '摸鱼猫',
    subtitle: '快乐打工人',
    color: '#f093fb→#f5576c',
    gradientFrom: '#f093fb',
    gradientTo: '#f5576c',
    comment: '恭喜你找到了打工的正确姿势——活儿没偷干鱼也没摸。你的生活状态是当代打工人的天花板，属于"别人羡慕、老板也挑不出毛病"的稀有物种。请保持住别让老板发现你的秘密。',
    poem: '上班敲键盘，下班撸猫玩；工资虽不多，日子也不错。',
    percentage: '前12%',
  },
  {
    minScore: 121,
    maxScore: 180,
    level: 3,
    emoji: '🐕',
    title: '打工狗',
    subtitle: '标准牛马',
    color: '#4facfe→#00f2fe',
    gradientFrom: '#4facfe',
    gradientTo: '#00f2fe',
    comment: '你是这个社会的中坚力量——不偷懒不抱怨默默干活。加班有你团建也有你；干活有你涨薪……就不一定有了。但别 worry 至少你还没到"牛马"的地步——你还在挣扎的路上。',
    poem: '早出晚归把活干，月底工资按时看；说穷吧还能活着，说富吧钱包叹气。',
    percentage: '前35%',
  },
  {
    minScore: 181,
    maxScore: 250,
    level: 4,
    emoji: '🐂',
    title: '牛马',
    subtitle: '开始黑化',
    color: '#fa709a→#fee140',
    gradientFrom: '#fa709a',
    gradientTo: '#fee140',
    comment: '恭喜你正式进入"牛马俱乐部"。你开始熟练使用以下词汇："行吧""收到""好的""马上改"。你的人生格言已从"我有梦想"变成"我有尾款"。但别 worry——你只是牛马还不是驴至少你还有周末（也许）。',
    poem: '白天上班晚上加，工资不涨脾气加；梦想曾经有很多，现在只剩一个——躺平。',
    percentage: '前60%',
  },
  {
    minScore: 251,
    maxScore: 320,
    level: 5,
    emoji: '🐎',
    title: '驴',
    subtitle: '深度黑化',
    color: '#b92b27→#1565c0',
    gradientFrom: '#b92b27',
    gradientTo: '#1565c0',
    comment: '你已经超越了普通牛马进入了"驴"的境界。老板对你的评价是——"任劳任怨随叫随到不计较个人得失"。家人对你的评价是——"你谁啊？"你的工位比你的床更有感情你的同事比你的朋友更了解你。',
    poem: '朝八晚十一，周末也不熄；老婆问你是谁，孩子叫你叔叔。',
    percentage: '前85%',
  },
  {
    minScore: 321,
    maxScore: 450,
    level: 6,
    emoji: '👑',
    title: '牛马王',
    subtitle: '纯血·完全体',
    color: '#000000→#f0a500',
    gradientFrom: '#000000',
    gradientTo: '#f0a500',
    comment: '欢迎来到终点。你已超越所有同类加冕"纯血牛马王"桂冠。你的病历本比《现代汉语词典》还厚。你的颈椎腰椎肩周眼睛——每一个都有自己的故事。你的人生只剩下三件事：上班加班在去加班的路上。\n\n⚠️温馨提示：看到这个等级的你请立刻——关掉手机站起来走向门外抬头看看天空。你的健康比任何KPI都重要。请认真考虑休息就医或换个工作。',
    poem: '十年打工一场空唯有病历本最红；老板眼中你最棒医生眼中你最惨。',
    percentage: '前99.9%',
  },
];
