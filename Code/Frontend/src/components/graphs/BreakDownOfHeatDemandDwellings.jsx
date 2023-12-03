import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import  graphToPdf  from '../../helperFunctions/graphToPdf';
import { toast } from 'react-toastify';

export default function BreakDownOfHeatDemandDwellings ({ heatData, localAuthority }) {
  // States for managing loading, error, and dwelling data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [dwellingData, setDwellingData] = useState([]);

  const handleGeneratePDF = () => {
    try{
      graphToPdf('breakDownOfHeatDemandDwellings', 
      `Breakdown of heat demand by dwellings for ${localAuthority.toString()} by percent - 2018`);
      toast.success('Graph converted to pdf and downloaded');
    } catch(e){
      toast.error('Error converting graph to pdf');
    }
  };

  //Get color for the row in the corresponding table
  const getColor = (index) => {
    // Color scheme for the table rows
    const schemeCategory10 = [
      '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
      '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ];
    return schemeCategory10[index % schemeCategory10.length];
  };

  // Use useEffect to update dwellingData when heatData or localAuthority changes
  useEffect(() => {
    // Ensure necessary data exists before processing
    if (!heatData || !localAuthority) return;

    setLoading(true); // Set loading state to true

    // Filter the heat data for the selected local authority
    const selectedAuthorityData = heatData.filter(
      (data) => data['Local Authority (2019)'] === localAuthority
    );

    // Filter the heat data based on the selected local authority
    const filteredData = localAuthority === 'All Authorities'
    ? heatData
    : selectedAuthorityData;

    // Extract and aggregate the heat demand for different dwelling types
    const dwellingBreakdown = filteredData.reduce((acc, curr) => {
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
    const formattedData = Object.entries(dwellingBreakdown).map(([dwellingType, value], index) => ({
      id: dwellingType,
      value: parseFloat(((value / totalValue) * 100).toFixed(2)), // Convert to a percentage format
      color: getColor(index), // Assign colors based on index
    }));

    setDwellingData(formattedData); // Set the formatted data
    setLoading(false); // Set loading state to false when data is ready
  }, [heatData, localAuthority]); // Depend on heatData and localAuthority changes

  // Sort data for the table by the 'value' in descending order
  const sortedTableData = [...dwellingData].sort((a, b) => b.value - a.value);

  // Rendering the component based on loading state, errors, and dwelling data
  return (
    <div>
      <div>
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : dwellingData.length ? (
          <>
          <div>
            <div id="breakDownOfHeatDemandDwellings">
              <div style={{ width: '100vw', height: 400 }}>
                <ResponsivePie
                  data={dwellingData}
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
              <div style={{ width: '100vw', display:'flex', justifyContent: 'center', marginBottom: '1vh'}}>
                <table style={{ border: "1px solid black" }}>
                  <thead>
                    <tr style={{ border: "1px solid black" }}>
                    <th style={{ border: "1px solid black" }}>Colour</th>
                      <th style={{ border: "1px solid black" }}>Dwelling Type</th>
                      <th style={{ border: "1px solid black" }}>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTableData.map((data) => (
                      <tr key={data.id}>
                        <td style={{ backgroundColor: data.color, border: "1px solid black" }}></td>
                        <td style={{ border: "1px solid black" }}>{data.id}</td>
                        <td style={{ border: "1px solid black" }}>{data.value}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div>
            {/* Button to generate PDF */}
            <button onClick={handleGeneratePDF} style={{margin: '1vh', backgroundColor: 'rgba(20, 72, 94, 0.99)', color: 'white'}}>
              Generate PDF
              </button>
          </div>
          </>
        ) : (
          <p>No data found for the selected Local Authority.</p>
        )}
      </div>
    </div>
  );
};
