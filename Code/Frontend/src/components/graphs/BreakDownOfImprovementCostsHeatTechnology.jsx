// ... (other imports)

import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ResponsivePie } from '@nivo/pie';
import { ResponsiveBar } from '@nivo/bar';
import graphToPdf from '../../helperFunctions/graphToPdf';

const BreakDownOfImprovementCostsHeatTechnology = ({ costData, localAuthority }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formattedData, setFormattedData] = useState([]);
    const [averageCostPerCity, setAverageCostPerCity] = useState(null);
    const [currentView, setCurrentView] = useState('bar'); // Set default view to 'bar'

    const handleGeneratePDF = () => {
        try {
            graphToPdf(
                'breakDownOfImprovementCostsHeatingTech',
                `Breakdown of improvement costs by heating technology for ${localAuthority} - 2018`
            );
            toast.success('Graph converted to pdf and downloaded');
        } catch (e) {
            console.error('Error converting graph to pdf:', e);
            toast.error('Error converting graph to pdf');
        }
    };

    const getSectorColors = (index) => {
        const schemeCategory10 = [
            '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
            '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
        ];
        return schemeCategory10[index % schemeCategory10.length];
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = costData;
                setData(result);

                const selectedAuthorityData = result.filter(
                    (data) => data['Local Authority (2019)'] === localAuthority
                );

                const filteredData = (localAuthority === 'All Authorities')
                    ? result
                    : selectedAuthorityData;

                const heatingTechBreakdown = ['gas boiler', 'oil boiler', 'resistance heating', 'biomass boiler'].reduce((acc, heatingTech, index) => {
                    const totalTechValue = filteredData.reduce((total, curr) => {
                        const keys = [
                            `Average energy efficiency improvements costs of detached ${heatingTech} (GBP)`,
                            `Average energy efficiency improvements costs of flat ${heatingTech} (GBP)`,
                            `Average energy efficiency improvements costs of semi-detached ${heatingTech} (GBP)`,
                            `Average energy efficiency improvements costs of terraced ${heatingTech} (GBP)`,
                        ];
                        return total + keys.reduce((techTotal, key) => techTotal + parseFloat(curr[key] || 0), 0);
                    }, 0);

                    const averageCostPerAuthority = totalTechValue / filteredData.length;

                    acc.push({
                        id: heatingTech,
                        value: averageCostPerAuthority,
                        color: getSectorColors(index),
                    });

                    return acc;
                }, []);

                if (heatingTechBreakdown.length > 0) {
                    setFormattedData(heatingTechBreakdown);
                }

                if (filteredData.length > 0) {
                    const totalAverageCostPerCity = heatingTechBreakdown.reduce((total, tech) => total + tech.value, 0);
                    setAverageCostPerCity(totalAverageCostPerCity);
                } else {
                    setAverageCostPerCity(null);
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

    const sortedTableData = [...formattedData].sort((a, b) => b.value - a.value);

    if (loading) {
        return <p>Loading data...</p>;
    }

    if (error) {
        console.error('Error:', error);
        return (
            <div>
                <p>Error: Something went wrong. Please check the console for details.</p>
            </div>
        );
    }

    if (!data.length || !formattedData.length) {
        return <p>No data found for the selected Local Authority.</p>;
    }

    return (
        <div>
            <div>
                <div id="breakDownOfImprovementCostsHeatingTech">
                    {currentView === 'pie' ? (
                        <div style={{ width: '100vw', height: 400 }}>
                            <ResponsivePie
                                data={formattedData}
                                margin={{ top: 40, right: 80, bottom: 40, left: 80 }}
                                innerRadius={0.5}
                                padAngle={0.7}
                                cornerRadius={3}
                                colors={(sector) => sector.data.color}
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
                        <div style={{ width: '100vw', height: 400 }}>
                            <ResponsiveBar
                                data={formattedData}
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
                            />
                        </div>
                    )}
                    <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', marginBottom: '1vh' }}>
                        <table style={{ border: '1px solid black' }}>
                            <thead>
                            <tr style={{ border: '1px solid black' }}>
                                <th style={{ border: '1px solid black' }}>Colour</th>
                                <th style={{ border: '1px solid black' }}>Heating Technology</th>
                                <th style={{ border: '1px solid black' }}>Cost</th>
                            </tr>
                            </thead>
                            <tbody>
                            {sortedTableData.map((data, index) => (
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
            <div>
                {/* Button to toggle between Pie Chart and Bar Graph */}
                <button
                    onClick={() => setCurrentView(currentView === 'pie' ? 'bar' : 'pie')}
                    style={{ margin: '1vh', backgroundColor: 'rgba(20, 72, 94, 0.99)', color: 'white' }}
                >
                    {currentView === 'pie' ? 'Change to Bar Graph' : 'Change to Pie Chart'}
                </button>
                {/* Button to generate PDF */}
                <button onClick={handleGeneratePDF} style={{ margin: '1vh', backgroundColor: 'rgba(20, 72, 94, 0.99)', color: 'white' }}>
                    Generate PDF
                </button>
            </div>
        </div>
    );
};

export default BreakDownOfImprovementCostsHeatTechnology;
