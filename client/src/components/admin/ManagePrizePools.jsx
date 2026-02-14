import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../common/Card';
import { Table } from '../common/Table';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { adminService } from '../../services/admin';

export const ManagePrizePools = () => {
    const navigate = useNavigate();
    const [prizePools, setPrizePools] = useState([]);

    useEffect(() => {
        const fetchPrizePools = async () => {
            try {
                const response = await adminService.getPrizePools();
                setPrizePools(response.data);
            } catch (error) {
                console.error('Error fetching prize pools:', error);
            }
        };
        fetchPrizePools();
    }, []);

    /* Removed Modal Logic */
    const handleDelete = async (id) => {
        if (window.confirm('Delete prize pool?')) {
            try {
                await adminService.deletePrizePool(id);
                setPrizePools(prizePools.filter(p => p._id !== id));
            } catch (error) {
                console.error('Error deleting prize pool:', error);
                alert('Failed to delete prize pool');
            }
        }
    };

    const columns = [
        { label: 'Pool Name', key: 'name', render: (row) => <span style={{ fontWeight: 600, color: '#1f2937' }}>{row.name}</span> },
        { label: 'Amount', key: 'amount', render: (row) => <span style={{ color: '#059669', fontWeight: 700, fontFamily: 'monospace', fontSize: '1rem' }}>${Number(row.amount).toLocaleString()}</span> },
        { label: 'Sponsor', key: 'sponsor', render: (row) => <span style={{ color: '#4b5563' }}>{row.sponsor || '-'}</span> },
        { label: 'Status', key: 'status', render: (row) => <Badge variant={row.status === 'Allocated' ? 'success' : 'warning'}>{row.status}</Badge> },
        {
            label: 'Actions',
            key: 'actions',
            render: (row) => (
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button size="sm" variant="ghost" onClick={() => navigate(`/admin/prizepools/edit/${row._id}`)} style={{ color: '#3b82f6', padding: '0.4rem' }}><FiEdit2 size={16} /></Button>
                    <Button size="sm" variant="ghost" onClick={() => handleDelete(row._id)} style={{ color: '#ef4444', padding: '0.4rem' }}><FiTrash2 size={16} /></Button>
                </div>
            ),
        },
    ];

    return (
        <div style={{ background: '#ffffff', minHeight: '100%' }}>
            {/* Minimalist Page Header */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingBottom: '2rem',
                marginBottom: '2.5rem',
                borderBottom: '1px solid #e5e7eb'
            }}>
                <div>
                    <h3 style={{ fontSize: '1.75rem', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.5px' }}>
                        Prize Pools
                    </h3>
                    <p style={{ color: '#64748b', marginTop: '0.4rem', fontSize: '0.95rem', fontWeight: 500 }}>
                        Manage platform fiscal assets and sponsor allocations.
                    </p>
                </div>
                <Button
                    onClick={() => navigate('/admin/prizepools/new')}
                    style={{
                        background: '#0f172a',
                        color: '#ffffff',
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.5rem',
                        border: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.6rem',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        letterSpacing: '0.5px',
                        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
                    }}
                    className="hover-lift"
                >
                    <FiPlus size={18} /> INITIALIZE NEW POOL
                </Button>
            </div>

            {/* Natural Table Flow */}
            <div style={{ marginTop: '1rem' }}>
                <Table columns={columns} data={prizePools} empty="No prize pools found" />
            </div>
        </div>
    );
};
