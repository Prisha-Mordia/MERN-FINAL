import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './login.css'; // Ensure you import the CSS file

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [phone, setPhone] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let { data } = await axios.post(`http://localhost:8000/users/register`, {
                name: name,
                email: email,
                password: password,
                phone: phone
            });
            if (data.success) {
                alert(data.message);
                setName("");
                setEmail("");
                setPassword("");
                setPhone("");
            } else {
                alert(data.message);
            }
        } catch (err) {
            console.log(err);
            return false;
        }
    }

    return (
        <div>
            <div className="background">
                <div className="shape"></div>
                <div className="shape"></div>
            </div>
            <form onSubmit={handleSubmit}>
                <h3>Register Here</h3>

                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    placeholder="Enter Name"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    placeholder="Enter Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    placeholder="Enter Password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor="phone">Phone</label>
                <input
                    type="number"
                    placeholder="Enter Phone"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <button type="submit">Register</button>
                <div className="register-link">
                    <span>Already have an account? </span>
                    <Link to={`/login`} className="register-text">Login</Link>
                </div>
            </form>
        </div>
    );
}

export default Register;
