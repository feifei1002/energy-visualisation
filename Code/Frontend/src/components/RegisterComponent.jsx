 import { useState} from 'react'; // Import useState for state management
 import axios from "axios";
 //import RegisterRequest from "./RegisterRequest.jsx";
 import { toast } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
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
         e.preventDefault();
         try {
             const response = await axios.post('/register/api/register', formData);
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
             toast.error('Error Registering user. Please try again.');
         }
     };

     return (
         <div>
             <form onSubmit={handleRegistration} className="register-form">
                 <h2>Registration Form</h2>
                 <div className="form-group">
                     <label htmlFor="fullName">Full Name:</label>
                     <input
                         type="text"
                         id="fullName"
                         name="fullName"
                         value={formData.fullName}
                         onChange={handleInputChange}
                         autoComplete="name"
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
                         autoComplete="username"
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
                         autoComplete="email"
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
                         autoComplete="new-password"
                     />
                 </div>
                 <button type="submit" className="btn register-btn">Register</button>
             </form>
         </div>
     );
 };



 export default RegistrationForm;