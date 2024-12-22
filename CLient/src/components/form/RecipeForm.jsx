import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../../services/RecipeServices';
import './NewRecipeForm.css';
import Modal from '../common/Modal';

const RecipeForm = ({ isOpen }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        prepTime: '',
        image: ''
    });
    const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
    const [steps, setSteps] = useState([{ description: '' }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [activeModal, setActiveModal] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleIngredientChange = (index, field, value) => {
        const newIngredients = [...ingredients];
        newIngredients[index][field] = value;
        setIngredients(newIngredients);
    };

    const handleStepChange = (index, value) => {
        const newSteps = [...steps];
        newSteps[index].description = value;
        setSteps(newSteps);
    };

    const addIngredient = () => {
        setIngredients([...ingredients, { name: '', quantity: '' }]);
    };

    const removeIngredient = (index) => {
        setIngredients(ingredients.filter((_, i) => i !== index));
    };

    const addStep = () => {
        setSteps([...steps, { description: '' }]);
    };

    const removeStep = (index) => {
        setSteps(steps.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!formData.title || !formData.description) {
            setError('Title and description are required');
            setLoading(false);
            return;
        }

        try {
            const recipeData = {
                ...formData,
                ingredients: ingredients.filter(ing => ing.name && ing.quantity),
                steps: steps.filter(step => step.description)
            };

            const response = await createRecipe(recipeData);
            if (response.success) {
                navigate('/home');
            } else {
                setError(response.error || 'Error creating recipe');
            }
        } catch (err) {
            setError('Network error creating recipe');
        } finally {
            setLoading(false);
        }
    };

    const handleClose = () => {
        navigate(-1);
    };

    return (
        <div className="modal-overlay">
        <div className="recipe-form">
            <button className="close-btn" onClick={handleClose}> × </button>
            <form onSubmit={handleSubmit} className="recipe-form">
                <h2>Crear Nueva Receta</h2>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="form-main">
                    <div className="form-group">
                        <label>Título</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Descripción</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Tiempo de Preparación (minutos)</label>
                        <input
                            type="number"
                            name="prepTime"
                            value={formData.prepTime}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="form-actions">
                    <button 
                        type="button" 
                        className="action-btn"
                        onClick={() => setActiveModal('ingredients')}
                    >
                        <i className="fas fa-list"></i>
                        <span>Ingredientes ({ingredients.length})</span>
                    </button>

                    <button 
                        type="button" 
                        className="action-btn"
                        onClick={() => setActiveModal('steps')}
                    >
                        <i className="fas fa-tasks"></i>
                        <span>Pasos ({steps.length})</span>
                    </button>

                    <button 
                        type="button" 
                        className="action-btn"
                        onClick={() => setActiveModal('image')}
                    >
                        <i className="fas fa-image"></i>
                        <span>Imagen</span>
                    </button>
                </div>

                <button type="submit" className="submit-btn" disabled={loading}>
                    {loading ? 'Creando...' : 'Crear Receta'}
                </button>


            <Modal 
                isOpen={activeModal === 'ingredients'} 
                onClose={() => setActiveModal(null)}
                title="Ingredientes"
            >
                {ingredients.map((ingredient, index) => (
                    <div key={index} className="ingredient-row">
                        <input
                            type="text"
                            placeholder="Nombre del ingrediente"
                            value={ingredient.name}
                            onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Cantidad"
                            value={ingredient.quantity}
                            onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
                            required
                        />
                        <button 
                            type="button" 
                            onClick={() => removeIngredient(index)}
                            className="remove-btn"
                        >
                            ×
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addIngredient} className="add-btn">
                    + Añadir Ingrediente
                </button>
            </Modal>

            <Modal 
                isOpen={activeModal === 'steps'} 
                onClose={() => setActiveModal(null)}
                title="Pasos"
            >
                {steps.map((step, index) => (
                    <div key={index} className="step-row">
                        <textarea
                            placeholder={`Paso ${index + 1}`}
                            value={step.description}
                            onChange={(e) => handleStepChange(index, e.target.value)}
                            required
                        />
                        <button 
                            type="button" 
                            onClick={() => removeStep(index)}
                            className="remove-btn"
                        >
                            ×
                        </button>
                    </div>
                ))}
                <button type="button" onClick={addStep} className="add-btn">
                    + Añadir Paso
                </button>
            </Modal>

            <Modal 
                isOpen={activeModal === 'image'} 
                onClose={() => setActiveModal(null)}
                title="Imagen"
            >
                <div className="form-group">
                    <input
                        type="url"
                        name="image"
                        placeholder="URL de la imagen"
                        value={formData.image}
                        onChange={handleChange}
                    />
                </div>
            </Modal>
            </form>
        </div>
        </div>
    );
};

export default RecipeForm;