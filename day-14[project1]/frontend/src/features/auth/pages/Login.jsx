import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/form.scss';

function Login() {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        await axios.post("http://localhost:3000/api/auth/login", {
            userName,
            password
        }, { withCredentials: true })
            .then(response => console.log(response.data))
            .catch(error => console.error("There was an error logging in!", error));

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