import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import VisualisationPage from "./VisualisationPage.jsx";
import Graph1 from "./Graph1.jsx";
import './css/Header.css';
import ProfileDashboardPage from "./ProfileDashboardPage.jsx";



function HeaderLink({ href, text }) {
    return (
        <a className="header-link" href={href} rel="noreferrer">
            {text}
        </a>
    );
}

HeaderLink.propTypes = {
    text: PropTypes.string.isRequired,
};

function Header() {
    return (
        <header className="main-header">
            <div className="navbar-title">
                <h1>Modular Heat and Cooling Report</h1>
            </div>
            <nav className="navbar">
                <ul className="nav-links">
                    <HeaderLink href="/About" text="About" />
                    <HeaderLink href="visualisations" to="/visualisations" text="Visualizations" />
                    <HeaderLink href="/login" text="Login" />

                </ul>
            </nav>
        </header>
    );
}

export default Header;

