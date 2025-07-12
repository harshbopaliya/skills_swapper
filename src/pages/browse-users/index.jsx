import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Header from '../../components/ui/Header';
import BottomNavigation from '../../components/ui/BottomNavigation';
import ContextualActionBar from '../../components/ui/ContextualActionBar';
import UserCard from './components/UserCard';
import FilterChips from './components/FilterChips';
import FilterPanel from './components/FilterPanel';
import SortDropdown from './components/SortDropdown';
import RequestModal from './components/RequestModal';
import SkeletonCard from './components/SkeletonCard';
import { useUsers, useSwapRequest } from '../../hooks/useDatabase';

const BrowseUsers = () => {
  const location = useLocation();
  const { users, loading, fetchUsers } = useUsers();
  const { sendRequest, loading: requestLoading } = useSwapRequest();
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loadingMore, setLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const [filters, setFilters] = useState({
    skills: [],
    location: '',
    radius: 25,
    availability: '',
    minRating: 0
  });

  // Handle search from global header
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const query = urlParams.get('search');
    if (query) {
      setSearchQuery(query);
    }
  }, [location.search]);

  // Filter and sort users
  const processedUsers = useMemo(() => {
    let result = [...users];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(user => 
        user.name.toLowerCase().includes(query) ||
        user.location.toLowerCase().includes(query) ||
        user.skillsOffered?.some(skill => skill.toLowerCase().includes(query)) ||
        user.skillsWanted?.some(skill => skill.toLowerCase().includes(query))
      );
    }

    // Apply filters
    if (filters.skills.length > 0) {
      result = result.filter(user =>
        filters.skills.some(skill =>
          user.skillsOffered?.includes(skill) || user.skillsWanted?.includes(skill)
        )
      );
    }

    if (filters.location) {
      result = result.filter(user =>
        user.location?.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.availability) {
      result = result.filter(user => user.availability === filters.availability);
    }

    if (filters.minRating > 0) {
      result = result.filter(user => user.rating >= filters.minRating);
    }

    // Apply sorting
    switch (sortBy) {
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      case 'distance':
        result.sort((a, b) => a.distance - b.distance);
        break;
      case 'recent':
        result.sort((a, b) => new Date(b.last_active) - new Date(a.last_active));
        break;
      case 'alphabetical':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default: // relevance
        result.sort((a, b) => {
          const aScore = (a.rating * a.review_count) + (a.is_online ? 10 : 0);
          const bScore = (b.rating * b.review_count) + (b.is_online ? 10 : 0);
          return bScore - aScore;
        });
    }

    return result;
  }, [users, searchQuery, filters, sortBy]);

  // Update filtered users when processed users change
  useEffect(() => {
    setFilteredUsers(processedUsers);
  }, [processedUsers]);

  // Fetch users when filters change
  useEffect(() => {
    const searchFilters = {
      location: filters.location,
      availability: filters.availability,
      minRating: filters.minRating
    };
    fetchUsers(searchQuery, searchFilters);
  }, [searchQuery, filters, fetchUsers]);

  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    setPage(1);
  };

  const handleRemoveFilter = (filterType, value) => {
    const newFilters = { ...filters };
    
    if (filterType === 'skills') {
      newFilters.skills = newFilters.skills.filter(skill => skill !== value);
    } else if (filterType === 'location') {
      newFilters.location = '';
      newFilters.radius = 25;
    } else if (filterType === 'availability') {
      newFilters.availability = '';
    } else if (filterType === 'minRating') {
      newFilters.minRating = 0;
    }
    
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      skills: [],
      location: '',
      radius: 25,
      availability: '',
      minRating: 0
    });
    setSearchQuery('');
  };

  const handleSendRequest = (user) => {
    setSelectedUser(user);
    setShowRequestModal(true);
  };

  const handleRequestSubmit = async (requestData) => {
    const success = await sendRequest({
      requesterId: 1, // Current user ID
      requesteeId: selectedUser.id,
      requesterName: "Alex Johnson", // Current user name
      requesterAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      offeredSkillName: requestData.offeredSkill,
      wantedSkillName: requestData.wantedSkill,
      message: requestData.message
    });

    if (success) {
      setShowRequestModal(false);
      setSelectedUser(null);
    }
  };

  const handleLoadMore = () => {
    if (loadingMore || !hasMore) return;
    
    setLoadingMore(true);
    setTimeout(() => {
      setPage(prev => prev + 1);
      setLoadingMore(false);
      
      // Simulate no more users after page 3
      if (page >= 2) {
        setHasMore(false);
      }
    }, 1000);
  };

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop
        >= document.documentElement.offsetHeight - 1000
      ) {
        handleLoadMore();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingMore, hasMore, page]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16 pb-16 lg:pb-0 lg:pl-64">
        <div className="container mx-auto px-4 py-6">
          
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-foreground mb-2">Browse Users</h1>
            <p className="text-muted-foreground">
              Discover skilled individuals ready to exchange knowledge and expertise
            </p>
          </div>

          {/* Contextual Actions */}
          <ContextualActionBar />

          {/* Filter Controls */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilterPanel(true)}
                iconName="Filter"
                iconPosition="left"
                className="lg:hidden"
              >
                Filters
                {(filters.skills.length > 0 || filters.location || filters.availability || filters.minRating > 0) && (
                  <span className="ml-2 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {filters.skills.length + 
                     (filters.location ? 1 : 0) + 
                     (filters.availability ? 1 : 0) + 
                     (filters.minRating > 0 ? 1 : 0)}
                  </span>
                )}
              </Button>
            </div>

            {/* Active Filter Chips */}
            <FilterChips
              activeFilters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />
          </div>

          <div className="flex gap-6">
            {/* Desktop Filter Sidebar */}
            <div className="hidden lg:block w-80 flex-shrink-0">
              <div className="sticky top-20">
                <FilterPanel
                  isOpen={true}
                  onClose={() => {}}
                  filters={filters}
                  onApplyFilters={handleApplyFilters}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Sort and Results */}
              <SortDropdown
                currentSort={sortBy}
                onSortChange={setSortBy}
                resultCount={filteredUsers.length}
              />

              {/* Users Grid */}
              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {Array.from({ length: 6 }, (_, index) => (
                    <SkeletonCard key={index} />
                  ))}
                </div>
              ) : filteredUsers.length > 0 ? (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredUsers.map((user) => (
                      <UserCard
                        key={user.id}
                        user={user}
                        onSendRequest={handleSendRequest}
                      />
                    ))}
                  </div>

                  {/* Load More */}
                  {loadingMore && (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
                      {Array.from({ length: 3 }, (_, index) => (
                        <SkeletonCard key={`loading-${index}`} />
                      ))}
                    </div>
                  )}

                  {!hasMore && filteredUsers.length > 6 && (
                    <div className="text-center py-8">
                      <p className="text-muted-foreground">
                        You've reached the end of the results
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No users found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search criteria or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearAllFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Filter Panel */}
      <FilterPanel
        isOpen={showFilterPanel}
        onClose={() => setShowFilterPanel(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
      />

      {/* Request Modal */}
      <RequestModal
        isOpen={showRequestModal}
        onClose={() => setShowRequestModal(false)}
        user={selectedUser}
        onSendRequest={handleRequestSubmit}
        loading={requestLoading}
      />

      <BottomNavigation />
    </div>
  );
};

export default BrowseUsers;