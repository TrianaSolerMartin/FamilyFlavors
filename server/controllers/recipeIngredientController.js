import RecipeIngredient from '../models/recipeIngredientModel.js';

export const addIngredientToRecipe = async (req, res) => {
    try {
        const { recipeId, ingredientId, quantity } = req.body;
        const recipeIngredient = await RecipeIngredient.create({
            RecipeId: recipeId,
            IngredientId: ingredientId,
            quantity
        });
        res.status(201).json(recipeIngredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const removeIngredientFromRecipe = async (req, res) => {
    try {
        const { recipeId, ingredientId } = req.params;
        await RecipeIngredient.destroy({
            where: {
                RecipeId: recipeId,
                IngredientId: ingredientId
            }
        });
        res.status(200).json({ message: 'Ingredient removed from recipe' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateIngredientQuantity = async (req, res) => {
    try {
        const { recipeId, ingredientId } = req.params;
        const { quantity } = req.body;
        const recipeIngredient = await RecipeIngredient.update(
            { quantity },
            { where: { RecipeId: recipeId, IngredientId: ingredientId } }
        );
        res.status(200).json(recipeIngredient);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};