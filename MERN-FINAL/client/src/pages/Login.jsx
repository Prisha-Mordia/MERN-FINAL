import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/Auth';
import './login.css'; // Ensure you import the CSS file if it's separate

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let res = await axios.post(`http://localhost:8000/users/login`, {
                email: email,
                password: password
            });
            if (res.data.success) {
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token
                });

                localStorage.setItem('auth', JSON.stringify(res.data));
                if (res.data?.user?.role === "admin") {
                    navigate('/admin/dashboard');
                } else {
                    navigate('/');
                }

            } else {
                alert(res.data.message);
            }
            setEmail("");
            setPassword("");
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    return (
        <div className='login-body'>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Login Here</h3>

                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button type="submit">Log In</button>
                <div className="register-link">
                    <span>Don't have an account? </span>
                    <Link to={`/register`} className="register-text">Register</Link>
                </div>
            </form>
        </div>
    );
}

export default Login;
