import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Table } from '../common/Table';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

export const ManageCompetitions = () => {
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState([]);

  // Load initial data from local storage or defaults
  useEffect(() => {
    const stored = localStorage.getItem('competitions_data');
    if (stored) {
      setCompetitions(JSON.parse(stored));
    } else {
      setCompetitions([]);
      // localStorage.setItem('competitions_data', JSON.stringify([])); 
    }
  }, []);

  const updateCompetitions = (newCompetitions) => {
    setCompetitions(newCompetitions);
    localStorage.setItem('competitions_data', JSON.stringify(newCompetitions));
  };

  // Cleanup Modal state and handlers
  const handleDelete = (id) => {
    if (window.confirm('Delete competition?')) {
      const filtered = competitions.filter(c => c.id !== id);
      setCompetitions(filtered); // Update state directly
      localStorage.setItem('competitions_data', JSON.stringify(filtered));
    }
  };

  const columns = [
    { label: 'Title', key: 'title', render: (row) => <span style={{ fontWeight: 600, color: '#1f2937' }}>{row.title}</span> },
    { label: 'Category', key: 'category', render: (row) => <span style={{ color: '#4b5563' }}>{row.category}</span> },
    { label: 'Prize Pool', key: 'prizePool', render: (row) => <span style={{ fontFamily: 'monospace', fontWeight: 600 }}>${Number(row.prizePool)?.toLocaleString()}</span> },
    { label: 'Status', key: 'status', render: (row) => <Badge variant={row.status === 'active' ? 'success' : 'neutral'}>{row.status}</Badge> },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => navigate(`/admin/competitions/edit/${row.id}`)}
            style={{ color: '#3b82f6', padding: '0.4rem' }}
          >
            <FiEdit2 size={16} />
          </Button>
          <Button
            size="sm"
            variant="ghost"
            onClick={() => handleDelete(row.id)}
            style={{ color: '#ef4444', padding: '0.4rem' }}
          >
            <FiTrash2 size={16} />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card variant="glass" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.75rem' }}>🏆</span> Manage Competitions
          </h3>
          <p style={{ color: '#6b7280', marginTop: '0.25rem', fontSize: '0.95rem' }}>Oversee all tournaments and challenges.</p>
        </div>
        <Button
          onClick={() => navigate('/admin/competitions/new')}
          style={{
            background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(59, 130, 246, 0.4)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600
          }}
          className="hover-lift"
        >
          <FiPlus size={20} /> Create Competition
        </Button>
      </div>

      <Table columns={columns} data={competitions} empty="No competitions found" />
    </Card>
  );
};
