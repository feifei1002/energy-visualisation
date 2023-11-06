import axios from 'axios';
import { useState, useEffect } from 'react';
import '../css/ProfileOverview.css';

const ProfileOverview = () => {
    const [profile, setProfile] = useState({
        username: '',
        email: '',
        name: '',
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('/api/profile');
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
                //notification to tell user failed to, maybe just reload again?
            }
        };

        fetchProfileData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/profile', profile);
            setProfile(response.data);
            setIsEditing(false);
            //tell user edit worked
        } catch (error) {
            console.error('Error updating profile:', error);
            //tell user edit failed
        }
    };

    return (
        <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
                <label htmlFor="username" className="form-label">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    className="form-control"
                    value={profile.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
            </div>
            <div className="form-group">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={profile.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
            </div>
            <div className="form-group">
                <label htmlFor="name" className="form-label">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={profile.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
            </div>
            {isEditing ? (
                <button type="submit" className="btn save-btn">Save Changes</button>
            ) : (
                <button type="button" className="btn edit-btn" onClick={() => setIsEditing(true)}>
                    Edit Profile
                </button>
            )}
        </form>
    );
};
export default ProfileOverview;
