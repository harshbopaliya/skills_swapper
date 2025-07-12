import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ProfileHeader = ({ user, onSendRequest, onSaveProfile, onReportUser }) => {
  return (
    <div className="bg-card border-b border-border">
      <div className="p-4 lg:p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:space-x-6">
          {/* Profile Photo */}
          <div className="flex justify-center lg:justify-start mb-4 lg:mb-0">
            <div className="relative">
              <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full overflow-hidden border-4 border-border">
                <Image
                  src={user.profilePhoto}
                  alt={`${user.name}'s profile`}
                  className="w-full h-full object-cover"
                />
              </div>
              {user.isOnline && (
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-success border-2 border-card rounded-full"></div>
              )}
            </div>
          </div>

          {/* Profile Info */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-2">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{user.name}</h1>
              <div className="flex items-center justify-center lg:justify-start space-x-2 text-muted-foreground">
                <Icon name="MapPin" size={16} />
                <span className="text-sm">{user.location}</span>
              </div>
            </div>

            {/* Rating */}
            <div className="flex items-center justify-center lg:justify-start space-x-2 mb-3">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <Icon
                    key={i}
                    name="Star"
                    size={16}
                    className={i < Math.floor(user.rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                  />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{user.rating}</span>
              <span className="text-sm text-muted-foreground">({user.reviewCount} reviews)</span>
            </div>

            {/* Bio */}
            <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto lg:mx-0">
              {user.bio}
            </p>

            {/* Stats */}
            <div className="flex items-center justify-center lg:justify-start space-x-6 text-sm">
              <div className="text-center lg:text-left">
                <div className="font-semibold text-foreground">{user.completedSwaps}</div>
                <div className="text-muted-foreground">Swaps</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-semibold text-foreground">{user.skillsOffered.length}</div>
                <div className="text-muted-foreground">Skills</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-semibold text-foreground">{user.responseTime}</div>
                <div className="text-muted-foreground">Response</div>
              </div>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex flex-col space-y-2 mt-4 lg:mt-0">
            <Button
              variant="default"
              onClick={onSendRequest}
              iconName="MessageSquare"
              iconPosition="left"
              className="w-full lg:w-auto"
            >
              Send Request
            </Button>
            <div className="flex space-x-2">
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
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;