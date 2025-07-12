import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SortDropdown = ({ currentSort, onSortChange, resultCount }) => {
  const [isOpen, setIsOpen] = useState(false);

  const sortOptions = [
    { value: 'relevance', label: 'Most Relevant', icon: 'Target' },
    { value: 'rating', label: 'Highest Rated', icon: 'Star' },
    { value: 'distance', label: 'Nearest First', icon: 'MapPin' },
    { value: 'recent', label: 'Recently Active', icon: 'Clock' },
    { value: 'alphabetical', label: 'A to Z', icon: 'ArrowUpDown' }
  ];

  const currentOption = sortOptions.find(option => option.value === currentSort) || sortOptions[0];

  const handleSortSelect = (sortValue) => {
    onSortChange(sortValue);
    setIsOpen(false);
  };

  return (
    <div className="flex items-center justify-between mb-4">
      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {resultCount} {resultCount === 1 ? 'user' : 'users'} found
      </div>

      {/* Sort Dropdown */}
      <div className="relative">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setIsOpen(!isOpen)}
          iconName={currentOption.icon}
          iconPosition="left"
          className="min-w-[140px] justify-between"
        >
          <span className="flex-1 text-left">{currentOption.label}</span>
          <Icon 
            name={isOpen ? "ChevronUp" : "ChevronDown"} 
            size={16} 
            className="ml-2"
          />
        </Button>

        {/* Dropdown Menu */}
        {isOpen && (
          <>
            {/* Overlay for mobile */}
            <div 
              className="lg:hidden fixed inset-0 z-200" 
              onClick={() => setIsOpen(false)}
            ></div>
            
            <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg z-300">
              <div className="p-1">
                {sortOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleSortSelect(option.value)}
                    className={`w-full flex items-center space-x-2 px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                      currentSort === option.value
                        ? 'bg-primary text-primary-foreground'
                        : 'text-popover-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon 
                      name={option.icon} 
                      size={16} 
                      className={currentSort === option.value ? 'text-primary-foreground' : 'text-muted-foreground'}
                    />
                    <span>{option.label}</span>
                    {currentSort === option.value && (
                      <Icon name="Check" size={16} className="ml-auto text-primary-foreground" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;