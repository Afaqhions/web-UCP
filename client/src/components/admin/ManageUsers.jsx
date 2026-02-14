import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Table } from '../common/Table';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { FiPlus, FiTrash2, FiEdit2 } from 'react-icons/fi';
import { adminService } from '../../services/admin';

export const ManageUsers = ({ filterRole = null }) => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await adminService.getAllUsers();
        let allUsers = response.data;
        if (filterRole) {
          setUsers(allUsers.filter(u => u.role.toUpperCase() === filterRole.toUpperCase()));
        } else {
          setUsers(allUsers);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
    fetchUsers();
  }, [filterRole]);

  /* Removed Modal Logic */
  const handleDelete = async (id) => {
    if (window.confirm('Delete user?')) {
      try {
        await adminService.deleteUser(id);
        setUsers(users.filter(u => u._id !== id));
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  const columns = [
    { label: 'Name', key: 'name', render: (row) => <span style={{ fontWeight: 600, color: '#1f2937' }}>{row.name}</span> },
    { label: 'Email', key: 'email', render: (row) => <span style={{ color: '#4b5563' }}>{row.email}</span> },
    { label: 'Role', key: 'role', render: (row) => <Badge variant={row.role === 'ADMIN' ? 'primary' : 'neutral'}>{row.role}</Badge> },
    { label: 'Status', key: 'status', render: (row) => <span style={{ color: row.status === 'Active' ? '#059669' : '#dc2626', fontWeight: 500 }}>{row.status}</span> },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/users/edit/${row.id}`)} style={{ color: '#3b82f6', padding: '0.4rem' }}><FiEdit2 size={16} /></Button>
          <Button size="sm" variant="ghost" onClick={() => handleDelete(row.id)} style={{ color: '#ef4444', padding: '0.4rem' }}><FiTrash2 size={16} /></Button>
        </div>
      ),
    },
  ];

  return (
    <Card variant="glass" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ fontSize: '1.75rem' }}>👥</span> Users & Admins
          </h3>
          <p style={{ color: '#6b7280', marginTop: '0.25rem', fontSize: '0.95rem' }}>Manage platform access and roles.</p>
        </div>
        <Button
          onClick={() => navigate('/admin/users/new')}
          style={{
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', // Green theme for users
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '0.75rem',
            boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: 600
          }}
          className="hover-lift"
        >
          <FiPlus size={20} /> Create Admin
        </Button>
      </div>
      <Table columns={columns} data={users} empty="No users found" />
    </Card>
  );
};
