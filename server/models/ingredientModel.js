import { Model, DataTypes } from 'sequelize';
import connection_db from '../database/connection_db.js';

class Ingredient extends Model {
    static associate(models) {
        Ingredient.belongsToMany(models.Recipe, {
            through: models.RecipeIngredient,
            foreignKey: 'ingredientId',
            otherKey: 'recipeId',
            as: 'recipes'
        });
    }
}

Ingredient.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    }
}, {
    sequelize: connection_db,
    modelName: 'Ingredient'
});

export default Ingredient;