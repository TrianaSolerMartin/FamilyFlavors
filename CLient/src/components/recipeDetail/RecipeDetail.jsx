import React from 'react';
import './RecipeDetail.css';

const RecipeDetail = ({ recipe, onClose }) => {
    if (!recipe) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{recipe.title}</h2>
                    <button className="close-btn" onClick={onClose}>×</button>
                </div>
                <div className="modal-body">
                    <div className="recipe-image">
                        <img src={recipe.image || '/default-recipe.jpg'} alt={recipe.title} />
                    </div>
                    <div className="recipe-info">
                        <p className="description">{recipe.description}</p>
                        <div className="prep-time">
                            <h3>Tiempo de preparación:</h3>
                            <p>{recipe.prepTime}</p>
                        </div>
                        <div className="ingredients">
                            <h3>Ingredientes:</h3>
                            <ul>
                                {recipe.ingredients?.map((ingredient) => (
                                    <li key={ingredient.id}>
                                        {ingredient.name} - {ingredient.RecipeIngredient?.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="steps">
                            <h3>Pasos:</h3>
                            <ol>
                                {recipe.steps?.map((step) => (
                                    <li key={step.id}>{step.description}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;