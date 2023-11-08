import React from 'react';

export default function LocalAuthorityDropDownMenu({ authorities, selectedAuthority, onSelectAuthority }) {

    if (!authorities) {
        // Handle the case where authorities is null or undefined
        return <p>Loading</p>; //Return loading indicator
    }

    // Sort the authorities in alphabetical order for display
    const sortedAuthorities = authorities.sort();

    return (
      <select
        value={selectedAuthority}
        onChange={(e) => onSelectAuthority(e.target.value)}
      >
        <option value="">Select an Authority</option>
        {sortedAuthorities.map((authority) => (
          <option key={authority} value={authority}>
            {authority}
          </option>
        ))}
      </select>
    );
  }