const express = require('express');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipeRoutes');
const ingredientRoutes = require('./routes/ingredientRoutes');
const db = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

db.connect();

app.use('/api/recipes', recipeRoutes);
app.use('/api/ingredients', ingredientRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});