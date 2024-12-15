import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRecipes, toggleFavoriteRecipe } from '../../services/RecipeServices';
import FilterBar from '../../components/filterBar/filterBar';
import RecipeGrid from '../../components/recipeGrid/recipeGrid';
import QuickViewModal from '../../components/quickViewModal/quickViewModal';
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
            const response = await getRecipes({
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
            setError('Failed to load recipes. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        setFilters(prev => ({ ...prev, search: searchTerm }));
        setPage(1);
    };

    const handleFilter = (category) => {
        setFilters(prev => ({ ...prev, category }));
        setPage(1);
    };

    const handleSort = (sortBy) => {
        setFilters(prev => ({ ...prev, sortBy }));
        setPage(1);
    };

    const handleToggleFavorite = async (recipeId) => {
        try {
            const result = await toggleFavoriteRecipe(recipeId);
            if (result.success) {
                setRecipes(prev => 
                    prev.map(recipe => 
                        recipe.id === recipeId 
                            ? { ...recipe, isFavorite: !recipe.isFavorite }
                            : recipe
                    )
                );
            }
        } catch (error) {
            console.error('Failed to toggle favorite:', error);
        }
    };
    const shareRecipe = (recipe) => {
        if (navigator.share) {
            navigator.share({
                title: recipe.title,
                text: recipe.description,
                url: window.location.origin + '/recipe/' + recipe.id
            });
        }
    };

    return (
        <div className="home-container">
            <FilterBar 
                filters={filters} 
                onSearch={handleSearch}
                onFilter={handleFilter}
                onSort={handleSort}
            />
            
            {error && <div className="error">{error}</div>}
            
            <RecipeGrid 
                recipes={recipes}
                onFavorite={handleToggleFavorite}
                onShare={shareRecipe}
                onQuickView={setSelectedRecipe}
            />
            
            {loading && <div className="loading">Loading...</div>}
            
            {selectedRecipe && (
                <QuickViewModal 
                    recipe={selectedRecipe}
                    onClose={() => setSelectedRecipe(null)}
                />
            )}
        </div>
    );
};

export default Home;