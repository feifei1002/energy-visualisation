import axios from 'axios';
import { useState, useEffect } from 'react';

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
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={profile.username}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
            </div>
            <div>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={profile.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
            </div>
            <div>
                <label htmlFor="name">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={profile.name}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
            </div>
            {isEditing ? (
                <button type="submit">Save Changes</button>
            ) : (
                <button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                </button>
            )}
        </form>
    );
};
export default ProfileOverview;
