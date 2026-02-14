import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/common/Button';

import { Input } from '../../components/common/Input';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const CreateUserPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'ADMIN' // Default role
    });

    useEffect(() => {
        if (isEditMode) {
            const stored = JSON.parse(localStorage.getItem('users_data')) || [];
            const found = stored.find(u => u.id === Number(id));
            if (found) {
                // Password usually shouldn't be populated for edit, but for mock purposes we keep it or leave blank
                setFormData({ name: found.name, email: found.email, password: found.password || '', role: found.role });
            } else {
                navigate('/admin');
            }
        }
    }, [id, isEditMode, navigate]);

    const handleBack = () => {
        navigate('/admin', { state: { activeTab: 3 } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const existing = JSON.parse(localStorage.getItem('users_data')) || [];

        if (isEditMode) {
            const updated = existing.map(u => u.id === Number(id) ? { ...u, ...formData } : u);
            localStorage.setItem('users_data', JSON.stringify(updated));
        } else {
            const newItem = {
                id: Date.now(),
                status: 'Active',
                ...formData
            };
            localStorage.setItem('users_data', JSON.stringify([...existing, newItem]));
        }

        navigate('/admin', { state: { activeTab: 3 } });
    };

    return (
        <div style={{ minHeight: '100vh', background: '#ffffff', padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '800px', margin: '0 auto' }}>
                <div style={{ marginBottom: '3.5rem' }} className="animate-fade-in-down">
                    <Button variant="ghost" onClick={handleBack} className="hover-lift" style={{ paddingLeft: 0, color: '#64748b', fontWeight: 800, letterSpacing: '2px' }}>
                        <FiArrowLeft style={{ marginRight: '0.75rem' }} /> BACK TO COMMAND
                    </Button>
                    <h1 style={{
                        fontSize: '3.5rem',
                        fontWeight: 950,
                        color: '#0f172a',
                        marginTop: '1.5rem',
                        fontFamily: 'var(--font-display)',
                        letterSpacing: '-2px'
                    }}>
                        {isEditMode ? 'MODIFY' : 'ENLIST'} <span style={{ color: 'var(--color-primary-600)' }}>PERSONNEL</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', marginTop: '0.5rem', fontWeight: 500 }}>
                        {isEditMode ? 'UPDATE SECURITY CLEARANCE AND DETAILS.' : 'AUTHORIZE NEW ADMINISTRATIVE ASSETS.'}
                    </p>
                </div>

                <div style={{ paddingBottom: '6rem' }} className="animate-fade-in-up">
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '2rem',
                            background: 'rgba(11, 13, 23, 0.6)',
                            backdropFilter: 'blur(20px)',
                            padding: '3rem',
                            borderRadius: '2rem',
                            border: '1px solid var(--color-dark-border)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        <Input
                            label="DISPLAY NAME"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            placeholder="e.g. OPERATOR_01"
                        />
                        <Input
                            label="SECURE EMAIL"
                            type="email"
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            required
                            placeholder="operator@taakra.com"
                        />
                        <Input
                            label="ACCESS KEY"
                            type="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            placeholder="ENTER SECURITY KEY"
                        />

                        <div>
                            <label style={{
                                display: 'block',
                                fontSize: '0.75rem',
                                fontWeight: 800,
                                color: 'rgba(255,255,255,0.4)',
                                marginBottom: '0.75rem',
                                letterSpacing: '1.5px',
                                textTransform: 'uppercase'
                            }}>
                                ACCESS LEVEL
                            </label>
                            <select
                                value={formData.role}
                                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '0 1.25rem',
                                    borderRadius: '1rem',
                                    background: 'rgba(255, 255, 255, 0.03)',
                                    border: '1px solid rgba(255, 255, 255, 0.1)',
                                    fontSize: '0.95rem',
                                    fontFamily: 'inherit',
                                    outline: 'none',
                                    color: '#fff',
                                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                                    height: '56px',
                                    appearance: 'none',
                                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='rgba(255,255,255,0.3)' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                                    backgroundPosition: 'right 1.25rem center',
                                    backgroundRepeat: 'no-repeat',
                                    backgroundSize: '1.25rem 1.25rem',
                                    paddingRight: '2.5rem',
                                    fontWeight: 600
                                }}
                                onFocus={(e) => {
                                    e.target.style.borderColor = 'var(--color-primary-500)';
                                    e.target.style.background = 'rgba(255,255,255,0.06)';
                                }}
                                onBlur={(e) => {
                                    e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                                    e.target.style.background = 'rgba(255, 255, 255, 0.03)';
                                }}
                            >
                                <option value="ADMIN" style={{ background: '#0b0d17' }}>ADMINSTRATOR</option>
                                <option value="USER" style={{ background: '#0b0d17' }}>OPERATOR</option>
                            </select>
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1.5rem', marginTop: '2rem' }}>
                            <Button type="button" variant="secondary" onClick={handleBack} style={{ minWidth: '140px', height: '56px', fontWeight: 800 }}>
                                ABORT
                            </Button>
                            <Button
                                type="submit"
                                variant="neon"
                                style={{
                                    minWidth: '200px',
                                    height: '56px',
                                    fontWeight: 800,
                                    fontSize: '1rem'
                                }}
                            >
                                <FiSave style={{ marginRight: '0.75rem' }} /> {isEditMode ? 'UPDATE ASSET' : 'AUTHORIZE ASSET'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateUserPage;
