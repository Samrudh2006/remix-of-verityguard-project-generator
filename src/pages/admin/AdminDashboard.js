import React from 'react';
import DashboardLayout from '../../components/DashboardLayout';

const navigation = [
  { path: '/dashboard/admin', icon: '📊', label: 'Dashboard' },
  { path: '/dashboard/admin/users', icon: '👥', label: 'User Management' },
  { path: '/dashboard/admin/roles', icon: '🔐', label: 'Roles & Permissions' },
  { path: '/dashboard/admin/content', icon: '📄', label: 'Content Management' },
  { path: '/dashboard/admin/analytics', icon: '📈', label: 'Analytics' },
  { path: '/dashboard/admin/audit-logs', icon: '📝', label: 'Audit Logs' },
  { path: '/dashboard/admin/settings', icon: '⚙️', label: 'Settings' },
  { path: '/dashboard/admin/security', icon: '🛡️', label: 'Security Center' },
];

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Super Admin Dashboard" navigation={navigation}>
      {/* Dashboard Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-white mb-2">Welcome to Admin Dashboard</h2>
        <p className="text-white/60">Manage your entire VerityGuard platform from here.</p>
      </div>
      
      {/* Quick Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Total Users */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">👥</div>
            <div className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
              +12%
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">1,284</div>
          <div className="text-sm text-white/60">Total Users</div>
        </div>
        
        {/* Active Articles */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">📄</div>
            <div className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">
              +8%
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">5,432</div>
          <div className="text-sm text-white/60">Active Articles</div>
        </div>
        
        {/* Pending Reviews */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">⏳</div>
            <div className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-400 rounded-full">
              Action Needed
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">42</div>
          <div className="text-sm text-white/60">Pending Reviews</div>
        </div>
        
        {/* System Health */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <div className="flex items-center justify-between mb-4">
            <div className="text-4xl">💚</div>
            <div className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">
              Healthy
            </div>
          </div>
          <div className="text-3xl font-bold text-white mb-1">99.8%</div>
          <div className="text-sm text-white/60">Uptime</div>
        </div>
      </div>
      
      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Activity */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { user: 'John Doe', action: 'Created new user account', time: '2 min ago', icon: '➕' },
              { user: 'Jane Smith', action: 'Updated role permissions', time: '15 min ago', icon: '🔐' },
              { user: 'System', action: 'Automated backup completed', time: '1 hour ago', icon: '💾' },
              { user: 'Mike Johnson', action: 'Approved 5 articles', time: '2 hours ago', icon: '✅' },
            ].map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <div className="text-2xl">{activity.icon}</div>
                <div className="flex-1">
                  <div className="text-sm text-white font-medium">{activity.user}</div>
                  <div className="text-xs text-white/60">{activity.action}</div>
                </div>
                <div className="text-xs text-white/40">{activity.time}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* System Alerts */}
        <div className="glass-card rounded-xl p-6 border border-white/10">
          <h3 className="text-xl font-bold text-white mb-4">System Alerts</h3>
          <div className="space-y-3">
            {[
              { level: 'warning', message: '42 articles pending review', action: 'View Queue' },
              { level: 'info', message: 'New version available', action: 'Update' },
              { level: 'success', message: 'Backup completed successfully', action: 'View' },
            ].map((alert, index) => {
              const levelColors = {
                warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
                info: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
                success: 'bg-green-500/20 text-green-400 border-green-500/30',
              };
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${levelColors[alert.level]}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-medium">{alert.message}</div>
                    <button className="text-xs px-3 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors">
                      {alert.action}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="glass-card rounded-xl p-6 border border-white/10">
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '➕', label: 'Add User', path: '/dashboard/admin/users/new' },
            { icon: '📊', label: 'View Reports', path: '/dashboard/admin/analytics' },
            { icon: '🔍', label: 'Audit Logs', path: '/dashboard/admin/audit-logs' },
            { icon: '⚙️', label: 'Settings', path: '/dashboard/admin/settings' },
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-primary/50 transition-all"
            >
              <div className="text-3xl">{action.icon}</div>
              <div className="text-sm text-white font-medium">{action.label}</div>
            </button>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
