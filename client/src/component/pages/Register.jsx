import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";


function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState('');

  const { register } = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Password match check (Frontend validation)
    if (password !== confirmPassword) {
      return setError('Error: Passwords do not match!');
    }

    // Passwords sent to backend must not be empty
    if (password.length < 6) {
      return setError('Password must be at least 6 characters.');
    }
    // Registration process happens here
    try {
      await register(username, email, password);
      setTimeout(() => navigate('/login'), 1500);
      setSuccess('Registration successful! You can now login.');
    } catch (error) {
      const msg = error.response?.data?.error || error.response?.data?.message || 'An error occurred during registration.';
      setError(typeof msg === 'string' ? msg : 'An error occurred during registration.');
    }
  }
  return (
    <div className="auth-container">
      <div className="header auth-header">
        <h1>TODO</h1>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Register</h2>
        {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}
        {success && <p style={{ color: 'var(--blue-500)', textAlign: 'center' }}>{success}</p>}
        {/* Name Field */}
        <input
          onChange={(e) => { setUsername(e.target.value) }}
          type="text"
          placeholder="Full Name"
          className="auth-input"
          value={username}
          required
        />

        {/* Email Field */}
        <input
          onChange={(e) => { setEmail(e.target.value) }}
          value={email}
          type="email"
          placeholder="Email Address"
          className="auth-input"
          required
        />

        {/* Password Field */}
        <input
          onChange={(e) => { setPassword(e.target.value) }}
          value={password}
          type="password"
          placeholder="Create Password"
          className="auth-input"
          required
        />

        {/* Confirm Password Field */}
        <input
          onChange={(e) => { setConfirmPassword(e.target.value) }}
          value={confirmPassword}
          type="password"
          placeholder="Confirm Password"
          className="auth-input"
          reaquired
        />

        <button type="submit" className="auth-button">Create Account</button>
      </form>

      <p className="auth-link-text">
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
}

export default Register;