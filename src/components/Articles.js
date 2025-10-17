import React, { useState } from 'react';

function Articles() {
  const [activeTab, setActiveTab] = useState('all');

  const articles = [
    {
      id: 1,
      title: 'Breakthrough in Renewable Energy: New Solar Panel Efficiency Reaches 47%',
      source: 'Science Daily',
      time: 'about 2 hours ago',
      trustScore: 92,
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=250&fit=crop',
      excerpt: 'Researchers at MIT have developed a revolutionary solar panel design that achieves unprecedented 47% efficiency, marking a major...'
    },
    {
      id: 2,
      title: 'Global Summit Reaches Historic Climate Agreement',
      source: 'Reuters',
      time: 'about 5 hours ago',
      trustScore: 88,
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b6?w=400&h=250&fit=crop',
      excerpt: 'World leaders have signed a landmark climate agreement at the UN summit, committing to carbon neutrality by 2040. The accord includes...'
    },
    {
      id: 3,
      title: 'Tech Giant Announces Revolutionary AI Chip',
      source: 'TechCrunch',
      time: 'about 8 hours ago',
      trustScore: 72,
      status: 'partial',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=250&fit=crop',
      excerpt: 'A major technology company unveiled its latest AI processor, claiming 10x performance improvements over current generation chips....'
    },
    {
      id: 4,
      title: 'New Study Links Coffee Consumption to Extended Lifespan',
      source: 'Health Today',
      time: 'about 12 hours ago',
      trustScore: 85,
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=250&fit=crop',
      excerpt: 'Recent research suggests moderate coffee consumption may contribute to longevity and reduced disease risk...'
    },
    {
      id: 5,
      title: 'Viral Video Claims Show Fake Moon Landing Evidence',
      source: 'Social Media',
      time: 'about 1 day ago',
      trustScore: 15,
      status: 'false',
      image: 'https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?w=400&h=250&fit=crop',
      excerpt: 'A widely circulated video alleges evidence of staged moon landings, but fact-checkers have debunked these claims...'
    },
    {
      id: 6,
      title: 'Economic Recovery Accelerates in Major Markets',
      source: 'Financial Times',
      time: 'about 1 day ago',
      trustScore: 90,
      status: 'verified',
      image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=250&fit=crop',
      excerpt: 'Global economic indicators show strong recovery momentum across developed markets, with GDP growth exceeding forecasts...'
    },
  ];

  const getScoreColor = (score) => {
    if (score >= 80) return 'from-cyan-400 to-cyan-600';
    if (score >= 60) return 'from-yellow-400 to-yellow-600';
    return 'from-red-400 to-red-600';
  };

  const getStatusBadge = (status) => {
    const badges = {
      verified: { text: 'Verified', color: 'bg-green-500/20 text-green-400 border-green-500/50' },
      partial: { text: 'Partially Verified', color: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50' },
      false: { text: 'False', color: 'bg-red-500/20 text-red-400 border-red-500/50' },
    };
    const badge = badges[status] || badges.verified;
    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${badge.color}`}>
        {badge.text}
      </span>
    );
  };

  return (
    <section id="articles" className="py-20 px-4 bg-gradient-to-b from-dark-light to-dark">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-4xl font-bold">Latest Articles</h2>
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-primary/30 rounded-lg hover:bg-white/10 transition-all">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            Filters
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto">
          {['all', 'trending', 'recent', 'verified'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-2 rounded-lg font-semibold capitalize transition-all whitespace-nowrap ${
                activeTab === tab
                  ? 'bg-white text-dark'
                  : 'bg-white/5 text-gray-300 hover:bg-white/10'
              }`}
            >
              {tab === 'all' && '📋 '}
              {tab === 'trending' && '📈 '}
              {tab === 'recent' && '🕐 '}
              {tab === 'verified' && '⭐ '}
              {tab}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <article 
              key={article.id}
              className="article-card glass-card overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden bg-dark-lighter">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/400x250/1e2740/6ee7b7?text=VerityGuard'}
                />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(article.status)}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm text-primary font-semibold">Trust Shield</span>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold line-clamp-2 hover:text-primary transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-gray-400 text-sm line-clamp-2">
                  {article.excerpt}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-medium">{article.source}</span>
                  <span>• {article.time}</span>
                </div>

                {/* Trust Score */}
                <div className="pt-3 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-gray-400">TRUST SCORE</span>
                    <span className={`text-3xl font-bold bg-gradient-to-r ${getScoreColor(article.trustScore)} bg-clip-text text-transparent`}>
                      {article.trustScore}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-dark-lighter rounded-full overflow-hidden">
                    <div 
                      className={`h-full bg-gradient-to-r ${getScoreColor(article.trustScore)} transition-all duration-500`}
                      style={{ width: `${article.trustScore}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Articles;
