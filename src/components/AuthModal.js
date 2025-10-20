import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useI18n } from '../i18n';

export default function AuthModal({ mode: initialMode = 'login', onClose, role: initialRole }) {
  const [mode, setMode] = useState(initialMode); // 'login' or 'signup'
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: initialRole || 'user' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const { t } = useI18n();
  const navigate = useNavigate();

  // Role display mapping
  const roleDisplay = {
    user: t('login.role.user'),
    contributor: t('login.role.contributor'),
    moderator: 'Moderator',
    'super-admin': t('login.role.admin'),
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = mode === 'login' 
      ? login(formData.email, formData.password)
      : signup(formData);

    setLoading(false);

    if (result.success) {
      onClose();
      // Redirect to appropriate dashboard
      if (result.redirectTo) {
        navigate(result.redirectTo);
      }
    } else {
      setError(result.error);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'login' ? 'signup' : 'login');
    setError('');
    setFormData({ name: '', email: '', password: '', role: initialRole || 'user' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="relative glass-card max-w-md w-full p-8 rounded-2xl border border-primary/30">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-300 hover:text-white text-xl"
          aria-label="Close"
        >
          ✖
        </button>

        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-white mb-2">
            {t('login.welcomeBack')}
          </h2>
          {initialRole && (
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-primary text-sm">
                {roleDisplay[initialRole]}
              </span>
            </div>
          )}
          <p className="text-white/70 text-sm">
            {t('login.signInToAccess')}
          </p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div>
              <label className="block text-white/80 text-sm mb-2">{t('auth.name')}</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-dark/80 border border-primary/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
                placeholder={t('auth.namePlaceholder')}
                required
              />
            </div>
          )}

          <div>
            <label className="block text-white/80 text-sm mb-2">{t('auth.email')}</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-dark/80 border border-primary/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
              placeholder={t('auth.emailPlaceholder')}
              required
            />
          </div>

          <div>
            <label className="block text-white/80 text-sm mb-2">{t('auth.password')}</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-dark/80 border border-primary/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-primary/60"
              placeholder={t('auth.passwordPlaceholder')}
              required
              minLength={6}
            />
            {mode === 'signup' && (
              <p className="text-white/50 text-xs mt-1">{t('auth.passwordHint')}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 neon-button font-semibold rounded-lg disabled:opacity-60"
          >
            {loading ? '⏳ ' + t('auth.loading') : mode === 'login' ? t('auth.loginButton') : t('auth.signupButton')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={toggleMode}
            className="text-primary hover:underline text-sm"
          >
            {mode === 'login' ? t('auth.noAccount') : t('auth.haveAccount')}
          </button>
        </div>

        {mode === 'signup' && (
          <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
            <p className="text-yellow-400 text-xs text-center">
              ℹ️ {t('auth.demoNote')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
