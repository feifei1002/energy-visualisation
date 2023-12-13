// Importing necessary React components and styles
import React, { useEffect, useRef, useState } from 'react';
import Header from '../Header.jsx';
import Footer from '../Footer.jsx';
import VisualisationsDropdownMenu from '../components/VisualisationsDropdownMenu.jsx';
import LoadingGif from '../assets/LoadingGif.gif';
import LocalAuthorityDropDownMenu from '../components/LocalAuthorityDropDownMenu.jsx';
import BreakDownOfImprovementCostsDwellings from '../components/graphs/BreakDownOfImprovementCostsDwelling.jsx';
import BreakDownOfImprovementCostsHeatTechnology from '../components/graphs/BreakDownOfImprovementCostsHeatTechnology.jsx';
import InfoToolTip from '../components/InfoToolTip.jsx';
import downloadCSV from '../helperFunctions/downloadCSV.js';

// ImprovementCostsPage component definition
export default function ImprovementCostsPage() {
    // Ref for tracking loading state
    const loadingRef = useRef(false);
    // State variables for holding data and managing the selected local authority
    const [heatData, setHeatData] = useState(null);
    const [costData, setCostData] = useState(null);
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [uniqueLocalAuthorities, setUniqueLocalAuthorities] = useState(null);
    const [error, setError] = useState(null);
    const [selectedAuthority, setSelectedAuthority] = useState(null);
    const [totalImprovementCosts, setTotalImprovementCosts] = useState(null);
    const [averageCostsPerDwelling, setAverageCostsPerDwelling] = useState(null);

    // Function to fetch data from APIs
    const fetchData = async () => {
        try {
            // Fetching improvement, heat, and geojson data concurrently
            const [improvementData, heatData, geoData] = await Promise.all([
                fetch('http://localhost:8082/data/efficiencyimprovementcosts').then((res) => res.json()),
                fetch('http://localhost:8082/data/annualheat').then((res) => res.json()),
                fetch('http://localhost:8082/data/geojson').then((res) => res.json()),
            ]);

            // Setting state with fetched data
            setCostData(improvementData);
            setHeatData(heatData);
            setGeoJsonData(geoData);
        } catch (error) {
            console.error('Error fetching data:', error);
            setError('Data fetch failed');
        } finally {
            loadingRef.current = false; // Update loading state
        }
    };

    // useEffect to trigger data fetching when the component mounts
    useEffect(() => {
        if (!loadingRef.current) {
            loadingRef.current = true;
            fetchData();
        }
    }, []);

    // useEffect to calculate total improvement costs and average costs per dwelling when costData or selectedAuthority changes
    useEffect(() => {
        if (costData) {
            // Extracting the list of local authorities
            const localAuthorities = costData.map((entry) => entry["Local Authority (2019)"]);

            // Removing duplicate entries and setting the unique local authorities state
            const uniqueAuthorities = Array.from(new Set(localAuthorities));
            setUniqueLocalAuthorities(uniqueAuthorities.sort()); // Sorting in alphabetical order

            // Selecting "Adur" by default if it exists in the data, or the first authority in the list
            if (!selectedAuthority && uniqueAuthorities.includes("Adur")) {
                setSelectedAuthority("Adur");
            } else if (!selectedAuthority && uniqueAuthorities.length > 0) {
                setSelectedAuthority(uniqueAuthorities[0]);
            }

            // Filtering data based on the selected authority
            const selectedAuthorityData = costData.filter(
                (data) => data['Local Authority (2019)'] === selectedAuthority
            );

            const filteredData = selectedAuthority === 'All Authorities' ? costData : selectedAuthorityData;

            // Calculating total improvement costs
            const totalCosts = filteredData.reduce(
                (acc, curr) => {
                    Object.keys(curr).forEach((key) => {
                        if (key.includes('Total energy efficiency improvements costs (GBP)')) {
                            acc.total += parseFloat(curr[key] || 0);
                            acc.count += 1;
                        }
                    });
                    return acc;
                },
                { total: 0, count: 0 }
            );

            // Calculating average costs per dwelling
            const averageCosts = ['detached', 'flat', 'semi-detached', 'terraced'].reduce(
                (acc, dwellingType) => {
                    ['gas boiler', 'oil boiler', 'resistance heating', 'biomass boiler'].forEach(
                        (heatTechnology) => {
                            const averageKey = `Average energy efficiency improvements costs of ${dwellingType} ${heatTechnology} (GBP)`;
                            const totalDwellingValue = filteredData.reduce(
                                (total, curr) => total + parseFloat(curr[averageKey] || 0),
                                0
                            );
                            const averageDwellingValue = totalDwellingValue / filteredData.length;
                            acc.total += averageDwellingValue;
                            acc.count += 1;
                        }
                    );
                    return acc;
                },
                { total: 0, count: 0 }
            );

            // Setting total improvement costs and average costs per dwelling state
            const totalAverageCosts = averageCosts.total;
            setTotalImprovementCosts(totalCosts.total.toFixed(2));
            setAverageCostsPerDwelling(totalAverageCosts.toFixed(2));
        }
    }, [costData, selectedAuthority]);

    // Function to handle the selection of a new local authority
    const handleSelectAuthority = (newAuthority) => {
        setSelectedAuthority(newAuthority);
    };

    // Styles for page elements
    const pageStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    };

    const dropdownStyle = {
        padding: '1em',
        overflowY: 'auto',
    };

    const pieStyle = {
        display: 'block',
        marginTop: '2vh',
        width: '100%',
        margin: 'auto',
    };

    // Handling error state
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Handling loading state
    if (!heatData || !geoJsonData || !costData) {
        return (
            <>
                <Header />
                <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
                <div style={{ display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'stretch', boxSizing: 'border-box' }}>
                    <div style={{ flex: 1, padding: '0', margin: '0.5em', boxSizing: 'border-box' }}>
                        <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#333' }}>Getting your data...</p>
                        <img src={LoadingGif} alt="Loading..." style={{ width: '50px', height: '50px' }} />
                    </div>
                </div>
            </>
        );
    }

    // Rendering the ImprovementCostsPage component
    return (
        <>
            <Header />
            <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
            <div>
                {/* Button to download CSV */}
                <button
                    style={{ background: '#206887', borderColor: '#206887', color: 'white', padding: '10px', marginTop: '1vh' }}
                    onClick={() => downloadCSV(costData, 'Energy_efficiency_improvements_costs_LA.csv')}
                >
                    Download CSV
                </button>
            </div>
            <div><InfoToolTip dataset={'Breakdown of Energy Efficiency Improvement Costs'} /></div>
            {/* Page content */}
            <div style={pageStyle}>
                <div style={dropdownStyle}>
                    <h3>Breakdown of energy efficiency improvement costs for {selectedAuthority}</h3>
                    {/* Dropdown menu for selecting local authority */}
                    {uniqueLocalAuthorities && (
                        <LocalAuthorityDropDownMenu
                            authorities={['All Authorities', ...uniqueLocalAuthorities]}
                            selectedAuthority={selectedAuthority}
                            onSelectAuthority={handleSelectAuthority}
                        />
                    )}
                </div>
            </div>
            <div>
                {/* Displaying total and average improvement costs per dwelling */}
                {totalImprovementCosts !== null && (
                    <div style={{ textAlign: 'center', marginTop: '1vh' }}>
                        <p>
                            The Total Energy Efficiency Improvement Costs for {selectedAuthority} (GDP): £
                            {parseFloat(totalImprovementCosts).toLocaleString('en-GB', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                )}
                {averageCostsPerDwelling !== null && (
                    <div style={{ textAlign: 'center', marginTop: '1vh' }}>
                        <p>
                            The Average Energy Efficiency Improvement Costs for {selectedAuthority} (GDP): £
                            {parseFloat(averageCostsPerDwelling).toLocaleString('en-GB', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                            })}
                        </p>
                    </div>
                )}
            </div>
            <div>
                {/* Displaying pie charts for improvement costs per heating technology and dwelling type */}
                <div style={pageStyle}>
                    <div style={pieStyle}>
                        <h5>Breakdown of the Average Energy Efficiency Improvement Costs per Heating Technology for {selectedAuthority} (£)</h5>
                        <BreakDownOfImprovementCostsHeatTechnology costData={costData} localAuthority={selectedAuthority === 'All' ? null : selectedAuthority} />
                        <h5>Breakdown of the Average Energy Efficiency Improvement Costs per dwelling type for {selectedAuthority} (£)</h5>
                        <BreakDownOfImprovementCostsDwellings costData={costData} localAuthority={selectedAuthority === 'All' ? null : selectedAuthority} />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}
