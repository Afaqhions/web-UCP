import React from 'react';

export const Spinner = ({ size = 'md', className = '', color = '#3b82f6' }) => {
  const sizes = {
    sm: { width: '1.25rem', height: '1.25rem', borderWidth: '2px' },
    md: { width: '2rem', height: '2rem', borderWidth: '3px' },
    lg: { width: '3rem', height: '3rem', borderWidth: '4px' },
    xl: { width: '4rem', height: '4rem', borderWidth: '5px' },
  };

  const style = {
    display: 'inline-block',
    ...sizes[size],
    borderRadius: '50%',
    borderStyle: 'solid',
    borderColor: 'rgba(229, 231, 235, 0.4)',
    borderTopColor: color,
    animation: 'spin 1s linear infinite',
  };

  return (
    <div className={className} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={style} />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
