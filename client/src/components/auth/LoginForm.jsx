import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const LoginForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'Failed to login');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      variant="dark"
      className="animate-fade-in-up"
      style={{
        maxWidth: '480px',
        width: '100%',
        margin: '0 auto',
        padding: '3.5rem 2.5rem',
        background: 'rgba(11, 13, 23, 0.8)',
        border: '1px solid var(--color-dark-border)',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
      }}
    >
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{
          display: 'inline-flex',
          width: '64px',
          height: '64px',
          background: 'rgba(255,255,255,0.03)',
          borderRadius: '1.25rem',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2rem',
          marginBottom: '1.5rem',
          border: '1px solid rgba(255,255,255,0.08)'
        }}>
          🔐
        </div>
        <h2 style={{
          fontSize: '2.25rem',
          fontWeight: 950,
          fontFamily: 'var(--font-display)',
          marginBottom: '0.75rem',
          color: '#fff',
          letterSpacing: '-1px'
        }}>
          SECURE <span className="gradient-text-neon">ACCESS</span>
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontWeight: 500, letterSpacing: '0.5px' }}>
          ENTER YOUR CREDENTIALS TO SYNC
        </p>
      </div>

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
          label="IDENTIFIER"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="operator@taakra.com"
        />

        <div>
          <Input
            label="SECURITY KEY"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="••••••••••••"
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.75rem' }}>
            <button type="button" style={{
              background: 'none',
              border: 'none',
              color: 'rgba(255,255,255,0.4)',
              fontSize: '0.75rem',
              cursor: 'pointer',
              fontWeight: 700,
              letterSpacing: '1px',
              transition: 'color 0.2s'
            }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.4)'}>
              RECOVER KEY?
            </button>
          </div>
        </div>

        <Button
          type="submit"
          variant="neon"
          size="lg"
          isLoading={loading}
          style={{ width: '100%', height: '56px', fontSize: '1rem', marginTop: '1rem' }}
        >
          {loading ? 'AUTHORIZING...' : 'AUTHORIZE SESSION'}
        </Button>
      </form>

      <div style={{ marginTop: '3rem', textAlign: 'center', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '1px' }}>
        <span style={{ color: 'rgba(255,255,255,0.3)' }}>NEW RECRUIT?</span>{' '}
        <a href="/signup" style={{ color: 'var(--color-primary-400)', textDecoration: 'none', transition: 'color 0.2s' }} onMouseEnter={e => e.target.style.color = '#fff'} onMouseLeave={e => e.target.style.color = 'var(--color-primary-400)'}>
          CREATE ACCOUNT
        </a>
      </div>
    </Card>
  );
};
