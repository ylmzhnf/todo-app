//Axios ayarları ve Token ekleme
import axios from  "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000"
});

// her istekten önce çalışacak Interceptor(araya giren)
api.interceptors.request.use(
    (config) => {
        // localStorage 'den token al
        const token = localStorage.getItem("token");

        //eğer token varsa, başlığı (header) ekle
        if(token){
           config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) =>{
        return Promise.reject(error);
    }

);

export default api;