import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addRecipe } from '../../services/RecipeServices';
import './NewRecipeForm.css'; 

const RecipeForm = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [imageURL, setImageURL] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [modalOpen, setModalOpen] = useState(true);

  const onSubmit = async (data) => {
    try {
      data.image = imageURL;
RecipeForm;
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
    } catch (err) {
      console.error("Error adding recipe:", err);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Añadir Receta</h2>
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit(onSubmit)} className="form">
                <label htmlFor="title" className="form__label">Título</label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  {...register('title', { required: true })}
                  className="form__input"
                  placeholder="Título de la receta"
                />
                {errors.title && <p className="form__message form__message--error">Este campo es obligatorio</p>}

                <label htmlFor="description" className="form__label">Descripción</label>
                <textarea
                  id="description"
                  name="description"
                  {...register('description', { required: true })}
                  className="form__input"
                  placeholder="Descripción de la receta"
                />
                {errors.description && <p className="form__message form__message--error">Este campo es obligatorio</p>}

                <label htmlFor="image" className="form__label">URL de la Imagen</label>
                <input
                  type="text"
                  id="image"
                  name="image"
                  value={imageURL}
                  onChange={(e) => setImageURL(e.target.value)}
                  className="form__input"
                  placeholder="URL de la imagen"
                />

                <div className="form-buttons">
                  <button type="submit" className="modal-button">Añadir</button>
                  <button type="button" onClick={() => reset()} className="modal-cancel-button">Cancelar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipeForm;