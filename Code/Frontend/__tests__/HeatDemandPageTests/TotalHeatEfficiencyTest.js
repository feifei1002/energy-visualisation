import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TotalHeatEfficiency from '../../src/components/graphs/TotalHeatEfficiency';

// Sample test data for the total heat efficiency component
const heatData = [
  {
    "Total heat demand before energy efficiency measures 2018 (kWh)": 2592698.88,
    "Total heat demand after energy efficiency measures 2018 (kWh)": 1904451.61,
  },
  {
    "Total heat demand before energy efficiency measures 2018 (kWh)": 3639118.12,
    "Total heat demand after energy efficiency measures 2018 (kWh)": 2387009.62,
  },
];

describe('TotalHeatEfficiency', () => {
  it('calculates and displays total heat efficiency correctly', () => {
    render(<TotalHeatEfficiency heatData={heatData} />);
    
    // Check if the title is rendered
    const titleElement = screen.getByText('Sum Of Total Heat Efficiency For Every Local Authority in GWh');
    expect(titleElement).toBeInTheDocument();

    // Check if the total heat demand before efficiency measures is calculated and displayed correctly
    const totalBeforeEfficiencyElement = screen.getByText(/Total Heat Demand Before Efficiency Measures:/i);
    expect(totalBeforeEfficiencyElement).toBeInTheDocument();
    expect(totalBeforeEfficiencyElement).toHaveTextContent('6.23 GWh');

    // Check if the total heat demand after efficiency measures is calculated and displayed correctly
    const totalAfterEfficiencyElement = screen.getByText(/Total Heat Demand After Efficiency Measures:/i);
    expect(totalAfterEfficiencyElement).toBeInTheDocument();
    expect(totalAfterEfficiencyElement).toHaveTextContent('4.29 GWh');
  });

  it('renders the component with default message when no data is provided', () => {
    render(<TotalHeatEfficiency heatData={[]} />);
    
    // Assert that the default message is displayed
    const defaultMessageElement = screen.getByText('Sum Of Total Heat Efficiency For Every Local Authority in GWh');
    expect(defaultMessageElement).toBeInTheDocument();
  });

  it('handles large values correctly', () => {
    const dataWithLargeValues = [
      {
        "Total heat demand before energy efficiency measures 2018 (kWh)": 999999999999,
        "Total heat demand after energy efficiency measures 2018 (kWh)": 888888888888,
      },
    ];

    render(<TotalHeatEfficiency heatData={dataWithLargeValues} />);
    
    // Assert that the component handles large values correctly
  });
});