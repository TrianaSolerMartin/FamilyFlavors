import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRecipe } from '../../services/RecipeServices';
import './NewRecipeForm.css';

const RecipeForm = () => {
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
    
        // Validate form data
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
    return (
        <form onSubmit={handleSubmit} className="recipe-form">
            <h2>Crear Nueva Receta</h2>
            
            {error && <div className="error-message">{error}</div>}
            
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

            <div className="form-group">
                <label>Imagen URL</label>
                <input
                    type="url"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                />
            </div>

            <div className="form-section">
                <h3>Ingredientes</h3>
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
            </div>

            <div className="form-section">
                <h3>Pasos</h3>
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
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Creando...' : 'Crear Receta'}
            </button>
        </form>
    );
};

export default RecipeForm;