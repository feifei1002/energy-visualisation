
import './css/Registration.css';

import Header from './Header.jsx';
import Footer from './Footer';
import './App.css';

function RegistrationPage() {
    return (
        <div>
            <Header/> {/* Display the Header component at the top of the page. */}
            <main className="profile-content">
                <RegistrationPage />
            </main>
            <Footer/> {/* Display the Footer component at the bottom of the page. */}
        </div>
    );
}

export default RegistrationPage;
// export default function Registration(){
//     return (
//         <div className="Registration">
//         <Header/>
//             auth0.createAuth0Client({
//             domain: "{yourDomain}",
//             clientId: "{yourClientId}",
//             authorizationParams: {
//             redirect_uri: window.location.origin
//         }
//         }).then(async (auth0Client) => {
//             // Assumes a button with id "login" in the DOM
//             const loginButton = document.getElementById("login");
//
//             loginButton.addEventListener("click", (e) => {
//             e.preventDefault();
//             auth0Client.loginWithRedirect();
//         });
//
//             if (location.search.includes("state=") &&
//             (location.search.includes("code=") ||
//             location.search.includes("error="))) {
//             await auth0Client.handleRedirectCallback();
//             window.history.replaceState({}, document.title, "/");
//         }
//
//             // Assumes a button with id "logout" in the DOM
//             const logoutButton = document.getElementById("logout");
//
//             logoutButton.addEventListener("click", (e) => {
//             e.preventDefault();
//             auth0Client.logout();
//         });
//
//             const isAuthenticated = await auth0Client.isAuthenticated();
//             const userProfile = await auth0Client.getUser();
//
//             // Assumes an element with id "profile" in the DOM
//             const profileElement = document.getElementById("profile");
//
//             if (isAuthenticated) {
//             profileElement.style.display = "block";
//             profileElement.innerHTML = `
//             <p>${userProfile.name}</p>
//             <img src="${userProfile.picture}" />
//           `;
//         } else {
//             profileElement.style.display = "none";
//         }
//         });
//             <Footer/>
//         </div>
//     );
// }
// export default function App() {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//     });
//
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };
//
//     const handleSubmit = (e) => {
//         e.preventDefault();
//         console.log('Form data:', formData);
//     };
//
//     return (
//         <div className="register">
//             <Header />
//             <h2>Registration</h2>
//             <form onSubmit={handleSubmit}>
//                 <div className="form-group navy-box">
//                     <label htmlFor="username">Username:</label>
//                     <input
//                         type="text"
//                         id="username"
//                         name="username"
//                         value={formData.username}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="email">Email:</label>
//                     <input
//                         type="email"
//                         id="email"
//                         name="email"
//                         value={formData.email}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <div className="form-group">
//                     <label htmlFor="password">Password:</label>
//                     <input
//                         type="password"
//                         id="password"
//                         name="password"
//                         value={formData.password}
//                         onChange={handleChange}
//                     />
//                 </div>
//                 <button type="submit">Register</button>
//             </form>
//             <Footer />
//         </div>
//     );
// }