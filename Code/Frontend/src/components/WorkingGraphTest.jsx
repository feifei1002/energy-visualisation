import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from "@nivo/bar";

function WorkingGraphTest() {
  // State variables to manage data, loading, errors, and search input
  const [jsonData, setJsonData] = useState(null); // State to hold fetched data
  const [loading, setLoading] = useState(true); // State to track loading status
  const [error, setError] = useState(null); // State to track error messages
  const [searchLSOA11CD, setSearchLSOA11CD] = useState(''); // The LSOA11CD to search for
  const [searchedData, setSearchedData] = useState(null); // Data corresponding to the search
  const [localAuthority, setLocalAuthority] = useState(''); // Local Authority data for display

  const apiUrl = 'http://localhost:8082/data/annualheat'; // API endpoint URL

  // Fetch data from the API when the component mounts
  useEffect(() => {
    // Use memoization to prevent re-fetching
    const memoizedApiUrl = apiUrl;

    fetch(memoizedApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setJsonData(data); // Store fetched data in state
        setLoading(false); // Set loading to false once data is loaded
      })
      .catch((err) => {
        setError(err); // Handle errors by setting the error state
        setLoading(false); // Set loading to false in case of an error
      });
  }, [apiUrl]);

  // Search for data with the specified LSOA11CD
  useEffect(() => {
    if (searchLSOA11CD && jsonData) {
      const result = jsonData.find((entry) => entry.LSOA11CD === searchLSOA11CD);
      setSearchedData(result); // Store search result in state
      if (result) {
        setLocalAuthority(result["Local Authority (2019)"]); // Set Local Authority state based on the search result
      }
    } else {
      setSearchedData(null); // Clear search result if no LSOA11CD is entered or no data is found
      setLocalAuthority(''); // Clear Local Authority if no LSOA11CD is entered or no data is found
    }
  }, [searchLSOA11CD, jsonData]);

  return (
    <div>
      <h1>Heat efficiency before and after energy efficiency measures for flat gas boiler (kWh) for a LSOA11CD</h1>
      <div>
        <label>
          LSOA11CD:
          <input
            type="text"
            value={searchLSOA11CD}
            onChange={(e) => setSearchLSOA11CD(e.target.value)} // Update searchLSOA11CD state on input change
          />
        </label>
        <div>
          <strong>Local Authority (2019): {localAuthority}</strong> {/* Display Local Authority */}
        </div>
      </div>
      {loading ? ( // Display loading message while data is being fetched
        <p>Loading data...</p>
      ) : error ? ( // Display error message if an error occurred during data fetching
        <p>Error: {error.message}</p>
      ) : searchedData ? ( // Display data and chart if a valid search result is found
        <div>
          <div>
            <h2>Chart</h2>
            <div style={{ width: 800, height: 400 }}>
              <ResponsiveBar
                data={[searchedData]}
                keys={["Total heat demand after energy efficiency measures 2018 (kWh)", "Total heat demand before energy efficiency measures 2018 (kWh)"]}
                indexBy="LSOA11CD"
              />
            </div>
          </div>
        </div>
      ) : (
        <p>No data found for the specified LSOA11CD.</p> // Display message when no search result is found
      )}
    </div>
  );
}

export default WorkingGraphTest;
