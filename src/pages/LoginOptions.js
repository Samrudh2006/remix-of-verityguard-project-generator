import React, { useState } from 'react';
import { useI18n } from '../i18n';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../components/AuthModal';
import logo from '../logo.svg';

export default function LoginOptions() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);
  const [showAuth, setShowAuth] = useState(false);

  const roles = [
    { 
      key: 'user', 
      icon: '👤', 
      iconBg: 'bg-green-100', 
      iconColor: 'text-green-600',
      label: t('login.role.user'), 
      desc: t('login.desc.user') 
    },
    { 
      key: 'contributor', 
      icon: '🏪', 
      iconBg: 'bg-blue-100', 
      iconColor: 'text-blue-600',
      label: t('login.role.contributor'), 
      desc: t('login.desc.contributor') 
    },
    { 
      key: 'admin', 
      icon: '🛡️', 
      iconBg: 'bg-red-100', 
      iconColor: 'text-red-600',
      label: t('login.role.admin'), 
      desc: t('login.desc.admin') 
    },
  ];

  const handleContinue = (role) => {
    setSelectedRole(role);
    setShowAuth(true);
  };

  const handleCloseAuth = () => {
    setShowAuth(false);
    // Don't clear selectedRole so back button works properly
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-dark to-dark-light pt-20 pb-12 px-4">
      <div className="container mx-auto max-w-6xl">
        {/* Logo and Title */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-4">
            <img src={logo} alt="VerityGuard Logo" className="h-16 w-16" />
            <h1 className="text-4xl font-bold text-white">{t('login.options.title')}</h1>
          </div>
          <p className="text-white/70 text-lg">{t('login.options.subtitle')}</p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {roles.map((role) => (
            <div
              key={role.key}
              className="glass-card rounded-2xl border border-white/10 hover:border-primary/30 transition-all duration-300 overflow-hidden"
            >
              {/* Card Content */}
              <div className="p-8 text-center">
                {/* Icon */}
                <div className={`w-20 h-20 ${role.iconBg} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <span className={`text-4xl ${role.iconColor}`}>{role.icon}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-3">
                  {role.label}
                </h3>

                {/* Description */}
                <p className="text-white/60 text-sm mb-6 leading-relaxed min-h-[60px]">
                  {role.desc}
                </p>

                {/* Continue Button */}
                <button
                  onClick={() => handleContinue(role.key)}
                  className="w-full py-3 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-primary/50 rounded-lg font-semibold text-white transition-all duration-300"
                >
                  {t('login.continue')}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Back to Home Link */}
        <div className="text-center mt-12">
          <button
            onClick={() => navigate('/')}
            className="text-primary hover:text-primary/80 text-sm font-medium transition-colors inline-flex items-center gap-2"
          >
            {t('login.back')}
          </button>
        </div>

        {/* Auth Modal */}
        {showAuth && (
          <AuthModal
            mode="login"
            role={selectedRole}
            onClose={handleCloseAuth}
          />
        )}
      </div>
    </div>
  );
}
