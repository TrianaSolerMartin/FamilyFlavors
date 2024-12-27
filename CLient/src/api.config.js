import axios from 'axios';

// Constants
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// API Client Configuration
const apiClient = axios.create({
    baseURL: 'http://localhost:5000/api',
    withCredentials: true,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
    }
});

// Image Validation Utility
const validateImage = (file) => {
    if (!file || !(file instanceof File)) {
        throw new Error('Archivo inválido');
    }
    if (file.size > MAX_FILE_SIZE) {
        throw new Error(`El archivo no debe superar ${MAX_FILE_SIZE / 1024 / 1024}MB`);
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        throw new Error('Formato de archivo no permitido');
    }
    return true;
};

// Cloudinary Upload Function
export const uploadToCloudinary = async (file) => {
    try {
        validateImage(file);
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        const response = await axios.post(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            formData
        );

        if (!response.data?.secure_url) {
            throw new Error('Error al obtener URL de imagen');
        }

        return response.data.secure_url;
    } catch (error) {
        console.error('Error en Cloudinary:', error);
        throw new Error('Error al subir imagen a Cloudinary');
    }
};

// Request Interceptor
apiClient.interceptors.request.use(
    async (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor
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

// File Upload Helper
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