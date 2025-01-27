import express from 'express';
import authRoutes from './authRoutes.js';
import recipeRoutes from './recipeRoutes.js';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/recipes', recipeRoutes);

export default router;