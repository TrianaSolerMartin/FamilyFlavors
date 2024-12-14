import apiClient from '../api.config.js';

export const login = async (credentials) => {
    try {
        const response = await apiClient.post('/auth/login', credentials);
        localStorage.setItem('token', response.data.token);
        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data?.message || 'Error en login' 
        };
    }
};

export const register = async (userData) => {
    try {
        const response = await apiClient.post('/auth/register', userData);
        localStorage.setItem('token', response.data.token);
        return { success: true };
    } catch (error) {
        return { 
            success: false, 
            error: error.response?.data?.message || 'Error en registro' 
        };
    }
};