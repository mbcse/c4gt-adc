import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/shared/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[]; // e.g., ['ADMIN', 'SUPERADMIN']
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const { user, token } = useAuth();

  // Redirect to login if not authenticated
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If allowedRoles is specified, check if user's role is allowed
  if (allowedRoles && user && !allowedRoles.includes(user.role)) {
    // Unauthorized access, redirect (example: to student dashboard or 403 page)
    return <Navigate to="/" replace />;
  }

  // Authorized or no specific roles required
  return <>{children}</>;
};

export default ProtectedRoute;
