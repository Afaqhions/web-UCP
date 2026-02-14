import React from 'react';
import { Routes, Route, Navigate, BrowserRouter as Router } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

// Pages
import LandingPage from './pages/marketing/LandingPage';
import LoginPage from './pages/auth/LoginPage';
import SignupPage from './pages/auth/SignupPage';
import DashboardPage from './pages/user/DashboardPage';
import CompetitionsPage from './pages/user/CompetitionsPage';
import CompetitionDetailPage from './pages/user/CompetitionDetailPage';
import ProfilePage from './pages/user/ProfilePage';
import AdminDashboardPage from './pages/admin/AdminDashboardPage';
import CreateCompetitionPage from './pages/admin/CreateCompetitionPage';
import CreateCategoryPage from './pages/admin/CreateCategoryPage';
import CreateUserPage from './pages/admin/CreateUserPage';
import CreatePrizePoolPage from './pages/admin/CreatePrizePoolPage';

export const AppRoutes = () => {
  const { user, loading, isAdmin } = useAuth();
  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', fontWeight: 500 }}>
        <span className="animate-pulse">Loading...</span>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/competitions" element={<CompetitionsPage />} />
      <Route path="/competitions/:id" element={<CompetitionDetailPage />} />

      {/* Auth Routes */}
      <Route
        path="/login"
        element={!user ? <LoginPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/signup"
        element={!user ? <SignupPage /> : <Navigate to="/dashboard" />}
      />

      {/* Protected User Routes */}
      <Route
        path="/dashboard"
        element={user ? <DashboardPage /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={user ? <ProfilePage /> : <Navigate to="/login" />}
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={user && isAdmin() ? <AdminDashboardPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/admin/competitions/new"
        element={user && isAdmin() ? <CreateCompetitionPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/admin/categories/new"
        element={user && isAdmin() ? <CreateCategoryPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/admin/users/new"
        element={user && isAdmin() ? <CreateUserPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/admin/prizepools/new"
        element={user && isAdmin() ? <CreatePrizePoolPage /> : <Navigate to="/dashboard" />}
      />

      {/* Edit Routes - Reusing Create Pages */}
      <Route
        path="/admin/competitions/edit/:id"
        element={user && isAdmin() ? <CreateCompetitionPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/admin/categories/edit/:id"
        element={user && isAdmin() ? <CreateCategoryPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/admin/users/edit/:id"
        element={user && isAdmin() ? <CreateUserPage /> : <Navigate to="/dashboard" />}
      />
      <Route
        path="/admin/prizepools/edit/:id"
        element={user && isAdmin() ? <CreatePrizePoolPage /> : <Navigate to="/dashboard" />}
      />

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
