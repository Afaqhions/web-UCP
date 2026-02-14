import React from 'react';
import {
    FiGrid,
    FiUsers,
    FiAward,
    FiLayers,
    FiShield,
    FiActivity,
    FiLogOut
} from 'react-icons/fi';

export const AdminSidebar = ({ activeTab, onTabChange }) => {
    const menuItems = [
        { id: 0, label: 'COMMAND DASHBOARD', icon: <FiGrid size={20} />, category: 'SYSTEM' },
        { id: 3, label: 'ADMIN OPS', icon: <FiShield size={20} />, category: 'SYSTEM' },
        { id: 1, label: 'TOURNAMENTS', icon: <FiAward size={20} />, category: 'CONTENT' },
        { id: 2, label: 'CATEGORIES', icon: <FiLayers size={20} />, category: 'CONTENT' },
        { id: 4, label: 'USERS OPS', icon: <FiUsers size={20} />, category: 'OPERATIONS' },
        { id: 5, label: 'PRIZE POOLS', icon: <FiActivity size={20} />, category: 'FINANCIAL' },
    ];

    return (
        <aside
            style={{
                width: '300px',
                background: '#ffffff',
                borderRight: '1px solid #e5e7eb',
                height: '100vh',
                position: 'sticky',
                top: 0,
                display: 'flex',
                flexDirection: 'column',
                padding: '2.25rem 1.25rem',
                gap: '2rem',
            }}
        >
            {/* LOGO */}
            <div style={{ padding: '0 0.75rem' }}>
                <h2
                    style={{
                        fontSize: '1.6rem',
                        fontWeight: 900,
                        color: '#0f172a',
                        letterSpacing: '-1px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                    }}
                >
                    <span style={{ color: '#6366f1' }}>TAAKRA</span>
                    <span
                        style={{
                            fontSize: '0.7rem',
                            background: '#6366f1',
                            color: '#fff',
                            padding: '2px 6px',
                            borderRadius: '4px',
                            fontWeight: 800,
                            letterSpacing: '1px',
                        }}
                    >
                        OS
                    </span>
                </h2>
            </div>

            {/* NAV */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', flex: 1 }}>
                {menuItems.map((item, index) => {
                    const isActive = activeTab === item.id;
                    const showCategory =
                        index === 0 || menuItems[index - 1].category !== item.category;

                    return (
                        <React.Fragment key={item.id}>
                            {showCategory && (
                                <div
                                    style={{
                                        fontSize: '0.7rem',
                                        fontWeight: 700,
                                        color: '#9ca3af',
                                        letterSpacing: '2px',
                                        marginTop: '1.75rem',
                                        marginBottom: '0.5rem',
                                        paddingLeft: '0.75rem',
                                    }}
                                >
                                    {item.category}
                                </div>
                            )}

                            <button
                                onClick={() => onTabChange(item.id)}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '1rem',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.75rem',
                                    border: '1px solid',
                                    borderColor: isActive ? '#e5e7eb' : 'transparent',
                                    background: '#ffffff',
                                    color: isActive ? '#111827' : '#6b7280',
                                    cursor: 'pointer',
                                    fontWeight: isActive ? 700 : 500,
                                    position: 'relative',
                                }}
                            >
                                {/* ACTIVE INDICATOR */}
                                {isActive && (
                                    <span
                                        style={{
                                            position: 'absolute',
                                            left: 0,
                                            top: '20%',
                                            bottom: '20%',
                                            width: '3px',
                                            background: '#f59e0b',
                                            borderRadius: '0 4px 4px 0',
                                        }}
                                    />
                                )}

                                <span style={{ color: isActive ? '#f59e0b' : '#9ca3af' }}>
                                    {item.icon}
                                </span>

                                <span
                                    style={{
                                        fontSize: '0.8rem',
                                        letterSpacing: '0.5px',
                                        textTransform: 'uppercase',
                                    }}
                                >
                                    {item.label}
                                </span>
                            </button>
                        </React.Fragment>
                    );
                })}
            </nav>

            {/* LOGOUT */}
            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid #f1f5f9' }}>
                <button
                    className="hover-lift smooth-transition"
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        padding: '0.85rem 1rem',
                        borderRadius: '0.75rem',
                        border: '1px solid #fee2e2',
                        background: '#fff5f5',
                        color: '#ef4444',
                        width: '100%',
                        cursor: 'pointer',
                        fontWeight: 700,
                        fontSize: '0.75rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                    }}
                >
                    <FiLogOut size={18} /> LOGOUT SESSION
                </button>
            </div>
        </aside>
    );
};
