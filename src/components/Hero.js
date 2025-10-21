import React from 'react';
import TrustGauge from './TrustGauge';
import AnimatedParticles from './AnimatedParticles';
import { useI18n } from '../i18n';

function Hero() {
  const { t } = useI18n();
  const handleGetStarted = () => {
    // TODO: Add authentication flow or redirect to dashboard
    console.log('Get Started clicked - Redirect to sign up');
  };

  const stats = [
    { icon: '🛡️', value: '1.2M+', label: t('hero.stats.articles'), color: 'from-cyan-400 to-cyan-600' },
    { icon: '📈', value: '94.8%', label: t('hero.stats.accuracy'), color: 'from-purple-400 to-purple-600' },
    { icon: '🌐', value: '50+', label: t('hero.stats.languages'), color: 'from-green-400 to-green-600' },
    { icon: '⚡', value: '250K+', label: t('hero.stats.users'), color: 'from-blue-400 to-blue-600' },
  ];

  return (
    <section id="home" className="pt-32 pb-20 px-4 min-h-screen flex items-center hero-background scroll-mt-24 overflow-hidden relative">
      <AnimatedParticles />
      
      {/* Decorative animated corner elements */}
      <div className="absolute top-10 left-10 w-16 h-16 border-l-4 border-t-4 border-primary/30 animate-border-glow" style={{ animationDelay: '0s' }}></div>
      <div className="absolute top-10 right-10 w-16 h-16 border-r-4 border-t-4 border-primary/30 animate-border-glow" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute bottom-10 left-10 w-16 h-16 border-l-4 border-b-4 border-primary/30 animate-border-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-10 right-10 w-16 h-16 border-r-4 border-b-4 border-primary/30 animate-border-glow" style={{ animationDelay: '1.5s' }}></div>
      
      <div className="container mx-auto">
        {/* Main Hero Content */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-4 animate-slide-in-top backdrop-blur-sm" style={{ animationDelay: '0.1s' }}>
            <span className="text-primary font-semibold animate-sparkle">⚡ {t('hero.badge')}</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-zoom-in" style={{ animationDelay: '0.2s' }}>
            <span className="gradient-text animate-text-glow">{t('hero.title')}</span>
          </h1>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white animate-slide-in-left" style={{ animationDelay: '0.3s' }}>{t('hero.subtitle')}</h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto animate-slide-in-right" style={{ animationDelay: '0.4s' }}>{t('hero.description')}</p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-6 animate-slide-in-bottom" style={{ animationDelay: '0.5s' }}>
            <button onClick={handleGetStarted} className="neon-button text-lg animate-pulse-glow relative overflow-hidden group">
              <span className="relative z-10">{t('hero.getStarted')}</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-wave"></div>
            </button>
            <button className="px-8 py-4 border-2 border-primary/50 text-white rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300 font-semibold text-lg backdrop-blur-sm hover:scale-105 animate-color-shift">
              🌐 {t('hero.learnMore')}
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-card glass-card text-center p-6 hover:scale-105 transition-transform duration-300 relative overflow-hidden group"
              style={{ animationDelay: `${0.6 + index * 0.1}s` }}
            >
              {/* Animated border glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute inset-0 border-2 border-primary/50 rounded-xl animate-pulse-glow"></div>
              </div>
              
              <div className="text-4xl mb-3 animate-float relative z-10" style={{ animationDelay: `${index * 0.2}s` }}>{stat.icon}</div>
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 relative z-10 animate-sparkle`} style={{ animationDelay: `${index * 0.3}s` }}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm relative z-10">{stat.label}</div>
              
              {/* Animated background effect */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent transform translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
            </div>
          ))}
        </div>

        {/* TrustGauge Component */}
        <div className="mt-10 flex justify-center animate-zoom-in relative" style={{ animationDelay: '1.0s' }}>
          <div className="relative">
            {/* Animated ring around TrustGauge */}
            <div className="absolute inset-0 -m-4 rounded-full border-2 border-primary/20 animate-pulse-glow"></div>
            <TrustGauge value={88} />
          </div>
        </div>

        {/* Powered By Badge */}
        <div className="mt-16 text-center animate-slide-in-bottom" style={{ animationDelay: '1.2s' }}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-primary/20 rounded-full hover:border-primary/40 transition-all duration-300 group animate-border-glow">
            <span className="text-gray-400 text-sm group-hover:text-gray-300 transition-colors">{t('hero.poweredBy')}</span>
            <span className="text-primary font-bold animate-shimmer">{t('hero.tech')}</span>
            <span className="text-primary animate-sparkle">✨</span>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="mt-12 flex justify-center animate-bounce">
          <div className="flex flex-col items-center gap-2 text-primary/60">
            <span className="text-xs uppercase tracking-wider">Scroll to explore</span>
            <svg className="w-6 h-6 animate-float" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
