import React, { useState, useEffect } from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar'; // Import the bar chart component
import graphToPdf from '../../helperFunctions/graphToPdf';
import { toast } from 'react-toastify';

export default function BreakDownOfHeatDemandHeatRuralityBar({heatData,localAuthority}) {
 // State variables for managing loading, errors, and the rurality data
 const [loading, setLoading] = useState(false); // Manages the loading state
 const [error, setError] = useState(null); // Stores potential error messages
 const [ruralityData, setRuralityData] = useState([]); // Stores processed rurality data

 const handleGeneratePDF = () => {
   try{
     graphToPdf('breakDownOfHeatDemandRurality', 
     `Breakdown of heat demand by rurality for ${localAuthority.toString()} by percent - 2018`);
     toast.success('Graph converted to pdf and downloaded');
   } catch(e){
     toast.error('Error converting graph to pdf');
   }
 };

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

  return (
    <div>
      <div>
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : ruralityData.length ? (
          <>
            <div id="breakDownOfHeatDemandHeatTechnology">
              <div>
                <div style={{ width: '100vw', height: 400 }}>
                {/* Use ResponsiveBar instead of ResponsivePie */}
                <ResponsiveBarCanvas
                            data-testid="bar-chart"
                            data={ruralityData}
                            keys={['value']}
                            indexBy="id"
                            margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                            padding={0.3}
                            colors={(bar) => bar.data.color}
                            borderWidth={1}
                            borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                            enableGridX
                            enableGridY
                            labelSkipWidth={12}
                            labelSkipHeight={12}
                            labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                            legends={[]}
                            axisBottom={null}
                            valueFormat={function (e) {
                                return e + '%'
                            }}
                    />
                </div>
                <div
                  style={{
                    width: '100vw',
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '1vh'
                  }}
                >
                  {/* Render table data based on the bar chart data */}
                  <table style={{ border: '1px solid black' }}>
                    <thead>
                      <tr style={{ border: '1px solid black' }}>
                        <th style={{ border: '1px solid black' }}>Colour</th>
                        <th style={{ border: '1px solid black' }}>Rurality Type</th>
                        <th style={{ border: '1px solid black' }}>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedTableData.map((data) => (
                        <tr key={data.id} style={{ border: '1px solid black' }}>
                          <td
                            style={{
                              backgroundColor: data.color,
                              border: '1px solid black'
                            }}
                          ></td>
                          <td style={{ border: '1px solid black' }}>
                            {data.id}
                          </td>
                          <td style={{ border: '1px solid black' }}>
                            {data.value}%
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div>
              {/* Button to generate PDF */}
              <button
                onClick={handleGeneratePDF}
                style={{
                  margin: '1vh',
                  backgroundColor: 'rgba(20, 72, 94, 0.99)',
                  color: 'white'
                }}
              >
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
}
