import React from 'react';
import { Card } from '../common/Card';

export const StatsCards = ({ stats = [] }) => {
  const defaultStats = [
    { label: 'Total Competitions', value: '12', icon: '🏆', color: '#3b82f6' },
    { label: 'Wins', value: '3', icon: '🥇', color: '#f59e0b' },
    { label: 'Participations', value: '28', icon: '👥', color: '#10b981' },
    { label: 'Followers', value: '156', icon: '⭐', color: '#8b5cf6' },
  ];

  const displayStats = stats.length > 0 ? stats : defaultStats;

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '1.5rem',
      }}
    >
      {displayStats.map((stat, idx) => (
        <StatCard key={idx} stat={stat} delay={idx * 0.1} />
      ))}
    </div>
  );
};

const StatCard = ({ stat, delay }) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Card
      variant="glass"
      className="animate-fade-in-up"
      style={{
        padding: '2rem 1.5rem',
        textAlign: 'center',
        animationDelay: `${delay}s`,
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 20px 40px -5px rgba(0,0,0,0.1)'
          : '0 4px 6px -1px rgba(0,0,0,0.05)',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        <div
          style={{
            fontSize: '3rem',
            lineHeight: 1,
            marginBottom: '0.5rem',
            transition: 'transform 300ms ease',
            transform: hovered ? 'scale(1.15) rotate(6deg)' : 'scale(1) rotate(0)',
          }}
        >
          {stat.icon}
        </div>

        <div>
          <div
            style={{
              fontSize: '2.5rem',
              fontWeight: 800,
              color: '#1f2937',
              marginBottom: '0.25rem',
              background: hovered
                ? 'linear-gradient(135deg, #3b82f6, #8b5cf6)'
                : 'linear-gradient(135deg, #1f2937, #4b5563)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              transition: 'all 300ms ease',
            }}
          >
            {stat.value}
          </div>
          <div
            style={{
              fontSize: '0.8rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#6b7280',
            }}
          >
            {stat.label}
          </div>
        </div>

        {/* Decorative underline on hover */}
        <div
          style={{
            width: hovered ? '40%' : '0%',
            height: '3px',
            background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
            borderRadius: '99px',
            transition: 'width 300ms ease',
            marginTop: '0.5rem',
            opacity: 0.8,
          }}
        />
      </div>
    </Card>
  );
};
