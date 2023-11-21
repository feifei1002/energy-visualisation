import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';

export default function BreakDownOfHeatDemandRurality({ heatData, localAuthority }) {
  // State variables for managing loading, errors, and the rurality data
  const [loading, setLoading] = useState(false); // Manages the loading state
  const [error, setError] = useState(null); // Stores potential error messages
  const [ruralityData, setRuralityData] = useState([]); // Stores processed rurality data

  //Get color for the row in the corresponding table
  const getColor = (index) => {
    // Predefined color scheme for data representation
    const schemeCategory10 = [
      '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
      '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ];
    return schemeCategory10[index % schemeCategory10.length]; // Returns a color based on the index
  };

  // Fetch and process data whenever 'heatData' or 'localAuthority' changes
  useEffect(() => {
    // If no data or authority is provided, return without doing anything
    if (!heatData || !localAuthority) return;

    setLoading(true); // Indicate data loading

    // Filter data based on the selected local authority
    const selectedAuthorityData = heatData.filter(
      (data) => data['Local Authority (2019)'] === localAuthority
    );

    // Filter the heat data based on the selected local authority
    const filteredData = localAuthority === 'All Authorities'
    ? heatData
    : selectedAuthorityData;

    // Object to store the count of each rurality type
    const ruralityBreakdown = {
      'Village, Town and Fringe': 0,
      'Hamlet & Isolated Dwellings': 0,
      'Urban': 0,
    };

    // Calculate the count of each rurality type in the selected data
     filteredData.forEach((data) => {
      const rurality = data['Rurality'];
      ruralityBreakdown[rurality]++; // Increment rurality count
    });

    // Calculate the total count of rurality types
    const total = filteredData.length;

    // Format the rurality data for display in the pie chart
    const formattedData = Object.entries(ruralityBreakdown).map(
      ([ruralityType, count], index) => ({
        id: ruralityType, // Name of rurality type
        value: parseFloat(((count / total) * 100).toFixed(2)), // Calculate percentage
        color: getColor(index), // Assign color based on index
      })
    );

    // Update the state with the formatted rurality data
    setRuralityData(formattedData);
    setLoading(false); // Indicate data processing completion
  }, [heatData, localAuthority]); // Triggers this effect on 'heatData' or 'localAuthority' changes

  // Sort the rurality data for table display by the 'value' in descending order
  const sortedTableData = [...ruralityData].sort((a, b) => b.value - a.value);

  // Render the component with the data, loading state, and potential errors
  return (
    <div>
      <div>
        {loading ? ( // Display a loading message while fetching or processing data
          <p>Loading data...</p>
        ) : error ? ( // Display an error message if there's an error
          <p>Error: {error.message}</p>
        ) : ruralityData.length ? ( // Display the pie chart if data is available
          <div>
            <div>
              <div style={{ width: '100vw', height: 400 }}>
                <ResponsivePie
                  data={ruralityData} // Pass rurality data to the Nivo pie chart
                  margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={{ scheme: 'category10' }}
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                  enableArcLinkLabels={false}
                  enableRadialLabels={false}
                  enableSlicesLabels={false} 
                  enableLabels={false} 
                  enableArcLabels={false}
                  legends={[]} 
                />
              </div>
            </div>
            <div style={{ width: '100vw', display:'flex', justifyContent: 'center', marginBottom: '1vh'}}>
              <table>
                <thead>
                  <tr style={{ border: "1px solid black" }}>
                  <th style={{ border: "1px solid black" }}>Colour</th>
                    <th style={{ border: "1px solid black" }}>Rurality Type</th>
                    <th style={{ border: "1px solid black" }}>Percentage</th>
                  </tr>
                </thead>
                <tbody>
                  {sortedTableData.map((data) => (
                    <tr key={data.id}>
                      <td style={{ backgroundColor: data.color, border: "1px solid black"}}></td>
                      <td style={{ border: "1px solid black" }}>{data.id}</td>
                      <td style={{ border: "1px solid black" }}>{data.value}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : ( // Display a message when no data is found for the selected authority
          <p>No data found for the selected Local Authority.</p>
        )}
      </div>
    </div>
  );
};
