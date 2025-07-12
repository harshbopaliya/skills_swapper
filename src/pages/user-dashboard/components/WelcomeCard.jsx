import React from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeCard = ({ userName }) => {
  const currentHour = new Date().getHours();
  const getGreeting = () => {
    if (currentHour < 12) return 'Good morning';
    if (currentHour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary rounded-lg p-6 text-white mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h1 className="text-2xl font-bold mb-2">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-white/90 mb-4">
            Ready to exchange skills and learn something new today?
          </p>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" size={16} />
              <span>{new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                month: 'short', 
                day: 'numeric' 
              })}</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>Active</span>
            </div>
          </div>
        </div>
        <div className="hidden sm:block">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="ArrowLeftRight" size={32} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeCard;