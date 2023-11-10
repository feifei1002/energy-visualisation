import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';

export default function BreakDownOfHeatDemandDwellings ({ heatData, localAuthority }) {
  // States for managing loading, error, and dwelling data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dwellingData, setDwellingData] = useState([]);

  // Use useEffect to update dwellingData when heatData or localAuthority changes
  useEffect(() => {
    if (!heatData || !localAuthority) return; // Ensure necessary data exists

    setLoading(true); // Set loading state

    // Filter the heat data for the selected local authority
    const selectedAuthorityData = heatData.filter(
      (data) => data['Local Authority (2019)'] === localAuthority
    );

    // Extract and aggregate the heat demand for different dwelling types
    const dwellingBreakdown = selectedAuthorityData.reduce((acc, curr) => {
      // Iterate through each dwelling type
      ['detached', 'flat', 'semi-detached', 'terraced'].forEach((dwellingType) => {
        // Calculate total value for each dwelling type
        const totalDwellingValue = Object.keys(curr)
          .filter((key) => key.includes(`after energy efficiency measures for ${dwellingType}`))
          .reduce((total, key) => total + curr[key], 0);

        acc[dwellingType] = (acc[dwellingType] || 0) + totalDwellingValue; // Aggregate the values
      });
      return acc;
    }, {});

    // Calculate the total to get the percentage values
    const totalValue = Object.values(dwellingBreakdown).reduce((acc, curr) => acc + curr, 0);

    // Format the data for Nivo pie chart
    const formattedData = Object.entries(dwellingBreakdown).map(([dwellingType, value]) => ({
      id: dwellingType,
      value: parseFloat(((value / totalValue) * 100).toFixed(2)), // Convert to a format that allows a percentage
    }));

    setDwellingData(formattedData); // Set the formatted data
    setLoading(false); // Set loading state to false when data is ready
  }, [heatData, localAuthority]); // Depend on heatData and localAuthority changes

  // Rendering the component based on loading state, errors, and dwelling data
  return (
    <div>
      <div>
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : dwellingData.length ? (
          <div>
            <div>
              <div style={{ width: '50vw', height: 400 }}>
                <ResponsivePie
                  data={dwellingData}
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
        ) : (
          <p>No data found for the selected Local Authority.</p>
        )}
      </div>
    </div>
  );
};
