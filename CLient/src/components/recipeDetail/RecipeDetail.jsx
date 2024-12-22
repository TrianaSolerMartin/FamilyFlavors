import React from 'react';
import Swal from 'sweetalert2';
import { shareRecipe } from '../../utils/shareRecipe';
import PropTypes from 'prop-types';
import './RecipeDetail.css';

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
                        <input type="radio" id="facebook" name="platform" value="facebook">
                        <label for="facebook">
                            <i class="fab fa-facebook"></i> Facebook
                        </label>
                    </div>
<div class="share-option">
    <input type="radio" id="x" name="platform" value="x">
    <label for="x">
        <i class="fab fa-x-twitter"></i> X (Twitter)
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
            preConfirm: () => {
                const selectedOption = document.querySelector('input[name="platform"]:checked');
                return selectedOption ? selectedOption.value : null;
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
                    <div className="header-content">
                        <h2>{recipe.title}</h2>
                        <div className="recipe-meta">
                            <span><i className="far fa-clock"></i> {recipe.prepTime}</span>
                            <span><i className="fas fa-utensils"></i> {recipe.servings} porciones</span>
                        </div>
                    </div>
                    <div className="header-actions">

                        <button className="close-btn" onClick={onClose}>×</button>
                    </div>
                </div>

                <div className="modal-body">
                    <div className="recipe-image">
                        <img src={recipe.image || '/default-recipe.jpg'} alt={recipe.title} />
                    </div>
                    <div className="recipe-details">
                        <div className="recipe-description">
                            <p>{recipe.description}</p>
                        </div>
                        <div className="recipe-sections">
                            <div className="ingredients-section">
                                <h3>Ingredientes</h3>
                                <ul>
                                    {recipe.ingredients?.map((ingredient) => (
                                        <li key={ingredient.id}>
                                            <span className="quantity">{ingredient.RecipeIngredient?.quantity}</span>
                                            <span className="ingredient">{ingredient.name}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="steps-section">
                                <h3>Preparación</h3>
                                <ol>
                                    {recipe.steps?.map((step, index) => (
                                        <li key={index}>{step.description}</li>
                                    ))}
                                </ol>
                            </div>
                            <div className="button-actions-section">
                            <button className="action-btn share" onClick={handleShare}>
                            <i className="fas fa-share-alt"></i>
                        </button>
                        </div>
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
        servings: PropTypes.number,
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
