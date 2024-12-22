import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import { DB_DEV_NAME, DB_USER, DB_PASSWORD, DB_HOST } from '../config.js';

dotenv.config();


const connection_db = new Sequelize(DB_DEV_NAME, DB_USER, DB_PASSWORD, {
    host: DB_HOST,
    dialect: 'mysql',
    logging: console.log,
    database: DB_DEV_NAME,
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci'
    }
});

// Validate connection and create database if needed
const initializeDatabase = async () => {
    try {
        // Create database if it doesn't exist
        await connection_db.query(`CREATE DATABASE IF NOT EXISTS ${DB_DEV_NAME};`);
        
        // Use the database
        await connection_db.query(`USE ${DB_DEV_NAME};`);
        
        await connection_db.authenticate();
        console.log('Database connection established successfully');
        
        return true;
    } catch (error) {
        console.error('Unable to connect to database:', error.message);
        return false;
    }
};

export const initModels = (models) => {
    Object.values(models).forEach(model => {
        if (typeof model.associate === 'function') {
            model.associate(models);
        }
    });
};

// Initialize database connection
await initializeDatabase();

export default connection_db;