import React, { useState, useEffect } from 'react';
import  graphToPdf  from '../../helperFunctions/graphToPdf';
import { toast } from 'react-toastify';

export default function TotalHeatEfficiency({heatData}) {
  const [data, setData] = useState(heatData);

  const handleGeneratePDF = () => {
    try{
      graphToPdf('totalHeatEfficiencyContainer', 
      `Total heat efficiency - 2018`);
      toast.success('Total heat efficiency summary converted to pdf and downloaded');
    } catch(e){
      console.log(e)
      toast.error('Error converting total summary to pdf');
    }
  };

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
    <div>
      <div className="TotalEfficiency" id="totalHeatEfficiencyContainer">
        <h5>Sum Of Total Heat Efficiency For Every Local Authority in GWh</h5>
        <p>Total Heat Demand Before Efficiency Measures: {formatNumberWithCommas(totalHeatBeforeEfficiency)} GWh</p>
        <p>Total Heat Demand After Efficiency Measures: {formatNumberWithCommas(totalHeatAfterEfficiency)} GWh</p>
      </div>
      <div>
        {/* Button to generate PDF */}
        <button onClick={handleGeneratePDF} style={{margin: '1vh', backgroundColor: 'rgba(20, 72, 94, 0.99)', color: 'white'}}>
          Generate PDF
        </button>
      </div>
     </div>
  );
}
