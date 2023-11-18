
import Header from "../Header.jsx";
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu.jsx";
import ResistanceHeatersProducedAndConsumed from "../components/graphs/ResistanceHeatersProducedAndConsumed.jsx";
import ElectricityDemandForHeatPumps from "../components/graphs/ElectricityDemandForHeatPumps.jsx";
export default function ResistanceHeatersPage() {

    return(
        <>
            <Header></Header>
            <VisualisationsDropdownMenu></VisualisationsDropdownMenu><br></br>
            <h3>Half-hourly heat production and electricity consumption profiles for Resistance heaters</h3>
            <ResistanceHeatersProducedAndConsumed></ResistanceHeatersProducedAndConsumed><br></br>
            <h3>Half-hourly electricity demand for heat pumps and gas/hydrogen demand for boilers</h3>
            <ElectricityDemandForHeatPumps></ElectricityDemandForHeatPumps>
        </>
    )

}