import { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import '../css/Registration.css';
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

const RegisterRequest = ({fetchAllUserDetails}) => {
    const [pendingUsers, setPendingUsers] = useState([]);
    const { state } = useLocation();
    const token = state ? state.token : null;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPendingUserData = async () => {
            if (token) {
                try {
                    const response = await axios.get('/api/pending-users', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setPendingUsers(response.data);
                } catch (error) {
                    console.error('Error fetching pending user data:', error);

                }
            }
        };

        fetchPendingUserData();

            // Check authorization
            if (token) {
                // Call the fetchWebAdminDetails and fetchAllUserDetails functions when the component mounts if the user has a token
                fetchPendingUserData();
            } else {
                // Else navigate back to the login page for login.
                navigate('/login');
            }
    }, []);



    const handleApprove = async (userId) => {
        // Send a request to the server to approve the user
        try {
            // Update the approval status in the PendingUser schema
            const response = await fetch(`/api/approve-user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ approved: true }),
            });

            const data = await response.json();

            console.log(data.message);
            toast.success('User approved successfully!');

            //Refetch the user data
            fetchAllUserDetails();

            // Update the local state to remove the approved user from the list
            setPendingUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));
        } catch (error) {
            console.error('Error approving user:', error);
            toast.error('Error approving user. Please try again.');
        }
    };

    const handleDeny = async (userId) => {
        try {
            // Send a request to update the approval status in the PendingUser schema to deny the user
            const denyUserResponse = await fetch(`/api/deny-user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                     Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ approved: false }),
            });

            // Extract the response data from the first API call
            const denyUserData = await denyUserResponse.json();

            // Log a success message and notify the user
            console.log('User denial status updated:', denyUserData.message);
            toast.success('User denied successfully!');

            // Update the local state to remove the denied user from the list
            setPendingUsers((prevUsers) => prevUsers.filter((user) => user._id !== userId));

        } catch (error) {
            // Log an error message and notify the user
            console.error('Error denying user:', error);
            toast.error('Error denying user. Please try again.');
        }
    };

    const [isPanelVisible, setIsPanelVisible] = useState(false);

    const togglePanel = () => {
        setIsPanelVisible((prev) => !prev);
    };

    return (
        <div className="Register-Request-Button">
            <button onClick={togglePanel}>Show Register Requests</button>
            {isPanelVisible && pendingUsers &&(
                <div className="registration-container">
                    <button onClick={togglePanel}>Close</button>
                    <p className="title"> Pending Users </p>
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
