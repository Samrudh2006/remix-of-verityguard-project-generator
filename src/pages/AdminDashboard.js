import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user, logout, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [stats] = useState({
    totalUsers: 0,
    totalArticles: 0,
    pendingModeration: 0,
    systemHealth: 98,
    activeContributors: 0,
  });

  useEffect(() => {
    if (!user || !isAdmin) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const features = {
    overview: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">Admin Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <StatCard title="Total Users" value={stats.totalUsers} icon="👥" color="purple" />
          <StatCard title="Articles" value={stats.totalArticles} icon="📰" color="blue" />
          <StatCard title="Pending Moderation" value={stats.pendingModeration} icon="⏳" color="yellow" />
          <StatCard title="System Health" value={`${stats.systemHealth}%`} icon="💚" color="green" />
          <StatCard title="Active Contributors" value={stats.activeContributors} icon="✍️" color="cyan" />
        </div>
        <SystemOverview />
      </div>
    ),
    users: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">User Management</h2>
        <UserManagement />
      </div>
    ),
    content: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">Content Moderation</h2>
        <ContentModeration />
      </div>
    ),
    analytics: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">Platform Analytics</h2>
        <PlatformAnalytics />
      </div>
    ),
    monitoring: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">System Monitoring</h2>
        <SystemMonitoring />
      </div>
    ),
    security: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">Security Center</h2>
        <SecurityCenter />
      </div>
    ),
    reports: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">Reports & Logs</h2>
        <ReportsLogs />
      </div>
    ),
    configuration: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">System Configuration</h2>
        <SystemConfiguration />
      </div>
    ),
    backup: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">Backup & Recovery</h2>
        <BackupRecovery />
      </div>
    ),
    settings: () => (
      <div className="space-y-6">
        <h2 className="text-3xl font-bold text-purple-300">Admin Settings</h2>
        <AdminSettings />
      </div>
    ),
  };

  const tabs = [
    { id: 'overview', name: 'Overview', icon: '📊' },
    { id: 'users', name: 'Users', icon: '👥' },
    { id: 'content', name: 'Content', icon: '📝' },
    { id: 'analytics', name: 'Analytics', icon: '📈' },
    { id: 'monitoring', name: 'Monitoring', icon: '🖥️' },
    { id: 'security', name: 'Security', icon: '🔒' },
    { id: 'reports', name: 'Reports', icon: '📋' },
    { id: 'configuration', name: 'Configuration', icon: '🔧' },
    { id: 'backup', name: 'Backup', icon: '💾' },
    { id: 'settings', name: 'Settings', icon: '⚙️' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-xl border-b border-purple-500/30">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-purple-300">Admin Dashboard</h1>
              <p className="text-gray-400">System Administrator - {user?.name}</p>
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
            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-purple-500/30 p-4 sticky top-4">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all flex items-center gap-3 ${
                      activeTab === tab.id
                        ? 'bg-purple-500/20 text-purple-300 border border-purple-500/50'
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
            <div className="bg-black/40 backdrop-blur-xl rounded-xl border border-purple-500/30 p-6">
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
  <div className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 rounded-xl p-6 border border-purple-500/30">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-400 text-sm">{title}</p>
        <p className="text-3xl font-bold text-purple-300 mt-2">{value}</p>
      </div>
      <div className="text-4xl">{icon}</div>
    </div>
  </div>
);

// Component: System Overview
const SystemOverview = () => (
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
    <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
      <h3 className="text-xl font-bold text-purple-300 mb-4">Recent System Activity</h3>
      <div className="space-y-3">
        {[
          { text: 'New user registration: john@example.com', time: '2 min ago', type: 'user' },
          { text: 'Article approved: Climate Report 2024', time: '15 min ago', type: 'content' },
          { text: 'Security alert: Failed login attempts detected', time: '1 hour ago', type: 'security' },
          { text: 'System backup completed successfully', time: '2 hours ago', type: 'system' },
        ].map((activity, idx) => (
          <div key={idx} className="flex items-center gap-4 p-3 bg-white/5 rounded-lg">
            <div className={`w-2 h-2 rounded-full ${
              activity.type === 'security' ? 'bg-red-400' :
              activity.type === 'user' ? 'bg-blue-400' :
              activity.type === 'content' ? 'bg-green-400' :
              'bg-purple-400'
            }`}></div>
            <div className="flex-1">
              <p className="text-gray-200">{activity.text}</p>
              <p className="text-gray-500 text-sm">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
      <h3 className="text-xl font-bold text-purple-300 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        <button className="p-4 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg border border-purple-500/30 transition-colors">
          <div className="text-2xl mb-2">👤</div>
          <p className="text-sm text-gray-300">Add User</p>
        </button>
        <button className="p-4 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg border border-purple-500/30 transition-colors">
          <div className="text-2xl mb-2">🔒</div>
          <p className="text-sm text-gray-300">Security Scan</p>
        </button>
        <button className="p-4 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg border border-purple-500/30 transition-colors">
          <div className="text-2xl mb-2">💾</div>
          <p className="text-sm text-gray-300">Backup Now</p>
        </button>
        <button className="p-4 bg-purple-500/10 hover:bg-purple-500/20 rounded-lg border border-purple-500/30 transition-colors">
          <div className="text-2xl mb-2">📊</div>
          <p className="text-sm text-gray-300">Generate Report</p>
        </button>
      </div>
    </div>
  </div>
);

// Component: User Management
const UserManagement = () => (
  <div className="space-y-6">
    <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold text-purple-300">User List</h3>
        <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg transition-colors">
          Add New User
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-purple-500/20">
              <th className="text-left py-3 px-4 text-gray-400">User</th>
              <th className="text-left py-3 px-4 text-gray-400">Role</th>
              <th className="text-left py-3 px-4 text-gray-400">Status</th>
              <th className="text-left py-3 px-4 text-gray-400">Joined</th>
              <th className="text-left py-3 px-4 text-gray-400">Actions</th>
            </tr>
          </thead>
          <tbody>
            {[
              { name: 'John Doe', email: 'john@example.com', role: 'User', status: 'Active', joined: '2024-10-15' },
              { name: 'Jane Smith', email: 'jane@example.com', role: 'Contributor', status: 'Active', joined: '2024-10-10' },
              { name: 'Bob Wilson', email: 'bob@example.com', role: 'User', status: 'Suspended', joined: '2024-10-05' },
            ].map((user, idx) => (
              <tr key={idx} className="border-b border-white/5 hover:bg-white/5">
                <td className="py-3 px-4">
                  <div>
                    <p className="text-gray-200">{user.name}</p>
                    <p className="text-gray-500 text-sm">{user.email}</p>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-300">{user.role}</td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    user.status === 'Active' ? 'bg-green-500/20 text-green-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {user.status}
                  </span>
                </td>
                <td className="py-3 px-4 text-gray-400">{user.joined}</td>
                <td className="py-3 px-4">
                  <button className="text-purple-300 hover:text-purple-400">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
        <h4 className="text-purple-300 font-semibold mb-2">Role Distribution</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Users</span>
            <span className="text-purple-300">245</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Contributors</span>
            <span className="text-purple-300">45</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Admins</span>
            <span className="text-purple-300">5</span>
          </div>
        </div>
      </div>

      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
        <h4 className="text-purple-300 font-semibold mb-2">User Activity</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Active Today</span>
            <span className="text-green-300">127</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">This Week</span>
            <span className="text-blue-300">198</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total</span>
            <span className="text-purple-300">295</span>
          </div>
        </div>
      </div>

      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
        <h4 className="text-purple-300 font-semibold mb-2">New Registrations</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Today</span>
            <span className="text-green-300">12</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">This Week</span>
            <span className="text-blue-300">47</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">This Month</span>
            <span className="text-purple-300">184</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Component: Content Moderation
const ContentModeration = () => (
  <div className="space-y-6">
    <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
      <h3 className="text-xl font-bold text-purple-300 mb-4">Pending Moderation Queue</h3>
      <div className="space-y-3">
        {[
          { title: 'Breaking News: Tech Innovation', author: 'Jane Smith', submitted: '10 min ago', type: 'Article' },
          { title: 'User Report: Suspicious Content', author: 'System', submitted: '25 min ago', type: 'Report' },
          { title: 'Comment Review Required', author: 'John Doe', submitted: '1 hour ago', type: 'Comment' },
        ].map((item, idx) => (
          <div key={idx} className="p-4 bg-white/5 rounded-lg">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-purple-300 font-semibold">{item.title}</h4>
                <p className="text-gray-500 text-sm">By {item.author} • {item.submitted}</p>
              </div>
              <span className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs">
                {item.type}
              </span>
            </div>
            <div className="flex gap-2 mt-3">
              <button className="px-4 py-1 bg-green-500 hover:bg-green-600 rounded text-sm">
                Approve
              </button>
              <button className="px-4 py-1 bg-red-500 hover:bg-red-600 rounded text-sm">
                Reject
              </button>
              <button className="px-4 py-1 bg-gray-600 hover:bg-gray-700 rounded text-sm">
                Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20 text-center">
        <p className="text-3xl font-bold text-yellow-300">23</p>
        <p className="text-gray-400 mt-2">Pending Review</p>
      </div>
      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20 text-center">
        <p className="text-3xl font-bold text-green-300">156</p>
        <p className="text-gray-400 mt-2">Approved Today</p>
      </div>
      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20 text-center">
        <p className="text-3xl font-bold text-red-300">12</p>
        <p className="text-gray-400 mt-2">Rejected Today</p>
      </div>
      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20 text-center">
        <p className="text-3xl font-bold text-purple-300">94%</p>
        <p className="text-gray-400 mt-2">Approval Rate</p>
      </div>
    </div>
  </div>
);

// Component: Platform Analytics
const PlatformAnalytics = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
        <h4 className="text-purple-300 font-semibold mb-4">Traffic Overview</h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-400 text-sm">Page Views</span>
              <span className="text-purple-300">12.5K</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-400 text-sm">Unique Visitors</span>
              <span className="text-blue-300">8.2K</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '65%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-400 text-sm">Bounce Rate</span>
              <span className="text-green-300">23%</span>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '23%' }}></div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
        <h4 className="text-purple-300 font-semibold mb-4">Content Stats</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Total Articles</span>
            <span className="text-purple-300">1,247</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Published Today</span>
            <span className="text-green-300">23</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Comments</span>
            <span className="text-blue-300">5,632</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Avg. Rating</span>
            <span className="text-yellow-300">4.5/5</span>
          </div>
        </div>
      </div>

      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
        <h4 className="text-purple-300 font-semibold mb-4">Engagement</h4>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-400">Total Shares</span>
            <span className="text-purple-300">3,421</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Likes</span>
            <span className="text-pink-300">12,456</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Comments</span>
            <span className="text-blue-300">2,876</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Avg. Time</span>
            <span className="text-cyan-300">3m 45s</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Component: System Monitoring
const SystemMonitoring = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
        <h4 className="text-gray-400 text-sm mb-2">CPU Usage</h4>
        <p className="text-3xl font-bold text-green-300">42%</p>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '42%' }}></div>
        </div>
      </div>
      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
        <h4 className="text-gray-400 text-sm mb-2">Memory</h4>
        <p className="text-3xl font-bold text-blue-300">68%</p>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
        </div>
      </div>
      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
        <h4 className="text-gray-400 text-sm mb-2">Disk Space</h4>
        <p className="text-3xl font-bold text-yellow-300">55%</p>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '55%' }}></div>
        </div>
      </div>
      <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
        <h4 className="text-gray-400 text-sm mb-2">Bandwidth</h4>
        <p className="text-3xl font-bold text-purple-300">34%</p>
        <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '34%' }}></div>
        </div>
      </div>
    </div>

    <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
      <h3 className="text-xl font-bold text-purple-300 mb-4">Service Status</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {[
          { name: 'Web Server', status: 'Operational', uptime: '99.9%' },
          { name: 'Database', status: 'Operational', uptime: '99.8%' },
          { name: 'API Service', status: 'Operational', uptime: '100%' },
          { name: 'Email Service', status: 'Degraded', uptime: '97.5%' },
        ].map((service, idx) => (
          <div key={idx} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
            <div>
              <p className="text-gray-200 font-semibold">{service.name}</p>
              <p className="text-gray-500 text-sm">Uptime: {service.uptime}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-xs ${
              service.status === 'Operational' ? 'bg-green-500/20 text-green-300' : 'bg-yellow-500/20 text-yellow-300'
            }`}>
              {service.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Component: Security Center
const SecurityCenter = () => (
  <div className="space-y-6">
    <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
      <h3 className="text-xl font-bold text-purple-300 mb-4">Security Alerts</h3>
      <div className="space-y-3">
        {[
          { severity: 'high', message: '15 failed login attempts detected', time: '5 min ago' },
          { severity: 'medium', message: 'Unusual traffic pattern from IP 192.168.1.1', time: '1 hour ago' },
          { severity: 'low', message: 'SSL certificate renewal due in 30 days', time: '2 hours ago' },
        ].map((alert, idx) => (
          <div key={idx} className={`p-4 rounded-lg border ${
            alert.severity === 'high' ? 'bg-red-500/10 border-red-500/30' :
            alert.severity === 'medium' ? 'bg-yellow-500/10 border-yellow-500/30' :
            'bg-blue-500/10 border-blue-500/30'
          }`}>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-gray-200">{alert.message}</p>
                <p className="text-gray-500 text-sm mt-1">{alert.time}</p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs ${
                alert.severity === 'high' ? 'bg-red-500/20 text-red-300' :
                alert.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-300' :
                'bg-blue-500/20 text-blue-300'
              }`}>
                {alert.severity.toUpperCase()}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Component: Reports & Logs
const ReportsLogs = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
    <h3 className="text-xl font-bold text-purple-300 mb-4">System Logs</h3>
    <p className="text-gray-400">Recent system logs and reports will appear here.</p>
  </div>
);

// Component: System Configuration
const SystemConfiguration = () => (
  <div className="space-y-6">
    <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
      <h3 className="text-xl font-bold text-purple-300 mb-4">General Settings</h3>
      <div className="space-y-4">
        <div>
          <label className="block text-gray-300 mb-2">Site Name</label>
          <input
            type="text"
            defaultValue="VerityGuard"
            className="w-full px-4 py-2 bg-white/5 border border-purple-500/30 rounded-lg text-white"
          />
        </div>
        <div>
          <label className="block text-gray-300 mb-2">Maintenance Mode</label>
          <label className="flex items-center gap-3">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-gray-400">Enable maintenance mode</span>
          </label>
        </div>
      </div>
    </div>
  </div>
);

// Component: Backup & Recovery
const BackupRecovery = () => (
  <div className="space-y-6">
    <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
      <h3 className="text-xl font-bold text-purple-300 mb-4">Backup Management</h3>
      <div className="space-y-3">
        <div className="flex justify-between items-center p-4 bg-white/5 rounded-lg">
          <div>
            <p className="text-gray-200 font-semibold">Daily Backup</p>
            <p className="text-gray-500 text-sm">Last: Today at 2:00 AM</p>
          </div>
          <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg">
            Restore
          </button>
        </div>
      </div>
    </div>
  </div>
);

// Component: Admin Settings
const AdminSettings = () => (
  <div className="bg-black/20 rounded-xl p-6 border border-purple-500/20">
    <h3 className="text-xl font-bold text-purple-300 mb-4">Admin Preferences</h3>
    <div className="space-y-3">
      <label className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4" defaultChecked />
        <span className="text-gray-300">Email notifications for critical alerts</span>
      </label>
      <label className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4" defaultChecked />
        <span className="text-gray-300">Two-factor authentication</span>
      </label>
      <label className="flex items-center gap-3">
        <input type="checkbox" className="w-4 h-4" />
        <span className="text-gray-300">Dark mode</span>
      </label>
    </div>
  </div>
);

export default AdminDashboard;
