import React from 'react';
import axios from "axios";

export default function LogoutButton() {

    const handleLogout = async () => {

        // backend section
        try {
            const accessToken = localStorage.getItem('accessToken');
            if(!accessToken) {
                console.error('Access Token is null or undefined');
                return;
            }

            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            };
            const response = await axios.post('/api/logout', {token: accessToken}, { headers });
            console.log("Logout: " + response)
            if(response.status === 200) {
                localStorage.removeItem('accessToken');
                window.location.href='/';
            }else {
                console.error("Logout failed: ", response.status);
            }
        } catch (error) {
            console.error('Error with logout:', error);
        }
    }

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}