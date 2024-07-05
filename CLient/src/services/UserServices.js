export const getUser = async () => {
    try {
        const response = await fetch("/api/user");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
    };

export const registerUser = async (user) => {
    try {
        const response = await fetch("/api/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
    }

export const loginUser = async (user) => {
    try {
        const response = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
    }

export const logoutUser = async () => {
    try {
        const response = await fetch("/api/logout");
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error: ", error);
    }
    }