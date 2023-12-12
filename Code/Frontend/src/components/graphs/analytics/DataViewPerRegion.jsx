import React, { useState, useEffect } from 'react';
import { ResponsiveGeoMap } from '@nivo/geo';
import axios from 'axios';

export default function DataViewMap() {
    const [selectedYear, setSelectedYear] = useState(2023);
    const [mapData, setMapData] = useState([]);
    const [geoJsonData, setGeoJsonData] = useState(null);
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
                //extract page urls available
                const uniqueUrls = [...new Set(response.data.map(item => item._id.pageUrl))];
                setPageUrls(uniqueUrls);
            })
            .catch(error => console.error(error));

        //fetching the GeoJSON data
        axios.get('http://localhost:8082/data/geojsonCountry')
            .then(response => setGeoJsonData(response.data))
            .catch(error => console.error('Error fetching GeoJSON:', error));

    }, [selectedYear]);

    return (
        <div>
            <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                <option value={2023}>2023</option>
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
                    data={selectedPageUrl ? mapData.filter(item => item.pageUrl === selectedPageUrl) : mapData}
                    projectionType="mercator"
                    colors={{ scheme: 'blues' }}
                    domain={[0, Math.max(...mapData.map(d => d.value))]}
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

