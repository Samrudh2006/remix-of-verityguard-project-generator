import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const navigation = [
  { path: '/moderator/dashboard', icon: '📊', label: 'Dashboard' },
  { path: '/moderator/queue', icon: '⏳', label: 'Review Queue', badge: 42 },
  { path: '/moderator/flagged', icon: '🚩', label: 'Flagged Content', badge: 8 },
  { path: '/moderator/reports', icon: '📋', label: 'User Reports' },
  { path: '/moderator/history', icon: '📝', label: 'My History' },
  { path: '/moderator/analytics', icon: '📈', label: 'Analytics' },
  { path: '/moderator/guidelines', icon: '📖', label: 'Guidelines' },
];

export default function ModeratorDashboard() {
  return (
    <DashboardLayout title="Moderator Dashboard" navigation={navigation}>
      {/* Dashboard Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Content Moderation Center</h2>
        <p className="text-white/60">Review, approve, and maintain content quality.</p>
      </div>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Pending Reviews */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">⏳</div>
            <div className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
              Urgent
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">42</div>
          <div className="text-sm text-white/60">Pending Reviews</div>
        </div>
        
        {/* Reviewed Today */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">✅</div>
            <div className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
              +8
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">28</div>
          <div className="text-sm text-white/60">Reviewed Today</div>
        </div>
        
        {/* Flagged Content */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">🚩</div>
            <div className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">
              Action Needed
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">8</div>
          <div className="text-sm text-white/60">Flagged Items</div>
        </div>
        
        {/* Accuracy Rate */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">🎯</div>
            <div className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
              Excellent
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">97%</div>
          <div className="text-sm text-white/60">Accuracy Rate</div>
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Priority Queue */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Priority Queue</h3>
            <button className="text-sm px-3 py-1 bg-primary hover:bg-primary/80 rounded transition-colors text-white">
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
      
      {/* Flagged Content Section */}
      <div className="glass-card rounded-xl p-6 border border-white/10 mb-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold text-white">Flagged Content</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            View All Flags
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-sm text-white/60 font-medium pb-3">Content</th>
                <th className="text-left text-sm text-white/60 font-medium pb-3">Reason</th>
                <th className="text-left text-sm text-white/60 font-medium pb-3">Reporter</th>
                <th className="text-left text-sm text-white/60 font-medium pb-3">Date</th>
                <th className="text-left text-sm text-white/60 font-medium pb-3">Action</th>
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
                  <td className="py-4 text-white font-medium">{flag.content}</td>
                  <td className="py-4">
                    <span className="px-2 py-1 bg-red-500/20 text-red-400 rounded text-sm">
                      {flag.reason}
                    </span>
                  </td>
                  <td className="py-4 text-white/70">{flag.reporter}</td>
                  <td className="py-4 text-white/70">{flag.date}</td>
                  <td className="py-4">
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
      
      {/* Performance Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="text-sm text-white/60 mb-2">This Week</div>
          <div className="text-2xl font-bold text-white mb-1">156</div>
          <div className="text-xs text-white/50">Articles Reviewed</div>
          <div className="mt-4 text-xs text-green-400">+12% from last week</div>
        </div>
        
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="text-sm text-white/60 mb-2">Average Time</div>
          <div className="text-2xl font-bold text-white mb-1">2.5m</div>
          <div className="text-xs text-white/50">Per Review</div>
          <div className="mt-4 text-xs text-blue-400">-8% improvement</div>
        </div>
        
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="text-sm text-white/60 mb-2">Quality Score</div>
          <div className="text-2xl font-bold text-white mb-1">4.8/5</div>
          <div className="text-xs text-white/50">Moderator Rating</div>
          <div className="mt-4 text-xs text-yellow-400">⭐ Top Performer</div>
        </div>
      </div>
    </DashboardLayout>
  );
}
