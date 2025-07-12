import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ActiveSwapsCard = ({ activeSwaps }) => {
  const navigate = useNavigate();

  const handleViewSwaps = () => {
    navigate('/active-swaps');
  };

  const handleViewProfile = (userId) => {
    navigate('/user-profile-detail', { state: { userId } });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground flex items-center">
          <Icon name="Users" size={20} className="mr-2 text-success" />
          Active Swaps ({activeSwaps.length})
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleViewSwaps}
          iconName="ArrowRight"
          iconPosition="right"
        >
          View All
        </Button>
      </div>

      {activeSwaps.length > 0 ? (
        <div className="space-y-4">
          {activeSwaps.slice(0, 3).map((swap) => (
            <div key={swap.id} className="flex items-center space-x-3 p-3 bg-muted rounded-lg hover:bg-muted/80 transition-colors duration-200">
              <div className="relative">
                <Image
                  src={swap.partnerAvatar}
                  alt={swap.partnerName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-card"></div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h3 className="font-medium text-foreground truncate">{swap.partnerName}</h3>
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-xs text-muted-foreground">{swap.rating}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="truncate">{swap.yourSkill}</span>
                  <Icon name="ArrowLeftRight" size={14} />
                  <span className="truncate">{swap.theirSkill}</span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                    swap.status === 'scheduled' ?'bg-primary/10 text-primary' :'bg-warning/10 text-warning'
                  }`}>
                    {swap.status === 'scheduled' ? 'Session Scheduled' : 'Pending Schedule'}
                  </div>
                  {swap.nextSession && (
                    <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                      <Icon name="Calendar" size={12} />
                      <span>{swap.nextSession}</span>
                    </div>
                  )}
                </div>
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleViewProfile(swap.partnerId)}
                className="flex-shrink-0"
              >
                <Icon name="ChevronRight" size={16} />
              </Button>
            </div>
          ))}

          {activeSwaps.length > 3 && (
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewSwaps}
              className="w-full"
            >
              View {activeSwaps.length - 3} more active swaps
            </Button>
          )}
        </div>
      ) : (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="mx-auto text-muted-foreground mb-3" />
          <h3 className="font-medium text-foreground mb-2">No Active Swaps</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Start exchanging skills by browsing available users
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/browse-users')}
            iconName="Search"
            iconPosition="left"
          >
            Find Skills
          </Button>
        </div>
      )}
    </div>
  );
};

export default ActiveSwapsCard;