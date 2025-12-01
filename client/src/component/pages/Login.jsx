import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] =useState("");

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) =>{
    e.preventDefault();
    setError("");
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  }

  return (
    <div className="auth-container">
      <div className="header auth-header">
        <h1>TODO</h1>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Giriş Yap</h2>
        {error && <p style={{color:"red", textAlign:"center"}}>{error}</p>}

        {/* E-posta Alanı */}
        <input
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          type="email"
          placeholder="E-posta Adresi"
          className="auth-input"
          value={email}
        />

        {/* Şifre Alanı */}
        <input
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          placeholder="Şifre"
          className="auth-input"
          value={password}
        />

        <button type="submit" className="auth-button">
          Giriş Yap
        </button>
      </form>

      <p className="auth-link-text">
        Hesabın yok mu? <Link to="/register">Kayıt Ol</Link>
      </p>
    </div>
  );
}

export default Login;
