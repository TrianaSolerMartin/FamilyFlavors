import apiClient from '../api.config';

// Constants
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// Validation Functions
const validateRecipe = (recipe) => {
    const required = ['title', 'description', 'prepTime', 'ingredients'];
    const missing = required.filter(field => {
        const value = recipe[field];
        if (field === 'prepTime') {
            return value === undefined || value === null || value === '' || isNaN(Number(value));
        }
        return value === undefined || value === null || value === '';
    });
    
    if (missing.length) {
        throw new Error(`Faltan campos requeridos: ${missing.join(', ')}`);
    }

    const prepTime = Number(recipe.prepTime);
    if (isNaN(prepTime) || prepTime <= 0) {
        throw new Error('El tiempo de preparación debe ser mayor a 0');
    }

    validateIngredients(recipe.ingredients);
    
    return true;
};

const validateIngredients = (ingredients) => {
    if (!Array.isArray(ingredients) || ingredients.length === 0) {
        throw new Error('La receta debe tener al menos un ingrediente');
    }

    const validatedIngredients = ingredients.map(ing => {
        if (!ing.name?.trim() || !ing.quantity?.trim()) {
            throw new Error('Todos los ingredientes deben tener nombre y cantidad');
        }
        return {
            name: ing.name.trim(),
            quantity: ing.quantity.trim()
        };
    });

    return validatedIngredients;
};

const validateImage = (file) => {
    if (!file) return null;
    
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        throw new Error('Formato de imagen no soportado');
    }
    
    if (file.size > MAX_IMAGE_SIZE) {
        throw new Error('La imagen no debe superar los 5MB');
    }
    
    return true;
};

// Cloudinary Upload Function
const uploadToCloudinary = async (file) => {
    try {
        validateImage(file);
        
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`,
            {
                method: 'POST',
                body: formData
            }
        );

        if (!response.ok) {
            throw new Error('Error al subir la imagen');
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Error en Cloudinary:', error);
        throw new Error('Error al subir la imagen a Cloudinary');
    }
};

// API Functions
export const createRecipe = async (recipeData) => {
    try {
        validateRecipe(recipeData);
        
        let imageUrl = null;
        if (recipeData.image instanceof File) {
            imageUrl = await uploadToCloudinary(recipeData.image);
        }

        const finalData = {
            ...recipeData,
            image: imageUrl || recipeData.image,
            prepTime: parseInt(recipeData.prepTime),
            ingredients: validateIngredients(recipeData.ingredients),
            isFavorite: Boolean(recipeData.isFavorite)
        };

        const response = await apiClient.post('/recipes', finalData);
        return response.data;
    } catch (error) {
        console.error('Error al crear receta:', error);
        throw new Error(error.response?.data?.message || error.message || 'Error al crear receta');
    }
};

export const getAllRecipes = async (params = {}) => {
    try {
        const response = await apiClient.get('/recipes', { 
            params: {
                category: params.category || 'all',
                sortBy: params.sortBy || 'newest',
                search: params.search?.trim() || '',
                page: params.page || 1,
                limit: params.limit || 8
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error al obtener recetas:', error);
        throw new Error('Error al obtener las recetas');
    }
};

export const updateRecipe = async (id, recipeData) => {
    try {
        validateRecipe(recipeData);
        
        let imageUrl = null;
        if (recipeData.image instanceof File) {
            imageUrl = await uploadToCloudinary(recipeData.image);
        }

        const finalData = {
            ...recipeData,
            image: imageUrl || recipeData.image,
            prepTime: parseInt(recipeData.prepTime),
            ingredients: validateIngredients(recipeData.ingredients),
            isFavorite: Boolean(recipeData.isFavorite)
        };

        const response = await apiClient.put(`/recipes/${id}`, finalData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar receta:', error);
        throw new Error(error.response?.data?.message || error.message || 'Error al actualizar receta');
    }
};

export const deleteRecipe = async (id) => {
    try {
        const response = await apiClient.delete(`/recipes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar receta:', error);
        throw new Error('Error al eliminar la receta');
    }
};

export const getRecipeById = async (id) => {
    try {
        const response = await apiClient.get(`/recipes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al obtener receta:', error);
        throw new Error('Error al obtener la receta');
    }
};