import React from 'react';
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import './css/Header.css';

function HeaderLink({ to, text, onClick }) {
    return (
        <Link to={to} onClick={onClick}>
            {text}
        </Link>
    );
}


function Header() {
    const isLoggedInUser = localStorage.getItem('accessToken') !== null && localStorage.getItem('role') != 'webadmin';
    const isLoggedInAdmin = localStorage.getItem('accessToken') !== null && localStorage.getItem('role') == 'webadmin';
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userID');
        localStorage.removeItem('role');
        localStorage.removeItem('username');
        navigate('/'); //redirect to home page
    };


    return (
        <header>
            <div className="navbar-title">
                <h1>Modular Heat and Cooling Report</h1>
            </div>
            <nav className="navbar">
                <ul className="nav-links">
                    <HeaderLink to="/" text="About" />
                    <HeaderLink to="/wiki" text="Wiki" />
                    <HeaderLink to="/visualisations/beforeafterheatdemand" text="Visualisations" />
                    {isLoggedInUser ? (
                        <>
                            <HeaderLink to="/profiledashboard" text="Profile"  />
                            <HeaderLink to="/" text="Logout" onClick={handleLogout} />
                        </>
                    ) : isLoggedInAdmin ? (
                        <>
                           <HeaderLink to="/" text="Logout" onClick={handleLogout} />
                        </>
                    ) : (
                        <HeaderLink to="/login" text="Login" />
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Header;
