import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createRecipe } from "../../services/RecipeServices";
import "./NewRecipeForm.css";
import imageCompression from "browser-image-compression";

// Move constants to top
const MAX_PREP_TIME = 999;

const RecipeForm = () => {
  const navigate = useNavigate();

  // Update initial state with defaults
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    prepTime: "1", 
    image: null,
    isFavorite: false,
  });

  const [ingredients, setIngredients] = useState([{ name: "", quantity: "" }]);
  const [steps, setSteps] = useState([{ description: "" }]);
  const [loading, setLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState("");
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'prepTime') {
      const numValue = parseInt(value) || 1;
      setFormData(prev => ({
        ...prev,
        [name]: Math.max(1, Math.min(numValue, MAX_PREP_TIME)).toString()
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
    
  // Keep rest of the existing handlers
  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...ingredients];
    updatedIngredients[index][field] = value;
    setIngredients(updatedIngredients);
  };

  const handleStepChange = (index, value) => {
    const updatedSteps = [...steps];
    updatedSteps[index].description = value;
    setSteps(updatedSteps);
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: "" }]);
  };

  const removeIngredient = (index) => {
    if (ingredients.length > 1) {
      setIngredients(ingredients.filter((_, i) => i !== index));
    }
  };

  const addStep = () => {
    setSteps([...steps, { description: "" }]);
  };

  const removeStep = (index) => {
    if (steps.length > 1) {
      setSteps(steps.filter((_, i) => i !== index));
    }
  };

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);
    return compressedFile;
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    try {
      // Validate file size
      if (file.size > 5000000) {
        setError("La imagen no debe superar los 5MB");
        return;
      }
  
      // Compress image
      const compressedFile = await compressImage(file);
      
      // Set file object directly
      setFormData(prev => ({
        ...prev,
        image: compressedFile 
      }));
  
      // Show preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(compressedFile);
  
    } catch (error) {
      console.error('Error processing image:', error);
      setError("Error al procesar la imagen");
    }
  }; 

  const sanitizeInput = (str) => {
    return str.replace(/[<>]/g, "").trim();
  };

  const validateForm = () => {
    if (!formData.title) return "El título es requerido";
    if (!formData.description) return "La descripción es requerida";

    const prepTime = Number(formData.prepTime);

    if (isNaN(prepTime) || prepTime <= 0 || prepTime > MAX_PREP_TIME) {
      return `El tiempo de preparación debe ser entre 1 y ${MAX_PREP_TIME}`;
    }

    if (!ingredients.some((ing) => ing.name && ing.quantity)) {
      return "Agregue al menos un ingrediente";
    }

    if (!steps.some((step) => step.description)) {
      return "Agregue al menos un paso";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
  
    if (validationError) {
      setError(validationError);
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const recipeData = {
        title: sanitizeInput(formData.title),
        description: sanitizeInput(formData.description),
        prepTime: Number(formData.prepTime),
        image: formData.image, 
        isFavorite: Boolean(formData.isFavorite),
        ingredients: ingredients
          .filter((ing) => ing.name && ing.quantity)
          .map((ing) => ({
            name: sanitizeInput(ing.name),
            quantity: sanitizeInput(ing.quantity),
          })),
        instructions: steps
          .filter((step) => step.description)
          .map((step) => sanitizeInput(step.description))
          .join("\n"),
      };
  
      await createRecipe(recipeData);
      navigate("/recipes");
    } catch (error) {
      setError(error.message || "Error al crear receta");
      console.error("Error al crear receta:", error);
    } finally {
      setLoading(false);
    }
  };

  return (

    <div className="modal-overlay">
      <div className="recipe-form">
        <h2>Nueva Receta</h2>
        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit} className={loading ? "form-loading" : ""}>
          <div className="form-section">
            <div className="form-group">
              <label htmlFor="title">Título *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Descripción *</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="prepTime">Tiempo (min) *</label>
                <input
    type="number"
    name="prepTime"
    value={formData.prepTime}
    onChange={handleChange}
    min="1"
    max={MAX_PREP_TIME}
    required
/>
              </div>
            </div>
            <div className="form-group">
  <label htmlFor="image">Imagen</label>
  <input
    type="file"
    id="image"
    name="image"
    accept="image/*"
    onChange={handleImageChange}
  />
  {loading && formData.image && (
    <div className="upload-progress">
      <div className="upload-progress-bar" />
      <span>Subiendo imagen...</span>
    </div>
  )}
  {imagePreview && (
    <div className="image-preview">
      <img src={imagePreview} alt="Vista previa" />
      <button 
        type="button" 
        className="remove-image"
        onClick={() => {
          setFormData(prev => ({...prev, image: null}));
          setImagePreview("");
        }}
      >
        Eliminar imagen
      </button>
    </div>
  )}
</div>
          </div>

          <div className="form-section">
            <h3>Ingredientes *</h3>
            {ingredients.map((ingredient, index) => (
              <div key={index} className="ingredient-row">
                <input
                  type="text"
                  placeholder="Nombre del ingrediente"
                  value={ingredient.name}
                  onChange={(e) =>
                    handleIngredientChange(index, "name", e.target.value)
                  }
                  required
                />
                <input
                  type="text"
                  placeholder="Cantidad"
                  value={ingredient.quantity}
                  onChange={(e) =>
                    handleIngredientChange(index, "quantity", e.target.value)
                  }
                  required
                />
                {ingredients.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeIngredient(index)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addIngredient} className="add-btn">
              + Agregar Ingrediente
            </button>
          </div>

          <div className="form-section">
            <h3>Instrucciones *</h3>
            {steps.map((step, index) => (
              <div key={index} className="step-row">
                <textarea
                  placeholder={`Paso ${index + 1}`}
                  value={step.description}
                  onChange={(e) => handleStepChange(index, e.target.value)}
                  required
                />
                {steps.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeStep(index)}
                    className="remove-btn"
                  >
                    ×
                  </button>
                )}
              </div>
            ))}
            <button type="button" onClick={addStep} className="add-btn">
              + Agregar Paso
            </button>
          </div>

          <div className="form-actions">
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? "Guardando..." : "Guardar Receta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;