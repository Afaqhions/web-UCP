import React from 'react';

export const Table = ({ columns, data, loading = false, empty = 'No data available' }) => {
  if (loading) {
    return (
      <div
        style={{
          borderRadius: '1.25rem',
          padding: '5rem 1rem',
          textAlign: 'center',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
        }}
      >
        <span className="animate-spin" style={{ display: 'inline-block', fontSize: '2rem', color: 'var(--color-primary-600)' }}>
          <svg className="w-8 h-8" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </span>
        <div style={{ marginTop: '1.5rem', color: '#64748b', fontWeight: 600, letterSpacing: '1px' }}>SYNCHRONIZING DATA...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div
        style={{
          borderRadius: '1.25rem',
          padding: '4rem 1rem',
          textAlign: 'center',
          background: '#ffffff',
          border: '1px solid #e2e8f0',
        }}
      >
        <div style={{ fontSize: '3rem', marginBottom: '1rem', opacity: 0.3 }}>🛰️</div>
        <div style={{ color: '#94a3b8', fontWeight: 600, letterSpacing: '0.5px' }}>{empty}</div>
      </div>
    );
  }

  return (
    <div
      style={{
        borderRadius: '1.25rem',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        background: '#ffffff',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)'
      }}
    >
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
          <thead>
            <tr
              style={{
                background: '#f8fafc',
                borderBottom: '1px solid #e2e8f0',
              }}
            >
              {columns.map((col, idx) => (
                <th
                  key={idx}
                  style={{
                    padding: '1.25rem 1.5rem',
                    textAlign: 'left',
                    fontSize: '0.75rem',
                    fontWeight: 800,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: '#64748b',
                  }}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIdx) => (
              <tr
                key={rowIdx}
                className="smooth-transition"
                style={{
                  borderBottom: rowIdx === data.length - 1 ? 'none' : '1px solid #f1f5f9',
                  background: 'transparent',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8fafc')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {columns.map((col, colIdx) => (
                  <td
                    key={colIdx}
                    style={{
                      padding: '1.25rem 1.5rem',
                      fontSize: '0.9rem',
                      color: '#334155',
                      verticalAlign: 'middle',
                    }}
                  >
                    {col.render ? col.render(row) : row[col.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
