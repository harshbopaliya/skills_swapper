import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const AvailabilitySettings = () => {
  const [timezone, setTimezone] = useState('America/Los_Angeles');
  const [availability, setAvailability] = useState({
    monday: { enabled: true, slots: ['09:00-12:00', '14:00-17:00'] },
    tuesday: { enabled: true, slots: ['09:00-12:00', '14:00-17:00'] },
    wednesday: { enabled: true, slots: ['09:00-12:00', '14:00-17:00'] },
    thursday: { enabled: true, slots: ['09:00-12:00', '14:00-17:00'] },
    friday: { enabled: true, slots: ['09:00-12:00', '14:00-17:00'] },
    saturday: { enabled: false, slots: [] },
    sunday: { enabled: false, slots: [] }
  });
  const [isSaving, setIsSaving] = useState(false);

  const timeSlots = [
    '06:00-09:00', '09:00-12:00', '12:00-15:00', '15:00-18:00', 
    '18:00-21:00', '21:00-24:00'
  ];

  const timezones = [
    { value: 'America/Los_Angeles', label: 'Pacific Time (PT)' },
    { value: 'America/Denver', label: 'Mountain Time (MT)' },
    { value: 'America/Chicago', label: 'Central Time (CT)' },
    { value: 'America/New_York', label: 'Eastern Time (ET)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (GMT)' },
    { value: 'Europe/Paris', label: 'Central European Time (CET)' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time (JST)' },
    { value: 'Asia/Shanghai', label: 'China Standard Time (CST)' },
    { value: 'Asia/Kolkata', label: 'India Standard Time (IST)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time (AET)' }
  ];

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const toggleDayEnabled = (day) => {
    setAvailability(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        enabled: !prev[day].enabled,
        slots: !prev[day].enabled ? [] : prev[day].slots
      }
    }));
  };

  const toggleTimeSlot = (day, slot) => {
    setAvailability(prev => {
      const currentSlots = prev[day].slots;
      const newSlots = currentSlots.includes(slot)
        ? currentSlots.filter(s => s !== slot)
        : [...currentSlots, slot].sort();
      
      return {
        ...prev,
        [day]: {
          ...prev[day],
          slots: newSlots
        }
      };
    });
  };

  const setQuickAvailability = (type) => {
    let newAvailability = { ...availability };
    
    switch (type) {
      case 'business':
        daysOfWeek.slice(0, 5).forEach(({ key }) => {
          newAvailability[key] = { enabled: true, slots: ['09:00-12:00', '14:00-17:00'] };
        });
        daysOfWeek.slice(5).forEach(({ key }) => {
          newAvailability[key] = { enabled: false, slots: [] };
        });
        break;
      case 'evenings':
        daysOfWeek.forEach(({ key }) => {
          newAvailability[key] = { enabled: true, slots: ['18:00-21:00'] };
        });
        break;
      case 'weekends':
        daysOfWeek.slice(0, 5).forEach(({ key }) => {
          newAvailability[key] = { enabled: false, slots: [] };
        });
        daysOfWeek.slice(5).forEach(({ key }) => {
          newAvailability[key] = { enabled: true, slots: ['09:00-12:00', '14:00-17:00'] };
        });
        break;
      case 'flexible':
        daysOfWeek.forEach(({ key }) => {
          newAvailability[key] = { enabled: true, slots: ['09:00-12:00', '14:00-17:00', '18:00-21:00'] };
        });
        break;
    }
    
    setAvailability(newAvailability);
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('Availability settings saved successfully!');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="Calendar" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Availability Settings</h2>
      </div>

      {/* Timezone Selection */}
      <div className="mb-8">
        <label className="block text-sm font-medium text-foreground mb-3">Timezone</label>
        <select
          value={timezone}
          onChange={(e) => setTimezone(e.target.value)}
          className="w-full max-w-md px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
        >
          {timezones.map(tz => (
            <option key={tz.value} value={tz.value}>{tz.label}</option>
          ))}
        </select>
        <p className="text-xs text-muted-foreground mt-2">
          Current time: {new Date().toLocaleTimeString('en-US', { timeZone: timezone })}
        </p>
      </div>

      {/* Quick Setup */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-foreground mb-3">Quick Setup</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuickAvailability('business')}
            iconName="Briefcase"
            iconPosition="left"
          >
            Business Hours
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuickAvailability('evenings')}
            iconName="Moon"
            iconPosition="left"
          >
            Evenings Only
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuickAvailability('weekends')}
            iconName="Coffee"
            iconPosition="left"
          >
            Weekends Only
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setQuickAvailability('flexible')}
            iconName="Clock"
            iconPosition="left"
          >
            Very Flexible
          </Button>
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="mb-8">
        <h3 className="text-sm font-medium text-foreground mb-4">Weekly Schedule</h3>
        <div className="space-y-4">
          {daysOfWeek.map(({ key, label }) => (
            <div key={key} className="border border-border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    checked={availability[key].enabled}
                    onChange={() => toggleDayEnabled(key)}
                  />
                  <h4 className="font-medium text-foreground">{label}</h4>
                </div>
                <span className="text-sm text-muted-foreground">
                  {availability[key].slots.length} time slots
                </span>
              </div>
              
              {availability[key].enabled && (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 ml-7">
                  {timeSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => toggleTimeSlot(key, slot)}
                      className={`px-3 py-2 text-xs rounded-lg border transition-colors duration-200 ${
                        availability[key].slots.includes(slot)
                          ? 'bg-primary text-primary-foreground border-primary'
                          : 'bg-background text-foreground border-border hover:bg-muted'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Availability Summary */}
      <div className="mb-8 p-4 bg-muted rounded-lg">
        <h3 className="text-sm font-medium text-foreground mb-3 flex items-center space-x-2">
          <Icon name="Info" size={16} className="text-primary" />
          <span>Availability Summary</span>
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-muted-foreground">Active Days:</span>
            <span className="ml-2 font-medium text-foreground">
              {Object.values(availability).filter(day => day.enabled).length}/7
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Total Hours:</span>
            <span className="ml-2 font-medium text-foreground">
              {Object.values(availability).reduce((total, day) => total + day.slots.length * 3, 0)} hrs/week
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Timezone:</span>
            <span className="ml-2 font-medium text-foreground">
              {timezones.find(tz => tz.value === timezone)?.label.split(' ')[0]}
            </span>
          </div>
          <div>
            <span className="text-muted-foreground">Status:</span>
            <span className="ml-2 font-medium text-success">
              {Object.values(availability).some(day => day.enabled) ? 'Available' : 'Unavailable'}
            </span>
          </div>
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
          {isSaving ? 'Saving...' : 'Save Availability'}
        </Button>
      </div>
    </div>
  );
};

export default AvailabilitySettings;