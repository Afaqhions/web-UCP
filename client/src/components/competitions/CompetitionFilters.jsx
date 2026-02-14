import React, { useState, useRef, useEffect } from 'react';
import { Input } from '../common/Input';
import { Button } from '../common/Button';
import { FiFilter, FiChevronDown, FiSearch, FiX } from 'react-icons/fi';
import { CATEGORY_OPTIONS } from '../../utils/constants';

// Reusable Filter Dropdown Component
const FilterDropdown = ({ label, count, isOpen, onToggle, onClose, children }) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        onClose();
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  return (
    <div ref={dropdownRef} style={{ position: 'relative' }}>
      <button
        onClick={onToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.6rem 1rem',
          background: isOpen ? '#f3f4f6' : '#fff',
          border: '1px solid #e5e7eb',
          borderRadius: '99px',
          fontSize: '0.9rem',
          fontWeight: 500,
          color: isOpen ? '#111827' : '#374151',
          cursor: 'pointer',
          transition: 'all 200ms ease',
        }}
        className="hover:border-gray-400"
      >
        {label}
        {count > 0 && (
          <span style={{ background: '#3b82f6', color: '#fff', fontSize: '0.75rem', padding: '0.1rem 0.4rem', borderRadius: '99px' }}>
            {count}
          </span>
        )}
        <FiChevronDown style={{ transition: 'transform 200ms', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
      </button>

      {isOpen && (
        <div
          className="animate-fade-in-up"
          style={{
            position: 'absolute',
            top: 'calc(100% + 0.5rem)',
            left: 0,
            width: '280px',
            background: '#fff',
            borderRadius: '1rem',
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #e5e7eb',
            zIndex: 50,
            padding: '1rem',
            maxHeight: '400px',
            overflowY: 'auto'
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

export const CompetitionFilters = ({ onFilter }) => {
  const [filters, setFilters] = useState({
    search: '',
    categories: [],
    status: 'all',
  });

  const [openDropdown, setOpenDropdown] = useState(null); // 'categories', 'status', etc.

  const toggleDropdown = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const updateFilters = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter?.(newFilters);
  };

  const handleCategoryChange = (cat) => {
    const newCategories = filters.categories.includes(cat)
      ? filters.categories.filter((c) => c !== cat)
      : [...filters.categories, cat];
    updateFilters('categories', newCategories);
  };

  return (
    <div
      style={{
        background: '#fff',
        borderRadius: '1rem',
        border: '1px solid #e5e7eb',
        padding: '1rem',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '1rem',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        position: 'relative',
        zIndex: 20
      }}
    >
      {/* Search Bar - Flex Grow to take available space or fixed width */}
      <div style={{ flex: '1 1 300px', position: 'relative' }}>
        <FiSearch style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
        <input
          type="text"
          placeholder="Search competitions..."
          value={filters.search}
          onChange={(e) => updateFilters('search', e.target.value)}
          style={{
            width: '100%',
            padding: '0.6rem 1rem 0.6rem 2.5rem',
            borderRadius: '99px',
            border: '1px solid #e5e7eb',
            outline: 'none',
            fontSize: '0.95rem',
            transition: 'border-color 200ms',
          }}
          className="focus:border-blue-500"
        />
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {/* Category Dropdown */}
        <FilterDropdown
          label="Category"
          count={filters.categories.length}
          isOpen={openDropdown === 'categories'}
          onToggle={() => toggleDropdown('categories')}
          onClose={() => setOpenDropdown(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <h4 style={{ fontSize: '0.8rem', fontWeight: 700, color: '#9ca3af', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Select Categories</h4>
            {['Programming', 'Design', 'Marketing', 'Business', 'Writing', 'Video', 'Photography'].map((cat) => (
              <label key={cat} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.25rem 0' }}>
                <input
                  type="checkbox"
                  checked={filters.categories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  style={{ width: '1rem', height: '1rem', accentColor: '#3b82f6', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.9rem', color: '#374151', fontWeight: filters.categories.includes(cat) ? 500 : 400 }}>{cat}</span>
              </label>
            ))}
          </div>
          <div style={{ marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              onClick={() => updateFilters('categories', [])}
              style={{ fontSize: '0.8rem', color: '#6b7280', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
            >
              Clear
            </button>
          </div>
        </FilterDropdown>

        {/* Status Dropdown */}
        <FilterDropdown
          label="Status"
          isOpen={openDropdown === 'status'}
          onToggle={() => toggleDropdown('status')}
          onClose={() => setOpenDropdown(null)}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['All', 'Active', 'Upcoming', 'Completed'].map((status) => (
              <label key={status} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer', padding: '0.25rem 0' }}>
                <input
                  type="radio"
                  name="status_filter"
                  checked={filters.status === status.toLowerCase() || (status === 'All' && filters.status === 'all')}
                  onChange={() => {
                    updateFilters('status', status.toLowerCase());
                    setOpenDropdown(null);
                  }}
                  style={{ width: '1rem', height: '1rem', accentColor: '#3b82f6', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '0.9rem', color: '#374151' }}>{status}</span>
              </label>
            ))}
          </div>
        </FilterDropdown>

        {/* Reset Button */}
        {(filters.categories.length > 0 || filters.status !== 'all' || filters.search) && (
          <button
            onClick={() => {
              setFilters({ search: '', categories: [], status: 'all' });
              onFilter?.({ search: '', categories: [], status: 'all' });
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              color: '#ef4444',
              background: 'none',
              border: 'none',
              fontSize: '0.9rem',
              fontWeight: 500,
              cursor: 'pointer',
              padding: '0 0.5rem'
            }}
          >
            <FiX /> Reset
          </button>
        )}
      </div>
    </div>
  );
};
