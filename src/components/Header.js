import React, { useState } from 'react';
import logo from '../logo.svg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
    }
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
            <button
              onClick={() => scrollToSection('home')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('articles')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              Articles
            </button>
            <button
              onClick={() => scrollToSection('leaderboard')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              Leaderboard
            </button>
            <button
              onClick={() => scrollToSection('badges')}
              className="text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              Badges
            </button>
            <button className="px-4 py-2 bg-primary text-dark font-semibold rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all">
              header.login
            </button>
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
            <button
              onClick={() => scrollToSection('home')}
              className="block w-full text-left text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('articles')}
              className="block w-full text-left text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              Articles
            </button>
            <button
              onClick={() => scrollToSection('leaderboard')}
              className="block w-full text-left text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              Leaderboard
            </button>
            <button
              onClick={() => scrollToSection('badges')}
              className="block w-full text-left text-white hover:text-primary transition-colors duration-300 font-medium"
            >
              Badges
            </button>
            <button className="w-full px-4 py-2 bg-primary text-dark font-semibold rounded-lg hover:shadow-lg transition-all">
              header.login
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
