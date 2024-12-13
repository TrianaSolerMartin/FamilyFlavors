import Ingredient from '../models/ingredientModel.js';

const getAllIngredients = async (req, res) => {
    try {
        const ingredients = await Ingredient.findAll();
        res.json(ingredients);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const createIngredient = async (req, res) => {
    try {
        const { name } = req.body;
        const ingredient = await Ingredient.create({ name });
        res.status(201).json(ingredient);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export { getAllIngredients, createIngredient };
