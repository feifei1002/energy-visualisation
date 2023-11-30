
import '../css/Registration.css';

import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import '../App.css';
import RegisterComponent from "../components/RegisterComponent.jsx";


function RegistrationPage() {
    return (
        <div>
            <Header/> {/* Display the Header component at the top of the page. */}
            <main className="profile-content">
                <RegisterComponent />
            </main>
            <Footer/> {/* Display the Footer component at the bottom of the page. */}
        </div>
    );
}

export default RegistrationPage;
