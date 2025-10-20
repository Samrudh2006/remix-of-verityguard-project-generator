import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const navigation = [
  { path: '/contributor/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/contributor/create', icon: '✍️', label: 'Create Content' },
  { path: '/contributor/drafts', icon: '📝', label: 'Drafts', badge: 3 },
  { path: '/contributor/published', icon: '📄', label: 'Published' },
  { path: '/contributor/analytics', icon: '📈', label: 'Analytics' },
  { path: '/contributor/media', icon: '🖼️', label: 'Media Library' },
  { path: '/contributor/profile', icon: '👤', label: 'Profile' },
];

export default function ContributorDashboard() {
  return (
    <DashboardLayout title="Contributor Dashboard" navigation={navigation}>
      {/* Dashboard Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Content Creator Hub</h2>
        <p className="text-white/60">Manage your articles, drafts, and track performance.</p>
      </div>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Published Articles */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">📄</div>
            <div className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
              This Month
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">24</div>
          <div className="text-sm text-white/60">Published Articles</div>
        </div>
        
        {/* Total Views */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">👁️</div>
            <div className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
              +15%
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">12.4K</div>
          <div className="text-sm text-white/60">Total Views</div>
        </div>
        
        {/* Avg Trust Score */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">⭐</div>
            <div className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
              Excellent
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">92%</div>
          <div className="text-sm text-white/60">Avg Trust Score</div>
        </div>
        
        {/* Drafts */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">📝</div>
            <div className="text-xs px-2 py-1 bg-purple-500/20 text-purple-400 rounded-full">
              In Progress
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">3</div>
          <div className="text-sm text-white/60">Active Drafts</div>
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Drafts */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Recent Drafts</h3>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Understanding Climate Change Effects', updated: '2 hours ago', words: 1240 },
              { title: 'Tech Innovation in 2025', updated: '1 day ago', words: 850 },
              { title: 'Economic Trends Analysis', updated: '2 days ago', words: 2100 },
            ].map((draft, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="font-medium text-white mb-2">{draft.title}</div>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>Updated {draft.updated}</span>
                  <span>{draft.words} words</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 bg-primary hover:bg-primary/80 rounded-lg text-white font-medium transition-colors">
            ✍️ Create New Article
          </button>
        </div>
        
        {/* Performance Chart */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Performance Overview</h3>
          <div className="space-y-4">
            {/* Simple bar chart representation */}
            {[
              { label: 'Mon', value: 85 },
              { label: 'Tue', value: 120 },
              { label: 'Wed', value: 95 },
              { label: 'Thu', value: 140 },
              { label: 'Fri', value: 160 },
              { label: 'Sat', value: 110 },
              { label: 'Sun', value: 90 },
            ].map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 text-xs text-white/60">{day.label}</div>
                <div className="flex-1 h-8 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(day.value / 160) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">{day.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-white/60 text-center">
            Article views over the past week
          </div>
        </div>
      </div>
      
      {/* Top Performing Articles */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Top Performing Articles</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-sm text-white/60 font-medium pb-3">Article</th>
                <th className="text-left text-sm text-white/60 font-medium pb-3">Views</th>
                <th className="text-left text-sm text-white/60 font-medium pb-3">Trust Score</th>
                <th className="text-left text-sm text-white/60 font-medium pb-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'AI Revolution in Healthcare', views: '2.4K', score: 95, status: 'Published' },
                { title: 'Sustainable Energy Solutions', views: '1.8K', score: 92, status: 'Published' },
                { title: 'Digital Privacy in 2025', views: '1.6K', score: 88, status: 'Published' },
                { title: 'Global Economic Outlook', views: '1.2K', score: 90, status: 'Published' },
              ].map((article, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white font-medium">{article.title}</td>
                  <td className="py-4 text-white/70">{article.views}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                      {article.score}%
                    </span>
                  </td>
                  <td className="py-4">
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
    </DashboardLayout>
  );
}
