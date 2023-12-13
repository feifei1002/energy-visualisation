// Importing styles for the RegistrationPage
import '../css/Registration.css';

// Importing necessary components and styles
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import '../App.css'; // Importing additional styles
import RegisterComponent from "../components/RegisterComponent.jsx"; // Importing the RegisterComponent

// RegistrationPage component definition
function RegistrationPage() {
    return (
        <div>
            <Header/> {/* Display the Header component at the top of the page. */}
            <main className="profile-content">
                <RegisterComponent /> {/* Render the RegisterComponent to handle user registration. */}
            </main>
            <Footer/> {/* Display the Footer component at the bottom of the page. */}
        </div>
    );
}

export default RegistrationPage;
