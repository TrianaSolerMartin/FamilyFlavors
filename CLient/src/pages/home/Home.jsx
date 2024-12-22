import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllRecipes } from '../../services/RecipeServices';
import FilterBar from '../../components/filterBar/filterBar';
import RecipeGrid from '../../components/recipeGrid/recipeGrid';
import QuickViewModal from '../../components/quickViewModal/quickViewModal';
import Pagination from '../../utils/pagination/pagination';
import LoadingSpinner from '../../utils/loadingSpinner/loadingSpinner';
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
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    useEffect(() => {
        fetchRecipes();
    }, [filters, currentPage]);

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const response = await getAllRecipes({
                ...filters,
                page: currentPage,
                limit: 8
            });
            
            if (response.success) {
                setRecipes(response.data);
                setTotalPages(Math.ceil(response.total / 8));
                setError(null);
            } else {
                setError(response.error);
            }
        } catch (err) {
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
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo(0, 0);
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
            
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <div className="error-message">{error}</div>
            ) : (
                <>
                    <RecipeGrid 
                        recipes={recipes}
                        onRecipeClick={handleRecipeClick}
                        onQuickView={handleQuickView}
                    />
                    
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
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