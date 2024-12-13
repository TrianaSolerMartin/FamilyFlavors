import { DataTypes } from 'sequelize';
import connection_db from "../database/connection_db.js";

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
});

export default Recipe;