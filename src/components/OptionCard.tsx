import { motion } from 'framer-motion';

interface OptionCardProps {
  label: string;
  text: string;
  selected: boolean;
  onClick: () => void;
  index: number;
}

export default function OptionCard({ label, text, selected, onClick, index }: OptionCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-full text-left"
      style={{
        padding: 'clamp(10px, 2.5vw, 14px) clamp(12px, 3vw, 16px)',
        borderRadius: 14,
        border: '3px solid #141414',
        background: selected ? '#FFE135' : '#FFFFFF',
        boxShadow: selected ? '4px 4px 0 0 #FF2D7A' : '4px 4px 0 0 #141414',
        transition: 'transform 0.12s ease, box-shadow 0.12s ease, background 0.2s',
      }}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 + index * 0.05, duration: 0.25 }}
      whileTap={{ transform: 'translate(2px,2px)' }}
    >
      <div className="flex items-start gap-2.5">
        {/* 选项字母徽章 */}
        <span
          className="flex-shrink-0 flex items-center justify-center font-black"
          style={{
            width: 'clamp(28px, 7vw, 36px)',
            height: 'clamp(28px, 7vw, 36px)',
            borderRadius: 8,
            border: '3px solid #141414',
            background: selected ? '#FF2D7A' : '#141414',
            color: '#fff',
            fontSize: 'clamp(12px, 3vw, 16px)',
          }}
        >
          {label}
        </span>

        <p
          className="flex-1 font-black leading-relaxed pt-0.5"
          style={{
            fontSize: 'clamp(12px, 3.2vw, 15px)',
            color: '#141414',
          }}
        >
          {text}
        </p>
      </div>

      {/* 选中角标 */}
      {selected && (
        <motion.div
          className="absolute -top-2 -right-2 flex items-center justify-center"
          style={{
            width: 26,
            height: 26,
            borderRadius: 999,
            background: '#FF2D7A',
            color: '#fff',
            border: '3px solid #141414',
            boxShadow: '2px 2px 0 0 #141414',
            fontSize: 14,
            fontWeight: 900,
          }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 14 }}
        >
          ✔
        </motion.div>
      )}
    </motion.button>
  );
}
