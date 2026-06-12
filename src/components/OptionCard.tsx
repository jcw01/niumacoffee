import { motion } from 'framer-motion';

interface OptionCardProps {
  label: string;  // "A/B/C/D"
  text: string;   // 选项文字
  selected: boolean;
  onClick: () => void;
  index: number;
}

export default function OptionCard({ label, text, selected, onClick, index }: OptionCardProps) {
  const selectedBg = '#FFE135'; // 亮黄选中态
  const defaultBg = '#FFFFFF';

  return (
    <motion.button
      onClick={onClick}
      className="relative w-full text-left"
      style={{
        padding: '14px 16px',
        borderRadius: 16,
        border: '3px solid #141414',
        background: selected ? selectedBg : defaultBg,
        boxShadow: selected ? '4px 4px 0 0 #FF2D7A' : '4px 4px 0 0 #141414',
        transition: 'transform 0.12s ease, box-shadow 0.12s ease, background 0.2s',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.3, ease: 'easeOut' }}
      whileHover={{ transform: 'translate(-1px,-1px)' }}
      whileTap={{ transform: 'translate(2px,2px)' }}
    >
      <div className="flex items-start gap-3">
        {/* 选项标签（字母徽章） */}
        <span
          className="flex-shrink-0 flex items-center justify-center font-black"
          style={{
            width: 36,
            height: 36,
            borderRadius: 10,
            border: '3px solid #141414',
            background: selected ? '#FF2D7A' : '#141414',
            color: '#fff',
            fontSize: 16,
            boxShadow: selected ? '2px 2px 0 0 #141414' : 'none',
          }}
        >
          {label}
        </span>

        {/* 选项文字 */}
        <p
          className="flex-1 font-black leading-relaxed pt-1"
          style={{
            fontSize: 15,
            color: '#141414',
            letterSpacing: 0.5,
          }}
        >
          {text}
        </p>
      </div>

      {/* 选中时：右上角 ✔ 徽章 */}
      {selected && (
        <motion.div
          className="absolute -top-2 -right-2 flex items-center justify-center"
          style={{
            width: 30,
            height: 30,
            borderRadius: 999,
            background: '#FF2D7A',
            color: '#fff',
            border: '3px solid #141414',
            boxShadow: '2px 2px 0 0 #141414',
            fontSize: 16,
            fontWeight: 900,
          }}
          initial={{ scale: 0, rotate: -40 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 14 }}
        >
          ✔
        </motion.div>
      )}
    </motion.button>
  );
}
