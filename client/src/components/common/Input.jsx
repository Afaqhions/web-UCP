import React, { useState } from 'react';

export const Input = React.forwardRef(
  (
    {
      label,
      error,
      type = 'text',
      size = 'md',
      variant = 'outline',
      icon: Icon,
      description,
      disabled = false,
      className = '',
      style: customStyle = {},
      ...props
    },
    ref
  ) => {
    const [focused, setFocused] = useState(false);

    const sizeMap = {
      sm: { fontSize: '0.8rem', py: '0.5rem', px: '1rem' },
      md: { fontSize: '0.9rem', py: '0.75rem', px: '1.25rem' },
      lg: { fontSize: '1rem', py: '0.9rem', px: '1.5rem' },
    };

    const { fontSize, py, px } = sizeMap[size];

    const inputStyle = {
      width: '100%',
      fontSize,
      paddingTop: py,
      paddingBottom: py,
      paddingLeft: Icon ? '2.75rem' : px,
      paddingRight: px,
      borderRadius: '0.8rem',
      fontWeight: 500,
      fontFamily: 'inherit',
      outline: 'none',
      transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)',
      background: variant === 'filled' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0,0,0,0.2)',
      border: error
        ? '2px solid #ef4444'
        : focused
          ? '2px solid var(--color-primary-500)'
          : '2px solid rgba(255, 255, 255, 0.1)',
      boxShadow: focused ? '0 0 20px rgba(99, 102, 241, 0.15)' : 'none',
      color: '#fff',
      opacity: disabled ? 0.5 : 1,
      ...customStyle,
    };

    return (
      <div style={{ width: '100%', marginBottom: '0.5rem' }}>
        {label && (
          <label
            style={{
              display: 'block',
              fontSize: '0.85rem',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.7)',
              marginBottom: '0.5rem',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}
          >
            {label}
            {props.required && (
              <span style={{ color: '#ef4444', marginLeft: '0.25rem' }}>*</span>
            )}
          </label>
        )}
        {description && (
          <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)', marginTop: '-0.3rem', marginBottom: '0.5rem' }}>
            {description}
          </p>
        )}
        <div style={{ position: 'relative' }}>
          {Icon && (
            <Icon
              size={18}
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                color: focused ? 'var(--color-primary-400)' : 'rgba(255,255,255,0.3)',
                transition: 'all 0.3s ease'
              }}
            />
          )}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={`smooth-transition ${className}`}
            style={inputStyle}
            onFocus={(e) => {
              setFocused(true);
              props.onFocus?.(e);
            }}
            onBlur={(e) => {
              setFocused(false);
              props.onBlur?.(e);
            }}
            {...props}
            placeholder={props.placeholder || ''}
          />
        </div>
        {error && (
          <p style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '0.4rem', fontWeight: 500 }}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
