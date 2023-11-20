import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import '../css/ProfileOverview.css';
import { NotificationContext } from '../contexts/NotificationContext';

const ProfileOverview = () => {
    const { showNotification } = useContext(NotificationContext);

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        name: '',
        newPassword: '',
    });
    const [file, setFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('/api/profile');
                setProfile(response.data);
            } catch (error) {
                console.error('Error fetching profile data:', error);
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

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleProfileSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put('/api/profile', profile);
            setProfile(response.data);
            setIsEditing(false);
            showNotification('Success! You updated your profile details.');
        } catch (error) {
            console.error('Error updating profile:', error);
            showNotification('Failure! Your profile details were not updated.');
        }
    };

    const handleCSVSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/upload-csv', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            //tell user was success
        } catch (error) {
            console.error('Error uploading CSV:', error);
        }
    };

    return (
        <div className="profile-container">
        <form onSubmit={handleProfileSubmit} className="profile-form">
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
            <div className="form-group">
                <label htmlFor="newPassword" className="form-label">New Password</label>
                <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    className="form-control"
                    value={profile.newPassword}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                />
            </div>
            {isEditing ? (
                <>
                    <button type="submit" className="btn save-btn">Save Changes</button>
                    <button type="button" className="btn cancel-btn" onClick={() => setIsEditing(false)}>
                        Cancel
                    </button>
                </>
            ) : (
                <button type="button" className="btn edit-btn" onClick={() => setIsEditing(true)}>
                    Edit Profile
                </button>
            )}
        </form>
            <div className="csv-upload-form">
                <form onSubmit={handleCSVSubmit}>
                    <div className="form-group">
                        <label htmlFor="csv" className="form-label">Upload CSV</label>
                        <input
                            type="file"
                            id="csv"
                            name="csv"
                            className="form-control"
                            onChange={handleFileChange}
                            accept=".csv"
                        />
                    </div>
                    <button type="submit" className="btn save-btn">Upload CSV</button>
                </form>
            </div>
        </div>
    );
};

export default ProfileOverview;
