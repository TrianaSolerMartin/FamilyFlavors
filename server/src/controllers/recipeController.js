import Recipe from '../models/recipeModel.js';
import Ingredient from '../models/ingredientModel.js';

const getAllRecipes = async (req, res) => {
    try {
        const recipes = await Recipe.findAll({ include: Ingredient });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createRecipe = async (req, res) => {
    try {
        const { name, description, instructions, ingredients } = req.body;
        const recipe = await Recipe.create({ name, description, instructions });
        if (ingredients && ingredients.length > 0) {
            const ingredientInstances = await Ingredient.findAll({
                where: { name: ingredients },
            });
            await recipe.addIngredients(ingredientInstances);
        }
        res.status(201).json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllRecipes, createRecipe };
