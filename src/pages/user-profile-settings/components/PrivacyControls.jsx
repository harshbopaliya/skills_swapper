import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const PrivacyControls = () => {
  const [privacySettings, setPrivacySettings] = useState({
    profileVisibility: 'public',
    showLocation: true,
    showEmail: false,
    allowDirectMessages: true,
    showOnlineStatus: true,
    showSkillRatings: true,
    allowProfileSearch: true,
    showSwapHistory: false
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    swapRequests: true,
    messages: true,
    profileViews: false,
    skillMatches: true,
    weeklyDigest: true,
    marketingEmails: false,
    systemUpdates: true,
    reminderNotifications: true
  });

  const [contactPreferences, setContactPreferences] = useState({
    preferredContactMethod: 'platform',
    responseTime: 'within_24h',
    availableForMentoring: true,
    acceptBeginnerRequests: true,
    maxActiveSwaps: 5
  });

  const [isSaving, setIsSaving] = useState(false);

  const handlePrivacyChange = (setting, value) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleNotificationChange = (setting, value) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleContactChange = (setting, value) => {
    setContactPreferences(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('Privacy settings saved successfully!');
  };

  const resetToDefaults = () => {
    setPrivacySettings({
      profileVisibility: 'public',
      showLocation: true,
      showEmail: false,
      allowDirectMessages: true,
      showOnlineStatus: true,
      showSkillRatings: true,
      allowProfileSearch: true,
      showSwapHistory: false
    });
    setNotificationSettings({
      emailNotifications: true,
      pushNotifications: true,
      swapRequests: true,
      messages: true,
      profileViews: false,
      skillMatches: true,
      weeklyDigest: true,
      marketingEmails: false,
      systemUpdates: true,
      reminderNotifications: true
    });
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Shield" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Privacy & Communication</h2>
      </div>

      <div className="space-y-8">
        {/* Profile Privacy */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Eye" size={20} className="text-secondary" />
            <span>Profile Privacy</span>
          </h3>
          
          <div className="space-y-4 ml-7">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Profile Visibility</label>
              <div className="space-y-2">
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="profileVisibility"
                    value="public"
                    checked={privacySettings.profileVisibility === 'public'}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-ring"
                  />
                  <div>
                    <span className="text-sm font-medium text-foreground">Public</span>
                    <p className="text-xs text-muted-foreground">Anyone can find and view your profile</p>
                  </div>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="profileVisibility"
                    value="limited"
                    checked={privacySettings.profileVisibility === 'limited'}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-ring"
                  />
                  <div>
                    <span className="text-sm font-medium text-foreground">Limited</span>
                    <p className="text-xs text-muted-foreground">Only users with matching skills can see your profile</p>
                  </div>
                </label>
                <label className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="profileVisibility"
                    value="private"
                    checked={privacySettings.profileVisibility === 'private'}
                    onChange={(e) => handlePrivacyChange('profileVisibility', e.target.value)}
                    className="w-4 h-4 text-primary border-border focus:ring-ring"
                  />
                  <div>
                    <span className="text-sm font-medium text-foreground">Private</span>
                    <p className="text-xs text-muted-foreground">Hidden from search, only direct links work</p>
                  </div>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Checkbox
                label="Show Location"
                description="Display your city/region on profile"
                checked={privacySettings.showLocation}
                onChange={(e) => handlePrivacyChange('showLocation', e.target.checked)}
              />
              
              <Checkbox
                label="Show Email Address"
                description="Allow others to see your email"
                checked={privacySettings.showEmail}
                onChange={(e) => handlePrivacyChange('showEmail', e.target.checked)}
              />
              
              <Checkbox
                label="Allow Direct Messages"
                description="Let users message you directly"
                checked={privacySettings.allowDirectMessages}
                onChange={(e) => handlePrivacyChange('allowDirectMessages', e.target.checked)}
              />
              
              <Checkbox
                label="Show Online Status"
                description="Display when you're active"
                checked={privacySettings.showOnlineStatus}
                onChange={(e) => handlePrivacyChange('showOnlineStatus', e.target.checked)}
              />
              
              <Checkbox
                label="Show Skill Ratings"
                description="Display ratings from other users"
                checked={privacySettings.showSkillRatings}
                onChange={(e) => handlePrivacyChange('showSkillRatings', e.target.checked)}
              />
              
              <Checkbox
                label="Allow Profile Search"
                description="Include profile in search results"
                checked={privacySettings.allowProfileSearch}
                onChange={(e) => handlePrivacyChange('allowProfileSearch', e.target.checked)}
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Bell" size={20} className="text-warning" />
            <span>Notification Preferences</span>
          </h3>
          
          <div className="space-y-4 ml-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Checkbox
                label="Email Notifications"
                description="Receive notifications via email"
                checked={notificationSettings.emailNotifications}
                onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
              />
              
              <Checkbox
                label="Push Notifications"
                description="Browser/mobile push notifications"
                checked={notificationSettings.pushNotifications}
                onChange={(e) => handleNotificationChange('pushNotifications', e.target.checked)}
              />
              
              <Checkbox
                label="Swap Requests"
                description="New skill swap requests"
                checked={notificationSettings.swapRequests}
                onChange={(e) => handleNotificationChange('swapRequests', e.target.checked)}
              />
              
              <Checkbox
                label="Messages"
                description="New direct messages"
                checked={notificationSettings.messages}
                onChange={(e) => handleNotificationChange('messages', e.target.checked)}
              />
              
              <Checkbox
                label="Profile Views"
                description="When someone views your profile"
                checked={notificationSettings.profileViews}
                onChange={(e) => handleNotificationChange('profileViews', e.target.checked)}
              />
              
              <Checkbox
                label="Skill Matches"
                description="New users with matching skills"
                checked={notificationSettings.skillMatches}
                onChange={(e) => handleNotificationChange('skillMatches', e.target.checked)}
              />
              
              <Checkbox
                label="Weekly Digest"
                description="Weekly summary of activity"
                checked={notificationSettings.weeklyDigest}
                onChange={(e) => handleNotificationChange('weeklyDigest', e.target.checked)}
              />
              
              <Checkbox
                label="System Updates"
                description="Platform updates and maintenance"
                checked={notificationSettings.systemUpdates}
                onChange={(e) => handleNotificationChange('systemUpdates', e.target.checked)}
              />
            </div>
          </div>
        </div>

        {/* Contact Preferences */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="MessageCircle" size={20} className="text-success" />
            <span>Contact Preferences</span>
          </h3>
          
          <div className="space-y-4 ml-7">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Preferred Contact Method</label>
                <select
                  value={contactPreferences.preferredContactMethod}
                  onChange={(e) => handleContactChange('preferredContactMethod', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="platform">Platform Messages</option>
                  <option value="email">Email</option>
                  <option value="video">Video Call</option>
                  <option value="phone">Phone Call</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Response Time</label>
                <select
                  value={contactPreferences.responseTime}
                  onChange={(e) => handleContactChange('responseTime', e.target.value)}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="within_1h">Within 1 hour</option>
                  <option value="within_24h">Within 24 hours</option>
                  <option value="within_3d">Within 3 days</option>
                  <option value="within_1w">Within 1 week</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Max Active Swaps</label>
                <select
                  value={contactPreferences.maxActiveSwaps}
                  onChange={(e) => handleContactChange('maxActiveSwaps', parseInt(e.target.value))}
                  className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value={1}>1 swap at a time</option>
                  <option value={3}>Up to 3 swaps</option>
                  <option value={5}>Up to 5 swaps</option>
                  <option value={10}>Up to 10 swaps</option>
                  <option value={-1}>No limit</option>
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Checkbox
                label="Available for Mentoring"
                description="Open to mentoring beginners"
                checked={contactPreferences.availableForMentoring}
                onChange={(e) => handleContactChange('availableForMentoring', e.target.checked)}
              />
              
              <Checkbox
                label="Accept Beginner Requests"
                description="Welcome requests from new users"
                checked={contactPreferences.acceptBeginnerRequests}
                onChange={(e) => handleContactChange('acceptBeginnerRequests', e.target.checked)}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-6 border-t border-border space-y-3 sm:space-y-0">
          <Button
            variant="outline"
            onClick={resetToDefaults}
            iconName="RotateCcw"
            iconPosition="left"
          >
            Reset to Defaults
          </Button>
          
          <Button
            variant="default"
            onClick={handleSave}
            loading={isSaving}
            iconName="Save"
            iconPosition="left"
          >
            {isSaving ? 'Saving...' : 'Save Privacy Settings'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyControls;