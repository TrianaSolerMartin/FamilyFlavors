import { DataTypes } from 'sequelize';
import connection_db from "../database/connection_db.js";
import UserModel from './userModel.js';
import IngredientModel from './ingredientModel.js';
import RecipeIngredient from './recipeIngredientModel.js';

const Recipe = connection_db.define('Recipe', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    },
    instructions: {
        type: DataTypes.TEXT,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
});

// Associations
Recipe.belongsTo(UserModel, {
    foreignKey: 'userId',
    as: 'author'
});
UserModel.hasMany(Recipe, { as: 'recipes', foreignKey: 'userId' });

Recipe.belongsToMany(IngredientModel, {
    through: RecipeIngredient,
    foreignKey: 'recipeId',
    as: 'ingredients'
});

IngredientModel.belongsToMany(Recipe, {
    through: RecipeIngredient,
    foreignKey: 'ingredientId',
    as: 'recipes'
});

export default Recipe;