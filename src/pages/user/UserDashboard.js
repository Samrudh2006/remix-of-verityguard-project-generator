import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const navigation = [
  { path: '/dashboard/user', icon: '📊', label: 'Dashboard' },
  { path: '/dashboard/user/articles', icon: '📰', label: 'My Articles' },
  { path: '/dashboard/user/saved', icon: '💾', label: 'Saved Items' },
  { path: '/dashboard/user/history', icon: '📜', label: 'Reading History' },
  { path: '/dashboard/user/settings', icon: '⚙️', label: 'Settings' },
  { path: '/dashboard/user/profile', icon: '👤', label: 'Profile' },
];

export default function UserDashboard() {
  return (
    <DashboardLayout title="User Dashboard" navigation={navigation}>
      {/* Dashboard Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome Back!</h2>
        <p className="text-white/60">Stay informed with the latest verified news and articles.</p>
      </div>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Articles Read */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">📖</div>
            <div className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
              This Week
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">18</div>
          <div className="text-sm text-white/60">Articles Read</div>
        </div>
        
        {/* Saved Items */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">💾</div>
            <div className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
              Total
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">42</div>
          <div className="text-sm text-white/60">Saved Articles</div>
        </div>
        
        {/* Trust Level */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">🛡️</div>
            <div className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
              Active
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">High</div>
          <div className="text-sm text-white/60">Trust Level</div>
        </div>
        
        {/* Reading Streak */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">🔥</div>
            <div className="text-xs px-2 py-1 bg-orange-500/20 text-orange-400 rounded-full">
              Streak
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">7</div>
          <div className="text-sm text-white/60">Days Active</div>
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Articles */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Recommended for You</h3>
            <button className="text-sm text-primary hover:text-primary/80 transition-colors">
              View All
            </button>
          </div>
          <div className="space-y-3">
            {[
              { title: 'Breaking: New Climate Agreement Reached', category: 'Environment', time: '1 hour ago' },
              { title: 'Tech Giants Announce AI Safety Initiative', category: 'Technology', time: '3 hours ago' },
              { title: 'Global Markets Show Strong Recovery', category: 'Finance', time: '5 hours ago' },
            ].map((article, index) => (
              <div
                key={index}
                className="p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/30 transition-all cursor-pointer"
              >
                <div className="font-medium text-white mb-2">{article.title}</div>
                <div className="flex items-center justify-between text-xs text-white/60">
                  <span className="px-2 py-1 bg-primary/20 text-primary rounded">{article.category}</span>
                  <span>{article.time}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-4 py-3 bg-primary hover:bg-primary/80 rounded-lg text-white font-medium transition-colors">
            📰 Explore More Articles
          </button>
        </div>
        
        {/* Reading Activity */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Reading Activity</h3>
          <div className="space-y-4">
            {/* Simple bar chart representation */}
            {[
              { label: 'Mon', value: 3 },
              { label: 'Tue', value: 5 },
              { label: 'Wed', value: 2 },
              { label: 'Thu', value: 4 },
              { label: 'Fri', value: 6 },
              { label: 'Sat', value: 3 },
              { label: 'Sun', value: 4 },
            ].map((day, index) => (
              <div key={index} className="flex items-center gap-3">
                <div className="w-12 text-xs text-white/60">{day.label}</div>
                <div className="flex-1 h-8 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-blue-500 rounded-full flex items-center justify-end pr-2"
                    style={{ width: `${(day.value / 6) * 100}%` }}
                  >
                    <span className="text-xs text-white font-medium">{day.value}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-xs text-white/60 text-center">
            Articles read this week
          </div>
        </div>
      </div>
      
      {/* Saved Articles */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Recently Saved Articles</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-sm text-white/60 font-medium pb-3">Article</th>
                <th className="text-left text-sm text-white/60 font-medium pb-3">Category</th>
                <th className="text-left text-sm text-white/60 font-medium pb-3">Trust Score</th>
                <th className="text-left text-sm text-white/60 font-medium pb-3">Saved</th>
              </tr>
            </thead>
            <tbody>
              {[
                { title: 'Understanding Quantum Computing', category: 'Technology', score: 94, saved: '2 days ago' },
                { title: 'Climate Change Solutions', category: 'Environment', score: 91, saved: '4 days ago' },
                { title: 'Economic Policy Updates', category: 'Finance', score: 89, saved: '1 week ago' },
                { title: 'Healthcare Innovation Trends', category: 'Health', score: 92, saved: '1 week ago' },
              ].map((article, index) => (
                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="py-4 text-white font-medium">{article.title}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-primary/20 text-primary rounded text-sm">
                      {article.category}
                    </span>
                  </td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-sm">
                      {article.score}%
                    </span>
                  </td>
                  <td className="py-4 text-white/70">{article.saved}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
