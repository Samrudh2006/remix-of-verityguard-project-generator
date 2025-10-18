import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import Articles from './components/Articles';
import Leaderboard from './components/Leaderboard';
import Badges from './components/Badges';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Submission from './components/Submission';

function App() {
  return (
    <div className="App min-h-screen bg-dark">
      {/* Header with navigation */}
      <Header />
      
      {/* Main content */}
      <main>
        {/* Hero section with stats */}
        <Hero />
        
        {/* Features section */}
        <Features />
        
        {/* Articles with Trust Scores */}
        <Articles />
        
        {/* Leaderboard */}
        <Leaderboard />
        
        {/* Badges & Achievements */}
        <Badges />
        
        {/* Submission outline for challenge */}
        <Submission />
        
        {/* 
          TODO: Future enhancements:
          - AI Assistant Chat Widget
          - Real-time Trust Score Dashboard
          - User Profile Page
          - Advanced Analytics
        */}
      </main>
      
      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default App;
