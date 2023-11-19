
import Header from "../Header.jsx";
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu.jsx";
import ResistanceHeatersProducedAndConsumed from "../components/graphs/ResistanceHeatersProducedAndConsumed.jsx";
import ElectricityDemandForHeatPumps from "../components/graphs/ElectricityDemandForHeatPumps.jsx";
import {useEffect, useState} from "react";
export default function ResistanceHeatersPage() {
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

    return(
        <>
            <Header></Header>
            <VisualisationsDropdownMenu></VisualisationsDropdownMenu><br></br>
            <h3>Half-hourly heat production and electricity consumption profiles for Resistance heaters</h3>
            <ResistanceHeatersProducedAndConsumed data={heatData}></ResistanceHeatersProducedAndConsumed><br></br>

            <h3>Half-hourly electricity demand for heat pumps and gas/hydrogen demand for boilers</h3>
            <ElectricityDemandForHeatPumps data={heatData}></ElectricityDemandForHeatPumps>

        </>
    )

}