import React, { useState } from 'react';

export const Tabs = ({ tabs, defaultTab = 0, onChange, activeIndex }) => {
  const [internalTab, setInternalTab] = useState(defaultTab);

  const isControlled = activeIndex !== undefined;
  const activeTab = isControlled ? activeIndex : internalTab;

  const handleTabChange = (index) => {
    if (!isControlled) {
      setInternalTab(index);
    }
    onChange?.(index);
  };

  return (
    <div style={{ width: '100%' }}>
      {/* Tab Header */}
      <div
        style={{
          display: 'flex',
          gap: '0.5rem',
          padding: '0.5rem',
          background: 'rgba(0,0,0,0.1)',
          borderRadius: '1rem',
          marginBottom: '2.5rem',
          border: '1px solid rgba(255,255,255,0.05)',
          backdropFilter: 'blur(10px)'
        }}
      >
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => handleTabChange(index)}
            style={{
              flex: 1,
              padding: '0.85rem 1.25rem',
              fontSize: '0.9rem',
              fontWeight: activeTab === index ? 800 : 500,
              color: activeTab === index ? '#fff' : 'rgba(255,255,255,0.5)',
              background: activeTab === index ? 'rgba(255,255,255,0.1)' : 'transparent',
              borderRadius: '0.75rem',
              border: 'none',
              cursor: 'pointer',
              position: 'relative',
              transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
              outline: 'none',
              boxShadow: activeTab === index ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)' : 'none',
              border: activeTab === index ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent'
            }}
          >
            <span style={{ position: 'relative', zIndex: 10 }}>{tab.label}</span>
            {activeTab === index && (
              <div
                className="animate-scale-in"
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '0.75rem',
                  background: 'linear-gradient(135deg, var(--color-primary-500), var(--color-primary-700))',
                  opacity: 0.8,
                  zIndex: 0
                }}
              />
            )}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in" key={activeTab}>
        {tabs[activeTab]?.content}
      </div>
    </div>
  );
};
