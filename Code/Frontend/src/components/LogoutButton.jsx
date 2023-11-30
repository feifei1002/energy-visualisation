import React from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";

export default function LogoutButton() {
    let navigate = useNavigate();

    const handleLogout = async ( ) => {
        try{
            await axios.post('api/logout');
            localStorage.removeItem('accessToken');
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