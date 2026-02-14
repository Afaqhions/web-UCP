import React, { useState, useEffect } from 'react';
import { ManageCompetitions } from '../../components/admin/ManageCompetitions';
import { ManageCategories } from '../../components/admin/ManageCategories';
import { ManageUsers } from '../../components/admin/ManageUsers';
import { PendingRegistrations } from '../../components/admin/PendingRegistrations';
import { ManagePrizePools } from '../../components/admin/ManagePrizePools';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { AdminSidebar } from '../../components/layout/AdminSidebar';
import { FiArrowRight } from 'react-icons/fi';

import { useNavigate, useLocation } from 'react-router-dom';

const AdminDashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [stats, setStats] = useState([
    { label: 'Total Users', value: '0', icon: '👥', trend: '-', color: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
    { label: 'Total Competitions', value: '0', icon: '🏆', trend: '-', color: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
    { label: 'Categories', value: '0', icon: '📁', trend: '-', color: 'linear-gradient(135deg, #10b981, #3b82f6)' },
    { label: 'Prize Pool', value: '$0', icon: '💰', trend: '-', color: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
  ]);

  const [recentActivity, setRecentActivity] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const comps = JSON.parse(localStorage.getItem('competitions_data')) || [];
    const cats = JSON.parse(localStorage.getItem('categories_data')) || [];
    const users = JSON.parse(localStorage.getItem('users_data')) || [];
    const pools = JSON.parse(localStorage.getItem('prizepools_data')) || [];

    const totalPrize = pools.reduce((acc, curr) => acc + (Number(curr.amount) || 0), 0);

    setStats([
      { label: 'Total Users', value: users.length.toLocaleString(), icon: '👥', trend: users.length > 0 ? 'Active' : '-', color: 'linear-gradient(135deg, #3b82f6, #06b6d4)' },
      { label: 'Total Competitions', value: comps.length.toLocaleString(), icon: '🏆', trend: comps.length > 0 ? 'Active' : '-', color: 'linear-gradient(135deg, #8b5cf6, #ec4899)' },
      { label: 'Categories', value: cats.length.toLocaleString(), icon: '📁', trend: cats.length > 0 ? 'Defined' : '-', color: 'linear-gradient(135deg, #10b981, #3b82f6)' },
      { label: 'Prize Pool', value: `$${totalPrize.toLocaleString()}`, icon: '💰', trend: totalPrize > 0 ? 'Allocated' : '-', color: 'linear-gradient(135deg, #f59e0b, #ef4444)' },
    ]);

    const activity = [
      ...comps.map(c => ({ user: 'Admin', action: `Created competition: ${c.title}`, time: c.id, icon: '🏆' })),
      ...cats.map(c => ({ user: 'Admin', action: `Added category: ${c.name}`, time: c.id, icon: '📁' })),
      ...users.map(u => ({ user: 'Admin', action: `Added user: ${u.name}`, time: u.id, icon: '👤' })),
      ...pools.map(p => ({ user: 'Admin', action: `Created prize pool: ${p.name}`, time: p.id, icon: '💰' }))
    ].sort((a, b) => b.time - a.time).slice(0, 5);

    setRecentActivity(activity.map(a => ({
      ...a,
      time: new Date(a.time).toLocaleDateString() + ' ' + new Date(a.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    })));

  }, [activeTab]);

  useEffect(() => {
    if (location.state?.activeTab !== undefined) {
      setActiveTab(location.state.activeTab);
      window.history.replaceState({}, document.title);
    }
  }, [location]);

  const DashboardContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {[
          { icon: '🏆', label: 'Competition', path: '/admin/competitions/new', color: 'var(--color-primary-500)', desc: 'Start Tournament' },
          { icon: '📁', label: 'Category', path: '/admin/categories/new', color: 'var(--color-neon-purple)', desc: 'Define Tags' },
          { icon: '👤', label: 'New Admin', path: '/admin/users/new', color: 'var(--color-neon-cyan)', desc: 'Grant Access' },
          { icon: '💰', label: 'Prize Pool', path: '/admin/prizepools/new', color: 'var(--color-accent-500)', desc: 'Allocate Funds' },
        ].map((action, idx) => (
          <Card
            key={idx}
            clickable
            hoverable
            onClick={() => navigate(action.path)}
            className="animate-fade-in-up"
            style={{
              animationDelay: `${idx * 0.1}s`,
              padding: '1.5rem',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              textAlign: 'center'
            }}
          >
            <div style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              filter: `drop-shadow(0 0 10px ${action.color}40)`
            }}>
              {action.icon}
            </div>
            <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem', marginBottom: '0.25rem' }}>{action.label}</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px' }}>{action.desc}</div>
          </Card>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '2rem', alignItems: 'start' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            {stats.map((stat, idx) => (
              <Card
                key={idx}
                variant="default"
                className="animate-fade-in"
                style={{
                  animationDelay: `${idx * 0.15}s`,
                  padding: '1.75rem',
                  border: '1px solid #f1f5f9'
                }}
              >
                <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                  <div style={{
                    fontSize: '2rem',
                    padding: '1rem',
                    background: '#f8fafc',
                    borderRadius: '1rem',
                    border: '1px solid #f1f5f9'
                  }}>
                    {stat.icon}
                  </div>
                  <div>
                    <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '0.25rem' }}>
                      {stat.label}
                    </div>
                    <div style={{ fontSize: '2.25rem', fontWeight: 900, color: '#0f172a', fontFamily: 'var(--font-display)', lineHeight: 1 }}>
                      {stat.value}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card
            header={
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 800, letterSpacing: '2px', fontSize: '0.85rem' }}>PLATFORM LIVE FEED</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-neon-emerald)', fontWeight: 800 }}>● ENCRYPTED</span>
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {recentActivity.map((activity, idx) => (
                <div
                  key={idx}
                  className="smooth-transition"
                  style={{
                    display: 'flex',
                    gap: '1.25rem',
                    alignItems: 'center',
                    padding: '1rem',
                    borderRadius: '0.75rem',
                    background: '#f8fafc',
                    border: '1px solid #f1f5f9'
                  }}
                >
                  <div style={{ fontSize: '1.25rem' }}>{activity.icon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.9rem', color: '#1e293b', fontWeight: 600 }}>{activity.action}</div>
                    <div style={{ fontSize: '0.75rem', color: '#64748b' }}>by {activity.user}</div>
                  </div>
                  <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 600 }}>{activity.time}</div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="hover-lift" style={{ width: '100%', marginTop: '1.5rem', opacity: 0.5, fontSize: '0.8rem' }}>
              ACCESS ARCHIVES <FiArrowRight size={14} style={{ marginLeft: '0.5rem' }} />
            </Button>
          </Card>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <Card
            variant="glass"
            header={<span style={{ fontWeight: 800, fontSize: '0.8rem', letterSpacing: '1px' }}>SYSTEM HEALTH</span>}
          >
            {[
              { label: 'CPU LOAD', value: '14%', color: 'var(--color-neon-cyan)' },
              { label: 'MEMORY', value: '42%', color: 'var(--color-neon-purple)' },
              { label: 'DB UPTIME', value: '99.9%', color: 'var(--color-neon-emerald)' },
            ].map((stat, i) => (
              <div key={i} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.7rem', fontWeight: 800, color: '#64748b' }}>
                  <span>{stat.label}</span>
                  <span style={{ color: '#0f172a' }}>{stat.value}</span>
                </div>
                <div style={{ height: '4px', background: '#f1f5f9', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: stat.value, background: stat.color, boxShadow: `0 0 10px ${stat.color}` }} />
                </div>
              </div>
            ))}
          </Card>

          <Card variant="dark" style={{ textAlign: 'center', padding: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛡️</div>
            <div style={{ fontWeight: 800, color: '#fff', marginBottom: '0.5rem' }}>SECURITY SHIELD</div>
            <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
              All administrative actions are logged and encrypted using RSA-4096.
            </div>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 0: return <DashboardContent />;
      case 1: return <ManageCompetitions />;
      case 2: return <ManageCategories />;
      case 3: return <ManageUsers filterRole="ADMIN" />;
      case 4: return <ManageUsers filterRole="USER" />;
      case 5: return <ManagePrizePools />;
      case 6: return <PendingRegistrations />;
      default: return <DashboardContent />;
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', background: '#ffffff' }}>
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main style={{ flex: 1, padding: '4rem 3rem', position: 'relative', overflowY: 'auto', maxHeight: '100vh', background: '#ffffff' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1400px', margin: '0 auto' }}>
          <div className="animate-fade-in-down" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '4rem',
            borderLeft: '4px solid var(--color-primary-600)',
            paddingLeft: '2rem'
          }}>
            <div>
              <h1 style={{
                fontSize: '3.5rem',
                fontWeight: 950,
                color: '#0f172a',
                fontFamily: 'var(--font-display)',
                letterSpacing: '-2px',
                lineHeight: 1
              }}>
                TAAKRA <span style={{ color: 'var(--color-primary-600)' }}>CORE</span>
              </h1>
              <p style={{
                fontSize: '0.9rem',
                fontWeight: 800,
                color: '#64748b',
                textTransform: 'uppercase',
                letterSpacing: '4px',
                marginTop: '0.5rem'
              }}>
                Administrative Authority
              </p>
            </div>
          </div>

          <div className="animate-fade-in">
            {renderTabContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboardPage;
