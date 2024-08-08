import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SignInSignUp.css';

function SignIn({ role }) {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
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
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length === 0) {
            try {
                const endpoint = role === 'OWNER' ? 'http://localhost:8080/api/owners' : 'http://localhost:8080/api/users';
                const response = await axios.get(endpoint);
                const users = response.data;
                const user = users.find(user => user.email === formData.email && user.password === formData.password);
                if (user) {
                    localStorage.setItem('userEmail', user.email); // Store email in local storage
                    navigate(role === 'CUSTOMER' ? '/customer-home' : '/owner-home');
                } else {
                    setMessage('Invalid email or password. Please try again.');
                }
            } catch (error) {
                console.error('Error during sign-in:', error.response ? error.response.data : error.message);
                setMessage('An error occurred during sign-in.');
            }
        } else {
            setErrors(newErrors);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <h2>Sign In as {role === 'OWNER' ? 'Owner' : 'Customer'}</h2>
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                {errors.email && <div className="error-message">{errors.email}</div>}
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                {errors.password && <div className="error-message">{errors.password}</div>}
                {message && <div className="error-message">{message}</div>}
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default SignIn;
