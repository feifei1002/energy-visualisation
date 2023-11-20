import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from 'react';
export default function VisualisationsDropdownMenu() {
    const data = [
        { name: 'Heat demand before and after energy efficiency measures', link: '/visualisations/beforeafterheatdemand'},
        { name: 'Breakdown of heat demand before energy efficiency measures for each region', link: '/visualisations/heatdemandbreakdown' },
        { name: 'Breakdown of energy efficiency improvement costs', link: '/visualisations/graph3'},
        { name: 'Half-hourly heat production and gas consumption profiles - Gas boilers', link: '/visualisations/graph4'},
        { name: 'Half-hourly heat production and gas consumption profiles - Resistance heaters', link: '/visualisations/halfhourlyresistanceheaters' },
        { name: 'Summary of heat demand data across England, Wales and Scotland', link: '/visualisations/graph6' }
    ];
    //The /visualisation/graph link is just to make sure everything works
    //Please replace the link with the actual graph link later


    const [dropdown, setDropdown] = useState('Visualisation Graphs');

    const handleDropdownChange = (title) => {
        setDropdown(title)
    }

    return (
        <>
            <DropdownButton id="dropdown-basic-button" key="dropdown-button" drop="down-centered" title={dropdown} style={{paddingTop: "1em"}}>
                {data.map((d) =>
                    <Dropdown.Item class="dropdown-item" key={d.name} href={d.link} onClick={() => handleDropdownChange(d.name)}>{d.name}</Dropdown.Item>)}
                </DropdownButton>

        </>
    );
}