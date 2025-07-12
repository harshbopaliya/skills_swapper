import React from 'react';
import Icon from '../../../components/AppIcon';

const RequestStats = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Requests',
      value: stats.total,
      icon: 'MessageSquare',
      color: 'text-primary'
    },
    {
      label: 'Pending',
      value: stats.pending,
      icon: 'Clock',
      color: 'text-warning'
    },
    {
      label: 'Accepted',
      value: stats.accepted,
      icon: 'Check',
      color: 'text-success'
    },
    {
      label: 'Response Rate',
      value: `${stats.responseRate}%`,
      icon: 'TrendingUp',
      color: 'text-accent'
    }
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {statItems.map((stat, index) => (
        <div key={index} className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className={`w-8 h-8 rounded-lg bg-muted flex items-center justify-center ${stat.color}`}>
              <Icon name={stat.icon} size={16} />
            </div>
            <span className="text-2xl font-bold text-foreground">{stat.value}</span>
          </div>
          <p className="text-sm text-muted-foreground">{stat.label}</p>
        </div>
      ))}
    </div>
  );
};

export default RequestStats;