import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { getDashboardPath } from '../utils/roles';

export default function Unauthorized() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  const handleGoToDashboard = () => {
    if (isAuthenticated && user) {
      const dashboardPath = getDashboardPath(user.role);
      navigate(dashboardPath);
    } else {
      navigate('/');
    }
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-light flex items-center justify-center px-4">
      <div className="max-w-2xl w-full text-center">
        {/* Icon */}
        <div className="mb-8">
          <div className="text-9xl mb-4">🚫</div>
          <h1 className="text-5xl font-bold text-white mb-4">Access Denied</h1>
          <p className="text-xl text-white/60">
            You don't have permission to access this page.
          </p>
        </div>
        
        {/* Info Card */}
        <div className="glass-card rounded-2xl p-8 border border-white/10 mb-8">
          <div className="text-white/70 mb-6">
            {isAuthenticated && user ? (
              <>
                <p className="mb-4">
                  You are currently logged in as <span className="text-primary font-semibold">{user.name}</span> with the role of <span className="text-primary font-semibold">{user.role}</span>.
                </p>
                <p>
                  This page requires different permissions than your current role allows.
                </p>
              </>
            ) : (
              <p>
                You need to be logged in with the appropriate permissions to access this page.
              </p>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {isAuthenticated && user ? (
              <>
                <button
                  onClick={handleGoToDashboard}
                  className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-semibold rounded-lg transition-colors"
                >
                  Go to My Dashboard
                </button>
                <Link
                  to="/"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20"
                >
                  Back to Home
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-6 py-3 bg-primary hover:bg-primary/80 text-white font-semibold rounded-lg transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/"
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-colors border border-white/20"
                >
                  Back to Home
                </Link>
              </>
            )}
          </div>
        </div>
        
        {/* Help Text */}
        <div className="text-sm text-white/50">
          <p>If you believe this is an error, please contact your system administrator.</p>
        </div>
      </div>
    </div>
  );
}
