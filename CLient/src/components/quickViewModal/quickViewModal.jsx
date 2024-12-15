import React from 'react';
import './QuickViewModal.css';

const QuickViewModal = ({ recipe, onClose }) => {
    return (
        <div className="quick-view-overlay" onClick={onClose}>
            <div className="quick-view-content" onClick={e => e.stopPropagation()}>
                <button className="close-btn" onClick={onClose}>
                    <i className="fas fa-times"></i>
                </button>
                
                <div className="quick-view-image">
                    <img src={recipe.image} alt={recipe.title} />
                </div>
                
                <div className="quick-view-info">
                    <h2>{recipe.title}</h2>
                    <p className="description">{recipe.description}</p>
                    
                    <div className="recipe-details">
                        <span><i className="far fa-clock"></i> {recipe.cookTime} min</span>
                        <span><i className="fas fa-utensils"></i> {recipe.difficulty}</span>
                        <span><i className="fas fa-users"></i> {recipe.servings} servings</span>
                    </div>
                    
                    <button className="view-full-btn">
                        View Full Recipe
                    </button>
                </div>
            </div>
        </div>
    );
};

export default QuickViewModal;