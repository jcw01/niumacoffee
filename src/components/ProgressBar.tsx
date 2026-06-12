import { motion } from 'framer-motion';

interface ProgressBarProps {
  current: number;
  total: number;
}

// 根据进度百分比返回条纹渐变色
function getStripeGradient(pct: number): string {
  if (pct <= 33) {
    // 粉红条纹
    return 'repeating-linear-gradient(-45deg, #FF2D7A 0px, #FF2D7A 6px, #C71585 6px, #C71585 12px)';
  }
  if (pct <= 66) {
    // 粉红+黄色渐变条纹
    return 'repeating-linear-gradient(-45deg, #FF2D7A 0px, #FF2D7A 4px, #FFE135 4px, #FFE135 8px, #C71585 8px, #C71585 12px)';
  }
  // 粉红+黄色+绿色条纹
  return 'repeating-linear-gradient(-45deg, #FF2D7A 0px, #FF2D7A 3px, #FFE135 3px, #FFE135 6px, #4ADE80 6px, #4ADE80 9px, #C71585 9px, #C71585 12px)';
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div
      className="w-full"
      style={{
        padding: 3,
        background: '#fff',
        border: '3px solid #141414',
        borderRadius: 12,
        boxShadow: '3px 3px 0 0 #141414',
      }}
    >
      <div className="flex items-center justify-between px-2 py-0.5 mb-0.5">
        <span
          className="font-black"
          style={{ fontSize: 'clamp(9px, 2.2vw, 11px)', letterSpacing: 2, color: '#141414' }}
        >
          进度 · PROGRESS
        </span>
        <span className="font-black" style={{ fontSize: 'clamp(11px, 2.8vw, 13px)' }}>
          <span style={{ color: '#FF2D7A' }}>{current + 1}</span>
          <span style={{ color: '#141414' }}> / {total}</span>
          <span
            className="ml-1.5"
            style={{ fontSize: 'clamp(10px, 2.5vw, 12px)', color: '#FF2D7A' }}
          >
            {percent}%
          </span>
        </span>
      </div>

      <div
        className="relative w-full overflow-hidden"
        style={{
          height: 'clamp(10px, 2.5vw, 14px)',
          borderRadius: 6,
          border: '2px solid #141414',
          background: '#FFF7E0',
        }}
      >
        <motion.div
          className="relative h-full"
          style={{
            backgroundImage: getStripeGradient(percent),
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
        />
      </div>
    </div>
  );
}
