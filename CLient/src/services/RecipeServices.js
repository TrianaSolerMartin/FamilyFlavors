import apiClient, { uploadToCloudinary } from '../api.config';

// Constants
const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

export const createRecipe = async (recipeData) => {
    try {
        // First validate recipe data
        validateRecipe(recipeData);

        // Handle image upload separately
        let imageUrl = null;
        if (recipeData.image instanceof File) {
            console.log('Uploading image to Cloudinary...');
            imageUrl = await uploadToCloudinary(recipeData.image);
            console.log('Image uploaded:', imageUrl);
        }

        // Prepare data with image URL
        const finalData = {
            title: recipeData.title,
            description: recipeData.description,
            prepTime: parseInt(recipeData.prepTime),
            image: imageUrl, // Use the Cloudinary URL
            isFavorite: Boolean(recipeData.isFavorite),
            ingredients: validateIngredients(recipeData.ingredients)
        };

        console.log('Sending to API:', finalData);
        const response = await apiClient.post('/recipes', finalData);
        return response.data;
    } catch (error) {
        console.error('Error creating recipe:', error);
        throw new Error(error.response?.data?.message || error.message || 'Error al crear receta');
    }
};

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