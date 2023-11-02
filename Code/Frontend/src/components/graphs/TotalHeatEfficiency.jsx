import React, { useState, useEffect } from 'react';

export default function TotalHeatEfficiency() {
  const [data, setData] = useState([]);

  // Effect to fetch data from the API and update the 'data' state
  useEffect(() => {
    // Fetch data from the API
    fetch('http://localhost:8082/data/annualheat')
      .then((response) => response.json())
      .then((data) => {
        setData(data); // Store the fetched data in the 'data' state
      });
  }, []);

  // Function to calculate total heat efficiency
  function calculateTotalHeatEfficiency(data) {
    let totalHeatBeforeEfficiency = 0;
    let totalHeatAfterEfficiency = 0;
  
    data.forEach((entry) => {
      // Convert kWh to gWh by dividing by 1,000,000 (1 gWh = 1,000,000 kWh)
      totalHeatBeforeEfficiency += entry['Total heat demand before energy efficiency measures 2018 (kWh)'] / 1000000;
      totalHeatAfterEfficiency += entry['Total heat demand after energy efficiency measures 2018 (kWh)'] / 1000000;
    });
  
    return { totalHeatBeforeEfficiency, totalHeatAfterEfficiency };
  }

  // Calculate total heat efficiency and destructure the result
  const { totalHeatBeforeEfficiency, totalHeatAfterEfficiency } = calculateTotalHeatEfficiency(data);

  // Function to format numbers with commas for readability
  function formatNumberWithCommas(number) {
    return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  return (
    <div className="TotalEfficiency">
      <h5>Sum Of Total Heat Efficiency For Every Local Authority in GWh</h5>
      <p>Total Heat Demand Before Efficiency Measures: {formatNumberWithCommas(totalHeatBeforeEfficiency)} GWh</p>
      <p>Total Heat Demand After Efficiency Measures: {formatNumberWithCommas(totalHeatAfterEfficiency)} GWh</p>
    </div>
  );
}
