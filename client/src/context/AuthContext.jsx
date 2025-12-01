//Kullanıcı giriş kontrol merkezi
import React, { createContext, useEffect, useState } from "react";
import api from "../api/axios.js";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  //uygulama ilk acildiginda token var mi kontrol et
  useEffect(() => {
    const checkLoggedIn = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        //token varsa kullanici varmis gibi davran (istersen burda /me endpoint ile dogrulama yapanilirsin)
        //simdilik basitce token varsa giris yapmis sayiyoruz.
        setUser({ token });
      }
      setLoading(false);
    };
    checkLoggedIn();
  }, []);
  //giris fonksiyonu
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    //backendden gelen token kaydet
    localStorage.setItem("token", res.data.token);
    setUser({token: res.data.token, ...res.data.user});
    return res.data;
  };

  //kayit fonksiyonu
  const register =async (username, email, password) => {
    const res = await api.post("/auth/register", {username, email, password});
    return res.data;
  };

  //cikis fonksiyonu
  const logout =() => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
     <AuthContext.Provider value={{user , login, register, logout, loading}}>
        {children}
     </AuthContext.Provider>
  );

};

export default AuthProvider;