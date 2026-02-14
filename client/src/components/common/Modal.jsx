import React, { useEffect, useRef } from 'react';
import { Button } from './Button';
import { FiX } from 'react-icons/fi';

export const Modal = ({ isOpen, onClose, title, children, footer, size = 'md' }) => {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const sizes = {
    sm: '400px',
    md: '550px',
    lg: '700px',
    xl: '900px',
    full: '95%',
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
      }}
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="animate-fade-in"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(15, 23, 42, 0.65)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      />

      {/* Modal Content */}
      <div
        ref={modalRef}
        className="animate-scale-in glass-card"
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: sizes[size],
          maxHeight: '90vh',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: '1.25rem',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
          overflow: 'hidden',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          background: 'rgba(255, 255, 255, 0.95)',
        }}
      >
        {/* Header */}
        {title && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
            }}
          >
            <h2
              style={{
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#1f2937',
                background: 'linear-gradient(135deg, #4b5563, #1f2937)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              {title}
            </h2>
            <button
              onClick={onClose}
              style={{
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '0.5rem',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 200ms ease',
                color: '#9ca3af',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.color = '#ef4444';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = '#9ca3af';
              }}
            >
              <FiX size={20} />
            </button>
          </div>
        )}

        {/* Body */}
        <div
          style={{
            padding: '1.5rem 1.75rem',
            overflowY: 'auto',
            color: '#4b5563',
            lineHeight: 1.6,
          }}
        >
          {children}
        </div>

        {/* Footer */}
        {footer !== null && (
          <div
            style={{
              padding: '1.25rem 1.75rem',
              borderTop: '1px solid rgba(0, 0, 0, 0.06)',
              background: 'rgba(249, 250, 251, 0.6)',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '0.75rem',
            }}
          >
            {footer ? (
              footer
            ) : (
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
