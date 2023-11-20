import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import '../css/Registration.css';

const RegisterRequest = () => {
    const [pendingUsers, setPendingUsers] = useState([]);

    useEffect(() => {
        // Fetch pending users when the component mounts
        fetch('/api/pending-users')
            .then((response) => response.json())
            .then((data) => {
                setPendingUsers(data);
            })
            .catch((error) => {
                console.error('Error fetching pending users:', error);
                toast.error('Error fetching pending users. Please try again.');
            });
    }, []);

    const handleApprove = async (userId, e) => {
        // Send a request to the server to approve the user
        e.preventDefault();

        try {
            // Update the approval status in the PendingUser schema
            const response = await fetch(`/api/approve-user/${userId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ approved: true }),
            });

            const data = await response.json();

            console.log(data.message);
            toast.success('User approved successfully!');

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
        <div>
            <button onClick={togglePanel}>Show Register Requests</button>
            {isPanelVisible && (
                <div className="registration-container">
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
