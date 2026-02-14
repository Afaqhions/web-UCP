import React, { useState, useEffect } from 'react';
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

export const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: { icon: FiCheckCircle, color: '#10b981', bg: 'rgba(236, 253, 245, 0.9)', border: '#6ee7b7' },
    error: { icon: FiAlertCircle, color: '#ef4444', bg: 'rgba(254, 242, 242, 0.9)', border: '#fca5a5' },
    warning: { icon: FiAlertTriangle, color: '#f59e0b', bg: 'rgba(255, 251, 235, 0.9)', border: '#fcd34d' },
    info: { icon: FiInfo, color: '#3b82f6', bg: 'rgba(239, 246, 255, 0.9)', border: '#93c5fd' },
  };

  const { icon: Icon, color, bg, border } = config[type] || config.info;

  return (
    <div
      className="animate-slide-in hover-lift"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        padding: '1rem 1.25rem',
        background: bg,
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: `1px solid ${border}`,
        borderRadius: '0.75rem',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        minWidth: '300px',
        maxWidth: '400px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: color,
        }}
      >
        <Icon size={20} />
      </div>

      <div style={{ flex: 1, fontSize: '0.925rem', fontWeight: 500, color: '#1f2937' }}>
        {message}
      </div>

      <button
        onClick={onClose}
        style={{
          background: 'transparent',
          border: 'none',
          color: '#6b7280',
          cursor: 'pointer',
          padding: '0.25rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'color 200ms',
        }}
        onMouseEnter={(e) => (e.target.style.color = '#1f2937')}
        onMouseLeave={(e) => (e.target.style.color = '#6b7280')}
      >
        <FiX size={18} />
      </button>

      {/* Progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '3px',
          background: color,
          width: '100%',
          animation: `shrink ${duration}ms linear forwards`,
          borderBottomLeftRadius: '0.75rem',
          borderBottomRightRadius: '0.75rem',
          opacity: 0.5,
        }}
      />
      <style>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
};

export const useToast = () => {
  const [toast, setToast] = useState(null);

  const showToast = (message, type = 'info', duration = 3000) => {
    setToast({ message, type, duration });
    // Auto-clear happens inside Toast component, 
    // but we can also manage state here if multiple toasts are needed later.
  };

  return {
    toast,
    showToast,
    // Helper to clear toast from parent if needed
    clearToast: () => setToast(null),
  };
};
