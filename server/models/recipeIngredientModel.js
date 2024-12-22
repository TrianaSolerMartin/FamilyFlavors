import { Model, DataTypes } from 'sequelize';
import connection_db from '../database/connection_db.js';

class RecipeIngredient extends Model {}

RecipeIngredient.init({
    recipeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Recipes',
            key: 'id'
        }
    },
    ingredientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Ingredients',
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: connection_db,
    modelName: 'RecipeIngredient',
    tableName: 'RecipeIngredients',
    indexes: [
        {
            unique: true,
            fields: ['recipeId', 'ingredientId']
        }
    ]
});

export default RecipeIngredient;