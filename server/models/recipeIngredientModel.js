import { DataTypes } from 'sequelize';
import connection_db from "../database/connection_db.js";

const RecipeIngredient = connection_db.define('RecipeIngredient', {
    quantity: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

export default RecipeIngredient;