import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

// Simple formatters
const formatDate = (date) => new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

export const CompetitionCard = ({ competition, onRegister, isRegistered = false }) => {
  return (
    <div
      className="group"
      style={{
        background: '#fff',
        border: '1px solid #e5e7eb',
        borderRadius: '0.75rem',
        overflow: 'hidden',
        transition: 'all 200ms ease',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        height: '100%',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
        e.currentTarget.style.borderColor = '#d1d5db';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'none';
        e.currentTarget.style.borderColor = '#e5e7eb';
      }}
    >
      {/* Top Banner (Colored stripe based on category) */}
      <div
        style={{
          height: '6px',
          background: competition?.category === 'Design' ? '#ec4899' : competition?.category === 'Programming' ? '#3b82f6' : '#10b981',
          width: '100%'
        }}
      />

      <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
        {/* Header: Icon + Status */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '8px',
              background: '#f3f4f6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}
          >
            {competition?.icon || '🏆'}
          </div>
          {competition?.difficulty && (
            <span style={{ fontSize: '0.75rem', fontWeight: 600, color: '#6b7280', background: '#f9fafb', padding: '0.25rem 0.75rem', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
              {competition.difficulty}
            </span>
          )}
        </div>

        {/* Title & Desc */}
        <div style={{ marginBottom: 'auto' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', marginBottom: '0.5rem', lineHeight: 1.3 }}>
            {competition?.title}
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: 1.5, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {competition?.description}
          </p>
        </div>

        {/* Metadata Grid */}
        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid #f3f4f6', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500, label: 'Deadline' }}>Deadline</p>
            <p style={{ fontSize: '0.9rem', color: '#374151', fontWeight: 600 }}>
              {competition?.deadline ? formatDate(competition.deadline) : 'TBD'}
            </p>
          </div>
          <div>
            <p style={{ fontSize: '0.75rem', color: '#9ca3af', fontWeight: 500 }}>Prize Pool</p>
            <p style={{ fontSize: '0.9rem', color: '#059669', fontWeight: 700 }}>
              {competition?.prize || 'No Prize'}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginTop: '1.25rem' }}>
          <Button
            variant={isRegistered ? 'secondary' : 'primary'}
            size="sm"
            style={{ width: '100%', justifyContent: 'center' }}
            onClick={() => onRegister?.(competition?.id)}
            disabled={isRegistered}
          >
            {isRegistered ? 'Registered' : 'View Details'}
          </Button>
        </div>
      </div>
    </div>
  );
};
