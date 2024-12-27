import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllRecipes, toggleFavorite } from '../../services/RecipeServices';
import './RecipeList.css';

const RecipeList = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchRecipes();
    }, []);

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const response = await getAllRecipes();
            console.log('Recipes loaded:', response.data);
            setRecipes(response.data);
        } catch (error) {
            setError('Error al cargar las recetas');
            console.error('Error:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleImageError = (e) => {
        console.log('Image load failed:', e.target.src);
        e.target.src = '/default-recipe.jpg';
    };

    const getImageUrl = (image) => {
        if (!image) return '/default-recipe.jpg';
        return image.startsWith('http') ? image : '/default-recipe.jpg';
    };

    const handleFavorite = async (e, recipeId) => {
        e.preventDefault();
        e.stopPropagation();
        try {
            setRecipes(prev => prev.map(recipe => 
                recipe.id === recipeId 
                    ? {...recipe, isFavorite: !recipe.isFavorite}
                    : recipe
            ));
            await toggleFavorite(recipeId);
        } catch (error) {
            console.error('Error toggling favorite:', error);
            await fetchRecipes();
        }
    };

    if (loading) return <div className="loading">Cargando recetas...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="recipes-container">
            <h2>Recetas Familiares</h2>
            <div className="recipes-grid">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="recipe-card-wrapper">
                        <button 
                            onClick={(e) => handleFavorite(e, recipe.id)}
                            className={`favorite-btn ${recipe.isFavorite ? 'active' : ''}`}
                        >
                            <i className={`fas fa-heart ${recipe.isFavorite ? 'active' : ''}`}></i>
                        </button>
                        <Link to={`/recipes/${recipe.id}`} className="recipe-link">
                            <div className="recipe-card">
                                <div className="recipe-image-container">
                                    <img 
                                        src={getImageUrl(recipe.image)}
                                        alt={recipe.title}
                                        onError={handleImageError}
                                        className="recipe-image"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="recipe-content">
                                    <h3>{recipe.title}</h3>
                                    <p>{recipe.description}</p>
                                    <p>Tiempo: {recipe.prepTime} min</p>
                                </div>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RecipeList;