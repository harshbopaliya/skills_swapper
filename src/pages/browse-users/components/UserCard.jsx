import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const UserCard = ({ user, onSendRequest }) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate('/user-profile-detail', { state: { userId: user.id } });
  };

  const handleSendRequest = (e) => {
    e.stopPropagation();
    onSendRequest(user);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={14}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div 
      className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={handleCardClick}
    >
      {/* Profile Header */}
      <div className="flex items-start space-x-3 mb-3">
        <div className="relative">
          <Image
            src={user.profilePhoto}
            alt={user.name}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-card ${
            user.isOnline ? 'bg-success' : 'bg-muted-foreground'
          }`}></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-medium text-card-foreground truncate">{user.name}</h3>
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="MapPin" size={12} />
            <span className="truncate">{user.location}</span>
          </div>
          <div className="flex items-center space-x-1 mt-1">
            {renderStars(user.rating)}
            <span className="text-xs text-muted-foreground ml-1">
              ({user.reviewCount})
            </span>
          </div>
        </div>
      </div>

      {/* Skills Offered */}
      <div className="mb-3">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">Offers</h4>
        <div className="flex flex-wrap gap-1">
          {user.skillsOffered.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full skill-tag"
            >
              {skill}
            </span>
          ))}
          {user.skillsOffered.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{user.skillsOffered.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Skills Wanted */}
      <div className="mb-3">
        <h4 className="text-xs font-medium text-muted-foreground mb-2">Wants</h4>
        <div className="flex flex-wrap gap-1">
          {user.skillsWanted.slice(0, 3).map((skill, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-secondary/10 text-secondary text-xs rounded-full skill-tag"
            >
              {skill}
            </span>
          ))}
          {user.skillsWanted.length > 3 && (
            <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
              +{user.skillsWanted.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-1">
          <Icon name="Clock" size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{user.availability}</span>
        </div>
        <div className="flex items-center space-x-1">
          <Icon name="Calendar" size={12} className="text-muted-foreground" />
          <span className="text-xs text-muted-foreground">
            {user.responseTime}
          </span>
        </div>
      </div>

      {/* Action Button */}
      <Button
        variant="default"
        size="sm"
        className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-200"
        iconName="MessageSquare"
        iconPosition="left"
        onClick={handleSendRequest}
      >
        Send Request
      </Button>
    </div>
  );
};

export default UserCard;