
import Header from "../Header.jsx";
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu.jsx";
import ResistanceHeatersProducedAndConsumed from "../components/graphs/ResistanceHeatersProducedAndConsumed.jsx";
export default function ResistanceHeatersPage() {

    return(
        <>
            <Header></Header>
            <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
            <h3>Half-hourly heat production and electricity consumption profiles for Resistance heaters</h3>
            <ResistanceHeatersProducedAndConsumed></ResistanceHeatersProducedAndConsumed>
        </>
    )

}