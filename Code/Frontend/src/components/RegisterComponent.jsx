import React, { useEffect, useState } from 'react';
import React, { useState } from 'react';
import axios from 'axios';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        name: '',
        newPassword: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/register', formData);
            // Handle the registration success or errors as needed
            console.log('Registration successful:', response.data);
        } catch (error) {
            // Handle the registration errors
            console.error('Error registering:', error);
        }
    };

    return (
        <div>
            <h2>Registration Form</h2>
            <form onSubmit={handleRegistration}>
                <div className="form-group">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password:</label>
                    <input
                        type="password"
                        id="newPassword"
                        name="newPassword"
                        value={formData.newPassword}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;