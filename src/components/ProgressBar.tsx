import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = (current / total) * 100;

  return (
    <div className="space-y-1.5">
      <div className="flex justify-between items-baseline">
        <span className="text-xs tracking-widest text-white/30 font-light uppercase">
          Question
        </span>
        <span className="text-xs tracking-wider text-white/40 font-medium tabular-nums">
          <span className="text-[#ffd666] text-sm font-bold">{current + 1}</span>
          <span className="mx-1 text-white/20">/</span>
          {total}
        </span>
      </div>

      {/* 轨道 */}
      <div className="relative w-full h-2 bg-white/[0.04] rounded-full overflow-hidden backdrop-blur-sm border border-white/[0.03]">
        {/* 发光底色 */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#f0a500]/5 via-[#e63946]/5 to-[#f0a500]/5" />

        {/* 进度条 */}
        <motion.div
          className="relative h-full rounded-full"
          style={{
            background: 'linear-gradient(90deg, #ffd666, #f0a500, #e68900)',
            boxShadow: '0 0 12px rgba(240, 165, 0, 0.5), 0 0 4px rgba(240, 165, 0, 0.3)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
    </div>
  );
}
