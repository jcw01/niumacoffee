import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import ParticleBg from '../components/ParticleBg';

const rules = [
  { icon: '📋', title: '共 30 道题', desc: '随机抽取一套题库，每题 4 个选项' },
  { icon: '🎯', title: '选最接近的', desc: '没有标准答案，选最符合你真实情况的' },
  { icon: '🔄', title: '可以改答案', desc: '点其他选项即可修改，也可返回上一题' },
  { icon: '⏱️', title: '约 3 分钟', desc: '凭直觉选，别纠结太久' },
  { icon: '🐂', title: '6 个等级', desc: '从独角兽到牛马王，看你在哪一层' },
  { icon: '🤪', title: '纯属娱乐', desc: '认真你就输了，但好像又很准' },
];

export default function Rules() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center relative px-4 py-6">
      <ParticleBg count={12} />

      <div className="relative z-10 max-w-md w-full flex flex-col items-center">
        {/* 顶部标题 */}
        <motion.div
          className="w-full mb-5 px-5 py-5 rounded-[20px] bg-white text-center"
          style={{
            border: '4px solid #141414',
            boxShadow: '6px 6px 0 0 #141414',
          }}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 160 }}
        >
          <h1
            className="font-black text-comic-title"
            style={{ fontSize: 'clamp(22px, 6vw, 30px)' }}
          >
            📖 测试规则
          </h1>
        </motion.div>

        {/* 规则列表 */}
        <div className="w-full space-y-3 mb-6">
          {rules.map((rule, i) => (
            <motion.div
              key={rule.title}
              className="flex items-start gap-3 p-4 rounded-[16px]"
              style={{
                background: '#fff',
                border: '3px solid #141414',
                boxShadow: '4px 4px 0 0 #141414',
              }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.3 }}
            >
              <span
                className="flex-shrink-0 flex items-center justify-center"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 10,
                  border: '3px solid #141414',
                  background: '#FFE135',
                  fontSize: 18,
                }}
              >
                {rule.icon}
              </span>
              <div>
                <div className="font-black" style={{ fontSize: 'clamp(13px, 3.2vw, 15px)', color: '#141414' }}>
                  {rule.title}
                </div>
                <div style={{ fontSize: 'clamp(11px, 2.8vw, 13px)', color: '#555', marginTop: 2 }}>
                  {rule.desc}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* 按钮 */}
        <motion.button
          onClick={() => navigate('/quiz')}
          className="btn-comic-pink mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          whileTap={{ scale: 0.97 }}
        >
          ⚡ 知道了，开始测试
        </motion.button>

        <motion.button
          onClick={() => navigate('/')}
          className="btn-comic-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65 }}
          whileTap={{ scale: 0.97 }}
        >
          ⬅ 返回首页
        </motion.button>
      </div>
    </div>
  );
}
