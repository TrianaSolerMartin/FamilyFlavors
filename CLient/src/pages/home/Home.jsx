import { useState, useEffect } from 'react';
import { getRecipes } from '../../services/RecipeServices';
import RecipeForm from '../../components/form/RecipeForm';
import RecipeDetail from '../../components/recipeDetail/RecipeDetail';
import './Home.css';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const [selectedRecipe, setSelectedRecipe] = useState(null); 

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const response = await getRecipes();
            if (response.success) {
                setRecipes(response.data || []);
            } else {
                setError(response.error);
            }
        } catch (error) {
            setError('Error fetching recipes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, []);

    const handleAddRecipe = () => {
        setShowAddForm(true);
    };

    const handleRecipeClick = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleCloseDetail = () => {
        setSelectedRecipe(null);
    };

    const handleCloseForm = () => {
        setShowAddForm(false);
        fetchRecipes();
    };

    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Mis Recetas</h1>
                <button className="add-recipe-btn" onClick={handleAddRecipe}>
                    Añadir Receta
                </button>
            </header>

            {!loading && recipes.length > 0 && (
                <div className="recipes-grid">
                    {recipes.map((recipe) => (
                        <div 
                            key={recipe.id} 
                            className="recipe-card" 
                            onClick={() => handleRecipeClick(recipe)}
                        >
                            <img 
                                src={recipe.image || '/default-recipe.jpg'} 
                                alt={recipe.title}
                                className="recipe-image" 
                            />
                            <div className="recipe-content">
                                <h3>{recipe.title}</h3>
                                <p>{recipe.description}</p>
                                <span className="recipe-time">{recipe.prepTime}</span>
                            </div>
                        </div>
                    ))}
                </div>
            )}

{selectedRecipe && (
                <RecipeDetail 
                    recipe={selectedRecipe} 
                    onClose={handleCloseDetail}
                />
            )}

            {showAddForm && (
                <RecipeForm onClose={handleCloseForm} />
            )}
        </div>
    );
};

export default Home;