import React, { useState, useMemo } from 'react';
import ArticleModal from './ArticleModal';
import { useI18n } from '../i18n';
import { useLocation } from '../contexts/LocationContext';
import { useAuth } from '../contexts/AuthContext';
import { locationArticles } from '../data/articles';
import LocationPicker from './LocationPicker';

function Articles() {
  const { t } = useI18n();
  const { location } = useLocation();
  const { isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('all');
  const [selected, setSelected] = useState(null);
  const [showLocationPicker, setShowLocationPicker] = useState(false);

  // Filter articles based on authentication and user's location
  const filteredArticles = useMemo(() => {
    // If not authenticated, show only random national news
    if (!isAuthenticated) {
      const nationalNews = locationArticles.filter((a) => a.location.scope === 'national');
      // Shuffle and return random national articles
      return nationalNews.sort(() => Math.random() - 0.5);
    }

    // If authenticated but no location set, show all national news
    if (!location) {
      return locationArticles.filter((a) => a.location.scope === 'national');
    }

    // If authenticated with location, show local + state + national news
    return locationArticles.filter((article) => {
      const { scope, state, city } = article.location;

      // Always show national news
      if (scope === 'national') return true;

      // Show state news if user's state matches
      if (scope === 'state' && state === location.state) return true;

      // Show local news if city matches (or state matches if no city specified)
      if (scope === 'local') {
        if (city && location.city && city === location.city) return true;
        if (!city && state === location.state) return true;
      }

      return false;
    });
  }, [location, isAuthenticated]);

  const articles = filteredArticles;

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
    <section id="articles" className="py-20 px-4 bg-gradient-to-b from-dark-light to-dark scroll-mt-24">
      <div className="container mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-4xl font-bold">{t('articles.title')}</h2>
            {!isAuthenticated && (
              <div className="mt-2 text-sm text-yellow-400">
                ℹ️ {t('articles.loginPrompt')}
              </div>
            )}
            {isAuthenticated && !location && (
              <div className="mt-2 text-sm text-white/70">
                📍 {t('articles.setLocationPrompt')}
              </div>
            )}
            {isAuthenticated && location && (
              <div className="mt-2 text-sm text-white/70">
                📍 {t('location.showingFor')} <span className="text-primary font-semibold">{location.city && `${location.city}, `}{location.stateName || location.state}</span>
              </div>
            )}
          </div>
          <div className="flex gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setShowLocationPicker(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-primary/30 rounded-lg hover:bg-white/10 transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {location ? t('location.change') : t('location.set')}
              </button>
            )}
            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-primary/30 rounded-lg hover:bg-white/10 transition-all">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              {t('articles.filters')}
            </button>
          </div>
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
              {t(`tabs.${tab}`)}
            </button>
          ))}
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article, index) => (
            <article 
              key={article.id}
              className="article-card glass-card overflow-hidden hover:scale-105 transition-all duration-300 cursor-pointer"
              onClick={() => setSelected(article)}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Article Image */}
              <div className="relative h-48 overflow-hidden bg-dark-lighter">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                  onError={(e) => e.target.src = 'https://via.placeholder.com/400x250/1e2740/6ee7b7?text=VerityGuard'}
                />
                <div className="absolute top-3 right-3">
                  {getStatusBadge(article.status)}
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                  <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span className="text-sm text-primary font-semibold">{t('label.trustShield')}</span>
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
                    <span className="text-sm font-semibold text-gray-400">{t('label.trustScore')}</span>
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

      {/* Modal */}
      <ArticleModal open={!!selected} article={selected} onClose={() => setSelected(null)} />
      
      {/* Location Picker Modal */}
      {showLocationPicker && <LocationPicker onClose={() => setShowLocationPicker(false)} />}
    </section>
  );
}

export default Articles;
