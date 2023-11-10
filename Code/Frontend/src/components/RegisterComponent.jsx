 import { useState} from 'react'; // Import useState for state management
 import axios from "axios";
// import { useHistory } from 'react-router-dom';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleRegistration = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior
        try {
            const response = await axios.put('/api/register', formData);
            setFormData(response.data);
            const responseData = await response.json();
            console.log('Registration successful:', responseData);
            window.location.href = '/';
        } catch (error) {
            // Handle unexpected errors
            console.error('Unexpected error during registration:', error);
        }
    };

    return (
        <div>
            <form onSubmit={handleRegistration} className="profile-form">
            <h2>Registration Form</h2>
                <div>
                    <div className="form-group">
                        <label htmlFor="fullName">Full Name:</label>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                        />
                    </div>
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
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button onClick={handleRegistration}>Register</button>
                </div>
            </form>
        </div>
    );
};

export default RegistrationForm;
