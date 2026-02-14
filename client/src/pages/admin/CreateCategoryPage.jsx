
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

import { FiArrowLeft, FiSave } from 'react-icons/fi';

const CreateCategoryPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL
    const isEditMode = !!id;

    const [formData, setFormData] = useState({
        name: '',
        icon: ''
    });

    useEffect(() => {
        if (isEditMode) {
            const stored = JSON.parse(localStorage.getItem('categories_data')) || [];
            const found = stored.find(c => c.id === Number(id));
            if (found) {
                setFormData({ name: found.name, icon: found.icon });
            } else {
                navigate('/admin');
            }
        }
    }, [id, isEditMode, navigate]);

    const handleBack = () => {
        navigate('/admin', { state: { activeTab: 2 } });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const existing = JSON.parse(localStorage.getItem('categories_data')) || [];

        if (isEditMode) {
            const updated = existing.map(c => c.id === Number(id) ? { ...c, ...formData } : c);
            localStorage.setItem('categories_data', JSON.stringify(updated));
        } else {
            const newItem = {
                id: Date.now(),
                count: 0, // Default for new
                ...formData
            };
            localStorage.setItem('categories_data', JSON.stringify([...existing, newItem]));
        }

        navigate('/admin', { state: { activeTab: 2 } });
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
                        {isEditMode ? 'Edit' : 'Add New'} <span className="gradient-text" style={{ background: 'linear-gradient(135deg, #8b5cf6, #ec4899)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Category</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', marginTop: '0.5rem' }}>
                        {isEditMode ? 'Update category details.' : 'Define tags for organizing competitions.'}
                    </p>
                </div>

                <div style={{ paddingBottom: '4rem' }}>
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'white', padding: '2rem', borderRadius: '1rem', border: '1px solid #e2e8f0' }}>
                        <Input
                            label="Category Name"
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            required
                            placeholder="e.g. Data Science"
                        />
                        <Input
                            label="Icon Emoji"
                            value={formData.icon}
                            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                            required
                            placeholder="e.g. 📊"
                            description="Paste an emoji to represent this category."
                        />
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '2rem' }}>
                            <Button type="button" variant="outline" onClick={handleBack}>Cancel</Button>
                            <Button
                                type="submit"
                                style={{
                                    background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)',
                                    color: 'white',
                                    border: 'none',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem'
                                }}
                            >
                                <FiSave /> {isEditMode ? 'Update Category' : 'Save Category'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default CreateCategoryPage;
