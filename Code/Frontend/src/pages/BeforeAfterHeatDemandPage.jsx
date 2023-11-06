// Import necessary hooks and React itself from the react package.
import React, { useRef, useState, useEffect } from 'react';
// Import various graph components that will be used to display data visualizations.
import BeforeAfterHeatDemandBar from '../components/graphs/BeforeAfterHeatDemandBar';
import TotalHeatEfficiency from '../components/graphs/TotalHeatEfficiency';
import HeatEfficiencyBeforeHeatMap from '../components/graphs/HeatEfficiencyBeforeHeatMap';
import HeatEfficiencyAfterHeatMap from '../components/graphs/HeatEfficiencyAfterHeatMap';
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu";
import Header from "../Header";

// The main component function that will be exported and used to display the page.
export default function BeforeAfterHeatDemandPage() {
  // A console log for debugging purposes.
  console.log('beforeAfterHeatDemandPage');
  // useRef hook to persist the loading state without triggering re-renders.
  const loadingRef = useRef(false);
  // useState hooks to manage the state of the data for the page.
  const [heatData, setHeatData] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [error, setError] = useState(null);

  // useEffect hook to remove padding and margin from the body when the component mounts.
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    // Cleanup function to reset the body styles when the component unmounts.
    return () => {
      document.body.style.margin = '';
      document.body.style.padding = '';
    };
  }, []);

  // useEffect hook to load data.
  useEffect(() => {
    // Condition to prevent data from being loaded more than once.
    if (loadingRef.current) return;
    loadingRef.current = true;

    // Asynchronous function to fetch annual heat data from a local server.
    const fetchHeatData = async () => {
      console.log('fetchHeatData...');
      try {
        // Attempt to fetch the data using the Fetch API.
        const response = await fetch('http://localhost:8082/data/annualheat', { cache: 'force-cache' });
        // Throw an error if the response is not OK to handle it in the catch block.
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        // If the response is ok, parse the JSON and set the heat data state.
        const fetchedData = await response.json();
        setHeatData(fetchedData);
      } catch (e) {
        // Catch any errors, log them, and set the error state.
        setError(e.message);
        console.error("Fetching annual heat data failed", e);
      }
    };

    // Asynchronous function to fetch GeoJSON data.
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

    // Trigger the data fetching functions.
    fetchHeatData();
    fetchGeoJsonData();
  }, []);

  // Conditional rendering based on the state of the data and any error.
  if (error) {
    // Render an error message if there is an error.
    return <div>Error: {error}</div>;
  }

  // Render a loading state if the data has not been loaded yet.
  if (!heatData || !geoJsonData) {
    return (
      <>
      <Header />
      <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
      <div style={{
        display: 'flex', 
        flexDirection: 'row', 
        width: '100%', 
        alignItems: 'stretch',
        boxSizing: 'border-box',
      }}>
        <div style={{ flex: 1, padding: '0', margin: '0.5em', boxSizing: 'border-box' }}>
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
      </div>
      </>
    );
  } else {
    // Render the main content of the page if the data is available.
    return (
      <>
        <Header />
        <VisualisationsDropdownMenu></VisualisationsDropdownMenu>
        <div style={{
          display: 'flex', 
          flexDirection: 'row', 
          width: '100%', 
          alignItems: 'stretch',
          boxSizing: 'border-box',
        }}>
          {/* Heat maps showing data before and after efficiency measures */}
          <div style={{ flex: 1, padding: '0', margin: '0.5em', boxSizing: 'border-box' }}>
            <HeatEfficiencyBeforeHeatMap heatData={heatData} geoJsonData={geoJsonData} />
          </div>
          <div style={{ flex: 1, padding: '0', margin: '0.5em', boxSizing: 'border-box' }}>
            <HeatEfficiencyAfterHeatMap heatData={heatData} geoJsonData={geoJsonData} />
          </div>
        </div>
        {/* Components that display total heat efficiency and a bar chart of heat demand */}
        <TotalHeatEfficiency heatData={heatData} />
        <BeforeAfterHeatDemandBar data={heatData} />
      </>
    );
  }
}
