import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { StatsCards } from '../../components/dashboard/StatsCards';
import { RecentActivity } from '../../components/dashboard/RecentActivity';
import { MyCompetitionsList } from '../../components/dashboard/MyCompetitionsList';
import { Card } from '../../components/common/Card';

const UserDashboardPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats] = useState([
    { label: 'Registered', value: '0', icon: '📝', color: '#3b82f6' },
    { label: 'Wins', value: '0', icon: '🥇', color: '#f59e0b' },
    { label: 'Participations', value: '0', icon: '👥', color: '#10b981' },
    { label: 'Followers', value: '0', icon: '⭐', color: '#8b5cf6' },
  ]);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return '🌅 Good Morning';
    if (hour < 18) return '🌤️ Good Afternoon';
    return '🌙 Good Evening';
  };

  return (
    <div style={{ minHeight: '100vh', padding: '6rem 1.5rem', background: '#f8fafc' }}>
      {/* Premium Background */}
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          background: 'linear-gradient(135deg, #f0fdfa 0%, #fefce8 100%)',
          opacity: 0.8
        }}
      />
      <div className="bg-pattern-dots" style={{ position: 'fixed', inset: 0, zIndex: 0, opacity: 0.03 }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>

        {/* Header Section */}
        <div
          className="animate-fade-in-up"
          style={{
            marginBottom: '3rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div>
            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, color: '#1f2937', marginBottom: '0.5rem', lineHeight: 1.2 }}>
              <span className="gradient-text">{getGreeting()}</span>, {user?.firstName}! 👋
            </h1>
            <p style={{ fontSize: '1.1rem', color: '#6b7280' }}>Welcome back to your dashboard</p>
          </div>
          <div style={{ display: 'none', md: { display: 'block' } }}>
            {/* Avatar or decorative element could go here */}
          </div>
        </div>

        {/* Stats Cards */}
        <div style={{ marginBottom: '3rem' }}>
          <StatsCards stats={stats} />
        </div>

        {/* Main Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'start'
          }}
        >
          {/* Left Column (Main Feed) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', gridColumn: 'span 2' }}>
            <RecentActivity />

            {/* Quick Actions */}
            <Card variant="glass" header={<h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Quick Actions</h3>}>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
                  gap: '1rem'
                }}
              >
                {[
                  { emoji: '🔍', label: 'Find Competitions', color: '#3b82f6', bg: '#eff6ff', to: '/competitions' },
                  { emoji: '📝', label: 'My Registrations', color: '#8b5cf6', bg: '#f5f3ff', to: '/dashboard/registrations' },
                  { emoji: '💬', label: 'Chat Support', color: '#10b981', bg: '#ecfdf5', action: 'chat' },
                  { emoji: '📊', label: 'Leaderboard', color: '#f59e0b', bg: '#fffbeb', to: '/leaderboard' },
                ].map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => action.to ? navigate(action.to) : console.log('Action:', action.label)}
                    className="hover-lift"
                    style={{
                      padding: '1.5rem',
                      borderRadius: '1rem',
                      background: action.bg,
                      border: 'none',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 200ms ease',
                    }}
                  >
                    <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>{action.emoji}</div>
                    <p style={{ fontSize: '0.9rem', fontWeight: 600, color: action.color }}>{action.label}</p>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column (Sidebar) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <MyCompetitionsList />

            {/* Profile Completion Card */}
            <Card variant="gradient" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h3 style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1f2937' }}>Profile Strength</h3>
                <span style={{ fontWeight: 800, color: '#2563eb' }}>85%</span>
              </div>

              {/* Progress Bar */}
              <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.5)', borderRadius: '99px', overflow: 'hidden', marginBottom: '1rem' }}>
                <div style={{ width: '85%', height: '100%', background: 'linear-gradient(90deg, #3b82f6, #60a5fa)', borderRadius: '99px' }} />
              </div>

              <p style={{ fontSize: '0.9rem', color: '#4b5563', lineHeight: 1.5 }}>
                Complete your profile to unlock verified badges and more features.
              </p>

              <button
                style={{
                  marginTop: '1rem',
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '0.75rem',
                  background: '#fff',
                  color: '#2563eb',
                  fontWeight: 600,
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                }}
                className="hover-lift"
              >
                Complete Profile
              </button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboardPage;
