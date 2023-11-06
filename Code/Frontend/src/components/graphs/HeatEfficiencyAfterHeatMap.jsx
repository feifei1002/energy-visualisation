import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function HeatEfficiencyAfterHeatMap({heatData, geoJsonData }) {

  const heatDataMap = useMemo(() => {
    const map = new Map();
    heatData.forEach(item => map.set(item.LSOA11CD, item));
    return map;
  }, [heatData]);

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
        fillColor: getColor(demandData['Total heat demand after energy efficiency measures 2018 (kWh)']),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      } : {};
    };
  }, [heatDataMap]);

  // Function to handle feature events like click
  const onEachFeature = useMemo(() => {
    return (feature, layer) => {
      layer.on('click', () => {
        const demandData = heatDataMap.get(feature.properties.LSOA11CD);
        if (demandData) {
          const popupContent = `LSOA Code: ${feature.properties.LSOA11CD}<br>` +
          `Local Authority: ${demandData['Local Authority (2019)']}<br>` +
          `Total heat demand (after measures): ${demandData['Total heat demand after energy efficiency measures 2018 (kWh)'].toLocaleString()} kWh`;
          layer.bindPopup(popupContent).openPopup();
        }
      });
    };
  }, [heatDataMap]);

  if (!geoJsonData) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center' // Center the text horizontally
      }}>
        <p style={{
          fontSize: '24px', // Increase font size
          fontWeight: 'bold', // Make font bold
          margin: '0 0 20px 0', // Add some margin below the text
          color: '#333' // Change the text color to dark gray 
        }}>Loading Map Data...</p>
        <img 
          src="https://i.gifer.com/ZKZg.gif" 
          alt="Loading..."
          style={{
            width: '50px', 
            height: '50px' 
          }}
        />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right'}}>
    <h3 style={{textAlign: 'left'}}>
      Total heat demand after energy efficiency measures 2018 (kWh)
    </h3>
    <div style={{height: '50vh', width: '100%' }}>
      <MapContainer center={[55.3781, -3.4360]} maxZoom={12} minZoom={6} zoom={6} style={{ height: '100%', width: '100%' }} preferCanvas={true}>
        <GeoJSON
          data={geoJsonData.features}
          style={style}
          onEachFeature={onEachFeature}
        />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      </MapContainer>
    </div>
  </div>
  );
}
