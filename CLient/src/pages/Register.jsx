import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../services/UserServices';

const Register = () => {
    const [userData, setUserData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await register(userData);
        if (response.success) {
            navigate('/login');
        }
    };

    return (
        <div className="register-container">
            <h1>Register</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUserData({...userData, username: e.target.value})}
                />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setUserData({...userData, email: e.target.value})}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setUserData({...userData, password: e.target.value})}
                />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default Register;