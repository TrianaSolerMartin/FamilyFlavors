import React, { useState, useEffect } from 'react';
import { getAllRecipes } from '../../services/RecipeServices';
import './RecipeList.css';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await getAllRecipes();
                if (response.success) {
                    setRecipes(response.data);
                } else {
                    setError('Failed to fetch recipes');
                }
            } catch (err) {
                setError(err.message || 'Error fetching recipes');
            } finally {
                setLoading(false);
            }
        };

        fetchRecipes();
    }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="recipes-container">
      <h2>Nuestras Recetas</h2>
      <div className="recipes-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.image} alt={recipe.title} />
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
            <p>Tiempo de preparación: {recipe.prepTime} minutos</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecipeList;