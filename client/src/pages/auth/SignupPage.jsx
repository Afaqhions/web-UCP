import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Card } from '../../components/common/Card';
import { Input } from '../../components/common/Input';
import { Button } from '../../components/common/Button';

const SignupPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return setError('Passwords do not match');
    }

    try {
      setError('');
      setLoading(true);
      // Simulate signup
      await new Promise(resolve => setTimeout(resolve, 1000));
      login({
        id: '1',
        name: formData.fullName,
        email: formData.email,
        role: 'user',
        firstName: formData.fullName.split(' ')[0]
      });
      navigate('/dashboard');
    } catch (err) {
      setError('Failed to create an account.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '3rem 1.5rem',
        position: 'relative',
        background: 'var(--color-dark-bg)',
        overflow: 'hidden'
      }}
    >
      {/* Cinematic Background */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none' }}>
        <div className="bg-pattern-dots" style={{ position: 'absolute', inset: 0, opacity: 0.1 }} />
        <div style={{
          position: 'absolute',
          top: '0%',
          right: '0%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--color-primary-900) -50%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.3
        }} />
        <div style={{
          position: 'absolute',
          bottom: '0%',
          left: '0%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, var(--color-accent-900) -50%, transparent 70%)',
          filter: 'blur(100px)',
          opacity: 0.2
        }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '520px' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }} className="animate-fade-in-down">
          <h1 style={{
            fontSize: '3rem',
            fontWeight: 950,
            color: '#fff',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-2px',
            marginBottom: '0.5rem'
          }}>
            ENLIST <span className="gradient-text-neon">NOW</span>
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.4)',
            fontWeight: 800,
            letterSpacing: '2px',
            fontSize: '0.8rem'
          }}>
            JOIN THE NEXT GENERATION OF CREATORS
          </p>
        </div>

        <Card
          variant="dark"
          className="animate-fade-in-up"
          style={{
            padding: '3rem 2.5rem',
            background: 'rgba(11, 13, 23, 0.8)',
            border: '1px solid var(--color-dark-border)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
          }}
        >
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
            {error && (
              <div className="animate-fade-in" style={{
                background: 'rgba(239, 68, 68, 0.1)',
                color: '#f87171',
                padding: '1rem',
                borderRadius: '0.75rem',
                fontSize: '0.85rem',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                fontWeight: 600,
                textAlign: 'center'
              }}>
                {error.toUpperCase()}
              </div>
            )}

            <Input
              label="FULL NAME / CODENAME"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              placeholder="e.g. JANE_DOE"
            />

            <Input
              label="COMMUNICATION CHANNEL"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="operator@taakra.com"
            />

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <Input
                label="SECURITY KEY"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="MIN 8 CHARS"
              />

              <Input
                label="VERIFY KEY"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                placeholder="REPEAT KEY"
              />
            </div>

            <div style={{ marginTop: '0.5rem' }}>
              <label style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', cursor: 'pointer' }}>
                <input type="checkbox" required style={{ marginTop: '0.35rem' }} />
                <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6, fontWeight: 500 }}>
                  I ACCEPT THE <a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>PROTOCOLS</a> AND <a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>PRIVACY_MANIFESTO</a>
                </span>
              </label>
            </div>

            <Button
              type="submit"
              variant="neon"
              size="lg"
              isLoading={loading}
              style={{ width: '100%', height: '56px', fontSize: '1rem', marginTop: '1rem' }}
            >
              {loading ? 'INITIALIZING...' : 'ENLIST IN ARENA'}
            </Button>
          </form>

          <div style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '2rem' }}>
            <span style={{ color: 'rgba(255,255,255,0.3)' }}>ALREADY RECRUITED?</span>{' '}
            <a href="/login" style={{ color: 'var(--color-primary-400)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--color-primary-400)'}>
              AUTHORIZE SESSION
            </a>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SignupPage;
