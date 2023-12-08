import Header from "../Header.jsx";
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu.jsx";
import ResistanceHeatersProducedAndConsumed from "../components/graphs/ResistanceHeatersProducedAndConsumed.jsx";
import ElectricityDemandForHeatPumps from "../components/graphs/ElectricityDemandForHeatPumps.jsx";
import {useEffect, useState} from "react";
import LoadingGif from "../assets/LoadingGif.gif";

//analytics tracking
import trackEvent from '../utils/analytics';

export default function ResistanceHeatersPage() {

    //analytics tracking
    const [userLocation, setUserLocation] = useState(null);

    navigator.geolocation.getCurrentPosition((position) => {
        const location = `${position.coords.latitude}, ${position.coords.longitude}`;
        setUserLocation(location); // This will update the state
    });
    //log user viewing page, need to add the dataname and download csv log when download function is added.
    const pageUrl = window.location.href;
    if (userLocation !== null){
        trackEvent('DataView', null, pageUrl, userLocation);
    }



    const [heatData, setHeatData] = useState(null);

    //fetch all the data from the CSV
    useEffect(() => {
        const fetchHeatData = async () => {
            try {
                const fetchDataResponse = await fetch('http://localhost:8082/data/halfhourlyheatingprofile');
                const jsonData = await fetchDataResponse.json();
                setHeatData(jsonData);
            } catch (error) {
                console.error("Error occurs when fetching data", error);
            }
        };
        fetchHeatData();
    }, []);

    if(!heatData) {
        return (
        <>
        <Header></Header>
        <VisualisationsDropdownMenu></VisualisationsDropdownMenu><br></br>
            <p style={{fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#333'}}>
                Getting your data</p>
            <img src={LoadingGif} alt="Loading..." style={{width: '50px', height: '50px'}}></img>
        </>)
    } else {
        return (
            <>
                <Header></Header>
                <VisualisationsDropdownMenu></VisualisationsDropdownMenu><br></br>
                <h3>Hourly heat production and electricity consumption profiles for Resistance heaters</h3>
                <ResistanceHeatersProducedAndConsumed data={heatData}></ResistanceHeatersProducedAndConsumed><br></br>
                <br></br>
                <br></br>
                <h3>Hourly electricity demand for heat pumps and gas/hydrogen demand for boilers</h3>
                <ElectricityDemandForHeatPumps data={heatData}></ElectricityDemandForHeatPumps>
            </>
        )
    }
}