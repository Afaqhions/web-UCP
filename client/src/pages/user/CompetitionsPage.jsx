import React, { useState } from 'react';
import { CompetitionFilters } from '../../components/competitions/CompetitionFilters';
import { CompetitionList } from '../../components/competitions/CompetitionList';
import { RegistrationModal } from '../../components/competitions/RegistrationModal';
import { Card } from '../../components/common/Card';

const CompetitionsPage = () => {
  /* Load competitions from localStorage (populated by Admin) */
  const [competitions] = useState(() => {
    const saved = localStorage.getItem('competitions_data');
    return saved ? JSON.parse(saved) : [];
  });

  const [filteredCompetitions, setFilteredCompetitions] = useState(competitions);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCompetition, setSelectedCompetition] = useState(null);

  const handleFilter = (filters) => {
    let result = [...competitions];

    if (filters.search) {
      result = result.filter((c) =>
        c.title.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    if (filters.categories && filters.categories.length > 0) {
      result = result.filter((c) => filters.categories.includes(c.category));
    }

    if (filters.status && filters.status !== 'all') {
      result = result.filter((c) => c.status === filters.status);
    }

    setFilteredCompetitions(result);
  };

  const handleRegister = (competitionId) => {
    const comp = competitions.find((c) => c.id === competitionId);
    setSelectedCompetition(comp);
    setIsModalOpen(true);
  };

  const handleRegistrationSubmit = async (formData) => {
    console.log('Registering:', formData);
    setIsModalOpen(false);
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

        {/* Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }} className="animate-fade-in-up">
          <h1
            style={{
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
              fontWeight: 800,
              color: '#1f2937',
              marginBottom: '1rem',
              lineHeight: 1.1
            }}
          >
            Explore <span className="gradient-text">Competitions</span>
          </h1>
          <p style={{ fontSize: '1.25rem', color: '#6b7280', maxWidth: '700px', margin: '0 auto' }}>
            Discover amazing competitions, showcase your talents, and win exciting prizes.
          </p>
        </div>

        {/* Featured Card (Full Width) */}
        <div style={{ marginBottom: '2rem' }} className="animate-fade-in-up">
          <Card
            variant="glass"
            style={{
              background: 'linear-gradient(135deg, rgba(239, 246, 255, 0.95), rgba(236, 254, 255, 0.95))',
              display: 'flex',
              flexDirection: 'column', // Stack on mobile
              md: { flexDirection: 'row' }, // We need media queries logic or global css utility. 
              // Inline workaround for responsiveness is limited, but we'll use flex-wrap
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '2.5rem',
              gap: '2rem'
            }}
          >
            <div style={{ flex: '1 1 300px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                <span style={{ background: '#f59e0b', color: '#fff', fontSize: '0.75rem', fontWeight: 700, padding: '0.2rem 0.6rem', borderRadius: '99px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Featured Event</span>
                <span style={{ fontSize: '0.9rem', color: '#6b7280', fontWeight: 600 }}>Ending Soon</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, color: '#1f2937', marginBottom: '0.5rem', lineHeight: 1.2 }}>
                Web Development Championship 2024
              </h3>
              <p style={{ fontSize: '1.1rem', color: '#4b5563', maxWidth: '600px', lineHeight: 1.6 }}>
                Join over 200 developers in our biggest contest of the year! Build the future of web and win big.
              </p>
            </div>
            <div style={{ textAlign: 'right', flex: '0 0 280px' }}>
              <div style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', fontWeight: 800 }} className="gradient-text">$5,000</div>
              <div style={{ fontSize: '1rem', fontWeight: 600, color: '#6b7280', marginTop: '-0.5rem' }}>Total Prize Pool</div>
              <button
                onClick={() => handleRegister(1)}
                className="hover-lift"
                style={{
                  marginTop: '1.5rem',
                  padding: '0.75rem 2rem',
                  background: '#111827',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '0.75rem',
                  fontWeight: 600,
                  fontSize: '1rem',
                  cursor: 'pointer'
                }}
              >
                Register Now
              </button>
            </div>
          </Card>
        </div>

        {/* Filters Bar (Full Width, below Featured) */}
        <div style={{ marginBottom: '2rem', position: 'relative', zIndex: 50 }} className="animate-fade-in-up">
          <CompetitionFilters onFilter={handleFilter} />
        </div>

        {/* Competitions Grid (Full Width) */}
        <div style={{ marginBottom: '4rem' }}>
          <CompetitionList
            competitions={filteredCompetitions}
            onRegister={handleRegister}
          />
        </div>

      </div>

      <RegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        competition={selectedCompetition}
        onSubmit={handleRegistrationSubmit}
      />
    </div>
  );
};

export default CompetitionsPage;
