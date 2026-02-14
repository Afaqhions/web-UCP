import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { CompetitionForm } from '../../components/admin/CompetitionForm';
import { Button } from '../../components/common/Button';
import { FiArrowLeft } from 'react-icons/fi';

const CreateCompetitionPage = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // Get ID from URL
    const isEditMode = !!id;

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        const storedCats = JSON.parse(localStorage.getItem('categories_data')) || [];
        if (storedCats.length > 0) {
            setCategories(storedCats.map(cat => cat.name));
        } else {
            // Default fallback if no categories exist
            setCategories(['Programming', 'Design', 'Photography', 'Videography', 'Writing', 'Gaming', 'Data Science']);
        }
    }, []);

    const [initialData, setInitialData] = useState(null);

    useEffect(() => {
        if (isEditMode) {
            const stored = JSON.parse(localStorage.getItem('competitions_data')) || [];
            const found = stored.find(c => c.id === Number(id)); // Assuming ID is number
            if (found) {
                setInitialData(found);
            } else {
                navigate('/admin'); // Not found
            }
        }
    }, [id, isEditMode, navigate]);

    const handleBack = () => {
        navigate('/admin', { state: { activeTab: 1 } });
    };

    const handleSubmit = (formData) => {
        const existingComps = JSON.parse(localStorage.getItem('competitions_data')) || [];

        if (isEditMode) {
            // Update
            const updatedComps = existingComps.map(c => c.id === Number(id) ? { ...c, ...formData } : c);
            localStorage.setItem('competitions_data', JSON.stringify(updatedComps));
        } else {
            // Create
            const newComp = {
                id: Date.now(),
                status: 'active',
                registrationCount: 0,
                ...formData
            };
            localStorage.setItem('competitions_data', JSON.stringify([newComp, ...existingComps]));
        }

        navigate('/admin', { state: { activeTab: 1 } });
    };

    if (isEditMode && !initialData) return <div>Loading...</div>;

    return (
        <div style={{ minHeight: '100vh', background: '#ffffff', padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'relative', zIndex: 1, maxWidth: '1000px', margin: '0 auto' }}>
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
                        {isEditMode ? 'MODIFY' : 'INITIALIZE'} <span style={{ color: 'var(--color-primary-600)' }}>COMPETITION</span>
                    </h1>
                    <p style={{ fontSize: '1.1rem', color: '#64748b', marginTop: '0.5rem', fontWeight: 500 }}>
                        {isEditMode ? 'UPDATE OPERATIONAL PARAMETERS.' : 'ESTABLISH THE RULES OF ENGAGEMENT AND REWARDS.'}
                    </p>
                </div>

                <div style={{ paddingBottom: '6rem' }} className="animate-fade-in-up">
                    <Card
                        variant="dark"
                        style={{
                            padding: '3rem',
                            background: 'rgba(11, 13, 23, 0.6)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid var(--color-dark-border)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        <CompetitionForm
                            initialData={initialData}
                            onSubmit={handleSubmit}
                            onCancel={handleBack}
                            categories={categories}
                        />
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateCompetitionPage;
