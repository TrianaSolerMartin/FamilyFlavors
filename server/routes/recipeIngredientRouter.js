import express from 'express';
import { 
    addIngredientToRecipe, 
    removeIngredientFromRecipe,
    updateIngredientQuantity 
} from '../controllers/recipeIngredientController.js';

const router = express.Router();

router.post('/', addIngredientToRecipe);
router.delete('/:recipeId/:ingredientId', removeIngredientFromRecipe);
router.put('/:recipeId/:ingredientId', updateIngredientQuantity);

export default router;