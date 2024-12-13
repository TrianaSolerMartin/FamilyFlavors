import { DataTypes } from 'sequelize';
import connection_db from "../database/connection_db.js";
import Recipe from './recipeModel.js';
import Ingredient from './ingredientModel.js';

const RecipeIngredient = connection_db.define('RecipeIngredient', {
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

Recipe.belongsToMany(Ingredient, { through: RecipeIngredient });
Ingredient.belongsToMany(Recipe, { through: RecipeIngredient });

export default RecipeIngredient;