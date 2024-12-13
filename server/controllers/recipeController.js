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

const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (recipe) {
            await recipe.destroy();
            res.json({ message: 'Recipe deleted' });
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        if (recipe) {
            const { name, description, instructions, ingredients } = req.body;
            await recipe.update({ name, description, instructions });
            if (ingredients && ingredients.length > 0) {
                const ingredientInstances = await Ingredient.findAll({
                    where: { name: ingredients },
                });
                await recipe.setIngredients(ingredientInstances);
            }
            res.json(recipe);
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id, { include: Ingredient });
        if (recipe) {
            res.json(recipe);
        } else {
            res.status(404).json({ error: 'Recipe not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllRecipes, createRecipe, deleteRecipe, updateRecipe, getRecipeById };


