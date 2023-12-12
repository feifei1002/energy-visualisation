import React, { useState, useEffect } from 'react';
import { ResponsiveGeoMap } from '@nivo/geo';
import axios from 'axios';
import worldCountries from './geoJsonData.json';

const DataViewMap = () => {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [mapData, setMapData] = useState([]);

    useEffect(() => {
        axios.get(`/api/analytics/by-country?year=${selectedYear}`)
            .then(response => {
                // Transform the data to match the format expected by Nivo GeoMap
                const transformedData = response.data.map(item => ({
                    id: item._id, // country name
                    value: item.count
                }));
                setMapData(transformedData);
            })
            .catch(error => console.error(error));
    }, [selectedYear]);

    return (
        <div>
            <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                {/* Generate year options */}
                {/* ... */}
            </select>

            <div style={{ height: 400 }}>
                <ResponsiveGeoMap
                    features={worldCountries.features}
                    data={mapData}
                    // ... other required props and configurations for GeoMap
                />
            </div>
        </div>
    );
};

export default DataViewMap;
