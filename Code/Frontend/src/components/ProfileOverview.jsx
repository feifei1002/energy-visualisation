import React from 'react';
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import '../css/ProfileOverview.css';
import { NotificationContext } from '../contexts/NotificationContext';
import {useLocation} from "react-router-dom";

const ProfileOverview = () => {
    const { showNotification } = useContext(NotificationContext);

    const [profile, setProfile] = useState({
        username: '',
        email: '',
        fullName: '',
        newPassword: '',
    });
    const [file, setFile] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const token = localStorage.getItem('accessToken');
    const userID = localStorage.getItem('userID');


    useEffect(() => {
        const fetchProfileData = async () => {
            if(token) {

                try {
                    const response = await axios.get(`/api/profile/${userID}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setProfile(response.data);
                    showNotification('Profile loaded successfully.');
                } catch (error) {
                    console.error('Error fetching profile data:', error)
                    showNotification('Could not find your profile details.');
                }
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
        if (token) {
        try {
            const response = await axios.put(`/api/profile/${userID}`, profile, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setProfile(response.data);
            setIsEditing(false);
            showNotification('Success! You updated your profile details.');
        } catch (error) {
            console.error('Error updating profile:', error);
            showNotification('Failure! Your profile details were not updated.');
        }
    }
    };

    const handleCSVSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await axios.post('/api/upload-csv', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            showNotification('Success! Your CSV was uploaded.');
        } catch (error) {
            console.error('Error uploading CSV:', error);
            showNotification('Failure! Your CSV was not uploaded.');
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
                    name="fullName"
                    className="form-control"
                    value={profile.fullName}
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
