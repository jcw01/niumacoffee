import { useMemo } from 'react';

interface ParticleBgProps {
  count?: number;
}

export default function ParticleBg({ count = 20 }: ParticleBgProps) {
  const particles = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 8}s`,
      duration: `${6 + Math.random() * 10}s`,
      size: `${2 + Math.random() * 4}px`,
    }));
  }, [count]);

  return (
    <div className="particle-wrapper">
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDelay: p.delay,
            animationDuration: p.duration,
            width: p.size,
            height: p.size,
          }}
        />
      ))}
    </div>
  );
}
