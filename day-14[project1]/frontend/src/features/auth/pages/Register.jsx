import { useState } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
// import '../styles/form.scss';

function Register() {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post("http://localhost:3000/api/auth/register", {
                userName,
                email,
                password
            }, { withCredentials: true });
            console.log(response.data);
        } catch (error) {
            console.error("There was an error registering!", error);
        }
        // await axios.post("http://localhost:3000/api/auth/register", {
        //     userName,
        //     email,
        //     password
        // }, { withCredentials: true })
        //     .then(response => console.log(response.data))
        //     .catch(error => console.error("There was an error registering!", error));

        setUserName("");
        setEmail("");
        setPassword("");
    }

    return (
        <main>
            <div className="form-container">
                <h2>Register</h2>
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
                        name='email'
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        name='password'
                        type="password"
                        placeholder="Password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Register</button>
                </form>
                <p>Already have an account? <Link className='redirectLink' to="/login">Login here</Link></p>
            </div>
        </main>
    );
}
export default Register;