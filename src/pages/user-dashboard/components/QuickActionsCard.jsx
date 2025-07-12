import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActionsCard = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      title: 'Find Skills',
      description: 'Browse users and discover new skills to learn',
      icon: 'Search',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      action: () => navigate('/browse-users')
    },
    {
      title: 'Update Profile',
      description: 'Add new skills or update your availability',
      icon: 'User',
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      action: () => navigate('/user-profile-settings')
    },
    {
      title: 'View Requests',
      description: 'Manage your pending swap requests',
      icon: 'MessageSquare',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      action: () => navigate('/swap-requests-management')
    },
    {
      title: 'Active Swaps',
      description: 'Check your ongoing skill exchanges',
      icon: 'Users',
      color: 'text-success',
      bgColor: 'bg-success/10',
      action: () => navigate('/active-swaps')
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 mb-6">
      <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center">
        <Icon name="Zap" size={20} className="mr-2 text-warning" />
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {quickActions.map((action, index) => (
          <div
            key={index}
            onClick={action.action}
            className="group p-4 rounded-lg border border-border hover:border-primary/20 transition-all duration-200 cursor-pointer hover:shadow-md"
          >
            <div className="flex items-start space-x-3">
              <div className={`w-12 h-12 rounded-lg ${action.bgColor} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                <Icon name={action.icon} size={20} className={action.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground group-hover:text-primary transition-colors duration-200">
                  {action.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                  {action.description}
                </p>
              </div>
              <Icon 
                name="ArrowRight" 
                size={16} 
                className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200" 
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="TrendingUp" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Your Progress</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/user-profile-settings')}
            iconName="BarChart3"
            iconPosition="left"
          >
            View Stats
          </Button>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-primary">12</div>
            <div className="text-xs text-muted-foreground">Skills Offered</div>
          </div>
          <div>
            <div className="text-lg font-bold text-secondary">8</div>
            <div className="text-xs text-muted-foreground">Skills Learning</div>
          </div>
          <div>
            <div className="text-lg font-bold text-success">4.8</div>
            <div className="text-xs text-muted-foreground">Avg Rating</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActionsCard;