import React, { useState } from 'react';
import logo from '../logo.svg';
import { useI18n } from '../i18n';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { t, lang, setLang } = useI18n();
  const { user, logout, isAuthenticated } = useAuth();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleAuthClick = (mode) => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark/80 backdrop-blur-md border-b border-primary/20">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <img src={logo} alt="VerityGuard Logo" className="h-10 w-10" />
            <span className="text-2xl font-bold text-primary">VerityGuard</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('home')} className="text-white hover:text-primary transition-colors duration-300 font-medium">{t('nav.home')}</button>
            <button
              onClick={() => scrollToSection('articles')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              {t('nav.articles')}
            </button>
            <button
              onClick={() => scrollToSection('leaderboard')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              {t('nav.leaderboard')}
            </button>
            <button
              onClick={() => scrollToSection('badges')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              {t('nav.badges')}
            </button>
            <button
              onClick={() => scrollToSection('submission')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              {t('nav.outline')}
            </button>
            {isAuthenticated ? (
              <>
                <div className="flex items-center gap-3 px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-cyan-400 flex items-center justify-center text-dark font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-white font-medium">{user.name}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 transition-all"
                >
                  {t('auth.logout')}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleAuthClick('login')}
                  className="px-4 py-2 bg-white/10 border border-primary/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                >
                  {t('header.login')}
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="px-4 py-2 bg-primary text-dark font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
                >
                  {t('auth.signup')}
                </button>
              </>
            )}
            <div className="flex items-center gap-2 text-sm">
              <button
                className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`}
                onClick={() => setLang('en')}
              >EN</button>
              <span className="text-white/40">|</span>
              <button
                className={`px-2 py-1 rounded ${lang === 'hi' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`}
                onClick={() => setLang('hi')}
              >HI</button>
            </div>
            {/* TODO: Add user profile icon with Trust Score badge */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4 pb-4">
            <button onClick={() => scrollToSection('home')} className="block w-full text-left text-white hover:text-primary transition-colors duration-300 font-medium">{t('nav.home')}</button>
            <button
              onClick={() => scrollToSection('articles')}
              className="block w-full text-left text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              {t('nav.articles')}
            </button>
            <button
              onClick={() => scrollToSection('leaderboard')}
              className="block w-full text-left text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              {t('nav.leaderboard')}
            </button>
            <button
              onClick={() => scrollToSection('badges')}
              className="block w-full text-left text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              {t('nav.badges')}
            </button>
            <button
              onClick={() => scrollToSection('submission')}
              className="block w-full text-left text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              {t('nav.outline')}
            </button>
            {isAuthenticated ? (
              <>
                <div className="py-2 px-3 bg-primary/10 border border-primary/30 rounded-lg">
                  <div className="text-xs text-white/70">{t('auth.loggedInAs')}</div>
                  <div className="text-white font-semibold">{user.name}</div>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 bg-red-500/20 border border-red-500/30 text-red-400 font-semibold rounded-lg hover:bg-red-500/30 transition-all"
                >
                  {t('auth.logout')}
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => handleAuthClick('login')}
                  className="w-full px-4 py-2 bg-white/10 border border-primary/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                >
                  {t('header.login')}
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="w-full px-4 py-2 bg-primary text-dark font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  {t('auth.signup')}
                </button>
              </>
            )}
            <div className="flex items-center gap-3">
              <button className={`px-2 py-1 rounded ${lang === 'en' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`} onClick={() => setLang('en')}>EN</button>
              <span className="text-white/40">|</span>
              <button className={`px-2 py-1 rounded ${lang === 'hi' ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white'}`} onClick={() => setLang('hi')}>HI</button>
            </div>
          </div>
        )}
      </nav>

      {/* Auth Modal */}
      {showAuthModal && <AuthModal mode={authMode} onClose={() => setShowAuthModal(false)} />}
    </header>
  );
}

export default Header;
