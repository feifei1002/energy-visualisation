import React, { useState, useEffect } from 'react';
import { ResponsivePieCanvas } from '@nivo/pie';
import  graphToPdf  from '../../helperFunctions/graphToPdf';
import { toast } from 'react-toastify';

export default function BreakDownOfHeatDemandHeatTechnology ({ heatData, localAuthority }) {
  // States for managing loading, error, and technology data
  const [loading, setLoading] = useState(false); // Manages loading state
  const [error, setError] = useState(null); // Stores potential error messages
  const [technologyData, setTechnologyData] = useState([]); // Stores processed technology data

  const handleGeneratePDF = () => {
    try{
      graphToPdf('breakDownOfHeatDemandHeatTechnology', 
      `Most common type of boilers used in ${localAuthority.toString()} by percent - 2018`);
      toast.success('Graph converted to pdf and downloaded');
    } catch(e){
      toast.error('Error converting graph to pdf');
    }
  };
 
  // Function to obtain a color for each table row based on index
  const getColor = (index) => {
    // Predefined color scheme
    const schemeCategory10 = [
      '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
      '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
    ];
    return schemeCategory10[index % schemeCategory10.length];
  };

  // Use useEffect to update technologyData when heatData or localAuthority changes
  useEffect(() => {
    // Ensures necessary data exists before processing
    if (!heatData || !localAuthority) return;

    setLoading(true); // Sets loading state to 'true'

    // Filters the heat data for the selected local authority
    const selectedAuthorityData = heatData.filter(
      (data) => data['Local Authority (2019)'] === localAuthority
    );

    // Filter the heat data based on the selected local authority
    const filteredData = localAuthority === 'All Authorities'
    ? heatData
    : selectedAuthorityData

    // Extracts and aggregates the heat demand for different technologies
    const technologyBreakdown = filteredData.reduce((acc, curr) => {
      for (const key in curr) {
        if (key.includes('Average heat demand after energy efficiency measures for')) {
          const tech = key.split('for ')[1].replace(' (kWh)', ''); // Extracts the technology type
          acc[tech] = (acc[tech] || 0) + curr[key]; // Aggregates the values
        }
      }
      return acc;
    }, {});

    // Calculates the total to get the percentage values
    const totalValue = Object.values(technologyBreakdown).reduce((acc, curr) => acc + curr, 0);

    // Formats the data for the Nivo pie chart
    const formattedData = Object.entries(technologyBreakdown).map(([technology, value], index) => ({
      id: technology,
      value: parseFloat(((value / totalValue) * 100).toFixed(2)), // Converts to a percentage
      color: getColor(index), // Assigns colors based on index
    }));

    setTechnologyData(formattedData); // Sets the formatted data
    setLoading(false); // Sets loading state to 'false' when data is ready
  }, [heatData, localAuthority]); // Depends on heatData and localAuthority changes

  // Sorts the data for the table by the 'value' in descending order
  const sortedTableData = [...technologyData].sort((a, b) => b.value - a.value);

  // Renders the component based on loading state, errors, and technology data
  return (
    <div>
      <div>
        {loading ? ( // Display 'Loading data...' message
          <p>Loading data...</p>
        ) : error ? ( // Displays an error message, if exists
          <p>Error: {error.message}</p>
        ) : technologyData.length ? ( // Displays the pie chart and table data if available
          <>
          <div id="breakDownOfHeatDemandHeatTechnology">
            <div>
              <div style={{ width: '100vw', height: 400 }}>
                <ResponsivePieCanvas
                  data-testid="pie-chart"
                  data={technologyData}
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
                      <th style={{ border: "1px solid black" }}>Boiler Type</th>
                      <th style={{ border: "1px solid black" }}>Percentage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sortedTableData.map((data) => (
                      <tr key={data.id} style={{ border: "1px solid black" }}>
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
          <p>No data found for the selected Local Authority.</p> // Displays a message when no data is found
        )}
      </div>
    </div>
  );
};
