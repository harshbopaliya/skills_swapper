import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import SwapCard from './components/SwapCard';
import CompletionModal from './components/CompletionModal';
import ScheduleModal from './components/ScheduleModal';
import EmptyState from './components/EmptyState';
import FilterBar from './components/FilterBar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ActiveSwaps = () => {
  const navigate = useNavigate();
  const [swaps, setSwaps] = useState([]);
  const [filteredSwaps, setFilteredSwaps] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedSwap, setSelectedSwap] = useState(null);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // Mock data for active swaps
  const mockSwaps = [
    {
      id: 1,
      partner: {
        id: 2,
        name: "Sarah Chen",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b47c?w=150&h=150&fit=crop&crop=face",
        isOnline: true,
        lastActive: "2 min ago"
      },
      yourSkill: "React Development",
      partnerSkill: "UI/UX Design",
      status: "active",
      startDate: "2025-01-05",
      completedSessions: 3,
      totalSessions: 6,
      duration: "3 weeks",
      nextSession: {
        date: "2025-01-15T14:00:00",
        duration: "1 hour",
        type: "Video Call",
        location: "Zoom Meeting"
      },
      recentSessions: [
        {
          id: 1,
          topic: "Component Architecture",
          date: "2025-01-12",
          duration: "1 hour",
          rating: 5
        },
        {
          id: 2,
          topic: "State Management",
          date: "2025-01-10",
          duration: "1.5 hours",
          rating: 4
        }
      ],
      notes: "Sarah is an excellent teacher. Her design principles have really improved my UI skills."
    },
    {
      id: 2,
      partner: {
        id: 3,
        name: "Miguel Rodriguez",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
        isOnline: false,
        lastActive: "1 hour ago"
      },
      yourSkill: "JavaScript",
      partnerSkill: "Spanish Language",
      status: "scheduled",
      startDate: "2025-01-08",
      completedSessions: 2,
      totalSessions: 8,
      duration: "4 weeks",
      nextSession: {
        date: "2025-01-16T18:30:00",
        duration: "45 minutes",
        type: "Video Call",
        location: "Google Meet"
      },
      recentSessions: [
        {
          id: 3,
          topic: "Basic Conversation",
          date: "2025-01-11",
          duration: "45 minutes",
          rating: 5
        }
      ],
      notes: "Miguel is very patient and makes learning Spanish enjoyable."
    },
    {
      id: 3,
      partner: {
        id: 4,
        name: "Emma Thompson",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        isOnline: true,
        lastActive: "just now"
      },
      yourSkill: "Data Analysis",
      partnerSkill: "Photography",
      status: "active",
      startDate: "2025-01-03",
      completedSessions: 5,
      totalSessions: 6,
      duration: "3 weeks",
      nextSession: {
        date: "2025-01-14T10:00:00",
        duration: "2 hours",
        type: "In Person",
        location: "Central Park"
      },
      recentSessions: [
        {
          id: 4,
          topic: "Portrait Photography",
          date: "2025-01-09",
          duration: "2 hours",
          rating: 5
        },
        {
          id: 5,
          topic: "Lighting Techniques",
          date: "2025-01-07",
          duration: "1.5 hours",
          rating: 4
        }
      ],
      notes: "Emma\'s photography skills are amazing. Learning so much about composition and lighting."
    }
  ];

  useEffect(() => {
    // Simulate loading active swaps
    const loadSwaps = async () => {
      setIsLoading(true);
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSwaps(mockSwaps);
      setFilteredSwaps(mockSwaps);
      setIsLoading(false);
    };

    loadSwaps();
  }, []);

  const handleFilterChange = (filters) => {
    let filtered = [...swaps];

    if (filters.status !== 'all') {
      filtered = filtered.filter(swap => swap.status === filters.status);
    }

    if (filters.skill !== 'all') {
      filtered = filtered.filter(swap => 
        swap.yourSkill.toLowerCase().includes(filters.skill) ||
        swap.partnerSkill.toLowerCase().includes(filters.skill)
      );
    }

    setFilteredSwaps(filtered);
  };

  const handleSortChange = (sortBy) => {
    let sorted = [...filteredSwaps];

    switch (sortBy) {
      case 'recent':
        sorted.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
        break;
      case 'progress':
        sorted.sort((a, b) => (b.completedSessions / b.totalSessions) - (a.completedSessions / a.totalSessions));
        break;
      case 'partner':
        sorted.sort((a, b) => a.partner.name.localeCompare(b.partner.name));
        break;
      case 'nextSession':
        sorted.sort((a, b) => {
          if (!a.nextSession && !b.nextSession) return 0;
          if (!a.nextSession) return 1;
          if (!b.nextSession) return -1;
          return new Date(a.nextSession.date) - new Date(b.nextSession.date);
        });
        break;
      default:
        break;
    }

    setFilteredSwaps(sorted);
  };

  const handleScheduleSession = (swap) => {
    setSelectedSwap(swap);
    setShowScheduleModal(true);
  };

  const handleMessagePartner = (swap) => {
    console.log('Message partner:', swap.partner.name);
    // Navigate to messaging or open chat
  };

  const handleMarkComplete = (swap) => {
    setSelectedSwap(swap);
    setShowCompletionModal(true);
  };

  const handleScheduleSubmit = (scheduleData) => {
    console.log('Schedule session:', scheduleData);
    // Handle session scheduling
    setShowScheduleModal(false);
  };

  const handleCompletionSubmit = (completionData) => {
    console.log('Complete swap:', completionData);
    // Handle swap completion
    setShowCompletionModal(false);
    
    // Remove completed swap from list
    const updatedSwaps = swaps.filter(swap => swap.id !== completionData.swapId);
    setSwaps(updatedSwaps);
    setFilteredSwaps(updatedSwaps.filter(swap => 
      filteredSwaps.some(fs => fs.id === swap.id)
    ));
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate refresh delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleQuickAction = (action) => {
    switch (action) {
      case 'schedule':
        if (filteredSwaps.length > 0) {
          handleScheduleSession(filteredSwaps[0]);
        }
        break;
      case 'message':
        if (filteredSwaps.length > 0) {
          handleMessagePartner(filteredSwaps[0]);
        }
        break;
      case 'browse': navigate('/browse-users');
        break;
      default:
        break;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="pt-16 pb-16 lg:pb-0 lg:pl-64">
          <div className="p-4 lg:p-6">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-card border border-border rounded-lg p-6">
                  <div className="animate-pulse">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-12 h-12 bg-muted rounded-full"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-muted rounded w-32 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-24"></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="h-16 bg-muted rounded"></div>
                      <div className="h-16 bg-muted rounded"></div>
                    </div>
                    <div className="h-2 bg-muted rounded mb-4"></div>
                    <div className="flex space-x-2">
                      <div className="h-8 bg-muted rounded flex-1"></div>
                      <div className="h-8 bg-muted rounded flex-1"></div>
                    </div>
                  </div>
                </div>
              ))}
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
      
      <div className="pt-16 pb-16 lg:pb-0 lg:pl-64">
        <div className="p-4 lg:p-6">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Active Swaps</h1>
              <p className="text-muted-foreground">
                Manage your ongoing skill exchanges and track progress
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRefresh}
                disabled={refreshing}
                className="w-10 h-10"
              >
                <Icon 
                  name="RefreshCw" 
                  size={16} 
                  className={refreshing ? 'animate-spin' : ''} 
                />
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate('/browse-users')}
                iconName="Plus"
                iconPosition="left"
                className="hidden sm:flex"
              >
                Find More Skills
              </Button>
            </div>
          </div>

          {/* Contextual Action Bar */}
          <ContextualActionBar />

          {filteredSwaps.length > 0 ? (
            <>
              {/* Filter Bar */}
              <FilterBar 
                onFilterChange={handleFilterChange}
                onSortChange={handleSortChange}
              />

              {/* Stats Summary */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="ArrowLeftRight" size={16} className="text-primary" />
                    <span className="text-sm font-medium text-foreground">Total Swaps</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">{swaps.length}</p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Calendar" size={16} className="text-success" />
                    <span className="text-sm font-medium text-foreground">Scheduled</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {swaps.filter(s => s.nextSession).length}
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="TrendingUp" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-foreground">In Progress</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {swaps.filter(s => s.status === 'active').length}
                  </p>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <Icon name="Clock" size={16} className="text-secondary" />
                    <span className="text-sm font-medium text-foreground">Avg Progress</span>
                  </div>
                  <p className="text-2xl font-bold text-foreground mt-1">
                    {Math.round(swaps.reduce((acc, s) => acc + (s.completedSessions / s.totalSessions), 0) / swaps.length * 100)}%
                  </p>
                </div>
              </div>

              {/* Swaps Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredSwaps.map((swap) => (
                  <SwapCard
                    key={swap.id}
                    swap={swap}
                    onScheduleSession={handleScheduleSession}
                    onMessagePartner={handleMessagePartner}
                    onMarkComplete={handleMarkComplete}
                  />
                ))}
              </div>
            </>
          ) : (
            <EmptyState />
          )}
        </div>
      </div>

      {/* Modals */}
      <ScheduleModal
        swap={selectedSwap}
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        onSchedule={handleScheduleSubmit}
      />

      <CompletionModal
        swap={selectedSwap}
        isOpen={showCompletionModal}
        onClose={() => setShowCompletionModal(false)}
        onSubmit={handleCompletionSubmit}
      />

      <BottomNavigation />
    </div>
  );
};

export default ActiveSwaps;