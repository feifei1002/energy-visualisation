import ProfileOverview from './components/ProfileOverview';
import Header from "./Header.jsx";
import './css/ProfileDashboardPage.css';
import LogoutButton from "./components/LogoutButton.jsx";

const ProfileDashboardPage = () => {
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
