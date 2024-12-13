import axios from 'axios';
import apiClient from '../api.config.js';

const API_URL = 'http://localhost:5000/api/recipes';


export const getAllRecipes = async () => {
    try {
        const response = await apiClient.get('/recipes');
        return {
            success: true,
            data: response.data || []
        };
    } catch (error) {
        console.error('API Error:', error);
        return {
            success: false,
            error: error.response?.data?.message || 'Error fetching recipes',
            data: []
        };
    }
};

export const addRecipe = async (recipeData) => {
  try {
    const response = await axios.post(API_URL, recipeData); 
    return { success: true, data: response.data }; 
  } catch (error) {
    console.error('Error al añadir la receta:', error);
    return { success: false, error: 'Error al añadir la receta' };
  }
};

export const deleteRecipe = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`); 
  } catch (error) {
    console.error(error);
  }
};

export const updateRecipe = async (id, recipe) => {
  try {
    await axios.put(`${API_URL}/${id}`, recipe);
  } catch (error) {
    console.error(error);
  }
};

export const getRecipeById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}