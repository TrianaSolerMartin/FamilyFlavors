import { DataTypes } from 'sequelize';
import connection_db from "../database/connection_db.js";

const User = connection_db.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default User;
