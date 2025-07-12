import React from 'react';

const SkeletonCard = () => {
  return (
    <div className="bg-card border border-border rounded-lg p-4 animate-pulse">
      {/* Profile Header */}
      <div className="flex items-start space-x-3 mb-3">
        <div className="w-12 h-12 bg-muted rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-muted rounded w-3/4"></div>
          <div className="h-3 bg-muted rounded w-1/2"></div>
          <div className="flex space-x-1">
            {Array.from({ length: 5 }, (_, i) => (
              <div key={i} className="w-3 h-3 bg-muted rounded"></div>
            ))}
          </div>
        </div>
      </div>

      {/* Skills Offered */}
      <div className="mb-3">
        <div className="h-3 bg-muted rounded w-16 mb-2"></div>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-6 bg-muted rounded-full w-16"></div>
          ))}
        </div>
      </div>

      {/* Skills Wanted */}
      <div className="mb-3">
        <div className="h-3 bg-muted rounded w-16 mb-2"></div>
        <div className="flex flex-wrap gap-1">
          {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="h-6 bg-muted rounded-full w-16"></div>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-3 bg-muted rounded w-24"></div>
        <div className="h-3 bg-muted rounded w-20"></div>
      </div>

      {/* Action Button */}
      <div className="h-8 bg-muted rounded"></div>
    </div>
  );
};

export default SkeletonCard;