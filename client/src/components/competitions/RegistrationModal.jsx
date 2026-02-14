import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const RegistrationModal = ({ isOpen, onClose, competition, onSubmit }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bio: '',
    portfolio: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Simulate async call
    try {
      if (!formData.fullName || !formData.email) throw new Error('Please fill in required fields');
      await new Promise(resolve => setTimeout(resolve, 1500));
      await onSubmit?.(formData);
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={competition ? `Register for ${competition.title}` : 'Register'}
      size="md"
      footer={
        <>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} isLoading={loading}>
            Confirm Registration
          </Button>
        </>
      }
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {error && (
          <div
            style={{
              background: '#fee2e2',
              color: '#b91c1c',
              padding: '0.75rem',
              borderRadius: '0.5rem',
              fontSize: '0.9rem',
              border: '1px solid #fecaca',
            }}
          >
            {error}
          </div>
        )}

        <Input
          label="Full Name"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          required
          placeholder="John Doe"
        />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="john@example.com"
          />
          <Input
            label="Phone"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 600,
              color: '#374151',
              marginBottom: '0.4rem'
            }}
          >
            Bio / Motivation
          </label>
          <textarea
            name="bio"
            rows={3}
            value={formData.bio}
            onChange={handleChange}
            placeholder="Briefly describe why you want to participate..."
            style={{
              width: '100%',
              padding: '0.75rem',
              borderRadius: '0.6rem',
              border: '2px solid #e5e7eb',
              fontSize: '0.95rem',
              fontFamily: 'inherit',
              outline: 'none',
              resize: 'vertical',
              minHeight: '80px',
            }}
            onFocus={(e) => (e.target.style.borderColor = '#7c3aed')}
            onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
          />
        </div>

        <Input
          label="Portfolio URL (Optional)"
          type="url"
          name="portfolio"
          value={formData.portfolio}
          onChange={handleChange}
          placeholder="https://github.com/johndoe"
        />
      </form>
    </Modal>
  );
};
