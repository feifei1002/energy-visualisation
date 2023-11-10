import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';

export default function BreakDownOfHeatDemandRurality({ heatData, localAuthority }){
  // State variables for managing loading state, errors, and the rurality data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [ruralityData, setRuralityData] = useState([]);

  // Fetch and process data whenever 'heatData' or 'localAuthority' changes
  useEffect(() => {
    // If no data or authority is provided, return without doing anything
    if (!heatData || !localAuthority) return;

    // Set loading state to true
    setLoading(true);

    // Filter data based on the selected local authority
    const selectedAuthorityData = heatData.filter(
      (data) => data['Local Authority (2019)'] === localAuthority
    );

    // Object to store the count of each rurality type
    const ruralityBreakdown = {
      'Village, Town and Fringe': 0,
      'Hamlet & Isolated Dwellings': 0,
      'Urban': 0,
    };

    // Calculate the count of each rurality type in the selected data
    selectedAuthorityData.forEach((data) => {
      const rurality = data['Rurality'];
      ruralityBreakdown[rurality]++;
    });

    // Calculate the total count of rurality types
    const total = selectedAuthorityData.length;

    // Format the rurality data for display in the pie chart
    const formattedData = Object.entries(ruralityBreakdown).map(
      ([ruralityType, count]) => ({
        id: ruralityType,
        value: parseFloat(((count / total) * 100).toFixed(2)),
      })
    );

    // Update the state with the formatted rurality data
    setRuralityData(formattedData);
    // Set loading state to false since data processing is completed
    setLoading(false);
  }, [heatData, localAuthority]); // Dependencies that trigger the effect on change

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
              <div style={{ width: '50vw', height: 400 }}>
                <ResponsivePie
                  data={ruralityData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={{ scheme: 'category10' }}
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                  enableRadialLabels={false}
                  valueFormat={(e) => e + '%'}
                  sliceLabel={(slice) => `${slice.id}: ${slice.value}%`}
                />
              </div>
            </div>
          </div>
        ) : ( // Display a message when no data is found for the selected authority
          <p>No data found for the selected Local Authority.</p>
        )}
      </div>
    </div>
  );
};