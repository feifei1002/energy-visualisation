import React from 'react';
import { render, screen } from '@testing-library/react';
import TotalHeatDemandBeforeTable from '../../src/components/tables/TotalHeatDemandBeforeTable';

// Sample test data
const testData = [
  {
    'Local Authority (2019)': 'Authority1',
    'Total heat demand before energy efficiency measures 2018 (kWh)': 1500000,
  },
  {
    'Local Authority (2019)': 'Authority2',
    'Total heat demand before energy efficiency measures 2018 (kWh)': 1200000,
  },
];

describe('TotalHeatDemandBeforeTable', () => {
  it('renders the table correctly', () => {
    // Given
    render(<TotalHeatDemandBeforeTable data={testData} />);

    // When
    const tableRows = screen.getAllByRole('row');

    // Then
    expect(tableRows.length).toBe(testData.length + 1); // Plus one for the header row
  });

  it('displays the correct number of rows and columns', () => {
    // Given
    render(<TotalHeatDemandBeforeTable data={testData} />);

    // When
    const tableRows = screen.getAllByRole('row');

    // Then
    expect(tableRows.length).toBe(testData.length + 1); // Plus one for the header row
    testData.forEach((rowData, index) => {
      const rowCells = screen.getAllByRole('cell', { name: rowData['Local Authority (2019)'] });
      expect(rowCells.length).toBe(1); // One cell in each row (Local Authority)
    });
  });
});
