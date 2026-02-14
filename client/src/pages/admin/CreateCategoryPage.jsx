
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // Import useParams
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';

import { FiArrowLeft, FiSave } from 'react-icons/fi';
import { adminService } from '../../services/admin';

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
            const fetchCategory = async () => {
                try {
                    const response = await adminService.getCategories();
                    const found = response.data.find(c => c._id === id);
                    if (found) {
                        setFormData({ name: found.name, icon: found.icon });
                    } else {
                        navigate('/admin');
                    }
                } catch (error) {
                    console.error('Error fetching category:', error);
                    navigate('/admin');
                }
            };
            fetchCategory();
        }
    }, [id, isEditMode, navigate]);

    const handleBack = () => {
        navigate('/admin', { state: { activeTab: 2 } });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (isEditMode) {
                await adminService.updateCategory(id, formData);
            } else {
                await adminService.createCategory(formData);
            }
            navigate('/admin', { state: { activeTab: 2 } });
        } catch (error) {
            console.error('Error saving category:', error);
            alert('Failed to save category');
        }
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
