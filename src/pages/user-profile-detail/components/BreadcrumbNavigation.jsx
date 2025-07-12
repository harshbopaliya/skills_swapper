import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BreadcrumbNavigation = ({ userName }) => {
  const navigate = useNavigate();

  const handleBackToBrowse = () => {
    navigate('/browse-users');
  };

  return (
    <div className="bg-background border-b border-border">
      <div className="px-4 lg:px-6 py-3">
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToBrowse}
            iconName="ArrowLeft"
            iconPosition="left"
            className="text-muted-foreground hover:text-foreground"
          >
            Browse
          </Button>
          
          <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          
          <span className="text-sm font-medium text-foreground truncate">
            {userName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BreadcrumbNavigation;