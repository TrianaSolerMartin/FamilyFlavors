import apiClient from '../api.config.js';

export const login = async (credentials) => {
    try {
        const response = await apiClient.post('/auth/login', credentials);
        if (response.data.success) {
            localStorage.setItem('token', response.data.token);
            return { 
                success: true, 
                data: response.data
            };
        }
        return {
            success: false,
            error: response.data.message
        };
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