import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignInSignUp.css';

function SignUp({ role }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        role: role
    });
    
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.username) newErrors.username = 'Username is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email address is invalid';
        if (!formData.password) newErrors.password = 'Password is required';
        else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        // Validate form data
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            try {
                const endpoint = role === 'OWNER' 
                    ? 'http://localhost:8080/api/owners' 
                    : 'http://localhost:8080/api/users';
    
                const response = await axios.post(endpoint, formData);
    
                if (response.status === 200) {
                    setMessage('User registered successfully!');
                    navigate(role === 'CUSTOMER' ? '/customer-home' : '/owner-home');
                } else {
                    setMessage('Failed to register user. Please try again.');
                }
            } catch (error) {
                console.error('Error during sign-up:', error.response ? error.response.data : error.message);
    
                // Display user-friendly error message
                setMessage('An error occurred during sign-up. Please check the console for details.');
            }
        } else {
            setErrors(newErrors);
        }
    };
    

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Sign Up as {role === 'OWNER' ? 'Owner' : 'Customer'}</h2>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />
                {errors.username && <div className="error-message">{errors.username}</div>}
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
                {message && <div className="error-message">{message}</div>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
}

export default SignUp;
