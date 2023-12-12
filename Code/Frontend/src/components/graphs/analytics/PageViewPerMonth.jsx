import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

export default function PageViewPerMonth() {

    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('/api/analytics/pageviews-per-month');
            const result = await response.json();
            const formattedData = result.map(item => ({
                date: `${item._id.month}-${item._id.year}`,
                PageViews: item.count
            }));
            setData(formattedData);
        };

        fetchData();
    }, []);

    return (
        <div style={{height: "400px"}}>
            <ResponsiveLine
                data={[{id: "PageViews", data: data}]}
                xScale={{type: 'point'}}
                yScale={{type: 'linear', stacked: true, min: 'auto', max: 'auto'}}
                axisTop={null}
                axisRight={null}
                axisBottom={{
                    orient: 'bottom',
                    format: '%m-%Y',
                    tickValues: 'every month',
                    legend: 'Month',
                    legendOffset: -12
                }}
                axisLeft={{
                    orient: 'left',
                    tickSize: 5,
                    tickPadding: 5,
                    tickRotation: 0,
                    legend: 'Page Views',
                    legendOffset: -40,
                    legendPosition: 'middle'
                }}
                colors={{scheme: 'nivo'}}
                pointSize={10}
                pointColor={{theme: 'background'}}
                pointBorderWidth={2}
                pointBorderColor={{from: 'serieColor'}}
                useMesh={true}
                legends={[]}
            />
        </div>
    );
}