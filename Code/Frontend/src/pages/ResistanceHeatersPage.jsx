import Header from "../Header.jsx";
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu.jsx";
import ResistanceHeatersHeatProduced from "../components/graphs/ResistanceHeatersHeatProduced.jsx";
import ResistanceHeatersHeatConsumed from "../components/graphs/ResistanceHeatersHeatConsumed.jsx";
export default function ResistanceHeatersPage() {

    return(
        <>
            <Header></Header>
            <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
            <h3>Half-hourly heat production and electricity consumption profiles - Resistance heaters</h3>
            <ResistanceHeatersHeatProduced></ResistanceHeatersHeatProduced>
            <ResistanceHeatersHeatConsumed></ResistanceHeatersHeatConsumed>
        </>
    )

}