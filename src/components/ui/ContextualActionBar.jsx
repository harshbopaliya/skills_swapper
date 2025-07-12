import React from 'react';
import { useLocation } from 'react-router-dom';
import Button from './Button';

const ContextualActionBar = () => {
  const location = useLocation();

  const getActionsForPage = () => {
    switch (location.pathname) {
      case '/user-profile-detail':
        return [
          {
            label: 'Send Request',
            variant: 'default',
            icon: 'MessageSquare',
            onClick: () => console.log('Send swap request'),
            primary: true
          },
          {
            label: 'Message',
            variant: 'outline',
            icon: 'Mail',
            onClick: () => console.log('Send message')
          },
          {
            label: 'Save Profile',
            variant: 'ghost',
            icon: 'Bookmark',
            onClick: () => console.log('Save profile')
          }
        ];
      
      case '/active-swaps':
        return [
          {
            label: 'Schedule Session',
            variant: 'default',
            icon: 'Calendar',
            onClick: () => console.log('Schedule session'),
            primary: true
          },
          {
            label: 'Send Message',
            variant: 'outline',
            icon: 'MessageCircle',
            onClick: () => console.log('Send message')
          },
          {
            label: 'View Details',
            variant: 'ghost',
            icon: 'Eye',
            onClick: () => console.log('View swap details')
          }
        ];
      
      case '/swap-requests-management':
        return [
          {
            label: 'Accept Request',
            variant: 'success',
            icon: 'Check',
            onClick: () => console.log('Accept request'),
            primary: true
          },
          {
            label: 'Decline',
            variant: 'outline',
            icon: 'X',
            onClick: () => console.log('Decline request')
          },
          {
            label: 'Counter Offer',
            variant: 'secondary',
            icon: 'ArrowLeftRight',
            onClick: () => console.log('Make counter offer')
          }
        ];
      
      default:
        return null;
    }
  };

  const actions = getActionsForPage();

  if (!actions || actions.length === 0) {
    return null;
  }

  return (
    <>
      {/* Mobile Contextual Action Bar */}
      <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-card border-t border-border z-100 p-4">
        <div className="flex items-center space-x-2 overflow-x-auto">
          {actions.map((action, index) => (
            <Button
              key={index}
              variant={action.variant}
              size="default"
              onClick={action.onClick}
              iconName={action.icon}
              iconPosition="left"
              className={`flex-shrink-0 ${action.primary ? 'flex-1' : ''} floating-action`}
            >
              {action.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Desktop Contextual Actions - Integrated in content area */}
      <div className="hidden lg:block">
        <div className="bg-card border border-border rounded-lg p-4 mb-6 floating-action">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="font-medium text-foreground">Quick Actions</h3>
            </div>
            <div className="flex items-center space-x-2">
              {actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant}
                  size="sm"
                  onClick={action.onClick}
                  iconName={action.icon}
                  iconPosition="left"
                  className="floating-action"
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContextualActionBar;