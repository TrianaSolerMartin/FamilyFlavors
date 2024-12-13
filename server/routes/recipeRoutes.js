import express from 'express';
import { getAllRecipes, createRecipe, deleteRecipe, updateRecipe, getRecipeById } from '../controllers/recipeController.js';

const router = express.Router();

router.get('/', getAllRecipes);
router.post('/', createRecipe);
router.delete('/:id', deleteRecipe);
router.put('/:id', updateRecipe);
router.get('/:id', getRecipeById);

export default router;