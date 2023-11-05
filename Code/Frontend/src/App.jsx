//import { useState } from 'react'
import UkriLogo from './assets/UkriLogo1.png'
import FlexisLogo from './assets/FlexisLogo2.png'
import CardiffUniLogo from './assets/CardiffUniLogo.png'
import UkercLogo from './assets/UkercLogo.png'
import Zero2025 from './assets/Zero2050Logo.png'
// import CiregsLogo from './assets/CiregsLogo.png'
// import HeaderPic from './assets/HeaderPic.png'
import './App.css'

function App() {
    
    return (
        <div className="landing-page">
            <header>
                <div className="navbar-title">
                    <h1>Modular Heat and Cooling Report</h1>
                </div>
                <nav className="navbar">
                    {/*<a href="https://www.linkedin.com/showcase/centre-for-integrated-renewable-energy-generation-and-supply-ciregs-" target="_blank" rel="noreferrer">*/}
                    {/*    <img src={CiregsLogo} alt="CIREGS Logo" />*/}
                    {/*</a>*/}
                    <ul className="nav-links">
                        <a href="/about">About</a>
                        <a href="/visualizations">Visualizations</a>
                    </ul>
                    <ul className="login">
                        <a href="/login">Login</a>
                    </ul>
                    {/*<a target="_blank" rel="noreferrer">*/}
                    {/*    <img src={HeaderPic} alt="CIREGS Logo" />*/}
                    {/*</a>*/}
                </nav>
            </header>
            <main>
                <div>
                    <a href="https://www.cardiff.ac.uk/" target="_blank" rel="noreferrer">
                        <img src={CardiffUniLogo} className="logo" alt="Cardiff University Logo" />
                    </a>
                    <a href="https://www.ukri.org/" target="_blank" rel="noreferrer">
                        <img src={UkriLogo} className="logo" alt="Ukri Logo" />
                    </a>
                    <a href="https://ukerc.rl.ac.uk/index.html#" target="_blank" rel="noreferrer">
                        <img src={UkercLogo} className="logo" alt="Ukerc Logo" />
                    </a>
                    <a href="https://www.flexis.wales/" target="_blank" rel="noreferrer">
                        <img src={FlexisLogo} className="logo" alt="Flexis Logo" />
                    </a>
                    <a href="https://connecteddata.nationalgrid.co.uk/dataset/net-zero-south-wales-2050" target="_blank" rel="noreferrer">
                        <img src={Zero2025} className="logo" alt="Zero 2050 Logo" />
                    </a>
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
                                <li>Alexandre Canet</li>
                                <li>Ali Al-Wakeel</li>
                                <li>_</li>
                            </ul>
                        </div>
                        <div className="list">
                            <h2>Academics</h2>
                            <ul>
                                <li>Meysam Qadrdan</li>
                                <li>Nick Jenkins</li>
                                <li>Jianzhong Wu</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </main>

            <footer>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>
            </footer>
        </div>
    );
}

export default App;