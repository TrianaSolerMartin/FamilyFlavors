import React, { useState, useEffect } from 'react';
import RecipeList from "../../components/RecipeList";
import { getAllRecipes } from '../../services/RecipeServices'; // Importa la función para obtener recetas

const Home = () => {
    const [recipes, setRecipes] = useState([]);
  
    useEffect(() => {
      const fetchRecipes = async () => {
        try {
          const recipesData = await getAllRecipes(); // Obtén todas las recetas
          setRecipes(recipesData); // Establece las recetas en el estado local
        } catch (error) {
          console.error('Error fetching recipes:', error);
          // Maneja errores según sea necesario
        }
      };
  
      fetchRecipes(); // Llama a la función de obtención de recetas al cargar el componente
    }, []);
  
    return (
      <div>
        <h1>Home</h1>
        <RecipeList recipes={recipes} /> {/* Pasa las recetas obtenidas como prop a RecipeList */}
      </div>
    );
  };
  
  export default Home;