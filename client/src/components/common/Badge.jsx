import React from 'react';

export const Badge = ({ children, variant = 'primary', size = 'md', className = '', style: customStyle = {} }) => {
  const variantStyles = {
    primary: {
      background: 'rgba(239, 246, 255, 0.8)',
      color: '#1d4ed8',
      border: '1px solid rgba(191, 219, 254, 0.5)',
    },
    success: {
      background: 'rgba(236, 253, 245, 0.8)',
      color: '#047857',
      border: '1px solid rgba(167, 243, 208, 0.5)',
    },
    warning: {
      background: 'rgba(255, 251, 235, 0.8)',
      color: '#b45309',
      border: '1px solid rgba(253, 230, 138, 0.5)',
    },
    danger: {
      background: 'rgba(254, 242, 242, 0.8)',
      color: '#b91c1c',
      border: '1px solid rgba(254, 202, 202, 0.5)',
    },
    gray: {
      background: 'rgba(243, 244, 246, 0.8)',
      color: '#374151',
      border: '1px solid rgba(229, 231, 235, 0.5)',
    },
    neon: {
      background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.1), rgba(236, 72, 153, 0.1))',
      color: '#7c3aed',
      border: '1px solid rgba(167, 139, 250, 0.3)',
      fontWeight: 700,
    },
  };

  const sizeStyles = {
    sm: { padding: '0.15rem 0.5rem', fontSize: '0.75rem' },
    md: { padding: '0.25rem 0.75rem', fontSize: '0.85rem' },
    lg: { padding: '0.5rem 1rem', fontSize: '0.95rem' },
  };

  return (
    <span
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
        fontWeight: 600,
        ...variantStyles[variant],
        ...sizeStyles[size],
        ...customStyle,
      }}
    >
      {children}
    </span>
  );
};
