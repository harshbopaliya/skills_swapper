import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';

import Select from '../../../components/ui/Select';

const RequestModal = ({ isOpen, onClose, user, onSendRequest, loading = false }) => {
  const [formData, setFormData] = useState({
    offeredSkill: '',
    wantedSkill: '',
    message: ''
  });
  const [errors, setErrors] = useState({});

  // Mock current user skills - in real app, get from database
  const currentUserSkills = [
    'React', 'JavaScript', 'Python', 'Node.js', 'Data Analysis'
  ];

  useEffect(() => {
    if (isOpen) {
      setFormData({
        offeredSkill: '',
        wantedSkill: '',
        message: `Hi ${user?.name || ''}! I'd love to exchange skills with you. I think we could both benefit from sharing our knowledge.`
      });
      setErrors({});
    }
  }, [isOpen, user]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.offeredSkill) {
      newErrors.offeredSkill = 'Please select a skill to offer';
    }
    
    if (!formData.wantedSkill) {
      newErrors.wantedSkill = 'Please select a skill you want to learn';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Please add a message';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    await onSendRequest(formData);
  };

  if (!isOpen || !user) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-background rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={user.profile_photo || user.profilePhoto}
                alt={user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <h2 className="text-lg font-semibold text-foreground">
                  Send Swap Request
                </h2>
                <p className="text-sm text-muted-foreground">to {user.name}</p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              iconName="X"
              className="text-muted-foreground hover:text-foreground"
            />
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto max-h-[calc(90vh-140px)]">
            {/* Skill I Can Offer */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Skill I Can Offer
              </label>
              <Select
                value={formData.offeredSkill}
                onValueChange={(value) => handleInputChange('offeredSkill', value)}
                placeholder="Select a skill you can teach"
                error={errors.offeredSkill}
              >
                {currentUserSkills.map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </Select>
              {errors.offeredSkill && (
                <p className="text-sm text-destructive mt-1">{errors.offeredSkill}</p>
              )}
            </div>

            {/* Skill I Want to Learn */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Skill I Want to Learn
              </label>
              <Select
                value={formData.wantedSkill}
                onValueChange={(value) => handleInputChange('wantedSkill', value)}
                placeholder="Select a skill you want to learn"
                error={errors.wantedSkill}
              >
                {(user.skillsOffered || []).map((skill) => (
                  <option key={skill} value={skill}>
                    {skill}
                  </option>
                ))}
              </Select>
              {errors.wantedSkill && (
                <p className="text-sm text-destructive mt-1">{errors.wantedSkill}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Message
              </label>
              <textarea
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                placeholder="Write a message to introduce yourself..."
                rows={4}
                className="w-full px-3 py-2 border border-input bg-background text-foreground rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              />
              {errors.message && (
                <p className="text-sm text-destructive mt-1">{errors.message}</p>
              )}
            </div>

            {/* User Info Summary */}
            <div className="bg-muted/20 rounded-lg p-4 mt-6">
              <h4 className="font-medium text-foreground mb-2">Exchange Summary</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">You teach:</span>
                  <span className="text-foreground font-medium">
                    {formData.offeredSkill || 'Select skill'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">You learn:</span>
                  <span className="text-foreground font-medium">
                    {formData.wantedSkill || 'Select skill'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Partner:</span>
                  <span className="text-foreground font-medium">{user.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Their availability:</span>
                  <span className="text-foreground font-medium">{user.availability}</span>
                </div>
              </div>
            </div>
          </form>

          {/* Footer */}
          <div className="flex space-x-3 p-6 border-t bg-muted/20">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={handleSubmit}
              className="flex-1"
              iconName={loading ? "Loader2" : "Send"}
              iconPosition="left"
              disabled={loading}
              iconClassName={loading ? "animate-spin" : ""}
            >
              {loading ? 'Sending...' : 'Send Request'}
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default RequestModal;