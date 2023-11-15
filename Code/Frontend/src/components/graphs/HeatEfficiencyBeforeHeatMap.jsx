// Importing React hooks and components for use in the component.
import React, { useEffect, useState, useMemo } from 'react';
// Importing specific components from the 'react-leaflet' package to render maps.
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
// Importing Leaflet's CSS for proper map styling.
import 'leaflet/dist/leaflet.css';

// Component for rendering a heatmap, receiving heatData and geoJsonData as props.
export default function HeatEfficiencyBeforeHeatMap({heatData, geoJsonData }) {

  // Creating a memoized map of heat data for optimization purposes.
  const heatDataMap = useMemo(() => {
    const map = new Map();
    // Mapping each item in heatData by its LSOA11CD code for quick access.
    heatData.forEach(item => map.set(item.LSOA11CD, item));
    return map;
  }, [heatData]);

  // Function to determine the color of a region based on its heat demand.
  const getColor = (demand) => {
    // Conditional color coding based on heat demand values.
    if (demand > 20000000) return '#800026';
    if (demand > 15000000) return '#E05E42';
    if (demand > 10000000) return "#FFEDA0";
    if (demand > 5000000) return "#ADF007";
    return '#ADF007'; // Default color if none of the above conditions are met.
  };

  // Creating a memoized function to apply styles to map features.
  const style = useMemo(() => {
    return (feature) => {
      // Accessing the demand data for the feature's LSOA11CD code.
      const demandData = heatDataMap.get(feature.properties.LSOA11CD);
      // If demand data is available, return the corresponding style object.
      return demandData ? {
        fillColor: getColor(demandData['Total heat demand before energy efficiency measures 2018 (kWh)']),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7
      } : {};
    };
  }, [heatDataMap]);

  // Defining a memoized function to handle interactions with each map feature.
  const onEachFeature = useMemo(() => {
    return (feature, layer) => {
      // Adding a click event listener to the layer.
      layer.on('click', () => {
        // Getting the demand data for the clicked feature.
        const demandData = heatDataMap.get(feature.properties.LSOA11CD);
        // If demand data exists, create a popup with details.
        if (demandData) {
          const popupContent = `
          LSOA Code: ${feature.properties.LSOA11CD}<br>
          Local Authority: ${demandData['Local Authority (2019)']}<br>
          Total heat demand (before measures): ${demandData['Total heat demand before energy efficiency measures 2018 (kWh)'].toLocaleString()} kWh<br>
          Annual Heat Demand by Dwellings (before measures):
          <ul>
            <li>Detached: ${demandData['Average heat demand before energy efficiency measures for detached gas boiler (kWh)'].toLocaleString()} kWh</li>
            <li>Flat: ${demandData['Average heat demand before energy efficiency measures for flat gas boiler (kWh)'].toLocaleString()} kWh</li>
            <li>Semi-detached: ${demandData['Average heat demand before energy efficiency measures for semi-detached gas boiler (kWh)'].toLocaleString()} kWh</li>
            <li>Terraced: ${demandData['Average heat demand before energy efficiency measures for terraced gas boiler (kWh)'].toLocaleString()} kWh</li>
          </ul>
        `;
          layer.bindPopup(popupContent).openPopup();
        }
      });
    };
  }, [heatDataMap]);

  // Conditional rendering to display a loading state if geoJsonData is not available.
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

  // Main render return: the map and its components.
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left'}}>
    <h3 style={{textAlign: 'left'}}>
      Total heat demand before energy efficiency measures 2018 (kWh)
    </h3>
    <div style={{height: '50vh', width: '100%' }}>
      <MapContainer center={[55.3781, -3.4360]} maxZoom={12} minZoom={6} zoom={6} style={{ height: '100%', width: '100%' }} preferCanvas={true}>
        <GeoJSON
          data={geoJsonData.features} // The geographical data to be used in rendering the map
          style={style} // The style applied to the geographical features
          onEachFeature={onEachFeature} // Functions to handle events on the geographical features
        />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> // The tile layer used for the map's base imagery
      </MapContainer>
    </div>
  </div>
  );
}
