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

HeaderLink.propTypes = {
    to: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    onClick: PropTypes.func,
};

function Header() {
    const isLoggedIn = localStorage.getItem('accessToken') !== null;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userID');
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
                    {isLoggedIn ? (
                        <>
                            <HeaderLink to="/profiledashboard" text="Profile"  />
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
