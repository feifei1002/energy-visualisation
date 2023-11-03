import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from 'react';

export default function VisualisationsDropdownMenu() {
    const data = [{ name: 'Heat demand before and after energy efficiency measures'},
        { name: 'Breakdown of heat demand before and after energy efficiency measures'},
        { name: 'Breakdown of energy efficiency improvement costs' },
        { name: 'Half-hourly heat production and gas consumption profiles - Gas boilers' },
        { name: 'Half-hourly heat production and gas consumption profiles - Resistance heaters'},
        { name: 'Summary of heat demand data across England, Wales and Scotland' }];

    const [dropdown, setDropdown] = useState('Visualisation Graphs');

    const handleDropdownChange = (title) => {
        setDropdown(title)
    }
    return (
        <>
            <DropdownButton id="dropdown-basic-button" key="dropdown-button" drop="down-centered" title={dropdown}>
                {data.map((d) => <Dropdown.Item key={d.name} href="#" onClick={() => handleDropdownChange(d.name)}>{d.name}</Dropdown.Item>)}
             </DropdownButton>

        </>
    );
}