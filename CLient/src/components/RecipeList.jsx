import React from 'react';
import { Link } from 'react-router-dom';

const RecipeList = ({ recipes }) => {
  if (!recipes || recipes.length === 0) {
    return <p>No recipes found.</p>;
  }

  return (
    <div>
      <h1>Recipes</h1>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link to={`/recipe/${recipe.id}`}>
              {recipe.name} - {recipe.description.slice(0, 20)}...
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecipeList;
