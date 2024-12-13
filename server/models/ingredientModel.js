import { DataTypes } from 'sequelize';
import connection_db from "../database/connection_db.js";

const Ingredient = connection_db.define('Ingredient', {
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
});

export default Ingredient;