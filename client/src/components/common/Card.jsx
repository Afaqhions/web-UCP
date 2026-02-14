import React from 'react';

export const Card = React.forwardRef(
  (
    {
      children,
      className = '',
      header,
      footer,
      hoverable = false,
      clickable = false,
      onClick,
      variant = 'default',
      style: customStyle = {},
      ...props
    },
    ref
  ) => {
    const variantStyles = {
      default: {
        background: '#ffffff',
        border: '1px solid #e2e8f0',
        color: '#1e293b',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
      },
      glass: {
        background: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 255, 255, 0.5)',
        color: '#1e293b',
        boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.05)',
      },
      gradient: {
        background: 'linear-gradient(135deg, #ffffff, #f1f5f9)',
        border: '1px solid #e2e8f0',
        color: '#1e293b',
        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)',
      },
      dark: {
        background: '#0f172a',
        border: '1px solid #1e293b',
        color: '#f8fafc',
      },
      premium: {
        background: '#ffffff',
        border: '1px solid rgba(99, 102, 241, 0.1)',
        color: '#0f172a',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.05)',
      }
    };

    const style = {
      borderRadius: '1.25rem',
      overflow: 'hidden',
      transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: clickable || hoverable ? 'pointer' : 'default',
      position: 'relative',
      ...variantStyles[variant],
      ...customStyle,
    };

    return (
      <div
        ref={ref}
        onClick={onClick}
        className={`${hoverable ? 'hover-lift hover-glow' : ''} smooth-transition-slow ${className}`}
        style={style}
        {...props}
      >
        {header && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'linear-gradient(to right, rgba(255, 255, 255, 0.05), transparent)',
            }}
          >
            {header}
          </div>
        )}
        <div style={{ padding: '1.5rem' }}>{children}</div>
        {footer && (
          <div
            style={{
              padding: '1.25rem 1.5rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              background: 'rgba(0, 0, 0, 0.1)',
            }}
          >
            {footer}
          </div>
        )}
      </div>
    );
  }
);

Card.displayName = 'Card';
