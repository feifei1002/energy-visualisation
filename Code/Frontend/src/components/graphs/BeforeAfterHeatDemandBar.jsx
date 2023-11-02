import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from "@nivo/bar";

export default function BeforeAfterHeatDemandBar() {
  // State variables for managing data and user interface
  const [jsonData, setJsonData] = useState(null);  // Holds the fetched data
  const [loading, setLoading] = useState(true);     // Indicates if data is being loaded
  const [error, setError] = useState(null);         // Stores any loading errors
  const [searchLocalAuthority, setSearchLocalAuthority] = useState(''); // User-inputted Local Authority to search for
  const [searchedData, setSearchedData] = useState([]); // Holds filtered data or empty array
  const [localAuthorities, setLocalAuthorities] = useState(null); // Holds calculated data or null

  // API endpoint for data retrieval
  const apiUrl = 'http://localhost:8082/data/annualheat';

  // Effect to fetch and load data from the API
  useEffect(() => {
    const memoizedApiUrl = apiUrl;

    fetch(memoizedApiUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setJsonData(data);   // Store fetched data
        setLoading(false);    // Mark data loading as complete
      })
      .catch((err) => {
        setError(err);        // Store any loading errors
        setLoading(false);    // Mark data loading as complete
      });
  }, [apiUrl]);

  // Effect to filter data based on user input and populate 'searchedData'
  useEffect(() => {
    if (searchLocalAuthority && jsonData) {
      const results = jsonData.filter((entry) => entry["Local Authority (2019)"] === searchLocalAuthority);
      setSearchedData(results); // Update 'searchedData' with filtered results
    } else {
      setSearchedData([]); // Clear 'searchedData' if no searchLocalAuthority or data is found
    }
  }, [searchLocalAuthority, jsonData]);

  // Function to calculate total heat demand before and after energy efficiency measures
  const calculateTotalHeatDemand = (data) => {
    const totalBeforeEfficiency = data.reduce((total, entry) => total + entry["Total heat demand before energy efficiency measures 2018 (kWh)"], 0);
    const totalAfterEfficiency = data.reduce((total, entry) => total + entry["Total heat demand after energy efficiency measures 2018 (kWh)"], 0);
    return {
      "Local Authority (2019)": data[0]["Local Authority (2019)"],
      "Total heat demand before energy efficiency measures": totalBeforeEfficiency,
      "Total heat demand after energy efficiency measures": totalAfterEfficiency
    };
  };

  // Effect to calculate and set 'localAuthorities' based on 'searchedData'
  useEffect(() => {
    if (searchedData.length > 0) {
      const localAuthorityData = calculateTotalHeatDemand(searchedData);
      setLocalAuthorities([localAuthorityData]); // Set 'localAuthorities' with calculated data
    } else {
      setLocalAuthorities(null); // Set 'localAuthorities' to null when no data is found
    }
  }, [searchedData]);

  return (
    <div>
      {/* Main content rendering */}
      <p>Heat efficiency before and after energy efficiency measures for a Local Authority in kWh</p>
      <div>
        <label>
          Please enter a Local Authority:
          <input
            type="text"
            value={searchLocalAuthority}
            onChange={(e) => setSearchLocalAuthority(e.target.value)}
          />
        </label>
        {searchLocalAuthority && searchedData.length > 0 && (
          <div>
            <strong>Local Authority (2019): {searchLocalAuthority}</strong>
          </div>
        )}
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : localAuthorities !== null ? (
        <div>
          <div>
            {/* Nivo ResponsiveBar component for displaying data visually */}
            <div style={{ width: 800, height: 400 }}>
              <ResponsiveBar
                data={localAuthorities}
                keys={["Total heat demand before energy efficiency measures", "Total heat demand after energy efficiency measures"]}
                indexBy="Local Authority (2019)"
              />
            </div>
          </div>
        </div>
      ) : (
        <p>No data found for the specified Local Authority.</p>
      )}
    </div>
  );
}