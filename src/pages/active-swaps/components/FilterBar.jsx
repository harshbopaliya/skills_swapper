import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterBar = ({ onFilterChange, onSortChange }) => {
  const [filters, setFilters] = useState({
    status: 'all',
    skill: 'all',
    sortBy: 'recent'
  });

  const statusOptions = [
    { value: 'all', label: 'All Swaps' },
    { value: 'active', label: 'Active' },
    { value: 'scheduled', label: 'Scheduled' },
    { value: 'pending', label: 'Pending' }
  ];

  const skillOptions = [
    { value: 'all', label: 'All Skills' },
    { value: 'programming', label: 'Programming' },
    { value: 'design', label: 'Design' },
    { value: 'language', label: 'Languages' },
    { value: 'music', label: 'Music' },
    { value: 'cooking', label: 'Cooking' }
  ];

  const sortOptions = [
    { value: 'recent', label: 'Most Recent' },
    { value: 'progress', label: 'Progress' },
    { value: 'partner', label: 'Partner Name' },
    { value: 'nextSession', label: 'Next Session' }
  ];

  const handleFilterChange = (field, value) => {
    const newFilters = {
      ...filters,
      [field]: value
    };
    setFilters(newFilters);
    
    if (field === 'sortBy') {
      onSortChange(value);
    } else {
      onFilterChange(newFilters);
    }
  };

  const clearFilters = () => {
    const defaultFilters = {
      status: 'all',
      skill: 'all',
      sortBy: 'recent'
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
    onSortChange('recent');
  };

  const hasActiveFilters = filters.status !== 'all' || filters.skill !== 'all';

  return (
    <div className="bg-card border border-border rounded-lg p-4 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 flex-1">
          <Select
            label="Status"
            options={statusOptions}
            value={filters.status}
            onChange={(value) => handleFilterChange('status', value)}
            className="sm:w-40"
          />
          <Select
            label="Skill Category"
            options={skillOptions}
            value={filters.skill}
            onChange={(value) => handleFilterChange('skill', value)}
            className="sm:w-48"
          />
          <Select
            label="Sort By"
            options={sortOptions}
            value={filters.sortBy}
            onChange={(value) => handleFilterChange('sortBy', value)}
            className="sm:w-40"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear
            </Button>
          )}
          <div className="flex items-center space-x-1 text-sm text-muted-foreground">
            <Icon name="Filter" size={16} />
            <span>Filters</span>
          </div>
        </div>
      </div>

      {/* Active Filter Indicators */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
          {filters.status !== 'all' && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded text-xs">
              <span>Status: {statusOptions.find(opt => opt.value === filters.status)?.label}</span>
              <button
                onClick={() => handleFilterChange('status', 'all')}
                className="hover:bg-primary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
          {filters.skill !== 'all' && (
            <div className="flex items-center space-x-1 bg-secondary/10 text-secondary px-2 py-1 rounded text-xs">
              <span>Skill: {skillOptions.find(opt => opt.value === filters.skill)?.label}</span>
              <button
                onClick={() => handleFilterChange('skill', 'all')}
                className="hover:bg-secondary/20 rounded p-0.5"
              >
                <Icon name="X" size={12} />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterBar;