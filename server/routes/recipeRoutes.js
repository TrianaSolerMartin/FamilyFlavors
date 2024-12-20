import express from 'express';
import { authenticate } from '../middleware/authMiddleware.js';
import { 
    getAllRecipes, 
    createRecipe, 
    getRecipeById,
    updateRecipe,
    deleteRecipe,
    getUserRecipes,
    getFavorites,
    toggleFavorite
} from '../controllers/recipeController.js';

const router = express.Router();

// Public routes
router.get('/', getAllRecipes);
router.get('/:id', getRecipeById);

// Protected routes
router.post('/', authenticate, createRecipe);
router.put('/:id', authenticate, updateRecipe);
router.delete('/:id', authenticate, deleteRecipe);
router.get('/user/recipes', authenticate, getUserRecipes);
router.get('/favorites', authenticate, getFavorites);
router.patch('/:id/favorite', authenticate, toggleFavorite);

export default router;