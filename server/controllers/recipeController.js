import connection_db from '../database/connection_db.js';
import Recipe from '../models/recipeModel.js';
import Ingredient from '../models/ingredientModel.js';
import Step from '../models/stepModel.js';
import RecipeIngredient from '../models/recipeIngredientModel.js';

export const createRecipe = async (req, res) => {
    let transaction;
    let isCommitted = false;

    try {
        transaction = await connection_db.transaction();
        const { title, description, prepTime, ingredients, steps, image } = req.body;
        const userId = req.user.id;

        // Create recipe
        const recipe = await Recipe.create({
            title, description, prepTime, image, userId
        }, { transaction });

        // Handle ingredients
        if (ingredients?.length) {
            for (const ing of ingredients) {
                const [ingredient] = await Ingredient.findOrCreate({
                    where: { name: ing.name.toLowerCase().trim() },
                    transaction
                });

                await RecipeIngredient.create({
                    recipeId: recipe.id,
                    ingredientId: ingredient.id,
                    quantity: ing.quantity
                }, { transaction });
            }
        }

        // Handle steps
        if (steps?.length) {
            await Step.bulkCreate(
                steps.map((step, index) => ({
                    description: step.description,
                    orderNumber: index + 1,
                    recipeId: recipe.id
                })),
                { transaction }
            );
        }

        await transaction.commit();
        isCommitted = true;

        const completeRecipe = await Recipe.findByPk(recipe.id, {
            include: [
                { model: Ingredient, as: 'ingredients', through: { attributes: ['quantity'] } },
                { model: Step, as: 'steps', order: [['orderNumber', 'ASC']] }
            ]
        });

        return res.status(201).json({ success: true, data: completeRecipe });

    } catch (error) {
        if (transaction && !isCommitted) {
            await transaction.rollback();
        }

        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({
                success: false,
                error: error.errors[0].message
            });
        }

        console.error('Error creating recipe:', error);
        return res.status(500).json({ 
            success: false, 
            error: 'Error creating recipe'
        });
    }
};

export const updateRecipe = async (req, res) => {
    try {
        const { title, description, prepTime, image, ingredients, steps } = req.body;
        const recipe = await Recipe.findByPk(req.params.id);

        if (!recipe) {
            return res.status(404).json({
                success: false,
                error: 'Recipe not found'
            });
        }

        // Update recipe
        await recipe.update({
            title,
            description,
            prepTime,
            image
        });

        // Update ingredients
        if (ingredients) {
            await Ingredient.destroy({ where: { recipeId: recipe.id } });
            if (ingredients.length) {
                await Ingredient.bulkCreate(
                    ingredients.map(ing => ({...ing, recipeId: recipe.id}))
                );
            }
        }

        // Update steps
        if (steps) {
            await Step.destroy({ where: { recipeId: recipe.id } });
            if (steps.length) {
                await Step.bulkCreate(
                    steps.map((step, index) => ({
                        ...step,
                        recipeId: recipe.id,
                        orderNumber: index + 1
                    }))
                );
            }
        }

        // Fetch updated recipe
        const updatedRecipe = await Recipe.findByPk(recipe.id, {
            include: [
                { model: Ingredient, as: 'ingredients' },
                { model: Step, as: 'steps', order: [['orderNumber', 'ASC']] }
            ]
        });

        return res.status(200).json({
            success: true,
            data: updatedRecipe
        });
    } catch (error) {
        console.error('Error updating recipe:', error);
        return res.status(500).json({
            success: false,
            error: 'Error updating recipe'
        });
    }
};

export const deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id);
        
        if (!recipe) {
            return res.status(404).json({
                success: false,
                error: 'Recipe not found'
            });
        }

        await recipe.destroy();
        
        return res.status(200).json({
            success: true,
            message: 'Recipe deleted successfully'
        });
    } catch (error) {
        console.error('Error deleting recipe:', error);
        return res.status(500).json({
            success: false,
            error: 'Error deleting recipe'
        });
    }
};

export const toggleFavorite = async (req, res) => {
    try {
        const { id } = req.params;
        const recipe = await Recipe.findByPk(id);
        
        if (!recipe) {
            return res.status(404).json({ error: 'Recipe not found' });
        }

        recipe.isFavorite = !recipe.isFavorite;
        await recipe.save();
        
        res.json(recipe);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getAllRecipes = async (req, res) => {
    try {
        const { 
            page = 1, 
            limit = 8, 
            category = 'all', 
            sortBy = 'newest',
            search = '' 
        } = req.query;

        let where = {};
        let order = [];

        // Apply category filter
        if (category !== 'all') {
            where.category = category;
        }

        // Apply search filter
        if (search) {
            where[Op.or] = [
                { title: { [Op.iLike]: `%${search}%` } },
                { description: { [Op.iLike]: `%${search}%` } }
            ];
        }

        // Apply sorting
        switch (sortBy) {
            case 'newest':
                order.push(['createdAt', 'DESC']);
                break;
            case 'oldest':
                order.push(['createdAt', 'ASC']);
                break;
            case 'az':
                order.push(['title', 'ASC']);
                break;
            case 'za':
                order.push(['title', 'DESC']);
                break;
        }

        const { rows: recipes, count } = await Recipe.findAndCountAll({
            where,
            order,
            limit: parseInt(limit),
            offset: (parseInt(page) - 1) * parseInt(limit),
            include: [
                { model: Ingredient, as: 'ingredients' },
                { model: Step, as: 'steps' }
            ]
        });

        return res.status(200).json({
            success: true,
            data: recipes,
            total: count,
            pages: Math.ceil(count / limit)
        });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
};

export const getRecipeById = async (req, res) => {
    try {
        const recipe = await Recipe.findByPk(req.params.id, {
            include: [
                { model: Ingredient, as: 'ingredients' },
                { model: Step, as: 'steps', order: [['orderNumber', 'ASC']] }
            ]
        });

        if (!recipe) {
            return res.status(404).json({
                success: false,
                error: 'Recipe not found'
            });
        }

        return res.status(200).json({
            success: true,
            data: recipe
        });
    } catch (error) {
        console.error('Error fetching recipe:', error);
        return res.status(500).json({
            success: false,
            error: 'Error fetching recipe'
        });
    }
};

export const getUserRecipes = async (req, res) => {
    try {
        const userId = req.user.id;
        const recipes = await Recipe.findAll({
            where: { userId },
            include: Ingredient
        });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFavorites = async (req, res) => {
    try {
        const userId = req.user.id;
        const recipes = await Recipe.findAll({
            where: { userId, isFavorite: true },
            include: Ingredient
        });
        res.json(recipes);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};