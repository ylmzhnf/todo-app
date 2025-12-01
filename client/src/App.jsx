import React from "react";
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./component/ProtectedRoute";

//sayfalar
import Login from "./component/pages/Login";
import Register from "./component/pages/Register";
import TodoPage from "./component/pages/TodoPage";

function App() {
  return(
    <AuthProvider>{/*Tum uygulamayi sarmalar */}
      <Router>
        <Routes>
          {/*herkese acik rotalar */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/*Korumali rota */}
          <Route path="/" element={
            <ProtectedRoute>
              <TodoPage/>
            </ProtectedRoute>
          } />

          {/*bilinmeyen rotalari logine at */}
          <Route path="*" element={<Navigate to="/login"/>} /> 
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
