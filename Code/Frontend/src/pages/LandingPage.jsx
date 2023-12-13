// Importing necessary components and assets
import RegisterRequest from '../components/RegisterRequest';
import UkriLogo from '../assets/UkriLogo1.png';
import FlexisLogo from '../assets/FlexisLogo2.png';
import CardiffUniLogo from '../assets/CardiffUniLogo.png';
import UkercLogo from '../assets/UkercLogo.png';
import Zero2025 from '../assets/Zero2050Logo.png';
import Header from '../Header';
import Footer from '../Footer';
import '../css/LandingPage.css';
import 'react-toastify/dist/ReactToastify.css';
import ContactUsForm from '../components/ContactUsForm';

// Importing analytics tracking function and React's useState hook
import trackEvent from '../utils/analytics';
import { useState } from 'react';

// LandingPage component definition
export default function LandingPage() {

    // State to hold user's location for analytics tracking
    const [userLocation, setUserLocation] = useState(null);

    // Fetching user's geolocation
    navigator.geolocation.getCurrentPosition((position) => {
        const location = `${position.coords.latitude}, ${position.coords.longitude}`;
        setUserLocation(location); // Updating the state with user's location
    });

    // Logging user viewing page for analytics
    const pageUrl = window.location.href;
    if (userLocation !== null) {
        trackEvent('PageView', null, pageUrl, userLocation);
    }

    // Array of logos with their details
    const logos = [
        { src: CardiffUniLogo, alt: 'Cardiff University Logo', href: 'https://www.cardiff.ac.uk/' },
        { src: UkriLogo, alt: 'Ukri Logo', href: 'https://www.ukri.org/' },
        { src: UkercLogo, alt: 'Ukerc Logo', href: 'https://ukerc.rl.ac.uk/index.html#' },
        { src: FlexisLogo, alt: 'Flexis Logo', href: 'https://www.flexis.wales/' },
        { src: Zero2025, alt: 'Zero 2050 Logo', href: 'https://connecteddata.nationalgrid.co.uk/dataset/net-zero-south-wales-2050' },
    ];

    // Arrays for researchers and academics
    const researchers = ['Alexandre Canet', 'Ali Al-Wakeel', '‎'];
    const academics = ['Meysam Qadrdan', 'Nick Jenkins', 'Jianzhong Wu'];

    // ListItem functional component
    // eslint-disable-next-line react/prop-types
    function ListItem({ name }) {
        return <li>{name}</li>;
    }

    // Function to check if the user is logged in
    const isLoggedIn = () => {
        // Check if the user has a valid JWT token or any other criteria
        // Return true if logged in, false otherwise
        // For example, you can use localStorage or sessionStorage to store the token
        const token = localStorage.getItem('jwtToken');
        return !!token; // Convert to boolean
    };

    // Render method for the LandingPage component
    return (
        <div className="landing-page">
            <Header />
            {isLoggedIn() && <RegisterRequest />} {/* Render RegisterRequest only if the user is logged in */}
            <main>
                {/* Displaying logos with links */}
                <div>
                    {logos.map((logo, index) => (
                        <a key={index} href={logo.href} target="_blank" rel="noreferrer">
                            <img src={logo.src} className="logo" alt={logo.alt} />
                        </a>
                    ))}
                </div>
                {/* About Us section */}
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
                    {/* Team section */}
                    <h3>Team</h3>
                    <div className="container">
                        {/* Researchers list */}
                        <div className="list">
                            <h2>Researchers</h2>
                            <ul>
                                {researchers.map((name, index) => (
                                    <ListItem key={index} name={name} />
                                ))}
                            </ul>
                        </div>
                        {/* Academics list */}
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
                {/* Contact Us Form component */}
                <ContactUsForm />
            </main>
            {/* Footer component */}
            <Footer />
        </div>
    );
}
