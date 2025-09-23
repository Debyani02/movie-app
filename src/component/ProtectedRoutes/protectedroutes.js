import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../api/auth";

const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    // If user is not logged in, redirect to login
    return <Navigate to="/" replace />;
  }

  // If logged in, show the component
  return children;
};

export default ProtectedRoute;
