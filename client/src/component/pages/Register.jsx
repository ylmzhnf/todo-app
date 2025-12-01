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

  const {register} = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Şifre eşleşme kontrolü (Frontend validasyonu)
    if (password !== confirmPassword) {
      return setError('Hata: Şifreler eşleşmiyor!');
    }
    
    // Backend'e göndereceğimiz şifreler boş olmamalı
    if (password.length < 6) {
        return setError('Şifre en az 6 karakter olmalıdır.');
    }
    // Kayıt işlemi burada gerçekleştirilecek
    try {
      await register(username, email, password);
      setTimeout(() => navigate('/login'), 1500);
      setSuccess('Kayıt başarılı! Şimdi giriş yapabilirsiniz.');
    } catch (error) {
      const msg = err.response?.data?.error || 'Kayıt sırasında bir hata oluştu.';
      setError(msg);
    }
  }
  return (
    <div className="auth-container">
      <div className="header auth-header">
        <h1>TODO</h1>
      </div>

      <form onSubmit={handleSubmit} className="auth-form">
        <h2>Kayıt Ol</h2>
        {error && <p style={{color:"red", textAlign:"center"}}>{error}</p>}
        {success && <p style={{ color: 'var(--blue-500)', textAlign: 'center' }}>{success}</p>}
        {/* Ad Alanı */}
        <input
        onChange={(e)=>{setUsername(e.target.value)}}
          type="text"
          placeholder="Adınız ve Soyadınız"
          className="auth-input"
          value={username}
          required
        />
        
        {/* E-posta Alanı */}
        <input
        onChange={(e)=>{setEmail(e.target.value)}}
        value={email}
          type="email"
          placeholder="E-posta Adresi"
          className="auth-input"
          required
        />
        
        {/* Şifre Alanı */}
        <input
        onChange={(e)=>{setPassword(e.target.value)}}
        value={password}
          type="password"
          placeholder="Şifre Oluştur"
          className="auth-input"
          required
        />

        {/* Şifre Tekrar Alanı */}
        <input
        onChange={(e)=>{setConfirmPassword(e.target.value)}}
        value={confirmPassword}
          type="password"
          placeholder="Şifreyi Tekrar Girin"
          className="auth-input"
          reaquired
        />
        
        <button type="submit" className="auth-button">Hesap Oluştur</button>
      </form>

      <p className="auth-link-text">
        Zaten hesabın var mı? <Link to="/login">Giriş Yap</Link>
      </p>
    </div>
  );
}

export default Register;