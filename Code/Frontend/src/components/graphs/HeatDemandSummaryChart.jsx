import React from 'react';
import { ResponsiveBar } from '@nivo/bar';

const HeatDemandSummaryChart = ({ data }) => {
    return (
        <div style={{ height: 400 }}>
            <h3>Total Heat Demand Before & After Measures</h3>
            <ResponsiveBar
                data={data}
                keys={['totalBefore', 'totalAfter']}
                indexBy="region"
                margin={{ top: 40, right: 50, bottom: 90, left: 120 }}
                padding={0.3}
                colors={{ scheme: 'blues' }}
                borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
                axisBottom={{
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Region',
                    legendPosition: 'middle',
                    legendOffset: 32
                }}
                axisLeft={{
                    tickSize: 0, // Remove the tick marks
                    tickPadding: -60,
                    tickRotation: 0,
                    legend: 'Heat Demand (kWh)',
                    legendPosition: 'middle',
                    legendOffset: -40
                }}
                labelSkipWidth={12}
                labelSkipHeight={12}
                labelTextColor="#000000"
                enableLabel={false}
                animate={true}
                motionStiffness={90}
                motionDamping={15}
                theme={{
                    fontSize: '14px',
                    labels: {
                        text: { fill: '#555' }
                    },
                    tooltip: {
                        container: {
                            background: '#fff',
                            color: '#333',
                            fontSize: '13px',
                            borderRadius: '2px',
                            boxShadow: '0 3px 9px rgba(0, 0, 0, 0.5)',
                            padding: '5px'
                        }
                    }
                }}
            />
        </div>
    );
};

export default HeatDemandSummaryChart;