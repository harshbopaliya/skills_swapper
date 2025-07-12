import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const SearchAndFilter = ({ onSearch, onFilter, activeFilters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value);
  };

  const handleFilterToggle = (filter) => {
    onFilter(filter);
  };

  const filterOptions = [
    { id: 'pending', label: 'Pending', icon: 'Clock' },
    { id: 'accepted', label: 'Accepted', icon: 'Check' },
    { id: 'declined', label: 'Declined', icon: 'X' },
    { id: 'recent', label: 'Recent', icon: 'Calendar' }
  ];

  return (
    <div className="space-y-4 mb-6">
      {/* Search Bar */}
      <div className="relative">
        <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
          <Icon name="Search" size={20} className="text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="Search by name or skills..."
          value={searchQuery}
          onChange={handleSearchChange}
          className="pl-10 pr-12"
        />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowFilters(!showFilters)}
          className="absolute right-1 top-1/2 transform -translate-y-1/2"
        >
          <Icon name="Filter" size={20} />
        </Button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-foreground">Filter Requests</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onFilter('clear')}
              className="text-muted-foreground hover:text-foreground"
            >
              Clear All
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {filterOptions.map((filter) => (
              <Button
                key={filter.id}
                variant={activeFilters.includes(filter.id) ? "default" : "outline"}
                size="sm"
                onClick={() => handleFilterToggle(filter.id)}
                iconName={filter.icon}
                iconPosition="left"
                className="justify-start"
              >
                {filter.label}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {activeFilters.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {activeFilters.map((filter) => {
            const filterOption = filterOptions.find(f => f.id === filter);
            return (
              <div
                key={filter}
                className="flex items-center space-x-1 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm"
              >
                <Icon name={filterOption?.icon || 'Tag'} size={14} />
                <span>{filterOption?.label || filter}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleFilterToggle(filter)}
                  className="w-4 h-4 p-0 text-primary-foreground hover:text-primary-foreground/80"
                >
                  <Icon name="X" size={12} />
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchAndFilter;