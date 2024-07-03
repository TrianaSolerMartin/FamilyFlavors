const RecipeDetail = ({ recipe }) => {
    return (
        <div>
            <h1>{recipe.name}</h1>
            <ul>
                <li>Category: {recipe.category}</li>
                <li>Ingredients: {recipe.ingredients}</li>
                <li>Instructions: {recipe.instructions}</li>
            </ul>
        </div>
    )
}

export default RecipeDetail;