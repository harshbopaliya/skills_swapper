import { useState, useEffect } from 'react';
import DatabaseService from '../services/database';

export const useDatabase = () => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initDB = async () => {
      try {
        await DatabaseService.initialize();
        setIsInitialized(true);
      } catch (err) {
        setError(err.message);
        console.error('Database initialization failed:', err);
      }
    };

    initDB();
  }, []);

  return { isInitialized, error };
};

export const useUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async (query = '', filters = {}) => {
    try {
      setLoading(true);
      let result;
      if (query || Object.keys(filters).some(key => filters[key])) {
        result = await DatabaseService.searchUsers(query, filters);
      } else {
        result = await DatabaseService.getAllUsers();
      }
      setUsers(result);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch users:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return { users, loading, error, fetchUsers };
};

export const useDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchDashboardData = async (userId = 1) => {
    try {
      setLoading(true);
      const [currentUser, stats, activities] = await Promise.all([
        DatabaseService.getCurrentUser(),
        DatabaseService.getDashboardStats(userId),
        DatabaseService.getUserActivities(userId)
      ]);

      setDashboardData({
        currentUser,
        ...stats,
        recentActivity: activities
      });
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const refreshData = () => {
    fetchDashboardData();
  };

  return { dashboardData, loading, error, refreshData };
};

export const useSwapRequest = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = async (requestData) => {
    try {
      setLoading(true);
      await DatabaseService.createSwapRequest(requestData);
      
      // Add activity for the requestee
      await DatabaseService.addActivity({
        userId: requestData.requesteeId,
        type: 'request_received',
        message: `New swap request from ${requestData.requesterName} for ${requestData.wantedSkillName}`,
        relatedUserId: requestData.requesterId,
        relatedUserName: requestData.requesterName,
        relatedUserAvatar: requestData.requesterAvatar
      });

      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      console.error('Failed to send swap request:', err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, loading, error };
};