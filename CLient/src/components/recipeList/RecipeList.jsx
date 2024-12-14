import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getRecipes } from '../../services/RecipeServices';
import './RecipeList.css';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await getRecipes();
                if (response.success) {
                    setRecipes(response.data);
                } else {
                    setError(response.error);
                }
            } catch (err) {
                setError('Error fetching recipes');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="recipes-container">
            <h2>Our Recipes</h2>
            <div className="recipes-grid">
                {recipes.map(recipe => (
                    <div key={recipe.id} className="recipe-card">
                        <img 
                            src={recipe.image || '/default-recipe.jpg'} 
                            alt={recipe.title} 
                        />
                        <div className="recipe-content">
                            <h3>{recipe.title}</h3>
                            <p>{recipe.description}</p>
                            <span>Prep Time: {recipe.prepTime} mins</span>
                            <Link to={`/recipe/${recipe.id}`} className="view-recipe">
                                View Recipe
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;