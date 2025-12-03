import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user, logout, isDarkMode, toggleDarkMode } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="header">
      <h1>TODO</h1>
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        {user && <span style={{ fontSize: "0.9rem" }}>Welcome, {user.username}</span>}
        <button 
          className="dark-mode-btn" 
          onClick={toggleDarkMode}
          title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          <img src={isDarkMode ? "/images/icon-sun.svg" : "/images/icon-moon.svg"} alt={isDarkMode ? "sun icon" : "moon icon"} />
        </button>
        {user && <button onClick={handleLogout} style={
          { padding: "0.5rem 1rem", 
          color: "#fff",
          cursor: "pointer", borderRadius: "4px", border: "1px solid #ccc" ,background: "linear-gradient(hsl(192, 100%, 67%), hsl(280, 87%, 65%))"}}>Logout</button>}
      </div>
    </div>
  );
}

export default Header;