// src/services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://4b5zq6vb-7276.uks1.devtunnels.ms/api', // URL base da API
  timeout: 10000, // Tempo limite para as requisições (opcional)
  headers: {
    'Content-Type': 'application/json',
    // Adicione mais headers conforme necessário, como tokens de autenticação
  },
});

// Interceptores podem ser usados para manipular requisições e respostas
api.interceptors.request.use(
  (config) => {
    // Por exemplo, adicionar token de autenticação
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Trate erros de resposta, como expiração de sessão
    if (error.response && error.response.status === 401) {
      // Redirecione ou faça outra ação caso o usuário não esteja autorizado
    }
    return Promise.reject(error);
  }
);

export default api;
