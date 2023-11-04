import React, { useEffect, useState, useRef } from 'react';
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function HeatEfficiencyHeatMap() {
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [heatData, setHeatData] = useState(null);
  const geoJsonLayerRef = useRef(null);

  useEffect(() => {
    // Simultaneously fetch both sets of data
    Promise.all([
      fetch('https://open-geography-portalx-ons.hub.arcgis.com/datasets/ons::lower-layer-super-output-area-2011-to-clinical-commissioning-group-to-local-authority-district-april-2020-lookup-in-england-1.geojson?where=1=1').then((response) => response.json()),
      fetch('http://localhost:8082/data/annualheat').then((response) => response.json())
    ])
    .then(([geoJson, heat]) => {
      setGeoJsonData(geoJson);
      setHeatData(heat);
    })
    .catch(error => console.error('Error loading data:', error));
  }, []);

  useEffect(() => {
    const layer = geoJsonLayerRef.current;
    if (layer) {
        console.log("redrawing")
        layer.clearLayers().addData(geoJsonData);
    }
  }, [geoJsonData]);

  const getColor = (demand) => {
    // Define a color scale based on the heat demand value
    // Replace this with appropriate color scale logic
    return demand > 2000000 ? '#800026' :
           demand > 1500000  ? '#BD0026' :
           // ... more colors for different ranges
           '#FFEDA0';
  };

  const style = (feature) => {
    console.log("in")

    // Find the corresponding heat demand data
    const demandData = heatData.find(h => h.LSOA11CD === feature.properties.lsoa11cd);
    return demandData ? {
      fillColor: getColor(demandData['Total heat demand before energy efficiency measures 2018 (kWh)']),
      weight: 2,
      opacity: 1,
      color: 'white',
      fillOpacity: 0.7
    } : {};
  };

  const onEachFeature = (feature, layer) => {
    console.log("IN")

    // Find the corresponding heat demand data
    const demandData = heatData.find(h => h.LSOA11CD === feature.properties.lsoa11cd);
    if (demandData) {
      // Define the content of the popup
      const popupContent = `Local Authority: ${demandData['Local Authority (2019)']}<br>Total heat demand (before measures): ${demandData['Total heat demand before energy efficiency measures 2018 (kWh)']}`;
      layer.bindPopup(popupContent);
    }

    // Define the click event
    layer.on('click', function () {
      // Open the popup on click
      layer.openPopup();
    });
  };

  // Check if data is not yet loaded
  if (!geoJsonData || !heatData) {
    return <div>Loading...</div>;
  }

  return (
    <MapContainer center={[55.3781, -3.4360]} zoom={6} style={{ height: '100vh', width: '100%' }}>
     {geoJsonData && (<GeoJSON
        ref={geoJsonLayerRef}
        data={geoJsonData.features}
        style={style}
        onEachFeature={onEachFeature}
      />)}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}