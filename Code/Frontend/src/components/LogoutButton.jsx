import React, {useContext} from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {NotificationContext} from "../contexts/NotificationContext.jsx";

export default function LogoutButton() {
    const { showNotification } = useContext(NotificationContext);
    let navigate = useNavigate();

    const handleLogout = async ( ) => {
        try{
            await axios.post('api/logout');
            localStorage.removeItem('accessToken');
            showNotification('Logout successful');
            navigate('/')
        }catch (error) {
            console.error('error logging out: ', error)
        }

        navigate('/');
    }

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
        </>
    )
}