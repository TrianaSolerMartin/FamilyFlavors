import React from 'react';
import './RecipeGrid.css';

const RecipeGrid = ({ recipes, onFavorite, onShare, onQuickView }) => {
    if (!recipes.length) {
        return (
            <div className="empty-state">
                <i className="fas fa-cookie-bite"></i>
                <p>No recipes found</p>
            </div>
        );
    }

    return (
        <div className="recipes-grid">
            {recipes.map(recipe => (
                <div key={recipe.id} className="recipe-card">
                    <div className="recipe-image-container">
                        <img src={recipe.image || '/default-recipe.jpg'} alt={recipe.title} />
                        <div className="recipe-actions">
                            <button 
                                onClick={() => onFavorite(recipe.id)}
                                className={`action-btn ${recipe.isFavorite ? 'favorite' : ''}`}
                            >
                                <i className={`fas fa-heart ${recipe.isFavorite ? 'active' : ''}`}></i>
                            </button>
                            <button onClick={() => onShare(recipe)} className="action-btn">
                                <i className="fas fa-share-alt"></i>
                            </button>
                            <button onClick={() => onShare(recipe)} className="action-btn">
        <i className="fas fa-share-alt"></i>
    </button>
                        </div>
                    </div>
                    <div className="recipe-content">
                        <h3>{recipe.title}</h3>
                        <p>{recipe.description}</p>
                        <div className="recipe-meta">
                            <span><i className="far fa-clock"></i> {recipe.prepTime} min</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default RecipeGrid;