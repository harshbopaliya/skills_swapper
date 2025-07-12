import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FilterChips = ({ activeFilters, onRemoveFilter, onClearAll }) => {
  const getFilterChips = () => {
    const chips = [];

    // Skills filter chips
    if (activeFilters.skills && activeFilters.skills.length > 0) {
      activeFilters.skills.forEach(skill => {
        chips.push({
          id: `skill-${skill}`,
          label: skill,
          type: 'skills',
          value: skill,
          color: 'bg-primary/10 text-primary'
        });
      });
    }

    // Location filter chip
    if (activeFilters.location) {
      chips.push({
        id: 'location',
        label: `${activeFilters.location} (${activeFilters.radius}km)`,
        type: 'location',
        value: activeFilters.location,
        color: 'bg-secondary/10 text-secondary'
      });
    }

    // Availability filter chip
    if (activeFilters.availability) {
      chips.push({
        id: 'availability',
        label: activeFilters.availability,
        type: 'availability',
        value: activeFilters.availability,
        color: 'bg-accent/10 text-accent'
      });
    }

    // Rating filter chip
    if (activeFilters.minRating && activeFilters.minRating > 0) {
      chips.push({
        id: 'rating',
        label: `${activeFilters.minRating}+ stars`,
        type: 'minRating',
        value: activeFilters.minRating,
        color: 'bg-warning/10 text-warning'
      });
    }

    return chips;
  };

  const chips = getFilterChips();

  if (chips.length === 0) {
    return null;
  }

  return (
    <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      <div className="flex items-center space-x-2 min-w-max">
        {chips.map((chip) => (
          <div
            key={chip.id}
            className={`flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${chip.color} transition-all duration-200`}
          >
            <span className="whitespace-nowrap">{chip.label}</span>
            <Button
              variant="ghost"
              size="icon"
              className="w-4 h-4 p-0 hover:bg-current hover:bg-opacity-20"
              onClick={() => onRemoveFilter(chip.type, chip.value)}
            >
              <Icon name="X" size={12} />
            </Button>
          </div>
        ))}
        
        {chips.length > 1 && (
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground whitespace-nowrap"
            iconName="X"
            iconPosition="left"
            onClick={onClearAll}
          >
            Clear All
          </Button>
        )}
      </div>
    </div>
  );
};

export default FilterChips;