import React, { useState, useEffect } from 'react';
import { ResponsiveLine } from '@nivo/line';

export default function PageViewPerMonth() {
    const [rawData, setRawData] = useState([]);
    const [selectedLines, setSelectedLines] = useState({});
    const [data, setData] = useState([]);

    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const transformDataForGraph = (rawData) => {
        const lineData = {};

        rawData.forEach(item => {
            const key = item._id.pageUrl + ' - ' + item._id.eventType;
            const dateLabel = monthNames[item._id.month - 1] + ' ' + item._id.year;

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
            <div style={{height: "400px"}}>
                <ResponsiveLine
                    data={data}
                />
            </div>
            <div>
                {Object.keys(selectedLines).map(lineId => (
                    <div key={lineId}>
                        <input
                            type="checkbox"
                            checked={selectedLines[lineId]}
                            onChange={() => handleToggle(lineId)}
                        />
                        {lineId}
                    </div>
                ))}
            </div>
        </div>
    );
}
