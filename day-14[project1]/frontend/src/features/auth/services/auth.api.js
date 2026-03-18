import axios from 'axios';

const api = axios.create({
    baseURL: "https://backend-developer-beta.vercel.app/api/auth",
    withCredentials: true
});

export async function login(userName, password) {
    try {
        const response = await api.post("/login", {
            userName,
            password
        });
        return response.data;
    } catch (error) {
        console.error("There was an error logging in!", error);
        throw error;
    }
}

export async function register(userName, email, password) {
    try {
        const response = await api.post("/register", {
            userName,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error("There was an error registering!", error);
        throw error;
    }
}

export async function getUser() {
    try {
        const response = await api.get("/get-user");
        return response.data;
    } catch (error) {
        console.error("There was an error fetching the user!", error);
        throw error;
    }
}