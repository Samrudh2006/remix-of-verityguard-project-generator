import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App min-h-screen bg-dark">
      {/* Header with navigation */}
      <Header />
      
      {/* Main content */}
      <main>
        {/* Hero section */}
        <Hero />
        
        {/* Features section - TODO: Add gamification cards here */}
        <Features />
        
        {/* 
          TODO: Future sections to add:
          - Trust Score Dashboard
          - AI Assistant Chat Widget
          - Gamification Leaderboard
          - User Profile with Badges
          - Points System Display
        */}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
