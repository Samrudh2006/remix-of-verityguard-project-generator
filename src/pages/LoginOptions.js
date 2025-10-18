import React, { useState } from 'react';
import { useI18n } from '../i18n';
import AuthModal from '../components/AuthModal';

export default function LoginOptions() {
  const { t } = useI18n();
  const [role, setRole] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [mode, setMode] = useState('login');

  const roles = [
    { key: 'user', icon: '👤', label: t('login.role.user'), desc: t('auth.loginSubtitle') },
    { key: 'contributor', icon: '✍️', label: t('login.role.contributor'), desc: 'Submit and verify articles' },
    { key: 'admin', icon: '🛡️', label: t('login.role.admin'), desc: 'Manage users and content' },
  ];

  const pickRole = (r) => {
    setRole(r);
  };

  const proceed = (selectedMode) => {
    setMode(selectedMode);
    setShowAuth(true);
  };

  return (
    <div className="min-h-screen bg-dark pt-24 px-4">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white">{t('login.options.title')}</h1>
          <p className="text-white/70 mt-2">{t('login.options.subtitle')}</p>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          {roles.map((r) => (
            <button
              key={r.key}
              onClick={() => pickRole(r.key)}
              className={`p-5 rounded-xl border transition-all glass-card text-left ${
                role === r.key ? 'border-primary/70 shadow-lg shadow-primary/30' : 'border-primary/20 hover:border-primary/50'
              }`}
            >
              <div className="text-3xl mb-2">{r.icon}</div>
              <div className="text-lg font-semibold text-white">{r.label}</div>
              <div className="text-white/60 text-sm mt-1">{r.desc}</div>
            </button>
          ))}
        </div>

        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <button
            disabled={!role}
            onClick={() => proceed('login')}
            className="px-6 py-3 rounded-lg bg-white/10 border border-primary/30 text-white font-semibold disabled:opacity-50"
          >
            {t('auth.login')}
          </button>
          <button
            disabled={!role}
            onClick={() => proceed('signup')}
            className="px-6 py-3 rounded-lg bg-primary text-dark font-semibold disabled:opacity-50"
          >
            {t('auth.signup')}
          </button>
        </div>

        {showAuth && (
          <AuthModal
            mode={mode}
            onClose={() => setShowAuth(false)}
          />
        )}
      </div>
    </div>
  );
}
