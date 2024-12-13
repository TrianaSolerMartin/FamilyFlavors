import express from 'express';
import { getAllIngredients, createIngredient } from '../controllers/ingredientController.js';

const router = express.Router();

router.get('/', getAllIngredients);
router.post('/', createIngredient);

export default router;
