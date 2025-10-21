import React from 'react';

function AnimatedParticles() {
  // Generate more particles with varied properties for richer animation
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: `${Math.random() * 5}s`,
    duration: `${5 + Math.random() * 10}s`,
    size: `${4 + Math.random() * 12}px`,
    opacity: 0.2 + Math.random() * 0.4,
    animationType: i % 4,
  }));

  const getAnimationClass = (type) => {
    switch (type) {
      case 0: return 'animate-float-slow';
      case 1: return 'animate-float';
      case 2: return 'animate-float-reverse';
      case 3: return 'animate-spiral';
      default: return 'animate-float-slow';
    }
  };

  const getParticleColor = (index) => {
    const colors = [
      'bg-primary/30',
      'bg-cyan-400/25',
      'bg-purple-400/25',
      'bg-blue-400/30',
    ];
    return colors[index % colors.length];
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className={`absolute rounded-full ${getParticleColor(particle.id)} ${getAnimationClass(particle.animationType)}`}
          style={{
            left: particle.left,
            top: particle.top,
            width: particle.size,
            height: particle.size,
            opacity: particle.opacity,
            animationDelay: particle.delay,
            animationDuration: particle.duration,
            boxShadow: `0 0 ${parseInt(particle.size) * 2}px rgba(110, 231, 183, 0.3)`,
          }}
        />
      ))}
      
      {/* Sparkle effects - small bright dots */}
      {Array.from({ length: 10 }, (_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute rounded-full bg-white animate-sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: '3px',
            height: '3px',
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        />
      ))}
      
      {/* Orbiting elements */}
      {Array.from({ length: 3 }, (_, i) => (
        <div
          key={`orbit-${i}`}
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            width: `${200 + i * 150}px`,
            height: `${200 + i * 150}px`,
            marginLeft: `-${100 + i * 75}px`,
            marginTop: `-${100 + i * 75}px`,
          }}
        >
          <div
            className="absolute top-0 left-1/2 w-2 h-2 bg-primary/40 rounded-full animate-spiral"
            style={{
              animationDuration: `${15 + i * 5}s`,
              animationDelay: `${i * 2}s`,
            }}
          />
        </div>
      ))}
      
      {/* Glowing orbs */}
      {Array.from({ length: 5 }, (_, i) => (
        <div
          key={`orb-${i}`}
          className="absolute rounded-full animate-expand-contract"
          style={{
            left: `${20 + i * 20}%`,
            top: `${15 + i * 15}%`,
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
            background: `radial-gradient(circle, ${
              i % 2 === 0 ? 'rgba(110, 231, 183, 0.3)' : 'rgba(72, 198, 239, 0.3)'
            } 0%, transparent 70%)`,
            animationDelay: `${i * 0.5}s`,
            animationDuration: `${3 + i}s`,
          }}
        />
      ))}
    </div>
  );
}

export default AnimatedParticles;
