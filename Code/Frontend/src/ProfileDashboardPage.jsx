import ProfileOverview from './components/ProfileOverview';
import Header from "./Header.jsx";
import './css/ProfileDashboardPage.css';
import LogoutButton from "./components/LogoutButton.jsx";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect} from "react";
import {NotificationContext} from "./contexts/NotificationContext.jsx";

const ProfileDashboardPage = () => {
    let navigate = useNavigate();
    const { showNotification } = useContext(NotificationContext);

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');

        if(!accessToken) {
            showNotification("Please login as an admin to access the Dashboard")
            navigate('/login');
        }
    }, [navigate])
    return (
        <div className="profile-page">
            <header className="profile-header">
                <Header />
                <h1 id="profile-header-text">My Profile</h1>
            </header>
            <LogoutButton></LogoutButton>
            <main className="profile-content">
                <ProfileOverview />
            </main>
        </div>
    );
};

export default ProfileDashboardPage;
