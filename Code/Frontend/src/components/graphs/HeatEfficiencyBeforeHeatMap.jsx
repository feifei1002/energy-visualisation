import React, { useEffect, useState, useMemo } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import Chart from 'chart.js/auto';

export default function HeatEfficiencyBeforeHeatMap({ heatData, geoJsonData }) {
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [myChart, setMyChart] = useState(null);
  const [chartInUse, setChartInUse] = useState(false);

  const heatDataMap = useMemo(() => {
    const map = new Map();
    heatData.forEach((item) => map.set(item.LSOA11CD, item));
    return map;
  }, [heatData]);

  const getColor = (demand) => {
    if (demand > 20000000) return '#800026';
    if (demand > 15000000) return '#E05E42';
    if (demand > 10000000) return '#FFEDA0';
    if (demand > 5000000) return '#ADF007';
    return '#ADF007';
  };

  const style = useMemo(() => {
    return (feature) => {
      const demandData = heatDataMap.get(feature.properties.LSOA11CD);
      return demandData
        ? {
            fillColor: getColor(demandData['Total heat demand before energy efficiency measures 2018 (kWh)']),
            weight: 2,
            opacity: 1,
            color: 'white',
            fillOpacity: 0.7,
          }
        : {};
    };
  }, [heatDataMap]);

  const onEachFeature = useMemo(() => {
    return (feature, layer) => {
      layer.on('click', () => {
        const demandData = heatDataMap.get(feature.properties.LSOA11CD);
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
          setSelectedFeature(feature);
          layer.bindPopup(popupContent).openPopup();
        }
      });
    };
  }, [heatDataMap]);

  useEffect(() => {
    if (chartInUse && selectedFeature) {
      if (selectedFeature) {
        const demandData = heatDataMap.get(selectedFeature.properties.LSOA11CD);
        if (demandData) {
          createOrUpdateStackedBarChart(demandData);
        }
      }
    }
  }, [chartInUse, selectedFeature, heatDataMap]);

  const showBarChart = () => {
    setChartInUse(true);
  };
  
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
        const ctx = document.getElementById('stackedBarChart').getContext('2d');

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
                  text: `Heat demand for ${demandData['Local Authority (2019)']}`
              }
             
            }
          },
        }));
      }
    }
  };

  
  const getChartData = (demandData) => {
    // Generate or fetch your chart data here
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
      ],
    };
  
    return data;
  };

  if (!geoJsonData) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh', textAlign: 'center' }}>
        <p style={{ fontSize: '24px', fontWeight: 'bold', margin: '0 0 20px 0', color: '#333' }}>Loading Map Data...</p>
        <img src="https://i.gifer.com/ZKZg.gif" alt="Loading..." style={{ width: '50px', height: '50px' }} />
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'left' }}>
      <h3 style={{ textAlign: 'left' }}>Total heat demand before energy efficiency measures 2018 (kWh)</h3>
      <div style={{ height: '50vh', width: '100%' }}>
        <MapContainer center={[55.3781, -3.4360]} maxZoom={12} minZoom={6} zoom={6} style={{ height: '100%', width: '100%' }} preferCanvas={true}>
          <GeoJSON data={geoJsonData.features} style={style} onEachFeature={onEachFeature} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        </MapContainer>
        {chartInUse && (
        <canvas id="stackedBarChart" style={{ position: 'absolute', top: '37%', left: '1%', zIndex: 1000, background: '#fff'}}></canvas>
        )
        }
        {selectedFeature && !myChart && (
            <button onClick={() => showBarChart()} 
            style={{ position: 'absolute', top: '80%', left: '1%', padding: '5px', background: '#000', zIndex: 1001, cursor: 'pointer', color: '#fff' }}
            >
            Show Bar Chart For Region</button>
        )}
        {myChart && (
          <button
            style={{ position: 'absolute', top: '37%', left: '1%', padding: '5px', background: '#000', zIndex: 1001, cursor: 'pointer', color: '#fff' }}
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
