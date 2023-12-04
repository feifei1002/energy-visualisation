import React, { useState, useEffect } from 'react';
import { ResponsivePie } from '@nivo/pie';
import graphToPdf from '../../helperFunctions/graphToPdf';
import { toast } from 'react-toastify';

export default function BreakDownOfImprovementCostsHeatTechnology({ heatData, localAuthority }) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [technologyData, setTechnologyData] = useState([]);

    const handleGeneratePDF = () => {
        try {
            graphToPdf(
                'breakDownOfImprovementCostsHeatTechnology',
                `Most common type of boilers used in ${localAuthority.toString()} by cost - 2018`
            );
            toast.success('Graph converted to pdf and downloaded');
        } catch (e) {
            toast.error('Error converting graph to pdf');
        }
    };

    const getColor = (index) => {
        const schemeCategory10 = [
            '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
            '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
        ];
        return schemeCategory10[index % schemeCategory10.length];
    };

    useEffect(() => {
        if (!heatData || !localAuthority) return;

        setLoading(true);

        const selectedAuthorityData = heatData.filter(
            (data) => data['Local Authority (2019)'] === localAuthority
        );

        const filteredData = localAuthority === 'All Authorities'
            ? heatData
            : selectedAuthorityData;

        console.log('Filtered Data:', filteredData);

        const technologyBreakdown = filteredData.reduce((acc, curr) => {
            for (const key in curr) {
                if (key.includes('Average energy efficiency improvements costs of ')) {
                    const tech = key.split(' (GBP)')[1].trim(); // Extracts the technology type
                    acc[tech] = (acc[tech] || 0) + curr[key]; // Aggregates the values
                }
            }
            return acc;
        }, {});

        console.log('Technology Breakdown:', technologyBreakdown);

        const formattedData = Object.entries(technologyBreakdown).map(([technology, value], index) => ({
            id: technology,
            value: parseFloat(value.toFixed(2)),
            color: getColor(index),
        }));

        console.log('Formatted Data:', formattedData);

        setTechnologyData(formattedData);
        setLoading(false);
    }, [heatData, localAuthority]);

    const sortedTableData = [...technologyData].sort((a, b) => b.value - a.value);

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
                                    <ResponsivePie
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
                                <div style={{ width: '100vw', display: 'flex', justifyContent: 'center', marginBottom: '1vh' }}>
                                    <table style={{ border: '1px solid black' }}>
                                        <thead>
                                        <tr style={{ border: '1px solid black' }}>
                                            <th style={{ border: '1px solid black' }}>Colour</th>
                                            <th style={{ border: '1px solid black' }}>Boiler Type</th>
                                            <th style={{ border: '1px solid black' }}>Cost (GBP)</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {sortedTableData.map((data) => (
                                            <tr key={data.id} style={{ border: '1px solid black' }}>
                                                <td style={{ backgroundColor: data.color, border: '1px solid black' }}></td>
                                                <td style={{ border: '1px solid black' }}>{data.id}</td>
                                                <td style={{ border: '1px solid black' }}>{data.value.toFixed(2)}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div>
                            <button onClick={handleGeneratePDF} style={{ margin: '1vh', backgroundColor: 'rgba(20, 72, 94, 0.99)', color: 'white' }}>
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
