import React, { useState } from 'react';

export default function NewsFeedWidget({ articles = [], loading = false, onRefresh }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const categories = [
    { id: 'all', label: 'All News', icon: '📰' },
    { id: 'technology', label: 'Technology', icon: '💻' },
    { id: 'health', label: 'Health', icon: '🏥' },
    { id: 'environment', label: 'Environment', icon: '🌍' },
    { id: 'business', label: 'Business', icon: '💼' }
  ];

  const filteredArticles = selectedCategory === 'all' 
    ? articles 
    : articles.filter(article => article.category === selectedCategory);

  const getTrustScoreColor = (score) => {
    if (score >= 80) return 'text-green-400 bg-green-500/20';
    if (score >= 60) return 'text-yellow-400 bg-yellow-500/20';
    return 'text-red-400 bg-red-500/20';
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const publishedDate = new Date(dateString);
    const diffInHours = Math.floor((now - publishedDate) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  if (loading) {
    return (
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-2xl">📰</div>
          <h3 className="text-xl font-bold text-white">Verified News Feed</h3>
        </div>
        
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="animate-pulse">
              <div className="h-4 bg-white/10 rounded mb-2"></div>
              <div className="h-3 bg-white/5 rounded mb-2"></div>
              <div className="h-3 bg-white/5 rounded w-3/4"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card rounded-xl p-6 border border-white/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="text-2xl">📰</div>
          <h3 className="text-xl font-bold text-white">Verified News Feed</h3>
        </div>
        
        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex bg-white/10 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded text-sm transition-colors ${
                viewMode === 'grid' ? 'bg-primary text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              ⊞
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded text-sm transition-colors ${
                viewMode === 'list' ? 'bg-primary text-white' : 'text-white/60 hover:text-white'
              }`}
            >
              ☰
            </button>
          </div>
          
          {/* Refresh Button */}
          <button
            onClick={onRefresh}
            className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
            title="Refresh feed"
          >
            🔄
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
              selectedCategory === category.id
                ? 'bg-primary text-white'
                : 'bg-white/10 text-white/70 hover:bg-white/20'
            }`}
          >
            <span>{category.icon}</span>
            {category.label}
          </button>
        ))}
      </div>

      {/* Articles */}
      {filteredArticles.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">📭</div>
          <div className="text-white/60">No articles found for this category</div>
        </div>
      ) : (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-4' : 'space-y-4'}>
          {filteredArticles.map((article, index) => (
            <div
              key={article.id || index}
              className={`group cursor-pointer transition-all duration-200 hover:scale-[1.02] ${
                viewMode === 'grid' 
                  ? 'bg-white/5 hover:bg-white/10 rounded-lg p-4 border border-white/10 hover:border-primary/30'
                  : 'flex gap-4 bg-white/5 hover:bg-white/10 rounded-lg p-4 border border-white/10 hover:border-primary/30'
              }`}
            >
              {/* Article Image */}
              {article.urlToImage && (
                <div className={viewMode === 'grid' ? 'mb-3' : 'flex-shrink-0'}>
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className={`rounded-lg object-cover ${
                      viewMode === 'grid' ? 'w-full h-32' : 'w-20 h-20'
                    }`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </div>
              )}

              {/* Article Content */}
              <div className="flex-1">
                {/* Trust Score & Source */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-1 rounded text-xs font-medium ${getTrustScoreColor(article.trustScore)}`}>
                      {article.trustScore}% Trust
                    </span>
                    {article.verified && (
                      <span className="text-green-400 text-xs">✓ Verified</span>
                    )}
                  </div>
                  <span className="text-xs text-white/40">
                    {getTimeAgo(article.publishedAt)}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-white font-medium mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </h4>

                {/* Description */}
                {article.description && (
                  <p className="text-white/70 text-sm mb-3 line-clamp-2">
                    {article.description}
                  </p>
                )}

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-white/50">
                    <span>{article.source?.name}</span>
                    {article.author && (
                      <>
                        <span>•</span>
                        <span>{article.author}</span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <button
                      className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="Save article"
                    >
                      💾
                    </button>
                    <button
                      className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="Share article"
                    >
                      📤
                    </button>
                    <button
                      className="p-1 text-white/40 hover:text-white hover:bg-white/10 rounded transition-colors"
                      title="Verify article"
                    >
                      🔍
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Load More */}
      {filteredArticles.length > 0 && (
        <div className="text-center mt-6">
          <button className="px-6 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white font-medium transition-colors">
            Load More Articles
          </button>
        </div>
      )}

      {/* Feed Stats */}
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/10 text-xs text-white/50">
        <span>{filteredArticles.length} articles loaded</span>
        <span>Last updated: {new Date().toLocaleTimeString()}</span>
      </div>
    </div>
  );
}