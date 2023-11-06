import PropTypes from "prop-types";

function HeaderLink({ href, text }) {
    return (
        <a href={href} target="_blank" rel="noreferrer">
            {text}
        </a>
    );
}

HeaderLink.propTypes = {
    href: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired, // Define PropTypes for the 'text' prop
};
function Header() {
    return (
        <header>
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
