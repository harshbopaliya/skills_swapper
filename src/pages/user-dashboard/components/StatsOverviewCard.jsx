import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsOverviewCard = ({ stats }) => {
  const statItems = [
    {
      label: 'Total Swaps',
      value: stats.totalSwaps,
      icon: 'ArrowLeftRight',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+2 this week'
    },
    {
      label: 'Skills Taught',
      value: stats.skillsTaught,
      icon: 'GraduationCap',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+1 this month'
    },
    {
      label: 'Skills Learned',
      value: stats.skillsLearned,
      icon: 'BookOpen',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      change: '+3 this month'
    },
    {
      label: 'Rating',
      value: `${stats.averageRating}/5`,
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: 'Excellent'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="BarChart3" size={20} className="mr-2 text-accent" />
        Your Stats
      </h2>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {statItems.map((item, index) => (
          <div key={index} className="text-center">
            <div className={`w-16 h-16 mx-auto rounded-full ${item.bgColor} flex items-center justify-center mb-3`}>
              <Icon name={item.icon} size={24} className={item.color} />
            </div>
            <div className="text-2xl font-bold text-foreground mb-1">{item.value}</div>
            <div className="text-sm text-muted-foreground mb-1">{item.label}</div>
            <div className="text-xs text-success">{item.change}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Member since</span>
          <span className="font-medium text-foreground">{stats.memberSince}</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-muted-foreground">Last active</span>
          <span className="font-medium text-foreground">{stats.lastActive}</span>
        </div>
      </div>
    </div>
  );
};

export default StatsOverviewCard;