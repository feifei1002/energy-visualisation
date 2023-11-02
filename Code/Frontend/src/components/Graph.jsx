import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
export default function Graph() {

    return (
        <>
        <DropdownButton id="dropdown-basic-button" drop="down-centered" title="Visualisation Graphs">
            <Dropdown.Item href="#">Heat demand before and after energy efficiency measures</Dropdown.Item>
            <Dropdown.Item href="#">Breakdown of heat demand before and after energy efficiency measures</Dropdown.Item>
            <Dropdown.Item href="#">Breakdown of energy efficiency improvement costs</Dropdown.Item>
            <Dropdown.Item href="#">Half-hourly heat production and gas consumption profiles - Gas boilers</Dropdown.Item>
            <Dropdown.Item href="#">Half-hourly heat production and gas consumption profiles - Resistance heaters</Dropdown.Item>
            <Dropdown.Item href="#">Summary of heat demand data across England, Wales and Scotland</Dropdown.Item>
            </DropdownButton>

        </>
    );
}