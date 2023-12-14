import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';
import '../../../css/AdminAnalytics.css';

export default function PageViewPerMonth() {
    const [rawData, setRawData] = useState([]);
    const [selectedLines, setSelectedLines] = useState({});
    const [data, setData] = useState([]);

    const transformDataForGraph = (rawData) => {
        const lineData = {};

        rawData.forEach(item => {
            const key = item._id.pageUrl + ' - ' + item._id.eventType;
            const dateLabel = `${item._id.year}-${String(item._id.month).padStart(2, '0')}`;

            if (!lineData[key]) {
                lineData[key] = { id: key, data: [] };
            }
            lineData[key].data.push({ x: dateLabel, y: item.count });
        });

        return Object.values(lineData);
    };



    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:8082/api/analytics/pageviews-per-month');
            const result = await response.json();
            setRawData(result);
            setSelectedLines(result.reduce((acc, item) => {
                const key = item._id.pageUrl + ' - ' + item._id.eventType;
                acc[key] = true; // Initially, all lines are selected
                return acc;
            }, {}));
        };

        fetchData();
    }, []);

    useEffect(() => {
        const transformedData = transformDataForGraph(rawData);
        const filteredData = transformedData.filter(line => selectedLines[line.id]);
        setData(filteredData);
    }, [rawData, selectedLines]);



    const handleToggle = (lineId) => {
        setSelectedLines(prev => ({ ...prev, [lineId]: !prev[lineId] }));
    };

    return (
        <div>
            <div style={{ height: "500px",width: "800px" }}>
                <ResponsiveLine
                    data={data}
                    useMesh={true}
                    margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
                    xScale={{ type: 'time', format: '%Y-%m', precision: 'month' }}
                    xFormat="time:%Y-%m"
                    yScale={{ type: 'linear', stacked: true, min: 'auto', max: 'auto' }}
                    axisTop={null}
                    axisRight={null}
                    axisBottom={{
                        format: '%b %Y',
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
                        legendPosition: 'middle',
                        legendOffset: -40
                    }}
                    colors={{ scheme: 'category10' }}
                    tooltip={({ point }) => (
                        <div style={{ color: point.serieColor, background: 'white', padding: '5px', border: '1px solid #ccc' }}>
                            <strong>{point.serieId}</strong>: {point.data.y} views on {point.data.xFormatted}
                        </div>
                    )}
                />
            </div>
            <div>
                {Object.keys(selectedLines).map(lineId => (
                    <div className="checkbox-container" key={lineId} onClick={() => handleToggle(lineId)}>
                        <input
                            type="checkbox"
                            id={`checkbox-${lineId}`}
                            checked={selectedLines[lineId]}
                            onChange={() => handleToggle(lineId)}
                            style={{ display: 'none' }}
                        />
                        <label htmlFor={`checkbox-${lineId}`} className="checkbox-custom"></label>
                        <label htmlFor={`checkbox-${lineId}`} className="checkbox-label">{lineId}</label>
                    </div>
                ))}
            </div>
        </div>
    );
}
