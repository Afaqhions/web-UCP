import React from 'react';
import { Card } from '../common/Card';
import { Table } from '../common/Table';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';

export const PendingRegistrations = ({ registrations = [] }) => {
  const columns = [
    { label: 'User', key: 'userName', render: (row) => <span style={{ fontWeight: 600 }}>{row.userName}</span> },
    { label: 'Competition', key: 'competitionTitle' },
    { label: 'Date', key: 'registrationDate' },
    {
      label: 'Actions',
      key: 'actions',
      render: (row) => (
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <Button size="sm" variant="success">
            Approve
          </Button>
          <Button size="sm" variant="danger">
            Reject
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Card variant="glass">
      <h3 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1.5rem', color: '#1f2937' }}>Pending Registrations</h3>
      <Table columns={columns} data={registrations} empty="No pending registrations" />
    </Card>
  );
};
