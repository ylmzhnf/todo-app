import React from "react";

function Login() {
  return (
    <div className="auth-container">
      <div className="header auth-header">
        <h1>TODO</h1>
      </div>

      <form className="auth-form">
        <h2>Giriş Yap</h2>

        {/* E-posta Alanı */}
        <input
          type="email"
          placeholder="E-posta Adresi"
          className="auth-input"
        />

        {/* Şifre Alanı */}
        <input type="password" placeholder="Şifre" className="auth-input" />

        <button type="submit" className="auth-button">
          Giriş Yap
        </button>
      </form>

      <p className="auth-link-text">
        Hesabın yok mu? <a href="#">Kayıt Ol</a>
      </p>
    </div>
  );
}

export default Login;
