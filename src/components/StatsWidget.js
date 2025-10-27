import React from 'react';

export default function StatsWidget({ 
  icon, 
  title, 
  value, 
  subtitle, 
  color = 'blue', 
  trend, 
  progress 
}) {
  const colorClasses = {
    blue: {
      bg: 'from-blue-500 to-cyan-500',
      accent: 'bg-blue-500/20 text-blue-400',
      progress: 'bg-blue-500'
    },
    green: {
      bg: 'from-green-500 to-emerald-500',
      accent: 'bg-green-500/20 text-green-400',
      progress: 'bg-green-500'
    },
    yellow: {
      bg: 'from-yellow-500 to-orange-500',
      accent: 'bg-yellow-500/20 text-yellow-400',
      progress: 'bg-yellow-500'
    },
    purple: {
      bg: 'from-purple-500 to-pink-500',
      accent: 'bg-purple-500/20 text-purple-400',
      progress: 'bg-purple-500'
    },
    red: {
      bg: 'from-red-500 to-pink-500',
      accent: 'bg-red-500/20 text-red-400',
      progress: 'bg-red-500'
    }
  };

  const colors = colorClasses[color] || colorClasses.blue;

  return (
    <div className="glass-card rounded-xl p-6 border border-white/10 relative overflow-hidden">
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-5`}></div>
      
      {/* Content */}
      <div className="relative">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="text-4xl">{icon}</div>
          {trend && (
            <div className={`text-xs px-2 py-1 rounded-full ${colors.accent}`}>
              {trend}
            </div>
          )}
        </div>
        
        {/* Value */}
        <div className="text-3xl font-bold text-white mb-1">
          {value}
        </div>
        
        {/* Subtitle */}
        <div className="text-sm text-white/60 mb-3">
          {subtitle}
        </div>
        
        {/* Progress Bar */}
        {progress !== undefined && (
          <div className="w-full bg-white/10 rounded-full h-2">
            <div 
              className={`${colors.progress} h-2 rounded-full transition-all duration-500 ease-out`}
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}