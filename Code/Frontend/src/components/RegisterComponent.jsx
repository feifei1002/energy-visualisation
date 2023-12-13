// Import necessary dependencies and styles
import { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Registration.css';

// Component for user registration form
const RegistrationForm = () => {
    // State to manage form data
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });

    // State to manage form validation errors
    const [errors, setErrors] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });

    // State to manage password visibility
    const [showPassword, setShowPassword] = useState(false);

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear the error message when the user starts typing in the input field
        setErrors({ ...errors, [name]: '' });
    };

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle user registration
    const handleRegistration = async (e) => {
        e.preventDefault();

        // Check for empty fields and update errors state
        const newErrors = {};
        Object.keys(formData).forEach((key) => {
            if (!formData[key]) {
                newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
            }
        });

        // If there are errors, update the state and prevent registration
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        try {
            // Send registration data to the server
            const response = await axios.post('/api/register', formData);
            console.log('Axios Response:', response);

            // Clear form data on successful registration
            setFormData({
                fullName: '',
                username: '',
                email: '',
                password: '',
            });
            toast.success('User Registration Received!');
        } catch (error) {
            // Log and notify on registration error
            console.error('Axios Error:', error);
            toast.error(error.response.data.error || 'Error Registering user. Please try again.');
        }

        // Clear errors after submission
        setErrors({});
    };

    // Render the registration form
    return (
        <div>
            <form onSubmit={handleRegistration} className="register-form">
                <h2>Registration Form</h2>
                {/* Full Name input field */}
                <div className="form-group-register">
                    <label htmlFor="fullName">Full Name:</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        autoComplete="name"
                    />
                    {errors.fullName && <div className="error-message">{errors.fullName}</div>}
                </div>

                {/* Username input field */}
                <div className="form-group-register">
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleInputChange}
                        autoComplete="username"
                    />
                    {errors.username && <div className="error-message">{errors.username}</div>}
                </div>

                {/* Email input field */}
                <div className="form-group-register">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        autoComplete="email"
                    />
                    {errors.email && <div className="error-message">{errors.email}</div>}
                </div>

                {/* Password input field */}
                <div className="form-group-register">
                    <label htmlFor="password">Password:</label>
                    <input
                        type={showPassword ? 'text' : 'password'}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        autoComplete="new-password"
                    />
                    {/* Password visibility toggle */}
                    <span onClick={togglePasswordVisibility} className="password-toggle">
                        {showPassword ? 'Hide Password' : 'Show Password'}
                    </span>
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                <br></br>
                {/* Registration button */}
                <button type="submit" className="btn register-btn">
                    Register
                </button>
            </form>
        </div>
    );
};

// Export the RegistrationForm component
export default RegistrationForm;
