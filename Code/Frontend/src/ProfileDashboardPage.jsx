import ProfileOverview from './components/ProfileOverview';
import Header from "./Header.jsx";
import './css/ProfileDashboardPage.css';

const ProfileDashboardPage = () => {
    return (
        <div className="profile-page">
            <header className="profile-header">
                <Header />
                <h1>Profile</h1>
            </header>
            <main className="profile-content">
                <ProfileOverview />
            </main>
        </div>
    );
};

export default ProfileDashboardPage;
