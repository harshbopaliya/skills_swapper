import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
// Add your imports here
import UserDashboard from "pages/user-dashboard";
import SwapRequestsManagement from "pages/swap-requests-management";
import UserProfileDetail from "pages/user-profile-detail";
import BrowseUsers from "pages/browse-users";
import ActiveSwaps from "pages/active-swaps";
import UserProfileSettings from "pages/user-profile-settings";
import NotFound from "pages/NotFound";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your routes here */}
        <Route path="/" element={<UserDashboard />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/swap-requests-management" element={<SwapRequestsManagement />} />
        <Route path="/user-profile-detail" element={<UserProfileDetail />} />
        <Route path="/browse-users" element={<BrowseUsers />} />
        <Route path="/active-swaps" element={<ActiveSwaps />} />
        <Route path="/user-profile-settings" element={<UserProfileSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;