import React from 'react';
import BeforeAfterHeatDemandBar from '../components/graphs/BeforeAfterHeatDemandBar'; // Import the component
import TotalHeatEfficiency from '../components/graphs/TotalHeatEfficiency'; // Import the component
import HeatEffiencyHeatMap from '../components/graphs/HeatEfficiencyHeatMap';

export default function BeforeAfterHeatDemandPage() {
  return (
    <div>
      <HeatEffiencyHeatMap />
      {/* Render the HeatEffiencyHeatMap component */}
      <TotalHeatEfficiency/> 
      {/* Render the TotalHeatEfficiency component */}
      <BeforeAfterHeatDemandBar />
      {/* Render the BeforeAfterHeatDemandBar component */}
    </div>
  );
}
