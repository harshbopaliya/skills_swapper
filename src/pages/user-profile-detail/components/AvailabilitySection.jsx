import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AvailabilitySection = ({ availability, timezone }) => {
  const [selectedWeek, setSelectedWeek] = useState(0);

  const timeSlots = [
    '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
  ];

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getSlotStatus = (day, time) => {
    const slot = availability.find(a => a.day === day && a.time === time);
    if (!slot) return 'unavailable';
    return slot.status; // 'available', 'busy', 'preferred'
  };

  const getSlotColor = (status) => {
    switch (status) {
      case 'available':
        return 'bg-success/20 border-success/40 hover:bg-success/30';
      case 'preferred':
        return 'bg-primary/20 border-primary/40 hover:bg-primary/30';
      case 'busy':
        return 'bg-error/20 border-error/40';
      default:
        return 'bg-muted border-border';
    }
  };

  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentWeek = new Date(today);
    currentWeek.setDate(today.getDate() - today.getDay() + 1 + (selectedWeek * 7));
    
    return days.map((_, index) => {
      const date = new Date(currentWeek);
      date.setDate(currentWeek.getDate() + index);
      return date;
    });
  };

  const weekDates = getCurrentWeekDates();

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Calendar" size={20} className="text-accent" />
          <h2 className="text-lg font-semibold text-foreground">Availability</h2>
        </div>
        <div className="flex items-center space-x-1 text-sm text-muted-foreground">
          <Icon name="Clock" size={16} />
          <span>{timezone}</span>
        </div>
      </div>

      {/* Week Navigation */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedWeek(selectedWeek - 1)}
          iconName="ChevronLeft"
          iconPosition="left"
        >
          Previous
        </Button>
        <div className="text-sm font-medium text-foreground">
          {weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {' '}
          {weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setSelectedWeek(selectedWeek + 1)}
          iconName="ChevronRight"
          iconPosition="right"
        >
          Next
        </Button>
      </div>

      {/* Calendar Grid */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header */}
          <div className="grid grid-cols-8 gap-1 mb-2">
            <div className="text-xs font-medium text-muted-foreground p-2"></div>
            {days.map((day, index) => (
              <div key={day} className="text-xs font-medium text-muted-foreground p-2 text-center">
                <div>{day}</div>
                <div className="text-xs opacity-70">
                  {weekDates[index].getDate()}
                </div>
              </div>
            ))}
          </div>

          {/* Time Slots */}
          {timeSlots.map((time) => (
            <div key={time} className="grid grid-cols-8 gap-1 mb-1">
              <div className="text-xs text-muted-foreground p-2 text-right">
                {time}
              </div>
              {days.map((day) => {
                const status = getSlotStatus(day, time);
                return (
                  <div
                    key={`${day}-${time}`}
                    className={`h-8 rounded border text-xs flex items-center justify-center cursor-pointer transition-colors duration-200 ${getSlotColor(status)}`}
                    title={`${day} ${time} - ${status}`}
                  >
                    {status === 'preferred' && <Icon name="Star" size={12} />}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center space-x-4 mt-4 text-xs">
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-success/20 border border-success/40 rounded"></div>
          <span className="text-muted-foreground">Available</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-primary/20 border border-primary/40 rounded flex items-center justify-center">
            <Icon name="Star" size={8} />
          </div>
          <span className="text-muted-foreground">Preferred</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-error/20 border border-error/40 rounded"></div>
          <span className="text-muted-foreground">Busy</span>
        </div>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 bg-muted border border-border rounded"></div>
          <span className="text-muted-foreground">Unavailable</span>
        </div>
      </div>
    </div>
  );
};

export default AvailabilitySection;