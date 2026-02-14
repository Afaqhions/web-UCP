import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

// Simple formatter
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
};

export const MyCompetitionsList = ({ competitions = [] }) => {
  const navigate = useNavigate();

  return (
    <Card
      header={<h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>My Competitions</h3>}
      className="animate-fade-in-up"
      style={{ animationDelay: '0.1s' }}
    >
      {competitions.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: '#6b7280' }}>
          <div style={{ fontSize: '2rem', marginBottom: '0.5rem', opacity: 0.5 }}>📂</div>
          <p>No competitions registered yet</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {competitions.map((comp, idx) => (
            <div
              key={comp.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1rem 0',
                borderBottom: idx === competitions.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.05)',
              }}
            >
              <div>
                <h4 style={{ fontWeight: 600, color: '#1f2937', marginBottom: '0.25rem' }}>{comp.title}</h4>
                <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Deadline: {formatDate(comp.deadline)}</p>
              </div>
              <Badge variant={comp.status === 'active' ? 'success' : 'warning'}>{comp.status}</Badge>
            </div>
          ))}
        </div>
      )}
      <div style={{ marginTop: '1.5rem' }}>
        <Button
          variant="outline"
          style={{ width: '100%', justifyContent: 'center' }}
          onClick={() => navigate('/competitions')}
        >
          Browse More
        </Button>
      </div>
    </Card>
  );
};
