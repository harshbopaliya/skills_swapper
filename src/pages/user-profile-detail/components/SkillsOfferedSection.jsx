import React from 'react';
import Icon from '../../../components/AppIcon';

const SkillsOfferedSection = ({ skills, onSkillClick }) => {
  const getExperienceColor = (level) => {
    switch (level) {
      case 'Beginner':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'Intermediate':
        return 'bg-primary/10 text-primary border-primary/20';
      case 'Advanced':
        return 'bg-success/10 text-success border-success/20';
      case 'Expert':
        return 'bg-secondary/10 text-secondary border-secondary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getExperienceIcon = (level) => {
    switch (level) {
      case 'Beginner':
        return 'Circle';
      case 'Intermediate':
        return 'CircleDot';
      case 'Advanced':
        return 'Target';
      case 'Expert':
        return 'Award';
      default:
        return 'Circle';
    }
  };

  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {});

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Lightbulb" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Skills Offered</h2>
      </div>

      <div className="space-y-6">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <div key={category}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wide">
              {category}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {categorySkills.map((skill) => (
                <div
                  key={skill.id}
                  onClick={() => onSkillClick(skill)}
                  className="skill-tag border rounded-lg p-3 cursor-pointer hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-medium text-foreground text-sm">{skill.name}</h4>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs border ${getExperienceColor(skill.experience)}`}>
                      <Icon name={getExperienceIcon(skill.experience)} size={12} />
                      <span>{skill.experience}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {skill.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="Clock" size={12} />
                      <span>{skill.yearsExperience} years</span>
                    </div>
                    <div className="flex items-center space-x-1 text-muted-foreground">
                      <Icon name="Users" size={12} />
                      <span>{skill.studentsHelped} helped</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsOfferedSection;