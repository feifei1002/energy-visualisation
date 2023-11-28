import React, { useRef, useState, useEffect } from 'react';
//import all graph components that will be used to display data visualizations.
import HeatDemandHeatMap from '../components/graphs/HeatDemandHeatMap';
import HeatDemandBarChart from '../components/graphs/HeatDemandBarChart';
import HeatDemandTable from '../components/tables/HeatDemandTable';
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu";
import Header from "../Header";
import LoadingGif from "../assets/LoadingGif.gif";

//this is the main component function that will be exported and used to display the page.
export default function SummaryOfHeatDemandPage() {
    //console logs for debugging
    console.log('SummaryOfHeatDemandPage');
    // useRef hook to persist the loading state without triggering re-renders.
    const loadingRef = useRef(false);
    // useState hooks to manage the state of the data for the page.
    const [heatDemandData, setHeatDemandData] = useState(null);
    const [error, setError] = useState(null);

    // useEffect hook to load data.
    useEffect(() => {
        //guardian clause to prevent data from being loaded more than once.
        if (loadingRef.current) return;
        loadingRef.current = true;

        //asynchronous function that fetches heat demand data.
        const fetchHeatDemandData = async () => {
            console.log('fetchHeatDemandData...');
            try {
                // Fetch data for England, Wales, and Scotland
                const responses = await Promise.all([
                    fetch('http://localhost:8082/data/annualheat'),
                    fetch('http://localhost:8082/data/residentialheat')
                ]);

                // Check if all responses are ok
                if (!responses.every(response => response.ok)) {
                    throw new Error('HTTP error while fetching data');
                }

                // Parse the responses as JSON
                const data = await Promise.all(responses.map(response => response.json()));
                setHeatDemandData(data);
            } catch (e) {
                setError(e.message);
                console.error("Fetching heat demand data failed", e);
            }
        };

        //trigger data fetching function.
        fetchHeatDemandData();
    }, []);

    //conditionally rendering based on the state of the data and any error.
    if (error) {
        //show an error message if there is an error.
        return <div>Error: {error}</div>;
    }

    //render loading state if the data has not been loaded yet.
    if (!heatDemandData) {
        return (
            <>
                <Header />
                <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                    <img src={LoadingGif} alt="Loading..." />
                </div>
            </>
        );
    } else {
        //render main content of the page if the data is available.
        return (
            <>
                <Header />
                <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <HeatDemandHeatMap data={heatDemandData} />
                    <HeatDemandBarChart data={heatDemandData} />
                    <HeatDemandTable data={heatDemandData} />
                </div>
            </>
        );
    }
}
