import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getRoleDisplayName } from '../utils/roles';
import VerifyNewsWidget from '../components/VerifyNewsWidget';
import NewsFeedWidget from '../components/NewsFeedWidget';
import AIChatWidget from '../components/AIChatWidget';
import StatsWidget from '../components/StatsWidget';
import AIAgentManager from '../components/AIAgentManager';
import { newsApiService } from '../services/newsApiService';

export default function ContributorMainDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [contributorStats, setContributorStats] = useState({
    publishedArticles: 0,
    totalViews: 0,
    avgTrustScore: 0,
    activeDrafts: 0
  });
  const [showChatbot, setShowChatbot] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadDashboardData();
  }, [user, navigate]);

  const loadDashboardData = async () => {
    try {
      // Load contributor stats (mock data for now)
      setContributorStats({
        publishedArticles: 24,
        totalViews: 12400,
        avgTrustScore: 92,
        activeDrafts: 3,
        weeklySubmissions: 5,
        approvalRate: 89,
        reputationScore: 4.8
      });
      
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'create', label: 'Create Content', icon: '✍️' },
    { id: 'drafts', label: 'My Drafts', icon: '📝' },
    { id: 'published', label: 'Published', icon: '📄' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'ai-agents', label: 'AI Agents', icon: '🤖' }
  ];



  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const renderOverviewSection = () => (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Welcome, {user?.name?.split(' ')[0]}! ✍️
              </h2>
              <p className="text-white/70">{user?.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm font-medium">
                  {getRoleDisplayName(user?.role)}
                </span>
                <span className="text-white/50 text-sm">
                  Content Creator since {new Date(user?.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          <button
            onClick={() => setShowChatbot(!showChatbot)}
            className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white font-medium transition-colors"
          >
            🤖 Ask VerityBot
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsWidget
          icon="📄"
          title="Published Articles"
          value={contributorStats.publishedArticles}
          subtitle="This month"
          color="blue"
          trend="+8"
        />
        <StatsWidget
          icon="👁️"
          title="Total Views"
          value={`${(contributorStats.totalViews / 1000).toFixed(1)}K`}
          subtitle="All time views"
          color="green"
          trend="+15%"
        />
        <StatsWidget
          icon="⭐"
          title="Avg Trust Score"
          value={`${contributorStats.avgTrustScore}%`}
          subtitle="Content credibility"
          color="yellow"
          trend="+2%"
        />
        <StatsWidget
          icon="📝"
          title="Active Drafts"
          value={contributorStats.activeDrafts}
          subtitle="In progress"
          color="purple"
          progress={60}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Content Creation Quick Start */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
          <div className="space-y-4">
            <button
              onClick={() => setActiveSection('create')}
              className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-blue-500 to-cyan-500 hover:scale-105 rounded-lg text-white font-medium transition-all"
            >
              <span className="text-2xl">✍️</span>
              <div className="text-left">
                <div className="font-bold">Create New Article</div>
                <div className="text-sm opacity-90">Start writing your next story</div>
              </div>
            </button>
            
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => setActiveSection('drafts')}
                className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <span className="text-2xl">📝</span>
                <span className="text-white text-sm">My Drafts</span>
              </button>
              <button
                onClick={() => setActiveSection('published')}
                className="flex flex-col items-center gap-2 p-4 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
              >
                <span className="text-2xl">📄</span>
                <span className="text-white text-sm">Published</span>
              </button>
            </div>
          </div>
        </div>

        {/* Recent Drafts */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Recent Drafts</h3>
            <button 
              onClick={() => setActiveSection('drafts')}
              className="text-sm text-primary hover:text-primary/80 transition-colors"
            >
              View All
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Understanding Climate Change Effects', updated: '2 hours ago', words: 1240, status: 'draft' },
              { title: 'Tech Innovation in 2025', updated: '1 day ago', words: 850, status: 'review' },
              { title: 'Economic Trends Analysis', updated: '2 days ago', words: 2100, status: 'draft' }
            ].map((draft, index) => (
              <div key={index} className="p-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all cursor-pointer">
                <div className="font-medium text-white mb-2">{draft.title}</div>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Updated {draft.updated}</span>
                  <div className="flex items-center gap-2">
                    <span>{draft.words} words</span>
                    <span className={`px-2 py-1 rounded ${
                      draft.status === 'review' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                    }`}>
                      {draft.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Performance */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">This Week</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white/70">Articles Submitted</span>
              <span className="text-white font-bold">{contributorStats.weeklySubmissions}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Approval Rate</span>
              <span className="text-green-400 font-bold">{contributorStats.approvalRate}%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-white/70">Reputation Score</span>
              <span className="text-yellow-400 font-bold">{contributorStats.reputationScore}/5</span>
            </div>
          </div>
        </div>

        {/* Top Performing Articles */}
        <div className="lg:col-span-2 glass-card rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Top Performing Articles</h3>
          <div className="space-y-3">
            {[
              { title: 'AI Revolution in Healthcare', views: '2.4K', score: 95, status: 'Published' },
              { title: 'Sustainable Energy Solutions', views: '1.8K', score: 92, status: 'Published' },
              { title: 'Digital Privacy in 2025', views: '1.6K', score: 88, status: 'Published' }
            ].map((article, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                <div className="flex-1">
                  <div className="text-white font-medium">{article.title}</div>
                  <div className="text-white/60 text-sm">{article.views} views</div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                    {article.score}% Trust
                  </span>
                  <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                    {article.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCreateSection = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Create New Content</h2>
        <p className="text-white/60">Write and submit articles for verification and publication.</p>
      </div>
      
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <form className="space-y-6">
          <div>
            <label className="block text-white font-medium mb-2">Article Title</label>
            <input
              type="text"
              placeholder="Enter your article title..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:bg-white/15 transition-colors"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Category</label>
            <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-primary focus:bg-white/15 transition-colors">
              <option value="">Select category...</option>
              <option value="technology">Technology</option>
              <option value="health">Health</option>
              <option value="environment">Environment</option>
              <option value="politics">Politics</option>
              <option value="business">Business</option>
            </select>
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Content</label>
            <textarea
              rows={12}
              placeholder="Write your article content here..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:bg-white/15 transition-colors resize-none"
            />
          </div>
          
          <div>
            <label className="block text-white font-medium mb-2">Sources & References</label>
            <textarea
              rows={3}
              placeholder="Add your sources and references..."
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-primary focus:bg-white/15 transition-colors resize-none"
            />
          </div>
          
          <div className="flex gap-4">
            <button
              type="button"
              className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-colors"
            >
              💾 Save as Draft
            </button>
            <button
              type="button"
              className="flex-1 px-6 py-3 bg-primary hover:bg-primary/80 rounded-lg text-white font-medium transition-colors"
            >
              📤 Submit for Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  const renderDraftsSection = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">My Drafts</h2>
        <p className="text-white/60">Manage your draft articles and continue writing.</p>
      </div>
      
      <div className="grid gap-6">
        {[
          { title: 'Understanding Climate Change Effects', updated: '2 hours ago', words: 1240, status: 'draft', progress: 75 },
          { title: 'Tech Innovation in 2025', updated: '1 day ago', words: 850, status: 'review', progress: 100 },
          { title: 'Economic Trends Analysis', updated: '2 days ago', words: 2100, status: 'draft', progress: 90 },
          { title: 'Future of Remote Work', updated: '3 days ago', words: 650, status: 'draft', progress: 45 }
        ].map((draft, index) => (
          <div key={index} className="glass-card rounded-xl p-6 border border-white/10 hover:border-primary/30 transition-all cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white mb-2">{draft.title}</h3>
                <div className="flex items-center gap-4 text-sm text-white/60">
                  <span>Updated {draft.updated}</span>
                  <span>{draft.words} words</span>
                  <span className={`px-2 py-1 rounded ${
                    draft.status === 'review' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {draft.status === 'review' ? 'Under Review' : 'Draft'}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-medium transition-colors">
                  ✏️ Edit
                </button>
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm font-medium transition-colors">
                  🗑️ Delete
                </button>
              </div>
            </div>
            
            <div className="mb-2">
              <div className="flex items-center justify-between text-sm text-white/70 mb-1">
                <span>Progress</span>
                <span>{draft.progress}%</span>
              </div>
              <div className="w-full bg-white/10 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${draft.progress}%` }}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPublishedSection = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Published Articles</h2>
        <p className="text-white/60">View your published articles and their performance metrics.</p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="glass-card rounded-xl border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-sm text-white/60 font-medium p-4">Article</th>
                <th className="text-left text-sm text-white/60 font-medium p-4">Views</th>
                <th className="text-left text-sm text-white/60 font-medium p-4">Trust Score</th>
                <th className="text-left text-sm text-white/60 font-medium p-4">Published</th>
                <th className="text-left text-sm text-white/60 font-medium p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'AI Revolution in Healthcare', views: '2.4K', score: 95, published: '2 days ago', status: 'Published' },
                { title: 'Sustainable Energy Solutions', views: '1.8K', score: 92, published: '5 days ago', status: 'Published' },
                { title: 'Digital Privacy in 2025', views: '1.6K', score: 88, published: '1 week ago', status: 'Published' },
                { title: 'Global Economic Outlook', views: '1.2K', score: 90, published: '2 weeks ago', status: 'Published' }
              ].map((article, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white font-medium">{article.title}</td>
                  <td className="p-4 text-white/70">{article.views}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                      {article.score}%
                    </span>
                  </td>
                  <td className="p-4 text-white/70">{article.published}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                      {article.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderAnalyticsSection = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Performance Analytics</h2>
        <p className="text-white/60">Track your content performance and engagement metrics.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Chart */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Weekly Performance</h3>
          <div className="space-y-4">
            {[
              { label: 'Mon', views: 85, engagement: 65 },
              { label: 'Tue', views: 120, engagement: 80 },
              { label: 'Wed', views: 95, engagement: 70 },
              { label: 'Thu', views: 140, engagement: 90 },
              { label: 'Fri', views: 160, engagement: 95 },
              { label: 'Sat', views: 110, engagement: 75 },
              { label: 'Sun', views: 90, engagement: 60 }
            ].map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 text-xs text-white/60">{day.label}</div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"
                        style={{ width: `${(day.views / 160) * 100}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white/70">{day.views} views</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"
                        style={{ width: `${day.engagement}%` }}
                      ></div>
                    </div>
                    <span className="text-xs text-white/70">{day.engagement}% engagement</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Content Categories */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h3 className="text-lg font-bold text-white mb-4">Content Categories</h3>
          <div className="space-y-4">
            {[
              { category: 'Technology', articles: 8, percentage: 35 },
              { category: 'Health', articles: 6, percentage: 25 },
              { category: 'Environment', articles: 4, percentage: 20 },
              { category: 'Business', articles: 3, percentage: 15 },
              { category: 'Politics', articles: 3, percentage: 5 }
            ].map((cat, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-white font-medium">{cat.category}</span>
                  <span className="text-white/70 text-sm">{cat.articles} articles</span>
                </div>
                <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-blue-500"
                    style={{ width: `${cat.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderAIAgentsSection = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">AI Content Assistant</h2>
        <p className="text-white/60">Use AI agents to improve your content quality and verification.</p>
      </div>
      <AIAgentManager userId={user?.id} />
    </div>
  );

  const renderDashboardsSection = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Available Dashboards</h2>
        <p className="text-white/60">Access different dashboards based on your role and permissions.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {accessibleDashboards.map((dashboard) => (
          <div
            key={dashboard.role}
            className={`glass-card rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden group ${
              dashboard.isCurrent ? 'ring-2 ring-blue-500/50' : 'cursor-pointer'
            }`}
            onClick={() => !dashboard.isCurrent && handleDashboardSelect(dashboard.role)}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${dashboard.color} opacity-5 group-hover:opacity-10 transition-opacity`}></div>
            
            <div className="relative p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-12 h-12 bg-gradient-to-br ${dashboard.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                  {dashboard.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white group-hover:text-primary transition-colors">
                    {dashboard.title}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {dashboard.isCurrent ? 'Current Dashboard' : 'Available Access'}
                  </p>
                </div>
              </div>

              <p className="text-white/70 mb-4 text-sm leading-relaxed">
                {dashboard.description}
              </p>

              {dashboard.isCurrent ? (
                <div className="w-full py-2 bg-blue-500/20 text-blue-400 rounded-lg font-medium text-center text-sm">
                  ✓ Current Dashboard
                </div>
              ) : (
                <button
                  className={`w-full py-2 bg-gradient-to-r ${dashboard.color} hover:scale-105 rounded-lg font-medium text-white transition-all duration-300 shadow-lg text-sm`}
                >
                  Access Dashboard
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'create':
        return renderCreateSection();
      case 'drafts':
        return renderDraftsSection();
      case 'published':
        return renderPublishedSection();
      case 'analytics':
        return renderAnalyticsSection();
      case 'ai-agents':
        return renderAIAgentsSection();
      default:
        return renderOverviewSection();
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-light">
      {/* Header */}
      <div className="bg-dark-light border-b border-white/10 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="text-3xl">✍️</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Contributor Dashboard</h1>
                <p className="text-white/60 text-sm">Create, manage, and track your content</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('/')}
                className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-colors"
              >
                🏠 Home
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 font-medium transition-colors"
              >
                🚪 Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-dark-light border-b border-white/10 sticky top-[72px] z-30">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto pb-2 pt-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  activeSection === section.id
                    ? 'bg-primary text-white'
                    : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
              >
                <span>{section.icon}</span>
                {section.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {renderSectionContent()}
      </div>

      {/* AI Chatbot Widget */}
      {showChatbot && (
        <AIChatWidget 
          onClose={() => setShowChatbot(false)}
          userId={user?.id}
        />
      )}
    </div>
  );
}