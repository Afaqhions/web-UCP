import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

// Simple formatter since we're focused on UI
const formatDistance = (date) => {
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  return 'Just now';
};

export const RecentActivity = ({ activities = [] }) => {
  // Removed default mock data
  const displayActivities = activities;

  const getActivityIcon = (type) => {
    const icons = {
      // ... (no changes needed here)
      registration: { icon: '📝', bg: '#eff6ff', color: '#3b82f6' },
      win: { icon: '🏆', bg: '#fffbeb', color: '#f59e0b' },
      submission: { icon: '📤', bg: '#f0fdf4', color: '#10b981' },
      comment: { icon: '💬', bg: '#fdf2f8', color: '#ec4899' },
      follow: { icon: '⭐', bg: '#f5f3ff', color: '#8b5cf6' },
      default: { icon: '📌', bg: '#f3f4f6', color: '#6b7280' }
    };
    return icons[type] || icons.default;
  };

  return (
    <Card
      header={<h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#1f2937' }}>Recent Activity</h3>}
      className="animate-fade-in-up"
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
        {displayActivities.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '1.5rem 0', color: '#9ca3af', fontSize: '0.9rem' }}>
            No recent activity
          </div>
        ) : (
          displayActivities.map((activity, idx) => {
            // ... existing map logic ...
            const { icon, bg, color } = getActivityIcon(activity.type);
            return (
              <div
                key={activity.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  padding: '1rem 0',
                  borderBottom: idx === displayActivities.length - 1 ? 'none' : '1px solid rgba(0,0,0,0.05)',
                  alignItems: 'flex-start'
                }}
              >
                {/* ... Icon ... */}
                <div
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: bg,
                    color: color,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    flexShrink: 0,
                  }}
                >
                  {icon}
                </div>
                {/* ... Content ... */}
                <div>
                  <p style={{ fontWeight: 500, color: '#374151', marginBottom: '0.25rem', fontSize: '0.95rem' }}>
                    {activity.message}
                  </p>
                  <p style={{ fontSize: '0.8rem', color: '#9ca3af' }}>
                    {formatDistance(activity.time || new Date())}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
};
