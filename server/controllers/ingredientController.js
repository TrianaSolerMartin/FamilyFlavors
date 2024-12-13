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

const deleteIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const ingredient = await Ingredient.findByPk(id);
        if (ingredient) {
            await ingredient.destroy();
            res.json({ message: 'Ingredient deleted' });
        } else {
            res.status(404).json({ error: 'Ingredient not found' });
        }
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const updateIngredient = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;
        const ingredient = await Ingredient.findByPk(id);
        if (ingredient) {
            ingredient.name = name;
            await ingredient.save();
            res.json(ingredient);
        } else {
            res.status(404).json({ error: 'Ingredient not found' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export { getAllIngredients, createIngredient, deleteIngredient, updateIngredient };