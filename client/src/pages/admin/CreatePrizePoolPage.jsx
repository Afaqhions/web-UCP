import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/common/Button';

import { Input } from '../../components/common/Input';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const CreatePrizePoolPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        amount: '',
        sponsor: '',
        status: 'Pending'
    });

    useEffect(() => {
        if (isEditMode) {
            const stored = JSON.parse(localStorage.getItem('prizepools_data')) || [];
            const found = stored.find(p => p.id === Number(id));
            if (found) {
                setFormData({ ...found });
            } else {
                navigate('/admin');
            }
        }
    }, [id, isEditMode, navigate]);

    const handleBack = () => {
        navigate('/admin', { state: { activeTab: 4 } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const existing = JSON.parse(localStorage.getItem('prizepools_data')) || [];

        if (isEditMode) {
            const updated = existing.map(p => p.id === Number(id) ? { ...p, ...formData, amount: Number(formData.amount) } : p);
            localStorage.setItem('prizepools_data', JSON.stringify(updated));
        } else {
            const newItem = {
                id: Date.now(),
                ...formData,
                amount: Number(formData.amount)
            };
            localStorage.setItem('prizepools_data', JSON.stringify([...existing, newItem]));
        }

        navigate('/admin', { state: { activeTab: 4 } });
    };

    return (
        <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '6rem 2rem' }}>
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 0,
                    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                }}
            />

            <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '2rem' }}>
                    <Button variant="ghost" onClick={handleBack} style={{ paddingLeft: 0, color: '#64748b' }}>
                        <FiArrowLeft style={{ marginRight: '0.5rem' }} /> Back to Dashboard
                    </Button>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, color: '#0f172a', marginTop: '1rem' }}>
                        {isEditMode ? 'Edit' : 'New'} <span className="gradient-text" style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Prize Pool</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', marginTop: '0.5rem' }}>
                        {isEditMode ? 'Update allocation details.' : 'Allocate funds for competition winners.'}
                    </p>
                </div>

                <div style={{ paddingBottom: '4rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                        <Input
                            label="Pool Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            placeholder="e.g. Summer Grant"
                        />
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
                            <Input
                                label="Amount ($)"
                                type="number"
                                value={formData.amount}
                                onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                required
                                placeholder="1000"
                            />
                            <Input
                                label="Sponsor / Source"
                                value={formData.sponsor}
                                onChange={(e) => setFormData({ ...formData, sponsor: e.target.value })}
                                placeholder="e.g. Company Inc."
                            />
                        </div>

                        <div>
                            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.6rem',
                                    border: '2px solid #e5e7eb',
                                    fontSize: '0.95rem',
                                    outline: 'none',
                                    background: '#fff'
                                }}
                            >
                                <option value="Pending">Pending</option>
                                <option value="Allocated">Allocated</option>
                                <option value="Distributed">Distributed</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                            <Button type="button" variant="outline" onClick={handleBack}>Cancel</Button>
                            <Button
                                type="submit"
                                style={{
                                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                                    color: 'white',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <FiSave /> {isEditMode ? 'Update Pool' : 'Create Pool'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreatePrizePoolPage;
