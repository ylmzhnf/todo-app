import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";

// Pages
import Login from "./component/pages/Login";
import Register from "./component/pages/Register";
import TodoPage from "./component/pages/TodoPage";

function App() {
  return (
    <AuthProvider>{/* Wraps the entire application */}
      <Router>
        <Routes>
          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected route */}
          <Route path="/" element={
            <ProtectedRoute>
              <TodoPage />
            </ProtectedRoute>
          } />

          {/* Redirect unknown routes to login */}
          <Route path="*" element={<Navigate to="/login" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
