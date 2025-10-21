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
import Unauthorized from './pages/Unauthorized';
import ProtectedRoute from './components/ProtectedRoute';
import RedirectByRole from './components/RedirectByRole';
import AdminDashboard from './pages/admin/AdminDashboard';
import ContributorDashboard from './pages/contributor/ContributorDashboard';
import ModeratorDashboard from './pages/moderator/ModeratorDashboard';
import UserDashboard from './pages/user/UserDashboard';
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
        
        {/* Redirect based on role - for authenticated users accessing /dashboard */}
        <Route path="/dashboard" element={<RedirectByRole />} />
        
        {/* Protected Routes - Admin Dashboard */}
        <Route
          path="/dashboard/admin"
          element={
            <ProtectedRoute requiredRole={ROLES.SUPER_ADMIN}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Protected Routes - Moderator Dashboard */}
        <Route
          path="/dashboard/moderator"
          element={
            <ProtectedRoute requiredRole={ROLES.MODERATOR}>
              <ModeratorDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Protected Routes - Contributor Dashboard */}
        <Route
          path="/dashboard/contributor"
          element={
            <ProtectedRoute requiredRole={ROLES.CONTRIBUTOR}>
              <ContributorDashboard />
            </ProtectedRoute>
          }
        />
        
        {/* Protected Routes - User Dashboard */}
        <Route
          path="/dashboard/user"
          element={
            <ProtectedRoute requiredRole={ROLES.USER}>
              <UserDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
