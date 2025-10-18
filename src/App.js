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
import { Routes, Route } from 'react-router-dom';
import LoginOptions from './pages/LoginOptions';

function App() {
  return (
    <div className="App min-h-screen bg-dark">
      {/* Header with navigation */}
      <Header />
      
      {/* Main content with routes */}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
                <Articles />
                <Leaderboard />
                <Badges />
                <Submission />
              </>
            }
          />
          <Route path="/login" element={<LoginOptions />} />
        </Routes>
      </main>
      
      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <BackToTop />
    </div>
  );
}

export default App;
