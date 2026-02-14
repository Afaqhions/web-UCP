import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Table } from '../common/Table';
import { Button } from '../common/Button';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

export const ManageCategories = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('categories_data');
    if (stored) {
      setCategories(JSON.parse(stored));
    } else {
      setCategories([]);
    }
  }, []);

  /* Removed Modal Logic */
  const handleDelete = (id) => {
    if (window.confirm('Delete this category?')) {
      const updated = categories.filter(c => c.id !== id);
      setCategories(updated);
      localStorage.setItem('categories_data', JSON.stringify(updated));
    }
  };

  const columns = [
    { label: 'Icon', key: 'icon', render: (row) => <span style={{ fontSize: '1.5rem', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' }}>{row.icon}</span> },
    { label: 'Name', key: 'name', render: (row) => <span style={{ fontWeight: 600, color: '#1f2937' }}>{row.name}</span> },
    { label: 'Active Competitions', key: 'count', render: (row) => <span style={{ background: '#f3f4f6', padding: '0.2rem 0.6rem', borderRadius: '99px', fontSize: '0.85rem', fontWeight: 600 }}>{row.count}</span> },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/categories/edit/${row.id}`)} style={{ color: '#3b82f6', padding: '0.4rem' }}><FiEdit2 size={16} /></Button>
          <Button size="sm" variant="ghost" onClick={() => handleDelete(row.id)} style={{ color: '#ef4444', padding: '0.4rem' }}><FiTrash2 size={16} /></Button>
        </div>
      ),
    },
  ];

  return (
    <Card variant="glass" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#111827', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.75rem' }}>📁</span> Categories
          </h3>
          <p style={{ color: '#6b7280', marginTop: '0.25rem', fontSize: '0.95rem' }}>Define competition types and tags.</p>
        </div>
        <Button
          onClick={() => navigate('/admin/categories/new')}
          style={{
            background: 'linear-gradient(135deg, #8b5cf6 0%, #6d28d9 100%)', // Purple theme for categories
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(139, 92, 246, 0.4)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600
          }}
          className="hover-lift"
        >
          <FiPlus size={20} /> Add Category
        </Button>
      </div>
      <Table columns={columns} data={categories} empty="No categories found" />
    </Card>
  );
};
