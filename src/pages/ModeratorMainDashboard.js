import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getRoleDisplayName } from '../utils/roles';
import AIChatWidget from '../components/AIChatWidget';
import StatsWidget from '../components/StatsWidget';
import AIAgentManager from '../components/AIAgentManager';

export default function ModeratorMainDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('overview');
  const [moderatorStats, setModeratorStats] = useState({
    pendingReviews: 0,
    reviewedToday: 0,
    flaggedContent: 0,
    accuracyRate: 0
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
      setModeratorStats({
        pendingReviews: 42,
        reviewedToday: 28,
        flaggedContent: 8,
        accuracyRate: 97,
        weeklyReviews: 156,
        avgResponseTime: 2.5,
        qualityScore: 4.8
      });
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    }
  };

  const sections = [
    { id: 'overview', label: 'Overview', icon: '🏠' },
    { id: 'queue', label: 'Review Queue', icon: '⏳', badge: 42 },
    { id: 'flagged', label: 'Flagged Content', icon: '🚩', badge: 8 },
    { id: 'reports', label: 'User Reports', icon: '📋' },
    { id: 'history', label: 'My History', icon: '📝' },
    { id: 'ai-agents', label: 'AI Agents', icon: '🤖' }
  ];

  const availableDashboards = [
    {
      role: ROLES.USER,
      title: 'User Dashboard',
      description: 'Access personalized news feed and verification tools',
      icon: '👤',
      color: 'from-green-500 to-emerald-500',
      isCurrent: false
    },
    {
      role: ROLES.CONTRIBUTOR,
      title: 'Contributor Dashboard',
      description: 'Create and manage content submissions',
      icon: '✍️',
      color: 'from-blue-500 to-cyan-500',
      isCurrent: false
    },
    {
      role: ROLES.MODERATOR,
      title: 'Moderator Dashboard',
      description: 'Your current dashboard for content moderation',
      icon: '🛡️',
      color: 'from-purple-500 to-pink-500',
      isCurrent: true
    },
    {
      role: ROLES.SUPER_ADMIN,
      title: 'Admin Dashboard',
      description: 'Manage the entire platform and analytics',
      icon: '👑',
      color: 'from-red-500 to-orange-500',
      isCurrent: false
    }
  ];

  const roleHierarchy = {
    [ROLES.SUPER_ADMIN]: 4,
    [ROLES.MODERATOR]: 3,
    [ROLES.CONTRIBUTOR]: 2,
    [ROLES.USER]: 1,
  };

  const userLevel = roleHierarchy[user?.role] || 1;
  const accessibleDashboards = availableDashboards.filter(
    dashboard => roleHierarchy[dashboard.role] <= userLevel
  );

  const handleDashboardSelect = (role) => {
    const path = getDashboardPath(role);
    navigate(path);
  };

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
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">
                Welcome, {user?.name?.split(' ')[0]}! 🛡️
              </h2>
              <p className="text-white/70">{user?.email}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                  {getRoleDisplayName(user?.role)}
                </span>
                <span className="text-white/50 text-sm">
                  Moderating since {new Date(user?.createdAt).toLocaleDateString()}
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
          icon="⏳"
          title="Pending Reviews"
          value={moderatorStats.pendingReviews}
          subtitle="Awaiting moderation"
          color="red"
          trend="Urgent"
        />
        <StatsWidget
          icon="✅"
          title="Reviewed Today"
          value={moderatorStats.reviewedToday}
          subtitle="Completed reviews"
          color="green"
          trend="+8"
        />
        <StatsWidget
          icon="🚩"
          title="Flagged Content"
          value={moderatorStats.flaggedContent}
          subtitle="Requires attention"
          color="yellow"
          trend="Action Needed"
        />
        <StatsWidget
          icon="🎯"
          title="Accuracy Rate"
          value={`${moderatorStats.accuracyRate}%`}
          subtitle="Moderation accuracy"
          color="blue"
          trend="Excellent"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Priority Queue */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Priority Queue</h3>
            <button 
              onClick={() => setActiveSection('queue')}
              className="text-sm px-3 py-1 bg-primary hover:bg-primary/80 rounded transition-colors text-white"
            >
              Review All
            </button>
          </div>
          <div className="space-y-3">
            {[
              { 
                title: 'Breaking: Major Tech Announcement', 
                priority: 'high', 
                submitted: '5 min ago',
                contributor: 'John Doe'
              },
              { 
                title: 'Economic Policy Update Analysis', 
                priority: 'medium', 
                submitted: '15 min ago',
                contributor: 'Jane Smith'
              },
              { 
                title: 'Sports: Championship Results', 
                priority: 'low', 
                submitted: '1 hour ago',
                contributor: 'Mike Johnson'
              },
            ].map((item, index) => {
              const priorityColors = {
                high: 'bg-red-500/20 text-red-400 border-red-500/30',
                medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                low: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
              };
              return (
                <div
                  key={index}
                  className="p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all cursor-pointer"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="font-medium text-white flex-1">{item.title}</div>
                    <span className={`text-xs px-2 py-1 rounded ${priorityColors[item.priority]}`}>
                      {item.priority}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/60">
                    <span>By {item.contributor}</span>
                    <span>{item.submitted}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Decisions */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Recent Decisions</h3>
          <div className="space-y-3">
            {[
              { action: 'Approved', title: 'Climate Summit Coverage', time: '10 min ago', icon: '✅' },
              { action: 'Approved', title: 'Technology Innovation Report', time: '25 min ago', icon: '✅' },
              { action: 'Rejected', title: 'Unverified News Claim', time: '45 min ago', icon: '❌' },
              { action: 'Escalated', title: 'Controversial Political Analysis', time: '1 hour ago', icon: '⬆️' },
            ].map((decision, index) => {
              const actionColors = {
                'Approved': 'text-green-400',
                'Rejected': 'text-red-400',
                'Escalated': 'text-yellow-400',
              };
              return (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 rounded-lg bg-white/5 border border-white/5"
                >
                  <div className="text-2xl">{decision.icon}</div>
                  <div className="flex-1">
                    <div className={`text-sm font-medium ${actionColors[decision.action]}`}>
                      {decision.action}
                    </div>
                    <div className="text-sm text-white">{decision.title}</div>
                    <div className="text-xs text-white/40 mt-1">{decision.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="text-sm text-white/60 mb-2">This Week</div>
          <div className="text-2xl font-bold text-white mb-1">{moderatorStats.weeklyReviews}</div>
          <div className="text-xs text-white/50">Articles Reviewed</div>
          <div className="mt-4 text-xs text-green-400">+12% from last week</div>
        </div>
        
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="text-sm text-white/60 mb-2">Average Time</div>
          <div className="text-2xl font-bold text-white mb-1">{moderatorStats.avgResponseTime}m</div>
          <div className="text-xs text-white/50">Per Review</div>
          <div className="mt-4 text-xs text-blue-400">-8% improvement</div>
        </div>
        
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="text-sm text-white/60 mb-2">Quality Score</div>
          <div className="text-2xl font-bold text-white mb-1">{moderatorStats.qualityScore}/5</div>
          <div className="text-xs text-white/50">Moderator Rating</div>
          <div className="mt-4 text-xs text-yellow-400">⭐ Top Performer</div>
        </div>
      </div>
    </div>
  );

  const renderQueueSection = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Review Queue</h2>
        <p className="text-white/60">Review and moderate pending content submissions.</p>
      </div>
      
      <div className="space-y-4">
        {[
          { 
            title: 'Breaking: Major Tech Announcement', 
            content: 'A revolutionary breakthrough in quantum computing has been announced by leading researchers...',
            contributor: 'John Doe', 
            submitted: '5 min ago',
            priority: 'high',
            category: 'Technology',
            wordCount: 1250
          },
          { 
            title: 'Economic Policy Update Analysis', 
            content: 'The latest economic policy changes are expected to have significant impacts on...',
            contributor: 'Jane Smith', 
            submitted: '15 min ago',
            priority: 'medium',
            category: 'Economics',
            wordCount: 890
          },
          { 
            title: 'Climate Change Research Findings', 
            content: 'New research reveals concerning trends in global climate patterns that could...',
            contributor: 'Dr. Wilson', 
            submitted: '30 min ago',
            priority: 'medium',
            category: 'Environment',
            wordCount: 1450
          }
        ].map((item, index) => (
          <div key={index} className="glass-card rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    item.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    item.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {item.priority} priority
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-3 line-clamp-2">{item.content}</p>
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <span>By {item.contributor}</span>
                  <span>{item.submitted}</span>
                  <span>{item.category}</span>
                  <span>{item.wordCount} words</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="flex-1 px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-400 font-medium transition-colors">
                ✅ Approve
              </button>
              <button className="flex-1 px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-400 font-medium transition-colors">
                ❌ Reject
              </button>
              <button className="flex-1 px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-500/30 rounded-lg text-yellow-400 font-medium transition-colors">
                ⬆️ Escalate
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white font-medium transition-colors">
                👁️ Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFlaggedSection = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Flagged Content</h2>
        <p className="text-white/60">Review content that has been flagged by users or AI systems.</p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="glass-card rounded-xl border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-sm text-white/60 font-medium p-4">Content</th>
                <th className="text-left text-sm text-white/60 font-medium p-4">Reason</th>
                <th className="text-left text-sm text-white/60 font-medium p-4">Reporter</th>
                <th className="text-left text-sm text-white/60 font-medium p-4">Date</th>
                <th className="text-left text-sm text-white/60 font-medium p-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {[
                { 
                  content: 'Misleading Health Information', 
                  reason: 'Misinformation', 
                  reporter: 'User #1234',
                  date: '2 hours ago'
                },
                { 
                  content: 'Inappropriate Language Use', 
                  reason: 'Offensive Content', 
                  reporter: 'User #5678',
                  date: '4 hours ago'
                },
                { 
                  content: 'Unverified Source Claims', 
                  reason: 'Lack of Sources', 
                  reporter: 'User #9012',
                  date: '6 hours ago'
                },
              ].map((flag, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white font-medium">{flag.content}</td>
                  <td className="p-4">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">
                      {flag.reason}
                    </span>
                  </td>
                  <td className="p-4 text-white/70">{flag.reporter}</td>
                  <td className="p-4 text-white/70">{flag.date}</td>
                  <td className="p-4">
                    <button className="text-xs px-3 py-1 bg-primary hover:bg-primary/80 rounded transition-colors text-white">
                      Review
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderReportsSection = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">User Reports</h2>
        <p className="text-white/60">Handle user-submitted reports and complaints.</p>
      </div>
      
      <div className="grid gap-4">
        {[
          {
            type: 'Content Report',
            description: 'User reported suspicious article about vaccine misinformation',
            reporter: 'Anonymous User',
            priority: 'high',
            status: 'pending',
            submitted: '1 hour ago'
          },
          {
            type: 'User Behavior',
            description: 'Multiple users reported spam behavior from contributor account',
            reporter: 'Community',
            priority: 'medium',
            status: 'investigating',
            submitted: '3 hours ago'
          },
          {
            type: 'Technical Issue',
            description: 'User unable to submit verification request through mobile app',
            reporter: 'User #4567',
            priority: 'low',
            status: 'resolved',
            submitted: '1 day ago'
          }
        ].map((report, index) => (
          <div key={index} className="glass-card rounded-xl p-6 border border-white/10">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-bold text-white">{report.type}</h3>
                  <span className={`text-xs px-2 py-1 rounded ${
                    report.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    report.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {report.priority}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    report.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                    report.status === 'investigating' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-green-500/20 text-green-400'
                  }`}>
                    {report.status}
                  </span>
                </div>
                <p className="text-white/70 text-sm mb-2">{report.description}</p>
                <div className="flex items-center gap-4 text-xs text-white/60">
                  <span>Reported by: {report.reporter}</span>
                  <span>{report.submitted}</span>
                </div>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white text-sm font-medium transition-colors">
                🔍 Investigate
              </button>
              <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-400 text-sm font-medium transition-colors">
                ✅ Resolve
              </button>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/20 rounded-lg text-white text-sm font-medium transition-colors">
                💬 Contact User
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderHistorySection = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Moderation History</h2>
        <p className="text-white/60">View your past moderation decisions and actions.</p>
      </div>
      
      <div className="overflow-x-auto">
        <div className="glass-card rounded-xl border border-white/10">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-sm text-white/60 font-medium p-4">Content</th>
                <th className="text-left text-sm text-white/60 font-medium p-4">Action</th>
                <th className="text-left text-sm text-white/60 font-medium p-4">Reason</th>
                <th className="text-left text-sm text-white/60 font-medium p-4">Date</th>
                <th className="text-left text-sm text-white/60 font-medium p-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { content: 'Climate Summit Coverage', action: 'Approved', reason: 'Well-sourced content', date: '2 hours ago', status: 'Published' },
                { content: 'Technology Innovation Report', action: 'Approved', reason: 'Meets quality standards', date: '4 hours ago', status: 'Published' },
                { content: 'Unverified News Claim', action: 'Rejected', reason: 'Insufficient sources', date: '6 hours ago', status: 'Rejected' },
                { content: 'Political Analysis Article', action: 'Escalated', reason: 'Requires senior review', date: '1 day ago', status: 'Under Review' }
              ].map((item, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white font-medium">{item.content}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      item.action === 'Approved' ? 'bg-green-500/20 text-green-400' :
                      item.action === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.action}
                    </span>
                  </td>
                  <td className="p-4 text-white/70 text-sm">{item.reason}</td>
                  <td className="p-4 text-white/70">{item.date}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-sm ${
                      item.status === 'Published' ? 'bg-blue-500/20 text-blue-400' :
                      item.status === 'Rejected' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {item.status}
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

  const renderAIAgentsSection = () => (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">AI Moderation Assistant</h2>
        <p className="text-white/60">Use AI agents to assist with content moderation and quality control.</p>
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
              dashboard.isCurrent ? 'ring-2 ring-purple-500/50' : 'cursor-pointer'
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
                <div className="w-full py-2 bg-purple-500/20 text-purple-400 rounded-lg font-medium text-center text-sm">
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
      case 'queue':
        return renderQueueSection();
      case 'flagged':
        return renderFlaggedSection();
      case 'reports':
        return renderReportsSection();
      case 'history':
        return renderHistorySection();
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
              <div className="text-3xl">🛡️</div>
              <div>
                <h1 className="text-2xl font-bold text-white">Moderator Dashboard</h1>
                <p className="text-white/60 text-sm">Content moderation and quality control</p>
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
                {section.badge && (
                  <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {section.badge}
                  </span>
                )}
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