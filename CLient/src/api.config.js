import axios from 'axios';

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// Request interceptor
apiClient.interceptors.request.use(
    (config) => {
        // Auth token
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        // Validate recipe data
        if (config.method === 'post' && config.url === '/recipes') {
            const data = typeof config.data === 'string' ? JSON.parse(config.data) : config.data;
            
            // Transform numeric fields
            data.prepTime = Math.max(1, Number(data.prepTime));
            
            config.data = JSON.stringify(data);
        }
        
        console.log('Request Config:', config);
        return config;
    },
    (error) => {
        console.error('Request Error:', error);
        return Promise.reject(error);
    }
);

// Response interceptor
apiClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }

        if (error.response?.status === 413) {
            throw new Error('Archivo demasiado grande');
        }

        if (error.response?.status === 400) {
            const errorMessage = error.response?.data?.error || 'Error de validación';
            console.error('Validation Error:', errorMessage);
            throw new Error(errorMessage);
        }

        console.error('Response Error:', error.response || error);
        throw new Error(error.response?.data?.error || 'Error del servidor');
    }
);

export const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

    try {
        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );
        return response.data.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new Error('Error al subir imagen');
    }
};

// File upload helper
export const uploadFile = async (file, onProgress) => {
    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`El archivo no debe superar ${MAX_FILE_SIZE / 1024 / 1024}MB`);
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await apiClient.post('/upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            onUploadProgress: (progressEvent) => {
                const progress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                onProgress?.(progress);
            }
        });
        return response.data;
    } catch (error) {
        console.error('Upload Error:', error);
        throw new Error(error.message || 'Error al subir archivo');
    }
};

export default apiClient;