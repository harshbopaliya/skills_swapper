import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RecentActivityCard = ({ activities }) => {
  const navigate = useNavigate();

  const getActivityIcon = (type) => {
    switch (type) {
      case 'request_received':
        return { name: 'Inbox', color: 'text-primary' };
      case 'request_accepted':
        return { name: 'Check', color: 'text-success' };
      case 'swap_completed':
        return { name: 'CheckCircle', color: 'text-success' };
      case 'rating_received':
        return { name: 'Star', color: 'text-warning' };
      case 'message_received':
        return { name: 'MessageCircle', color: 'text-secondary' };
      default:
        return { name: 'Bell', color: 'text-muted-foreground' };
    }
  };

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const activityTime = new Date(timestamp);
    const diffInMinutes = Math.floor((now - activityTime) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  const handleActivityClick = (activity) => {
    switch (activity.type) {
      case 'request_received': case'request_accepted': navigate('/swap-requests-management');
        break;
      case 'swap_completed':
        navigate('/active-swaps');
        break;
      case 'rating_received': navigate('/user-profile-settings');
        break;
      case 'message_received': navigate('/swap-requests-management');
        break;
      default:
        break;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Activity" size={20} className="mr-2 text-accent" />
          Recent Activity
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/user-profile-settings')}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>

      {activities.length > 0 ? (
        <div className="space-y-3">
          {activities.slice(0, 5).map((activity) => {
            const iconConfig = getActivityIcon(activity.type);
            return (
              <div
                key={activity.id}
                onClick={() => handleActivityClick(activity)}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-muted transition-colors duration-200 cursor-pointer"
              >
                <div className="flex-shrink-0">
                  {activity.userAvatar ? (
                    <div className="relative">
                      <Image
                        src={activity.userAvatar}
                        alt={activity.userName}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className={`absolute -bottom-1 -right-1 w-5 h-5 bg-card rounded-full flex items-center justify-center border border-border`}>
                        <Icon name={iconConfig.name} size={12} className={iconConfig.color} />
                      </div>
                    </div>
                  ) : (
                    <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center`}>
                      <Icon name={iconConfig.name} size={16} className={iconConfig.color} />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground leading-relaxed">
                    {activity.message}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {getTimeAgo(activity.timestamp)}
                    </span>
                    {activity.isNew && (
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </div>
                </div>

                <Icon name="ChevronRight" size={14} className="text-muted-foreground flex-shrink-0" />
              </div>
            );
          })}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Activity" size={48} className="mx-auto text-muted-foreground mb-3" />
          <h3 className="font-medium text-foreground mb-2">No Recent Activity</h3>
          <p className="text-sm text-muted-foreground">
            Your activity will appear here as you interact with other users
          </p>
        </div>
      )}
    </div>
  );
};

export default RecentActivityCard;