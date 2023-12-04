import React, {useEffect, useRef, useState} from "react";
import Header from "../Header.jsx";
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu.jsx";
import LoadingGif from "../assets/LoadingGif.gif";
import GasConsumedAndElectricityDemand from "../components/graphs/GasConsumedAndElectricityDemand.jsx"

// page which loads the half-hourly data and then outputs a graph
export default function GasBoilersPage() {
    // set variables for heat data
    const [heatData, setHeatData] = useState(null);

    // useRef hook to persist the loading state without triggering re-renders.
    const loadingRef = useRef(false);

    // useEffect hook to fetch data from the half-hourly profiles csv
    useEffect(() => {
        // condition to prevent data from being loaded more than once
        if (loadingRef.current) return;
        loadingRef.current = true;

        const fetchHeatData = async () => {
            // error handling for fetching csv data
            console.log("fetching hourly heat data");
            try {
                // fetch from the backend
                const fetchDataResonse = await fetch('http://localhost:8082/data/halfhourlyheatingprofile', { cache: "force-cache" });

                console.log("fetched graph data")
                if (!fetchDataResonse.ok) {
                    throw new Error(`HTTP error, status: ${fetchDataResonse.status}`);
                }
                // set the response to json
                const jsonResponse = await fetchDataResonse.json();
                setHeatData(jsonResponse);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };

        // trigger data fetching functions
        fetchHeatData();
    }, []);

    // error handling for displaying heat data
    if(!heatData) {
        // when no heat profile data loaded yet
        return (
            <>
                {/* default header and dropdown menu for visualisation graphs */}
                <Header />
                <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
                {/* uses the same styling as other graph pages, to keep it consistent */}
                <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'stretch', boxSizing: 'border-box'}}>
                    <div style={{flex: 1, padding: '0', margin: '0.5em', boxSizing: 'border-box' }}>
                        <p style={{fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#333'}}>Getting your data...</p>
                        {/* gif to show data is loading */}
                        <img src={LoadingGif} alt="Loading..." style={{width: '50px', height: '50px'}}/>
                    </div>
                </div>
            </>
        )
    } else {
        // when there is heat data
        return (
            <>
                {/* default header and dropdown menu for graphs */}
                <Header />
                <VisualisationsDropdownMenu></VisualisationsDropdownMenu><br/><br/>

                {/* title for graph */}
                <h3>Breakdown of Hourly Temperature, Electricity Consumption for Heat Pumps, and Gas Consumption for Gas Boilers</h3>
                {/* heat produced graphs here*/}
                {/* minimum width for graph set so it can load on a mobile device correctly */}
                <div style={{ flex: 1, padding: '0', minWidth: '320px' }}>
                    <GasConsumedAndElectricityDemand data={heatData}/>
                </div>
            </>
        )
    }


}