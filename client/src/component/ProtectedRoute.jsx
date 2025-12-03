// Security guard component
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useContext(AuthContext);

    if (loading) return <div>Loading...</div>;

    // If user does not exist, redirect to login page
    if (!user) {
        return <Navigate to="/login" replace />;
    }
    // If user exists, show the page
    return children;
}

export default ProtectedRoute;