import React, { useRef, useState, useEffect } from 'react';
import BeforeAfterHeatDemandBar from '../components/graphs/BeforeAfterHeatDemandBar';
import TotalHeatEfficiency from '../components/graphs/TotalHeatEfficiency';
import HeatEfficiencyHeatMap from '../components/graphs/HeatEfficiencyHeatMap';

export default function BeforeAfterHeatDemandPage() {
  console.log('beforeAfterHeatDemandPage');
  const loadingRef = useRef(false);
  const [heatData, setHeatData] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [error, setError] = useState(null);

   //Remove padding and margin from the body when component mounts
   useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    // Reset body styles when the component unmounts
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  useEffect(() => {
    
    // Only load data once
    if (loadingRef.current) return;
    loadingRef.current = true;

    // Fetch Annual Heat Data
    const fetchHeatData = async () => {
      console.log('fetchHeatData...');

      try {
        const response = await fetch('http://localhost:8082/data/annualheat', { cache: 'force-cache' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        setHeatData(fetchedData);
      } catch (e) {
        setError(e.message);
        console.error("Fetching annual heat data failed", e);
      }
    };

    // Fetch GeoJSON Data
    const fetchGeoJsonData = async () => {
      console.log('fetchGeoJsonData...');
      
      try {
        const response = await fetch('http://localhost:8082/data/geojson', { cache: 'force-cache' });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const fetchedData = await response.json();
        setGeoJsonData(fetchedData);
      } catch (e) {
        setError(e.message);
        console.error("Fetching GeoJSON data failed", e);
      }
    };

    fetchHeatData();
    fetchGeoJsonData();
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!heatData || !geoJsonData) {
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
        }}>Getting your data...</p>
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
  } else {
    return (
      <>
        <HeatEfficiencyHeatMap heatData={heatData} geoJsonData={geoJsonData} />
        <TotalHeatEfficiency heatData={heatData} />
        <BeforeAfterHeatDemandBar data={heatData} />
      </>
    );
  }
}
