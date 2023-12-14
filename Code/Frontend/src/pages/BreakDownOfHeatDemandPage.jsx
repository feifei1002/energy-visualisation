// Import necessary hooks and React itself from the react package.
import React, { useRef, useState, useEffect } from 'react';

// Import various graph components that will be used to display data visualizations.
import VisualisationsDropdownMenu from "../components/VisualisationsDropdownMenu";
import LocalAuthorityDropDownMenu from "../components/LocalAuthorityDropDownMenu";
import BreakDownOfHeatDemandHeatTechnology from '../components/graphs/BreakDownOfHeatDemandHeatTechnology';
import BreakDownOfHeatDemandDwellings from '../components/graphs/BreakDownOfHeatDemandDwellings';
import BreakDownOfHeatDemandRurality from '../components/graphs/BreakDownOfHeatDemandRurality';
import BreakDownOfHeatDemandHeatTechnologyBar from '../components/graphs/BreakDownOfHeatDemandHeatTechnologyBar';
import BreakDownOfHeatDemandDwellingsBar from '../components/graphs/BreakDownOfHeatDemandDwellingsBar';
import BreakDownOfHeatDemandRuralityBar from '../components/graphs/BreakDownOfHeatDemandRuralityBar';
import Header from "../Header";
import LoadingGif from "../assets/LoadingGif.gif";
import { FaArrowDown } from 'react-icons/fa';
import downloadCSV from "../helperFunctions/downloadCSV.js";
import InfoToolTip from '../components/InfoToolTip.jsx';
import Switch from 'react-switch';

//analytics tracking
import trackEvent from '../utils/analytics';

