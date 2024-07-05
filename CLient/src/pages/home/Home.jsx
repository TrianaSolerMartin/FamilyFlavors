import React, { useState, useEffect } from 'react';
import RecipeList from "../../components/recipeList/RecipeList";
import { getAllRecipes } from '../../services/RecipeServices'; // Importa la función para obtener recetas

const Home = () => {
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const recipesData = await getAllRecipes(); // Obtén todas las recetas
          setRecipes(recipesData);
        } catch (error) {
          console.error('Error fetching recipes:', error);
        }
      };
  
      fetchRecipes(); 
    }, []);
  
    return (
      <div>
        <h1>Home</h1>
        <RecipeList recipes={recipes} />
      </div>
    );
  };
  
  export default Home;