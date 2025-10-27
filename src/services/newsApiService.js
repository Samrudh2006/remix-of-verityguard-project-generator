/**
 * News API Service
 * Handles fetching news from multiple sources and APIs
 */

class NewsApiService {
  constructor() {
    this.apiKeys = {
      newsapi: process.env.REACT_APP_NEWS_API_KEY || 'demo_key',
      gnews: process.env.REACT_APP_GNEWS_API_KEY || 'demo_key',
      mediastack: process.env.REACT_APP_MEDIASTACK_API_KEY || 'demo_key'
    };
    
    this.baseUrls = {
      newsapi: 'https://newsapi.org/v2',
      gnews: 'https://gnews.io/api/v4',
      mediastack: 'http://api.mediastack.com/v1'
    };
    
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  /**
   * Get personalized news feed for user
   */
  async getPersonalizedFeed(userId, preferences = {}) {
    try {
      const cacheKey = `feed_${userId}_${JSON.stringify(preferences)}`;
      
      // Check cache first
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey);
        if (Date.now() - cached.timestamp < this.cacheTimeout) {
          return cached.data;
        }
      }
      
      // Fetch from multiple sources
      const [topHeadlines, categoryNews, localNews] = await Promise.all([
        this.getTopHeadlines(preferences.country || 'us'),
        this.getCategoryNews(preferences.categories || ['general', 'technology']),
        this.getLocalNews(preferences.location)
      ]);
      
      // Combine and deduplicate
      const allArticles = [
        ...topHeadlines,
        ...categoryNews,
        ...localNews
      ];
      
      const uniqueArticles = this.deduplicateArticles(allArticles);
      const scoredArticles = await this.scoreArticles(uniqueArticles);
      
      // Sort by relevance and trust score
      const sortedArticles = scoredArticles.sort((a, b) => {
        return (b.trustScore + b.relevanceScore) - (a.trustScore + a.relevanceScore);
      });
      
      const result = {
        articles: sortedArticles.slice(0, 50), // Limit to 50 articles
        totalCount: sortedArticles.length,
        lastUpdated: new Date().toISOString(),
        sources: this.getUniqueSources(sortedArticles)
      };
      
      // Cache result
      this.cache.set(cacheKey, {
        data: result,
        timestamp: Date.now()
      });
      
      return result;
      
    } catch (error) {
      console.error('Failed to fetch personalized feed:', error);
      return this.getFallbackFeed();
    }
  }

  /**
   * Get top headlines from NewsAPI
   */
  async getTopHeadlines(country = 'us', category = null) {
    try {
      let url = `${this.baseUrls.newsapi}/top-headlines?country=${country}&pageSize=20`;
      if (category) {
        url += `&category=${category}`;
      }
      
      // For demo purposes, return mock data
      return this.getMockHeadlines();
      
      // Uncomment for real API usage:
      /*
      const response = await fetch(url, {
        headers: {
          'X-API-Key': this.apiKeys.newsapi
        }
      });
      
      if (!response.ok) {
        throw new Error(`NewsAPI error: ${response.status}`);
      }
      
      const data = await response.json();
      return this.formatNewsApiArticles(data.articles);
      */
      
    } catch (error) {
      console.error('Failed to fetch top headlines:', error);
      return [];
    }
  }

  /**
   * Get news by category
   */
  async getCategoryNews(categories) {
    const categoryPromises = categories.map(category => 
      this.getTopHeadlines('us', category)
    );
    
    const results = await Promise.all(categoryPromises);
    return results.flat();
  }

  /**
   * Get local news based on location
   */
  async getLocalNews(location) {
    if (!location) return [];
    
    try {
      // Mock local news - replace with real geolocation-based API
      return this.getMockLocalNews(location);
      
    } catch (error) {
      console.error('Failed to fetch local news:', error);
      return [];
    }
  }

  /**
   * Search news articles
   */
  async searchNews(query, options = {}) {
    try {
      const {
        sortBy = 'relevancy',
        language = 'en',
        pageSize = 20,
        page = 1
      } = options;
      
      // Mock search results
      return this.getMockSearchResults(query);
      
      // Uncomment for real API usage:
      /*
      const url = `${this.baseUrls.newsapi}/everything?q=${encodeURIComponent(query)}&sortBy=${sortBy}&language=${language}&pageSize=${pageSize}&page=${page}`;
      
      const response = await fetch(url, {
        headers: {
          'X-API-Key': this.apiKeys.newsapi
        }
      });
      
      if (!response.ok) {
        throw new Error(`Search failed: ${response.status}`);
      }
      
      const data = await response.json();
      return {
        articles: this.formatNewsApiArticles(data.articles),
        totalResults: data.totalResults
      };
      */
      
    } catch (error) {
      console.error('News search failed:', error);
      return { articles: [], totalResults: 0 };
    }
  }

  /**
   * Get trending topics
   */
  async getTrendingTopics() {
    try {
      // Mock trending topics
      return [
        { topic: 'Climate Change', count: 1250, trend: 'up' },
        { topic: 'AI Technology', count: 980, trend: 'up' },
        { topic: 'Economic Policy', count: 750, trend: 'stable' },
        { topic: 'Healthcare', count: 650, trend: 'down' },
        { topic: 'Space Exploration', count: 420, trend: 'up' }
      ];
      
    } catch (error) {
      console.error('Failed to fetch trending topics:', error);
      return [];
    }
  }

  /**
   * Score articles for relevance and trust
   */
  async scoreArticles(articles) {
    return articles.map(article => {
      // Calculate trust score based on source
      const trustScore = this.calculateSourceTrustScore(article.source);
      
      // Calculate relevance score (mock implementation)
      const relevanceScore = Math.random() * 100; // Replace with real relevance algorithm
      
      return {
        ...article,
        trustScore,
        relevanceScore,
        combinedScore: (trustScore + relevanceScore) / 2
      };
    });
  }

  /**
   * Calculate trust score for news source
   */
  calculateSourceTrustScore(source) {
    const trustedSources = {
      'reuters.com': 95,
      'bbc.com': 92,
      'ap.org': 94,
      'npr.org': 88,
      'pib.gov.in': 90,
      'who.int': 96,
      'cdc.gov': 94,
      'cnn.com': 75,
      'foxnews.com': 70,
      'theguardian.com': 85,
      'nytimes.com': 88
    };
    
    const sourceDomain = source?.name?.toLowerCase() || '';
    
    for (const [domain, score] of Object.entries(trustedSources)) {
      if (sourceDomain.includes(domain.replace('.com', ''))) {
        return score;
      }
    }
    
    // Default score for unknown sources
    return 60;
  }

  /**
   * Remove duplicate articles
   */
  deduplicateArticles(articles) {
    const seen = new Set();
    return articles.filter(article => {
      const key = article.title?.toLowerCase().substring(0, 50);
      if (seen.has(key)) {
        return false;
      }
      seen.add(key);
      return true;
    });
  }

  /**
   * Get unique sources from articles
   */
  getUniqueSources(articles) {
    const sources = new Map();
    
    articles.forEach(article => {
      if (article.source?.name) {
        sources.set(article.source.name, {
          name: article.source.name,
          trustScore: article.trustScore || 60,
          articleCount: (sources.get(article.source.name)?.articleCount || 0) + 1
        });
      }
    });
    
    return Array.from(sources.values());
  }

  /**
   * Format NewsAPI articles to standard format
   */
  formatNewsApiArticles(articles) {
    return articles.map(article => ({
      id: this.generateArticleId(article),
      title: article.title,
      description: article.description,
      content: article.content,
      url: article.url,
      urlToImage: article.urlToImage,
      publishedAt: article.publishedAt,
      source: {
        id: article.source.id,
        name: article.source.name
      },
      author: article.author,
      category: 'general', // NewsAPI doesn't provide category in response
      verified: false,
      trustScore: 60 // Will be calculated later
    }));
  }

  /**
   * Generate unique article ID
   */
  generateArticleId(article) {
    return btoa(article.url || article.title || Math.random().toString()).substring(0, 16);
  }

  /**
   * Get fallback feed when APIs fail
   */
  getFallbackFeed() {
    return {
      articles: this.getMockHeadlines(),
      totalCount: 10,
      lastUpdated: new Date().toISOString(),
      sources: [
        { name: 'Mock News Source', trustScore: 75, articleCount: 10 }
      ]
    };
  }

  /**
   * Mock data for development/demo
   */
  getMockHeadlines() {
    return [
      {
        id: 'mock_1',
        title: 'AI Technology Breakthrough Announced by Leading Tech Company',
        description: 'Revolutionary artificial intelligence system shows promising results in early testing phases.',
        content: 'A major technology company has announced a significant breakthrough in artificial intelligence...',
        url: 'https://example.com/ai-breakthrough',
        urlToImage: 'https://via.placeholder.com/400x200?text=AI+News',
        publishedAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        source: { id: 'tech-news', name: 'Tech News Daily' },
        author: 'Jane Smith',
        category: 'technology',
        verified: true,
        trustScore: 85
      },
      {
        id: 'mock_2',
        title: 'Climate Summit Reaches Historic Agreement on Carbon Emissions',
        description: 'World leaders unite on ambitious climate targets for the next decade.',
        content: 'In a landmark decision, representatives from over 190 countries have agreed...',
        url: 'https://example.com/climate-summit',
        urlToImage: 'https://via.placeholder.com/400x200?text=Climate+News',
        publishedAt: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        source: { id: 'global-news', name: 'Global News Network' },
        author: 'John Doe',
        category: 'environment',
        verified: true,
        trustScore: 92
      },
      {
        id: 'mock_3',
        title: 'Economic Markets Show Strong Recovery Signals',
        description: 'Financial analysts report positive trends across major market indices.',
        content: 'Stock markets worldwide are showing signs of robust recovery...',
        url: 'https://example.com/market-recovery',
        urlToImage: 'https://via.placeholder.com/400x200?text=Economy+News',
        publishedAt: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
        source: { id: 'financial-times', name: 'Financial Times' },
        author: 'Sarah Johnson',
        category: 'business',
        verified: true,
        trustScore: 88
      }
    ];
  }

  getMockLocalNews(location) {
    return [
      {
        id: 'local_1',
        title: `Local Infrastructure Project Approved in ${location}`,
        description: 'City council approves major infrastructure improvements.',
        content: 'The local government has approved a comprehensive infrastructure project...',
        url: 'https://example.com/local-infrastructure',
        urlToImage: 'https://via.placeholder.com/400x200?text=Local+News',
        publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        source: { id: 'local-news', name: 'Local News Today' },
        author: 'Mike Wilson',
        category: 'local',
        verified: true,
        trustScore: 78
      }
    ];
  }

  getMockSearchResults(query) {
    return {
      articles: [
        {
          id: 'search_1',
          title: `Breaking: ${query} - Latest Developments`,
          description: `Comprehensive coverage of ${query} with expert analysis.`,
          content: `Recent developments regarding ${query} have captured global attention...`,
          url: `https://example.com/search/${query.toLowerCase().replace(/\s+/g, '-')}`,
          urlToImage: 'https://via.placeholder.com/400x200?text=Search+Result',
          publishedAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
          source: { id: 'search-news', name: 'Search News Source' },
          author: 'Reporter Name',
          category: 'general',
          verified: false,
          trustScore: 70
        }
      ],
      totalResults: 1
    };
  }
}

// Export singleton instance
export const newsApiService = new NewsApiService();
export default newsApiService;