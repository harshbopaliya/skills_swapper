import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SettingsNavigation from './components/SettingsNavigation';
import ProfileInformation from './components/ProfileInformation';
import SkillsManagement from './components/SkillsManagement';
import AvailabilitySettings from './components/AvailabilitySettings';
import PrivacyControls from './components/PrivacyControls';
import AccountSecurity from './components/AccountSecurity';

const UserProfileSettings = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('profile');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  useEffect(() => {
    // Check for unsaved changes warning
    const handleBeforeUnload = (e) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = '';
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleSectionChange = (sectionId) => {
    if (hasUnsavedChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to leave this section?')) {
        setActiveSection(sectionId);
        setHasUnsavedChanges(false);
      }
    } else {
      setActiveSection(sectionId);
    }
  };

  const handleBackToProfile = () => {
    if (hasUnsavedChanges) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        navigate('/user-dashboard');
      }
    } else {
      navigate('/user-dashboard');
    }
  };

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return <ProfileInformation />;
      case 'skills':
        return <SkillsManagement />;
      case 'availability':
        return <AvailabilitySettings />;
      case 'privacy':
        return <PrivacyControls />;
      case 'security':
        return <AccountSecurity />;
      default:
        return <ProfileInformation />;
    }
  };

  const getSectionTitle = () => {
    const titles = {
      profile: 'Profile Information',
      skills: 'Skills Management',
      availability: 'Availability Settings',
      privacy: 'Privacy & Communication',
      security: 'Account Security'
    };
    return titles[activeSection] || 'Profile Settings';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16 pb-16 lg:pb-0 lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 lg:px-6 py-6">
          {/* Breadcrumb Navigation */}
          <div className="flex items-center space-x-2 mb-6 text-sm">
            <button
              onClick={handleBackToProfile}
              className="flex items-center space-x-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Icon name="ArrowLeft" size={16} />
              <span>Back to Dashboard</span>
            </button>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            <span className="text-foreground font-medium">Profile Settings</span>
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">{getSectionTitle()}</span>
          </div>

          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Profile Settings
              </h1>
              <p className="text-muted-foreground">
                Manage your personal information, skills, and platform preferences to optimize your skill exchange experience.
              </p>
            </div>
            
            {/* Quick Actions */}
            <div className="flex items-center space-x-3 mt-4 lg:mt-0">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/user-profile-detail')}
                iconName="Eye"
                iconPosition="left"
              >
                Preview Profile
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => alert('All settings saved successfully!')}
                iconName="Save"
                iconPosition="left"
              >
                Save All
              </Button>
            </div>
          </div>

          {/* Settings Layout */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Settings Navigation */}
            <SettingsNavigation 
              activeSection={activeSection} 
              onSectionChange={handleSectionChange} 
            />

            {/* Settings Content */}
            <div className="flex-1 min-w-0">
              {/* Unsaved Changes Warning */}
              {hasUnsavedChanges && (
                <div className="mb-6 p-4 bg-warning bg-opacity-10 border border-warning rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon name="AlertTriangle" size={20} className="text-warning" />
                    <div>
                      <p className="font-medium text-foreground">Unsaved Changes</p>
                      <p className="text-sm text-muted-foreground">
                        You have unsaved changes in this section. Don't forget to save before leaving.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Active Section Content */}
              {renderActiveSection()}

              {/* Mobile Section Navigation */}
              <div className="lg:hidden mt-8 flex justify-between">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const sections = ['profile', 'skills', 'availability', 'privacy', 'security'];
                    const currentIndex = sections.indexOf(activeSection);
                    if (currentIndex > 0) {
                      handleSectionChange(sections[currentIndex - 1]);
                    }
                  }}
                  disabled={activeSection === 'profile'}
                  iconName="ChevronLeft"
                  iconPosition="left"
                >
                  Previous
                </Button>
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    const sections = ['profile', 'skills', 'availability', 'privacy', 'security'];
                    const currentIndex = sections.indexOf(activeSection);
                    if (currentIndex < sections.length - 1) {
                      handleSectionChange(sections[currentIndex + 1]);
                    }
                  }}
                  disabled={activeSection === 'security'}
                  iconName="ChevronRight"
                  iconPosition="right"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-12 p-6 bg-muted rounded-lg">
            <div className="flex items-start space-x-4">
              <Icon name="HelpCircle" size={24} className="text-primary flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">Need Help?</h3>
                <p className="text-muted-foreground mb-4">
                  If you need assistance with your profile settings or have questions about skill exchanges, 
                  our support team is here to help.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Contact Support
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    iconName="ExternalLink"
                    iconPosition="left"
                  >
                    View Help Center
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <ContextualActionBar />
      <BottomNavigation />
    </div>
  );
};

export default UserProfileSettings;