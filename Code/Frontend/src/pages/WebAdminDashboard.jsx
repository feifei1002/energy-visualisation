import React from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Header from "../Header.jsx";
import '../css/WebAdminDashboard.css';
import WebAdminUsersTable from '../components/tables/WebAdminUsersTable';
import WebAdminFeedbackTable from '../components/tables/WebAdminFeedbackTable'
import LogoutButton from '../components/LogoutButton.jsx'
import { Table, Button  } from 'react-bootstrap';
import RegisterRequest from "../components/RegisterRequest.jsx";


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
    const [allFeedback, setAllFeedback] = useState(null);
    const navigate = useNavigate();


    // Define table columns for user table
    const columnsUsers = [
        {
        Header: 'User Name',
        accessor: 'username', 
        },
        {
        Header: 'Email',
        accessor: 'email',
        }
    ];

    // Define table columns for feedback table
    const columnsFeedback = [
        {
        Header: 'Full Name',
        accessor: 'fullName', 
        },
        {
        Header: 'Email',
        accessor: 'email',
        },
        {
        Header: 'Subject',
        accessor: 'subject',
        },
        {
        Header: 'Message',
        accessor: 'message',
        }
    ];

    /**
         * Fetch Web Admin Details
         * 
         * This function fetches web admin details from the backend based on the username, with authorization using the provided token.
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

       /**
     * Fetch All Users Details
     * 
     * This function fetches all user details from the backend, with authorization using the provided token.
     */
    const fetchAllUserDetails =  async () => {
        if (username && token) {
            try {
                // Fetch all user details from the backend using token to authorize
                const response = await axios.get(`/api/getallusers`, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  });
             
                // Set the allUserDetails state with the fetched data
                setAllUserDetails(response.data);
            } catch (error) {
                // Handle errors related to fetching all user details
                console.error('Error fetching all user details:', error);
            }
        }
    };

    /**
     * Fetch All Feedback 
     * 
     * This function fetches all contact us feedback from the backend, with authorization using the provided token.
     */
     const fetchAllFeedback =  async () => {
            if (username && token) {
                try {
                    // Fetch all feedback from the backend using token to authorize
                    const response = await axios.get(`/api/getallfeedback`, {
                        headers: {
                          Authorization: `Bearer ${token}`,
                        },
                      });
                 
                    // Set the all feedback state with the fetched data
                    setAllFeedback(response.data);
                } catch (error) {
                    // Handle errors related to fetching all feedback
                    console.error('Error fetching all feedback details:', error);
                }
            }
     };

    useEffect(() => {
        // Check authorization
        if (token) {
            // Call the fetchWebAdminDetails and fetchAllUserDetails functions when the component mounts if the user has a token
            fetchWebAdminDetails();
            fetchAllUserDetails();
            fetchAllFeedback();
        } else {
            // Else navigate back to the login page for login.
            navigate('/login');
        }

    }, []);

    return (
        <div>
            <header>
                <Header />
            </header>
            <div className="admin-container" data-testid="webadmincontainer">
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
                        <RegisterRequest fetchAllUserDetails={fetchAllUserDetails} />
                        <div className="admin-container-profile-group logoutGroup">
                            <LogoutButton />
                        </div>
                    </div>
                )}
                {allUserDetails && (
                     // Render the WebAdminTable component with columns and data
                     <div style={{margin: '0.5em'}}>
                     <h3>User Table</h3>
                     <WebAdminUsersTable columns={columnsUsers} data={allUserDetails} authToken={token} fetchAllUsers={fetchAllUserDetails}/>
                     </div>
                )}
                {allFeedback && (
                     // See the feedback from the contact us form
                     <div style={{margin: '0.5em'}}>
                     <h3>See Feedback</h3>
                     <WebAdminFeedbackTable columns={columnsFeedback} data={allFeedback} authToken={token} fetchAllFeedback={fetchAllFeedback}/>
                     </div>
                )}
            </div>
        </div>
    );
}
