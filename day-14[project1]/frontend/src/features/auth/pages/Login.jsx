import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth'; //custom hook to access auth context
import '../styles/form.scss';

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const { handleLogin, loading } = useAuth(); //custom hook to access auth context
    const navigate = useNavigate();

    if (loading) {
        return <h1>Loading...</h1>;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        handleLogin(userName, password)
            .then(() => {
                console.log("Login successful!");
                navigate("/");
            });

        setUserName("");
        setPassword("");
    }
    return (
        <main>
            <div className="form-container">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        name='userName'
                        type="text"
                        placeholder="Username"
                        required
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                    />
                    <input
                        name='password'
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Login</button>
                </form>
                <p>Don't have an account? <Link className='redirectLink' to="/register">Register here</Link></p>
            </div>
        </main>
    )
}

export default Login