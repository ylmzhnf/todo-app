import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("Login failed. Please check your credentials.");
    }
  }

  return (
    <div className="auth-container">
      <div className="header auth-header">
        <h1>TODO</h1>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Login</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

        {/* Email Field */}
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="Email Address"
          className="auth-input"
          value={email}
        />

        {/* Password Field */}
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Password"
          className="auth-input"
          value={password}
        />

        <button type="submit" className="auth-button">
          Login
        </button>
      </form>

      <p className="auth-link-text">
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </div>
  );
}

export default Login;
