import React, {useEffect, useState} from "react";
import Header from "../Header.jsx";
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu.jsx";
import LoadingGif from "../assets/LoadingGif.gif";


export default function GasBoilersPage() {
    // set variables for heat data
    const [heatData, setHeatData] = useState(null);

    // fetch data from the half-hourly profiles csv
    useEffect(() => {
        const fetchHeatData = async () => {
            // error handling for fetching csv data
            try {
                // fetch from the backend
                const fetchDataResonse = await fetch('http://localhost:8082/data/halfhourlyheatingprofile');
                // set the response to json
                const jsonResponse = await fetchDataResonse.json();
                setHeatData(jsonResponse);
            } catch (e) {
                console.error("Error fetching data: ", e);
            }
        };
        fetchHeatData();
    }, []);

    // error handling for displaying heat data
    if(!heatData) {
        // when no heat profile data loaded yet
        return (
            <>
                {/*add default header and dropdown menu for visualisation graphs*/}
                <Header />
                <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
                {/*uses the same styling as other graph pages, to keep it consistent*/}
                <div style={{display: 'flex', flexDirection: 'row', width: '100%', alignItems: 'stretch', boxSizing: 'border-box'}}>
                    <div style={{flex: 1, padding: '0', margin: '0.5em', boxSizing: 'border-box' }}>
                        <p style={{fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#333'}}>Getting your data...</p>
                        {/*gif to show data is loading*/}
                        <img src={LoadingGif} alt="Loading..." style={{width: '50px', height: '50px'}}/>
                    </div>
                </div>
            </>
        )
    } else {
        // there is heat data
        return (
            <>
                {/*default header and dropdown menu for graphs*/}
                <Header />
                <VisualisationsDropdownMenu></VisualisationsDropdownMenu>

                <p>Graphs go here!</p>
            </>
        )
    }


}