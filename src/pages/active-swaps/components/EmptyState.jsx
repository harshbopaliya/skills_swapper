import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmptyState = () => {
  const navigate = useNavigate();

  const handleBrowseUsers = () => {
    navigate('/browse-users');
  };

  const handleViewRequests = () => {
    navigate('/swap-requests-management');
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Illustration */}
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <Icon name="ArrowLeftRight" size={32} className="text-muted-foreground" />
      </div>

      {/* Content */}
      <h2 className="text-xl font-semibold text-foreground mb-2">
        No Active Swaps Yet
      </h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        You don't have any ongoing skill exchanges. Start connecting with other learners to begin your skill-sharing journey!
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
        <Button
          variant="default"
          onClick={handleBrowseUsers}
          iconName="Search"
          iconPosition="left"
          className="flex-1"
        >
          Find Skills
        </Button>
        <Button
          variant="outline"
          onClick={handleViewRequests}
          iconName="MessageSquare"
          iconPosition="left"
          className="flex-1"
        >
          View Requests
        </Button>
      </div>

      {/* Tips */}
      <div className="mt-12 w-full max-w-md">
        <h3 className="text-sm font-medium text-foreground mb-4">Getting Started Tips</h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3 text-left">
            <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Search" size={12} className="text-primary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Browse Skills</p>
              <p className="text-xs text-muted-foreground">
                Explore what others are teaching and find skills you want to learn
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 text-left">
            <div className="w-6 h-6 bg-secondary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="MessageSquare" size={12} className="text-secondary" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Send Requests</p>
              <p className="text-xs text-muted-foreground">
                Reach out to potential learning partners with swap requests
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3 text-left">
            <div className="w-6 h-6 bg-success/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <Icon name="Calendar" size={12} className="text-success" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">Start Learning</p>
              <p className="text-xs text-muted-foreground">
                Schedule sessions and begin your skill exchange journey
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;