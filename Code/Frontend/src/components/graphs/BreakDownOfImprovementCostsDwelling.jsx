import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { ResponsivePie } from '@nivo/pie';
import graphToPdf from '../../helperFunctions/graphToPdf';

const BreakDownOfImprovementCostsDwelling = ({ localAuthority }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [formattedData, setFormattedData] = useState([]);

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

    const getColor = (index) => {
        const schemeCategory10 = [
            '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd',
            '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'
        ];
        return schemeCategory10[index % schemeCategory10.length];
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8082/data/efficiencyimprovementcosts');
                if (!response.ok) {
                    throw new Error(`Failed to fetch data. Status: ${response.status}`);
                }
                const result = await response.json();
                setData(result);

                const selectedAuthorityData = result.filter(
                    (data) => data['Local Authority (2019)'] === localAuthority
                );

                const filteredData = (localAuthority === 'All Authorities')
                    ? result
                    : selectedAuthorityData;

                const dwellingBreakdown = filteredData.reduce((acc, curr) => {
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

                    acc = { ...acc, ...newTotalCostsPerCity };
                    return acc;
                }, {});

                if (Object.keys(dwellingBreakdown).length > 0) {
                    const newData = Object.entries(dwellingBreakdown).map(([city, totalCost], index) => ({
                        id: city,
                        value: totalCost,
                        color: getColor(index),
                    }));

                    setFormattedData(newData);
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
                <div id="breakDownOfHeatDemandDwellings">
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
                            legends={[]}
                        />
                    </div>
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
                            {sortedTableData.map((data) => (
                                <tr key={data.id}>
                                    <td style={{ backgroundColor: data.color, border: '1px solid black' }}></td>
                                    <td style={{ border: '1px solid black' }}>{data.id}</td>
                                    <td style={{ border: '1px solid black' }}>£{data.value.toFixed(2)}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div>
                {/* Button to generate PDF */}
                <button onClick={handleGeneratePDF} style={{ margin: '1vh', backgroundColor: 'rgba(20, 72, 94, 0.99)', color: 'white' }}>
                    Generate PDF
                </button>
            </div>
        </div>
    );
};

export default BreakDownOfImprovementCostsDwelling;
