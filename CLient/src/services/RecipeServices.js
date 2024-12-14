import apiClient from '../api.config';

export const getRecipes = async () => {
    try {
        const response = await apiClient.get('/api/recipes');
        return {
            success: true,
            data: response.data.data || []
        };
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error fetching recipes'
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

export const getAllRecipes = async () => {
    try {
        const response = await apiClient.get('/recipes');
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Error fetching recipes');
    }
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