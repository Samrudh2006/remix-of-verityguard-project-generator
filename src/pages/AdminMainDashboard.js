import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { ROLES, getDashboardPath, getRoleDisplayName } from '../utils/roles';
import AIChatWidget from '../components/AIChatWidget';
import StatsWidget from '../components/StatsWidget';
import AIAgentManager from '../components/AIAgentManager';
import AdvancedAnalytics from '../components/AdvancedAnalytics';
import RealTimeMonitor from '../components/RealTimeMonitor';

export default function AdminMainDashboard() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [activeSection, setActiveSection] = useState('overview');
    const [adminStats, setAdminStats] = useState({
        totalUsers: 0,
        activeArticles: 0,
        pendingReviews: 0,
        systemHealth: 0
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
            setAdminStats({
                totalUsers: 1284,
                activeArticles: 5432,
                pendingReviews: 42,
                systemHealth: 99.8,
                monthlyGrowth: 12,
                revenueGrowth: 25,
                apiCalls: 2.4
            });
        } catch (error) {
            console.error('Failed to load dashboard data:', error);
        }
    };

    const sections = [
        { id: 'overview', label: 'Overview', icon: '🏠' },
        { id: 'ai-agents', label: 'AI Agents', icon: '🤖' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'monitor', label: 'Real-Time Monitor', icon: '📡' },
        { id: 'users', label: 'User Management', icon: '👥' },
        { id: 'content', label: 'Content Management', icon: '📄' },
        { id: 'security', label: 'Security Center', icon: '🛡️' },
        { id: 'settings', label: 'System Settings', icon: '⚙️' }
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
                        <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                            {user?.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h2 className="text-2xl font-bold text-white">
                                Welcome, {user?.name?.split(' ')[0]}! 👑
                            </h2>
                            <p className="text-white/70">{user?.email}</p>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-full text-sm font-medium">
                                    {getRoleDisplayName(user?.role)}
                                </span>
                                <span className="text-white/50 text-sm">
                                    Platform Administrator since {new Date(user?.createdAt).toLocaleDateString()}
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
                    icon="👥"
                    title="Total Users"
                    value={adminStats.totalUsers.toLocaleString()}
                    subtitle="Platform users"
                    color="green"
                    trend="+12%"
                />
                <StatsWidget
                    icon="📄"
                    title="Active Articles"
                    value={adminStats.activeArticles.toLocaleString()}
                    subtitle="Published content"
                    color="blue"
                    trend="+8%"
                />
                <StatsWidget
                    icon="⏳"
                    title="Pending Reviews"
                    value={adminStats.pendingReviews}
                    subtitle="Awaiting moderation"
                    color="yellow"
                    trend="Action Needed"
                />
                <StatsWidget
                    icon="💚"
                    title="System Health"
                    value={`${adminStats.systemHealth}%`}
                    subtitle="Platform uptime"
                    color="green"
                    trend="Healthy"
                />
            </div>
            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* System Overview */}
                <div className="glass-card rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">System Overview</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🤖</span>
                                <div>
                                    <div className="text-white font-medium">AI Agents</div>
                                    <div className="text-white/60 text-sm">5 agents active</div>
                                </div>
                            </div>
                            <div className="text-green-400 font-bold">99.9% Uptime</div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">📊</span>
                                <div>
                                    <div className="text-white font-medium">Analytics Engine</div>
                                    <div className="text-white/60 text-sm">Processing data</div>
                                </div>
                            </div>
                            <div className="text-green-400 font-bold">Operational</div>
                        </div>

                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                            <div className="flex items-center gap-3">
                                <span className="text-2xl">🔒</span>
                                <div>
                                    <div className="text-white font-medium">Security Systems</div>
                                    <div className="text-white/60 text-sm">All systems secure</div>
                                </div>
                            </div>
                            <div className="text-green-400 font-bold">Protected</div>
                        </div>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="glass-card rounded-xl p-6 border border-white/10">
                    <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                    <div className="grid grid-cols-2 gap-4">
                        {[
                            { icon: '🤖', label: 'AI Agents', action: () => setActiveSection('ai-agents'), color: 'from-purple-500 to-pink-500' },
                            { icon: '📈', label: 'Analytics', action: () => setActiveSection('analytics'), color: 'from-blue-500 to-cyan-500' },
                            { icon: '📡', label: 'Monitor', action: () => setActiveSection('monitor'), color: 'from-green-500 to-emerald-500' },
                            { icon: '👥', label: 'Users', action: () => setActiveSection('users'), color: 'from-orange-500 to-red-500' }
                        ].map((action, index) => (
                            <button
                                key={index}
                                onClick={action.action}
                                className={`flex flex-col items-center gap-2 p-4 rounded-lg bg-gradient-to-br ${action.color} hover:scale-105 transition-all duration-200 text-white font-medium`}
                            >
                                <div className="text-2xl">{action.icon}</div>
                                <div className="text-sm">{action.label}</div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            {/* Recent Activity & Alerts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                                <div key={index} className={`p-4 rounded-lg border ${levelColors[alert.level]}`}>
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
        </div>
    );

    const renderUsersSection = () => (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">User Management</h2>
                <p className="text-white/60">Manage user accounts, roles, and permissions.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
                <StatsWidget icon="👥" title="Total Users" value="1,284" subtitle="All users" color="blue" />
                <StatsWidget icon="✍️" title="Contributors" value="156" subtitle="Content creators" color="green" />
                <StatsWidget icon="🛡️" title="Moderators" value="24" subtitle="Content moderators" color="purple" />
                <StatsWidget icon="👑" title="Admins" value="3" subtitle="System administrators" color="red" />
            </div>

            <div className="glass-card rounded-xl border border-white/10">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-bold text-white">User Accounts</h3>
                        <button className="px-4 py-2 bg-primary hover:bg-primary/80 rounded-lg text-white font-medium transition-colors">
                            ➕ Add User
                        </button>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="border-b border-white/10">
                                <th className="text-left text-sm text-white/60 font-medium p-4">User</th>
                                <th className="text-left text-sm text-white/60 font-medium p-4">Role</th>
                                <th className="text-left text-sm text-white/60 font-medium p-4">Status</th>
                                <th className="text-left text-sm text-white/60 font-medium p-4">Last Active</th>
                                <th className="text-left text-sm text-white/60 font-medium p-4">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {[
                                { name: 'John Doe', email: 'john@example.com', role: 'Contributor', status: 'Active', lastActive: '2 hours ago' },
                                { name: 'Jane Smith', email: 'jane@example.com', role: 'Moderator', status: 'Active', lastActive: '1 day ago' },
                                { name: 'Mike Johnson', email: 'mike@example.com', role: 'User', status: 'Inactive', lastActive: '1 week ago' }
                            ].map((user, index) => (
                                <tr key={index} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                                    <td className="p-4">
                                        <div>
                                            <div className="text-white font-medium">{user.name}</div>
                                            <div className="text-white/60 text-sm">{user.email}</div>
                                        </div>
                                    </td>
                                    <td className="p-4">
                                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-sm">
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-sm ${user.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {user.status}
                                        </span>
                                    </td>
                                    <td className="p-4 text-white/70">{user.lastActive}</td>
                                    <td className="p-4">
                                        <div className="flex gap-2">
                                            <button className="text-xs px-2 py-1 bg-white/10 hover:bg-white/20 rounded transition-colors text-white">
                                                Edit
                                            </button>
                                            <button className="text-xs px-2 py-1 bg-red-500/20 hover:bg-red-500/30 rounded transition-colors text-red-400">
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );

    const renderContentSection = () => (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Content Management</h2>
                <p className="text-white/60">Oversee all platform content and moderation activities.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <StatsWidget icon="📄" title="Total Articles" value="5,432" subtitle="All content" color="blue" />
                <StatsWidget icon="✅" title="Approved" value="4,890" subtitle="Published content" color="green" />
                <StatsWidget icon="⏳" title="Pending" value="42" subtitle="Awaiting review" color="yellow" />
            </div>

            <div className="glass-card rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">Content Overview</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                        { category: 'Technology', count: 1250, percentage: 23 },
                        { category: 'Health', count: 980, percentage: 18 },
                        { category: 'Politics', count: 850, percentage: 16 },
                        { category: 'Environment', count: 720, percentage: 13 }
                    ].map((cat, index) => (
                        <div key={index} className="p-4 bg-white/5 rounded-lg">
                            <div className="text-white font-medium mb-2">{cat.category}</div>
                            <div className="text-2xl font-bold text-white mb-1">{cat.count}</div>
                            <div className="text-sm text-white/60">{cat.percentage}% of total</div>
                            <div className="w-full bg-white/10 rounded-full h-2 mt-2">
                                <div
                                    className="bg-gradient-to-r from-primary to-blue-500 h-2 rounded-full"
                                    style={{ width: `${cat.percentage}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    const renderSecuritySection = () => (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">Security Center</h2>
                <p className="text-white/60">Monitor platform security and manage access controls.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                <StatsWidget icon="🔒" title="Security Score" value="98%" subtitle="Platform security" color="green" />
                <StatsWidget icon="🚨" title="Threats Blocked" value="156" subtitle="This month" color="red" />
                <StatsWidget icon="🛡️" title="Active Shields" value="12" subtitle="Security measures" color="blue" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Security Status</h3>
                    <div className="space-y-3">
                        {[
                            { name: 'Firewall Protection', status: 'Active', level: 'high' },
                            { name: 'DDoS Protection', status: 'Active', level: 'high' },
                            { name: 'SSL Certificates', status: 'Valid', level: 'medium' },
                            { name: 'Access Controls', status: 'Configured', level: 'high' }
                        ].map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                                <div className="text-white font-medium">{item.name}</div>
                                <div className="flex items-center gap-2">
                                    <span className={`w-2 h-2 rounded-full ${item.level === 'high' ? 'bg-green-400' : 'bg-yellow-400'
                                        }`}></span>
                                    <span className="text-white/70 text-sm">{item.status}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="glass-card rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">Recent Security Events</h3>
                    <div className="space-y-3">
                        {[
                            { event: 'Failed login attempt blocked', time: '5 min ago', severity: 'low' },
                            { event: 'Suspicious IP address detected', time: '1 hour ago', severity: 'medium' },
                            { event: 'Security scan completed', time: '2 hours ago', severity: 'info' }
                        ].map((event, index) => (
                            <div key={index} className="p-3 bg-white/5 rounded-lg">
                                <div className="flex items-center justify-between mb-1">
                                    <div className="text-white text-sm">{event.event}</div>
                                    <span className={`text-xs px-2 py-1 rounded ${event.severity === 'low' ? 'bg-blue-500/20 text-blue-400' :
                                        event.severity === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                                            'bg-green-500/20 text-green-400'
                                        }`}>
                                        {event.severity}
                                    </span>
                                </div>
                                <div className="text-white/60 text-xs">{event.time}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
    const renderSettingsSection = () => (
        <div>
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-white mb-2">System Settings</h2>
                <p className="text-white/60">Configure platform settings and preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="glass-card rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">General Settings</h3>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-white font-medium">Maintenance Mode</div>
                                <div className="text-white/60 text-sm">Enable system maintenance</div>
                            </div>
                            <button className="w-12 h-6 bg-white/20 rounded-full relative">
                                <div className="w-5 h-5 bg-white rounded-full absolute left-0.5 top-0.5"></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-white font-medium">Auto Backup</div>
                                <div className="text-white/60 text-sm">Automatic daily backups</div>
                            </div>
                            <button className="w-12 h-6 bg-primary rounded-full relative">
                                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                            </button>
                        </div>

                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-white font-medium">Email Notifications</div>
                                <div className="text-white/60 text-sm">System alert emails</div>
                            </div>
                            <button className="w-12 h-6 bg-primary rounded-full relative">
                                <div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="glass-card rounded-xl p-6 border border-white/10">
                    <h3 className="text-lg font-bold text-white mb-4">AI Configuration</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-white font-medium mb-2">AI Model Temperature</label>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.1"
                                defaultValue="0.7"
                                className="w-full h-2 bg-white/20 rounded-lg appearance-none cursor-pointer"
                            />
                            <div className="flex justify-between text-xs text-white/60 mt-1">
                                <span>Conservative</span>
                                <span>Balanced</span>
                                <span>Creative</span>
                            </div>
                        </div>

                        <div>
                            <label className="block text-white font-medium mb-2">Verification Threshold</label>
                            <select className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white">
                                <option value="60">60% - Lenient</option>
                                <option value="70">70% - Balanced</option>
                                <option value="80" selected>80% - Strict</option>
                                <option value="90">90% - Very Strict</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'ai-agents':
                return (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-2">AI Agent Management</h2>
                            <p className="text-white/60">Control and monitor all AI agents across the platform.</p>
                        </div>
                        <AIAgentManager userId={user?.id} />
                    </div>
                );
            case 'analytics':
                return (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-2">Advanced Analytics</h2>
                            <p className="text-white/60">Comprehensive platform analytics and insights.</p>
                        </div>
                        <AdvancedAnalytics userId={user?.id} />
                    </div>
                );
            case 'monitor':
                return (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-2">Real-Time System Monitor</h2>
                            <p className="text-white/60">Live monitoring of system performance and activities.</p>
                        </div>
                        <RealTimeMonitor />
                    </div>
                );
            case 'users':
                return renderUsersSection();
            case 'content':
                return renderContentSection();
            case 'security':
                return renderSecuritySection();
            case 'settings':
                return renderSettingsSection();
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
                            <div className="text-3xl">👑</div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                                <p className="text-white/60 text-sm">Platform administration and management</p>
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
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${activeSection === section.id
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