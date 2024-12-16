import apiClient from '../api.config';

export const login = async (credentials) => {
    try {
        const response = await apiClient.post('/auth/login', credentials);
        
        if (response.data.success && response.data.token) {
            localStorage.setItem('token', response.data.token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            return {
                success: true,
                data: response.data
            };
        }
        
        return {
            success: false,
            error: response.data.message || 'Login failed'
        };
    } catch (error) {
        console.error('Login error:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error de conexión'
        };
    }
};
export const register = async (userData) => {
    try {
        const response = await apiClient.post('/auth/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            apiClient.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        }
        return {
            success: true,
            data: response.data
        };
    } catch (error) {
        console.error('Register error:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Registration failed'
        };
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    delete apiClient.defaults.headers.common['Authorization'];
};