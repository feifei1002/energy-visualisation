import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';

const BreakDownOfHeatDemandHeatTechnology = ({ heatData, localAuthority }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [technologyData, setTechnologyData] = useState([]);

  // Use useEffect to update technologyData when heatData or localAuthority changes
  useEffect(() => {
    if (!heatData || !localAuthority) return;

    setLoading(true);

    // Filter the heat data for the selected local authority
    const selectedAuthorityData = heatData.filter(
      (data) => data['Local Authority (2019)'] === localAuthority
    );

    // Extract and aggregate the heat demand for different technologies
    const technologyBreakdown = selectedAuthorityData.reduce((acc, curr) => {
      for (const key in curr) {
        if (key.includes('Average heat demand after energy efficiency measures for')) {
          const tech = key.split('for ')[1].replace(' (kWh)', '');
          acc[tech] = (acc[tech] || 0) + curr[key];
        }
      }
      return acc;
    }, {});

    // Calculate the total to get the percentage values
    const totalValue = Object.values(technologyBreakdown).reduce((acc, curr) => acc + curr, 0);

    // Format the data for Nivo pie chart
    const formattedData = Object.entries(technologyBreakdown).map(([technology, value]) => ({
      id: technology,
      value: parseFloat(((value / totalValue) * 100).toFixed(2)), // Convert to a format that allows a percentage
    }));

    setTechnologyData(formattedData);
    setLoading(false);
  }, [heatData, localAuthority]);

  return (
    <div>
      <div>
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : technologyData.length ? (
          <div>
            <div>
              <div style={{ width: '50vw', height: 400 }}>
                <ResponsivePie
                  data={technologyData}
                  margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                  innerRadius={0.5}
                  padAngle={0.7}
                  cornerRadius={3}
                  colors={{ scheme: 'category10' }}
                  borderWidth={1}
                  borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                  enableRadialLabels={false}
                  valueFormat={function (e) {
                    return e + '%'
                  }}
                  sliceLabel={(slice) => `${slice.id}: ${slice.value}`}  // Display as a percentage
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

export default BreakDownOfHeatDemandHeatTechnology;
