export interface Option {
  label: string;    // "A" | "B" | "C" | "D"
  text: string;     // 选项文本内容
  score: number;    // 0 | 5 | 10 | 15
}

export interface Question {
  id: number;
  category: 'intro' | 'worktime' | 'message' | 'salary' | 'status' | 'life' | 'dark' | 'finale';
  question: string;
  options: Option[];
}

export const questions: Question[] = [
  {
    id: 0,
    category: 'intro',
    question: '请选择最符合你现状的一项：',
    options: [
      { label: 'A', text: '我怀疑老天在写我的人生剧本时，编剧已经下班了，就随便写了几行代码让我跑。', score: 0 },
      { label: 'B', text: '我不是卷，我是穷。所以我这不叫内卷，叫"求生欲驱动型工作"。', score: 5 },
      { label: 'C', text: '你问我工作开不开心？我工作是为了不开心的。', score: 10 },
      { label: 'D', text: '如果有一天我突然消失了，那一定是老板又加活了。', score: 15 },
    ],
  },
  {
    id: 1,
    category: 'worktime',
    question: '早上到公司第一件事？',
    options: [
      { label: 'A', text: '开电脑倒水泡枸杞', score: 0 },
      { label: 'B', text: '打开邮箱钉钉看消息', score: 5 },
      { label: 'C', text: '假装坐一会儿等9:05再开电脑', score: 10 },
      { label: 'D', text: '不用到公司昨晚没下班直接睡工位了，老板比我先到眼神里写了这小子还行', score: 15 },
    ],
  },
  {
    id: 2,
    category: 'worktime',
    question: '午休实际情况？',
    options: [
      { label: 'A', text: '1小时完整午休吃完饭还能眯一会羡慕死别人', score: 0 },
      { label: 'B', text: '半小时以内但好歹能吃口热饭', score: 5 },
      { label: 'C', text: '边吃饭边回消息1点前能吃完就算胜利', score: 10 },
      { label: 'D', text: '午休是什么我只知道午间开会和午间赶方案，上周因为午休吃了口饭被领导说年轻人精力真好啊从此再没吃过午饭', score: 15 },
    ],
  },
  {
    id: 3,
    category: 'worktime',
    question: '下午3点状态？',
    options: [
      { label: 'A', text: '精神抖擞思路清晰今天还能再战', score: 0 },
      { label: 'B', text: '有点困但还能撑', score: 5 },
      { label: 'C', text: '靠咖啡续命已经数不清今天第几杯了', score: 10 },
      { label: 'D', text: '脑子已经不转了只剩手指在本能地敲键盘，灵魂已经出窍了坐在工位上的是一具由咖啡因和房贷撑起来的躯壳', score: 15 },
    ],
  },
  {
    id: 4,
    category: 'worktime',
    question: '下班离开时刻？',
    options: [
      { label: 'A', text: '18:00准点甚至提前几分钟收拾好背包', score: 0 },
      { label: 'B', text: '18:30-19:00偶尔加班正常', score: 5 },
      { label: 'C', text: '20:00以后取决于今天领导走没走', score: 10 },
      { label: 'D', text: '我不下班我只是换个地方继续工作回家等于换个工位只不过这个工位的椅子舒服一点而且可以穿睡衣，有时候凌晨两点收到消息我居然条件反射坐了起来', score: 15 },
    ],
  },
  {
    id: 5,
    category: 'worktime',
    question: '最近一个月周末完全没处理工作的天数？',
    options: [
      { label: 'A', text: '8天两个周末都纯休息', score: 0 },
      { label: 'B', text: '4-6天大部分时间属于自己', score: 5 },
      { label: 'C', text: '1-3天偶尔被工作偷袭', score: 10 },
      { label: 'D', text: '0天周末只是不用去公司的正常工作日，上周六在家改方案周日去公司开会周一正常上班我已经忘了休息这个词怎么写了', score: 15 },
    ],
  },
  {
    id: 6,
    category: 'worktime',
    question: '年假使用情况？',
    options: [
      { label: 'A', text: '该休休该玩玩年假用得理直气壮', score: 0 },
      { label: 'B', text: '用了一部分但心里有愧疚感', score: 5 },
      { label: 'C', text: '剩一大堆永远等忙完这阵再说', score: 10 },
      { label: 'D', text: '年假？我连正常假期都休不满还年假呢，去年请了一天年假回来后发现我的活被分给三个人做了原来我一个人干了三个人的活', score: 15 },
    ],
  },
  {
    id: 7,
    category: 'message',
    question: '晚上11点老板群里发消息反应？',
    options: [
      { label: 'A', text: '关我啥事明天再看', score: 0 },
      { label: 'B', text: '看一眼如果不急就明天回', score: 5 },
      { label: 'C', text: '秒回这是打工人的基本素养', score: 10 },
      { label: 'D', text: '不敢不回怕明天被单独聊聊，上次我没回第二天领导说小王啊最近是不是有什么想法从那以后我连洗澡都带着手机', score: 15 },
    ],
  },
  {
    id: 8,
    category: 'message',
    question: '手机工作群通知设置？',
    options: [
      { label: 'A', text: '静音+下班后不看不回明确边界', score: 0 },
      { label: 'B', text: '正常提醒但偶尔选择性忽略', score: 5 },
      { label: 'C', text: '全开+震动生怕漏掉任何消息', score: 10 },
      { label: 'D', text: '不敢静音怕被发现在假装看不见，有一次我把群静音了第二天同事问我昨晚群里@你了你没看到吗从那以后我连睡觉都把手机放在枕头边上', score: 15 },
    ],
  },
  {
    id: 9,
    category: 'message',
    question: '节假日收到工作消息一般？',
    options: [
      { label: 'A', text: '假装没看到假期就是假期', score: 0 },
      { label: 'B', text: '看情况紧急程度偶尔回一下', score: 5 },
      { label: 'C', text: '内心抗拒但还是一个字一个字地回复', score: 10 },
      { label: 'D', text: '秒回已成肌肉记忆甚至比家人回消息还快，大年三十晚上我在抢红包工作群弹了个消息我下意识就点开了——我妈问我谁的消息这么重要我说老板她说那你继续吧那一刻我想哭', score: 15 },
    ],
  },
  {
    id: 10,
    category: 'message',
    question: '回复工作消息平均响应时间？',
    options: [
      { label: 'A', text: '10分钟以内不是在工作就是在看手机', score: 0 },
      { label: 'B', text: '30分钟以内能忍一会儿是一会儿', score: 5 },
      { label: 'C', text: '1小时以内除非真的很急', score: 10 },
      { label: 'D', text: '取决于有没有在开会开车洗澡吃饭上厕所——被打断的次数比消息还多，有一次我在马桶上回消息腿麻了差点起不来但我还是坚持发完了那句好的收到', score: 15 },
    ],
  },
  {
    id: 11,
    category: 'message',
    question: '突然消失3小时没回消息最担心？',
    options: [
      { label: 'A', text: '没人会注意到反正我也没那么重要', score: 0 },
      { label: 'B', text: '担心同事觉得我出事了其实我只是睡了个午觉', score: 5 },
      { label: 'C', text: '担心领导觉得我在对抗其实我只是手机没电了', score: 10 },
      { label: 'D', text: '我不敢消失3小时我怕老板觉得我不对劲，上次我去体检做了个核磁共振出来后发现手机上有17条未读消息和12个未接来电从那以后我连去医院都带充电宝', score: 15 },
    ],
  },
  {
    id: 12,
    category: 'salary',
    question: '发薪日心情？',
    options: [
      { label: 'A', text: '开心又可以买买买了', score: 0 },
      { label: 'B', text: '还行钱不多但聊胜于无', score: 5 },
      { label: 'C', text: '看一眼工资卡沉默然后默默关掉APP', score: 10 },
      { label: 'D', text: '发薪日？不，是还债日——还完花呗房贷信用卡花呗分期白条借呗……算完之后发现自己又负资产了打开余额两位数关掉APP深呼吸告诉自己下个月会好的', score: 15 },
    ],
  },
  {
    id: 13,
    category: 'salary',
    question: '现在薪资反映的是？',
    options: [
      { label: 'A', text: '我的能力经验和市场价值', score: 0 },
      { label: 'B', text: '我老板的良心', score: 5 },
      { label: 'C', text: '我的忍耐程度忍得越久工资越高', score: 10 },
      { label: 'D', text: '我的命不值钱但老板觉得我连命都不值，上次涨薪200块领导说今年行情不好大家都要共克时艰转头我看到他换了辆新车', score: 15 },
    ],
  },
  {
    id: 14,
    category: 'salary',
    question: '时薪大约是？',
    options: [
      { label: 'A', text: '大于150元对得起我的付出', score: 0 },
      { label: 'B', text: '80-150元勉强能接受', score: 5 },
      { label: 'C', text: '50-80元每小时都在亏本', score: 10 },
      { label: 'D', text: '低于50元甚至不如节假日临时工，我认真算过一次算完之后我把计算器扔了有些数字还是不知道比较好', score: 15 },
    ],
  },
  {
    id: 15,
    category: 'salary',
    question: '上一次因为工资低愤怒崩溃？',
    options: [
      { label: 'A', text: '刚入职那年现在已经麻了', score: 0 },
      { label: 'B', text: '上个月发完工资气了一晚上', score: 5 },
      { label: 'C', text: '每次看到工资条都想提离职但看看存款又忍了', score: 10 },
      { label: 'D', text: '愤怒？不存在的我已经进入了无感状态那只是一串没有温度的数字，上个月我算了笔账如果我按实际工作小时算我的时薪还不如楼下卖煎饼的大叔那天晚上我多喝了两杯然后第二天照常上班', score: 15 },
    ],
  },
  {
    id: 16,
    category: 'status',
    question: '会议角色？',
    options: [
      { label: 'A', text: '主讲人决策者我说的算', score: 0 },
      { label: 'B', text: '被点名才发言的参与者', score: 5 },
      { label: 'C', text: '负责记笔记补充材料的工具人', score: 10 },
      { label: 'D', text: '背景板来凑人数的让领导觉得会议很民主，上次开了三小时的会我全程只说了一句好的会后领导表扬我态度端正', score: 15 },
    ],
  },
  {
    id: 17,
    category: 'status',
    question: '对"这个需求很简单嘛随便搞搞就行"第一反应？',
    options: [
      { label: 'A', text: '嗯确实不难', score: 0 },
      { label: 'B', text: '又来但我习惯了反正最终做不完也是我的锅', score: 5 },
      { label: 'C', text: '简单你行你上啊', score: 10 },
      { label: 'D', text: '简单在职场是一个薛定谔的词——做完之前是简单的做完之后发现它一点也不简单而且我改了三版了最离谱的一次是领导说就改个小功能我改了两个星期最后发现牵扯到了整个底层架构他说你怎么搞这么久我没说话', score: 15 },
    ],
  },
  {
    id: 18,
    category: 'status',
    question: '最近一次升职加薪是因为？',
    options: [
      { label: 'A', text: '能力突出业绩达标实至名归', score: 0 },
      { label: 'B', text: '熬了几年终于轮到我了', score: 5 },
      { label: 'C', text: '不知道可能老板心情好吧', score: 10 },
      { label: 'D', text: '升职加薪？我只在知乎上见过这种东西，隔壁组的小张入职半年就升了因为他跟领导打篮球我入职三年还在原地因为我只会干活', score: 15 },
    ],
  },
  {
    id: 19,
    category: 'status',
    question: '公司不可替代性打几分？',
    options: [
      { label: 'A', text: '8-10分离了我这摊活儿真转不动', score: 0 },
      { label: 'B', text: '5-7分短期内有人能接手', score: 5 },
      { label: 'C', text: '2-4分随时可以被替换', score: 10 },
      { label: 'D', text: '0分我走了第二天就有人顶上来而且那个人可能还比我便宜，上个月部门裁了两个人我以为下一个是我结果裁的是那个跟我干一样活的哥们儿——因为他比我贵两千块', score: 15 },
    ],
  },
  {
    id: 20,
    category: 'status',
    question: '领导对你说过的话？',
    options: [
      { label: 'A', text: '辛苦了早点回去休息吧', score: 0 },
      { label: 'B', text: '这个你再优化一下', score: 5 },
      { label: 'C', text: '年轻人要多承担这是锻炼机会', score: 10 },
      { label: 'D', text: '你要感恩公司给你这个平台、外面环境很差你能有份工作就不错了、你看谁谁谁比你努力多了——以上全部说过而且是在同一次谈话里', score: 15 },
    ],
  },
  {
    id: 21,
    category: 'life',
    question: '最近一周和朋友非同事见面约饭次数？',
    options: [
      { label: 'A', text: '2次以上社交达人就是我', score: 0 },
      { label: 'B', text: '1次勉强维持友谊的小火苗', score: 5 },
      { label: 'C', text: '0次但不是我不想是真的没时间', score: 10 },
      { label: 'D', text: '0次而且朋友们已经不再约我了反正她也不来，上周大学同学聚会我没去他们在群里发了照片我翻着照片突然意识到我已经快一年没见过任何老朋友了', score: 15 },
    ],
  },
  {
    id: 22,
    category: 'life',
    question: '最近一次为自己纯粹的娱乐放松不是刷手机逃避？',
    options: [
      { label: 'A', text: '三天以内我有自己的生活节奏', score: 0 },
      { label: 'B', text: '一周以内忙里偷闲一下', score: 5 },
      { label: 'C', text: '一个月以前我已经忘了放松是什么感觉', score: 10 },
      { label: 'D', text: '放松？我每天刷手机到凌晨1点就是放松，上个月我想去看场电影买好了票临开场前领导发来一条消息我退了票回了家那张电影票到现在还躺在我的收藏夹里', score: 15 },
    ],
  },
  {
    id: 23,
    category: 'life',
    question: '和家人的关系一句话概括？',
    options: [
      { label: 'A', text: '和谐温馨家庭是我的避风港', score: 0 },
      { label: 'B', text: '见面不多但关系还行微信偶尔问候', score: 5 },
      { label: 'C', text: '见面就是被催婚催生问工资我都怕回家', score: 10 },
      { label: 'D', text: '我妈现在给我发消息都是小心翼翼的怕打扰我忙工作但其实我只是不想回，上个月我爸生日我忘了第二天我妈打电话说没事你忙电话那头她的声音有点哑我挂了电话在工位上坐了很久', score: 15 },
    ],
  },
  {
    id: 24,
    category: 'life',
    question: '目前感情婚姻状态？',
    options: [
      { label: 'A', text: '有对象已婚家庭幸福不工作的时候就是陪家人', score: 0 },
      { label: 'B', text: '有对象但约会时间被工作压缩得很厉害', score: 5 },
      { label: 'C', text: '单身因为工作太忙没时间认识新的人', score: 10 },
      { label: 'D', text: '单身因为工作太累连刷社交软件都没兴趣了，上相亲网站注册了但从来没登录过朋友介绍对象不好意思最近很忙这句话我说了八次了我现在唯一的异性接触是外卖小姐姐和公司的前台', score: 15 },
    ],
  },
  {
    id: 25,
    category: 'life',
    question: '每天睡眠时间？',
    options: [
      { label: 'A', text: '7-8小时精神饱满每一天', score: 0 },
      { label: 'B', text: '6-7小时凑合能撑住', score: 5 },
      { label: 'C', text: '5-6小时靠咖啡和意志力撑着', score: 10 },
      { label: 'D', text: '<5小时或者周末报复性补觉10小时+，我的生物钟已经紊乱了凌晨三点睡不着早上七点醒不来医生让我少熬夜我说好的然后当晚又熬到了两点', score: 15 },
    ],
  },
  {
    id: 26,
    category: 'dark',
    question: '有没有过在厕所里偷偷哭的经历？',
    options: [
      { label: 'A', text: '没有我心态很好', score: 0 },
      { label: 'B', text: '有过一次当时压力特别大', score: 5 },
      { label: 'C', text: '有过几次每次哭完洗把脸继续上班', score: 10 },
      { label: 'D', text: '公司厕所的隔间是我的秘密基地我在那里哭过崩溃过怀疑过人生甚至想过辞职——但每次冲完水走出来我都会对着镜子整理一下头发然后回到工位微笑着说好的收到没有人知道', score: 15 },
    ],
  },
  {
    id: 27,
    category: 'dark',
    question: '用一个词形容你和公司的关系？',
    options: [
      { label: 'A', text: '合作伙伴互利共赢', score: 0 },
      { label: 'B', text: '雇佣关系各取所需', score: 5 },
      { label: 'C', text: '寄生关系我被吸干了', score: 10 },
      { label: 'D', text: '斯德哥尔摩综合征患者与绑匪的关系我知道它在伤害我但我离不开它每次想离职的时候我会说服自己再忍忍然后一忍就是三年', score: 15 },
    ],
  },
  {
    id: 28,
    category: 'dark',
    question: '对35岁危机的态度？',
    options: [
      { label: 'A', text: '没想过我还年轻', score: 0 },
      { label: 'B', text: '有点担心但还没到那个时候', score: 5 },
      { label: 'C', text: '经常焦虑已经在做准备存钱学新技能副业', score: 10 },
      { label: 'D', text: '我每天睁开眼的第一件事就是算距离35岁还有多少天我看过太多35岁被优化的故事了每一个都像是我的未来预告片我现在的每一分钟都在为那一天倒计时', score: 15 },
    ],
  },
  {
    id: 29,
    category: 'dark',
    question: '有没有过假装在忙的时刻？',
    options: [
      { label: 'A', text: '没有我一直都很充实', score: 0 },
      { label: 'B', text: '偶尔摸鱼会被抓包所以装一下', score: 5 },
      { label: 'C', text: '经常因为看起来忙看起来有价值', score: 10 },
      { label: 'D', text: '我的工作状态分为两种：一种是真忙一种是表演忙领导经过的时候我会疯狂敲键盘皱眉头盯着屏幕哪怕我当时只是在看新闻因为在这个公司看起来忙比真的有效率更重要', score: 15 },
    ],
  },
  {
    id: 30,
    category: 'finale',
    question: '如果明天公司倒闭了第一反应？',
    options: [
      { label: 'A', text: '太好了终于可以拿赔偿金休息一阵子了', score: 0 },
      { label: 'B', text: '有点突然但无所谓反正早想跳槽了', score: 5 },
      { label: 'C', text: '完了我上有老下有小还有房贷这晴天霹雳啊', score: 10 },
      { label: 'D', text: '？？？我的青春我的年华我的头发我的颈椎我的失眠我的焦虑我的社交圈萎缩我的感情空白我错过的所有家人重要时刻……都喂了狗了而狗还说不够吃再加点班', score: 15 },
    ],
  },
];
