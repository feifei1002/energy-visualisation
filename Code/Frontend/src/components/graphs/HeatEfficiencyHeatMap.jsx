import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function HeatEfficiencyHeatMap() {
  const [data, setData] = useState({ geoJsonData: null, heatData: null });

  useEffect(() => {
    Promise.all([
      fetch('http://localhost:8082/data/geojson').then(res => res.json()),
      fetch('http://localhost:8082/data/annualheat').then(res => res.json()),
    ]).then(([geoJsonData, heatData]) => {
      setData({ geoJsonData, heatData });
    }).catch(console.error);
  }, []);

  const heatDataMap = useMemo(() => {
    const map = new Map();
    data.heatData?.forEach(item => map.set(item.LSOA11CD, item));
    return map;
  }, [data.heatData]);

  const getColor = (demand) => {
    if (demand > 20000000) return '#800026';
    if (demand > 15000000) return '#E05E42';
    if (demand > 10000000) return "#FFEDA0";
    if (demand > 5000000) return "#ADF007";
    return '#ADF007'; // Default color
  };

  const style = useMemo(() => {
    return (feature) => {
      const demandData = heatDataMap.get(feature.properties.LSOA11CD);
      return demandData ? {
        fillColor: getColor(demandData['Total heat demand before energy efficiency measures 2018 (kWh)']),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      } : {};
    };
  }, [heatDataMap]);

  const onEachFeature = useMemo(() => {
    return (feature, layer) => {
      layer.on('click', () => {
        const demandData = heatDataMap.get(feature.properties.LSOA11CD);
        if (demandData) {
          const popupContent = `Local Authority: ${demandData['Local Authority (2019)']}<br>` +
                               `Total heat demand (before measures): ${demandData['Total heat demand before energy efficiency measures 2018 (kWh)'].toLocaleString()} kWh`;
          layer.bindPopup(popupContent).openPopup();
        }
      });
    };
  }, [heatDataMap]);

  if (!data.geoJsonData || !data.heatData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
    <h1>Total heat demand before energy efficiency measures 2018 (kWh)</h1>
    <MapContainer center={[55.3781, -3.4360]} zoom={6} style={{ height: '100vh', width: '100%' }} preferCanvas={true}>
      <GeoJSON
        data={data.geoJsonData.features}
        style={style}
        onEachFeature={onEachFeature}
      />
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    </MapContainer>
    </div>
  );
}
