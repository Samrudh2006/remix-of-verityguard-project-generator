import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../i18n';
import { getRoleDisplayName, getRoleBadgeColor } from '../utils/roles';

/**
 * DashboardLayout - Shared layout component for all dashboards
 * 
 * @param {object} props
 * @param {React.ReactNode} props.children - Dashboard content
 * @param {string} props.title - Dashboard title
 * @param {Array} props.navigation - Navigation items
 */
export function DashboardLayout({ children, title, navigation = [] }) {
  const { user, logout } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  
  const roleBadgeColors = getRoleBadgeColor(user?.role);
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-dark">
      {/* Top Bar */}
      <div className="fixed top-0 left-0 right-0 h-16 bg-dark-light border-b border-white/10 z-50">
        <div className="flex items-center justify-between h-full px-4">
          {/* Left: Menu Toggle + Title */}
          <div className="flex items-center gap-4">
            <button
              onClick={toggleSidebar}
              className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Toggle Sidebar"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div>
              <h1 className="text-xl font-bold text-white">{title}</h1>
              <p className="text-xs text-white/50">VerityGuard Platform</p>
            </div>
          </div>
          
          {/* Right: User Menu */}
          <div className="relative">
            <button
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors"
            >
              <div className="text-right">
                <div className="text-sm font-medium text-white">{user?.name}</div>
                <div className={`text-xs px-2 py-0.5 rounded-full inline-block ${roleBadgeColors.bg} ${roleBadgeColors.text}`}>
                  {getRoleDisplayName(user?.role)}
                </div>
              </div>
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold">
                {user?.name?.charAt(0).toUpperCase()}
              </div>
            </button>
            
            {/* User Dropdown Menu */}
            {userMenuOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-dark-light border border-white/10 rounded-lg shadow-xl overflow-hidden">
                <div className="p-3 border-b border-white/10">
                  <div className="text-sm font-medium text-white">{user?.name}</div>
                  <div className="text-xs text-white/60">{user?.email}</div>
                </div>
                <Link
                  to="/profile"
                  className="block px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Profile Settings
                </Link>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Back to Home
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/10 transition-colors"
                >
                  {t('auth.logout')}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 bg-dark-light border-r border-white/10 transition-all duration-300 z-40 ${
          sidebarOpen ? 'w-64' : 'w-0'
        } overflow-hidden`}
      >
        <nav className="p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  isActive
                    ? 'bg-primary text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
      
      {/* Main Content */}
      <main
        className={`pt-16 transition-all duration-300 ${
          sidebarOpen ? 'ml-64' : 'ml-0'
        } min-h-screen`}
      >
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}

export default DashboardLayout;
