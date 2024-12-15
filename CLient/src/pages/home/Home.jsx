import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRecipes } from '../../services/RecipeServices';
import FilterBar from '../../components/filterBar/filterBar';
import RecipeGrid from '../../components/recipeGrid/recipeGrid';
import QuickViewModal from '../../components/quickViewModal/quickViewModal';
import debounce from '../../utils/debounce';
import './Home.css';

const Home = () => {
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        category: 'all',
        sortBy: 'newest',
        search: ''
    });
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecipes();
    }, [filters, page]);

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const response = await getAllRecipes({
                ...filters,
                page,
                limit: 8
            });
            
            if (page === 1) {
                setRecipes(response.data);
            } else {
                setRecipes(prev => [...prev, ...response.data]);
            }
            
            setHasMore(response.data.length === 8);
            setError(null);
        } catch (err) {
            console.error('Error fetching recipes:', err);
            setError('Failed to load recipes');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = debounce((searchTerm) => {
        setFilters(prev => ({ ...prev, search: searchTerm }));
        setPage(1);
        setRecipes([]);
    }, 300);

    const handleFilter = (category) => {
        setFilters(prev => ({ ...prev, category }));
        setPage(1);
        setRecipes([]);
    };

    const handleSort = (sortBy) => {
        setFilters(prev => ({ ...prev, sortBy }));
        setPage(1);
        setRecipes([]);
    };

    const handleQuickView = (recipe) => {
        setSelectedRecipe(recipe);
    };

    const handleRecipeClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };

    return (
        <div className="home-container">
            <header className="home-header">
                <h1>Our Recipes</h1>
                <button 
                    className="add-recipe-btn"
                    onClick={() => navigate('/create-recipe')}
                >
                    <i className="fas fa-plus"></i>
                    Add Recipe
                </button>
            </header>

            <FilterBar 
                filters={filters} 
                onSearch={handleSearch}
                onFilter={handleFilter}
                onSort={handleSort}
            />
            
            {error && (
                <div className="error-message">
                    <i className="fas fa-exclamation-circle"></i>
                    {error}
                </div>
            )}
            
            <RecipeGrid 
                recipes={recipes}
                onRecipeClick={handleRecipeClick}
                onQuickView={handleQuickView}
            />
            
            {loading && (
                <div className="loading">
                    <i className="fas fa-spinner fa-spin"></i>
                    Loading...
                </div>
            )}
            
            {selectedRecipe && (
                <QuickViewModal 
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                    onViewFull={() => handleRecipeClick(selectedRecipe.id)}
                />
            )}
        </div>
    );
};

export default Home;