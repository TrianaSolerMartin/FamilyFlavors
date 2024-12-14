import express from 'express';
import cors from 'cors';
import { WebSocketServer } from 'ws';
import dotenv from 'dotenv';
import connection_db from './database/connection_db.js';
import UserModel from './models/userModel.js';
import RecipeModel from './models/recipeModel.js';
import IngredientModel from './models/ingredientModel.js';
import RecipeIngredient from './models/recipeIngredientModel.js';
import StepModel from './models/stepModel.js';
import recipeRoutes from './routes/recipeRoutes.js';
import ingredientRoutes from './routes/ingredientRoutes.js';
import authRouter from './routes/authRouter.js';
import recipeIngredientRouter from './routes/recipeIngredientRouter.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Initialize models
const models = {
    User: UserModel,
    Recipe: RecipeModel,
    Ingredient: IngredientModel,
    Step: StepModel,
    RecipeIngredient: RecipeIngredient
};

// Setup associations
Object.values(models).forEach(model => {
    if (typeof model.associate === 'function') {
        model.associate(models);
    }
});

// Routes
app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);
app.use('/api/auth', authRouter);
app.use('/api/recipe-ingredients', recipeIngredientRouter);

// Database sync
const syncDatabase = async () => {
    try {
        await connection_db.sync({ alter: true });
        console.log('Database synchronized');
        await connection_db.authenticate();
        console.log('Connection established successfully 👏');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
};

// WebSocket setup
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const wss = new WebSocketServer({ server });
let clients = [];

wss.on('connection', (ws) => {
    console.log('Client connected with WebSocket');
    clients.push(ws);

    ws.on('message', (message) => {
        clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    ws.on('close', () => {
        clients = clients.filter(client => client !== ws);
    });
});

// Initialize database
syncDatabase();

export default app;