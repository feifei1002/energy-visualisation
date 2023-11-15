// Import necessary React hooks and components from the 'react' library and React Leaflet for map rendering
import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for proper map styling

// Define the HeatEfficiencyAfterHeatMap component, which takes in heatData and geoJsonData as props
export default function HeatEfficiencyAfterHeatMap({ heatData, geoJsonData }) {

  // Memoize the heat data map for optimization; it re-computes only when heatData changes
  const heatDataMap = useMemo(() => {
    const map = new Map();
    // For each item in heatData, set a map entry with LSOA11CD as the key and the item as the value
    heatData.forEach(item => map.set(item.LSOA11CD, item));
    return map;
  }, [heatData]);

  // Function to determine color based on total heat demand
  const getColor = (demand) => {
    // Conditional color rendering based on the demand thresholds
    if (demand > 20000000) return '#800026';
    if (demand > 15000000) return '#E05E42';
    if (demand > 10000000) return "#FFEDA0";
    if (demand > 5000000) return "#ADF007";
    return '#ADF007'; // Default color if none of the conditions are met
  };

  // Memoize the style function, which determines the style of each feature on the map
  const style = useMemo(() => {
    return (feature) => {
      const demandData = heatDataMap.get(feature.properties.LSOA11CD);
      // If there's demand data, return a style object with specific properties
      return demandData ? {
        fillColor: getColor(demandData['Total heat demand after energy efficiency measures 2018 (kWh)']),
        weight: 2, // Border weight
        opacity: 1, // Border opacity
        color: 'white', // Border color
        fillOpacity: 0.7 // Fill opacity
      } : {}; // If no data, return an empty object
    };
  }, [heatDataMap]);

  // Memoize the onEachFeature function, which defines interactive behavior for each feature
  const onEachFeature = useMemo(() => {
    return (feature, layer) => {
      // Attach a click event to each feature
      layer.on('click', () => {
        const demandData = heatDataMap.get(feature.properties.LSOA11CD);
        // If there's demand data, create a popup with information about the feature
        if (demandData) {
          const popupContent = `
          LSOA Code: ${feature.properties.LSOA11CD}<br>
          Local Authority: ${demandData['Local Authority (2019)']}<br>
          Total heat demand (after measures): ${demandData['Total heat demand after energy efficiency measures 2018 (kWh)'].toLocaleString()} kWh<br>
          Annual Heat Demand by Dwellings (after measures):
          <ul>
            <li>Detached: ${demandData['Average heat demand after energy efficiency measures for detached gas boiler (kWh)'].toLocaleString()} kWh</li>
            <li>Flat: ${demandData['Average heat demand after energy efficiency measures for flat gas boiler (kWh)'].toLocaleString()} kWh</li>
            <li>Semi-detached: ${demandData['Average heat demand after energy efficiency measures for semi-detached gas boiler (kWh)'].toLocaleString()} kWh</li>
            <li>Terraced: ${demandData['Average heat demand after energy efficiency measures for terraced gas boiler (kWh)'].toLocaleString()} kWh</li>
          </ul>
        `;
          layer.bindPopup(popupContent).openPopup();
        }
      });
    };
  }, [heatDataMap]);

  // Render a loading state if geoJsonData is not yet available
  if (!geoJsonData) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        textAlign: 'center'
      }}>
        <p style={{
          fontSize: '24px',
          fontWeight: 'bold',
          margin: '0 0 20px 0',
          color: '#333'
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

  // Render the map with GeoJSON and TileLayer components from React Leaflet
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right'}}>
      <h3 style={{textAlign: 'left'}}>
        Total heat demand after energy efficiency measures 2018 (kWh)
      </h3>
      <div style={{height: '50vh', width: '100%' }}>
        <MapContainer center={[55.3781, -3.4360]} maxZoom={12} minZoom={6} zoom={6} style={{ height: '100%', width: '100%' }} preferCanvas={true}>
          <GeoJSON
            data={geoJsonData.features} // GeoJSON data for the map
            style={style} // Style for the GeoJSON features
            onEachFeature={onEachFeature} // Interactive behavior definition for each feature
          />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> // Base map layer from OpenStreetMap
        </MapContainer>
      </div>
    </div>
  );
}
