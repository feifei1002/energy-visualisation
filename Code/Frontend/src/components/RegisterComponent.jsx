import { useState } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../css/Registration.css';


const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        fullName: '',
        username: '',
        email: '',
        password: '',
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear the error message when the user starts typing in the input field
        setErrors({ ...errors, [name]: '' });
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegistration = async (e) => {
        e.preventDefault();
        // Check for empty fields
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
            const response = await axios.post('/api/register', formData);
            console.log('Axios Response:', response);

            setFormData({
                fullName: '',
                username: '',
                email: '',
                password: '',
            });
            toast.success('User Registration Received!');
        } catch (error) {
            console.error('Axios Error:', error);
            toast.error(error.response.data.error || 'Error Registering user. Please try again.');
        }
        setErrors({});
    };

    return (
        <div>
            <form onSubmit={handleRegistration} className="register-form">
                <h2>Registration Form</h2>
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
                    <span onClick={togglePasswordVisibility} className="password-toggle">
            {showPassword ? 'Hide Password' : 'Show Password'}
          </span>
                    {errors.password && <div className="error-message">{errors.password}</div>}
                </div>

                <br></br>
                <button type="submit" className="btn register-btn">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegistrationForm;

// import { useState } from 'react';
// import axios from "axios";
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import '../css/Registration.css';

// const RegistrationForm = () => {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         username: '',
//         email: '',
//         password: '',
//     });
//     const [showPassword, setShowPassword] = useState(false);
//     const [error, setError] = useState('');
//
//     const togglePasswordVisibility = () => {
//         setShowPassword(!showPassword);
//     };
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({ ...formData, [name]: value });
//     };
//
//     const handleRegistration = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/register', formData);
//             console.log('Axios Response:', response);
//
//             setFormData({
//                 fullName: '',
//                 username: '',
//                 email: '',
//                 password: '',
//             });
//             setError('');
//             toast.success('User Registration Received!');
//         } catch (error) {
//             console.error('Axios Error:', error);
//             setError(error.response.data.error || 'Error Registering user. Please try again.');
//         }
//     };
//
//
//     return (
//         <div>
//             <form onSubmit={handleRegistration} className="register-form">
//                 <h2>Registration Form</h2>
//                 <div className="form-group-register">
//                     <label htmlFor="fullName">Full Name:</label>
//                     <input
//                         type="text"
//                         id="fullName"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleInputChange}
//                         autoComplete="name"
//                     />
//                 </div>
//                 <div className="form-group-register">
//                     <label htmlFor="username">Username:</label>
//                     <input
//                         type="text"
//                         id="username"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleInputChange}
//                         autoComplete="username"
//                     />
//                 </div>
//                 <div className="form-group-register">
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                         autoComplete="email"
//                     />
//                 </div>
//                 <div className="form-group-register">
//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type={showPassword ? 'text' : 'password'}
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                         autoComplete="new-password"
//                     />
//                     <span onClick={togglePasswordVisibility} className="password-toggle">
//                         {showPassword ? 'Hide Password' : 'Show Password'}
//                     </span>
//                 </div>
//                 {error && <div className="error-message">{error}</div>}
//                 <br></br>
//                 <button type="submit" className="btn register-btn">Register</button>
//             </form>
//         </div>
//     );
// };
//
// export default RegistrationForm;
