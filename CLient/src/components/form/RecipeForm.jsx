import {useForm} from 'react-hook-form';
import {addRecipe} from "../../services/RecipeServices";


const RecipeForm = () => {
    const {register, handleSubmit} = useForm();
    const onSubmit = async (data) => {
        await addRecipe(data);
    };

    return (
        <div>
            <h1>Recipe Form</h1>
            <form>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="description">Description</label>
                <input type="text" id="description" name="description" />
                <label htmlFor="ingredients">Ingredients</label>
                <input type="text" id="ingredients" name="ingredients" />
                <label htmlFor="instructions">Instructions</label>
                <input type="text" id="instructions" name="instructions" />
                <button type="submit">Añadir</button>
            </form>
        </div>
    );
}

export default RecipeForm;