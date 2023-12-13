import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import '../css/Registration.css';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

// Component to handle registration requests
const RegisterRequest = ({fetchAllUserDetails}) => {
    // State to store pending users
    const [pendingUsers, setPendingUsers] = useState([]);

    // Extract token from the URL state using useLocation
    const { state } = useLocation();
    const token = state ? state.token : null;

    // Navigation function for routing
    const navigate = useNavigate();

    // Effect to fetch pending user data when the component mounts
    useEffect(() => {
        const fetchPendingUserData = async () => {
            if (token) {
                try {
                    // Fetch pending user data from the server
                    const response = await axios.get('/api/pending-users', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    // Set pendingUsers state with the fetched data
                    setPendingUsers(response.data);
                } catch (error) {
                    console.error('Error fetching pending user data:', error);
                }
            }
        };

        // Check authorization and fetch pending user data
        if (token) {
            fetchPendingUserData();
        } else {
            // If not authorized, navigate back to the login page
            navigate('/login');
        }
    }, []);

    // Function to handle approval of a user
    const handleApprove = async (userId) => {
        try {
            // Send a request to the server to approve the user
            const response = await fetch(`/api/approve-user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ approved: true }),
            });

            // Extract the response data
            const data = await response.json();

            // Log success message and notify the user
            console.log(data.message);
            toast.success('User approved successfully!');

            // Refetch all user details
            fetchAllUserDetails();

            // Update the local state to remove the approved user from the list
            setPendingUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (error) {
            // Log error message and notify the user
            console.error('Error approving user:', error);
            toast.error('Error approving user. Please try again.');
        }
    };

    // Function to handle denial of a user
    const handleDeny = async (userId) => {
        try {
            // Send a request to deny the user
            const denyUserResponse = await fetch(`/api/deny-user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ approved: false }),
            });

            // Extract the response data
            const denyUserData = await denyUserResponse.json();

            // Log success message and notify the user
            console.log('User denial status updated:', denyUserData.message);
            toast.success('User denied successfully!');

            // Update the local state to remove the denied user from the list
            setPendingUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (error) {
            // Log error message and notify the user
            console.error('Error denying user:', error);
            toast.error('Error denying user. Please try again.');
        }
    };

    // State for toggling the visibility of the panel
    const [isPanelVisible, setIsPanelVisible] = useState(false);

    // Function to toggle the visibility of the panel
    const togglePanel = () => {
        setIsPanelVisible((prev) => !prev);
    };

    // Render the component
    return (
        <div className="Register-Request-Button">
            {/* Button to show/hide the register requests panel */}
            <button onClick={togglePanel}>Show Register Requests</button>

            {/* Display panel if it is visible and there are pending users */}
            {isPanelVisible && pendingUsers && (
                <div className="registration-container">
                    <button onClick={togglePanel}>Close</button>
                    <p className="title"> Pending Users </p>

                    {/* Map through pending users and display relevant information and buttons */}
                    {pendingUsers.map((user) => (
                        <div key={user._id} className="registration-item">
                            <p>{user.fullName}, {user.email}</p>
                            <button onClick={() => handleApprove(user._id)}>Approve User</button>
                            <button onClick={() => handleDeny(user._id)}>Deny User</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default RegisterRequest;
