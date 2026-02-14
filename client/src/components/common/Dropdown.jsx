import React, { useState, useRef, useEffect } from 'react';

export const Dropdown = ({ trigger, items, align = 'right' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <div ref={dropdownRef} style={{ position: 'relative', display: 'inline-block' }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      >
        {trigger}
      </button>

      {isOpen && (
        <div
          className="animate-fade-in-down glass-card"
          style={{
            position: 'absolute',
            [align === 'right' ? 'right' : 'left']: 0,
            marginTop: '0.5rem',
            minWidth: '180px',
            borderRadius: '0.75rem',
            overflow: 'hidden',
            zIndex: 50,
            boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
          }}
        >
          {items.map((item, index) => (
            <DropdownItem
              key={index}
              onClick={() => {
                item.onClick?.();
                setIsOpen(false);
              }}
            >
              {item.label}
            </DropdownItem>
          ))}
        </div>
      )}
    </div>
  );
};

const DropdownItem = ({ children, onClick }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: '100%',
        textAlign: 'left',
        padding: '0.65rem 1rem',
        background: hovered ? 'rgba(139, 92, 246, 0.06)' : 'transparent',
        border: 'none',
        cursor: 'pointer',
        color: hovered ? '#7c3aed' : '#374151',
        fontSize: '0.9rem',
        fontWeight: 500,
        transition: 'all 150ms ease',
      }}
    >
      {children}
    </button>
  );
};
