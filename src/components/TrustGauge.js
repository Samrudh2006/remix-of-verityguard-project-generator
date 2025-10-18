import React, { useEffect, useState } from 'react';

/**
 * TrustGauge - animated circular progress (donut) showing a percentage.
 * Props:
 *  - value: number 0-100
 *  - size: pixel size (default 160)
 */
export default function TrustGauge({ value = 88, size = 160 }) {
  const [display, setDisplay] = useState(0);
  const stroke = 10;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;

  useEffect(() => {
    let raf; let start;
    const from = 0; const to = Math.max(0, Math.min(100, value));
    const duration = 900;
    const easeOut = (t) => 1 - Math.pow(1 - t, 3);
    const step = (ts) => {
      if (!start) start = ts;
      const p = Math.min(1, (ts - start) / duration);
      setDisplay(Math.round(from + (to - from) * easeOut(p)));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value]);

  const offset = circumference - (display / 100) * circumference;
  const gradientId = 'g' + Math.random().toString(36).slice(2);

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6ee7b7" />
            <stop offset="100%" stopColor="#48c6ef" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e2740"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradientId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.2s ease' }}
        />
        <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fill="#6ee7b7" fontSize={size * 0.22} fontWeight="800">
          {display}%
        </text>
      </svg>
      <div className="text-sm text-gray-400">Trust Score</div>
    </div>
  );
}
