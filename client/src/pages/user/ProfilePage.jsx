import React, { useState } from 'react';
import { ProfileForm } from '../../components/dashboard/ProfileForm';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { FiEdit2, FiCamera } from 'react-icons/fi';

const ProfilePage = () => {
  const { user, setUser } = useAuth();
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [stats] = useState({
    competitions: 24,
    wins: 5,
    followers: 342,
    following: 128,
  });

  const handleProfileUpdate = async (formData) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ ...user, ...formData });
    setIsEditingProfile(false);
  };

  return (
    <div style={{ minHeight: '100vh', paddingBottom: '4rem', background: '#f8fafc' }}>
      {/* Premium Header Background */}
      <div
        style={{
          height: '320px',
          background: 'linear-gradient(135deg, #4f46e5, #9333ea)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div
          className="bg-pattern"
          style={{ position: 'absolute', inset: 0, opacity: 0.1 }}
        />
        {/* Decorative Circles */}
        <div style={{ position: 'absolute', top: '20%', right: '10%', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-10%', left: '5%', width: '200px', height: '200px', background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)', borderRadius: '50%' }} />
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem', position: 'relative', marginTop: '-140px', zIndex: 10 }}>

        {/* Profile Card */}
        <Card
          variant="glass"
          className="animate-fade-in-up"
          style={{
            marginBottom: '2rem',
            background: 'rgba(255, 255, 255, 0.95)',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', md: { flexDirection: 'row', alignItems: 'flex-start' } }}>
            {/* Avatar Section */}
            <div style={{ position: 'relative', marginTop: '-4rem' }}>
              <div
                style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '2rem',
                  background: 'linear-gradient(135deg, #e0e7ff, #fae8ff)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '4rem',
                  border: '6px solid #fff',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                }}
              >
                👤
              </div>
              <button
                className="hover-lift"
                style={{
                  position: 'absolute',
                  bottom: '0',
                  right: '-10px',
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: '#fff',
                  border: 'none',
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#4b5563'
                }}
              >
                <FiCamera size={18} />
              </button>
            </div>

            {/* Info Section */}
            <div style={{ flex: 1, textAlign: 'center', width: '100%', '@media (min-width: 768px)': { textAlign: 'left' } }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#1f2937', lineHeight: 1.1, marginBottom: '0.5rem' }}>
                    {user?.firstName} {user?.lastName}
                  </h1>
                  <p style={{ fontSize: '1.1rem', color: '#6b7280', marginBottom: '1.5rem' }}>{user?.email}</p>

                  <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center', '@media (min-width: 768px)': { justifyContent: 'flex-start' } }}>
                    {[
                      { label: '🏆 Level 5', bg: '#eff6ff', color: '#1d4ed8' },
                      { label: '⭐ Pro Member', bg: '#f5f3ff', color: '#7c3aed' },
                      { label: '✅ Verified', bg: '#dcfce7', color: '#15803d' }
                    ].map((badge, idx) => (
                      <span
                        key={idx}
                        style={{
                          padding: '0.35rem 1rem',
                          background: badge.bg,
                          color: badge.color,
                          borderRadius: '99px',
                          fontSize: '0.85rem',
                          fontWeight: 700
                        }}
                      >
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>

                {!isEditingProfile && (
                  <Button onClick={() => setIsEditingProfile(true)} style={{ gap: '0.5rem' }}>
                    <FiEdit2 /> Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>

        {/* Content Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            alignItems: 'start',
            lg: { gridTemplateColumns: '2fr 1fr' }
          }}
          className="profile-layout-grid"
        >
          {/* Left Column */}
          <div style={{ flex: '2 1 0' }}>
            {isEditingProfile ? (
              <Card variant="glass" header={<h3 style={{ fontSize: '1.5rem', fontWeight: 700 }}>Edit Details</h3>}>
                <ProfileForm
                  user={user}
                  onSubmit={handleProfileUpdate}
                  onCancel={() => setIsEditingProfile(false)}
                />
              </Card>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                {/* Stats Row */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
                  {[
                    { label: 'Competitions', value: stats.competitions, color: '#3b82f6', icon: '🏆' },
                    { label: 'Wins', value: stats.wins, color: '#f59e0b', icon: '🥇' },
                    { label: 'Followers', value: stats.followers, color: '#ec4899', icon: '👥' },
                    { label: 'Following', value: stats.following, color: '#10b981', icon: '→' },
                  ].map((stat, idx) => (
                    <Card key={idx} variant="glass" style={{ textAlign: 'center', padding: '1.5rem 0.5rem' }} className="hover-lift">
                      <div style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>{stat.icon}</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: 800, color: stat.color, lineHeight: 1 }}>{stat.value}</div>
                      <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', marginTop: '0.25rem' }}>{stat.label}</div>
                    </Card>
                  ))}
                </div>

                {/* About Card */}
                <Card variant="glass" header={<h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>About Me</h3>}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
                    <div>
                      <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Bio</p>
                      <p style={{ color: '#374151', lineHeight: 1.6 }}>{user?.bio || 'Passionate developer and designer. Always learning and building cool things.'}</p>
                    </div>
                    <div>
                      <div style={{ marginBottom: '1.5rem' }}>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Location</p>
                        <p style={{ color: '#1f2937', fontWeight: 500 }}>{user?.location || 'Not specified'}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.85rem', fontWeight: 600, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Website</p>
                        {user?.website ? (
                          <a href={user.website} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6', textDecoration: 'none', fontWeight: 500 }}>{user.website}</a>
                        ) : (
                          <p style={{ color: '#9ca3af' }}>Not specified</p>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Recent History */}
                <Card variant="glass" header={<h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Recent History</h3>}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                    {[1, 2, 3].map((item, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          padding: '1rem 0',
                          borderBottom: idx === 2 ? 'none' : '1px solid rgba(0,0,0,0.05)'
                        }}
                      >
                        <div>
                          <p style={{ fontWeight: 600, color: '#1f2937' }}>Web Development Championship</p>
                          <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Registered • March {15 + idx}, 2026</p>
                        </div>
                        <Button variant="outline" size="sm">View</Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}
          </div>

          {/* Right Column (Sidebar) */}
          <div style={{ flex: '1 1 0', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <Card variant="gradient" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', marginBottom: '1rem' }}>🏆 Achievements</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  { icon: '🥇', title: 'Gold Worker', desc: 'Won 5+ competitions' },
                  { icon: '🚀', title: 'Early Adopter', desc: 'Joined in beta' },
                  { icon: '💎', title: 'Collector', desc: 'Earned 10+ badges' },
                ].map((ach, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '0.75rem', background: 'rgba(255,255,255,0.6)', borderRadius: '0.75rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>{ach.icon}</div>
                    <div>
                      <p style={{ fontWeight: 700, fontSize: '0.9rem', color: '#1f2937' }}>{ach.title}</p>
                      <p style={{ fontSize: '0.75rem', color: '#6b7280' }}>{ach.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card variant="glass" style={{ padding: '2rem' }}>
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#1f2937', marginBottom: '1rem' }}>🔗 Connect</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {['Twitter', 'LinkedIn', 'GitHub'].map((social, idx) => (
                  <button
                    key={idx}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      border: '1px solid #e5e7eb',
                      background: '#fff',
                      fontWeight: 500,
                      color: '#4b5563',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                    className="hover-lift"
                  >
                    Connect {social}
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      <style>{`
        .profile-layout-grid {
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }
        @media (min-width: 1024px) {
          .profile-layout-grid {
             display: grid;
             grid-template-columns: 2fr 1fr;
             align-items: start;
          }
        }
      `}</style>
    </div>
  );
};

export default ProfilePage;
