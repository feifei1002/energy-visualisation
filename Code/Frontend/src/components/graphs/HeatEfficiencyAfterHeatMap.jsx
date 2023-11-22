// Import React hooks and components for the HeatEfficiencyAfterHeatMap component
import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for map styling
import Chart from 'chart.js/auto';

// HeatEfficiencyAfterHeatMap component receives heatData and geoJsonData as props
export default function HeatEfficiencyAfterHeatMap({ heatData, geoJsonData }) {
  // State hooks for selected feature, chart instance, and chart usage
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [myChart, setMyChart] = useState(null);
  const [chartInUse, setChartInUse] = useState(false);
 
  // CSS classes for styling
  const mapContainerStyle = {
    height: '50vh',
    width: '100%',
    position: 'relative'
  };

  const chartStyle = {
    position: 'absolute',
    left: '1%',
    top: '1%',
    zIndex: 2000,
    background: '#fff',
    backgroundColor: '#fff'
  };

  const buttonStyle = {
    position: 'absolute',
    top: '90%',
    left: '1%',
    padding: '5px',
    background: '#000',
    zIndex: 3000,
    cursor: 'pointer',
    color: '#fff'
  };

  // Memoize heat data map for optimized mapping
  const heatDataMap = useMemo(() => {
    const map = new Map();
    heatData.forEach(item => map.set(item.LSOA11CD, item));
    return map;
  }, [heatData]);

  // Function to determine color based on total heat demand
  const getColor = (demand) => {
    if (demand > 20000000) return '#800026';
    if (demand > 15000000) return '#E05E42';
    if (demand > 10000000) return "#FFEDA0";
    if (demand > 5000000) return "#ADF007";
    return '#ADF007'; // Default color
  };

  // Memoized style function for GeoJSON features
  const style = useMemo(() => {
    return (feature) => {
      const demandData = heatDataMap.get(feature.properties.LSOA11CD);
      return demandData ? {
        fillColor: getColor(demandData['Total heat demand after energy efficiency measures 2018 (kWh)']),
        weight: 2,
        opacity: 1,
        color: 'white',
        fillOpacity: 0.7,
      } : {};
    };
  }, [heatDataMap]);

  // Memoized function to handle click events on GeoJSON features
  const onEachFeature = useMemo(() => {
    return (feature, layer) => {
      layer.on('click', () => {
        const demandData = heatDataMap.get(feature.properties.LSOA11CD);
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
          setSelectedFeature(feature);
          layer.bindPopup(popupContent).openPopup();
        }
      });
    };
  }, [heatDataMap]);

  // Effect to create or update the bar chart when chartInUse or selectedFeature changes
  useEffect(() => {
    if (chartInUse && selectedFeature) {
      const demandData = heatDataMap.get(selectedFeature.properties.LSOA11CD);
      if (demandData) {
        createOrUpdateStackedBarChart(demandData);
      }
    }
  }, [chartInUse, selectedFeature, heatDataMap]);

  // Function to set chartInUse to true
  const showBarChart = () => {
    setChartInUse(true);
  };

  // Function to create or update the stacked bar chart
  const createOrUpdateStackedBarChart = () => {
    if (!geoJsonData) {
      return;
    }

    const mapContainer = document.querySelector('.leaflet-container');

    if (!mapContainer) {
      return;
    }

    // Destroy the previous chart instance
    if (myChart) {
      myChart.destroy();
    }

    if (selectedFeature) {
      const demandData = heatDataMap.get(selectedFeature.properties.LSOA11CD);
      if (demandData) {
        const data = getChartData(demandData);
        const ctx = document.getElementById('stackedBarChartAfter').getContext('2d');

        setMyChart(new Chart(ctx, {
          type: 'bar',
          data: data,
          options: {
            scales: {
              x: {
                stacked: true,
              },
              y: {
                stacked: true,
              },
            },
            plugins: {
              title: {
                  display: true,
                  text: `Heat demand for ${demandData['Local Authority (2019)']}(${selectedFeature.properties.LSOA11CD})`
              }
            }
          },
        }));
      }
    }
  };

  // Function to format chart data
  const getChartData = (demandData) => {
    const data = {
      labels: ['Detached', 'Flat', 'Semi-detached', 'Terraced'],
      datasets: [
        {
          label: 'Biomass Boiler',
          backgroundColor: '#FF5733',
          data: [
            demandData['Number of detached biomass boiler in 2018'],
            demandData['Number of flat biomass boiler in 2018'],
            demandData['Number of semi-detached biomass boiler in 2018'],
            demandData['Number of terraced biomass boiler in 2018'],
          ],
        },
        {
          label: 'Gas Boiler',
          backgroundColor: '#3399FF',
          data: [
            demandData['Number of detached gas boiler in 2018'],
            demandData['Number of flat gas boiler in 2018'],
            demandData['Number of semi-detached gas boiler in 2018'],
            demandData['Number of terraced gas boiler in 2018'],
          ],
        },
        {
          label: 'Oil Boiler',
          backgroundColor: '#FFFF66',
          data: [
            demandData['Number of detached oil boiler in 2018'],
            demandData['Number of flat oil boiler in 2018'],
            demandData['Number of semi-detached oil boiler in 2018'],
            demandData['Number of terraced oil boiler in 2018'],
          ],
        },
        {
          label: 'Resistance Heating',
          backgroundColor: '#440D31',
          data: [
            demandData['Number of detached resistance heating in 2018'],
            demandData['Number of flat resistance heating in 2018'],
            demandData['Number of semi-detached resistance heating in 201'],
            demandData['Number of terraced resistance heating in 2018'],
          ],
        },
      ],
    };

    return data;
  };

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

  // Render the map with GeoJSON and TileLayer components, along with chart elements
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right'}}>
      <h3 style={{textAlign: 'left'}}>
        Total heat demand after energy efficiency measures 2018 (kWh)
      </h3>
      <div style={mapContainerStyle}>
        <MapContainer center={[55.3781, -3.4360]} maxZoom={12} minZoom={6} zoom={6} style={{ height: '100%', width: '100%' }} preferCanvas={true}>
          <GeoJSON
            data={geoJsonData.features} // GeoJSON data for the map
            style={style} // Style for the GeoJSON features
            onEachFeature={onEachFeature} // Interactive behavior definition for each feature
          />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" /> // Base map layer from OpenStreetMap
        </MapContainer>
        {chartInUse && (
        <canvas id="stackedBarChartAfter" style={chartStyle}></canvas>
        )
        }
        {selectedFeature && !myChart && (
            <button onClick={() => showBarChart()} 
            style={buttonStyle}
            >
            Show Bar Chart For Region(LSOA)</button>
        )}
        {myChart && (
          <button
            style={buttonStyle}
            onClick={() =>  {if (myChart) {
              myChart.destroy();
              setChartInUse(false);
              setMyChart(null);
            }}}
          >
            Close
          </button>
        )}
      </div>
    </div>
  );
}