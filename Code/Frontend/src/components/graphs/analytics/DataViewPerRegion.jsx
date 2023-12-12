import React, { useState, useEffect } from 'react';
import { ResponsiveGeoMap } from '@nivo/geo';
import axios from 'axios';

export default function DataViewMap() {
    const [selectedYear, setSelectedYear] = useState(2023);
    const [geoJsonData, setGeoJsonData] = useState(null);
    const [mapData, setMapData] = useState([]);
    const [nivoMapData, setNivoMapData] = useState([]);
    const [selectedPageUrl, setSelectedPageUrl] = useState('');
    const [pageUrls, setPageUrls] = useState([]);

    useEffect(() => {
        // Fetching the analytics data
        axios.get(`http://localhost:8082/api/analytics/by-country?year=${selectedYear}`)
            .then(response => {
                const transformedData = response.data.map(item => ({
                    country: item._id.country,
                    pageUrl: item._id.pageUrl,
                    count: item.count
                }));
                setMapData(transformedData);

                // Extract page urls available
                const uniqueUrls = [...new Set(transformedData.map(item => item.pageUrl))];
                setPageUrls(uniqueUrls);
            })
            .catch(error => console.error(error));

        // Fetching the GeoJSON data
        axios.get('http://localhost:8082/data/geojsonCountry')
            .then(response => setGeoJsonData(response.data))
            .catch(error => console.error('Error fetching GeoJSON:', error));
    }, [selectedYear]);

    useEffect(() => {
        // Filter data by selectedPageUrl if one is selected
        const filteredData = selectedPageUrl
            ? mapData.filter(item => item.pageUrl === selectedPageUrl)
            : mapData;

        // Transform data for Nivo GeoMap
        const aggregatedData = filteredData.reduce((acc, item) => {
            acc[item.country] = (acc[item.country] || 0) + item.count;
            return acc;
        }, {});

        const transformedNivoData = Object.keys(aggregatedData).map(country => ({
            id: country,
            value: aggregatedData[country]
        }));

        setNivoMapData(transformedNivoData);
    }, [mapData, selectedPageUrl]);

    return (
        <div>
            <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                <option value={2023}>2023</option>
                {/* Add more year options as needed */}
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
                {geoJsonData && <ResponsiveGeoMap
                    features={geoJsonData.features}
                    data={nivoMapData}
                    projectionType="mercator"
                    colors={{ scheme: 'blues' }}
                    domain={[0, Math.max(...nivoMapData.map(d => d.value))]}
                    label="properties.name"
                    valueFormat=".2s"
                    borderWidth={0.5}
                    borderColor="#333333"
                    tooltip={({ feature, value }) => (
                        <strong>
                            {feature.properties.name}: {value}
                        </strong>
                    )}
                />}
            </div>
        </div>
    );
}
