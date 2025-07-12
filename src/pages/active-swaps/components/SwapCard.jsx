import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const SwapCard = ({ swap, onScheduleSession, onMessagePartner, onMarkComplete }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getProgressPercentage = () => {
    return (swap.completedSessions / swap.totalSessions) * 100;
  };

  const getStatusColor = () => {
    switch (swap.status) {
      case 'active':
        return 'text-success';
      case 'scheduled':
        return 'text-primary';
      case 'pending':
        return 'text-warning';
      default:
        return 'text-muted-foreground';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden hover:shadow-md transition-all duration-200">
      {/* Card Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={swap.partner.avatar}
                alt={swap.partner.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
                swap.partner.isOnline ? 'bg-success' : 'bg-muted-foreground'
              }`}></div>
            </div>
            <div className="flex-1">
              <h3 className="font-medium text-foreground">{swap.partner.name}</h3>
              <p className="text-sm text-muted-foreground">
                Last active {swap.partner.lastActive}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`text-sm font-medium ${getStatusColor()}`}>
              {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-8 h-8"
            >
              <Icon 
                name={isExpanded ? "ChevronUp" : "ChevronDown"} 
                size={16} 
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Exchange Details */}
      <div className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="ArrowRight" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">You're Teaching</span>
            </div>
            <p className="text-sm text-muted-foreground">{swap.yourSkill}</p>
          </div>
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="ArrowLeft" size={16} className="text-secondary" />
              <span className="text-sm font-medium text-foreground">You're Learning</span>
            </div>
            <p className="text-sm text-muted-foreground">{swap.partnerSkill}</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">
              {swap.completedSessions}/{swap.totalSessions} sessions
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            ></div>
          </div>
        </div>

        {/* Next Session Info */}
        {swap.nextSession && (
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Calendar" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Next Session</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">
                  {formatDate(swap.nextSession.date)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {formatTime(swap.nextSession.date)} • {swap.nextSession.duration}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">{swap.nextSession.type}</p>
                {swap.nextSession.location && (
                  <p className="text-xs text-muted-foreground">{swap.nextSession.location}</p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Expanded Content */}
        {isExpanded && (
          <div className="space-y-4 border-t border-border pt-4">
            {/* Session History */}
            <div>
              <h4 className="text-sm font-medium text-foreground mb-3">Recent Sessions</h4>
              <div className="space-y-2">
                {swap.recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div>
                      <p className="text-sm text-foreground">{session.topic}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(session.date)} • {session.duration}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Icon
                          key={i}
                          name="Star"
                          size={12}
                          className={i < session.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notes */}
            {swap.notes && (
              <div>
                <h4 className="text-sm font-medium text-foreground mb-2">Notes</h4>
                <p className="text-sm text-muted-foreground bg-muted rounded p-2">
                  {swap.notes}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 mt-4">
          <Button
            variant="default"
            size="sm"
            onClick={() => onScheduleSession(swap)}
            iconName="Calendar"
            iconPosition="left"
            className="flex-1"
          >
            Schedule Session
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onMessagePartner(swap)}
            iconName="MessageCircle"
            iconPosition="left"
            className="flex-1"
          >
            Message
          </Button>
          {swap.completedSessions >= swap.totalSessions && (
            <Button
              variant="success"
              size="sm"
              onClick={() => onMarkComplete(swap)}
              iconName="Check"
              iconPosition="left"
              className="flex-1"
            >
              Mark Complete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwapCard;