import apiClient from '../api.config';

const validateRecipe = (recipe) => {
    // Required fields validation with strict type checking
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

    // Strict number validation
    const prepTime = Number(recipe.prepTime);

    if (isNaN(prepTime) || prepTime <= 0) {
        throw new Error('El tiempo de preparación debe ser mayor a 0');
    }

    // Ingredients validation
    if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
        throw new Error('Debe incluir al menos un ingrediente');
    }

    const validatedIngredients = recipe.ingredients.map((ing, index) => {
        if (!ing.name?.trim() || !ing.quantity?.trim()) {
            throw new Error(`Ingrediente ${index + 1} requiere nombre y cantidad`);
        }
        return {
            name: ing.name.trim(),
            quantity: ing.quantity.trim()
        };
    });

    // Return validated data with proper types
    return {
        ...recipe,
        prepTime: parseInt(prepTime),
        ingredients: validatedIngredients,
        isFavorite: Boolean(recipe.isFavorite),
        image: recipe.image || null
    };
};
const validateRecipe = (recipe) => {
    // Required fields validation with strict type checking
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

    // Strict number validation
    const prepTime = Number(recipe.prepTime);
    if (isNaN(prepTime) || prepTime <= 0) {
        throw new Error('El tiempo de preparación debe ser mayor a 0');
    }

    // Ingredients validation 
    if (!Array.isArray(recipe.ingredients) || recipe.ingredients.length === 0) {
        throw new Error('La receta debe tener al menos un ingrediente');
    }

    // Validate each ingredient
    recipe.ingredients.forEach((ing, index) => {
        if (!ing.name?.trim() || !ing.quantity?.trim()) {
            throw new Error(`Ingrediente ${index + 1} requiere nombre y cantidad`);
        }
    });

    return true;
};

export const createRecipe = async (recipeData) => {
    try {
        const validatedRecipe = validateRecipe(recipeData);
        const response = await apiClient.post('/recipes', validatedRecipe);
        
        if (!response.data.success) {
            throw new Error(response.data.error || 'Error al crear receta');
        }

        return response.data;
    } catch (error) {
        console.error('API Error:', error);
        throw new Error(error.response?.data?.error || 'Error al crear receta');
    }
};
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
        return response.data;
    } catch (error) {
        console.error('Error al obtener recetas:', error);
        throw error;
    }
};

export const updateRecipe = async (id, recipeData) => {
    try {
        validateRecipe(recipeData);
        const response = await apiClient.put(`/recipes/${id}`, recipeData);
        return response.data;
    } catch (error) {
        console.error('Error al actualizar receta:', error);
        throw error;
    }
};

export const deleteRecipe = async (id) => {
    try {
        const response = await apiClient.delete(`/recipes/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error al eliminar receta:', error);
        throw error;
    }
};