import React, { useState } from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const ProfileForm = ({ user, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    bio: user?.bio || '',
    location: user?.location || '',
    website: user?.website || '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await onSubmit(formData);
      setSuccess('Profile updated successfully!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {error && (
        <div
          className="animate-fade-in"
          style={{
            background: 'rgba(254, 226, 226, 0.5)',
            color: '#b91c1c',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid rgba(254, 202, 202, 0.5)',
            fontSize: '0.9rem'
          }}
        >
          {error}
        </div>
      )}

      {success && (
        <div
          className="animate-fade-in"
          style={{
            background: 'rgba(220, 252, 231, 0.5)',
            color: '#15803d',
            padding: '1rem',
            borderRadius: '0.75rem',
            border: '1px solid rgba(187, 247, 208, 0.5)',
            fontSize: '0.9rem'
          }}
        >
          {success}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <Input
          label="First Name"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <Input
          label="Last Name"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
      </div>

      <Input
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        disabled
        style={{ opacity: 0.7 }}
      />

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
          Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          rows="4"
          placeholder="Tell us a little about yourself..."
          style={{
            width: '100%',
            padding: '0.75rem',
            borderRadius: '0.6rem',
            border: '2px solid #e5e7eb',
            fontSize: '0.95rem',
            fontFamily: 'inherit',
            outline: 'none',
            resize: 'vertical',
            minHeight: '100px',
            background: '#fff',
            transition: 'border-color 200ms',
          }}
          onFocus={(e) => (e.target.style.borderColor = '#7c3aed')}
          onBlur={(e) => (e.target.style.borderColor = '#e5e7eb')}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
        <Input
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleChange}
          placeholder="e.g. San Francisco, CA"
        />

        <Input
          label="Website / Portfolio"
          type="url"
          name="website"
          value={formData.website}
          onChange={handleChange}
          placeholder="https://www.linkedin.com/in/username"
        />
      </div>

      <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
        <Button
          type="submit"
          isLoading={loading}
          style={{ flex: 1, justifyContent: 'center' }}
        >
          Save Changes
        </Button>
        {onCancel && (
          <Button
            type="button"
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
};
