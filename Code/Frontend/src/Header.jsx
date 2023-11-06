import PropTypes from "prop-types";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import VisualisationPage from "./VisualisationPage.jsx";
import Graph1 from "./Graph1.jsx";
import { Link } from "react-router-dom";
import './css/Header.css';
import ProfileDashboardPage from "./ProfileDashboardPage.jsx";




function HeaderLink({ to, text }) {
    return (

        <Link to={to}>
        <a className="header-link" href={href} rel="noreferrer">
            {text}
        </a>
        </Link>
    );
}

HeaderLink.propTypes = {
    to: PropTypes.string.isRequired, // 'to' prop for React Router Link
    text: PropTypes.string.isRequired
};

function Header() {
    return (
        <header className="main-header">
            <div className="navbar-title">
                <h1>Modular Heat and Cooling Report</h1>
            </div>
            <nav className="navbar">
                <ul className="nav-links">
                    {/* Use the 'to' prop for navigation with React Router */}
                    <HeaderLink to="/" text="About" />
                    <HeaderLink to="/visualisations" text="Visualizations" />
                    <HeaderLink to="/login" text="Login" />
                    <HeaderLink href="/About" text="About" />
                    <HeaderLink href="visualisations" to="/visualisations" text="Visualizations" />
                    <HeaderLink href="/login" text="Login" />
                </ul>
            </nav>
            {/* Your Routes should typically be outside of the Header component, and not nested within */}
        </header>
    );
}

export default Header;

