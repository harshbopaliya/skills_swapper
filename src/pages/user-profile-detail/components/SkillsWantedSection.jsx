import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillsWantedSection = ({ skills, onSkillClick }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High':
        return 'bg-error/10 text-error border-error/20';
      case 'Medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 'High':
        return 'ArrowUp';
      case 'Medium':
        return 'Minus';
      case 'Low':
        return 'ArrowDown';
      default:
        return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="BookOpen" size={20} className="text-secondary" />
        <h2 className="text-lg font-semibold text-foreground">Skills Wanted</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {skills.map((skill) => (
          <div
            key={skill.id}
            onClick={() => onSkillClick(skill)}
            className="skill-tag border rounded-lg p-3 cursor-pointer hover:shadow-md transition-all duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-medium text-foreground text-sm">{skill.name}</h4>
              <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getPriorityColor(skill.priority)}`}>
                <Icon name={getPriorityIcon(skill.priority)} size={12} />
                <span>{skill.priority}</span>
              </div>
            </div>
            
            <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
              {skill.reason}
            </p>
            
            <div className="flex items-center justify-between text-xs">
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Target" size={12} />
                <span>{skill.desiredLevel}</span>
              </div>
              <div className="flex items-center space-x-1 text-muted-foreground">
                <Icon name="Calendar" size={12} />
                <span>{skill.timeframe}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsWantedSection;