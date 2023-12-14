import React, { useState, useEffect } from 'react';
import { ResponsiveBarCanvas } from '@nivo/bar'; // Import the bar chart component
import graphToPdf from '../../helperFunctions/graphToPdf';
import { toast } from 'react-toastify';

export default function BreakDownOfHeatDemandHeatTechnologyBar({heatData,localAuthority}) {
  // States for managing loading, error, and technology data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [technologyData, setTechnologyData] = useState([]);

  const handleGeneratePDF = () => {
    try {
      graphToPdf(
        'breakDownOfHeatDemandHeatTechnology',
        `Most common type of boilers used in ${localAuthority.toString()} by percent - 2018`
      );
      toast.success('Graph converted to pdf and downloaded');
    } catch (e) {
      toast.error('Error converting graph to pdf');
    }
  };

  // Function to obtain a color for each bar
  const getColor = (index) => {
    const schemeCategory10 = [
      '#1f77b4',
      '#ff7f0e',
      '#2ca02c',
      '#d62728',
      '#9467bd',
      '#8c564b',
      '#e377c2',
      '#7f7f7f',
      '#bcbd22',
      '#17becf'
    ];
    return schemeCategory10[index % schemeCategory10.length];
  };

  useEffect(() => {
    if (!heatData || !localAuthority) return;

    setLoading(true);

    const selectedAuthorityData = heatData.filter(
      (data) => data['Local Authority (2019)'] === localAuthority
    );

    const filteredData =
      localAuthority === 'All Authorities' ? heatData : selectedAuthorityData;

    const technologyBreakdown = filteredData.reduce((acc, curr) => {
      for (const key in curr) {
        if (
          key.includes(
            'Average heat demand after energy efficiency measures for'
          )
        ) {
          const tech = key.split('for ')[1].replace(' (kWh)', '');
          acc[tech] = (acc[tech] || 0) + curr[key];
        }
      }
      return acc;
    }, {});

    const totalValue = Object.values(technologyBreakdown).reduce(
      (acc, curr) => acc + curr,
      0
    );

    const formattedData = Object.entries(technologyBreakdown).map(
      ([technology, value], index) => ({
        id: technology,
        value: parseFloat(((value / totalValue) * 100).toFixed(2)),
        color: getColor(index)
      })
    );

    setTechnologyData(formattedData);
    setLoading(false);
  }, [heatData, localAuthority]);

  const sortedBarData = [...technologyData].sort((a, b) => b.value - a.value);

  return (
    <div>
      <div>
        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
        ) : technologyData.length ? (
          <>
            <div id="breakDownOfHeatDemandHeatTechnology">
              <div>
                <div style={{ width: '100vw', height: 400 }}>
                  {/* Use ResponsiveBar instead of ResponsivePie */}
                  <ResponsiveBarCanvas
                    data-testid="bar-chart"
                    data={technologyData}
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
                        <th style={{ border: '1px solid black' }}>Boiler Type</th>
                        <th style={{ border: '1px solid black' }}>Percentage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedBarData.map((data) => (
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
