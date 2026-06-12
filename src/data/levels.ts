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
  percentage: string;  // 如 "击败了 97% 的打工人"
  shareText: string;   // 社交分享短文案
  isHidden?: boolean;  // 隐藏等级标记
}

export const levels: LevelConfig[] = [
  {
    minScore: 0,
    maxScore: 60,
    level: 1,
    emoji: '🦄',
    title: '独角兽',
    subtitle: '打工界的天花板',
    color: '#667eea→#764ba2',
    gradientFrom: '#667eea',
    gradientTo: '#764ba2',
    comment: '你确定你有在上班吗？你的生活让99%的打工人想给你寄刀片。请收下膝盖，并在评论区留下赚钱秘籍——牛马们等着抄作业。',
    poem: '朝九晚五不加班，周末旅行朋友圈；牛马看了直叹息，你是人生天花板。',
    percentage: '击败了 97% 的打工人',
    shareText: '我居然是前3%的独角兽？打工人的天花板就是我！🦄',
  },
  {
    minScore: 61,
    maxScore: 120,
    level: 2,
    emoji: '🐱',
    title: '摸鱼猫',
    subtitle: '带薪摸鱼艺术家',
    color: '#f093fb→#f5576c',
    gradientFrom: '#f093fb',
    gradientTo: '#f5576c',
    comment: '恭喜你找到了打工的正确姿势——活儿没少干鱼也没少摸。你是"别人羡慕、老板挑不出毛病"的稀有物种。请保持，别让老板发现你的秘密。',
    poem: '上班摸鱼下班玩，工资不多也悠闲；别人加班我冲浪，摸鱼也是一种才。',
    percentage: '击败了 88% 的打工人',
    shareText: '带薪摸鱼艺术家认证！老板看不出来我有多闲🐱',
  },
  {
    minScore: 121,
    maxScore: 180,
    level: 3,
    emoji: '🐕',
    title: '打工狗',
    subtitle: '合格的社会燃料',
    color: '#4facfe→#00f2fe',
    gradientFrom: '#4facfe',
    gradientTo: '#00f2fe',
    comment: '你是社会的中坚力量——不偷懒不抱怨默默干活。加班有你，涨薪……就不一定了。别慌，至少你还没到"牛马"的地步，你还在挣扎的路上。',
    poem: '早出晚归把活干，月底工资按时看；说穷还能活着走，说富钱包直摇头。',
    percentage: '击败了 65% 的打工人',
    shareText: '合格的社会燃料🐕 比上不足比下有余，打工人的平均线就是我！',
  },
  {
    minScore: 181,
    maxScore: 250,
    level: 4,
    emoji: '🐂',
    title: '牛马',
    subtitle: '职场永动机',
    color: '#fa709a→#fee140',
    gradientFrom: '#fa709a',
    gradientTo: '#fee140',
    comment: '恭喜正式加入"牛马俱乐部"。你已熟练掌握："行吧""收到""好的""马上改"。人生格言从"我有梦想"变成"我有尾款"。至少你还有周末——也许。',
    poem: '白天上班晚上加，工资不涨脾气加；梦想曾经有很多，如今只剩想躺下。',
    percentage: '击败了 40% 的打工人',
    shareText: '职场永动机🐂已上线！梦想已清空，尾款是唯一动力',
  },
  {
    minScore: 251,
    maxScore: 320,
    level: 5,
    emoji: '🐎',
    title: '驴',
    subtitle: '公司就是我的家',
    color: '#b92b27→#1565c0',
    gradientFrom: '#b92b27',
    gradientTo: '#1565c0',
    comment: '你已超越普通牛马，进入"驴"的境界。老板评价："任劳任怨随叫随到"。家人评价："你谁啊？"工位比床更有感情，同事比朋友更了解你。',
    poem: '朝八晚十一不停，周末加班也行；家人问我你是谁，孩子叫我叔叔行。',
    percentage: '击败了 15% 的打工人',
    shareText: '公司就是我的家🐎！家人问我你是谁，孩子叫我叔叔叔叔',
  },
  {
    minScore: 321,
    maxScore: 450,
    level: 6,
    emoji: '👑',
    title: '牛马王',
    subtitle: '纯血·完全体·不可逆',
    color: '#000000→#f0a500',
    gradientFrom: '#000000',
    gradientTo: '#f0a500',
    comment: '你已超越所有同类，加冕"纯血牛马王"。病历本比《现代汉语词典》还厚，颈椎腰椎肩周眼睛各有各的故事。人生只剩三件事：上班、加班、在去加班的路上。\n\n⚠️ 温馨提示：看到这个等级，请立刻关掉手机，站起来，走向门外，抬头看看天空。你的健康比任何KPI都重要。',
    poem: '十年打工一场空，唯有病历最鲜红；老板眼中你最强，医生眼中你最惨。',
    percentage: '击败了 0.1% 的打工人',
    shareText: '纯血牛马王在此，谁敢跟我比惨？👑 病历比词典厚！',
  },
  {
    minScore: -1,     // 特殊标记：隐藏等级，不通过分数触发
    maxScore: -1,
    level: 7,
    emoji: '🐉',
    title: '龙',
    subtitle: '传说中的存在',
    color: '#FFD700→#FF4500',
    gradientFrom: '#FFD700',
    gradientTo: '#FF4500',
    comment: '你解锁了传说中的隐藏等级——龙！在牛马的世界里，龙是不存在的传说。据说只有邀请3位好友完成测试的人才能获得此殊荣。你是真正的社交牛马王！',
    poem: '龙游浅水遭虾戏，虎落平阳被犬欺；如今翻身做龙去，牛马世界我称帝！',
    percentage: '击败了 0.01% 的打工人',
    shareText: '🐉 我解锁了隐藏等级「龙」！传说中只有邀请3位好友才能解锁的神秘等级！',
    isHidden: true,
  },
];
