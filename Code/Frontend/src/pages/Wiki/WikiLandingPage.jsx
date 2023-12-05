import Header from '../../Header';
import Footer from '../../Footer';
import '../../css/WikiPage.css';
import '../../css/LandingPage.css';
import 'react-toastify/dist/ReactToastify.css';
import WikiDropDownMenu from "../../components/WikiDropDownMenu"
import WikiHeatDemand from "../../pages/Wiki/WikiHeatDemand"
import WikiHeatBreakDown from "../../pages/Wiki/WikiHeatBreakDown"
// Import necessary hooks and React itself from the react package.
import React, { useRef, useState, useEffect } from 'react';


export default function WikiLandingPage() {

    const [selectedDataset, setSelectedDataset] = useState(null);

    const handleDatasetChange = (dataset) => {
        setSelectedDataset(dataset);
    };

    const renderSelectedDataset = () => {
        switch (selectedDataset) {
            case 'Heat demand before and after energy efficiency measures':
                return <WikiHeatDemand />;
            case 'Breakdown of heat demand before energy efficiency measures for each region':
                return <WikiHeatBreakDown />;
            default:
                return null;
        }
    };

    return (
        <div className="landing-page">
            <Header />
            <main>
                <div className="wiki-page">
                    <p>
                        Here you can find information about the type of datasets used within our website 
                        and explanation on the terms used. 
                    </p>
                    <p>
                        Please use the drop-down below to go the wiki section
                        for a specific data set and it's graphs:
                    </p>
                    <WikiDropDownMenu onDatasetChange={handleDatasetChange} />
                    {renderSelectedDataset()}
                </div>
            </main>
        </div>
    );
}