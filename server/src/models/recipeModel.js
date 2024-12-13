import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection_db.js';

const Recipe = sequelize.define('Recipe', {
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
