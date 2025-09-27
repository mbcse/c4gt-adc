import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/shared/context/AuthContext";

export default function LandingRedirect() {
    const { user, isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user?.role === "ADMIN" || user?.role === "SUPERADMIN" || user?.role === "INSTRUCTOR") {
        return <Navigate to="/admin" replace />;
    }

    return <Navigate to="/" replace />;
}
