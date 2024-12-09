import React from 'react';
import { Clock } from 'lucide-react';

const activities = [
  {
    id: 1,
    user: 'Marie Dupont',
    action: 'a terminé',
    subject: 'Module 3: Techniques de fermentation',
    timestamp: '2h ago'
  },
  {
    id: 2,
    user: 'Jean Martin',
    action: 'a commencé',
    subject: 'Module 1: Introduction aux produits laitiers',
    timestamp: '3h ago'
  },
  {
    id: 3,
    user: 'Sophie Bernard',
    action: 'a obtenu',
    subject: '95% au quiz de fin de module',
    timestamp: '5h ago'
  }
];

export function RecentActivity() {
  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start space-x-3">
          <Clock className="h-5 w-5 text-gray-400 mt-0.5" />
          <div>
            <p className="text-sm">
              <span className="font-medium text-gray-900">{activity.user}</span>
              {' '}{activity.action}{' '}
              <span className="text-gray-900">{activity.subject}</span>
            </p>
            <p className="text-sm text-gray-500">{activity.timestamp}</p>
          </div>
        </div>
      ))}
    </div>
  );
}