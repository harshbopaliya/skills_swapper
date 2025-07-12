import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PendingRequestsCard = ({ sentRequests, receivedRequests }) => {
  const navigate = useNavigate();

  const handleViewRequests = () => {
    navigate('/swap-requests-management');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="MessageSquare" size={20} className="mr-2 text-primary" />
          Pending Requests
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewRequests}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-primary mb-1">{sentRequests}</div>
          <div className="text-sm text-muted-foreground">Sent</div>
          <div className="flex items-center justify-center mt-2">
            <Icon name="Send" size={16} className="text-primary" />
          </div>
        </div>
        <div className="bg-muted rounded-lg p-4 text-center">
          <div className="text-2xl font-bold text-secondary mb-1">{receivedRequests}</div>
          <div className="text-sm text-muted-foreground">Received</div>
          <div className="flex items-center justify-center mt-2">
            <Icon name="Inbox" size={16} className="text-secondary" />
          </div>
        </div>
      </div>

      {(sentRequests > 0 || receivedRequests > 0) && (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleViewRequests}
            iconName="Eye"
            iconPosition="left"
            className="flex-1"
          >
            Review
          </Button>
          <Button
            variant="default"
            size="sm"
            onClick={handleViewRequests}
            iconName="Check"
            iconPosition="left"
            className="flex-1"
          >
            Respond
          </Button>
        </div>
      )}

      {sentRequests === 0 && receivedRequests === 0 && (
        <div className="text-center py-4">
          <Icon name="MessageSquare" size={32} className="mx-auto text-muted-foreground mb-2" />
          <p className="text-sm text-muted-foreground">No pending requests</p>
        </div>
      )}
    </div>
  );
};

export default PendingRequestsCard;