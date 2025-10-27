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

export default function UserMainDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [newsFeed, setNewsFeed] = useState({ articles: [], loading: true });
  const [userStats, setUserStats] = useState({
    verificationsCount: 0,
    trustScore: 0,
    badges: [],
    level: 1
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
      // Load personalized news feed
      const feedData = await newsApiService.getPersonalizedFeed(user?.id, {
        country: 'us',
        categories: ['general', 'technology', 'health'],
        location: user?.location
      });
      
      setNewsFeed({ articles: feedData.articles.slice(0, 6), loading: false });
      
      // Load user stats (mock data for now)
      setUserStats({
        verificationsCount: 47,
        trustScore: 85,
        badges: ['Truth Seeker', 'Fact Checker', 'Community Helper'],
        level: 3,
        points: 1250,
        weeklyGoal: 10,
        weeklyProgress: 7
      });
      
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
      setNewsFeed({ articles: [], loading: false });
    }
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'verify', label: 'Verify News', icon: '🔍' },
    { id: 'feed', label: 'News Feed', icon: '📰' },
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
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Welcome back, {user?.name?.split(' ')[0]}! 👋
              </h2>
              <p className="text-white/70">{user?.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium">
                  {getRoleDisplayName(user?.role)}
                </span>
                <span className="text-white/50 text-sm">
                  Member since {new Date(user?.createdAt).toLocaleDateString()}
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
          icon="🎯"
          title="Trust Score"
          value={`${userStats.trustScore}%`}
          subtitle="Your credibility rating"
          color="green"
          trend="+5%"
        />
        <StatsWidget
          icon="🔍"
          title="Verifications"
          value={userStats.verificationsCount}
          subtitle="Articles verified"
          color="blue"
          trend="+12"
        />
        <StatsWidget
          icon="⭐"
          title="Level"
          value={userStats.level}
          subtitle={`${userStats.points} points`}
          color="yellow"
          progress={75}
        />
        <StatsWidget
          icon="🏆"
          title="Weekly Goal"
          value={`${userStats.weeklyProgress}/${userStats.weeklyGoal}`}
          subtitle="Verifications this week"
          color="purple"
          progress={(userStats.weeklyProgress / userStats.weeklyGoal) * 100}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Verify News Widget */}
        <div className="lg:col-span-1">
          <VerifyNewsWidget />
        </div>
        
        {/* News Feed Widget */}
        <div className="lg:col-span-2">
          <NewsFeedWidget 
            articles={newsFeed.articles} 
            loading={newsFeed.loading}
            onRefresh={loadDashboardData}
          />
        </div>
      </div>

      {/* Secondary Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Recent Activity</h3>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {[
              {
                action: 'Verified article',
                title: 'Climate Change Report Analysis',
                time: '2 hours ago',
                result: 'verified',
                icon: '✅'
              },
              {
                action: 'Flagged content',
                title: 'Suspicious Health Claim',
                time: '1 day ago',
                result: 'flagged',
                icon: '🚩'
              },
              {
                action: 'Earned badge',
                title: 'Truth Seeker Level 3',
                time: '2 days ago',
                result: 'achievement',
                icon: '🏆'
              },
              {
                action: 'Shared article',
                title: 'Economic Policy Update',
                time: '3 days ago',
                result: 'shared',
                icon: '📤'
              }
            ].map((activity, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="text-sm font-medium text-white">
                    {activity.action}
                  </div>
                  <div className="text-sm text-white/70">{activity.title}</div>
                  <div className="text-xs text-white/40 mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements & Badges */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Achievements</h3>
          
          {/* Level Progress */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-white/70">Level {userStats.level}</span>
              <span className="text-sm text-white/70">{userStats.points} / 1500 XP</span>
            </div>
            <div className="w-full bg-white/10 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${(userStats.points / 1500) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Badges */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-white/80">Recent Badges</h4>
            {userStats.badges.map((badge, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-primary/20 to-blue-500/20 border border-primary/30"
              >
                <div className="text-2xl">🏆</div>
                <div>
                  <div className="text-sm font-medium text-white">{badge}</div>
                  <div className="text-xs text-white/60">Earned recently</div>
                </div>
              </div>
            ))}
          </div>

          {/* Next Achievement */}
          <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
            <div className="text-sm font-medium text-white/80 mb-1">Next Achievement</div>
            <div className="text-xs text-white/60">Verify 50 articles to unlock "Expert Verifier"</div>
            <div className="w-full bg-white/10 rounded-full h-1 mt-2">
              <div 
                className="bg-yellow-500 h-1 rounded-full"
                style={{ width: `${(userStats.verificationsCount / 50) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '🔍', label: 'Verify Article', action: () => setActiveSection('verify'), color: 'from-blue-500 to-cyan-500' },
            { icon: '📰', label: 'Browse News', action: () => setActiveSection('feed'), color: 'from-green-500 to-emerald-500' },
            { icon: '🤖', label: 'AI Agents', action: () => setActiveSection('ai-agents'), color: 'from-purple-500 to-pink-500' },
            { icon: '🎓', label: 'Learn More', action: () => {}, color: 'from-orange-500 to-red-500' }
          ].map((action, index) => (
            <button
              key={index}
              onClick={action.action}
              className={`flex flex-col items-center gap-3 p-6 rounded-lg bg-gradient-to-br ${action.color} hover:scale-105 transition-all duration-200 text-white font-medium`}
            >
              <div className="text-3xl">{action.icon}</div>
              <div className="text-sm text-center">{action.label}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const renderVerifySection = () => (
    <div className="max-w-2xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Verify News Content</h2>
        <p className="text-white/60">Use our AI-powered verification tools to check the authenticity of news articles, claims, and media content.</p>
      </div>
      <VerifyNewsWidget />
    </div>
  );

  const renderFeedSection = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Personalized News Feed</h2>
        <p className="text-white/60">Stay updated with verified news articles curated based on your interests and reading history.</p>
      </div>
      <NewsFeedWidget 
        articles={newsFeed.articles} 
        loading={newsFeed.loading}
        onRefresh={loadDashboardData}
      />
    </div>
  );

  const renderAIAgentsSection = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">AI Agent Manager</h2>
        <p className="text-white/60">Coordinate multiple AI agents for comprehensive content analysis and verification.</p>
      </div>
      <AIAgentManager userId={user?.id} />
    </div>
  );



  const renderSectionContent = () => {
    switch (activeSection) {
      case 'verify':
        return renderVerifySection();
      case 'feed':
        return renderFeedSection();
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
            {/* Logo and Title */}
            <div className="flex items-center gap-4">
              <div className="text-3xl">🛡️</div>
              <div>
                <h1 className="text-2xl font-bold text-white">VerityGuard Dashboard</h1>
                <p className="text-white/60 text-sm">Your personalized news verification center</p>
              </div>
            </div>
            
            {/* User Menu */}
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