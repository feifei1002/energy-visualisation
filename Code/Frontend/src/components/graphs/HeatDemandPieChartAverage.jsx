import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const HeatDemandPieChartAverage = ({ data }) => {
    const beforeData = data.map(region => ({
        id: region.region,
        label: region.region,
        value: region.averagePerSqKmBefore
    }));

    const afterData = data.map(region => ({
        id: region.region,
        label: region.region,
        value: region.averagePerSqKmAfter
    }));

    return (
        <div style={{ display: 'flex', height: 400 }}>
            <div style={{ flex: 1 }}>
                <h3>Average Heat Demand Before Measures</h3>
                <ResponsivePie
                    data={beforeData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ scheme: 'blues' }}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkColor={{ from: 'color' }}
                    sliceLabelsSkipAngle={10}
                    sliceLabelsTextColor="#333333"
                    enableRadialLabels={false}
                    enableSliceLabels={false}
                    tooltip={({ datum }) => (
                        <div style={{
                            background: 'steelblue',
                            padding: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            color: datum.color
                        }}>
                            {datum.id}: {datum.value.toFixed(2)} kWh/sqkm
                        </div>
                    )}
                />
            </div>
            <div style={{ flex: 1 }}>
                <h3>Average Heat Demand After Measures</h3>
                <ResponsivePie
                    data={afterData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ scheme: 'blues' }}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 0.2]] }}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextColor="#333333"
                    radialLabelsLinkColor={{ from: 'color' }}
                    sliceLabelsSkipAngle={10}
                    sliceLabelsTextColor="#333333"
                    enableRadialLabels={false}
                    enableSliceLabels={false}
                    tooltip={({ datum }) => (
                        <div style={{
                            background: 'steelblue',
                            padding: '5px',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            color: datum.color
                        }}>
                            {datum.id}: {datum.value.toFixed(2)} kWh/sqkm
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default HeatDemandPieChartAverage;
