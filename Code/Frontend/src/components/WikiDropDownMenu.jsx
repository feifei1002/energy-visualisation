import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { useState } from 'react';

export default function WikiDropdownMenu({onDatasetChange}) {
    const data = [
        { name: 'Heat demand before and after energy efficiency measures'},
        { name: 'Breakdown of heat demand before energy efficiency measures for each region'},
        { name: 'Breakdown of energy efficiency improvement costs'},
        { name: 'Half-hourly heat production and gas consumption profiles - Gas boilers'},
        { name: 'Half-hourly heat production and gas consumption profiles - Resistance heaters'},
        { name: 'Summary of heat demand data across England, Wales and Scotland'}
    ];


    const handleDropdownChange = (title) => {
        onDatasetChange(title);
    };

    const [dropdown, setDropdown] = useState('Data Sets');

    return (
        <>
             <DropdownButton id="dropdown-basic-button" key="dropdown-button" drop="down-centered" title={dropdown} style={{ paddingTop: "1em" }}>
                {data.map((d) =>
                    <Dropdown.Item
                        className="dropdown-item"
                        key={d.name}
                        onClick={() => handleDropdownChange(d.name)}
                    >
                        {d.name}
                    </Dropdown.Item>
                )}
            </DropdownButton>
        </>
    );
}