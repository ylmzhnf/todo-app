import React from 'react';

function Register() { 
  return (
    <div className="auth-container">
      <div className="header auth-header">
        <h1>TODO</h1>
      </div>

      <form  className="auth-form">
        <h2>Kayıt Ol</h2>
        
        {/* Ad Alanı */}
        <input
          type="text"
          placeholder="Adınız ve Soyadınız"
          className="auth-input"
          required
        />
        
        {/* E-posta Alanı */}
        <input
          type="email"
          placeholder="E-posta Adresi"
          className="auth-input"
        />
        
        {/* Şifre Alanı */}
        <input
          type="password"
          placeholder="Şifre Oluştur"
          className="auth-input"
        />

        {/* Şifre Tekrar Alanı */}
        <input
          type="password"
          placeholder="Şifreyi Tekrar Girin"
          className="auth-input"
        />
        
        <button type="submit" className="auth-button">Hesap Oluştur</button>
      </form>

      <p className="auth-link-text">
        Zaten hesabın var mı? <a href="#">Giriş Yap</a>
      </p>
    </div>
  );
}

export default Register;