// The main component function that will be exported and used to display the page.
export default function BreakDownOfHeatDemandPage() {

  //analytics tracking
  const [userLocation, setUserLocation] = useState(null);

  const [showPieChart, setShowPieChart] = useState(true); // State to toggle between pie and bar charts

  navigator.geolocation.getCurrentPosition((position) => {
    const location = `${position.coords.latitude}, ${position.coords.longitude}`;
    setUserLocation(location); // This will update the state
  });
  //log user viewing page
  const pageUrl = window.location.href;
  if (userLocation !== null) {
    trackEvent('DataView', null, pageUrl, userLocation, {CSVName: 'Annual_heat_demand_LSOA_EnglandWales.csv'});
  }
  //handle the download CSV file when the download button is clicked
  const handleDownloadCSV = () => {
    downloadCSV(heatData, "Annual_heat_demand_LSOA_EnglandWales.csv");
    //log the action
    trackEvent('CSVDownload', null, pageUrl, userLocation, {CSVName: 'Annual_heat_demand_LSOA_EnglandWales.csv'});
  }
  // useRef hook to persist the loading state without triggering re-renders.
  const loadingRef = useRef(false);

  // useState hooks to manage the state of the data for the page.
  const [heatData, setHeatData] = useState(null);
  const [geoJsonData, setGeoJsonData] = useState(null);
  const [error, setError] = useState(null);
  const [uniqueLocalAuthorities, setUniqueLocalAuthorities] = useState(null);
  const [selectedAuthority, setSelectedAuthority] = useState(null);

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

  useEffect(() => {
    if (heatData) {
      // Extract the list of local authorities
      const localAuthorities = heatData.map(entry => entry["Local Authority (2019)"]);

      // Remove duplicate entries and set the unique local authorities state.
      const uniqueAuthorities = Array.from(new Set(localAuthorities));
      setUniqueLocalAuthorities(uniqueAuthorities.sort()); //Sort in alphabetical order

      // Select "Adur" by default if it exists in the data
      if (!selectedAuthority && uniqueAuthorities.includes("Adur")) {
        setSelectedAuthority("Adur");
      } else if (!selectedAuthority && uniqueAuthorities.length > 0) {
        setSelectedAuthority(uniqueAuthorities[0]);
      }
    }
  }, [heatData]);

  // Callback function to handle authority selection.
  const handleSelectAuthority = (newAuthority) => {
    // Update the selected authority state and trigger re-rendering.
    setSelectedAuthority(newAuthority);
  };

  // Conditional rendering based on the state of the data and any error.
  if (error) {
    // Render an error message if there is an error.
    return <div>Error: {error}</div>;
  }

  const scrollDown = (chartNum) => {
    const nextChart = document.getElementById(`chart${chartNum}`);
    if (nextChart) {
      nextChart.scrollIntoView({ behavior: 'smooth' });
    }
  };


  //Toggle for switching between 
  const toggleChartType = () => {
    setShowPieChart(!showPieChart);
  };

  // Styling for this page
  const pageStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  };

  // Drop down style for this page
  const dropdownStyle = {
    padding: '1em', // Padding inside the sidebar
    overflowY: 'auto', // Scroll vertically if content overflows
  };

  // Styling for div around the down arrows
  const arrowDivStyle = {
    display: 'inline-flex',
    marginRight: '10px', 
    verticalAlign: 'middle', // Center vertically
  };

  //Styling for the down arrows to take the user to the next chart
  const arrowStyle = {
    display: 'block',
    textAlign: 'center',
    cursor: 'pointer',
    marginRight: '1vw',
  };

  // Styling for each pie chart
  const pieStyle = {
    display: 'block',
    marginTop: '2vh',
    width: '100%', // Suitable percentage for responsiveness
    margin: 'auto', // Center the charts
  };

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
              src={LoadingGif}
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
        <div>
         <InfoToolTip dataset={"Breakdown of heat demand"} />
         <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px' }}>
                <span style={{ marginRight: '10px' }}>Bar Chart</span>
                <Switch
                    onChange={toggleChartType}
                    checked={showPieChart}
                    onColor="#007BFF"
                    offColor="#333"
                    checkedIcon={false}
                    uncheckedIcon={false}
                />
                <span style={{ marginLeft: '10px' }}>Pie Chart</span>
            </div>
        </div>
        <div>
          <button style={{ background: "#206887", borderColor: "#206887", color: "white", padding: "10px", marginTop: '1vh' }} onClick={handleDownloadCSV}>Download CSV</button>
        </div>
        <div style={pageStyle}>
          <div style={dropdownStyle}>
            <h3>Breakdown of heat demand before energy efficiency measures for {selectedAuthority}</h3>
            {uniqueLocalAuthorities && (<LocalAuthorityDropDownMenu
              authorities={['All Authorities', ...uniqueLocalAuthorities]}
              selectedAuthority={selectedAuthority}
              onSelectAuthority={handleSelectAuthority}
            />)}
          </div>
        </div>
        <div style={pageStyle}>
          {showPieChart ? (
            <div>
            <div style={pieStyle}>
              <div style={arrowDivStyle}>
                <FaArrowDown id="chart1" style={arrowStyle} onClick={() => scrollDown(2)} />
                <h6>Next</h6>
              </div>
              <h5>Most common type of boilers used in {selectedAuthority} by percent</h5>
              <BreakDownOfHeatDemandHeatTechnology
                heatData={heatData} // Pass necessary props to the child component
                localAuthority={selectedAuthority === 'All' ? null : selectedAuthority}// Pass selectedAuthority as localAuthority prop
              />
            </div>
            <div style={pieStyle}>
              <div style={arrowDivStyle}>
                <FaArrowDown id="chart2" style={arrowStyle} onClick={() => scrollDown(3)} />
                <h6>Next</h6>
              </div>
              <h5>Breakdown of heat demand by dwellings for {selectedAuthority} by percent</h5>
              <BreakDownOfHeatDemandDwellings
                heatData={heatData} // Pass necessary props to the child component
                localAuthority={selectedAuthority === 'All' ? null : selectedAuthority} // Pass selectedAuthority as localAuthority prop
              />
            </div>
            <div style={pieStyle}>
              <div style={arrowDivStyle}>
                <FaArrowDown id="chart3" style={arrowStyle} onClick={() => scrollDown(3)} />
                <h6>Next</h6>
              </div>
              <h5>Breakdown of heat demand by rurality for {selectedAuthority} by percent</h5>
              <BreakDownOfHeatDemandRurality
                heatData={heatData} // Pass necessary props to the child component
                localAuthority={selectedAuthority === 'All' ? null : selectedAuthority} // Pass selectedAuthority as localAuthority prop
              />
            </div>
            </div>
          ): (
            <div>
            <div style={pieStyle}>
              <div style={arrowDivStyle}>
                <FaArrowDown id="chart1" style={arrowStyle} onClick={() => scrollDown(2)} />
                <h6>Next</h6>
              </div>
              <h5>Most common type of boilers used in {selectedAuthority} by percent</h5>
              <BreakDownOfHeatDemandHeatTechnologyBar
                heatData={heatData} // Pass necessary props to the child component
                localAuthority={selectedAuthority === 'All' ? null : selectedAuthority}// Pass selectedAuthority as localAuthority prop
              />
            </div>
            <div style={pieStyle}>
              <div style={arrowDivStyle}>
                <FaArrowDown id="chart2" style={arrowStyle} onClick={() => scrollDown(3)} />
                <h6>Next</h6>
              </div>
              <h5>Breakdown of heat demand by dwellings for {selectedAuthority} by percent</h5>
              <BreakDownOfHeatDemandDwellingsBar
                heatData={heatData} // Pass necessary props to the child component
                localAuthority={selectedAuthority === 'All' ? null : selectedAuthority} // Pass selectedAuthority as localAuthority prop
              />
            </div>
            <div style={pieStyle}>
              <div style={arrowDivStyle}>
                <FaArrowDown id="chart3" style={arrowStyle} onClick={() => scrollDown(3)} />
                <h6>Next</h6>
              </div>
              <h5>Breakdown of heat demand by rurality for {selectedAuthority} by percent</h5>
              <BreakDownOfHeatDemandRuralityBar
                heatData={heatData} // Pass necessary props to the child component
                localAuthority={selectedAuthority === 'All' ? null : selectedAuthority} // Pass selectedAuthority as localAuthority prop
              />
            </div>
            </div>
          )}
        </div>
      </>
    );
  }
}