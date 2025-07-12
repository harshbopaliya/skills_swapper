import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ReviewsSection = ({ reviews, totalReviews, averageRating }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const totalPages = Math.ceil(reviews.length / reviewsPerPage);

  const getCurrentPageReviews = () => {
    const startIndex = (currentPage - 1) * reviewsPerPage;
    const endIndex = startIndex + reviewsPerPage;
    return reviews.slice(startIndex, endIndex);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRatingDistribution = () => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating]++;
    });
    return distribution;
  };

  const ratingDistribution = getRatingDistribution();

  return (
    <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Icon name="MessageSquare" size={20} className="text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Reviews & Feedback</h2>
        <span className="text-sm text-muted-foreground">({totalReviews} total)</span>
      </div>

      {/* Rating Summary */}
      <div className="bg-muted rounded-lg p-4 mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-8">
          {/* Overall Rating */}
          <div className="text-center lg:text-left mb-4 lg:mb-0">
            <div className="text-3xl font-bold text-foreground mb-1">{averageRating}</div>
            <div className="flex items-center justify-center lg:justify-start space-x-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={16}
                  className={i < Math.floor(averageRating) ? 'text-warning fill-current' : 'text-muted-foreground'}
                />
              ))}
            </div>
            <div className="text-sm text-muted-foreground">Based on {totalReviews} reviews</div>
          </div>

          {/* Rating Distribution */}
          <div className="flex-1">
            {[5, 4, 3, 2, 1].map((rating) => {
              const count = ratingDistribution[rating];
              const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
              return (
                <div key={rating} className="flex items-center space-x-2 mb-1">
                  <span className="text-sm text-muted-foreground w-8">{rating}</span>
                  <Icon name="Star" size={12} className="text-warning" />
                  <div className="flex-1 bg-border rounded-full h-2">
                    <div 
                      className="bg-warning rounded-full h-2 transition-all duration-300"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{count}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {getCurrentPageReviews().map((review) => (
          <div key={review.id} className="border border-border rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <Image
                  src={review.reviewerPhoto}
                  alt={review.reviewerName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h4 className="font-medium text-foreground text-sm">{review.reviewerName}</h4>
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <span>{formatDate(review.date)}</span>
                      <span>•</span>
                      <span>Swapped: {review.skillSwapped}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Icon
                        key={i}
                        name="Star"
                        size={14}
                        className={i < review.rating ? 'text-warning fill-current' : 'text-muted-foreground'}
                      />
                    ))}
                  </div>
                </div>
                
                <p className="text-sm text-foreground mb-2">{review.comment}</p>
                
                {review.tags && review.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {review.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>
          
          <div className="flex items-center space-x-2">
            {[...Array(totalPages)].map((_, index) => {
              const page = index + 1;
              return (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setCurrentPage(page)}
                  className="w-8 h-8"
                >
                  {page}
                </Button>
              );
            })}
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
};

export default ReviewsSection;