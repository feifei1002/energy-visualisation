import React from 'react';
import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import {useEffect, useRef, useState} from "react";
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu.jsx";
import LoadingGif from "../assets/LoadingGif.gif";
import HeatEfficiencyBeforeHeatMap from "../components/graphs/HeatEfficiencyBeforeHeatMap.jsx";
import LocalAuthorityDropDownMenu from "../components/LocalAuthorityDropDownMenu.jsx";
import BreakDownOfImprovementCostsDwellings from "../components/graphs/BreakDownOfImprovementCostsDwelling.jsx";
import BreakDownOfImprovementCostsHeatTechnology from "../components/graphs/BreakDownOfImprovementCostsHeatTechnology.jsx";

export default function ImprovementCostsPage() {
    // useRef hook to persist the loading state without triggering re-renders.
    const loadingRef = useRef(false);
    // useState hooks to manage the state of the data for the page.
    const [heatData, setHeatData] = useState(null);
    const [costData, setCostData] = useState(null);
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [error, setError] = useState(null);
    const [uniqueLocalAuthorities, setUniqueLocalAuthorities] = useState(null);
    const [selectedAuthority, setSelectedAuthority] = useState(null);

    // useEffect hook to load data.
    useEffect(() => {
        // Condition to prevent data from being loaded more than once.
        if (loadingRef.current) return;
        loadingRef.current = true;

        async function fetchData() {
            try {
                const improvementCostResponse = await fetch('http://localhost:8082/data/efficiencyimprovementcosts');
                const heatDataResponse = await fetch('http://localhost:8082/data/annualheat');
                const geoJsonResponse = await fetch('http://localhost:8082/data/geojson');

                if (!improvementCostResponse.ok || !geoJsonResponse.ok || !heatDataResponse.ok) throw new Error('Data fetch failed');

                const improvementData = await improvementCostResponse.json();
                const heatData = await heatDataResponse.json();
                const geoData = await geoJsonResponse.json();

                setCostData(improvementData);
                setHeatData(heatData)
                setGeoJsonData(geoData);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                loadingRef.current = false; // Update loading state
            }
        }

        fetchData();

    }, []);

        useEffect(() => {
            if (costData) {
                // Extract the list of local authorities
                const localAuthorities = costData.map(entry => entry["Local Authority (2019)"]);

                // Remove duplicate entries and set the unique local authorities state.
                const uniqueAuthorities = Array.from(new Set(localAuthorities));
                setUniqueLocalAuthorities(uniqueAuthorities.sort()); //Sort in alphabetical order

                // Select "Adur" by default if it exists in the data
                if (!selectedAuthority && uniqueAuthorities.includes("Adur")) {
                    setSelectedAuthority("Adur");
                } else if (!selectedAuthority && uniqueAuthorities.length > 0) {
                    setSelectedAuthority(uniqueAuthorities[0]);
                }
            }
        }, [costData]);

        // Callback function to handle authority selection.
        const handleSelectAuthority = (newAuthority) => {
            // Update the selected authority state and trigger re-rendering.
            setSelectedAuthority(newAuthority);
        };

        // Conditional rendering based on the state of the data and any error.
        if (error) {
            // Render an error message if there is an error.
            return <div>Error: {error}</div>;
        }

        // Styling for this page
        const pageStyle = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        };

        // Drop down style for this page
        const dropdownStyle = {
            padding: '1em', // Padding inside the sidebar
            overflowY: 'auto', // Scroll vertically if content overflows
        };

        // Styling for each pie chart
        const pieStyle = {
            display: 'block',
            marginTop: '2vh',
            width: '100%', // Suitable percentage for responsiveness
            margin: 'auto', // Center the charts
        };
        // Render a loading state if the data has not been loaded yet.
        if (!heatData || !geoJsonData || !costData) {
            return (
                <>
                    <Header/>
                    <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: 'stretch',
                        boxSizing: 'border-box',
                    }}>
                        <div style={{flex: 1, padding: '0', margin: '0.5em', boxSizing: 'border-box'}}>
                            <p style={{
                                fontSize: '24px',
                                fontWeight: 'bold',
                                margin: '0 0 20px 0',
                                color: '#333'
                            }}>Getting your data...</p>
                            <img
                                src={LoadingGif}
                                alt="Loading..."
                                style={{
                                    width: '50px',
                                    height: '50px'
                                }}
                            />
                        </div>
                    </div>
                </>
            );
        } else {
            // Render the main content of the page if the data is available.
            return (
                <>
                    <Header/>
                    <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
                    <div style={pageStyle}>
                        <div style={dropdownStyle}>
                            <h3>Breakdown of heat demand before energy efficiency measures for {selectedAuthority}</h3>
                            {uniqueLocalAuthorities && (<LocalAuthorityDropDownMenu
                                authorities={['All Authorities', ...uniqueLocalAuthorities]}
                                selectedAuthority={selectedAuthority}
                                onSelectAuthority={handleSelectAuthority}
                            />)}
                        </div>
                    </div>
                    <div style={pageStyle}>
                        <div>
                            <div style={pieStyle}>
                                <h5>Breakdown of Energy Efficiency Improvement Costs by Heating Technology
                                    for {selectedAuthority} (£)</h5>
                                {/* Pass necessary props to the child component */}
                                <BreakDownOfImprovementCostsHeatTechnology
                                    costData={costData}
                                    localAuthority={selectedAuthority === 'All' ? null : selectedAuthority}
                                />
                            </div>
                            <div style={pieStyle}>
                                <h5>Breakdown of Energy Efficiency Improvement Costs by dwelling type
                                    for {selectedAuthority} (£)</h5>
                                {/* Pass necessary props to the child component */}
                                <BreakDownOfImprovementCostsDwellings
                                    costData={costData}
                                    localAuthority={selectedAuthority === 'All' ? null : selectedAuthority}
                                />
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </>
            );
        }
    }