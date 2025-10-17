import { motion } from 'framer-motion';
import { cn, getTrustColor } from '@/lib/utils';

interface TrustScoreProps {
  score: number;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  animated?: boolean;
}

export default function TrustScore({ 
  score, 
  size = 'md', 
  showLabel = true,
  animated = true 
}: TrustScoreProps) {
  const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
  };

  const textSizeClasses = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  };

  const radius = size === 'sm' ? 28 : size === 'md' ? 42 : 56;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (score: number): string => {
    if (score >= 75) return '#10b981'; // green
    if (score >= 50) return '#f59e0b'; // amber
    return '#ef4444'; // red
  };

  const Component = animated ? motion.div : 'div';

  return (
    <div className="flex flex-col items-center">
      <Component
        className={cn('relative', sizeClasses[size])}
        {...(animated && {
          initial: { scale: 0.9, opacity: 0 },
          animate: { scale: 1, opacity: 1 },
          transition: { duration: 0.5 }
        })}
      >
        <svg className="transform -rotate-90" width="100%" height="100%">
          {/* Background circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="none"
            className="text-gray-200 dark:text-gray-700"
          />
          {/* Progress circle */}
          <motion.circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke={getColor(score)}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            {...(animated && {
              initial: { strokeDashoffset: circumference },
              animate: { strokeDashoffset: offset },
              transition: { duration: 1, ease: 'easeOut' }
            })}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={cn('font-bold', textSizeClasses[size], getTrustColor(score))}>
            {score.toFixed(0)}
          </span>
        </div>
      </Component>
      {showLabel && (
        <span className="mt-2 text-sm text-gray-600 dark:text-gray-400">
          Trust Score
        </span>
      )}
    </div>
  );
}
