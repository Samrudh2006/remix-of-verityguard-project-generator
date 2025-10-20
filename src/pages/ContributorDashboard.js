import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ContributorDashboard = () => {
  const { user, logout, isContributor } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats] = useState({
    articlesPublished: 0,
    pendingReviews: 0,
    totalViews: 0,
    verificationRate: 0,
    contributionScore: 450,
  });

  useEffect(() => {
    if (!user || !isContributor) {
      navigate('/');
    }
  }, [user, isContributor, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const features = {
    overview: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-green-300">Contributor Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Articles Published" value={stats.articlesPublished} icon="📰" color="green" />
          <StatCard title="Pending Reviews" value={stats.pendingReviews} icon="⏳" color="yellow" />
          <StatCard title="Total Views" value={stats.totalViews} icon="👁️" color="blue" />
          <StatCard title="Verification Rate" value={`${stats.verificationRate}%`} icon="✓" color="cyan" />
        </div>
        <ContributorActivity />
      </div>
    ),
    articles: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-green-300">Article Management</h2>
        <ArticleEditor />
        <ArticlesList />
      </div>
    ),
    verification: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-green-300">Verification Tools</h2>
        <VerificationTools />
        <FactCheckQueue />
      </div>
    ),
    analytics: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-green-300">Content Analytics</h2>
        <ContentAnalytics />
      </div>
    ),
    community: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-green-300">Community Engagement</h2>
        <CommunityFeed />
      </div>
    ),
    sources: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-green-300">Source Management</h2>
        <SourcesLibrary />
      </div>
    ),
    collaboration: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-green-300">Collaboration Hub</h2>
        <CollaborationSpace />
      </div>
    ),
    research: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-green-300">Research Tools</h2>
        <ResearchPanel />
      </div>
    ),
    reviews: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-green-300">Peer Reviews</h2>
        <PeerReviews />
      </div>
    ),
    settings: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-green-300">Contributor Settings</h2>
        <ContributorSettings />
      </div>
    ),
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'articles', name: 'Articles', icon: '📰' },
    { id: 'verification', name: 'Verification', icon: '✓' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'community', name: 'Community', icon: '👥' },
    { id: 'sources', name: 'Sources', icon: '📚' },
    { id: 'collaboration', name: 'Collaboration', icon: '🤝' },
    { id: 'research', name: 'Research', icon: '🔬' },
    { id: 'reviews', name: 'Peer Reviews', icon: '👓' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-green-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b border-green-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-green-300">Contributor Dashboard</h1>
              <p className="text-gray-400">Welcome back, {user?.name}!</p>
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3">
            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-4 sticky top-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeTab === tab.id
                        ? 'bg-green-500/20 text-green-300 border border-green-500/50'
                        : 'hover:bg-white/5 text-gray-300'
                    }`}
                  >
                    <span className="text-xl">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-9">
            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-green-500/30 p-6">
              {features[activeTab]()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component: StatCard
const StatCard = ({ title, value, icon, color }) => (
  <div className={`bg-gradient-to-br from-${color}-500/10 to-${color}-500/5 rounded-xl p-6 border border-${color}-500/30`}>
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className={`text-3xl font-bold text-${color}-300 mt-2`}>{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
);

// Component: Contributor Activity
const ContributorActivity = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-green-500/20">
    <h3 className="text-xl font-bold text-green-300 mb-4">Recent Activity</h3>
    <div className="space-y-3">
      {[
        { text: 'Published article "Climate Action Report"', time: '1 hour ago' },
        { text: 'Verified 5 fact-check requests', time: '3 hours ago' },
        { text: 'Collaborated on investigation project', time: '1 day ago' },
      ].map((activity, idx) => (
        <div key={idx} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <div className="flex-1">
            <p className="text-gray-200">{activity.text}</p>
            <p className="text-gray-500 text-sm">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Component: Article Editor
const ArticleEditor = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-green-500/20">
    <h3 className="text-xl font-bold text-green-300 mb-4">Create New Article</h3>
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Article Title"
        className="w-full px-4 py-2 bg-white/5 border border-green-500/30 rounded-lg text-white"
      />
      <select className="w-full px-4 py-2 bg-white/5 border border-green-500/30 rounded-lg text-white">
        <option>Select Category</option>
        <option>Politics</option>
        <option>Health</option>
        <option>Technology</option>
        <option>Environment</option>
      </select>
      <textarea
        placeholder="Article Content (Markdown supported)"
        className="w-full px-4 py-2 bg-white/5 border border-green-500/30 rounded-lg text-white h-48"
      />
      <div className="flex gap-3">
        <button className="px-6 py-2 bg-green-500 hover:bg-green-600 rounded-lg transition-colors">
          Publish
        </button>
        <button className="px-6 py-2 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors">
          Save Draft
        </button>
      </div>
    </div>
  </div>
);

// Component: Articles List
const ArticlesList = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-green-500/20">
    <h3 className="text-xl font-bold text-green-300 mb-4">My Articles</h3>
    <div className="space-y-3">
      {[
        { title: 'Climate Action Report', status: 'Published', views: 1250 },
        { title: 'Tech Innovation Update', status: 'Draft', views: 0 },
        { title: 'Health Advisory', status: 'Under Review', views: 320 },
      ].map((article, idx) => (
        <div key={idx} className="p-4 bg-white/5 rounded-lg flex justify-between items-center">
          <div>
            <h4 className="text-green-300 font-semibold">{article.title}</h4>
            <p className="text-gray-500 text-sm">{article.views} views</p>
          </div>
          <span className={`px-3 py-1 rounded-full text-sm ${
            article.status === 'Published' ? 'bg-green-500/20 text-green-300' :
            article.status === 'Draft' ? 'bg-gray-500/20 text-gray-300' :
            'bg-yellow-500/20 text-yellow-300'
          }`}>
            {article.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Component: Verification Tools
const VerificationTools = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-green-500/20">
    <h3 className="text-xl font-bold text-green-300 mb-4">Fact-Check Tools</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
        <h4 className="text-green-300 font-semibold mb-2">Source Validator</h4>
        <p className="text-gray-400 text-sm mb-3">Check source credibility and history</p>
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm">
          Launch Tool
        </button>
      </div>
      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
        <h4 className="text-green-300 font-semibold mb-2">Image Analyzer</h4>
        <p className="text-gray-400 text-sm mb-3">Detect manipulated images</p>
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm">
          Launch Tool
        </button>
      </div>
      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
        <h4 className="text-green-300 font-semibold mb-2">Text Comparison</h4>
        <p className="text-gray-400 text-sm mb-3">Compare multiple sources</p>
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm">
          Launch Tool
        </button>
      </div>
      <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/30">
        <h4 className="text-green-300 font-semibold mb-2">Citation Checker</h4>
        <p className="text-gray-400 text-sm mb-3">Verify citations and references</p>
        <button className="px-4 py-2 bg-green-500 hover:bg-green-600 rounded-lg text-sm">
          Launch Tool
        </button>
      </div>
    </div>
  </div>
);

// Component: Fact Check Queue
const FactCheckQueue = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-green-500/20">
    <h3 className="text-xl font-bold text-green-300 mb-4">Pending Fact Checks</h3>
    <p className="text-gray-400">Review queue will appear here.</p>
  </div>
);

// Component: Content Analytics
const ContentAnalytics = () => (
  <div className="space-y-6">
    <div className="bg-black/20 rounded-xl p-6 border border-green-500/20">
      <h3 className="text-xl font-bold text-green-300 mb-4">Performance Metrics</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-green-300">2.5K</p>
          <p className="text-gray-400">Total Reads</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-blue-300">320</p>
          <p className="text-gray-400">Shares</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-300">4.5</p>
          <p className="text-gray-400">Avg Rating</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-yellow-300">92%</p>
          <p className="text-gray-400">Trust Score</p>
        </div>
      </div>
    </div>
  </div>
);

// Component: Community Feed
const CommunityFeed = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-green-500/20">
    <h3 className="text-xl font-bold text-green-300 mb-4">Community Updates</h3>
    <p className="text-gray-400">Community feed will appear here.</p>
  </div>
);

// Component: Sources Library
const SourcesLibrary = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-green-500/20">
    <h3 className="text-xl font-bold text-green-300 mb-4">Trusted Sources</h3>
    <p className="text-gray-400">Source library management will appear here.</p>
  </div>
);

// Component: Collaboration Space
const CollaborationSpace = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-green-500/20">
    <h3 className="text-xl font-bold text-green-300 mb-4">Active Collaborations</h3>
    <p className="text-gray-400">Collaboration projects will appear here.</p>
  </div>
);

// Component: Research Panel
const ResearchPanel = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-green-500/20">
    <h3 className="text-xl font-bold text-green-300 mb-4">Research Resources</h3>
    <p className="text-gray-400">Research tools and databases will appear here.</p>
  </div>
);

// Component: Peer Reviews
const PeerReviews = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-green-500/20">
    <h3 className="text-xl font-bold text-green-300 mb-4">Peer Review Queue</h3>
    <p className="text-gray-400">Articles awaiting your review will appear here.</p>
  </div>
);

// Component: Contributor Settings
const ContributorSettings = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-green-500/20">
    <h3 className="text-xl font-bold text-green-300 mb-4">Contributor Preferences</h3>
    <div className="space-y-3">
      <label className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4" defaultChecked />
        <span className="text-gray-300">Enable collaboration requests</span>
      </label>
      <label className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4" defaultChecked />
        <span className="text-gray-300">Fact-check notifications</span>
      </label>
      <label className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4" />
        <span className="text-gray-300">Anonymous publishing</span>
      </label>
    </div>
  </div>
);

export default ContributorDashboard;
