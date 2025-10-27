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
import DemoShowcase from './components/DemoShowcase';
import { Routes, Route } from 'react-router-dom';
import LoginOptions from './pages/LoginOptions';
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import UserMainDashboard from './pages/UserMainDashboard';
import ContributorMainDashboard from './pages/ContributorMainDashboard';
import ModeratorMainDashboard from './pages/ModeratorMainDashboard';
import AdminMainDashboard from './pages/AdminMainDashboard';
import { ROLES } from './utils/roles';

function App() {
  return (
    <div className="App min-h-screen bg-dark">
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <>
              <Header />
              <main>
                <Hero />
                <Features />
                <div className="py-20 px-4 bg-dark-light">
                  <div className="container mx-auto max-w-4xl">
                    <DemoShowcase />
                  </div>
                </div>
                <Articles />
                <Leaderboard />
                <Badges />
                <Submission />
              </main>
              <Footer />
              <BackToTop />
            </>
          }
        />
        <Route path="/login" element={<LoginOptions />} />
        <Route path="/unauthorized" element={<Unauthorized />} />
        
        {/* Protected Routes - Super Admin */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute requiredRole={ROLES.SUPER_ADMIN}>
              <AdminMainDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Protected Routes - Contributor */}
        <Route
          path="/contributor/dashboard"
          element={
            <ProtectedRoute requiredRole={ROLES.CONTRIBUTOR}>
              <ContributorMainDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Protected Routes - Moderator */}
        <Route
          path="/moderator/dashboard"
          element={
            <ProtectedRoute requiredRole={ROLES.MODERATOR}>
              <ModeratorMainDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Protected Routes - User */}
        <Route
          path="/user/dashboard"
          element={
            <ProtectedRoute requiredRole={ROLES.USER}>
              <UserMainDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
