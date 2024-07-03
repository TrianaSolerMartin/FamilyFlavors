import axios from 'axios';

const API_URL = 'http://localhost:3001/recipes'; // Definir la URL base de la API

export const getAllRecipes = async () => {
  try {
    const response = await axios.get(API_URL); // Usar API_URL en la llamada GET
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addRecipe = async (recipeData) => {
  try {
    const response = await axios.post(API_URL, recipeData); // Usar API_URL en la llamada POST
    return { success: true, data: response.data }; // Manejar respuesta exitosa según tu API
  } catch (error) {
    console.error('Error al añadir la receta:', error);
    return { success: false, error: 'Error al añadir la receta' };
  }
};

export const deleteRecipe = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`); // Usar API_URL en la llamada DELETE
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateRecipe = async (id, recipe) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, recipe); // Usar API_URL en la llamada PUT
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
