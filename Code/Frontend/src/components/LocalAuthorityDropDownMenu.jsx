import React from 'react';

export default function LocalAuthorityDropDownMenu({ authorities, selectedAuthority, onSelectAuthority }) {

    if (!authorities) {
        // Handle the case where authorities is null or undefined
        return <p>Loading</p>; //Return loading indicator
    }

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