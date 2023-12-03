// LocalAuthorityDropDownMenu component for rendering a dropdown menu of authorities
import React from 'react';

// Props: authorities - list of authorities, selectedAuthority - currently selected authority, onSelectAuthority - callback function for authority selection
export default function LocalAuthorityDropDownMenu({ authorities, selectedAuthority, onSelectAuthority }) {
    // Check if authorities data is not available
    if (!authorities) {
        return <p>Loading</p>; // Render loading indicator if authorities is null or undefined
    }

    // Render a dropdown menu with the list of authorities
    return (
        <select
            value={selectedAuthority}
            onChange={(e) => onSelectAuthority(e.target.value)}
        >
            {authorities.map((authority) => (
                <option key={authority} value={authority}>
                    {authority}
                </option>
            ))}
        </select>
    );
}
