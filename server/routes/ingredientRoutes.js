import express from 'express';
import { getAllIngredients, createIngredient, deleteIngredient, updateIngredient } from '../controllers/ingredientController.js';

const router = express.Router();

router.get('/', getAllIngredients);
router.post('/', createIngredient);
router.delete('/:id', deleteIngredient);
router.put('/:id', updateIngredient);

export default router;