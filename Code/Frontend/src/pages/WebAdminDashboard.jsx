import React from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../Header.jsx";
import '../css/ProfileOverview.css';

/**
 * WebAdminDashboard Component
 * 
 * This component displays the profile details of a web admin user.
 * It fetches the details from the backend based on the provided username if logged in successfully.
 */
export default function WebAdminDashboard() {
    // Extract user data from the location state
    const { state } = useLocation();
    const username = state ? state.user : null;
    const [webAdminDetails, setWebAdminDetails] = useState(null);

    useEffect(() => {
        /**
         * Fetch Web Admin Details
         * 
         * This function fetches web admin details from the backend based on the username.
         */
        const fetchWebAdminDetails = async () => {
            if (username) {
                try {
                    // Fetch web admin details from the backend
                    const response = await axios.get(`/api/webadmin/user/${username}`);
                    console.log(response.data);

                    // Set the webAdminDetails state with the fetched data
                    setWebAdminDetails(response.data);
                } catch (error) {
                    // Handle errors related to fetching web admin details
                    console.error('Error fetching web admin details:', error);
                }
            }
        };

        // Call the fetchWebAdminDetails function when the component mounts
        fetchWebAdminDetails();
    }, []);

    return (
        <div>
            <header className="profile-header">
            <Header />
            </header>
            <div className="profile-container">
                {webAdminDetails ? (
                    // If webAdminDetails is available, display the profile form
                    <form className="profile-form">
                        <div className="form-group">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                className="form-control"
                                defaultValue={webAdminDetails.username}
                                disabled="disabled"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="form-control"
                                defaultValue={webAdminDetails.email}
                                disabled="disabled"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="form-control"
                                defaultValue={webAdminDetails.fullName}
                                disabled="disabled"
                            />
                        </div>
                    </form>
                ) : (
                    // If webAdminDetails is not available, display an "Access Denied" message
                    <p>Access Denied</p>
                )}
            </div>
        </div>
    );
}
