import React from 'react';
import { render, screen, waitFor} from '@testing-library/react';
import BreakDownOfHeatDemandHeatDwellings from '../../src/components/graphs/BreakDownOfHeatDemandDwellings';
import '@testing-library/jest-dom'

// Sample test data for the BreakDownOfHeatDemandDwellings component
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

describe('BreakDownOfHeatDemandHeatDwellings', () => {
  it('renders table when data is available', () => {
    render(<BreakDownOfHeatDemandHeatDwellings heatData={testData} localAuthority="City of London" />);

    // Check if the table is rendered by looking for table headers
    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(3); // Assuming there are three columns: "Colour", "Dwelling Type" and "Heat Demand Percentage"

    // Check if individual table rows are rendered
    const tableRows = screen.getAllByRole('row');
    expect(tableRows).toHaveLength(5); // Assuming the table has a header row and four data rows for different dwelling types
  });

  it('shows the correct percentage format on pie chart', () => {
    render(<BreakDownOfHeatDemandHeatDwellings heatData={testData} localAuthority="City of London" />);

    //Check percentage value is shown and formatted correctly
    const percentageCell = screen.getByText('100%');
    expect(percentageCell).toBeInTheDocument();
  });

  
  it('shows the correct dwelling types on pie chart', () => {
    render(<BreakDownOfHeatDemandHeatDwellings heatData={testData} localAuthority="City of London" />);
    
    //Check detached type is shown on pie chart
    const typeCell = screen.getByText('detached');
    expect(typeCell).toBeInTheDocument();

    //Check semi-detached type is shown on pie chart
    const typeCell2 = screen.getByText('semi-detached');
    expect(typeCell2).toBeInTheDocument();

    //Check flat type is shown on pie chart
    const typeCell3 = screen.getByText('flat');
    expect(typeCell3).toBeInTheDocument();

    //Check terraced type is shown on pie chart
    const typeCell4 = screen.getByText('terraced');
    expect(typeCell4).toBeInTheDocument();
  });

  it('renders "All Authorities" view when data is available', () => {
    render(<BreakDownOfHeatDemandHeatDwellings heatData={testData} localAuthority="All Authorities" />);
  
    // Check if the table is rendered by looking for table headers
    const tableHeaders = screen.getAllByRole('columnheader');
    expect(tableHeaders).toHaveLength(3); // Assuming there are three columns: "Colour", "Dwelling Type" and "Heat Demand Percentage"
  
    // Check if individual table rows are rendered
    const tableRows = screen.getAllByRole('row');
    // Assuming the table has a header row and four data rows for different dwelling types
    expect(tableRows).toHaveLength(5);

  });
});