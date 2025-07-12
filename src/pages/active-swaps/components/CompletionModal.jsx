import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CompletionModal = ({ swap, isOpen, onClose, onSubmit }) => {
  const [ratings, setRatings] = useState({
    yourSkillRating: 0,
    partnerSkillRating: 0
  });
  const [feedback, setFeedback] = useState({
    yourSkillFeedback: '',
    partnerSkillFeedback: ''
  });

  const handleRatingChange = (type, rating) => {
    setRatings(prev => ({
      ...prev,
      [type]: rating
    }));
  };

  const handleFeedbackChange = (type, value) => {
    setFeedback(prev => ({
      ...prev,
      [type]: value
    }));
  };

  const handleSubmit = () => {
    onSubmit({
      swapId: swap.id,
      ratings,
      feedback
    });
    onClose();
  };

  const renderStarRating = (type, currentRating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(type, star)}
            className="focus:outline-none transition-colors duration-200"
          >
            <Icon
              name="Star"
              size={24}
              className={star <= currentRating 
                ? 'text-warning fill-current' :'text-muted-foreground hover:text-warning'
              }
            />
          </button>
        ))}
      </div>
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-300 p-4">
      <div className="bg-card rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">Complete Skill Swap</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="w-8 h-8"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            Rate your experience and provide feedback for {swap?.partner?.name}
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Your Skill Rating */}
          <div>
            <h3 className="font-medium text-foreground mb-2">
              How well did you teach {swap?.yourSkill}?
            </h3>
            <div className="mb-3">
              {renderStarRating('yourSkillRating', ratings.yourSkillRating)}
            </div>
            <Input
              type="text"
              placeholder="Share your thoughts on teaching this skill..."
              value={feedback.yourSkillFeedback}
              onChange={(e) => handleFeedbackChange('yourSkillFeedback', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Partner Skill Rating */}
          <div>
            <h3 className="font-medium text-foreground mb-2">
              How well did {swap?.partner?.name} teach {swap?.partnerSkill}?
            </h3>
            <div className="mb-3">
              {renderStarRating('partnerSkillRating', ratings.partnerSkillRating)}
            </div>
            <Input
              type="text"
              placeholder="Share your learning experience..."
              value={feedback.partnerSkillFeedback}
              onChange={(e) => handleFeedbackChange('partnerSkillFeedback', e.target.value)}
              className="w-full"
            />
          </div>

          {/* Summary */}
          <div className="bg-muted rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-2">Swap Summary</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Partner:</span>
                <span className="text-foreground">{swap?.partner?.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="text-foreground">{swap?.duration}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Sessions:</span>
                <span className="text-foreground">{swap?.completedSessions}/{swap?.totalSessions}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={ratings.yourSkillRating === 0 || ratings.partnerSkillRating === 0}
              className="flex-1"
            >
              Complete Swap
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompletionModal;