import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserDashboard = () => {
  const { user, logout, isUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState('dark');
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  
  // Real-time stats with advanced metrics
  const [stats, setStats] = useState({
    trustScore: 85,
    trustTrend: '+5.2%',
    submissionsCount: 0,
    verificationsCount: 0,
    badgesEarned: 3,
    contributionPoints: 250,
    streakDays: 7,
    level: 5,
    nextLevelProgress: 65,
    reputation: 1250,
    accuracy: 92,
    totalViews: 3420,
    followers: 127,
    following: 89,
  });

  // Advanced filter and sort options
  const [filters, setFilters] = useState({
    dateRange: 'all',
    status: 'all',
    category: 'all',
    sortBy: 'recent',
  });

  // Gamification state
  const [achievements, setAchievements] = useState([
    { id: 1, name: 'First Submission', unlocked: true, points: 10 },
    { id: 2, name: 'Truth Seeker', unlocked: true, points: 25 },
    { id: 3, name: 'Week Streak', unlocked: true, points: 50 },
    { id: 4, name: 'Fact Master', unlocked: false, points: 100 },
    { id: 5, name: 'Community Hero', unlocked: false, points: 200 },
  ]);

  // Real submissions data
  const [submissions, setSubmissions] = useState([
    { 
      id: 1, 
      title: 'Climate Change Report Analysis', 
      url: 'https://example.com/climate',
      status: 'Verified', 
      category: 'Science',
      trustScore: 95,
      votes: 234,
      date: new Date().toISOString(),
      views: 1520,
      comments: 45,
    },
    { 
      id: 2, 
      title: 'Political Statement Verification', 
      url: 'https://example.com/politics',
      status: 'Under Review', 
      category: 'Politics',
      trustScore: 0,
      votes: 12,
      date: new Date(Date.now() - 86400000).toISOString(),
      views: 340,
      comments: 8,
    },
  ]);

  // Custom preferences
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    pushNotifications: false,
    weeklyDigest: true,
    showProfile: true,
    language: 'en',
    timezone: 'UTC',
    dataSharing: false,
  });

  useEffect(() => {
    if (!user || !isUser) {
      navigate('/');
    }
  }, [user, isUser, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const features = {
    overview: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-300">Dashboard Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Submissions" value={stats.submissionsCount} icon="📝" />
          <StatCard title="Verifications" value={stats.verificationsCount} icon="✓" />
          <StatCard title="Trust Score" value={`${stats.trustScore}%`} icon="🛡️" />
          <StatCard title="Badges" value={stats.badgesEarned} icon="🏆" />
        </div>
        <RecentActivity />
      </div>
    ),
    profile: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-300">Profile Settings</h2>
        <ProfileEditor user={user} />
      </div>
    ),
    submissions: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-300">My Submissions</h2>
        <SubmissionsList />
        <SubmissionForm />
      </div>
    ),
    verifications: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-300">Verification History</h2>
        <VerificationsList />
      </div>
    ),
    analytics: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-300">Analytics Dashboard</h2>
        <AnalyticsCharts />
      </div>
    ),
    notifications: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-300">Notifications</h2>
        <NotificationsList />
      </div>
    ),
    achievements: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-300">Achievements & Badges</h2>
        <AchievementsList />
      </div>
    ),
    leaderboard: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-300">Global Leaderboard</h2>
        <LeaderboardView />
      </div>
    ),
    history: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-300">Activity History</h2>
        <ActivityHistory />
      </div>
    ),
    settings: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-cyan-300">Settings</h2>
        <SettingsPanel />
      </div>
    ),
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'profile', name: 'Profile', icon: '👤' },
    { id: 'submissions', name: 'Submissions', icon: '📝' },
    { id: 'verifications', name: 'Verifications', icon: '✓' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'achievements', name: 'Achievements', icon: '🏆' },
    { id: 'leaderboard', name: 'Leaderboard', icon: '🥇' },
    { id: 'history', name: 'History', icon: '📜' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b border-cyan-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-cyan-300">User Dashboard</h1>
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
            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-cyan-500/30 p-4 sticky top-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeTab === tab.id
                        ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/50'
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
            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-cyan-500/30 p-6">
              {features[activeTab]()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Component: StatCard
const StatCard = ({ title, value, icon }) => (
  <div className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl p-6 border border-cyan-500/30">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-3xl font-bold text-cyan-300 mt-2">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
);

// Component: Recent Activity
const RecentActivity = () => {
  const activities = [
    { id: 1, type: 'submission', text: 'Submitted news verification request', time: '2 hours ago' },
    { id: 2, type: 'badge', text: 'Earned "Truth Seeker" badge', time: '1 day ago' },
    { id: 3, type: 'verification', text: 'Verified article "Climate Change Update"', time: '2 days ago' },
  ];

  return (
    <div className="bg-black/20 rounded-xl p-6 border border-cyan-500/20">
      <h3 className="text-xl font-bold text-cyan-300 mb-4">Recent Activity</h3>
      <div className="space-y-3">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
            <div className="flex-1">
              <p className="text-gray-200">{activity.text}</p>
              <p className="text-gray-500 text-sm">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component: Profile Editor
const ProfileEditor = ({ user }) => {
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    bio: '',
    location: '',
    website: '',
  });

  return (
    <div className="bg-black/20 rounded-xl p-6 border border-cyan-500/20">
      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Full Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            className="w-full px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white h-24"
          />
        </div>
        <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors">
          Save Changes
        </button>
      </div>
    </div>
  );
};

// Component: Submissions List
const SubmissionsList = () => {
  const submissions = [
    { id: 1, title: 'Breaking: New Policy Announcement', status: 'Verified', date: '2024-10-19' },
    { id: 2, title: 'Local Event Coverage', status: 'Pending', date: '2024-10-18' },
    { id: 3, title: 'Health Advisory Update', status: 'Rejected', date: '2024-10-17' },
  ];

  return (
    <div className="bg-black/20 rounded-xl p-6 border border-cyan-500/20">
      <div className="space-y-3">
        {submissions.map((sub) => (
          <div key={sub.id} className="p-4 bg-white/5 rounded-lg">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="text-cyan-300 font-semibold">{sub.title}</h4>
                <p className="text-gray-500 text-sm">{sub.date}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                sub.status === 'Verified' ? 'bg-green-500/20 text-green-300' :
                sub.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-red-500/20 text-red-300'
              }`}>
                {sub.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component: Submission Form
const SubmissionForm = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-cyan-500/20">
    <h3 className="text-xl font-bold text-cyan-300 mb-4">Submit New Verification Request</h3>
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Article Title"
        className="w-full px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white"
      />
      <input
        type="url"
        placeholder="Article URL"
        className="w-full px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white"
      />
      <textarea
        placeholder="Additional Notes"
        className="w-full px-4 py-2 bg-white/5 border border-cyan-500/30 rounded-lg text-white h-24"
      />
      <button className="px-6 py-2 bg-cyan-500 hover:bg-cyan-600 rounded-lg transition-colors">
        Submit Request
      </button>
    </div>
  </div>
);

// Component: Verifications List
const VerificationsList = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-cyan-500/20">
    <p className="text-gray-400">Your verification history will appear here.</p>
  </div>
);

// Component: Analytics Charts
const AnalyticsCharts = () => (
  <div className="space-y-6">
    <div className="bg-black/20 rounded-xl p-6 border border-cyan-500/20">
      <h3 className="text-xl font-bold text-cyan-300 mb-4">Activity Overview</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-3xl font-bold text-cyan-300">24</p>
          <p className="text-gray-400">This Week</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-purple-300">102</p>
          <p className="text-gray-400">This Month</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-green-300">450</p>
          <p className="text-gray-400">All Time</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-bold text-yellow-300">85%</p>
          <p className="text-gray-400">Success Rate</p>
        </div>
      </div>
    </div>
  </div>
);

// Component: Notifications List
const NotificationsList = () => {
  const notifications = [
    { id: 1, text: 'Your submission was verified', time: '5 min ago', read: false },
    { id: 2, text: 'New badge earned!', time: '1 hour ago', read: false },
    { id: 3, text: 'Weekly report available', time: '1 day ago', read: true },
  ];

  return (
    <div className="bg-black/20 rounded-xl p-6 border border-cyan-500/20">
      <div className="space-y-3">
        {notifications.map((notif) => (
          <div key={notif.id} className={`p-4 rounded-lg ${notif.read ? 'bg-white/5' : 'bg-cyan-500/10'}`}>
            <p className="text-gray-200">{notif.text}</p>
            <p className="text-gray-500 text-sm">{notif.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

// Component: Achievements List
const AchievementsList = () => (
  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
    {['Truth Seeker', 'Fact Checker', 'Community Hero', 'Vigilant', 'Reliable Source', 'Expert Verifier'].map((badge, idx) => (
      <div key={idx} className="bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-xl p-6 border border-cyan-500/30 text-center">
        <div className="text-4xl mb-2">🏆</div>
        <h4 className="text-cyan-300 font-bold">{badge}</h4>
      </div>
    ))}
  </div>
);

// Component: Leaderboard View
const LeaderboardView = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-cyan-500/20">
    <div className="space-y-3">
      {[1, 2, 3, 4, 5].map((rank) => (
        <div key={rank} className="flex items-center gap-4 p-4 bg-white/5 rounded-lg">
          <span className="text-2xl font-bold text-cyan-300">#{rank}</span>
          <div className="flex-1">
            <p className="text-gray-200 font-semibold">User {rank}</p>
            <p className="text-gray-500 text-sm">{1000 - rank * 100} points</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Component: Activity History
const ActivityHistory = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-cyan-500/20">
    <p className="text-gray-400">Detailed activity history will appear here.</p>
  </div>
);

// Component: Settings Panel
const SettingsPanel = () => (
  <div className="space-y-6">
    <div className="bg-black/20 rounded-xl p-6 border border-cyan-500/20">
      <h3 className="text-xl font-bold text-cyan-300 mb-4">Privacy Settings</h3>
      <div className="space-y-3">
        <label className="flex items-center gap-3">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-gray-300">Show profile publicly</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-gray-300">Email notifications</span>
        </label>
        <label className="flex items-center gap-3">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-gray-300">Weekly reports</span>
        </label>
      </div>
    </div>
  </div>
);

export default UserDashboard;
