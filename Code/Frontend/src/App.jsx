import UkriLogo from './assets/UkriLogo1.png'
import FlexisLogo from './assets/FlexisLogo2.png'
import CardiffUniLogo from './assets/CardiffUniLogo.png'
import UkercLogo from './assets/UkercLogo.png'
import Zero2025 from './assets/Zero2050Logo.png'
import './App.css'

import PropTypes from 'prop-types';

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

// eslint-disable-next-line react/prop-types
function ListItem({ name }) {
    return <li>{name}</li>;
}

function App() {
    const logos = [
        { src: CardiffUniLogo, alt: 'Cardiff University Logo', href: 'https://www.cardiff.ac.uk/' },
        { src: UkriLogo, alt: 'Ukri Logo', href: 'https://www.ukri.org/' },
        { src: UkercLogo, alt: 'Ukerc Logo', href: 'https://ukerc.rl.ac.uk/index.html#' },
        { src: FlexisLogo, alt: 'Flexis Logo', href: 'https://www.flexis.wales/' },
        {
            src: Zero2025,
            alt: 'Zero 2050 Logo',
            href: 'https://connecteddata.nationalgrid.co.uk/dataset/net-zero-south-wales-2050',
        },
    ];

    const researchers = ['Alexandre Canet', 'Ali Al-Wakeel', '_'];
    const academics = ['Meysam Qadrdan', 'Nick Jenkins', 'Jianzhong Wu'];

    return (
        <div className="landing-page">
            <header>
                <div className="navbar-title">
                    <h1>Modular Heat and Cooling Report</h1>
                </div>
                <nav className="navbar">
                    <ul className="nav-links">
                        <HeaderLink href="/About" text="About" />
                        <HeaderLink href="/visualizations" text="Visualizations" />
                        <HeaderLink href="/login" text="Login" />
                    </ul>
                </nav>
            </header>
            <main>
                <div>
                    {logos.map((logo, index) => (
                        <a key={index} href={logo.href} target="_blank" rel="noreferrer">
                            <img src={logo.src} className="logo" alt={logo.alt} />
                        </a>
                    ))}
                </div>
                <div className="card">
                    <h2>About Us</h2>
                    <p>
                        The Centre for Integrated Renewable Energy Generation and

                         Supply (CIREGS) at Cardiff University’s School of Engineering was established in 2008 as a

                         multidisciplinary engineering research group with international expertise in the supply,

                         transmission and demand of energy.


                         As a result of academic and industry projects funded by EPSRC (i.e. UKERC, MISSION, and Heat Prosumers projects), National Grid (Zero2050 South Wales project) and Welsh European Funding Office (Flexis project), we developed a methodology for

                         estimating spatial and temporal heat demand and energy consumption for heating in England & Wales, along with a database that includes heat demand time series for Lower layer Super OutputAreas (LSOAs) across England & Wales.


                         We intend to use this space to share key results from our

                         research on energy demand data in the form of interactive visualisations
                    </p>
                    <h3>Team</h3>
                    <div className="container">
                        <div className="list">
                            <h2>Researchers</h2>
                            <ul>
                                {researchers.map((name, index) => (
                                    <ListItem key={index} name={name} />
                                ))}
                            </ul>
                        </div>
                        <div className="list">
                            <h2>Academics</h2>
                            <ul>
                                {academics.map((name, index) => (
                                    <ListItem key={index} name={name} />
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <p>
                    <a className="read-the-docs" href="https://www.linkedin.com/showcase/centre-for-integrated-renewable-energy-generation-and-supply-ciregs-" target="_blank" rel="noreferrer">
                        Follow us on LinkedIn
                    </a>
                </p>
            </footer>
        </div>
    );
}

export default App;