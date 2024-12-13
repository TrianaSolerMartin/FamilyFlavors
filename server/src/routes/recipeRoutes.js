import express from 'express';
import { getAllRecipes, createRecipe } from '../controllers/recipeController.js';

const router = express.Router();

router.get('/', getAllRecipes);
router.post('/', createRecipe);

export default router;
