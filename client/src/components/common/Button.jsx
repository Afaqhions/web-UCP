import React from 'react';

export const Button = React.forwardRef(
  (
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      disabled = false,
      onClick,
      children,
      className = '',
      style: customStyle = {},
      ...props
    },
    ref
  ) => {
    const isPrimary = variant === 'primary' || variant === 'neon';

    const variantStyles = {
      primary: {
        background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))',
        color: '#fff',
        boxShadow: '0 4px 14px rgba(99, 102, 241, 0.35)',
      },
      secondary: {
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        color: '#fff',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      },
      outline: {
        background: 'transparent',
        color: 'var(--color-primary-400)',
        border: '2px solid var(--color-primary-500)',
      },
      neon: {
        background: 'linear-gradient(135deg, var(--color-primary-500), #ec4899)',
        color: '#fff',
        fontWeight: 800,
        boxShadow: '0 0 20px rgba(99, 102, 241, 0.4)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
      },
      danger: {
        background: 'linear-gradient(135deg, #ef4444, #b91c1c)',
        color: '#fff',
      },
      success: {
        background: 'linear-gradient(135deg, #10b981, #047857)',
        color: '#fff',
      },
      ghost: {
        background: 'transparent',
        color: 'inherit',
        border: 'none',
        boxShadow: 'none',
      }
    };

    const sizeStyles = {
      sm: { padding: '0.5rem 1rem', fontSize: '0.8rem' },
      md: { padding: '0.75rem 1.75rem', fontSize: '0.9rem' },
      lg: { padding: '1rem 2.5rem', fontSize: '1.05rem' },
    };

    const style = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      borderRadius: '0.8rem',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.6 : 1,
      gap: '0.6rem',
      position: 'relative',
      overflow: 'hidden',
      border: 'none',
      ...sizeStyles[size],
      ...variantStyles[variant],
      ...customStyle,
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        onClick={onClick}
        className={`smooth-transition hover-lift group ${className}`}
        style={style}
        {...props}
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
          style={{ background: 'white' }}
        />
        {isLoading ? (
          <span className="flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            Loading...
          </span>
        ) : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
