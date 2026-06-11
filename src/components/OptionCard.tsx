import { motion } from 'framer-motion';

interface OptionCardProps {
  label: string;
  text: string;
  selected: boolean;
  onClick: () => void;
  index: number;
}

const borderColors = [
  'border-[#ffd666]',
  'border-[#f0a500]',
  'border-[#e68900]',
  'border-[#e63946]',
];

export default function OptionCard({ label, text, selected, onClick, index }: OptionCardProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative w-full text-left p-4 rounded-2xl border transition-all duration-300 group
        ${selected
          ? `${borderColors[index]} bg-gradient-to-br from-[#f0a500]/10 via-[#f0a500]/5 to-transparent shadow-[0_0_30px_rgba(240,165,0,0.12),inset_0_0_20px_rgba(240,165,0,0.03)]`
          : 'border-white/[0.06] bg-white/[0.02] hover:border-white/15 hover:bg-white/[0.04]'
        }
      `}
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 + index * 0.06, duration: 0.35, ease: 'easeOut' }}
      whileTap={{ scale: 0.97 }}
    >
      {/* 选中态背景光环 */}
      {selected && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#ffd666]/5 via-transparent to-[#f0a500]/5 pointer-events-none" />
      )}

      <div className="relative flex items-start gap-4">
        {/* 选项标签 */}
        <span
          className={`
            flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-sm font-bold
            transition-all duration-300
            ${selected
              ? 'bg-gradient-to-br from-[#ffd666] to-[#f0a500] text-black shadow-[0_0_15px_rgba(240,165,0,0.4)] scale-110'
              : 'bg-white/[0.06] text-white/40 group-hover:bg-white/[0.1] group-hover:text-white/60'
            }
          `}
        >
          {label}
        </span>

        {/* 选项文本 */}
        <p
          className={`
            flex-1 text-sm leading-relaxed pt-0.5 transition-colors duration-300
            ${selected ? 'text-white font-medium' : 'text-white/55 group-hover:text-white/75'}
          `}
        >
          {text}
        </p>
      </div>

      {/* 选中角标 */}
      {selected && (
        <motion.div
          className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gradient-to-br from-[#ffd666] to-[#f0a500] flex items-center justify-center shadow-lg"
          initial={{ scale: 0, rotate: -60 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
}
