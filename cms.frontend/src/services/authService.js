// src/services/authService.js
import axios from 'axios';

// Đảm bảo cổng Backend đúng với máy bạn (7076)
const API_URL = 'https://localhost:7076/api/customers';

const authService = {
    login: async (email, password) => {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        return response.data;
    },
    
    register: async (userData) => {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    }
};

export default authService;