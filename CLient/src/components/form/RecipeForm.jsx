import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { addRecipe } from '../../services/RecipeServices'; 

const NewRecipeForm = () => {
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const onSubmit = async (data) => {
    try {
      const { success, error } = await addRecipe(data);

      if (success) {
        alert('¡La receta fue añadida correctamente!');
        reset(); 
        setIsSubmitted(true);
        setTimeout(() => setIsSubmitted(false), 1500); 
      } else {
        alert(error);
      }
    } catch (error) {
      console.error("Error al añadir la receta:", error);
      alert('Error al añadir la receta. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div>
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
        <input type="submit" value="Añadir Receta" />
      </form>
      {isSubmitted && <p>Receta añadida exitosamente.</p>}
    </div>
  );
}

export default NewRecipeForm;
