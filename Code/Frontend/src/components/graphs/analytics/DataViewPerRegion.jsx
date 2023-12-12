import React, { useState, useEffect } from 'react';
import { ResponsiveChoropleth } from '@nivo/geo';
import axios from 'axios';
import geoFeatures from '../../../data/countries';

export default function DataViewMap() {
    const [selectedYear, setSelectedYear] = useState(2023);
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
                const uniqueUrls = [...new Set(transformedData.map(item => item.pageUrl))];
                setPageUrls(uniqueUrls);
            })
            .catch(error => console.error(error));

    }, [selectedYear]);

    useEffect(() => {
        const filteredData = selectedPageUrl
            ? mapData.filter(item => item.pageUrl === selectedPageUrl)
            : mapData;

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
    }, [mapData, selectedPageUrl]);

    const tooltip = ({ feature }) => {
        const dataItem = nivoMapData.find(item => item.id === feature.id);
        return (
            <span>
                {feature.properties.name}: {dataItem ? dataItem.value : 'No data'}
            </span>
        );
    };

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
