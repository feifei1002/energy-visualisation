import React from 'react';
import BeforeAfterHeatDemandBar from '../components/graphs/BeforeAfterHeatDemandBar'; // Import the component
import TotalHeatEfficiency from '../components/graphs/TotalHeatEfficiency'; // Import the component

export default function BeforeAfterHeatDemandPage() {
  return (
    <div>
      <TotalHeatEfficiency/> 
      {/* Render the TotalHeatEfficiency component */}
      <BeforeAfterHeatDemandBar />
      {/* Render the BeforeAfterHeatDemandBar component */}
    </div>
  );
}
