
import apiClient from '../api.config';

export const getAllRecipes = async (params) => {
    try {
        const response = await apiClient.get('/recipes', { 
            params: {
                category: params?.category || 'all',
                sortBy: params?.sortBy || 'newest',
                search: params?.search?.trim() || '',
                page: params?.page || 1,
                limit: params?.limit || 8
            }
        });
        return {
            success: true,
            data: response.data.data,
            total: response.data.total,
            pages: response.data.pages
        };
    } catch (error) {
        return {
            success: false,
            error: error.response?.data?.message || 'Failed to fetch recipes'
        };
    }
};


export const createRecipe = async (recipeData) => {
    try {
        const response = await apiClient.post('/api/recipes', recipeData);
        return {
            success: true,
            data: response.data.data
        };
    } catch (error) {
        console.error('Error creating recipe:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error creating recipe'
        };
    }
};

export const toggleFavoriteRecipe = async (recipeId) => {
    const response = await apiClient.patch(`/api/recipes/${recipeId}/favorite`);
    return response.data;
};

export const getRecipeById = async (id) => {
    try {
        const response = await apiClient.get(`/recipes/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching recipe');
    }
};

export const updateRecipe = async (id, recipeData) => {
    try {
        const response = await apiClient.put(`/recipes/${id}`, recipeData);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error updating recipe');
    }
};

export const deleteRecipe = async (id) => {
    try {
        const response = await apiClient.delete(`/recipes/${id}`);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error deleting recipe');
    }
};