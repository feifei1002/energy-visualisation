import React, { useState, useEffect } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import axios from 'axios';
import geoFeatures from '../../../data/countries';

export default function DataViewMap() {
    const [selectedYear, setSelectedYear] = useState(2023);
    const [selectedMonth, setSelectedMonth] = useState('');
    const [mapData, setMapData] = useState([]);
    const [nivoMapData, setNivoMapData] = useState([]);
    const [selectedPageUrl, setSelectedPageUrl] = useState('');
    const [pageUrls, setPageUrls] = useState([]);
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    useEffect(() => {
        //make sure we get the right url to query data from
        let url = `http://localhost:8082/api/analytics/by-country?year=${selectedYear}`;
        if (selectedMonth) {
            url += `&month=${selectedMonth}`;
        }
        //fetching the analytics data
        axios.get(url)
            .then(response => {
                const transformedData = response.data.map(item => ({
                    country: item._id.country,
                    pageUrl: item._id.pageUrl,
                    count: item.count,
                    month: new Date(item.timestamp).getMonth() + 1 // Extract month from timestamp
                }));
                setMapData(transformedData);
                const uniqueUrls = [...new Set(transformedData.map(item => item.pageUrl))];
                setPageUrls(uniqueUrls);
            })
            .catch(error => console.error(error));
    }, [selectedYear, selectedMonth]);

    useEffect(() => {
        let filteredData = selectedPageUrl
            ? mapData.filter(item => item.pageUrl === selectedPageUrl)
            : mapData;

        if (selectedMonth) {
            filteredData = filteredData.filter(item => item.month === parseInt(selectedMonth));
        }

        const aggregatedData = filteredData.reduce((acc, item) => {
            acc[item.country] = (acc[item.country] || 0) + item.count;
            return acc;
        }, {});

        const transformedNivoData = Object.keys(aggregatedData).map(country => ({
            id: country,
            value: aggregatedData[country]
        }));

        console.log(nivoMapData);
        setNivoMapData(transformedNivoData);
    },  [mapData, selectedPageUrl, selectedMonth]);

    const tooltip = ({ feature }) => {
        const dataItem = nivoMapData.find(item => item.id === feature.id);
        return (
            <div style={{
                background: 'white',
                padding: '10px',
                border: '1px solid #ddd',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
                {feature.properties.name}: {dataItem ? dataItem.value + ' Views' : 'No data'}
            </div>
        );
    };


    return (
        <div>
            <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                <option value={2023}>2023</option>
            </select>
            <select value={selectedMonth} onChange={e => setSelectedMonth(e.target.value)}>
                <option value="">Select a Month</option>
                {monthNames.map((month, index) => (
                    <option key={month} value={index + 1}>{month}</option>
                ))}
            </select>

            <div>
                <select value={selectedPageUrl} onChange={e => setSelectedPageUrl(e.target.value)}>
                    <option value="">Select a Page URL</option>
                    {pageUrls.map(url => (
                        <option key={url} value={url}>{url}</option>
                    ))}
                </select>
            </div>
            <div style={{ height: 400 }}>
                {nivoMapData.length > 0 && <ResponsiveChoropleth
                    data={nivoMapData}
                    features={geoFeatures.features}
                    tooltip={tooltip}
                    colors="nivo"
                    domain={[0, Math.max(...nivoMapData.map(d => d.value))]}
                    label="properties.name"
                    valueFormat=".2s"
                    projectionTranslation={[0.5, 0.5]}
                    projectionRotation={[0, 0, 0]}
                    borderWidth={0.5}
                    borderColor="#333333"
                    legends={[
                        {
                            anchor: 'bottom-left',
                            direction: 'column',
                            justify: true,
                            translateX: 20,
                            translateY: -100,
                            itemsSpacing: 0,
                            itemWidth: 94,
                            itemHeight: 18,
                            itemDirection: 'left-to-right',
                            itemTextColor: '#444444',
                            itemOpacity: 0.85,
                            symbolSize: 18,
                            effects: [
                                {
                                    on: 'hover',
                                    style: {
                                        itemTextColor: '#000000',
                                        itemOpacity: 1
                                    }
                                }
                            ]
                        }
                    ]}
                />}
            </div>
        </div>

    );
}
