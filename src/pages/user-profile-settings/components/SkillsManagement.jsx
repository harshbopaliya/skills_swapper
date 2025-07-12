import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';


const SkillsManagement = () => {
  const [offeredSkills, setOfferedSkills] = useState([
    { id: 1, name: "React Development", level: "Expert", category: "Frontend" },
    { id: 2, name: "Node.js", level: "Advanced", category: "Backend" },
    { id: 3, name: "UI/UX Design", level: "Intermediate", category: "Design" },
    { id: 4, name: "Project Management", level: "Advanced", category: "Management" }
  ]);
  
  const [wantedSkills, setWantedSkills] = useState([
    { id: 1, name: "Machine Learning", priority: "High", category: "Data Science" },
    { id: 2, name: "Mobile App Development", priority: "Medium", category: "Mobile" },
    { id: 3, name: "DevOps", priority: "High", category: "Infrastructure" },
    { id: 4, name: "Graphic Design", priority: "Low", category: "Design" }
  ]);

  const [newOfferedSkill, setNewOfferedSkill] = useState({ name: '', level: 'Beginner', category: '' });
  const [newWantedSkill, setNewWantedSkill] = useState({ name: '', priority: 'Medium', category: '' });
  const [showOfferedForm, setShowOfferedForm] = useState(false);
  const [showWantedForm, setShowWantedForm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const skillLevels = ['Beginner', 'Intermediate', 'Advanced', 'Expert'];
  const priorities = ['Low', 'Medium', 'High'];
  const categories = ['Frontend', 'Backend', 'Mobile', 'Design', 'Data Science', 'Management', 'Infrastructure', 'Marketing'];

  const suggestedSkills = [
    "JavaScript", "Python", "React", "Vue.js", "Angular", "Node.js", "Express.js", "MongoDB", 
    "PostgreSQL", "AWS", "Docker", "Kubernetes", "Machine Learning", "Data Analysis", 
    "UI/UX Design", "Graphic Design", "Digital Marketing", "SEO", "Content Writing", 
    "Project Management", "Agile", "Scrum", "Leadership", "Public Speaking"
  ];

  const addOfferedSkill = () => {
    if (newOfferedSkill.name.trim()) {
      const skill = {
        id: Date.now(),
        name: newOfferedSkill.name.trim(),
        level: newOfferedSkill.level,
        category: newOfferedSkill.category || 'Other'
      };
      setOfferedSkills([...offeredSkills, skill]);
      setNewOfferedSkill({ name: '', level: 'Beginner', category: '' });
      setShowOfferedForm(false);
    }
  };

  const addWantedSkill = () => {
    if (newWantedSkill.name.trim()) {
      const skill = {
        id: Date.now(),
        name: newWantedSkill.name.trim(),
        priority: newWantedSkill.priority,
        category: newWantedSkill.category || 'Other'
      };
      setWantedSkills([...wantedSkills, skill]);
      setNewWantedSkill({ name: '', priority: 'Medium', category: '' });
      setShowWantedForm(false);
    }
  };

  const removeOfferedSkill = (id) => {
    setOfferedSkills(offeredSkills.filter(skill => skill.id !== id));
  };

  const removeWantedSkill = (id) => {
    setWantedSkills(wantedSkills.filter(skill => skill.id !== id));
  };

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert('Skills updated successfully!');
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'Expert': return 'bg-success text-success-foreground';
      case 'Advanced': return 'bg-primary text-primary-foreground';
      case 'Intermediate': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-error text-error-foreground';
      case 'Medium': return 'bg-warning text-warning-foreground';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <Icon name="BookOpen" size={24} className="text-primary" />
        <h2 className="text-xl font-semibold text-foreground">Skills Management</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Skills I Offer */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
              <Icon name="Award" size={20} className="text-success" />
              <span>Skills I Offer</span>
            </h3>
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setShowOfferedForm(!showOfferedForm)}
            >
              Add Skill
            </Button>
          </div>

          {/* Add Offered Skill Form */}
          {showOfferedForm && (
            <div className="bg-muted rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Input
                  label="Skill Name"
                  type="text"
                  value={newOfferedSkill.name}
                  onChange={(e) => setNewOfferedSkill({...newOfferedSkill, name: e.target.value})}
                  placeholder="e.g., React Development"
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Proficiency Level</label>
                    <select
                      value={newOfferedSkill.level}
                      onChange={(e) => setNewOfferedSkill({...newOfferedSkill, level: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {skillLevels.map(level => (
                        <option key={level} value={level}>{level}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      value={newOfferedSkill.category}
                      onChange={(e) => setNewOfferedSkill({...newOfferedSkill, category: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="default" size="sm" onClick={addOfferedSkill}>
                    Add Skill
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowOfferedForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Offered Skills List */}
          <div className="space-y-3">
            {offeredSkills.map(skill => (
              <div key={skill.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{skill.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                      {skill.level}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{skill.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeOfferedSkill(skill.id)}
                  className="text-error hover:text-error"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </div>

          {/* Suggested Skills */}
          <div className="mt-6">
            <h4 className="text-sm font-medium text-foreground mb-3">Suggested Skills</h4>
            <div className="flex flex-wrap gap-2">
              {suggestedSkills.slice(0, 8).map(skill => (
                <button
                  key={skill}
                  onClick={() => setNewOfferedSkill({...newOfferedSkill, name: skill})}
                  className="px-3 py-1 text-xs bg-muted text-muted-foreground rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-200"
                >
                  {skill}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Skills I Want */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-foreground flex items-center space-x-2">
              <Icon name="Target" size={20} className="text-warning" />
              <span>Skills I Want</span>
            </h3>
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setShowWantedForm(!showWantedForm)}
            >
              Add Skill
            </Button>
          </div>

          {/* Add Wanted Skill Form */}
          {showWantedForm && (
            <div className="bg-muted rounded-lg p-4 mb-4">
              <div className="space-y-3">
                <Input
                  label="Skill Name"
                  type="text"
                  value={newWantedSkill.name}
                  onChange={(e) => setNewWantedSkill({...newWantedSkill, name: e.target.value})}
                  placeholder="e.g., Machine Learning"
                />
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Priority</label>
                    <select
                      value={newWantedSkill.priority}
                      onChange={(e) => setNewWantedSkill({...newWantedSkill, priority: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      {priorities.map(priority => (
                        <option key={priority} value={priority}>{priority}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                    <select
                      value={newWantedSkill.category}
                      onChange={(e) => setNewWantedSkill({...newWantedSkill, category: e.target.value})}
                      className="w-full px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="flex space-x-2">
                  <Button variant="default" size="sm" onClick={addWantedSkill}>
                    Add Skill
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setShowWantedForm(false)}>
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Wanted Skills List */}
          <div className="space-y-3">
            {wantedSkills.map(skill => (
              <div key={skill.id} className="flex items-center justify-between p-3 border border-border rounded-lg bg-background">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{skill.name}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(skill.priority)}`}>
                      {skill.priority}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{skill.category}</p>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeWantedSkill(skill.id)}
                  className="text-error hover:text-error"
                >
                  <Icon name="X" size={16} />
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end mt-8">
        <Button
          variant="default"
          onClick={handleSave}
          loading={isSaving}
          iconName="Save"
          iconPosition="left"
        >
          {isSaving ? 'Saving...' : 'Save Skills'}
        </Button>
      </div>
    </div>
  );
};

export default SkillsManagement;