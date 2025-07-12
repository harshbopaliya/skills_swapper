import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterPanel = ({ isOpen, onClose, filters, onApplyFilters }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  const skillCategories = [
    {
      name: "Programming",
      skills: ["JavaScript", "Python", "React", "Node.js", "Java", "C++", "PHP", "Ruby"]
    },
    {
      name: "Design",
      skills: ["UI/UX Design", "Graphic Design", "Figma", "Photoshop", "Illustrator", "Web Design"]
    },
    {
      name: "Marketing",
      skills: ["Digital Marketing", "SEO", "Content Writing", "Social Media", "Email Marketing"]
    },
    {
      name: "Business",
      skills: ["Project Management", "Data Analysis", "Excel", "Public Speaking", "Leadership"]
    },
    {
      name: "Languages",
      skills: ["Spanish", "French", "German", "Mandarin", "Japanese", "Italian"]
    },
    {
      name: "Creative",
      skills: ["Photography", "Video Editing", "Music Production", "Writing", "Drawing"]
    }
  ];

  const availabilityOptions = [
    "Weekday Mornings",
    "Weekday Afternoons", 
    "Weekday Evenings",
    "Weekend Mornings",
    "Weekend Afternoons",
    "Weekend Evenings",
    "Flexible Schedule"
  ];

  const handleSkillToggle = (skill) => {
    const currentSkills = localFilters.skills || [];
    const updatedSkills = currentSkills.includes(skill)
      ? currentSkills.filter(s => s !== skill)
      : [...currentSkills, skill];
    
    setLocalFilters(prev => ({
      ...prev,
      skills: updatedSkills
    }));
  };

  const handleLocationChange = (field, value) => {
    setLocalFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAvailabilityToggle = (availability) => {
    setLocalFilters(prev => ({
      ...prev,
      availability: prev.availability === availability ? '' : availability
    }));
  };

  const handleRatingChange = (rating) => {
    setLocalFilters(prev => ({
      ...prev,
      minRating: prev.minRating === rating ? 0 : rating
    }));
  };

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    const resetFilters = {
      skills: [],
      location: '',
      radius: 25,
      availability: '',
      minRating: 0
    };
    setLocalFilters(resetFilters);
  };

  const renderStars = (rating, currentRating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Overlay */}
      <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-300" onClick={onClose}></div>
      
      {/* Filter Panel */}
      <div className={`fixed top-0 right-0 h-full w-full lg:w-96 bg-card border-l border-border z-400 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : 'translate-x-full'
      } overflow-y-auto`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border sticky top-0 bg-card z-10">
          <h2 className="text-lg font-semibold text-card-foreground">Filters</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-4 space-y-6">
          {/* Skills Section */}
          <div>
            <h3 className="font-medium text-card-foreground mb-3">Skills</h3>
            <div className="space-y-4">
              {skillCategories.map((category) => (
                <div key={category.name}>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">
                    {category.name}
                  </h4>
                  <div className="grid grid-cols-2 gap-2">
                    {category.skills.map((skill) => (
                      <Checkbox
                        key={skill}
                        label={skill}
                        checked={localFilters.skills?.includes(skill) || false}
                        onChange={() => handleSkillToggle(skill)}
                        size="sm"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location Section */}
          <div>
            <h3 className="font-medium text-card-foreground mb-3">Location</h3>
            <div className="space-y-3">
              <Input
                label="City or Area"
                type="text"
                placeholder="Enter location"
                value={localFilters.location || ''}
                onChange={(e) => handleLocationChange('location', e.target.value)}
              />
              <div>
                <label className="block text-sm font-medium text-card-foreground mb-2">
                  Radius: {localFilters.radius || 25} km
                </label>
                <input
                  type="range"
                  min="5"
                  max="100"
                  step="5"
                  value={localFilters.radius || 25}
                  onChange={(e) => handleLocationChange('radius', parseInt(e.target.value))}
                  className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>5 km</span>
                  <span>100 km</span>
                </div>
              </div>
            </div>
          </div>

          {/* Availability Section */}
          <div>
            <h3 className="font-medium text-card-foreground mb-3">Availability</h3>
            <div className="space-y-2">
              {availabilityOptions.map((option) => (
                <Checkbox
                  key={option}
                  label={option}
                  checked={localFilters.availability === option}
                  onChange={() => handleAvailabilityToggle(option)}
                />
              ))}
            </div>
          </div>

          {/* Rating Section */}
          <div>
            <h3 className="font-medium text-card-foreground mb-3">Minimum Rating</h3>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <div
                  key={rating}
                  className={`flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors duration-200 ${
                    localFilters.minRating === rating 
                      ? 'bg-primary/10 border border-primary/20' :'hover:bg-muted'
                  }`}
                  onClick={() => handleRatingChange(rating)}
                >
                  <div className="flex items-center space-x-1">
                    {renderStars(rating)}
                  </div>
                  <span className="text-sm text-card-foreground">& up</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-card border-t border-border p-4">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleReset}
            >
              Reset
            </Button>
            <Button
              variant="default"
              className="flex-1"
              onClick={handleApply}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterPanel;