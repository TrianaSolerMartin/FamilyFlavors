import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../services/RecipeServices';

const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState();

    useEffect(() => {
        const fetchRecipeDetailed = async () => {
            const detailedRecipe = await getRecipeById(id);
            setRecipe(detailedRecipe);
        }; 
        fetchRecipeDetailed();
    }, [id]);

    return (
        <div>
            <h1>Recipe Detail</h1>
            <div>
                {recipe && (
                    <>
                        <h2>{recipe.name}</h2>
                        <p>{recipe.description}</p>
                        <p>{recipe.ingredients}</p>
                        <p>{recipe.instructions}</p>
                    </>
                )}
            </div>
        </div>
    )
}

export default RecipeDetail;
