 import React, { useState } from 'react'; // Import useState for state management
import { useAuth0 } from '@auth0/auth0-react';
// import { useHistory } from 'react-router-dom';

const RegistrationForm = () => {
    const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();
    // const history = useHistory();
    //
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

    const handleRegistration = () => {
        loginWithRedirect({
            screen_hint: 'signup', // Use 'signup' instead of 'register'
        }).then(() => {
        //     // After successful registration, redirect to the home page
        //     history.push('/');
         });
    };

    return (
        <div>
            <h2>Registration Form</h2>
            {isLoading ? (
                <div>Loading...</div>
            ) : isAuthenticated ? (
                <p>You are already logged in. No need to register.</p>
            ) : (
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
            )}
        </div>
    );
};

export default RegistrationForm;
// import React, { useState } from 'react';
// import '../css/Registration.css';
// import {User} from "@auth0/auth0-spa-js";
//
// const RegistrationForm = () => {
//     const [formData, setFormData] = useState({
//         fullName: '',
//         username: '',
//         email: '',
//         password: '',
//     });
//
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };
//
//     const handleRegistration = async (e) => {
//         e.preventDefault();
//         try {
//             const response = await axios.post('/api/register', formData);
//             // Handle the registration success or errors as needed
//             console.log('Registration successful:', response.data);
//         } catch (error) {
//             // Handle the registration errors
//             console.error('Error registering:', error);
//         }
//     };
//
//     return (
//         <div>
//             <h2>Registration Form</h2>
//             <form onSubmit={handleRegistration}>
//                 <div className="form-group">
//                     <label htmlFor="fullName">Full Name:</label>
//                     <input
//                         type="text"
//                         id="fullName"
//                         name="fullName"
//                         value={formData.fullName}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="username">Username:</label>
//                     <input
//                         type="text"
//                         id="username"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleInputChange}
//                     />
//                 </div>
//                 <button type="submit" className="btn save-btn">Register</button>
//             </form>
//         </div>
//     );
// };
//
// export default RegistrationForm;