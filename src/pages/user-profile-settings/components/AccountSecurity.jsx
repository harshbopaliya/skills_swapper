import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const AccountSecurity = () => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [emailVerified, setEmailVerified] = useState(true);
  const [showQRCode, setShowQRCode] = useState(false);
  const [backupCodes, setBackupCodes] = useState([]);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [passwordErrors, setPasswordErrors] = useState({});

  const securityEvents = [
    { id: 1, event: "Password changed", date: "2025-01-10", location: "San Francisco, CA", device: "Chrome on Windows" },
    { id: 2, event: "Login", date: "2025-01-12", location: "San Francisco, CA", device: "Safari on iPhone" },
    { id: 3, event: "Profile updated", date: "2025-01-11", location: "San Francisco, CA", device: "Chrome on Windows" },
    { id: 4, event: "Login", date: "2025-01-09", location: "San Francisco, CA", device: "Chrome on Windows" }
  ];

  const validatePassword = (password) => {
    const errors = {};
    if (password.length < 8) errors.length = "Password must be at least 8 characters";
    if (!/[A-Z]/.test(password)) errors.uppercase = "Must contain uppercase letter";
    if (!/[a-z]/.test(password)) errors.lowercase = "Must contain lowercase letter";
    if (!/[0-9]/.test(password)) errors.number = "Must contain number";
    if (!/[!@#$%^&*]/.test(password)) errors.special = "Must contain special character";
    return errors;
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }));

    if (field === 'newPassword') {
      setPasswordErrors(validatePassword(value));
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    const errors = validatePassword(passwordData.newPassword);
    if (Object.keys(errors).length > 0) {
      alert('Please fix password requirements');
      return;
    }

    setIsChangingPassword(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsChangingPassword(false);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    alert('Password changed successfully!');
  };

  const handleEnable2FA = async () => {
    setIsEnabling2FA(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Generate mock backup codes
    const codes = Array.from({ length: 8 }, () => 
      Math.random().toString(36).substring(2, 8).toUpperCase()
    );
    setBackupCodes(codes);
    setTwoFactorEnabled(true);
    setShowQRCode(false);
    setIsEnabling2FA(false);
    alert('Two-factor authentication enabled successfully!');
  };

  const handleDisable2FA = async () => {
    if (confirm('Are you sure you want to disable two-factor authentication?')) {
      setTwoFactorEnabled(false);
      setBackupCodes([]);
      alert('Two-factor authentication disabled');
    }
  };

  const sendVerificationEmail = async () => {
    alert('Verification email sent to john.doe@example.com');
  };

  const downloadBackupCodes = () => {
    const codesText = backupCodes.join('\n');
    const blob = new Blob([codesText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'backup-codes.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Lock" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Account Security</h2>
      </div>

      <div className="space-y-8">
        {/* Email Verification */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Mail" size={20} className="text-success" />
            <span>Email Verification</span>
          </h3>
          
          <div className="ml-7 p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${emailVerified ? 'bg-success' : 'bg-warning'}`}></div>
                <div>
                  <p className="font-medium text-foreground">john.doe@example.com</p>
                  <p className="text-sm text-muted-foreground">
                    {emailVerified ? 'Verified' : 'Verification pending'}
                  </p>
                </div>
              </div>
              {!emailVerified && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={sendVerificationEmail}
                  iconName="Send"
                  iconPosition="left"
                >
                  Resend Verification
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Password Change */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Key" size={20} className="text-warning" />
            <span>Change Password</span>
          </h3>
          
          <div className="ml-7 space-y-4">
            <Input
              label="Current Password"
              type="password"
              value={passwordData.currentPassword}
              onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
              placeholder="Enter current password"
              required
            />
            
            <Input
              label="New Password"
              type="password"
              value={passwordData.newPassword}
              onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
              placeholder="Enter new password"
              error={Object.keys(passwordErrors).length > 0 ? 'Password requirements not met' : ''}
              required
            />

            {/* Password Requirements */}
            {passwordData.newPassword && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {[
                  { key: 'length', text: 'At least 8 characters' },
                  { key: 'uppercase', text: 'Uppercase letter' },
                  { key: 'lowercase', text: 'Lowercase letter' },
                  { key: 'number', text: 'Number' },
                  { key: 'special', text: 'Special character (!@#$%^&*)' }
                ].map(req => (
                  <div key={req.key} className={`flex items-center space-x-2 ${
                    passwordErrors[req.key] ? 'text-error' : 'text-success'
                  }`}>
                    <Icon name={passwordErrors[req.key] ? 'X' : 'Check'} size={12} />
                    <span>{req.text}</span>
                  </div>
                ))}
              </div>
            )}
            
            <Input
              label="Confirm New Password"
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
              placeholder="Confirm new password"
              error={passwordData.confirmPassword && passwordData.newPassword !== passwordData.confirmPassword ? 'Passwords do not match' : ''}
              required
            />
            
            <Button
              variant="default"
              onClick={handleChangePassword}
              loading={isChangingPassword}
              disabled={!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword || Object.keys(passwordErrors).length > 0}
              iconName="Save"
              iconPosition="left"
            >
              {isChangingPassword ? 'Changing Password...' : 'Change Password'}
            </Button>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Smartphone" size={20} className="text-secondary" />
            <span>Two-Factor Authentication</span>
          </h3>
          
          <div className="ml-7">
            <div className="p-4 border border-border rounded-lg mb-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <div className={`w-3 h-3 rounded-full ${twoFactorEnabled ? 'bg-success' : 'bg-muted'}`}></div>
                  <div>
                    <p className="font-medium text-foreground">
                      Two-Factor Authentication {twoFactorEnabled ? 'Enabled' : 'Disabled'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {twoFactorEnabled 
                        ? 'Your account is protected with 2FA' :'Add an extra layer of security to your account'
                      }
                    </p>
                  </div>
                </div>
                
                {twoFactorEnabled ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleDisable2FA}
                    iconName="Shield"
                    iconPosition="left"
                  >
                    Disable 2FA
                  </Button>
                ) : (
                  <Button
                    variant="default"
                    size="sm"
                    onClick={() => setShowQRCode(true)}
                    iconName="Shield"
                    iconPosition="left"
                  >
                    Enable 2FA
                  </Button>
                )}
              </div>
              
              {twoFactorEnabled && backupCodes.length > 0 && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-sm font-medium text-foreground">Backup Codes</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={downloadBackupCodes}
                      iconName="Download"
                      iconPosition="left"
                    >
                      Download
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Save these codes in a safe place. Each can only be used once.
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                    {backupCodes.slice(0, 4).map((code, index) => (
                      <span key={index} className="bg-background p-1 rounded border">{code}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 2FA Setup Modal */}
            {showQRCode && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-300 p-4">
                <div className="bg-card rounded-lg p-6 max-w-md w-full">
                  <h3 className="text-lg font-semibold text-foreground mb-4">Setup Two-Factor Authentication</h3>
                  
                  <div className="text-center mb-6">
                    <div className="w-48 h-48 mx-auto bg-muted rounded-lg flex items-center justify-center mb-4">
                      <div className="text-center">
                        <Icon name="QrCode" size={48} className="text-muted-foreground mx-auto mb-2" />
                        <p className="text-sm text-muted-foreground">QR Code would appear here</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Scan this QR code with your authenticator app (Google Authenticator, Authy, etc.)
                    </p>
                  </div>
                  
                  <Input
                    label="Verification Code"
                    type="text"
                    placeholder="Enter 6-digit code"
                    description="Enter the code from your authenticator app"
                  />
                  
                  <div className="flex space-x-3 mt-6">
                    <Button
                      variant="default"
                      onClick={handleEnable2FA}
                      loading={isEnabling2FA}
                      className="flex-1"
                    >
                      {isEnabling2FA ? 'Enabling...' : 'Enable 2FA'}
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => setShowQRCode(false)}
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Security Activity */}
        <div>
          <h3 className="text-lg font-medium text-foreground mb-4 flex items-center space-x-2">
            <Icon name="Activity" size={20} className="text-error" />
            <span>Recent Security Activity</span>
          </h3>
          
          <div className="ml-7">
            <div className="space-y-3">
              {securityEvents.map(event => (
                <div key={event.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Icon 
                      name={event.event === 'Login' ? 'LogIn' : event.event === 'Password changed' ? 'Key' : 'Edit'} 
                      size={16} 
                      className="text-muted-foreground" 
                    />
                    <div>
                      <p className="font-medium text-foreground">{event.event}</p>
                      <p className="text-sm text-muted-foreground">
                        {event.date} • {event.location} • {event.device}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" iconName="MoreHorizontal" />
                </div>
              ))}
            </div>
            
            <Button
              variant="outline"
              size="sm"
              className="mt-4"
              iconName="ExternalLink"
              iconPosition="left"
            >
              View All Activity
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;