import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addRecipe } from '../../services/RecipeServices';
import './NewRecipeForm.css';

const RecipeForm = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [imageURL, setImageURL] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  const onSubmit = async (data) => {
    try {
      data.image = imageURL;

      const { success, error, recipeId } = await addRecipe(data);

      if (success) {
        alert('¡La receta fue añadida correctamente!');
        reset();
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 1500);

        // Establecer la URL de redirección
        setRedirectUrl(`/recipe/${recipeId}`);
      } else {
        alert(error);
      }
    } catch (error) {
      console.error("Error al añadir la receta:", error);
      alert('Error al añadir la receta. Por favor, intenta nuevamente.');
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'Presents_react');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dlg7gpmha/image/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Error al subir la imagen a Cloudinary');
      }

      const data = await response.json();
      setImageURL(data.secure_url);
    } catch (error) {
      console.error('Error al subir la imagen a Cloudinary:', error);
      alert('Error al subir la imagen a Cloudinary. Por favor, intenta nuevamente.');
    }
  };

  // Redireccionar después de que redirectUrl tenga una URL válida
  if (redirectUrl) {
    window.location.href = redirectUrl;
  }

  return (
    <div className="form-popup">
      <div className="form-container">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label>Título</label>
            <input type="text" {...register('title', { required: true })} />
            {errors.title && <p className="error-message">El campo título es requerido</p>}
          </div>
          <div>
            <label>Descripción</label>
            <textarea {...register('description', { required: true })}></textarea>
            {errors.description && <p className="error-message">El campo descripción es requerido</p>}
          </div>
          <div>
            <label>Ingredientes</label>
            <textarea {...register('ingredients', { required: true })}></textarea>
            {errors.ingredients && <p className="error-message">El campo ingredientes es requerido</p>}
          </div>
          <div>
            <label>Instrucciones</label>
            <textarea {...register('instructions', { required: true })}></textarea>
            {errors.instructions && <p className="error-message">El campo instrucciones es requerido</p>}
          </div>
          <div>
            <label>Imagen</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
            />
            {imageURL && <p className="success-message">Imagen subida correctamente.</p>}
          </div>
          <input type="submit" value="Añadir Receta" />
        </form>
      </div>
    </div>
  );
};

export default RecipeForm;
