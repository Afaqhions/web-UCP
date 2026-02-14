import React, { useState, useEffect } from 'react';
import { Card } from '../common/Card';
import { Input } from '../common/Input';
import { Button } from '../common/Button';

export const CompetitionForm = ({ onSubmit, initialData = null, onCancel, categories = [] }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    startDate: '',
    endDate: '',
    prizePool: '',
    rules: '',
  });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  const textareaStyle = {
    width: '100%',
    padding: '1rem 1.25rem',
    borderRadius: '1rem',
    background: 'rgba(255, 255, 255, 0.03)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    color: '#fff',
    fontSize: '0.95rem',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    minHeight: '120px',
    resize: 'vertical',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.75rem',
    fontWeight: 800,
    color: 'rgba(255,255,255,0.4)',
    marginBottom: '0.75rem',
    letterSpacing: '1.5px',
    textTransform: 'uppercase'
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      <Input
        label="OPERATIONAL TITLE"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Enter mission objective..."
      />

      <div>
        <label style={labelStyle}>
          MISSION DEBRIEF <span style={{ color: 'var(--color-accent-500)' }}>*</span>
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
          placeholder="Detailed operational parameters..."
          style={textareaStyle}
          className="focus-glow transition-all"
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--color-primary-500)';
            e.target.style.background = 'rgba(255,255,255,0.06)';
            e.target.style.boxShadow = '0 0 15px rgba(99, 102, 241, 0.15)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.background = 'rgba(255, 255, 255, 0.03)';
            e.target.style.boxShadow = 'none';
          }}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <label style={labelStyle}>
            SECTOR CATEGORY <span style={{ color: 'var(--color-accent-500)' }}>*</span>
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
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
            <option value="" disabled style={{ background: '#0b0d17' }}>SELECT SECTOR</option>
            {categories.map((cat) => (
              <option key={cat} value={cat} style={{ background: '#0b0d17' }}>{cat.toUpperCase()}</option>
            ))}
          </select>
        </div>

        <Input
          label="BOUNTY POOL ($)"
          type="number"
          name="prizePool"
          value={formData.prizePool}
          onChange={handleChange}
          required
          placeholder="QUANTIFY REWARDS"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <Input
          label="DEPLOYMENT TIMESTAMP"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          required
        />
        <Input
          label="TERMINATION TIMESTAMP"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label style={labelStyle}>
          ENGAGEMENT PROTOCOLS
        </label>
        <textarea
          name="rules"
          value={formData.rules}
          onChange={handleChange}
          placeholder="Establish rules of engagement..."
          style={textareaStyle}
          onFocus={(e) => {
            e.target.style.borderColor = 'var(--color-primary-500)';
            e.target.style.background = 'rgba(255,255,255,0.06)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            e.target.style.background = 'rgba(255, 255, 255, 0.03)';
          }}
        />
      </div>

      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
        <Button type="button" variant="secondary" onClick={onCancel} style={{ flex: 1, height: '56px', fontWeight: 800 }}>
          ABORT
        </Button>
        <Button type="submit" variant="neon" isLoading={loading} style={{ flex: 1, height: '56px', fontWeight: 800 }}>
          {initialData ? 'RECONFIRM PARAMETERS' : 'INITIALIZE MISSION'}
        </Button>
      </div>
    </form>
  );
};
