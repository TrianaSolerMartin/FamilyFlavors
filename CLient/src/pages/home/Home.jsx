import { useState, useEffect } from 'react';
import { getRecipes } from '../../services/RecipeServices';
import RecipeForm from '../../components/form/RecipeForm';
import RecipeCard from '../../components/recipeDetail/RecipeDetail';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showAddForm, setShowAddForm] = useState(false);

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

            {!loading && recipes.length === 0 && !showAddForm && (
                <div className="no-recipes">
                    <h2>No hay recetas todavía</h2>
                    <button onClick={handleAddRecipe}>
                        Añadir Primera Receta
                    </button>
                </div>
            )}

            {showAddForm && (
                <RecipeForm onClose={handleCloseForm} />
            )}

            {!loading && recipes.length > 0 && (
                <div className="recipes-grid">
                    {recipes.map(recipe => (
                        <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;