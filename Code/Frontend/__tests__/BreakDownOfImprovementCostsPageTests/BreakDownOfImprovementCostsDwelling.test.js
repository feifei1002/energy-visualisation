import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import BreakDownOfImprovementCostsDwelling from '../../src/components/graphs/BreakDownOfImprovementCostsDwelling';

// Sample test data for the BreakDownOfImprovementCostsDwelling component
const testData = [
    {
        "LSOA11CD": "E01000001",
        "Area (km2)": 0.135739831,
        "Average energy efficiency improvements costs of detached gas boiler (GBP)": 13221.20,
        "Average energy efficiency improvements costs of semi-detached gas boiler (GBP)": 14589.64,
        "Average energy efficiency improvements costs of flat gas boiler (GBP)": 17483.12,
        "Average energy efficiency improvements costs of terraced gas boiler (GBP)": 12367.98,
        "Local Authority (2011)": "City of London",
        "Local Authority (2019)": "City of London"
    },
    {
        "LSOA11CD": "E01000002",
        "Area (km2)": 0.223719826,
        "Average energy efficiency improvements costs of detached gas boiler (GBP)": 13221.20,
        "Average energy efficiency improvements costs of semi-detached gas boiler (GBP)": 14589.64,
        "Average energy efficiency improvements costs of flat gas boiler (GBP)": 17483.12,
        "Average energy efficiency improvements costs of terraced gas boiler (GBP)": 12367.98,
        "Local Authority (2011)": "City of London",
        "Local Authority (2019)": "City of London"
    },
];

describe('BreakDownOfImprovementCostsDwellings', () => {
    it('renders table when data is available', () => {
        render(<BreakDownOfImprovementCostsDwelling costData={testData} localAuthority="City of London"/>);

        // Check if the table is rendered by looking for table headers
        const tableHeaders = screen.getAllByRole('columnheader');
        expect(tableHeaders).toHaveLength(3); // Assuming there are three columns: "Colour", "Dwelling Type" and "Heat Demand Percentage"

        // Check if individual table rows are rendered
        const tableRows = screen.getAllByRole('row');
        expect(tableRows).toHaveLength(5); // Assuming the table has a header row and four data rows for different dwelling types
    });

    it('shows the correct dwelling types on pie chart', () => {
        render(<BreakDownOfImprovementCostsDwelling costData={testData} localAuthority="City of London"/>);

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
});