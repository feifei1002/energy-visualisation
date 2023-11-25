import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../Header.jsx";
import '../css/WebAdminDashboard.css';

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
    const token = state ? state.token : null;
    const [webAdminDetails, setWebAdminDetails] = useState(null);
    const [allUserDetails, setAllUserDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        /**
         * Fetch Web Admin Details
         * 
         * This function fetches web admin details from the backend based on the username. need to implement
         * with token later.
         */
        const fetchWebAdminDetails = async () => {
            if (username && token) {
                try {
                    // Fetch web admin details from the backend using token to authorize
                    const response = await axios.get(`/api/webadmin/user/${username}`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                    });

                    // Set the webAdminDetails state with the fetched data
                    setWebAdminDetails(response.data);
                } catch (error) {
                    // Handle errors related to fetching web admin details
                    console.error('Error fetching web admin details:', error);
                }
            }
        };

        const fetchAllUserDetails =  async () => {
            if (username) {
                try {
                    // Fetch web admin details from the backend using token to authorize
                    const response = await axios.get(`/api/getallusers`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });
                 
                    // Set the webAdminDetails state with the fetched data
                    setAllUserDetails(response.data);
                    console.log(allUserDetails)
                } catch (error) {
                    // Handle errors related to fetching web admin details
                    console.error('Error fetching web admin details:', error);
                }
            }
        };

        // Check authorization
        if (token) {
            // Call the fetchWebAdminDetails and fetchAllUserDetails function when the component mounts if the user has token
            fetchWebAdminDetails();
            fetchAllUserDetails();
        } else {
            // Else navigate back to login page for login.
            navigate('/login');
        }

    }, []);

    return (
        <div>
            <header>
            <Header />
            </header>
            <div className="admin-container">
                {webAdminDetails && (
                    // If webAdminDetails is available, display the profile form
                    <div className="admin-container-profile">
                        <div className="admin-container-profile-group">
                            <h3 className="admin-container-profile-header">Username:</h3>
                            <h3 className="admin-container-profile-text">
                                  {webAdminDetails.username}
                            </h3>
                        </div>
                        <div className="admin-container-profile-group">
                            <h3 className="admin-container-profile-header">Email:</h3>
                            <h3 className="admin-container-profile-text">
                                    {webAdminDetails.email}
                            </h3>
                        </div>
                        <div className="admin-container-profile-group">
                                <h3 className="admin-container-profile-header">Full Name:</h3>
                                <h3 className="admin-container-profile-text">
                                    {webAdminDetails.fullName}
                                </h3>
                        </div>
                        <div className="admin-container-table-group">

                        </div>
                </div>
                )}
            </div>
        </div>
    );
}
