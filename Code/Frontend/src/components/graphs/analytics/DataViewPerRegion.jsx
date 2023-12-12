import React, { useState, useEffect } from 'react';
import { ResponsiveGeoMap } from '@nivo/geo';
import axios from 'axios';

const DataViewMap = () => {
    const [selectedYear, setSelectedYear] = useState(2023);
    const [mapData, setMapData] = useState([]);
    const [geoJsonData, setGeoJsonData] = useState(null);

    useEffect(() => {
        // Fetching the analytics data
        axios.get(`/api/analytics/by-country?year=${selectedYear}`)
            .then(response => {
                const transformedData = response.data.map(item => ({
                    id: item._id, //assuming this matches the 'ISO_3166-1_alpha-3' in GeoJSON
                    value: item.count
                }));
                setMapData(transformedData);
            })
            .catch(error => console.error(error));

        //fetching the GeoJSON data
        axios.get('/data/geojsonCountry')
            .then(response => setGeoJsonData(response.data))
            .catch(error => console.error('Error fetching GeoJSON:', error));
    }, [selectedYear]);

    return (
        <div>
            <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                <option value={2023}>2023</option>
            </select>

            <div style={{ height: 400 }}>
                {geoJsonData && <ResponsiveGeoMap
                    features={geoJsonData.features}
                    data={mapData}
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
};

export default DataViewMap;
