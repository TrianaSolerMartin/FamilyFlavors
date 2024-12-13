import { DataTypes } from 'sequelize';
import { sequelize } from '../database/connection_db.js';

const Ingredient = sequelize.define('Ingredient', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Ingredient;
