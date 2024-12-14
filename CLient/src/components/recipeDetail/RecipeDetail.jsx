import React from 'react';
import Swal from 'sweetalert2';
import './RecipeDetail.css';
import PropTypes from 'prop-types';
import { shareRecipe } from '../../utils/shareRecipe';


const RecipeDetail = ({ recipe, onClose }) => {
    if (!recipe) return null;

    const handleShare = async () => {
        const { value: shareOption } = await Swal.fire({
            title: 'Compartir Receta',
            html: `
                <div class="share-options">
                    <div class="share-option">
                        <input type="radio" id="whatsapp" name="platform" value="whatsapp">
                        <label for="whatsapp">
                            <i class="fab fa-whatsapp"></i> WhatsApp
                        </label>
                    </div>
                    <div class="share-option">
                        <input type="radio" id="email" name="platform" value="email">
                        <label for="email">
                            <i class="far fa-envelope"></i> Email
                        </label>
                    </div>
                    <div class="share-option">
                        <input type="radio" id="copy" name="platform" value="copy">
                        <label for="copy">
                            <i class="far fa-copy"></i> Copiar Link
                        </label>
                    </div>
                </div>
            `,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonText: 'Compartir',
            customClass: {
                container: 'share-modal',
                popup: 'share-popup'
            }
        });

        if (shareOption) {
            await shareRecipe(recipe, shareOption);
        }
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    <h2>{recipe.title}</h2>
                    <div className="header-actions">
                        <button className="action-btn share" onClick={handleShare}>
                            <i className="fas fa-share-alt"></i> Compartir
                        </button>
                        <button className="close-btn" onClick={onClose}>×</button>
                    </div>
                </div>
                <div className="modal-body">
                    <div className="recipe-image">
                        <img src={recipe.image || '/default-recipe.jpg'} alt={recipe.title} />
                    </div>
                    <div className="recipe-info">
                        <p className="description">{recipe.description}</p>
                        <div className="prep-time">
                            <h3>Tiempo de preparación:</h3>
                            <p>{recipe.prepTime}</p>
                        </div>
                        <div className="ingredients">
                            <h3>Ingredientes:</h3>
                            <ul>
                                {recipe.ingredients?.map((ingredient) => (
                                    <li key={ingredient.id}>
                                        {ingredient.name} - {ingredient.RecipeIngredient?.quantity}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="steps">
                            <h3>Pasos:</h3>
                            <ol>
                                {recipe.steps?.map((step) => (
                                    <li key={step.id}>{step.description}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
RecipeDetail.propTypes = {
    recipe: PropTypes.shape({
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        prepTime: PropTypes.string,
        ingredients: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                name: PropTypes.string,
                RecipeIngredient: PropTypes.shape({
                    quantity: PropTypes.string,
                }),
            })
        ),
        steps: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.number,
                description: PropTypes.string,
            })
        ),
    }),
    onClose: PropTypes.func.isRequired,
};

export default RecipeDetail;
