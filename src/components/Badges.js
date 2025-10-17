import React from 'react';

function Badges() {
  const badges = [
    {
      id: 1,
      name: 'Fact Finder',
      description: 'Verify 5 articles',
      icon: '🛡️',
      color: 'from-cyan-400 to-cyan-600',
      earned: true
    },
    {
      id: 2,
      name: 'Truth Explorer',
      description: 'Verify 50 articles',
      icon: '🎯',
      color: 'from-purple-400 to-purple-600',
      earned: true
    },
    {
      id: 3,
      name: 'Community Helper',
      description: 'Help 20 users',
      icon: '🏅',
      color: 'from-yellow-400 to-yellow-600',
      earned: false
    },
    {
      id: 4,
      name: 'Weekly Champion',
      description: 'Top of weekly leaderboard',
      icon: '👑',
      color: 'from-orange-400 to-orange-600',
      earned: false
    },
    {
      id: 5,
      name: 'Speed Verifier',
      description: 'Verify 10 articles in 1 hour',
      icon: '⚡',
      color: 'from-green-400 to-green-600',
      earned: false
    },
    {
      id: 6,
      name: 'Guardian Elite',
      description: 'Reach 10,000 points',
      icon: '⭐',
      color: 'from-pink-400 to-pink-600',
      earned: false
    },
  ];

  return (
    <section id="badges" className="py-20 px-4 bg-gradient-to-b from-dark-light to-dark">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="gradient-text">badges</span>.title
          </h2>
          <p className="text-gray-400 text-lg">badges.subtitle</p>
        </div>

        {/* Badges Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {badges.map((badge, index) => (
            <div
              key={badge.id}
              className={`badge-card glass-card p-8 text-center hover:scale-105 transition-all duration-300 ${
                !badge.earned && 'opacity-50 grayscale'
              }`}
              style={{ animationDelay: `${index * 80}ms` }}
            >
              {/* Icon Circle */}
              <div className={`w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br ${badge.color} flex items-center justify-center text-5xl shadow-lg relative`}>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent"></div>
                <span className="relative z-10">{badge.icon}</span>
              </div>

              {/* Badge Name */}
              <h3 className="text-2xl font-bold mb-2">{badge.name}</h3>

              {/* Description */}
              <p className="text-gray-400 mb-4">{badge.description}</p>

              {/* Status */}
              {badge.earned ? (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 text-primary rounded-full text-sm font-semibold">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Earned
                </div>
              ) : (
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-500/20 text-gray-400 rounded-full text-sm font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                  Locked
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Achievement Progress */}
        <div className="mt-12 glass-card p-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-2xl font-bold">Your Achievement Progress</h3>
            <span className="text-primary font-bold text-xl">2 / 6 Badges</span>
          </div>
          <div className="h-3 bg-dark-lighter rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-cyan-500 rounded-full transition-all duration-500" style={{ width: '33%' }}></div>
          </div>
          <p className="text-gray-400 mt-3 text-center">Keep verifying to unlock more badges!</p>
        </div>
      </div>
    </section>
  );
}

export default Badges;
