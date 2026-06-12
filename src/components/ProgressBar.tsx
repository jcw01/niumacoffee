import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = (current / total) * 100;

  return (
    <div
      className="w-full"
      style={{
        padding: 4,
        background: '#fff',
        border: '3px solid #141414',
        borderRadius: 14,
        boxShadow: '3px 3px 0 0 #141414',
      }}
    >
      <div className="flex items-center justify-between px-2 py-1 mb-1">
        <span
          className="font-black text-[11px] text-[#141414]"
          style={{ letterSpacing: 2 }}
        >
          进度 · PROGRESS
        </span>
        <span className="font-black text-[13px] text-[#FF2D7A]">
          {current + 1}
          <span className="text-[#141414]"> / {total}</span>
        </span>
      </div>

      {/* 轨道 + 条纹进度条 */}
      <div
        className="relative w-full h-4 overflow-hidden"
        style={{
          borderRadius: 8,
          border: '2px solid #141414',
          background: '#FFF7E0',
        }}
      >
        <motion.div
          className="relative h-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(-45deg, #FF2D7A 0px, #FF2D7A 8px, #C71585 8px, #C71585 16px)',
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
    </div>
  );
}
