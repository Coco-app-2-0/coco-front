import axios from "axios";

const axiosInstance = axios.create({
  baseURL: 'https://cocoapp.com.mx/sandbox/controller', 
  timeout: 1000, // Tiempo de espera opcional
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // Permitir todas las orígenes
    'Access-Control-Allow-Headers': 'Content-Type, Authorization', // Headers permitidos
  },
});

export default axiosInstance;