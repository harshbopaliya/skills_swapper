import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const RequestCard = ({ request, type, onAccept, onDecline, onCancel, onViewProfile }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [declineReason, setDeclineReason] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'accepted':
        return 'bg-success text-success-foreground';
      case 'declined':
        return 'bg-error text-error-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const requestTime = new Date(timestamp);
    const diffInHours = Math.floor((now - requestTime) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return requestTime.toLocaleDateString();
  };

  const handleAccept = () => {
    setShowAcceptModal(true);
  };

  const confirmAccept = () => {
    onAccept(request.id);
    setShowAcceptModal(false);
  };

  const handleDecline = () => {
    setShowDeclineModal(true);
  };

  const confirmDecline = () => {
    onDecline(request.id, declineReason);
    setShowDeclineModal(false);
    setDeclineReason('');
  };

  return (
    <>
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200">
        {/* Header */}
        <div className="flex items-start space-x-3 mb-3">
          <div className="relative">
            <Image
              src={request.partner.avatar}
              alt={request.partner.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            {request.partner.isOnline && (
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success border-2 border-card rounded-full"></div>
            )}
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-foreground truncate">{request.partner.name}</h3>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(request.status)}`}>
                {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{request.partner.location}</p>
            <p className="text-xs text-muted-foreground">{formatTimeAgo(request.timestamp)}</p>
          </div>
        </div>

        {/* Exchange Details */}
        <div className="bg-muted rounded-lg p-3 mb-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                {type === 'received' ? 'They offer' : 'You requested'}
              </p>
              <div className="flex flex-wrap gap-1">
                {request.skillsOffered.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-1">
                {type === 'received' ? 'They want' : 'You offered'}
              </p>
              <div className="flex flex-wrap gap-1">
                {request.skillsWanted.map((skill, index) => (
                  <span key={index} className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Message Preview */}
        <div className="mb-3">
          <p className="text-sm text-foreground">
            {isExpanded ? request.message : `${request.message.substring(0, 100)}${request.message.length > 100 ? '...' : ''}`}
          </p>
          {request.message.length > 100 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0 h-auto text-primary hover:text-primary/80"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </Button>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onViewProfile(request.partner.id)}
            iconName="User"
            iconPosition="left"
          >
            View Profile
          </Button>

          <div className="flex items-center space-x-2">
            {type === 'received' && request.status === 'pending' && (
              <>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleDecline}
                  iconName="X"
                  iconPosition="left"
                >
                  Decline
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  onClick={handleAccept}
                  iconName="Check"
                  iconPosition="left"
                >
                  Accept
                </Button>
              </>
            )}

            {type === 'sent' && request.status === 'pending' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => onCancel(request.id)}
                iconName="X"
                iconPosition="left"
              >
                Cancel
              </Button>
            )}

            {request.status === 'accepted' && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => window.location.href = '/active-swaps'}
                iconName="Calendar"
                iconPosition="left"
              >
                Schedule
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Accept Confirmation Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={20} color="white" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Accept Swap Request</h3>
                <p className="text-sm text-muted-foreground">Confirm skill exchange with {request.partner.name}</p>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg p-3 mb-4">
              <p className="text-sm text-foreground">
                You'll be exchanging <strong>{request.skillsWanted.join(', ')}</strong> for <strong>{request.skillsOffered.join(', ')}</strong>
              </p>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                onClick={() => setShowAcceptModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="default"
                onClick={confirmAccept}
                className="flex-1"
              >
                Accept Request
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Decline Modal */}
      {showDeclineModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
          <div className="bg-card rounded-lg p-6 w-full max-w-md">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-error rounded-full flex items-center justify-center">
                <Icon name="X" size={20} color="white" />
              </div>
              <div>
                <h3 className="font-medium text-foreground">Decline Request</h3>
                <p className="text-sm text-muted-foreground">Optional: Let {request.partner.name} know why</p>
              </div>
            </div>
            
            <textarea
              value={declineReason}
              onChange={(e) => setDeclineReason(e.target.value)}
              placeholder="Reason for declining (optional)..."
              className="w-full p-3 border border-border rounded-lg resize-none h-20 text-sm"
            />

            <div className="flex space-x-3 mt-4">
              <Button
                variant="outline"
                onClick={() => setShowDeclineModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                variant="destructive"
                onClick={confirmDecline}
                className="flex-1"
              >
                Decline Request
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RequestCard;