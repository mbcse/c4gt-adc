import React from "react";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useAuth } from "@/shared/context/AuthContext";

export default function LandingRedirect() {

    const location = useLocation();
    const { user, isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center w-full h-64">
                <div className="w-12 h-12 border-4 border-violet-300 border-t-violet-600 rounded-full animate-spin" />
            </div>
        );
    }

    if (location.pathname === "/") {
        if (!isAuthenticated) {
            return <Navigate to="/login" replace />;
        }

        if (user?.role === "ADMIN" || user?.role === "SUPERADMIN" || user?.role === "INSTRUCTOR") {
            return <Navigate to="/admin" replace />;
        }

        return <Navigate to="/dashboard" replace />;
    }
    return <Outlet />;
}