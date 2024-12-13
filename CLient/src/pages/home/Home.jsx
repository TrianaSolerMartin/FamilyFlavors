import React, { useState, useEffect } from 'react';
import RecipeList from "../../components/recipeList/RecipeList";
import RecipeDetail from "../../components/recipeDetail/RecipeDetail";
import { getAllRecipes } from '../../services/RecipeServices'; 

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                const response = await getAllRecipes();
                if (response.success) {
                    setRecipes(response.data);
                } else {
                    console.error('Error:', response.error);
                    setRecipes([]);
                }
            } catch (error) {
                console.error('Error fetching recipes:', error);
                setRecipes([]);
            }
        };
    
        fetchRecipes();
    }, []);

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedRecipe(null);
    };

    return (
        <div>
            <h1>Home</h1>
            <RecipeList recipes={recipes} onRecipeClick={handleRecipeClick} />
            {isModalOpen && selectedRecipe && (
                <RecipeDetail recipe={selectedRecipe} closeModal={closeModal} />
            )}
        </div>
    );
};

export default Home;