import { useContext } from "react";
import { AuthContext } from "../auth.context.jsx";
import { login, register } from "../services/auth.api.js";

export const useAuth = () => {
    const context = useContext(AuthContext);
    const { user, loading, setUser, setLoading } = context;

    const handleLogin = async (userName, password) => {
        setLoading(true);
        try {
            const response = await login(userName, password);
            setUser(response.user);
        } catch (error) {
            console.error("Login failed:", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    const handleRegister = async (userName, email, password) => {
        setLoading(true);
        try {
            const response = await register(userName, email, password);
            setUser(response.user);
        } catch (error) {
            console.error("Registration failed:", error);
            throw error;
        }
        finally {
            setLoading(false);
        }
    }

    return { user, loading, handleLogin, handleRegister };
}