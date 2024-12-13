import React from 'react';
import './RecipeDetail.css';
import '../form/NewRecipeForm.css'; 

const RecipeDetail = ({ recipe, closeModal }) => {
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
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2 className="modal-title">Recipe Detail</h2>
                    <button className="modal-close" onClick={closeModal}>
                        &times;
                    </button>
                </div>
                <div className="modal-body">
                    <div className="recipe-content">
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipeDetail;