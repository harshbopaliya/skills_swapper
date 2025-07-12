import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SettingsNavigation = ({ activeSection, onSectionChange }) => {
  const sections = [
    {
      id: 'profile',
      label: 'Profile Information',
      icon: 'User',
      description: 'Basic info and photo'
    },
    {
      id: 'skills',
      label: 'Skills Management',
      icon: 'BookOpen',
      description: 'Offered and wanted skills'
    },
    {
      id: 'availability',
      label: 'Availability',
      icon: 'Calendar',
      description: 'Schedule and timezone'
    },
    {
      id: 'privacy',
      label: 'Privacy & Communication',
      icon: 'Shield',
      description: 'Privacy and notifications'
    },
    {
      id: 'security',
      label: 'Account Security',
      icon: 'Lock',
      description: 'Password and 2FA'
    }
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <div className="lg:hidden mb-6">
        <div className="flex overflow-x-auto space-x-2 pb-2">
          {sections.map(section => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? "default" : "outline"}
              size="sm"
              onClick={() => onSectionChange(section.id)}
              iconName={section.icon}
              iconPosition="left"
              className="flex-shrink-0"
            >
              {section.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Desktop Sidebar Navigation */}
      <div className="hidden lg:block w-64 flex-shrink-0">
        <div className="bg-card border border-border rounded-lg p-4 sticky top-24">
          <h3 className="font-semibold text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Settings" size={20} className="text-primary" />
            <span>Settings</span>
          </h3>
          
          <nav className="space-y-2">
            {sections.map(section => (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${
                  activeSection === section.id
                    ? 'bg-primary text-primary-foreground'
                    : 'hover:bg-muted text-foreground'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon 
                    name={section.icon} 
                    size={18} 
                    className={activeSection === section.id ? 'text-primary-foreground' : 'text-muted-foreground'}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{section.label}</p>
                    <p className={`text-xs ${
                      activeSection === section.id ? 'text-primary-foreground opacity-80' : 'text-muted-foreground'
                    }`}>
                      {section.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </nav>

          {/* Quick Stats */}
          <div className="mt-6 pt-4 border-t border-border">
            <h4 className="text-sm font-medium text-foreground mb-3">Profile Completion</h4>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Overall</span>
                <span className="text-foreground font-medium">85%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
            </div>
            
            <div className="mt-4 space-y-2 text-xs">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-muted-foreground">Profile verified</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-muted-foreground">Skills added</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-warning rounded-full"></div>
                <span className="text-muted-foreground">Availability set</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsNavigation;