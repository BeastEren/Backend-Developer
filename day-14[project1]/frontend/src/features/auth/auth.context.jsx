import { createContext, useState, useEffect } from "react";
// import { login, register, getUser } from "./services/auth.api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    // {
    // const handleLogin = async (userName, password) => {
    //     setLoading(true);
    //     try {
    //         const response = await login(userName, password);
    //         setUser(response.user);
    //     } catch (error) {
    //         console.error("Login failed:", error);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // }

    // const handleRegister = async (userName, email, password) => {
    //     setLoading(true);
    //     try {
    //         const response = await register(userName, email, password);
    //         setUser(response.user);
    //     } catch (error) {
    //         console.error("Registration failed:", error);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // }

    // const handleGetUser = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await getUser();
    //         setUser(response.user);
    //     } catch (error) {
    //         console.error("Failed to get user:", error);
    //     }
    //     finally {
    //         setLoading(false);
    //     }
    // }
    // }

    return (
        <AuthContext.Provider value={{ user, loading, setUser, setLoading }}>
            {children}
        </AuthContext.Provider>
    );
}