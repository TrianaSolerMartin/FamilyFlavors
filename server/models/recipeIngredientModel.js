import { Model, DataTypes } from 'sequelize';
import connection_db from "../database/connection_db.js";

class RecipeIngredient extends Model {
    static associate(models) {
        // Define belongs to relationships
        RecipeIngredient.belongsTo(models.Recipe, {
            foreignKey: 'recipeId'
        });
        RecipeIngredient.belongsTo(models.Ingredient, {
            foreignKey: 'ingredientId'
        });
    }
}

RecipeIngredient.init({
    recipeId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Recipes',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    ingredientId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        references: {
            model: 'Ingredients',
            key: 'id'
        },
        onDelete: 'CASCADE'
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
    sequelize: connection_db,
    modelName: 'RecipeIngredient',
    tableName: 'RecipeIngredients',
    timestamps: true
});

export default RecipeIngredient;