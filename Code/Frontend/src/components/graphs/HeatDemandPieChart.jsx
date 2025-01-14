import React from 'react';
import { ResponsivePie } from '@nivo/pie';

const HeatDemandPieChart = ({ data }) => {
    const beforeData = data.map(region => ({
        id: region.region,
        label: region.region,
        value: region.totalBefore / 1000000 //convert kWh to GWh
    }));

    const afterData = data.map(region => ({
        id: region.region,
        label: region.region,
        value: region.totalAfter / 1000000 //convert kWh to GWh
    }));


    return (
        <div style={{ display: 'flex', height: 400 }}>
            <div style={{ flex: 1 }}>
                <h3>Total Heat Demand Before Measures</h3>
                <ResponsivePie
                    data={beforeData}
                    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
                    innerRadius={0.5}
                    padAngle={0.7}
                    cornerRadius={3}
                    colors={{ scheme: 'blues' }}
                    borderWidth={1}
                    borderColor={{ from: 'color', modifiers: [['darker', 1]] }}
                    radialLabelsSkipAngle={10}
                    radialLabelsTextColor="#FFFFFF"
                    radialLabelsLinkColor={{ from: 'color' }}
                    sliceLabelsSkipAngle={10}
                    sliceLabelsTextColor="#FFFFFF"
                    enableRadialLabels={false} // Disable radial labels
                    enableSliceLabels={false} // Disable slice labels
                    tooltip={({ datum }) => (
                        <div style={{
                            background: 'steelblue',
                            padding: '5px',
                            border: '1px solid #000000',
                            borderRadius: '4px',
                            color: datum.color
                        }}>
                            {datum.id}: {datum.value.toFixed(2)} GWh
                        </div>
                    )}
                />
            </div>
            <div style={{ flex: 1 }}>
                <h3>Total Heat Demand After Measures</h3>
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
                    enableRadialLabels={false} // Disable radial labels
                    enableSliceLabels={false} // Disable slice labels
                    tooltip={({ datum }) => (
                        <div style={{
                            background: 'steelblue',
                            padding: '5px',
                            border: '1px solid #000000',
                            borderRadius: '4px',
                            color: datum.color
                        }}>
                            {datum.id}: {datum.value.toFixed(2)} GWh
                        </div>
                    )}
                />
            </div>
        </div>
    );
};

export default HeatDemandPieChart;
