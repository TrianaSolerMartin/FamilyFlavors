export const getRecipe = async (id) => {
    try {
        const response = await fetch(`/api/recipe/${id}`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
    };

    export const getAllRecipes = async () => {
        try {
            const response = await fetch("http://localhost:3001/recipes");
    
            if (!response.ok) {
                throw new Error(`Failed to fetch recipes: ${response.status} ${response.statusText}`);
            }
    
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
                throw new Error('Expected JSON response from server');
            }
    
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching recipes: ", error.message);
            throw error;
        }
    }

export const addRecipe = async (recipe) => {
    try {
        const response = await fetch("/api/recipe", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
    }

export const deleteRecipe = async (id) => {
    try {
        const response = await fetch(`/api/recipe/${id}`, {
            method: "DELETE",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
    }

export const updateRecipe = async (id, recipe) => {
    try {
        const response = await fetch(`/api/recipe/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(recipe),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
    }
