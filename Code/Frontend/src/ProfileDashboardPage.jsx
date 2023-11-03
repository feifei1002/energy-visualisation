import ProfileOverview from './ProfileOverview';

const ProfileDashboardPage = () => {
    return (
        <div className="profile-page">
            <header className="profile-header">
                {/* NAV BAR COMPONENT WILL GO HERE */}
                <h1>Profile</h1>
            </header>
            <main className="profile-content">
                <ProfileOverview />
            </main>
        </div>
    );
};

export default ProfileDashboardPage;
