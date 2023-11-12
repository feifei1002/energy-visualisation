import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import BreakDownOfHeatDemandHeatTechnology from '../../src/components/graphs/BreakDownOfHeatDemandHeatTechnology';
import '@testing-library/jest-dom'

// Sample test data for the BreakDownOfHeatDemandHeatTechnology component
const testData = [
    {
      "LSOA11CD": "E01000001",
      "Area (km2)": 0.135739831,
      "Average heat demand after energy efficiency measures for detached biomass boiler (kWh)": 13221.20,
      "Average heat demand after energy efficiency measures for detached gas boiler (kWh)": 14589.64,
      "Local Authority (2011)": "City of London",
      "Local Authority (2019)": "City of London",
      "Number of detached biomass boiler in 2018": 0,
      "Number of detached gas boiler in 2018": 0,
      "Total heat demand after energy efficiency measures 2018 (kWh)": 1904451.61,
      "Total heat demand before energy efficiency measures 2018 (kWh)": 2592698.88
    },
    {
      "LSOA11CD": "E01000002",
      "Area (km2)": 0.223719826,
      "Average heat demand after energy efficiency measures for detached biomass boiler (kWh)": 13221.20,
      "Average heat demand after energy efficiency measures for detached gas boiler (kWh)": 14589.64,
      "Local Authority (2011)": "City of London",
      "Local Authority (2019)": "City of London",
      "Number of detached biomass boiler in 2018": 0,
      "Number of detached gas boiler in 2018": 0,
      "Total heat demand after energy efficiency measures 2018 (kWh)": 2387009.62,
      "Total heat demand before energy efficiency measures 2018 (kWh)": 3639118.12
    },
  ];

describe('BreakDownOfHeatDemandHeatTechnology', () => {
  it('renders table when data is available', () => {
    render(<BreakDownOfHeatDemandHeatTechnology heatData={testData} localAuthority="City of London" />);

    // Check if the table is rendered by looking for table headers
    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(2); // Assuming there are two columns: "Boiler Type" and "Percentage"

    // Check if individual table rows are rendered
    const tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(3); // Assuming the table has a header row and two data rows
  });

  it('shows the correct percentage format on pie chart', () => {
    render(<BreakDownOfHeatDemandHeatTechnology heatData={testData} localAuthority="City of London" />);

    //Check percentage value is shown and formatted correctly
    const percentageCell = screen.getByText('47.54%');
    expect(percentageCell).toBeInTheDocument();
  });

  
  it('shows the correct boiler types on pie chart', () => {
    render(<BreakDownOfHeatDemandHeatTechnology heatData={testData} localAuthority="City of London" />);
    
    //Check boiler type is shown on pie chart
    const typeCell = screen.getByText('detached biomass boiler');
    expect(typeCell).toBeInTheDocument();
  });
});