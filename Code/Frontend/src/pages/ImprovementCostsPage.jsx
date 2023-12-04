import Header from "../Header.jsx";
import Footer from "../Footer.jsx";
import {useEffect, useRef, useState} from "react";
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu.jsx";
import LoadingGif from "../assets/LoadingGif.gif";
import HeatEfficiencyBeforeHeatMap from "../components/graphs/HeatEfficiencyBeforeHeatMap.jsx";

export default function ImprovementCostsPage() {
    const [improvementData, setImprovementData] = useState(null);
    // A console log for debugging purposes.
    console.log('beforeAfterHeatDemandPage');
    // useRef hook to persist the loading state without triggering re-renders.
    const loadingRef = useRef(false);
    // useState hooks to manage the state of the data for the page.
    const [heatData, setHeatData] = useState(null);
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [error, setError] = useState(null);

    // useEffect hook to remove padding and margin from the body when the component mounts.
    useEffect(() => {
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        // Cleanup function to reset the body styles when the component unmounts.
        return () => {
            document.body.style.margin = '';
            document.body.style.padding = '';
        };
    }, []);

    // useEffect hook to load data.
    useEffect(() => {
        // Condition to prevent data from being loaded more than once.
        if (loadingRef.current) return;
        loadingRef.current = true;

        const fetchImprovementData = async () => {
            try {
                const fetchDataResponse = await fetch('http://localhost:8082/data/efficiencyimprovementcosts');
                const jsonData = await fetchDataResponse.json();
                setImprovementData(jsonData);
            } catch (error) {
                console.error("Error occurs when fetching improvement data", error);
            }
        };

        // Asynchronous function to fetch annual heat data from a local server.
        const fetchHeatData = async () => {
            console.log('fetchHeatData...');
            try {
                // Attempt to fetch the data using the Fetch API.
                const response = await fetch('http://localhost:8082/data/annualheat', { cache: 'force-cache' });
                // Throw an error if the response is not OK to handle it in the catch block.
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // If the response is ok, parse the JSON and set the heat data state.
                const fetchedData = await response.json();
                setHeatData(fetchedData);
            } catch (e) {
                // Catch any errors, log them, and set the error state.
                setError(e.message);
                console.error("Fetching annual heat data failed", e);
            }
        };

        // Asynchronous function to fetch GeoJSON data.
        const fetchGeoJsonData = async () => {
            console.log('fetchGeoJsonData...');
            try {
                const response = await fetch('http://localhost:8082/data/geojson', { cache: 'force-cache' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const fetchedData = await response.json();
                setGeoJsonData(fetchedData);
            } catch (e) {
                setError(e.message);
                console.error("Fetching GeoJSON data failed", e);
            }
        };

        // Trigger the data fetching functions.
        fetchHeatData();
        fetchImprovementData();
        fetchGeoJsonData();
    }, []);

    // Conditional rendering based on the state of the data and any error.
    if (error) {
        // Render an error message if there is an error.
        return <div>Error: {error}</div>;
    }
    // Render a loading state if the data has not been loaded yet.
    if (!improvementData || !heatData || !geoJsonData) {
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
            <div>
                <Header />
                <VisualisationsDropdownMenu/>
                <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    width: '100%',
                    alignItems: 'stretch',
                    boxSizing: 'border-box',
                    flexWrap: 'wrap'
                }}></div>
                {/* Heat maps showing data before efficiency measures */}
                <div style={{ flex: 1, padding: '0', margin: '0.5em', boxSizing: 'border-box', minWidth: '500px' }}>
                    <HeatEfficiencyBeforeHeatMap heatData={heatData} geoJsonData={geoJsonData} />
                </div>
                <Footer/>
            </div>
        )
    }
}
