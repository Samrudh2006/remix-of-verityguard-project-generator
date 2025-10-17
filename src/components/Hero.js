import React from 'react';

function Hero() {
  const handleGetStarted = () => {
    // TODO: Add authentication flow or redirect to dashboard
    console.log('Get Started clicked - Redirect to sign up');
  };

  const stats = [
    { icon: '🛡️', value: '1.2M+', label: 'Articles Verified', color: 'from-cyan-400 to-cyan-600' },
    { icon: '📈', value: '94.8%', label: 'Accuracy Rate', color: 'from-purple-400 to-purple-600' },
    { icon: '🌐', value: '50+', label: 'Languages', color: 'from-green-400 to-green-600' },
    { icon: '⚡', value: '250K+', label: 'Active Users', color: 'from-blue-400 to-blue-600' },
  ];

  return (
    <section id="home" className="pt-32 pb-20 px-4 min-h-screen flex items-center bg-gradient-to-b from-dark via-dark to-dark-light">
      <div className="container mx-auto">
        {/* Main Hero Content */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-4">
            <span className="text-primary font-semibold">⚡ AI-POWERED VERIFICATION</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            <span className="gradient-text">VerityGuard</span>
          </h1>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Truth in the Digital Age
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto">
            VerityGuard uses advanced machine learning to analyze news articles
            and provide real-time credibility scores. Join thousands of users fighting
            misinformation.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <button onClick={handleGetStarted} className="neon-button text-lg">
              Get Started
            </button>
            <button className="px-8 py-4 border-2 border-primary/50 text-white rounded-lg hover:border-primary hover:bg-primary/10 transition-all duration-300 font-semibold text-lg backdrop-blur-sm">
              🌐 Learn More
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="stat-card glass-card text-center p-6 hover:scale-105 transition-transform duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className={`text-3xl md:text-4xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Powered By Badge */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-md border border-primary/20 rounded-full">
            <span className="text-gray-400 text-sm">POWERED BY</span>
            <span className="text-primary font-bold">Advanced ML & NLP Technology</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
