import React, { useState, useEffect } from 'react';
import { ResponsiveBar } from "@nivo/bar";

export default function BeforeAfterHeatDemandBar() {
  // State variables for managing data and user interface
  const [jsonData, setJsonData] = useState(null);  // Holds the fetched data
  const [loading, setLoading] = useState(true);     // Indicates if data is being loaded
  const [error, setError] = useState(null);         // Stores any loading errors
  const [selectedLocalAuthority, setSelectedLocalAuthority] = useState(''); // Selected Local Authority from drop-down
  const [localAuthorities, setLocalAuthorities] = useState([]); // Holds calculated data or empty array

  // API endpoint for data retrieval
  const apiUrl = 'http://localhost:8082/data/annualheat';

  // Effect to fetch and load data from the API
  useEffect(() => {
    // Memoize the API URL to prevent unnecessary re-renders
    const memoizedApiUrl = apiUrl;

    // Fetch data from the API and handle responses
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

  // Function to calculate total heat demand before and after energy efficiency measures
  const calculateTotalHeatDemand = (data) => {
    // Calculate total heat demand before and after energy efficiency measures
    const totalBeforeEfficiency = data.reduce((total, entry) => total + entry["Total heat demand before energy efficiency measures 2018 (kWh)"], 0);
    const totalAfterEfficiency = data.reduce((total, entry) => total + entry["Total heat demand after energy efficiency measures 2018 (kWh)"], 0);
    
    // Convert the values to GWh and format them to two decimal places
    const totalBeforeEfficiencyGWH = (totalBeforeEfficiency / 1000).toFixed(2);
    const totalAfterEfficiencyGWH = (totalAfterEfficiency / 1000).toFixed(2);
    
    return {
      "Local Authority (2019)": data[0]["Local Authority (2019)"],
      "Total heat demand before energy efficiency measures": totalBeforeEfficiencyGWH,
      "Total heat demand after energy efficiency measures": totalAfterEfficiencyGWH
    };
  };

  // Effect to calculate and set 'localAuthorities' based on 'selectedLocalAuthority'
  useEffect(() => {
    if (selectedLocalAuthority && jsonData) {
      const results = jsonData.filter((entry) => entry["Local Authority (2019)"] === selectedLocalAuthority);
      if (results.length > 0) {
        const localAuthorityData = calculateTotalHeatDemand(results);
        setLocalAuthorities([localAuthorityData]); // Set 'localAuthorities' with calculated data
      } else {
        setLocalAuthorities([]); // Set 'localAuthorities' to an empty array when no data is found
      }
    } else {
      setLocalAuthorities([]); // Set 'localAuthorities' to an empty array when no selection is made
    }
  }, [selectedLocalAuthority, jsonData]);

  // Get a list of unique local authorities from the JSON data
  const uniqueLocalAuthorities = jsonData ? [...new Set(jsonData.map(entry => entry["Local Authority (2019)"]))] : [];

  return (
    <div>
      {/* Main content rendering */}
      <h5>Heat efficiency before and after energy efficiency measures for a Local Authority in GWh</h5>
      <div>
        <label>
          Select a Local Authority:
          <select
            value={selectedLocalAuthority}
            onChange={(e) => setSelectedLocalAuthority(e.target.value)}
          >
            <option value="">Select an Authority</option>
            {uniqueLocalAuthorities.map(authority => (
              <option key={authority} value={authority}>{authority}</option>
            ))}
          </select>
        </label>
        {selectedLocalAuthority && localAuthorities.length > 0 && (
          <div>
            <strong>Local Authority (2019): {selectedLocalAuthority}</strong>
          </div>
        )}
      </div>
      {loading ? (
        <p>Loading data...</p>
      ) : error ? (
        <p>Error: {error.message}</p>
      ) : localAuthorities.length > 0 ? (
        <div>
          <div>
            {/* Nivo ResponsiveBar component for displaying data visually */}
            <div style={{ width: 800, height: 400 }}>
              <ResponsiveBar
                data={localAuthorities}
                keys={["Total heat demand before energy efficiency measures", "Total heat demand after energy efficiency measures"]}
                indexBy="Local Authority (2019)"
                valueFormat={(value) => `${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} GWh`}
              />
            </div>
          </div>
        </div>
      ) : (
        <p>No data found for the selected Local Authority.</p>
      )}
    </div>
  );
}
