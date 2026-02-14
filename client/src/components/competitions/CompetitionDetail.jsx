import React from 'react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Tabs } from '../common/Tabs';
import { formatDate } from '../../utils/formatters';

export const CompetitionDetail = ({ competition, isRegistered, onRegister }) => {
  const tabs = [
    {
      label: 'About',
      content: (
        <div className="space-y-4">
          <div>
            <h4 className="font-bold mb-2">Description</h4>
            <p className="text-gray-700">{competition?.description}</p>
          </div>
          <div>
            <h4 className="font-bold mb-2">Rules & Guidelines</h4>
            <p className="text-gray-700">{competition?.rules || 'No rules specified'}</p>
          </div>
        </div>
      ),
    },
    {
      label: 'Details',
      content: (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-gray-600 text-sm">Category</p>
            <Badge>{competition?.category}</Badge>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Prize Pool</p>
            <p className="font-bold">${competition?.prizePool || 0}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Start Date</p>
            <p className="font-bold">{formatDate(competition?.startDate)}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">End Date</p>
            <p className="font-bold">{formatDate(competition?.endDate)}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Participants</p>
            <p className="font-bold">{competition?.registrationCount || 0}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Organizer</p>
            <p className="font-bold">{competition?.organizer || 'Taakra'}</p>
          </div>
        </div>
      ),
    },
    {
      label: 'Leaderboard',
      content: (
        <div>
          <p className="text-gray-500">Leaderboard coming soon</p>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{competition?.title}</h1>
            <Badge variant="primary">{competition?.status}</Badge>
          </div>
          <Button onClick={() => onRegister?.(competition?.id)} size="lg">
            {isRegistered ? 'Already Registered' : 'Register Now'}
          </Button>
        </div>
      </Card>

      <Card>
        <Tabs tabs={tabs} />
      </Card>
    </div>
  );
};
