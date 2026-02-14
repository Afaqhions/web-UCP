import React from 'react';
import { Spinner } from '../common/Spinner';
import { CompetitionCard } from './CompetitionCard';

export const CompetitionList = ({ competitions = [], loading = false, onRegister }) => {
  if (loading) {
    return (
      <div style={{ padding: '4rem 0', textAlign: 'center' }}>
        <Spinner size="lg" />
      </div>
    );
  }

  if (!competitions || competitions.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6b7280' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.5 }}>🔍</div>
        <p style={{ fontSize: '1.2rem', fontWeight: 500 }}>No competitions found</p>
        <p style={{ fontSize: '0.95rem', marginTop: '0.5rem' }}>Try adjusting your filters</p>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', // Reduced min-width slightly for tighter grid
        gap: '1.5rem', // Reduced gap for cleaner list view
      }}
    >
      {competitions.map((comp) => (
        <div key={comp.id} className="animate-fade-in-up">
          <CompetitionCard
            competition={comp}
            onRegister={onRegister}
          />
        </div>
      ))}
    </div>
  );
};
