import PropTypes from "prop-types";
import './css/Header.css';

function HeaderLink({ href, text }) {
    return (
        <a className="header-link" href={href} target="_blank" rel="noreferrer">
            {text}
        </a>
    );
}

HeaderLink.propTypes = {
    href: PropTypes.string.isRequired,
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
                    <li><HeaderLink href="/About" text="About" /></li>
                    <li><HeaderLink href="/visualisations" text="Visualisations" /></li>
                    <li><HeaderLink href="/login" text="Login" /></li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
