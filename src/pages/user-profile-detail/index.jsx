import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import BreadcrumbNavigation from './components/BreadcrumbNavigation';
import ProfileHeader from './components/ProfileHeader';
import SkillsOfferedSection from './components/SkillsOfferedSection';
import SkillsWantedSection from './components/SkillsWantedSection';
import AvailabilitySection from './components/AvailabilitySection';
import ReviewsSection from './components/ReviewsSection';
import MobileActionBar from './components/MobileActionBar';
import Icon from '../../components/AppIcon';

const UserProfileDetail = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  // Mock user data
  const mockUser = {
    id: "user-123",
    name: "Sarah Chen",
    location: "San Francisco, CA",
    profilePhoto: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
    bio: "Full-stack developer with 8 years of experience. Passionate about teaching and learning new technologies. Currently exploring AI/ML and looking to expand into data science.",
    rating: 4.8,
    reviewCount: 127,
    completedSwaps: 89,
    responseTime: "2 hours",
    isOnline: true,
    timezone: "PST (UTC-8)",
    skillsOffered: [
      {
        id: 1,
        name: "React Development",
        category: "Frontend Development",
        experience: "Expert",
        yearsExperience: 6,
        studentsHelped: 45,
        description: "Advanced React patterns, hooks, state management, and performance optimization. Can teach from basics to advanced concepts."
      },
      {
        id: 2,
        name: "Node.js Backend",
        category: "Backend Development",
        experience: "Advanced",
        yearsExperience: 5,
        studentsHelped: 32,
        description: "RESTful APIs, Express.js, database integration, authentication, and deployment strategies."
      },
      {
        id: 3,
        name: "JavaScript ES6+",
        category: "Programming Languages",
        experience: "Expert",
        yearsExperience: 8,
        studentsHelped: 78,
        description: "Modern JavaScript features, async programming, functional programming concepts, and best practices."
      },
      {
        id: 4,
        name: "UI/UX Design",
        category: "Design",
        experience: "Intermediate",
        yearsExperience: 3,
        studentsHelped: 18,
        description: "User interface design principles, prototyping with Figma, user research, and design systems."
      },
      {
        id: 5,
        name: "Git & Version Control",
        category: "Development Tools",
        experience: "Advanced",
        yearsExperience: 7,
        studentsHelped: 56,
        description: "Git workflows, branching strategies, collaboration techniques, and advanced Git commands."
      }
    ],
    skillsWanted: [
      {
        id: 1,
        name: "Machine Learning",
        priority: "High",
        desiredLevel: "Intermediate",
        timeframe: "3 months",
        reason: "Want to integrate ML models into web applications and understand data science workflows."
      },
      {
        id: 2,
        name: "Python Data Science",
        priority: "High",
        desiredLevel: "Beginner",
        timeframe: "6 months",
        reason: "Looking to transition into data analysis and scientific computing with Python libraries."
      },
      {
        id: 3,
        name: "DevOps & AWS",
        priority: "Medium",
        desiredLevel: "Intermediate",
        timeframe: "4 months",
        reason: "Need to improve deployment processes and cloud infrastructure management skills."
      },
      {
        id: 4,
        name: "Mobile Development",
        priority: "Low",
        desiredLevel: "Beginner",
        timeframe: "1 year",
        reason: "Interested in React Native or Flutter for cross-platform mobile app development."
      }
    ],
    availability: [
      { day: 'Mon', time: '09:00', status: 'available' },
      { day: 'Mon', time: '10:00', status: 'preferred' },
      { day: 'Mon', time: '14:00', status: 'available' },
      { day: 'Mon', time: '15:00', status: 'busy' },
      { day: 'Tue', time: '09:00', status: 'available' },
      { day: 'Tue', time: '11:00', status: 'preferred' },
      { day: 'Tue', time: '16:00', status: 'available' },
      { day: 'Wed', time: '10:00', status: 'available' },
      { day: 'Wed', time: '14:00', status: 'preferred' },
      { day: 'Wed', time: '17:00', status: 'available' },
      { day: 'Thu', time: '09:00', status: 'busy' },
      { day: 'Thu', time: '15:00', status: 'available' },
      { day: 'Thu', time: '16:00', status: 'preferred' },
      { day: 'Fri', time: '10:00', status: 'available' },
      { day: 'Fri', time: '14:00', status: 'available' },
      { day: 'Sat', time: '11:00', status: 'preferred' },
      { day: 'Sat', time: '15:00', status: 'available' },
      { day: 'Sun', time: '14:00', status: 'available' }
    ],
    reviews: [
      {
        id: 1,
        reviewerName: "Michael Rodriguez",
        reviewerPhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        date: "2025-07-05",
        skillSwapped: "React Development",
        comment: "Sarah is an exceptional teacher! She explained complex React concepts in a way that was easy to understand. Her patience and structured approach helped me grasp hooks and state management quickly. Highly recommend!",
        tags: ["Patient", "Clear Explanations", "Well Prepared"]
      },
      {
        id: 2,
        reviewerName: "Emily Johnson",
        reviewerPhoto: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        date: "2025-06-28",
        skillSwapped: "JavaScript ES6+",
        comment: "Amazing session on modern JavaScript! Sarah provided practical examples and real-world scenarios. She was very responsive to questions and provided excellent resources for further learning.",
        tags: ["Knowledgeable", "Responsive", "Great Resources"]
      },
      {
        id: 3,
        reviewerName: "David Kim",
        reviewerPhoto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
        rating: 4,
        date: "2025-06-20",
        skillSwapped: "Node.js Backend",
        comment: "Great introduction to Node.js and Express. Sarah covered all the fundamentals and helped me build my first API. Would have liked more time on advanced topics, but overall very satisfied.",
        tags: ["Thorough", "Practical", "Beginner Friendly"]
      },
      {
        id: 4,
        reviewerName: "Lisa Wang",
        reviewerPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        date: "2025-06-15",
        skillSwapped: "UI/UX Design",
        comment: "Sarah\'s design insights were incredibly valuable. She helped me understand user-centered design principles and gave great feedback on my portfolio. Her Figma tips were game-changing!",
        tags: ["Insightful", "Constructive Feedback", "Design Expert"]
      },
      {
        id: 5,
        reviewerName: "James Thompson",
        reviewerPhoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
        rating: 4,
        date: "2025-06-08",
        skillSwapped: "Git & Version Control",
        comment: "Solid Git training session. Sarah explained branching strategies clearly and helped me understand collaborative workflows. The hands-on practice was very helpful.",
        tags: ["Hands-on", "Clear", "Collaborative"]
      },
      {
        id: 6,
        reviewerName: "Anna Martinez",
        reviewerPhoto: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100&h=100&fit=crop&crop=face",
        rating: 5,
        date: "2025-05-30",
        skillSwapped: "React Development",
        comment: "Outstanding React mentoring! Sarah helped me debug complex issues and taught me best practices for component architecture. Her code review was incredibly detailed and helpful.",
        tags: ["Problem Solver", "Detail Oriented", "Mentor"]
      }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        setUser(mockUser);
      } catch (err) {
        setError('Failed to load user profile. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [userId]);

  const handleSendRequest = () => {
    console.log('Sending swap request to:', user.name);
    // Navigate to request form or show modal
    navigate('/swap-requests-management');
  };

  const handleSaveProfile = () => {
    console.log('Saving profile:', user.name);
    // Add to saved profiles
  };

  const handleReportUser = () => {
    console.log('Reporting user:', user.name);
    // Show report modal
  };

  const handleSkillClick = (skill) => {
    console.log('Skill clicked:', skill.name);
    // Navigate to skill search or show related users
    navigate('/browse-users', { state: { searchSkill: skill.name } });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 lg:pl-64">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading profile...</p>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 lg:pl-64">
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <Icon name="AlertCircle" size={48} className="text-error mx-auto mb-4" />
              <h2 className="text-lg font-semibold text-foreground mb-2">Profile Not Found</h2>
              <p className="text-muted-foreground mb-4">{error}</p>
              <button
                onClick={() => navigate('/browse-users')}
                className="text-primary hover:underline"
              >
                Back to Browse
              </button>
            </div>
          </div>
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <BottomNavigation />
      
      <div className="pt-16 lg:pl-64 pb-16 lg:pb-0">
        <BreadcrumbNavigation userName={user.name} />
        
        <div className="max-w-6xl mx-auto">
          {/* Desktop Contextual Actions */}
          <div className="hidden lg:block p-6">
            <ContextualActionBar />
          </div>

          {/* Profile Content */}
          <div className="lg:grid lg:grid-cols-12 lg:gap-6 lg:px-6">
            {/* Left Column - Profile Summary (Desktop) */}
            <div className="lg:col-span-4 space-y-6">
              <ProfileHeader
                user={user}
                onSendRequest={handleSendRequest}
                onSaveProfile={handleSaveProfile}
                onReportUser={handleReportUser}
              />
              
              {/* Desktop-only quick stats */}
              <div className="hidden lg:block bg-card border border-border rounded-lg p-4">
                <h3 className="font-medium text-foreground mb-3">Quick Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Response Rate</span>
                    <span className="text-foreground">98%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Success Rate</span>
                    <span className="text-foreground">95%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Member Since</span>
                    <span className="text-foreground">Jan 2023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Active</span>
                    <span className="text-foreground">2 hours ago</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Detailed Sections */}
            <div className="lg:col-span-8 space-y-6 p-4 lg:p-0">
              <SkillsOfferedSection
                skills={user.skillsOffered}
                onSkillClick={handleSkillClick}
              />
              
              <SkillsWantedSection
                skills={user.skillsWanted}
                onSkillClick={handleSkillClick}
              />
              
              <AvailabilitySection
                availability={user.availability}
                timezone={user.timezone}
              />
              
              <ReviewsSection
                reviews={user.reviews}
                totalReviews={user.reviewCount}
                averageRating={user.rating}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Action Bar */}
      <MobileActionBar
        onSendRequest={handleSendRequest}
        onSaveProfile={handleSaveProfile}
        onReportUser={handleReportUser}
      />
    </div>
  );
};

export default UserProfileDetail;