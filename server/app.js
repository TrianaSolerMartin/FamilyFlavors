import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import connection_db from './database/connection_db.js';
import UserModel from './models/userModel.js';
import RecipeModel from './models/recipeModel.js';
import IngredientModel from './models/ingredientModel.js';
import RecipeIngredient from './models/recipeIngredientModel.js';
import recipeRoutes from './routes/recipeRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';
import authRouter from './routes/authRouter.js';
import recipeIngredientRouter from './routes/recipeIngredientRouter.js';

const { DB_PORT } = process.env;
dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/auth', authRouter);
app.use('/api/recipe-ingredients', recipeIngredientRouter);

const server = app.listen(DB_PORT, () => {
    console.log(`Server is running on port ${DB_PORT}`);
});

const wss = new WebSocketServer({ server });

let clients = [];

wss.on('connection', (ws) => {
    console.log('Client connected with WebSocket');
    clients.push(ws);

    ws.on('message', (message) => {
        console.log(`Received message: ${message} server`);
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        console.log('Client disconnected from WebSocket');
        clients = clients.filter(client => client !== ws);
    });
});

const syncDatabase = async () => {
    try {
        await connection_db.authenticate();
        console.log('Connection has been established successfully.👏👏');

        await UserModel.sync({ alter: true });
        console.log('UserModel connected correctly 👤👤');

        await RecipeModel.sync({ alter: true });
        console.log('RecipeModel connected correctly 📋');

        await IngredientModel.sync({ alter: true });
        console.log('IngredientModel connected correctly 📋');

        await RecipeIngredient.sync({ alter: true });
        console.log('RecipeIngredient connected correctly 🔗');

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

syncDatabase();

export default app;