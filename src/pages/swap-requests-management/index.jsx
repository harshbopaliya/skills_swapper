import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import RequestTabs from './components/RequestTabs';
import SearchAndFilter from './components/SearchAndFilter';
import RequestCard from './components/RequestCard';
import EmptyState from './components/EmptyState';
import RequestStats from './components/RequestStats';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const SwapRequestsManagement = () => {
  const [activeTab, setActiveTab] = useState('received');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [requests, setRequests] = useState({
    received: [],
    sent: []
  });

  // Mock data for requests
  const mockRequests = {
    received: [
      {
        id: 'req_001',
        partner: {
          id: 'user_001',
          name: 'Sarah Chen',
          avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
          location: 'San Francisco, CA',
          isOnline: true
        },
        skillsOffered: ['React', 'JavaScript', 'Node.js'],
        skillsWanted: ['Python', 'Data Science'],
        message: `Hi! I saw your profile and I'm really interested in learning Python and Data Science. I have 3+ years of experience with React and JavaScript, and I've built several full-stack applications. I'd love to help you with frontend development in exchange for learning data science fundamentals. Let me know if you're interested!`,
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
        status: 'pending'
      },
      {
        id: 'req_002',
        partner: {
          id: 'user_002',
          name: 'Michael Rodriguez',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
          location: 'Austin, TX',
          isOnline: false
        },
        skillsOffered: ['UI/UX Design', 'Figma', 'Adobe Creative Suite'],
        skillsWanted: ['React', 'Frontend Development'],
        message: `Hello! I'm a UI/UX designer with 5 years of experience looking to transition into frontend development. I can help you with design systems, user research, and prototyping. Would love to learn React from someone experienced!`,
        timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
        status: 'pending'
      },
      {
        id: 'req_003',
        partner: {
          id: 'user_003',name: 'Emily Johnson',avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',location: 'New York, NY',
          isOnline: true
        },
        skillsOffered: ['Digital Marketing', 'SEO', 'Content Strategy'],
        skillsWanted: ['Web Development', 'WordPress'],
        message: `Hi there! I run a digital marketing agency and I'm looking to learn web development to better understand the technical side. I can teach you everything about SEO, content marketing, and digital advertising strategies.`,
        timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
        status: 'accepted'
      }
    ],
    sent: [
      {
        id: 'req_004',
        partner: {
          id: 'user_004',
          name: 'David Kim',
          avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
          location: 'Seattle, WA',
          isOnline: true
        },
        skillsOffered: ['Python', 'Data Science', 'Machine Learning'],
        skillsWanted: ['React', 'JavaScript'],
        message: `Hello David! I'm interested in learning machine learning and data science. I have strong experience in React and JavaScript development and would be happy to teach you frontend development in exchange. Looking forward to hearing from you!`,
        timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
        status: 'pending'
      },
      {
        id: 'req_005',
        partner: {
          id: 'user_005',name: 'Lisa Wang',avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',location: 'Los Angeles, CA',
          isOnline: false
        },
        skillsOffered: ['Photography', 'Photo Editing', 'Lightroom'],
        skillsWanted: ['Web Design', 'CSS'],
        message: `Hi Lisa! I love your photography work and would like to learn photo editing techniques. I can help you with web design and CSS in return. Let me know if you're interested in a skill swap!`,
        timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
        status: 'declined'
      },
      {
        id: 'req_006',
        partner: {
          id: 'user_006',
          name: 'Alex Thompson',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
          location: 'Chicago, IL',
          isOnline: true
        },
        skillsOffered: ['DevOps', 'AWS', 'Docker'],
        skillsWanted: ['Frontend Development', 'React'],
        message: `Hey Alex! I saw your DevOps expertise and I'm really interested in learning cloud technologies and containerization. I have solid React and frontend skills that I'd be happy to share. Would you be interested in a skill exchange?`,
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
        status: 'accepted'
      }
    ]
  };

  useEffect(() => {
    setRequests(mockRequests);
  }, []);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSearchQuery('');
    setActiveFilters([]);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleFilter = (filter) => {
    if (filter === 'clear') {
      setActiveFilters([]);
    } else {
      setActiveFilters(prev => 
        prev.includes(filter) 
          ? prev.filter(f => f !== filter)
          : [...prev, filter]
      );
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsRefreshing(false);
  };

  const handleAcceptRequest = (requestId) => {
    setRequests(prev => ({
      ...prev,
      received: prev.received.map(req => 
        req.id === requestId ? { ...req, status: 'accepted' } : req
      )
    }));
  };

  const handleDeclineRequest = (requestId, reason) => {
    setRequests(prev => ({
      ...prev,
      received: prev.received.map(req => 
        req.id === requestId ? { ...req, status: 'declined' } : req
      )
    }));
  };

  const handleCancelRequest = (requestId) => {
    setRequests(prev => ({
      ...prev,
      sent: prev.sent.filter(req => req.id !== requestId)
    }));
  };

  const handleViewProfile = (userId) => {
    window.location.href = '/user-profile-detail';
  };

  const handleBrowseUsers = () => {
    window.location.href = '/browse-users';
  };

  const filterRequests = (requestList) => {
    let filtered = requestList;

    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(request => 
        request.partner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        request.skillsOffered.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase())) ||
        request.skillsWanted.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Apply status filters
    if (activeFilters.length > 0) {
      filtered = filtered.filter(request => {
        if (activeFilters.includes('recent')) {
          const isRecent = new Date() - new Date(request.timestamp) < 24 * 60 * 60 * 1000;
          if (!isRecent && activeFilters.length === 1) return false;
        }
        return activeFilters.some(filter => 
          filter === 'recent' || request.status === filter
        );
      });
    }

    return filtered;
  };

  const currentRequests = filterRequests(requests[activeTab]);
  const receivedCount = requests.received.filter(req => req.status === 'pending').length;
  const sentCount = requests.sent.filter(req => req.status === 'pending').length;

  // Calculate stats
  const stats = {
    total: requests.received.length + requests.sent.length,
    pending: requests.received.filter(req => req.status === 'pending').length + 
             requests.sent.filter(req => req.status === 'pending').length,
    accepted: requests.received.filter(req => req.status === 'accepted').length + 
              requests.sent.filter(req => req.status === 'accepted').length,
    responseRate: Math.round(
      (requests.received.filter(req => req.status !== 'pending').length / 
       Math.max(requests.received.length, 1)) * 100
    )
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-16 lg:pb-0 lg:pl-64">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground mb-2">Swap Requests</h1>
              <p className="text-muted-foreground">Manage your skill exchange requests</p>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={handleRefresh}
                disabled={isRefreshing}
                className={isRefreshing ? 'animate-spin' : ''}
              >
                <Icon name="RefreshCw" size={20} />
              </Button>
              
              <Button
                variant="default"
                onClick={handleBrowseUsers}
                iconName="Plus"
                iconPosition="left"
                className="hidden sm:flex"
              >
                New Request
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <RequestStats stats={stats} />

          {/* Contextual Action Bar */}
          <ContextualActionBar />

          {/* Request Tabs */}
          <RequestTabs
            activeTab={activeTab}
            onTabChange={handleTabChange}
            receivedCount={receivedCount}
            sentCount={sentCount}
          />

          {/* Search and Filter */}
          <SearchAndFilter
            onSearch={handleSearch}
            onFilter={handleFilter}
            activeFilters={activeFilters}
          />

          {/* Request List */}
          <div className="space-y-4">
            {currentRequests.length > 0 ? (
              currentRequests.map((request) => (
                <RequestCard
                  key={request.id}
                  request={request}
                  type={activeTab}
                  onAccept={handleAcceptRequest}
                  onDecline={handleDeclineRequest}
                  onCancel={handleCancelRequest}
                  onViewProfile={handleViewProfile}
                />
              ))
            ) : (
              <EmptyState
                type={searchQuery || activeFilters.length > 0 ? 'search' : activeTab}
                onBrowseUsers={handleBrowseUsers}
              />
            )}
          </div>

          {/* Load More Button */}
          {currentRequests.length > 0 && currentRequests.length >= 10 && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                iconName="ChevronDown"
                iconPosition="right"
              >
                Load More Requests
              </Button>
            </div>
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};

export default SwapRequestsManagement;