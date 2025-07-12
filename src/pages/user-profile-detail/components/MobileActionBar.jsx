import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';


const MobileActionBar = ({ onSendRequest, onSaveProfile, onReportUser }) => {
  return (
    <div className="lg:hidden fixed bottom-16 left-0 right-0 bg-card border-t border-border z-100 p-4">
      <div className="flex items-center space-x-2">
        <Button
          variant="default"
          onClick={onSendRequest}
          iconName="MessageSquare"
          iconPosition="left"
          className="flex-1 floating-action"
        >
          Send Request
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={onSaveProfile}
          className="floating-action"
        >
          <Icon name="Bookmark" size={16} />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onReportUser}
          className="floating-action"
        >
          <Icon name="Flag" size={16} />
        </Button>
      </div>
    </div>
  );
};

export default MobileActionBar;