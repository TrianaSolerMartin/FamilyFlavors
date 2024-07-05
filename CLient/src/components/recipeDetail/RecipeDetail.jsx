import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getRecipeById } from '../../services/RecipeServices';
import './RecipeDetail.css';

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


    const handleShare = (platform) => {
        switch (platform) {
            case 'instagram':
                window.open(`https://www.instagram.com/?hl=es${encodeURIComponent(`Check out this recipe: ${recipe.name}. More details at ${window.location.href}`)}`, '_blank');
                break;
            case 'facebook':
                window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}&quote=${encodeURIComponent(`Check out this recipe: ${recipe.name}. More details at ${window.location.href}`)}`, '_blank');
                break;
            case 'whatsapp':
                window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this recipe: ${recipe.name}. More details at ${window.location.href}`)}`, '_blank');
                break;
            default:
                break;
        }
    };

    return (
        <div className="recipe-detail">
            <h1>Recipe Detail</h1>
            <div className="recipe-content">
                {recipe && (
                    <>
                        <div className="recipe-text">
                            <h2>{recipe.name}</h2>
                            <p>{recipe.description}</p>
                            <p><strong>Ingredients:</strong> {recipe.ingredients}</p>
                            <p><strong>Instructions:</strong> {recipe.instructions}</p>
                            <div className="share-buttons">
                                <button className="instagram" onClick={() => handleShare('instagram')}>
                                    <i className="fab fa-instagram"></i> Share on Instagram
                                </button>
                                <button className="facebook" onClick={() => handleShare('facebook')}>
                                    <i className="fab fa-facebook"></i> Share on Facebook
                                </button>
                                <button className="whatsapp" onClick={() => handleShare('whatsapp')}>
                                    <i className="fab fa-whatsapp"></i> Share on WhatsApp
                                </button>
                            </div>
                        </div>
                        <div className="recipe-image">
                            <img src={recipe.image} alt={recipe.name} />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default RecipeDetail;
