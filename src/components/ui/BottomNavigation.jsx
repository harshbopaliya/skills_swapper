import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const BottomNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Dashboard',
      path: '/user-dashboard',
      icon: 'Home',
      badge: null
    },
    {
      label: 'Browse',
      path: '/browse-users',
      icon: 'Search',
      badge: null
    },
    {
      label: 'Requests',
      path: '/swap-requests-management',
      icon: 'MessageSquare',
      badge: 3
    },
    {
      label: 'Profile',
      path: '/user-profile-settings',
      icon: 'User',
      badge: null
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => {
    if (path === '/browse-users') {
      return location.pathname === '/browse-users' || location.pathname === '/user-profile-detail';
    }
    if (path === '/swap-requests-management') {
      return location.pathname === '/swap-requests-management' || location.pathname === '/active-swaps';
    }
    return location.pathname === path;
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-100">
        <div className="flex items-center justify-around h-16 px-2">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Button
                key={item.path}
                variant="ghost"
                size="sm"
                onClick={() => handleNavigation(item.path)}
                className={`flex flex-col items-center justify-center h-12 px-3 relative transition-colors duration-200 ${
                  active 
                    ? 'text-primary' :'text-muted-foreground hover:text-foreground'
                }`}
              >
                <div className="relative">
                  <Icon 
                    name={item.icon} 
                    size={20} 
                    className={active ? 'text-primary' : 'text-current'}
                  />
                  {item.badge && (
                    <span className="absolute -top-2 -right-2 bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className={`text-xs mt-1 font-medium ${active ? 'text-primary' : 'text-current'}`}>
                  {item.label}
                </span>
              </Button>
            );
          })}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:block fixed left-0 top-16 bottom-0 w-64 bg-card border-r border-border z-100">
        <div className="p-4 space-y-2">
          {navigationItems.map((item) => {
            const active = isActive(item.path);
            return (
              <Button
                key={item.path}
                variant={active ? "secondary" : "ghost"}
                size="default"
                onClick={() => handleNavigation(item.path)}
                className={`w-full justify-start relative transition-all duration-200 ${
                  active 
                    ? 'bg-secondary text-secondary-foreground' 
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
                iconName={item.icon}
                iconPosition="left"
              >
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-error text-error-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center ml-auto">
                    {item.badge}
                  </span>
                )}
              </Button>
            );
          })}
        </div>

        {/* Quick Actions Section */}
        <div className="p-4 border-t border-border mt-8">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              iconName="Plus"
              iconPosition="left"
              onClick={() => navigate('/browse-users')}
            >
              Find Skills
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              iconName="Calendar"
              iconPosition="left"
              onClick={() => navigate('/active-swaps')}
            >
              Schedule Session
            </Button>
          </div>
        </div>

        {/* Status Section */}
        <div className="p-4 border-t border-border mt-8">
          <div className="bg-muted rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-2">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-sm font-medium text-foreground">Active</span>
            </div>
            <p className="text-xs text-muted-foreground">
              Ready for skill exchanges
            </p>
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomNavigation;