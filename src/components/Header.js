import React, { useState } from 'react';
import logo from '../logo.svg';
import { useI18n, languages } from '../i18n';
import { useAuth } from '../contexts/AuthContext';
// import AuthModal from './AuthModal';
import { useNavigate } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // const [showAuthModal, setShowAuthModal] = useState(false);
  // const [authMode, setAuthMode] = useState('login');
  const [showLangMenu, setShowLangMenu] = useState(false);
  const { t, lang, setLang } = useI18n();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const currentLang = languages.find(l => l.code === lang);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
  };

  const handleAuthClick = () => {
    navigate('/login');
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
                  onClick={handleAuthClick}
                  className="px-4 py-2 bg-white/10 border border-primary/30 text-white font-semibold rounded-lg hover:bg-white/20 transition-all"
                >
                  {t('header.login')}
                </button>
                <button
                  onClick={handleAuthClick}
                  className="px-4 py-2 bg-primary text-dark font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all"
                >
                  {t('auth.signup')}
                </button>
              </>
            )}
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLangMenu(!showLangMenu)}
                className="flex items-center gap-2 px-3 py-2 bg-white/10 border border-primary/30 text-white rounded-lg hover:bg-white/20 transition-all"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                </svg>
                <span className="font-medium">{currentLang?.nativeName || 'EN'}</span>
                <svg className={`w-4 h-4 transition-transform ${showLangMenu ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showLangMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-dark-lighter border border-primary/30 rounded-lg shadow-2xl overflow-hidden z-50">
                  {languages.map((language) => (
                    <button
                      key={language.code}
                      onClick={() => {
                        setLang(language.code);
                        setShowLangMenu(false);
                      }}
                      className={`w-full text-left px-4 py-3 hover:bg-primary/20 transition-colors ${
                        lang === language.code ? 'bg-primary/10 text-primary' : 'text-white/90'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="font-medium">{language.nativeName}</div>
                          <div className="text-xs text-white/60">{language.name}</div>
                        </div>
                        {lang === language.code && (
                          <svg className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              )}
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
            {/* Mobile Language Selector */}
            <div className="pt-2 border-t border-white/10">
              <div className="text-xs text-white/60 mb-2">Language / भाषा</div>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="w-full px-3 py-2 bg-dark-lighter border border-primary/30 text-white rounded-lg focus:outline-none focus:border-primary"
              >
                {languages.map((language) => (
                  <option key={language.code} value={language.code}>
                    {language.nativeName} ({language.name})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </nav>

  {/* Auth Modal no longer opened here; navigation goes to /login */}
    </header>
  );
}

export default Header;
