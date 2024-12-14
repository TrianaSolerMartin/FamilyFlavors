import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { addRecipe } from '../../services/RecipeServices';
import './NewRecipeForm.css';

const RecipeForm = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [imageURL, setImageURL] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      data.image = imageURL;
      const response = await addRecipe(data);

      if (response.success) {
        alert('¡Receta añadida correctamente!');
        navigate('/home');
      } else {
        alert(response.error);
      }
    } catch (err) {
      console.error("Error adding recipe:", err);
    }
  };

  return (
    <div className="form-container">
      <h2>Añadir Nueva Receta</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="form">
        <div className="form-group">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            {...register('title', { required: true })}
            className="form-control"
          />
          {errors.title && <span className="error">Este campo es requerido</span>}
        </div>

        <div className="form-group">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            {...register('description', { required: true })}
            className="form-control"
          />
          {errors.description && <span className="error">Este campo es requerido</span>}
        </div>

        <div className="form-group">
          <label htmlFor="image">URL de Imagen</label>
          <input
            type="text"
            id="image"
            value={imageURL}
            onChange={(e) => setImageURL(e.target.value)}
            className="form-control"
          />
        </div>

        <div className="form-buttons">
          <button type="submit" className="btn btn-primary">Guardar</button>
          <button type="button" onClick={() => navigate('/home')} className="btn btn-secondary">
            Cancelar
          </button>
        </div>
      </form>
    </div>
  );
};

export default RecipeForm;