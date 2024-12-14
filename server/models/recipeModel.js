// Purpose: Recipe model definition and associations
import { Model, DataTypes } from 'sequelize';
import connection_db from '../database/connection_db.js';

class Recipe extends Model {
    static associate(models) {
        Recipe.belongsToMany(models.Ingredient, {
            through: models.RecipeIngredient,
            foreignKey: 'recipeId',
            otherKey: 'ingredientId',
            as: 'ingredients'
        });

        Recipe.hasMany(models.Step, {
            foreignKey: 'recipeId',
            as: 'steps'
        });

        Recipe.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'author'
        });
    }
}

Recipe.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [3, 100]
        }
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    prepTime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    image: {
        type: DataTypes.STRING
    },
    userId: {
        type: DataTypes.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        }
    }
}, {
    sequelize: connection_db,
    modelName: 'Recipe',
    tableName: 'Recipes'
});

export default Recipe;