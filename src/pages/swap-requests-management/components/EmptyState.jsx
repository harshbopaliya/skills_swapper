import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = ({ type, onBrowseUsers, onCreateRequest }) => {
  const getEmptyStateContent = () => {
    switch (type) {
      case 'received':
        return {
          icon: 'Inbox',
          title: 'No Received Requests',
          description: 'You haven\'t received any skill swap requests yet. Make your profile more discoverable to attract potential skill partners.',
          primaryAction: {
            label: 'Update Profile',
            onClick: () => window.location.href = '/user-profile-settings',
            icon: 'User'
          },
          secondaryAction: {
            label: 'Browse Users',
            onClick: onBrowseUsers,
            icon: 'Search'
          }
        };
      case 'sent':
        return {
          icon: 'Send',
          title: 'No Sent Requests',
          description: 'You haven\'t sent any skill swap requests yet. Start exploring the community to find people with skills you want to learn.',
          primaryAction: {
            label: 'Browse Skills',
            onClick: onBrowseUsers,
            icon: 'Search'
          },
          secondaryAction: {
            label: 'View Dashboard',
            onClick: () => window.location.href = '/user-dashboard',
            icon: 'Home'
          }
        };
      case 'search':
        return {
          icon: 'SearchX',
          title: 'No Results Found',
          description: 'No requests match your search criteria. Try adjusting your search terms or filters.',
          primaryAction: {
            label: 'Clear Search',
            onClick: () => window.location.reload(),
            icon: 'RotateCcw'
          },
          secondaryAction: null
        };
      default:
        return {
          icon: 'MessageSquare',
          title: 'No Requests',
          description: 'Start your skill exchange journey by connecting with other learners.',
          primaryAction: {
            label: 'Browse Users',
            onClick: onBrowseUsers,
            icon: 'Search'
          },
          secondaryAction: null
        };
    }
  };

  const content = getEmptyStateContent();

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
        <Icon name={content.icon} size={32} className="text-muted-foreground" />
      </div>
      
      <h3 className="text-lg font-medium text-foreground mb-2">
        {content.title}
      </h3>
      
      <p className="text-muted-foreground mb-6 max-w-md">
        {content.description}
      </p>
      
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="default"
          onClick={content.primaryAction.onClick}
          iconName={content.primaryAction.icon}
          iconPosition="left"
        >
          {content.primaryAction.label}
        </Button>
        
        {content.secondaryAction && (
          <Button
            variant="outline"
            onClick={content.secondaryAction.onClick}
            iconName={content.secondaryAction.icon}
            iconPosition="left"
          >
            {content.secondaryAction.label}
          </Button>
        )}
      </div>

      {/* Quick Tips */}
      {type !== 'search' && (
        <div className="mt-8 p-4 bg-muted rounded-lg max-w-md">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-accent mt-0.5" />
            <div className="text-left">
              <h4 className="font-medium text-foreground mb-1">Quick Tip</h4>
              <p className="text-sm text-muted-foreground">
                {type === 'received' ?'Complete your profile with skills and availability to receive more requests.' :'Be specific about what you can offer and what you want to learn when sending requests.'
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmptyState;