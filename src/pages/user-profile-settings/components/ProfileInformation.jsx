import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const ProfileInformation = () => {
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    location: "San Francisco, CA",
    bio: "Full-stack developer passionate about React and Node.js. Love sharing knowledge and learning new technologies. Available for skill exchanges in web development, mobile apps, and cloud architecture."
  });
  const [profilePhoto, setProfilePhoto] = useState("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showPhotoPreview, setShowPhotoPreview] = useState(false);
  const [tempPhoto, setTempPhoto] = useState(null);

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }
      
      setIsUploading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        setTempPhoto(event.target.result);
        setShowPhotoPreview(true);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const confirmPhotoUpload = () => {
    setProfilePhoto(tempPhoto);
    setShowPhotoPreview(false);
    setTempPhoto(null);
  };

  const cancelPhotoUpload = () => {
    setShowPhotoPreview(false);
    setTempPhoto(null);
  };

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('Profile information saved successfully!');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="User" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Profile Information</h2>
      </div>

      {/* Profile Photo Section */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-foreground mb-3">Profile Photo</label>
        <div className="flex items-start space-x-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-border">
              <Image
                src={profilePhoto}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            {isUploading && (
              <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                <Icon name="Loader2" size={20} className="text-white animate-spin" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Upload"
                iconPosition="left"
                onClick={() => document.getElementById('photo-upload').click()}
                disabled={isUploading}
              >
                {isUploading ? 'Uploading...' : 'Change Photo'}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                iconName="Trash2"
                iconPosition="left"
                onClick={() => setProfilePhoto("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face")}
              >
                Remove
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              JPG, PNG or GIF. Max size 5MB. Recommended 400x400px.
            </p>
            <input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        </div>
      </div>

      {/* Photo Preview Modal */}
      {showPhotoPreview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
          <div className="bg-card rounded-lg p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold text-foreground mb-4">Preview Photo</h3>
            <div className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-border mb-6">
              <Image
                src={tempPhoto}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-3">
              <Button
                variant="default"
                size="sm"
                onClick={confirmPhotoUpload}
                className="flex-1"
              >
                Use This Photo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={cancelPhotoUpload}
                className="flex-1"
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Form Fields */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <Input
          label="Full Name"
          type="text"
          value={profileData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter your full name"
          required
        />
        
        <Input
          label="Email Address"
          type="email"
          value={profileData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter your email"
          description="Email cannot be changed"
          disabled
        />
        
        <div className="lg:col-span-2">
          <Input
            label="Location"
            type="text"
            value={profileData.location}
            onChange={(e) => handleInputChange('location', e.target.value)}
            placeholder="City, State/Country"
            description="Help others find local skill exchange opportunities"
          />
        </div>
      </div>

      {/* Bio Section */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-foreground mb-2">Bio</label>
        <textarea
          value={profileData.bio}
          onChange={(e) => handleInputChange('bio', e.target.value)}
          placeholder="Tell others about yourself, your experience, and what you're passionate about..."
          className="w-full h-32 px-3 py-2 border border-border rounded-lg bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
          maxLength={500}
        />
        <div className="flex justify-between items-center mt-2">
          <p className="text-xs text-muted-foreground">
            Share your background and what makes you a great skill exchange partner
          </p>
          <span className="text-xs text-muted-foreground">
            {profileData.bio.length}/500
          </span>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
};

export default ProfileInformation;