import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import BeforeAfterHeatDemandBar from '../../src/components/graphs/BeforeAfterHeatDemandBar';

//Sample test data for the before after heat demand bar
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

describe('BeforeAfterHeatDemandBar', () => {
  it('renders the component and handles user interaction', () => {
    render(<BeforeAfterHeatDemandBar data={testData} />);
    
    // Assert that the component is rendered
    const titleElement = screen.getByText('Heat efficiency before and after energy efficiency measures for a Local Authority in GWh');
    expect(titleElement).toBeInTheDocument();

    // Simulate user interaction with the dropdown
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'City of London' } });

    // Assert that the selected local authority is displayed
    const selectedAuthorityElement = screen.getByText('Local Authority (2019): City of London');
    expect(selectedAuthorityElement).toBeInTheDocument();
  });

  it('renders the component with default message when no data is loaded', () => {
    render(<BeforeAfterHeatDemandBar data={[]} />);
    
    // Assert that the default message is displayed
    const defaultMessageElement = screen.getByText('Heat efficiency before and after energy efficiency measures for a Local Authority in GWh');
    expect(defaultMessageElement).toBeInTheDocument();
  });

  it('updates the selected local authority when a user selects from the dropdown', () => {
    render(<BeforeAfterHeatDemandBar data={testData} />);
    
    // Simulate user interaction with the dropdown
    const selectElement = screen.getByRole('combobox');
    fireEvent.change(selectElement, { target: { value: 'City of London' } });
    
    // Assert that the selected local authority is displayed
    const selectedAuthorityElement = screen.getByText('Local Authority (2019): City of London');
    expect(selectedAuthorityElement).toBeInTheDocument();
  });

  it('shows the select identicator', () => {
    render(<BeforeAfterHeatDemandBar data={testData} />);
    
    //Check select identicator is shown
    const selectIndicator = screen.getByText('Select a Local Authority:');
    expect(selectIndicator).toBeInTheDocument();
  });

  it('shows the City Of London as a option', () => {
    render(<BeforeAfterHeatDemandBar data={testData} />);
    
    //Check select option is shown
    const selectOption = screen.getByText('City of London');
    expect(selectOption).toBeInTheDocument();
  });
});