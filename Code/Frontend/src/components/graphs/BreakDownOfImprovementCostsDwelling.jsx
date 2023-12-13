// Import necessary dependencies and styles
// ... (other imports)
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import graphToPdf from '../../helperFunctions/graphToPdf';

// Component for displaying the breakdown of improvement costs by dwellings
const BreakDownOfImprovementCostsDwelling = ({ costData, localAuthority }) => {
    // State to manage component data
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formattedData, setFormattedData] = useState([]);
    const [graphFormattedData, setGraphFormattedData] = useState([]);
    const [averageCostPerAuthority, setAverageCostPerAuthority] = useState(null);
    const [currentView, setCurrentView] = useState('bar');

    // Function to handle generating PDF from the graph
    const handleGeneratePDF = () => {
        try {
            graphToPdf(
                'breakDownOfImprovementCostsDwellings',
                `Breakdown of improvement costs by dwellings for ${localAuthority} - 2018`
            );
            toast.success('Graph converted to pdf and downloaded');
        } catch (e) {
            console.error('Error converting graph to pdf:', e);
            toast.error('Error converting graph to pdf');
        }
    };

    // Function to get colors for sectors in the bar graph
    const getBarColors = (index) => {
        const schemeCategory10 = [
            '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
            '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
        ];
        return schemeCategory10[index % schemeCategory10.length];
    };

    // Fetch and format data on component mount and when localAuthority changes
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch data (replace with actual fetching logic)
                const result = costData;
                setData(result);

                // Filter data based on the selected local authority
                const selectedAuthorityData = result.filter(
                    (data) => data['Local Authority (2019)'] === localAuthority
                );

                const filteredData = (localAuthority === 'All Authorities')
                    ? result
                    : selectedAuthorityData;

                // Calculate dwelling breakdown
                const dwellingBreakdown = filteredData.map((curr) => {
                    const newTotalCostsPerCity = {};

                    ['detached', 'flat', 'semi-detached', 'terraced'].forEach((dwellingType) => {
                        const totalDwellingValue = Object.keys(curr)
                            .filter((key) => [
                                `Average energy efficiency improvements costs of ${dwellingType} gas boiler (GBP)`,
                                `Average energy efficiency improvements costs of ${dwellingType} oil boiler (GBP)`,
                                `Average energy efficiency improvements costs of ${dwellingType} resistance heating (GBP)`,
                                `Average energy efficiency improvements costs of ${dwellingType} biomass boiler (GBP)`,
                            ].includes(key))
                            .reduce((total, key) => total + parseFloat(curr[key] || 0), 0);

                        newTotalCostsPerCity[dwellingType] = totalDwellingValue;
                    });

                    return newTotalCostsPerCity;
                });

                // Calculate and set the average cost per authority
                if (filteredData.length > 0) {
                    const totalCostPerDwellingType = dwellingBreakdown.reduce((acc, city) => {
                        Object.keys(city).forEach((dwellingType) => {
                            if (!acc[dwellingType]) {
                                acc[dwellingType] = 0;
                            }
                            acc[dwellingType] += city[dwellingType];
                        });
                        return acc;
                    }, {});

                    const totalCostAllDwellingTypes = Object.values(totalCostPerDwellingType).reduce((total, cost) => total + cost, 0);

                    const averageCostPerAuthority = totalCostAllDwellingTypes / filteredData.length;

                    setAverageCostPerAuthority(averageCostPerAuthority);
                } else {
                    setAverageCostPerAuthority(null);
                }

                // Format data for both pie chart and bar graph
                if (dwellingBreakdown.length > 0) {
                    const keys = ['detached', 'flat', 'semi-detached', 'terraced'];

                    // For bar graph (updated to set the initial state for the bar graph)
                    const barGraphData = keys.map((dwellingType, index) => ({
                        id: dwellingType,
                        value: dwellingBreakdown[0][dwellingType],
                        color: getBarColors(index),
                    }));

                    setGraphFormattedData(barGraphData);
                    setFormattedData(barGraphData);
                }
            } catch (error) {
                console.error('Error fetching or parsing data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [localAuthority]);

    // Display loading message while data is being fetched
    if (loading) {
        return <p>Loading data...</p>;
    }

    // Display error message if an error occurs
    if (error) {
        console.error('Error:', error);
        return (
            <div>
                <p>Error: Something went wrong. Please check the console for details.</p>
            </div>
        );
    }

    // Display message if no data is found
    if (!data.length || !formattedData.length) {
        return <p>No data found for the selected Local Authority.</p>;
    }

    // Render the component with either pie chart or bar graph based on the current view
    return (
        <div>
            <div>
                <div id="breakDownOfHeatDemandDwellings">
                    {currentView === 'pie' ? (
                        // Render pie chart
                        <div style={{ width: '100vw', height: 400 }}>
                            <ResponsivePie
                                data={formattedData}
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
                                legends={[{
                                    anchor: 'right',
                                    direction: 'column',
                                    justify: false,
                                    translateX: 80,
                                    translateY: 0,
                                    itemsSpacing: 0,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000',
                                            },
                                        },
                                    ],
                                },
                                ]}
                                tooltip={({ datum }) => (
                                    <div
                                        style={{
                                            background: '#fff',
                                            padding: '5px',
                                            border: '1px solid #ccc',
                                        }}
                                    >
                                        <div style={{ color: datum.color }}>
                                            {datum.id}: £{Number(datum.value).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    ) : (
                        // Render bar graph
                        <div style={{ width: '100vw', height: 400 }}>
                            <ResponsiveBar
                                data={graphFormattedData}
                                keys={['value']}
                                indexBy="id"
                                margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                                padding={0.3}
                                colors={(sector) => sector.data.color}
                                borderWidth={1}
                                borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                                axisTop={null}
                                axisRight={null}
                                axisBottom={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Heating Technology',
                                    legendPosition: 'middle',
                                    legendOffset: 32,
                                    format: (value) => `${value}`, // Format x-axis ticks
                                }}
                                axisLeft={{
                                    tickSize: 5,
                                    tickPadding: 5,
                                    tickRotation: 0,
                                    legend: 'Cost',
                                    legendPosition: 'middle',
                                    legendOffset: -40,
                                    format: (value) => `£${(value / 1000).toFixed(0)}k`, // Format y-axis ticks
                                }}
                                labelSkipWidth={12}
                                labelSkipHeight={12}
                                labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                                legends={[{
                                    anchor: 'bottom',
                                    direction: 'row',
                                    justify: false,
                                    translateX: 0,
                                    translateY: 56,
                                    itemsSpacing: 0,
                                    itemWidth: 100,
                                    itemHeight: 18,
                                    itemTextColor: '#999',
                                    itemDirection: 'left-to-right',
                                    itemOpacity: 1,
                                    symbolSize: 18,
                                    symbolShape: 'circle',
                                    effects: [
                                        {
                                            on: 'hover',
                                            style: {
                                                itemTextColor: '#000',
                                            },
                                        },
                                    ],
                                }]}
                                tooltip={({ id, value }) => (
                                    <div
                                        style={{
                                            background: '#fff',
                                            padding: '5px',
                                            border: '1px solid #ccc',
                                        }}
                                    >
                                        <div style={{ color: getBarColors(formattedData.findIndex(d => d.id === id)) }}>
                                            {id}: £{Number(value).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                        </div>
                                    </div>
                                )}
                            />
                        </div>
                    )}
                    {/* Render legend table */}
                    <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', marginBottom: '1vh' }}>
                        <table style={{ border: '1px solid black' }}>
                            <thead>
                            <tr style={{ border: '1px solid black' }}>
                                <th style={{ border: '1px solid black' }}>Colour</th>
                                <th style={{ border: '1px solid black' }}>Dwelling Type</th>
                                <th style={{ border: '1px solid black' }}>Cost</th>
                            </tr>
                            </thead>
                            <tbody>
                            {/* Map and render table rows */}
                            {formattedData.map((data, index) => (
                                <tr key={index}>
                                    <td style={{ backgroundColor: data.color, border: '1px solid black' }}></td>
                                    <td style={{ border: '1px solid black' }}>{data.id}</td>
                                    <td style={{ border: '1px solid black' }}>
                                        £{Number(data.value).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {/* Buttons to toggle between Pie Chart and Bar Graph and to generate PDF */}
            <div>
                <button
                    onClick={() => setCurrentView(currentView === 'pie' ? 'bar' : 'pie')}
                    style={{ margin: '1vh', backgroundColor: 'rgba(20, 72, 94, 0.99)', color: 'white' }}
                >
                    {currentView === 'pie' ? 'Change to Bar Graph' : 'Change to Pie Chart'}
                </button>
                <button onClick={handleGeneratePDF} style={{ margin: '1vh', backgroundColor: 'rgba(20, 72, 94, 0.99)', color: 'white' }}>
                    Generate PDF
                </button>
            </div>
        </div>
    );
};

// Export the component
export default BreakDownOfImprovementCostsDwelling;
