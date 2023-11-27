// Import React library
import React from 'react';
import  graphToPdf  from '../../helperFunctions/graphToPdf';
import { toast } from 'react-toastify';

// Define the table component for Total Heat Demand After Efficiency
export default function TotalHeatDemandAfterTable({ data }) {

  const handleGeneratePDF = () => {
    try{
      graphToPdf('totalHeatDemandAfterTable', 
      `Total heat demand after energy efficiency measures 2018 (GWh) - Table`);
      toast.success('Table converted to pdf and downloaded');
    } catch(e){
      toast.error('Error converting table to pdf');
    }
  };

  // Set styles for the table container
  const tableStyle = {
    maxHeight: '300px',
    width: '95vw',
    overflowX: 'auto',
    border: '1px solid white',
    margin: '0.5vw',
    padding: '0.5vw',
  };

  // Styles for the table header
  const headerStyle = {
    backgroundColor: 'black',
    color: 'white',
    border: '1px solid white',
  };

  // Styles for the table cells
  const cellStyle = {
    border: '1px solid white',
  };

  // Calculate the sum of total heat demand for each unique local authority
  const heatDemandSums = data.reduce((sums, row) => {
    const authority = row['Local Authority (2019)'];
    const demand = row['Total heat demand after energy efficiency measures 2018 (kWh)'];
    sums[authority] = (sums[authority] || 0) + demand;
    return sums;
  }, {});

  // Create an array of objects for each unique local authority and its corresponding total heat demand
  const heatDemandRows = Object.keys(heatDemandSums).map((authority) => ({
    authority,
    totalDemand: heatDemandSums[authority] / 1000000,
  }));

  // Sort the rows in descending order based on total demand
  heatDemandRows.sort((a, b) => b.totalDemand - a.totalDemand);

  // Function to determine the color of a row based on its heat demand
  const getColor = (demand) => {
    // Use a color-coding scheme based on heat demand levels
    if (demand > 2000) return '#800026';
    if (demand > 1500) return '#E05E42';
    if (demand > 1000) return '#FFEDA0';
    if (demand > 500) return '#ADF007';
    return '#ADF007'; // Default color if none of the above conditions are met.
  };

  // Render the table component
  return (
    <div>
    <div style={tableStyle} id="totalHeatDemandAfterTable">
      <table>
        <thead>
          {/* Table header cells */}
          <tr style={headerStyle}>
            <th style={headerStyle}>Local Authority</th>
            <th style={headerStyle}>Total Heat Demand After Efficiency (GWh)</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through the aggregated data and display table rows */}
          {heatDemandRows.map((row, index) => {
            // Get the color based on the total demand of the corresponding authority
            const color = getColor(row.totalDemand);

            // Apply the dynamic style to the row
            const rowStyle = {
              backgroundColor: color,
              border: '1px solid white',
              color: 'black',
              fontWeight: 'bolder',
              fontSize: 'large' 
            };

            return (
              <tr key={index} style={rowStyle}>
                {/* Table cells */}
                <td style={cellStyle}>{row.authority}</td>
                <td style={cellStyle}>{row.totalDemand.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
    <div>
      {/* Button to generate PDF */}
      <button onClick={handleGeneratePDF} style={{margin: '1vh', backgroundColor: 'rgba(20, 72, 94, 0.99)', color: 'white'}}>
        Generate PDF
      </button>
    </div>
    </div>
  );
}