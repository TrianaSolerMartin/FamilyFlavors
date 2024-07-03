import axios from 'axios';

const url = 'http://localhost:3000/recipes';

export const getRecipes = async () => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};


export const addRecipe = async (recipe) => {
    try {
        const response = await axios.post(url, recipe);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }

export const deleteRecipe = async (id) => {
    try {
        const response = await axios.delete(`${url}/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }

export const updateRecipe = async (id, recipe) => {
    try {
        const response = await axios.put(`${url}/${id}`, recipe);
        return response.data;
    } catch (error) {
        console.error(error);
    }
    }