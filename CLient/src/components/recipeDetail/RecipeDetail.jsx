import React from 'react';

const RecipeDetail = ({ recipe }) => {
    if (!recipe) return null;

    return (
        <div className="recipe-detail">
            <h2>{recipe.title}</h2>
            <p>{recipe.description}</p>
            <div className="ingredients">
                <h3>Ingredients</h3>
                <ul>
                    {recipe.ingredients?.map((ingredient) => (
                        <li key={ingredient.id}>
                            {ingredient.name} - {ingredient.RecipeIngredient.quantity}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="steps">
                <h3>Steps</h3>
                <ol>
                    {recipe.steps?.map((step) => (
                        <li key={step.id}>{step.description}</li>
                    ))}
                </ol>
            </div>
        </div>
    );
};

export default RecipeDetail;