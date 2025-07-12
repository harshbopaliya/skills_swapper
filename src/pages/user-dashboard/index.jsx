import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import WelcomeCard from './components/WelcomeCard';
import PendingRequestsCard from './components/PendingRequestsCard';
import ActiveSwapsCard from './components/ActiveSwapsCard';
import RecentActivityCard from './components/RecentActivityCard';
import QuickActionsCard from './components/QuickActionsCard';
import StatsOverviewCard from './components/StatsOverviewCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import { useDashboard } from '../../hooks/useDatabase';

const UserDashboard = () => {
  const navigate = useNavigate();
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { dashboardData, loading, error, refreshData } = useDashboard();

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
    refreshData();
    setIsRefreshing(false);
  };

  // Pull-to-refresh for mobile
  useEffect(() => {
    let startY = 0;
    let currentY = 0;
    let isScrolling = false;

    const handleTouchStart = (e) => {
      startY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      currentY = e.touches[0].clientY;
      const diff = currentY - startY;
      
      if (diff > 0 && window.scrollY === 0 && !isScrolling) {
        isScrolling = true;
        if (diff > 100) {
          handleRefresh();
        }
      }
    };

    const handleTouchEnd = () => {
      isScrolling = false;
      startY = 0;
      currentY = 0;
    };

    document.addEventListener('touchstart', handleTouchStart);
    document.addEventListener('touchmove', handleTouchMove);
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 pb-20 lg:pb-8 lg:pl-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex items-center justify-center h-64">
              <Icon name="Loader2" size={32} className="animate-spin text-primary" />
            </div>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16 pb-20 lg:pb-8 lg:pl-64">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="text-center py-12">
              <Icon name="AlertCircle" size={48} className="text-destructive mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Failed to load dashboard</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={refreshData} iconName="RefreshCw" iconPosition="left">
                Try Again
              </Button>
            </div>
          </div>
        </main>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Main Content */}
      <main className="pt-16 pb-20 lg:pb-8 lg:pl-64">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Refresh Indicator */}
          {isRefreshing && (
            <div className="fixed top-16 left-0 right-0 bg-primary text-primary-foreground text-center py-2 z-50 lg:left-64">
              <div className="flex items-center justify-center space-x-2">
                <Icon name="RefreshCw" size={16} className="animate-spin" />
                <span className="text-sm">Refreshing...</span>
              </div>
            </div>
          )}

          {/* Desktop Contextual Actions */}
          <ContextualActionBar />

          {/* Welcome Section */}
          <WelcomeCard userName={dashboardData?.currentUser?.name || 'User'} />

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-6">
              {/* Pending Requests */}
              <PendingRequestsCard 
                sentRequests={dashboardData?.pendingRequests?.sent || 0}
                receivedRequests={dashboardData?.pendingRequests?.received || 0}
              />

              {/* Active Swaps */}
              <ActiveSwapsCard activeSwaps={dashboardData?.activeSwaps || []} />

              {/* Recent Activity */}
              <RecentActivityCard activities={dashboardData?.recentActivity || []} />
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <QuickActionsCard />

              {/* Stats Overview */}
              <StatsOverviewCard stats={dashboardData?.stats || {}} />

              {/* Tips Card */}
              <div className="bg-gradient-to-br from-accent/10 to-warning/10 border border-accent/20 rounded-lg p-6">
                <div className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Lightbulb" size={20} className="text-accent" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground mb-2">Pro Tip</h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      Complete your profile with detailed skill descriptions to attract more swap requests!
                    </p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate('/user-profile-settings')}
                      iconName="ArrowRight"
                      iconPosition="right"
                    >
                      Update Profile
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Quick Actions */}
          <div className="lg:hidden mt-6">
            <div className="grid grid-cols-2 gap-4">
              <Button
                variant="default"
                onClick={() => navigate('/browse-users')}
                iconName="Search"
                iconPosition="left"
                className="h-12"
              >
                Find Skills
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/swap-requests-management')}
                iconName="MessageSquare"
                iconPosition="left"
                className="h-12"
              >
                Requests
              </Button>
            </div>
          </div>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default UserDashboard;