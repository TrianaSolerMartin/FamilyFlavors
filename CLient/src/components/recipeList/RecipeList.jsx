import React, { useState, useEffect } from 'react';
import { getRecipes } from '../../services/RecipeServices';
import './RecipeList.css';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await getRecipes();
                setRecipes(response.data);
            } catch (error) {
                console.error('Error fetching recipes:', error);
            }
        };
        fetchRecipes();
    }, []);

    return (
        <div className="recipes-container">
            <h2>Our Family Recipes</h2>
            <div className="recipes-grid">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card">
                        <img 
                            src={recipe.image || '/default-recipe.jpg'} 
                            alt={recipe.title} 
                        />
                        <h3>{recipe.title}</h3>
                        <p>{recipe.description}</p>
                        <p>Prep Time: {recipe.prepTime}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;