import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ScheduleModal = ({ swap, isOpen, onClose, onSchedule }) => {
  const [sessionData, setSessionData] = useState({
    date: '',
    time: '',
    duration: '60',
    type: 'video',
    topic: '',
    notes: ''
  });

  const durationOptions = [
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' },
    { value: '90', label: '1.5 hours' },
    { value: '120', label: '2 hours' }
  ];

  const typeOptions = [
    { value: 'video', label: 'Video Call' },
    { value: 'in-person', label: 'In Person' },
    { value: 'phone', label: 'Phone Call' }
  ];

  const handleInputChange = (field, value) => {
    setSessionData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    onSchedule({
      swapId: swap.id,
      sessionData
    });
    onClose();
  };

  const getTomorrowDate = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
      <div className="bg-card rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Schedule Session</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-8 h-8"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Schedule a session with {swap?.partner?.name}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {/* Partner Info */}
          <div className="bg-muted rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
              <div>
                <p className="font-medium text-foreground">{swap?.partner?.name}</p>
                <p className="text-sm text-muted-foreground">
                  Teaching: {swap?.partnerSkill}
                </p>
              </div>
            </div>
          </div>

          {/* Date and Time */}
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="date"
              label="Date"
              value={sessionData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              min={getTomorrowDate()}
              required
            />
            <Input
              type="time"
              label="Time"
              value={sessionData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              required
            />
          </div>

          {/* Duration and Type */}
          <div className="grid grid-cols-2 gap-3">
            <Select
              label="Duration"
              options={durationOptions}
              value={sessionData.duration}
              onChange={(value) => handleInputChange('duration', value)}
            />
            <Select
              label="Type"
              options={typeOptions}
              value={sessionData.type}
              onChange={(value) => handleInputChange('type', value)}
            />
          </div>

          {/* Topic */}
          <Input
            type="text"
            label="Session Topic"
            placeholder="What will you focus on in this session?"
            value={sessionData.topic}
            onChange={(e) => handleInputChange('topic', e.target.value)}
            required
          />

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Additional Notes
            </label>
            <textarea
              className="w-full p-3 border border-border rounded-lg bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
              rows={3}
              placeholder="Any special requirements or preparation notes..."
              value={sessionData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
            />
          </div>

          {/* Availability Notice */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
            <div className="flex items-start space-x-2">
              <Icon name="Info" size={16} className="text-primary mt-0.5" />
              <div>
                <p className="text-sm font-medium text-primary">Availability Check</p>
                <p className="text-xs text-muted-foreground mt-1">
                  We'll send a request to {swap?.partner?.name} to confirm their availability for this time slot.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={!sessionData.date || !sessionData.time || !sessionData.topic}
              iconName="Calendar"
              iconPosition="left"
              className="flex-1"
            >
              Send Request
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;